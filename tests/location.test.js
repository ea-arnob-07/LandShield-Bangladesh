import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import worker from '../server/worker.js';
import { createLocalEnv } from '../server/dev-adapter.js';
import { validateLandPoint } from '../server/report-location.js';
import { applicationReport } from '../src/land/reports.ts';
import { coordinateText,locationMapUrl,readCurrentPosition } from '../src/land/location.ts';
import { routeApplication } from '../server/land-domain.js';
import { makeDocx } from '../src/land/export-report.ts';
import { unzipSync,strFromU8 } from 'fflate';
import { withKnownOfficeLocation } from '../server/office-locations.js';
import { officeDistance } from '../src/land/office-report.ts';
const root=resolve(import.meta.dirname,'..');
function setup(t){const app=createLocalEnv(root,true);t.after(()=>app.close());const env={...app.env,LOCAL_PREVIEW:false,SITE_ADMIN_USER_IDS:'["admin"]'};const call=async(path,{user='alice',method='GET',body}={})=>{const headers=new Headers();if(user)headers.set('oai-authenticated-user-id',user);if(body!==undefined)headers.set('content-type','application/json');const response=await worker.fetch(new Request(`https://land.test/api${path}`,{headers,method,...(body===undefined?{}:{body:JSON.stringify(body)})}),env);return{status:response.status,data:await response.json()};};return{...app,env,call};}
const point=()=>({latitude:23.834225,longitude:90.2576536,label:'কাল্পনিক পরীক্ষার জন্য নির্বাচিত জায়গা',source:'map',capturedAt:'2026-10-18T11:00:00.000Z'});
const report=(district='ঢাকা',upazila='সাভার')=>({id:`LSR-${crypto.randomUUID()}`,kind:'application',title:'লোকেশন পরীক্ষার আবেদন',summary:'জমির সীমানা যাচাই প্রয়োজন।',engine:'test',createdAt:'2026-10-18T11:00:00.000Z',location:{district,upazila,point:point()},category:'boundary',risk:'MEDIUM',sections:[{heading:'আবেদন',rows:[{label:'আবেদনকারী',value:'একই নমুনা নাম'},{value:'মূল বক্তব্য অক্ষত থাকবে।'}]}]});
const save=(app,value,user='alice',shared=true)=>app.call('/reports',{user,method:'POST',body:{report:value,consent:true,shared}});

