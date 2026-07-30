import { DomainError,normalizeDigits } from './land-domain.js';
import { database,categories } from './land-storage.js';
import { contactSeeds } from './contact-seeds.js';
import { withKnownOfficeLocation } from './office-locations.js';

const clean=value=>String(value||'').normalize('NFKC').toLowerCase().replace(/(?:district|upazila|thana|জেলা|উপজেলা|থানা)\s*$/u,'').replace(/[\s.,_\-]/g,'');
const groups=[['ঢাকা','dhaka'],['চট্টগ্রাম','চট্রগ্রাম','chattogram','chittagong'],['রাজশাহী','rajshahi'],['খুলনা','khulna'],['সাভার','savar'],['পটিয়া','পটিয়া','patiya'],['পবা','paba'],['ডুমুরিয়া','ডুমুরিয়া','dumuria']];
const aliases=new Map(groups.flatMap(group=>group.map(value=>[clean(value),clean(group[0])])));
export const areaKey=value=>aliases.get(clean(value))||clean(value);
const string=(value,max,required=false)=>{if(typeof value!=='string'||value.length>max||required&&!value.trim())throw new DomainError('অফিসের তথ্য সঠিকভাবে দিন।');return value.trim();};
const phone=value=>{const n=normalizeDigits(string(value??'',30)).replace(/[\s()-]/g,'');if(n&&!/^(?:\+880\d{8,10}|0\d{8,10}|1\d{4})$/.test(n))throw new DomainError('সঠিক বাংলাদেশি যোগাযোগের নম্বর দিন।');return n;};
export function validateContact(raw){
  if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new DomainError('অফিসের তথ্য দিন।');
  const officeType=raw.officeType;if(!['land','survey','registry','engineer','help'].includes(officeType))throw new DomainError('অফিসের ধরন বাছুন।');
  const sourceType=raw.sourceType;if(!['government','professional'].includes(sourceType))throw new DomainError('উৎসের ধরন বাছুন।');
  let source;try{source=new URL(raw.sourceUrl);}catch{throw new DomainError('উৎসের সঠিক HTTPS ঠিকানা দিন।');}
  if(source.protocol!=='https:'||source.username||source.password||source.href.length>600||!source.hostname.includes('.')||/^(localhost|127\.|0\.|\[)/.test(source.hostname))throw new DomainError('উৎসের সঠিক HTTPS ঠিকানা দিন।');
  if(sourceType==='government'&&!(source.hostname==='gov.bd'||source.hostname.endsWith('.gov.bd')))throw new DomainError('সরকারি উৎসের জন্য gov.bd ঠিকানা দিন।');
  const checked=string(raw.sourceCheckedAt,10,true);if(!Number.isFinite(Date.parse(checked))||!/^\d{4}-\d{2}-\d{2}$/.test(checked)||new Date(checked).toISOString().slice(0,10)!==checked||checked>new Date().toISOString().slice(0,10))throw new DomainError('উৎস দেখার সঠিক তারিখ দিন।');
  if(!Array.isArray(raw.categories)||!raw.categories.length||raw.categories.length>categories.length||raw.categories.some(x=>!categories.includes(x)))throw new DomainError('সংশ্লিষ্ট বিষয় বাছুন।');
  if(typeof raw.active!=='boolean')throw new DomainError('অফিসের সক্রিয় অবস্থা বাছুন।');
  const empty=value=>value===null||value===undefined||value==='';
  let latitude=null,longitude=null;
  if(!empty(raw.latitude)||!empty(raw.longitude)){
    if(empty(raw.latitude)||empty(raw.longitude)||!Number.isFinite(Number(raw.latitude))||!Number.isFinite(Number(raw.longitude)))throw new DomainError('অক্ষাংশ ও দ্রাঘিমাংশ দুটোই দিন।');
    latitude=Number(raw.latitude);longitude=Number(raw.longitude);if(latitude<20.5||latitude>26.7||longitude<88||longitude>92.8)throw new DomainError('বাংলাদেশের মধ্যে অফিসের সঠিক স্থানাঙ্ক দিন।');
  }
  const email=string(raw.email??'',254);if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new DomainError('সঠিক ইমেইল দিন।');
  const district=string(raw.district??'',100),upazila=string(raw.upazila??'',100);if(officeType!=='help'&&(!district||!upazila))throw new DomainError('অফিসের জেলা ও উপজেলা দিন।');
  let coordinateSourceUrl='';if(raw.coordinateSourceUrl){try{const url=new URL(raw.coordinateSourceUrl);if(url.protocol!=='https:'||url.username||url.password||url.href.length>600)throw new Error();coordinateSourceUrl=url.href;}catch{throw new DomainError('ম্যাপ পয়েন্টের সঠিক HTTPS উৎস দিন।');}}
  return{officeName:string(raw.officeName,200,true),officeType,personName:string(raw.personName??'',150),designation:string(raw.designation,150,true),district,upazila,address:string(raw.address,500,true),phone:phone(raw.phone),mobile:phone(raw.mobile),email,categories:[...new Set(raw.categories)],sourceType,sourceUrl:source.href,sourceCheckedAt:checked,latitude,longitude,active:raw.active,notes:string(raw.notes??'',1000),...(coordinateSourceUrl?{coordinateSourceUrl,coordinateCheckedAt:checked}:{})};
}
const stored=row=>withKnownOfficeLocation({...JSON.parse(row.data),id:row.id,version:row.version,active:!!row.active,updatedAt:row.updated_at},row.updated_by);
const seeded=new WeakMap();
export async function ensureContacts(env){
  let current=seeded.get(env);if(!current){current=(async()=>{const db=database(env),now=new Date().toISOString();await db.batch(contactSeeds.map(seed=>{const data=validateContact(seed);return db.prepare('INSERT OR IGNORE INTO land_contacts (id,office_name,person_name,district_key,upazila_key,active,version,data,updated_by,updated_at) VALUES (?,?,?,?,?,1,1,?,?,?)').bind(seed.id,data.officeName,data.personName,areaKey(data.district),areaKey(data.upazila),JSON.stringify(data),'source-seed',now);}));})();seeded.set(env,current);current.catch(()=>seeded.delete(env));}return current;
}
export async function contacts(env,url,admin=false){
  await ensureContacts(env);const db=database(env),params=url.searchParams,district=areaKey(params.get('district')),upazila=areaKey(params.get('upazila')),category=params.get('category')||'all';
  if(category!=='all'&&!categories.includes(category))throw new DomainError('সঠিক বিষয় বাছুন।');
  const where=admin?['1=1']:['active=1'],args=[];
  if(!admin){if(district&&upazila){where.push("((district_key=? AND upazila_key=?) OR (district_key='' AND upazila_key=''))");args.push(district,upazila);}else where.push("district_key='' AND upazila_key=''");}
  const q=(params.get('q')||'').trim().slice(0,120);if(q){where.push("(office_name LIKE ? ESCAPE '\\' OR person_name LIKE ? ESCAPE '\\' OR data LIKE ? ESCAPE '\\' OR district_key=? OR upazila_key=?)");const like=`%${q.replace(/[\\%_]/g,'\\$&')}%`;args.push(like,like,like,areaKey(q),areaKey(q));}
  const rows=(await db.prepare(`SELECT * FROM land_contacts WHERE ${where.join(' AND ')} ORDER BY district_key,upazila_key,office_name,id LIMIT 500`).bind(...args).all()).results.map(stored);
  const filtered=rows.filter(x=>category==='all'||x.categories.includes(category));
  const local=filtered.filter(x=>x.district&&x.upazila),national=filtered.filter(x=>!x.district&&!x.upazila);
  return{items:admin?filtered:[...local.sort((a,b)=>((['boundary','record'].includes(category)&&a.officeType==='survey')?-1:0)-((['boundary','record'].includes(category)&&b.officeType==='survey')?-1:0)),...national],coverage:local.length?'local':district&&upazila?'not_listed':'area_required',total:filtered.length};
}
export async function saveContact(env,user,id,body){
  if(!user?.isAdmin)throw new DomainError('অ্যাডমিন অনুমতি প্রয়োজন।',403);await ensureContacts(env);
  if(body.confirmed!==true)throw new DomainError('প্রকাশিত উৎসে যোগাযোগের তথ্য মিলিয়ে নিশ্চিত করুন।');
  const data=validateContact(body.contact),now=new Date().toISOString(),db=database(env);
  if(!id){id=`contact:${crypto.randomUUID()}`;await db.prepare('INSERT INTO land_contacts (id,office_name,person_name,district_key,upazila_key,active,version,data,updated_by,updated_at) VALUES (?,?,?,?,?,?,1,?,?,?)').bind(id,data.officeName,data.personName,areaKey(data.district),areaKey(data.upazila),data.active?1:0,JSON.stringify(data),user.id,now).run();}
  else{if(!Number.isInteger(body.version))throw new DomainError('সর্বশেষ অফিসটি আবার খুলুন।');const result=await db.prepare('UPDATE land_contacts SET office_name=?,person_name=?,district_key=?,upazila_key=?,active=?,version=version+1,data=?,updated_by=?,updated_at=? WHERE id=? AND version=?').bind(data.officeName,data.personName,areaKey(data.district),areaKey(data.upazila),data.active?1:0,JSON.stringify(data),user.id,now,id,body.version).run();if(!result.meta?.changes)throw new DomainError('অফিসের তথ্য বদলেছে। আবার খুলুন।',409);}
  return stored(await db.prepare('SELECT * FROM land_contacts WHERE id=?').bind(id).first());
}
export async function assignContact(env,user,row,body){
  if(!user?.isAdmin||!row.shared)throw new DomainError('অফিস বাছার অনুমতি নেই।',403);
  if(body.version!==row.version)throw new DomainError('রিপোর্ট বদলেছে। সর্বশেষটি আবার খুলুন।',409);
  if(body.confirmed!==true)throw new DomainError('দপ্তর, এখতিয়ার ও যোগাযোগ যাচাই নিশ্চিত করুন।');
  const note=string(body.note,2000,true);if(note.length<8)throw new DomainError('দপ্তর বাছার কারণ অন্তত ৮ অক্ষরে দিন।');
  const db=database(env);await ensureContacts(env);let contact=null;
  if(body.contactId!==null){if(typeof body.contactId!=='string'||body.contactId.length>100)throw new DomainError('অফিস বাছুন।');const found=await db.prepare('SELECT * FROM land_contacts WHERE id=? AND active=1').bind(body.contactId).first();if(!found)throw new DomainError('এই যোগাযোগ এখন সক্রিয় নেই।',409);contact=stored(found);if(body.contactVersion!==contact.version)throw new DomainError('যোগাযোগের তথ্য বদলেছে। আবার খুলুন।',409);}
  const now=new Date().toISOString(),referral=contact?{contact,note,assignedBy:user.id,assignedAt:now}:null;
  // Contact revision and report revision are checked in the same write to
  // reject a concurrent directory edit before saving the snapshot.
  const result=await db.batch([
    db.prepare('UPDATE land_reports SET assigned_contact_id=?,referral=?,version=version+1,updated_at=? WHERE id=? AND version=? AND shared=1 AND (? IS NULL OR EXISTS (SELECT 1 FROM land_contacts WHERE id=? AND version=? AND active=1))').bind(contact?.id||null,referral?JSON.stringify(referral):null,now,row.id,row.version,contact?.id||null,contact?.id||null,contact?.version||0),
    db.prepare("INSERT INTO land_events (id,report_id,actor,action,detail,created_at) SELECT ?,?,?,'referred',?,? WHERE changes()=1").bind(crypto.randomUUID(),row.id,user.id,`${contact?`${contact.officeName} · ${contact.personName||contact.designation}`:'নির্ধারিত যোগাযোগ সরানো হয়েছে'}: ${note}`,now)
  ]);if(!result[0].meta?.changes)throw new DomainError('রিপোর্ট বা যোগাযোগের তথ্য বদলেছে। আবার খুলুন।',409);
  return referral;
}
