import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import worker from '../server/worker.js';
import { createLocalEnv } from '../server/dev-adapter.js';
import { sanitizePlaces } from '../server/map-search.js';
import { parseCoordinates,findParcelMatches,parcelCenter } from '../src/components/gis/map-utils.ts';

const root=resolve(import.meta.dirname,'..');
const feature=(coordinates=[90.4125,23.8103],properties={name:'ঢাকা',country:'Bangladesh',countrycode:'BD'})=>({geometry:{type:'Point',coordinates},properties});
function setup(t){const local=createLocalEnv(root,true);t.after(()=>local.close());const env={...local.env,LOCAL_PREVIEW:false};return{...local,env,async call(q){const response=await worker.fetch(new Request(`https://land.test/api/map/search${q===null?'':`?q=${encodeURIComponent(q)}`}`),env);return{status:response.status,data:await response.json()};}};}

test('map coordinate input accepts Bangla and English digits without swapping latitude and longitude',()=>{
  assert.deepEqual(parseCoordinates('২৩.৭৪৬১, ৯০.৩৭৪২'),[23.7461,90.3742]);
  assert.deepEqual(parseCoordinates('-23.5 90.5'),[-23.5,90.5]);
  assert.deepEqual(parseCoordinates('0; 0'),[0,0]);
  assert.equal(parseCoordinates('ঢাকা'),null);
  assert.throws(()=>parseCoordinates('91, 90'));
  assert.throws(()=>parseCoordinates('23, -181'));
});
test('sample parcel lookup uses exact normalized plot numbers, prefixed fields and full land IDs',()=>{
  const parcels=[{landId:'BD-DH-104',dagNo:'104',khatianNo:'৮৪২১',mouza:'Dhanmondi',mouzaBn:'ধানমন্ডি'},{landId:'BD-DH-1104',dagNo:'1104',khatianNo:'12',mouza:'Savar',mouzaBn:'সাভার'}];
  assert.deepEqual(findParcelMatches(parcels,'দাগ ১০৪'),[parcels[0]]);
  assert.deepEqual(findParcelMatches(parcels,'khatian 8421'),[parcels[0]]);
  assert.deepEqual(findParcelMatches(parcels,'bd-dh-1104'),[parcels[1]]);
  assert.deepEqual(findParcelMatches(parcels,'সাভার'),[parcels[1]]);
  assert.deepEqual(findParcelMatches(parcels,''),[]);
});
test('sample parcel centre ignores malformed points instead of inventing a coordinate',()=>{
  assert.deepEqual(parcelCenter({polygon:[[23,90],[25,92],[Infinity,3]]}),[24,91]);
  assert.equal(parcelCenter({polygon:[[NaN,90],[100,400]]}),null);
});
test('place results read GeoJSON longitude/latitude correctly and reject wrong shapes, duplicates and unrelated countries',()=>{
  const items=sanitizePlaces({features:[feature(),feature(),feature({lat:23,lng:90}),feature([12,50]),feature([90,23],{name:'Different country',countrycode:'IN'}),feature([NaN,23]),feature([91.8,24.8],{name:'সিলেট',countrycode:'BD'})]});
  assert.equal(items.length,2);assert.equal(items[0].lat,23.8103);assert.equal(items[0].lng,90.4125);
  assert.throws(()=>sanitizePlaces({html:'not GeoJSON'}));
});
test('anonymous place search caches results and never creates private reports or sends identity to the provider',async t=>{
  const app=setup(t);let calls=0;
  t.mock.method(globalThis,'fetch',async(url,init)=>{calls++;const u=new URL(url);assert.equal(u.hostname,'photon.komoot.io');assert.equal(u.searchParams.get('countrycode'),'BD');assert.equal(u.searchParams.get('q'),'Dhaka');assert.match(init.headers['user-agent'],/LandShield/);assert.equal(init.headers.authorization,undefined);return Response.json({features:[feature()]});});
  const first=await app.call('Dhaka');assert.equal(first.status,200);assert.equal(first.data.cached,false);
  const second=await app.call('  dhaka  ');assert.equal(second.status,200);assert.equal(second.data.cached,true);assert.equal(calls,1);
  assert.equal(app.sqlite.prepare('SELECT COUNT(*) AS n FROM land_reports').get().n,0);
  assert.equal(app.sqlite.prepare('SELECT COUNT(*) AS n FROM land_map_cache').get().n,1);
});
test('simultaneous uncached searches share one global provider throttle',async t=>{
  const app=setup(t);let calls=0;t.mock.method(globalThis,'fetch',async()=>{calls++;return Response.json({features:[feature()]});});
  const results=await Promise.all([app.call('Dhaka'),app.call('Savar')]);assert.deepEqual(results.map(r=>r.status).sort(),[200,429]);assert.equal(calls,1);
});
test('invalid queries fail before provider traffic or cache writes',async t=>{
  const app=setup(t);let calls=0;t.mock.method(globalThis,'fetch',async()=>{calls++;throw new Error('unexpected');});
  for(const query of [null,'a','x'.repeat(181),'a\nb'])assert.equal((await app.call(query)).status,400);
  assert.equal(calls,0);assert.equal(app.sqlite.prepare('SELECT COUNT(*) AS n FROM land_map_cache').get().n,0);
});
test('provider failure preserves a useful coordinate fallback and never invents a result',async t=>{
  const app=setup(t);t.mock.method(globalThis,'fetch',async()=>{throw new Error('offline');});
  const result=await app.call('Savar');assert.equal(result.status,502);assert.match(result.data.error,/স্থানাঙ্ক|অক্ষাংশ/);assert.equal(result.data.items,undefined);
  assert.equal(app.sqlite.prepare('SELECT COUNT(*) AS n FROM land_map_cache').get().n,0);
});
test('oversized provider responses are bounded and malformed endpoints do not start a request',async t=>{
  const app=setup(t);t.mock.method(globalThis,'fetch',async()=>new Response('x'.repeat(100001)));
  assert.equal((await app.call('Dhaka')).status,502);
  app.env.PHOTON_ENDPOINT='http://insecure.test/api';assert.equal((await app.call('Savar')).status,503);
});