test('selected land points validate numeric ranges, source, uncertainty and timestamps',()=>{
  assert.deepEqual(validateLandPoint({...point(),untrusted:'discard'}),point());
  for(const bad of [{latitude:'23.8'},{latitude:91},{longitude:181},{latitude:NaN},{source:'unknown'},{label:''},{capturedAt:'not a date'},{accuracy:-1},{accuracy:'20'}])assert.throws(()=>validateLandPoint({...point(),...bad}));
  assert.equal(validateLandPoint({...point(),accuracy:0}).accuracy,0);
  assert.equal(locationMapUrl(point()),'https://www.openstreetmap.org/?mlat=23.834225&mlon=90.257654#map=17/23.834225/90.257654');
  assert.equal(coordinateText(point()),'23.834225, 90.257654');
});
test('chosen location survives report persistence and replay while other owners stay isolated',async t=>{
  const app=setup(t),value=report();assert.equal((await save(app,value)).status,201);
  const detail=await app.call(`/reports/${value.id}`);assert.deepEqual(detail.data.item.report.location,value.location);
  assert.equal((await save(app,value)).data.replayed,true);assert.equal((await app.call(`/reports/${value.id}`,{user:'bob'})).status,404);
  assert.equal((await save(app,{...report(),location:{district:'ঢাকা',upazila:'সাভার',point:{...point(),latitude:'23'}}})).status,400);
  const legacy=report();delete legacy.location;assert.equal((await save(app,legacy)).status,201);assert.equal((await app.call(`/reports/${legacy.id}`)).data.item.report.location,undefined);
});
test('area and applicant filters combine with pagination without exposing private reports',async t=>{
  const app=setup(t);for(let i=0;i<33;i++)assert.equal((await save(app,report())).status,201);
  const otherPerson=report();await save(app,otherPerson,'bob');await save(app,report('চট্টগ্রাম','পটিয়া'));
  const privateReport=report('ব্যক্তিগত জেলা','ব্যক্তিগত উপজেলা');await save(app,privateReport,'private-owner',false);
  const params=new URLSearchParams({district:'ঢাকা',upazila:'সাভার',applicantId:'alice',kind:'application',category:'boundary',risk:'MEDIUM',status:'received'});
  const first=await app.call(`/admin/queue?${params}`,{user:'admin'});assert.equal(first.status,200);assert.equal(first.data.total,33);assert.equal(first.data.items.length,30);assert.ok(first.data.nextCursor);
  params.set('before',first.data.nextCursor);const second=await app.call(`/admin/queue?${params}`,{user:'admin'});assert.equal(second.data.total,33);assert.equal(second.data.items.length,3);assert.equal(new Set([...first.data.items,...second.data.items].map(x=>x.id)).size,33);
  assert.ok(first.data.items.every(x=>x.applicant.id==='alice'));assert.equal((await app.call('/reports?applicantId=bob')).data.total,0);
  assert.equal((await app.call('/admin/report-filters',{user:null})).status,401);assert.equal((await app.call('/admin/report-filters')).status,403);
  const filters=(await app.call('/admin/report-filters',{user:'admin'})).data;assert.ok(filters.areas.some(x=>x.district==='ঢাকা'&&x.upazila==='সাভার'&&x.total===34));assert.ok(!filters.areas.some(x=>x.district==='ব্যক্তিগত জেলা'));assert.ok(!filters.applicants.some(x=>x.id==='private-owner'));
  assert.equal((await app.call('/admin/queue?district=%25',{user:'admin'})).data.total,0);
  assert.equal((await app.call('/admin/queue?district='+encodeURIComponent('x'.repeat(101)),{user:'admin'})).status,400);
  const bob=(await app.call('/admin/queue?applicantId=bob',{user:'admin'})).data;assert.deepEqual(bob.items.map(x=>x.id),[otherPerson.id]);
});
test('reports preserve the selected land pin, map link and source in Word without storing the live origin',()=>{
  const input={applicant:'নমুনা আবেদনকারী',description:'সীমানা ও মৌজা ম্যাপ মিলিয়ে জমির পরিমাপের সহায়তা চাই।',district:'ঢাকা',upazila:'সাভার',mouza:'বিরুলিয়া',ulid:'',dagNo:'১০৪',khatianNo:'',desiredOutcome:'সীমানা যাচাই',point:point()};
  const output=applicationReport(input,routeApplication(input),[]),xml=strFromU8(unzipSync(makeDocx(output))['word/document.xml']);assert.deepEqual(output.location.point,input.point);assert.ok(xml.includes('23.834225, 90.257654'));assert.ok(xml.includes('openstreetmap.org/?mlat='));assert.ok(xml.includes(input.description));assert.equal(output.location.currentPosition,undefined);
});
test('public office map points have independent sources and never replace admin coordinates',async t=>{
  const app=setup(t),data=(await app.call('/contacts?district=ঢাকা&upazila=সাভার&category=boundary',{user:null})).data;
  const contact=data.items.find(x=>x.id==='official:savar-surveyor');assert.ok(contact.coordinateSourceUrl.includes('/node/5240549386'));assert.equal(contact.latitude,23.834225);
  const origin={latitude:23.9,longitude:90.3};assert.ok(officeDistance(contact,origin)>1);assert.equal(officeDistance(contact,{latitude:contact.latitude,longitude:contact.longitude}),0);
  const edited={...contact,latitude:23.85,longitude:90.26};assert.equal(withKnownOfficeLocation(edited,'admin').latitude,23.85);
  assert.equal(withKnownOfficeLocation({...edited,latitude:null,longitude:null},'admin').latitude,null);
  const unknown=data.items.find(x=>x.id==='official:land-helpline');assert.equal(officeDistance(unknown,origin),null);
});
test('live position requests are explicit and return useful errors without inventing a GPS point',async t=>{
  const descriptor=Object.getOwnPropertyDescriptor(globalThis,'navigator');t.after(()=>descriptor?Object.defineProperty(globalThis,'navigator',descriptor):delete globalThis.navigator);
  let calls=0;Object.defineProperty(globalThis,'navigator',{configurable:true,value:{geolocation:{getCurrentPosition(success,_error,options){calls++;assert.equal(options.enableHighAccuracy,true);success({coords:{latitude:23.8,longitude:90.2,accuracy:15},timestamp:1792321200000});}}}});
  assert.equal(calls,0);const current=await readCurrentPosition(true);assert.equal(calls,1);assert.equal(current.accuracy,15);assert.equal(current.latitude,23.8);
  Object.defineProperty(globalThis,'navigator',{configurable:true,value:{geolocation:{getCurrentPosition(_success,error){error({code:1});}}}});await assert.rejects(()=>readCurrentPosition(true),/অনুমতি/);
});

