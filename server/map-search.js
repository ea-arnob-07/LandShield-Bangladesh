import { DomainError } from './land-domain.js';
import { database,checksum } from './land-storage.js';

const CACHE_TTL=24*60*60*1000;
export function sanitizePlaces(data){
  if(!Array.isArray(data?.features))throw new DomainError('জায়গা খোঁজার সেবা সঠিক উত্তর দেয়নি। স্থানাঙ্ক দিয়ে চেষ্টা করুন।',502);
  const items=[],seen=new Set();
  for(const feature of data.features.slice(0,20)){
    const coordinates=feature?.geometry?.coordinates;if(!Array.isArray(coordinates))continue;
    const [lng,lat]=coordinates;const p=feature?.properties||{};
    if(feature?.geometry?.type!=='Point'||!Number.isFinite(lat)||!Number.isFinite(lng)||lat<20.4||lat>27||lng<88||lng>93)continue;
    if(p.countrycode&&String(p.countrycode).toUpperCase()!=='BD')continue;
    const label=[p.name,p.street,p.city,p.district,p.state,p.country].filter(v=>typeof v==='string'&&v.trim()).filter((v,i,a)=>a.indexOf(v)===i).join(', ').slice(0,260);
    if(!label)continue;
    const id=`${lat.toFixed(6)},${lng.toFixed(6)}`;
    if(seen.has(id))continue;seen.add(id);items.push({id,label,lat,lng});if(items.length===5)break;
  }
  return items;
}
async function boundedJSON(response){
  const reader=response.body?.getReader();if(!reader)throw new Error('Empty response');
  const chunks=[];let size=0;
  try{while(true){const part=await reader.read();if(part.done)break;size+=part.value.byteLength;if(size>100000){await reader.cancel();throw new Error('Oversized response');}chunks.push(part.value);}}finally{reader.releaseLock();}
  const bytes=new Uint8Array(size);let offset=0;for(const part of chunks){bytes.set(part,offset);offset+=part.byteLength;}
  return JSON.parse(new TextDecoder().decode(bytes));
}
export async function searchPlaces(query,env){
  if(typeof query!=='string'||query.trim().length<3||query.length>180||/[\u0000-\u001f]/.test(query))throw new DomainError('জায়গার নাম অন্তত ৩ অক্ষরে লিখুন, অথবা অক্ষাংশ ও দ্রাঘিমাংশ দিন।');
  const q=query.normalize('NFC').trim().replace(/\s+/g,' ');let endpoint;
  try{endpoint=new URL(env.PHOTON_ENDPOINT||'https://photon.komoot.io/api/');if(endpoint.protocol!=='https:')throw new Error('HTTPS required');}catch{throw new DomainError('জায়গা খোঁজার সংযোগ ঠিক করা প্রয়োজন। স্থানাঙ্ক ব্যবহার করুন।',503);}
  const db=database(env),now=Date.now(),key=await checksum(new TextEncoder().encode(`${endpoint.href}|${q.toLocaleLowerCase()}`));
  const cached=await db.prepare('SELECT payload FROM land_map_cache WHERE cache_key=? AND expires_at>?').bind(key,now).first();
  if(cached){try{return{items:JSON.parse(cached.payload),source:'Photon / OpenStreetMap',cached:true};}catch{/* Re-fetch a damaged cache entry. */}}
  // One global gate across Worker isolates, not a separate limit per visitor.
  const gate=await db.batch([
    db.prepare("INSERT OR IGNORE INTO land_map_provider_state (provider,last_request_at) VALUES ('places',0)"),
    db.prepare("UPDATE land_map_provider_state SET last_request_at=? WHERE provider='places' AND last_request_at<=?").bind(now,now-1200)
  ]);
  if(!gate[1]?.meta?.changes)throw new DomainError('আরেকটি অনুসন্ধান চলছে। এক মুহূর্ত পরে আবার খুঁজুন।',429);
  endpoint.searchParams.set('q',q);endpoint.searchParams.set('limit','5');endpoint.searchParams.set('countrycode','BD');endpoint.searchParams.set('bbox','88,20.4,93,27');
  let items;
  try{
    const response=await fetch(endpoint,{headers:{'user-agent':'LandShield-BhumiSeba/2.1 (+https://landshield-bhumiseba.vercel.app)','accept':'application/json'},signal:AbortSignal.timeout(6000)});
    if(!response.ok)throw new Error('Place provider unavailable');items=sanitizePlaces(await boundedJSON(response));
  }catch(error){if(error instanceof DomainError)throw error;throw new DomainError('অনলাইন জায়গা খোঁজার সেবা এখন পাওয়া যাচ্ছে না। অক্ষাংশ, দ্রাঘিমাংশ বা লাইভ লোকেশন ব্যবহার করুন।',502);}
  await db.batch([
    db.prepare('INSERT OR REPLACE INTO land_map_cache (cache_key,payload,expires_at) VALUES (?,?,?)').bind(key,JSON.stringify(items),now+CACHE_TTL),
    db.prepare('DELETE FROM land_map_cache WHERE expires_at<=? OR cache_key NOT IN (SELECT cache_key FROM land_map_cache ORDER BY expires_at DESC LIMIT 500)').bind(now)
  ]);
  return{items,source:'Photon / OpenStreetMap',cached:false};
}
