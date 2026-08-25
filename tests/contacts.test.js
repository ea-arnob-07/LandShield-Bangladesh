import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import worker from '../server/worker.js';
import { createLocalEnv } from '../server/dev-adapter.js';
import { ensureContacts,validateContact } from '../server/land-contacts.js';
import { contactSeeds } from '../server/contact-seeds.js';
import { withOfficeReferral,officeDistance,reportLocation,officeDirections } from '../src/land/office-report.ts';
import { makeDocx } from '../src/land/export-report.ts';
import { unzipSync,strFromU8 } from 'fflate';
const root=resolve(import.meta.dirname,'..');
function setup(t){const local=createLocalEnv(root,true),env={...local.env,LOCAL_PREVIEW:false,SITE_ADMIN_USER_IDS:'["admin"]'};t.after(()=>local.close());const call=async(path,{method='GET',body,user='alice'}={})=>{const headers=new Headers();if(user)headers.set('oai-authenticated-user-id',user);if(body!==undefined)headers.set('content-type','application/json');const response=await worker.fetch(new Request(`https://land.test/api${path}`,{method,headers,...(body!==undefined?{body:JSON.stringify(body)}:{})}),env);return{status:response.status,data:await response.json()};};return{...local,env,call};}
const document=()=>({id:`LSR-${crypto.randomUUID()}`,kind:'application',title:'নামজারি আবেদনের নমুনা',summary:'আবেদনের অগ্রগতি জানতে চাই।',engine:'নমুনা',createdAt:new Date().toISOString(),category:'mutation',risk:'MEDIUM',location:{district:'ঢাকা',upazila:'সাভার'},sections:[{heading:'বিবরণ',rows:[{value:'মূল বক্তব্য সংরক্ষিত থাকবে।'}]}]});
const create=(app,report,shared=true)=>app.call('/reports',{method:'POST',body:{report,consent:true,shared}});
const assignment=(contact,version=1)=>({version,contactId:contact.id,contactVersion:contact.version,note:'জমির এখতিয়ার ও প্রকাশিত অফিসের তথ্য মিলিয়ে যোগাযোগ বাছা হয়েছে।',confirmed:true});
test('public contact recommendations match the land jurisdiction and never invent another local office',async t=>{
  const app=setup(t),savar=await app.call('/contacts?district=Dhaka%20district&upazila=Savar&category=boundary',{user:null});
  assert.equal(savar.status,200);assert.equal(savar.data.coverage,'local');assert.equal(savar.data.items[0].id,'official:savar-surveyor');assert.ok(savar.data.items.every(x=>!x.district||x.upazila==='সাভার'));
  const missing=await app.call('/contacts?district=ঢাকা&upazila=দোহার&category=mutation',{user:null});assert.equal(missing.data.coverage,'not_listed');assert.deepEqual(missing.data.items.map(x=>x.id),['official:land-helpline']);
  const area=await app.call('/contacts?district=ঢাকা&category=mutation',{user:null});assert.equal(area.data.coverage,'area_required');assert.ok(area.data.items.every(x=>!x.district));
  const pati=await app.call('/contacts?district=Chittagong&upazila=Patiya&category=mutation');assert.ok(pati.data.items.some(x=>x.id==='official:patiya-acland'));
  const people=await app.call('/admin/contacts?q=সার্ভেয়ার',{user:'admin'});assert.ok(people.data.items.some(x=>x.id==='official:savar-surveyor'));
  assert.equal((await app.call('/contacts?category=invalid')).status,400);
  assert.equal(app.sqlite.prepare('SELECT COUNT(*) n FROM land_reports').get().n,0);assert.equal(app.sqlite.prepare('SELECT COUNT(*) n FROM land_contacts').get().n,7);
});
test('directory editing requires an admin, source confirmation and a current revision',async t=>{
  const app=setup(t);assert.equal((await app.call('/admin/contacts',{user:null})).status,401);assert.equal((await app.call('/admin/contacts')).status,403);
  const input={...contactSeeds[1],officeName:'পরীক্ষার পেশাগত অফিস',personName:'কাল্পনিক পরীক্ষার পেশাজীবী',officeType:'engineer',sourceType:'professional',sourceUrl:'https://professional.example.test/contact',latitude:23.8,longitude:90.25};
  assert.equal((await app.call('/admin/contacts',{method:'POST',body:{contact:input,confirmed:true,isAdmin:true}})).status,403);
  assert.equal((await app.call('/admin/contacts',{method:'POST',user:'admin',body:{contact:input,confirmed:false}})).status,400);
  const made=await app.call('/admin/contacts',{method:'POST',user:'admin',body:{contact:input,confirmed:true}});assert.equal(made.status,201);const item=made.data.item;assert.equal(item.version,1);
  const body={contact:{...item,personName:'পরিবর্তিত পরীক্ষার পেশাজীবী'},version:1,confirmed:true};
  const change=await app.call(`/admin/contacts/${encodeURIComponent(item.id)}`,{method:'PATCH',user:'admin',body});assert.equal(change.status,200);assert.equal(change.data.item.version,2);
  assert.equal((await app.call(`/admin/contacts/${encodeURIComponent(item.id)}`,{method:'PATCH',user:'admin',body})).status,409);
  assert.equal((await app.call('/admin/contacts',{method:'POST',user:'admin',body:{contact:{...input,sourceType:'government'},confirmed:true}})).status,400);
  assert.throws(()=>validateContact({...input,sourceCheckedAt:'2026-02-30'}));assert.throws(()=>validateContact({...input,latitude:91}));assert.throws(()=>validateContact({...input,mobile:'not a phone'}));
});
test('admin assignments retain originals, isolate owners and reject stale concurrent decisions',async t=>{
  const app=setup(t),report=document(),privateDoc=document();await create(app,report);await create(app,privateDoc,false);
  const contact=(await app.call('/contacts?district=ঢাকা&upazila=সাভার&category=mutation')).data.items[0],body=assignment(contact);
  assert.equal((await app.call(`/reports/${report.id}/referral`,{method:'PATCH',body})).status,403);
  assert.equal((await app.call(`/reports/${privateDoc.id}/referral`,{method:'PATCH',user:'admin',body})).status,404);
  assert.equal((await app.call(`/reports/${report.id}/referral`,{method:'PATCH',user:'admin',body:{...body,confirmed:false}})).status,400);
  const results=await Promise.all([app.call(`/reports/${report.id}/referral`,{method:'PATCH',user:'admin',body}),app.call(`/reports/${report.id}/referral`,{method:'PATCH',user:'admin',body})]);assert.deepEqual(results.map(x=>x.status).sort(),[200,409]);
  const detail=(await app.call(`/reports/${report.id}`)).data;assert.equal(detail.item.version,2);assert.equal(detail.item.referral.contact.mobile,contact.mobile);assert.equal(detail.item.referral.needsReview,false);assert.deepEqual(detail.item.report.sections,report.sections);assert.equal(detail.events.filter(x=>x.action==='referred').length,1);
  assert.equal((await app.call(`/reports/${report.id}`,{user:'bob'})).status,404);
  const matching=await app.call(`/admin/queue?officeId=${encodeURIComponent(contact.id)}`,{user:'admin'});assert.deepEqual(matching.data.items.map(x=>x.id),[report.id]);
  const unassigned=await app.call('/admin/queue?officeId=unassigned',{user:'admin'});assert.ok(!unassigned.data.items.some(x=>x.id===report.id||x.id===privateDoc.id));
  const clear=await app.call(`/reports/${report.id}/referral`,{method:'PATCH',user:'admin',body:{...body,contactId:null,version:2}});assert.equal(clear.status,200);assert.equal((await app.call(`/reports/${report.id}`)).data.item.referral,null);
});
test('directory updates preserve previous referral snapshots and flag them for review',async t=>{
  const app=setup(t),report=document();await create(app,report);
  const contact=(await app.call('/contacts?district=ঢাকা&upazila=সাভার&category=mutation')).data.items[0];await app.call(`/reports/${report.id}/referral`,{method:'PATCH',user:'admin',body:assignment(contact)});
  const update={contact:{...contact,active:false},version:contact.version,confirmed:true};assert.equal((await app.call(`/admin/contacts/${encodeURIComponent(contact.id)}`,{method:'PATCH',user:'admin',body:update})).status,200);
  const item=(await app.call(`/reports/${report.id}`)).data.item;assert.equal(item.referral.needsReview,true);assert.equal(item.referral.contact.active,true);
  await ensureContacts({...app.env});assert.equal(app.sqlite.prepare('SELECT active FROM land_contacts WHERE id=?').get(contact.id).active,0);
  const current=(await app.call('/contacts?district=ঢাকা&upazila=সাভার&category=mutation')).data.items;assert.ok(!current.some(x=>x.id===contact.id));
  assert.equal((await app.call(`/reports/${report.id}/referral`,{method:'PATCH',user:'admin',body:assignment(contact,2)})).status,409);
});
test('reports export assigned contact details without changing the applicant report',()=>{
  const report=document(),contact={...contactSeeds[1],version:1},referral={contact,note:'উৎস ও এলাকার ভিত্তিতে যোগাযোগ নির্ধারিত।',assignedAt:'2026-10-18T07:00:00Z',assignedBy:'admin',needsReview:true};
  const copy=JSON.stringify(report),ready=withOfficeReferral(report,referral),xml=strFromU8(unzipSync(makeDocx(ready))['word/document.xml']);
  assert.equal(JSON.stringify(report),copy);assert.ok(xml.includes(contact.mobile));assert.ok(xml.includes(contact.personName));assert.ok(xml.includes(contact.sourceUrl));assert.ok(xml.includes('নিষ্ক্রিয়'));
  assert.deepEqual(reportLocation(report),report.location);assert.deepEqual(reportLocation({...report,location:undefined}),{district:'',upazila:''});
  assert.equal(officeDistance(contact,{latitude:23.8,longitude:90.2}),null);const withCoordinates={...contact,latitude:23.8,longitude:90.2};assert.equal(officeDistance(withCoordinates,{latitude:23.8,longitude:90.2}),0);assert.ok(officeDirections(withCoordinates).includes('23.8%2C90.2'));
});