test('nationwide submissions create their own area options without depending on the office directory',async t=>{
  const app=setup(t),areas=[['পঞ্চগড়','তেঁতুলিয়া',26.49,88.34],['বরগুনা','পাথরঘাটা',22.05,89.96],['বান্দরবান','রুমা',22.04,92.42],['সিলেট','জৈন্তাপুর',25.13,92.12]];
  const ids=[];
  for(const [district,upazila,latitude,longitude] of areas){const value={...report(district,upazila),title:'Nationwide routing test',location:{district,upazila,point:{...point(),latitude,longitude}}};ids.push(value.id);assert.equal((await save(app,value)).status,201);}
  const hidden={...report('গোপন জেলা','গোপন উপজেলা'),title:'Nationwide routing test'};await save(app,hidden,'private-owner',false);
  const filters=(await app.call('/admin/report-filters',{user:'admin'})).data;
  for(const [district,upazila] of areas)assert.ok(filters.areas.some(area=>area.district===district&&area.upazila===upazila&&area.total===1));
  assert.ok(!filters.areas.some(area=>area.district==='গোপন জেলা'));assert.deepEqual(filters.offices,[]);
  assert.equal((await app.call('/admin/report-map',{user:null})).status,401);assert.equal((await app.call('/admin/report-map')).status,403);
  const map=(await app.call('/admin/report-map?q=Nationwide%20routing%20test',{user:'admin'})).data;
  assert.equal(map.total,4);assert.equal(map.located,4);assert.equal(map.unlocated,0);assert.deepEqual(new Set(map.items.map(item=>item.id)),new Set(ids));
  assert.ok(map.items.every(item=>!('report' in item)&&!('applicant' in item)&&!('sections' in item)));assert.ok(!JSON.stringify(map).includes(hidden.id));
  for(const [district,upazila] of areas){const params=new URLSearchParams({district,upazila,q:'Nationwide routing test',risk:'MEDIUM',status:'received',kind:'application',category:'boundary'});const queue=(await app.call(`/admin/queue?${params}`,{user:'admin'})).data;const selected=(await app.call(`/admin/report-map?${params}`,{user:'admin'})).data;assert.equal(selected.total,1);assert.equal(selected.items[0].id,queue.items[0].id);}
});
test('map totals include unpinned reports and location filters never invent a district position',async t=>{
  const app=setup(t),pinned={...report('কুড়িগ্রাম','চিলমারী'),title:'Map completeness test'},noPin={...report('কুড়িগ্রাম','চিলমারী'),title:'Map completeness test'};delete noPin.location.point;
  await save(app,pinned);await save(app,noPin);await save(app,{...report('কুড়িগ্রাম','চিলমারী'),title:'Map completeness test'},'hidden',false);
  const result=await app.call('/admin/report-map?'+new URLSearchParams({district:'কুড়িগ্রাম',q:'Map completeness test'}),{user:'admin'});
  assert.equal(result.status,200);assert.equal(result.data.total,2);assert.equal(result.data.located,1);assert.equal(result.data.unlocated,1);assert.deepEqual(result.data.items.map(item=>item.id),[pinned.id]);
  assert.equal((await app.call('/admin/report-map?district=%25',{user:'admin'})).data.total,0);assert.equal((await app.call('/admin/report-map?before=invalid',{user:'admin'})).status,400);
});
test('report map paginates beyond 500 pins with stable cursors and no private rows',async t=>{
  const app=setup(t);
  for(let i=0;i<503;i++)await save(app,{...report('নওগাঁ','পত্নীতলা'),title:'Map pagination test'});
  await save(app,{...report('নওগাঁ','পত্নীতলা'),title:'Map pagination test'},'private',false);
  const params=new URLSearchParams({district:'নওগাঁ',q:'Map pagination test'}),first=(await app.call(`/admin/report-map?${params}`,{user:'admin'})).data;
  assert.equal(first.total,503);assert.equal(first.items.length,500);assert.ok(first.nextCursor);params.set('before',first.nextCursor);
  const last=(await app.call(`/admin/report-map?${params}`,{user:'admin'})).data;assert.equal(last.total,503);assert.equal(last.items.length,3);assert.equal(last.nextCursor,null);assert.equal(new Set([...first.items,...last.items].map(item=>item.id)).size,503);
});