test('office filter lists report assignments from any area instead of every seeded directory office',async t=>{
  const app=setup(t),initial=(await app.call('/admin/report-filters',{user:'admin'})).data;assert.deepEqual(initial.offices,[]);
  const input={...contactSeeds[1],officeName:'কাল্পনিক পরীক্ষার অফিস · কুড়িগ্রাম',personName:'কাল্পনিক পরীক্ষার যোগাযোগ',district:'কুড়িগ্রাম',upazila:'চিলমারী',officeType:'engineer',sourceType:'professional',sourceUrl:'https://professional.example.test/contact'};
  const contact=(await app.call('/admin/contacts',{method:'POST',user:'admin',body:{contact:input,confirmed:true}})).data.item;
  const value={...document(),location:{district:'কুড়িগ্রাম',upazila:'চিলমারী'}};await create(app,value);assert.equal((await app.call(`/reports/${value.id}/referral`,{method:'PATCH',user:'admin',body:assignment(contact)})).status,200);
  const filters=(await app.call('/admin/report-filters',{user:'admin'})).data;assert.equal(filters.offices.length,1);assert.equal(filters.offices[0].id,contact.id);assert.equal(filters.offices[0].officeName,input.officeName);assert.equal(filters.offices[0].total,1);
  assert.equal((await app.call('/admin/queue?'+new URLSearchParams({district:'কুড়িগ্রাম',officeId:contact.id}),{user:'admin'})).data.items[0].id,value.id);
  assert.equal((await app.call(`/reports/${value.id}/referral`,{method:'PATCH',user:'admin',body:{...assignment(contact,2),contactId:null}})).status,200);assert.deepEqual((await app.call('/admin/report-filters',{user:'admin'})).data.offices,[]);
});
