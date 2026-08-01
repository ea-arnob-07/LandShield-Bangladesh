import { database,saveReport,checksum } from './land-storage.js';
import { DomainError } from './land-domain.js';
import { issueSession,authLimit,hashPassword } from './land-auth.js';
export const demoAccounts=[
  {id:'demo:mutation',name:'রহিমা বেগম',district:'ঢাকা',subject:'নামজারি আবেদনের অগ্রগতি',category:'mutation',risk:'LOW',kind:'application',statement:'আমার কেনা জমির নামজারি আবেদন আটকে আছে। প্রয়োজনীয় কাগজ ও পরবর্তী ধাপ জানতে চাই।',office:'উপজেলা সহকারী কমিশনার (ভূমি) কার্যালয়',file:'application-report.pdf',mime:'application/pdf'},
  {id:'demo:boundary',name:'করিম উদ্দিন',district:'চট্টগ্রাম',subject:'জমির সীমানা নিয়ে বিরোধ',category:'boundary',risk:'MEDIUM',kind:'application',statement:'পাশের জমির সীমানার সঙ্গে আমার জমির দাগের অমিল আছে। মৌজা ম্যাপ মিলিয়ে পর্যালোচনা চাই।',office:'সংশ্লিষ্ট ভূমি অফিস এবং প্রয়োজন অনুযায়ী আইনগত সহায়তা',file:'sample-deed.png',mime:'image/png'},
  {id:'demo:deed',name:'নুসরাত জাহান',district:'রাজশাহী',subject:'দলিলের তথ্য পর্যালোচনা',category:'document',risk:'UNKNOWN',kind:'document',statement:'স্ক্যান করা নমুনা দলিল থেকে তথ্য সাজানো হয়েছে। মূল দলিলের সঙ্গে মিলিয়ে দেখা বাকি।',office:'সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিস',file:'document-report.docx',mime:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
  {id:'demo:buyer',name:'হাসান আহমেদ',district:'খুলনা',subject:'কেনার আগে দলিলের অমিল যাচাই',category:'buyer',risk:'HIGH',kind:'buyer',statement:'ক্রয়ের আগে মালিকের নাম ও দলিলের ধারাবাহিকতায় অমিলের নমুনা পাওয়া গেছে। যাচাই ছাড়া অর্থ পরিশোধ স্থগিত রাখার নির্দেশনা প্রয়োজন।',office:'সাব-রেজিস্ট্রি অফিস ও এসি (ভূমি) অফিস',file:'application-report.pdf',mime:'application/pdf'}
].map((x,i)=>({...x,email:`demo${i+1}@demo.landshield.example`,reportId:`LSR-00000000-0000-4000-8000-00000000000${i+1}`}));

// Existing sample IDs and reviews remain intact; new cases belong to the same
// four fictional users. These are examples, never actual office decisions.
export const demoProblems=[...demoAccounts.map(x=>({...x,status:'received'})),
  {owner:1,subject:'একই জমি একাধিকবার বিক্রির অভিযোগ',category:'fraud',risk:'HIGH',status:'escalated',statement:'একই দাগের জমির জন্য দুইজনের নামে দলিল দেখানো হচ্ছে। নিবন্ধন ও মালিকানার ধারাবাহিকতা যাচাইয়ের নমুনা আবেদন।',office:'সাব-রেজিস্ট্রি অফিস ও প্রয়োজন অনুযায়ী আইনগত সহায়তা',note:'নমুনা কেসে মূল নিবন্ধন ও পক্ষের তথ্য মিলিয়ে উচ্চতর পর্যালোচনার জন্য রাখা হয়েছে।'},
  {owner:0,subject:'ভূমি করের দাখিলায় টাকার অমিল',category:'tax',risk:'LOW',status:'received',statement:'আগের দাখিলা ও বর্তমান হোল্ডিংয়ের করের অঙ্ক মিলছে না। রসিদ ও হোল্ডিংয়ের তথ্য তুলনা করার নমুনা সমস্যা।',office:'ইউনিয়ন / পৌর ভূমি অফিস'},
  {owner:2,subject:'ওয়ারিশদের নাম ও হিস্যার কাগজ অসম্পূর্ণ',category:'inheritance',risk:'MEDIUM',status:'needs_documents',statement:'উত্তরাধিকারসূত্রে পাওয়া জমির কিছু ওয়ারিশের তথ্য দেওয়া হয়নি। প্রয়োজনীয় সনদ ও সহ-মালিকের কাগজ সংগ্রহের নমুনা আবেদন।',office:'উপজেলা ভূমি অফিস',note:'নমুনা পর্যালোচনায় ওয়ারিশ সনদ এবং সহ-মালিকদের সম্পূর্ণ তালিকা প্রয়োজন বলে দেখানো হয়েছে।'},
  {owner:3,subject:'খতিয়ানে মালিকের নামের বানান ভুল',category:'record',risk:'MEDIUM',status:'reviewing',statement:'দলিল ও খতিয়ানে মালিকের নামের বানান আলাদা। উৎস নথি মিলিয়ে সংশোধনের করণীয় জানার নমুনা আবেদন।',office:'সংশ্লিষ্ট রেকর্ড রুম / ভূমি অফিস',note:'নমুনা দলিল ও খতিয়ানের তথ্য তুলনার ধাপে আছে।'},
  {owner:0,subject:'নামজারির অতিরিক্ত কাগজ জমার নির্দেশনা',category:'mutation',risk:'MEDIUM',status:'resolved',statement:'নামজারির সঙ্গে কোন অতিরিক্ত কাগজ দিতে হবে তা জানতে চাওয়া হয়েছিল। সম্পন্ন অবস্থার ইন্টারফেস দেখানোর জন্য এই কাল্পনিক উদাহরণ।',office:'সহকারী কমিশনার (ভূমি) কার্যালয়',note:'ডেমোতে কাগজের তালিকা বুঝিয়ে পর্যালোচনা সম্পন্ন দেখানো হয়েছে; এটি বাস্তব নামজারি নিষ্পত্তি নয়।'},
  {owner:1,subject:'মৌজা ম্যাপ ও বাস্তব সীমানার অমিল',category:'boundary',risk:'MEDIUM',status:'reviewing',statement:'পুরোনো মৌজা ম্যাপের দাগ ও বর্তমান সীমানার মধ্যে অমিল দেখা যাচ্ছে। ম্যাপ ও পরিমাপ মিলিয়ে দেখার নমুনা সমস্যা।',office:'জরিপ অফিস ও উপজেলা ভূমি অফিস',note:'নমুনা ম্যাপ ও পরিমাপের কাগজ পর্যালোচনা চলছে।'}
].map((problem,i)=>i<4?problem:{...demoAccounts[problem.owner],...problem,kind:'application',reportId:`LSR-00000000-0000-4000-8000-${String(i+1).padStart(12,'0')}`});

const seeded=new WeakMap();
export async function ensureDemos(env,origin){
  let current=seeded.get(env);
  if(!current||current.expires<Date.now()){
    const promise=seedDemos(env,origin);current={promise,expires:Date.now()+60000};seeded.set(env,current);
    promise.catch(()=>{if(seeded.get(env)?.promise===promise)seeded.delete(env);});
  }
  return current.promise;
}

async function seedDemos(env,origin){
  const db=database(env),created='2026-10-18T06:00:00.000Z';
  await db.batch(demoAccounts.map(demo=>db.prepare("INSERT OR IGNORE INTO land_users (id,email,name,password_hash,role,is_demo,district,created_at) VALUES (?,?,?,'','user',1,?,?)").bind(demo.id,demo.email,demo.name,demo.district,created)));
  // The shared password only opens a fictional, read-only user.
  const password=env.LAND_DEMO_PASSWORD;
  if(typeof password==='string'&&password.length>=8&&password.length<=128){
    const account=await db.prepare("SELECT password_hash FROM land_users WHERE id=? AND is_demo=1 AND role='user'").bind(demoAccounts[1].id).first();
    if(account&&!account.password_hash){
      const encoded=await hashPassword(password,env);
      await db.prepare("UPDATE land_users SET password_hash=? WHERE id=? AND is_demo=1 AND role='user' AND password_hash=''").bind(encoded,demoAccounts[1].id).run();
    }
  }
  const ids=demoProblems.map(x=>x.reportId),marks=ids.map(()=>'?').join(','),existing=new Set((await db.prepare(`SELECT id FROM land_reports WHERE id IN (${marks})`).bind(...ids).all()).results.map(x=>x.id));
  const attachments=new Set((await db.prepare(`SELECT DISTINCT report_id FROM land_attachments WHERE report_id IN (${marks})`).bind(...ids).all()).results.map(x=>x.report_id));
  const sources=new Map();
  for(const demo of demoProblems){
    if(!existing.has(demo.reportId)){
      const saved=await saveReport(env,{id:demo.id},{id:demo.reportId,kind:demo.kind,title:`নমুনা ${demo.subject}`,createdAt:created,summary:demo.statement,engine:'কাল্পনিক ডেমো তথ্য · বাস্তব আবেদন নয়',category:demo.category,risk:demo.risk,sections:[{heading:'আবেদনকারীর পরিচয়',rows:[{label:'নাম',value:demo.name},{label:'জেলা',value:demo.district},{label:'তথ্যের ধরন',value:'সবার জন্য উন্মুক্ত কাল্পনিক নমুনা। কোনো বাস্তব ব্যক্তি বা জমির দাবি নয়।'}]},{heading:'মূল বক্তব্য ও করণীয়',rows:[{value:demo.statement},{label:'প্রস্তাবিত দপ্তর',value:demo.office},{label:'পরবর্তী ধাপ',value:'মূল নথি এবং সরকারি উৎস মিলিয়ে দায়িত্বপ্রাপ্ত ব্যক্তির পর্যালোচনা নিন।'}]},{heading:'নমুনা সংযুক্তি',rows:[{value:demo.file},{value:'এই ফাইলটি ইন্টারফেস পরীক্ষা করার নমুনা; দাবির পক্ষে বাস্তব প্রমাণ নয়।'}]}]},true);
      if(!saved.replayed&&demo.status!=='received'){
        const reviewedAt=new Date(Math.max(Date.now(),Date.parse(saved.item.createdAt)+1)).toISOString();
        await db.batch([
          db.prepare('UPDATE land_reports SET status=?,version=2,updated_at=? WHERE id=? AND owner=? AND version=1').bind(demo.status,reviewedAt,demo.reportId,demo.id),
          db.prepare('INSERT INTO land_events (id,report_id,actor,action,detail,created_at) SELECT ?,?,?,?,?,? WHERE changes()=1').bind(crypto.randomUUID(),demo.reportId,'demo-seed',demo.status,demo.note,reviewedAt)
        ]);
      }
    }
    if(!attachments.has(demo.reportId)&&env.ASSETS&&env.BUCKET){
      let bytes=sources.get(demo.file);
      if(!bytes){
      const response=await env.ASSETS.fetch(new Request(`${origin}/demo/${demo.file}`));if(!response.ok)continue;
      bytes=new Uint8Array(await response.arrayBuffer());if(bytes.length>5*1024*1024)continue;sources.set(demo.file,bytes);
      }
      const id=crypto.randomUUID(),key=`land-evidence/${id}`;await env.BUCKET.put(key,bytes,{httpMetadata:{contentType:demo.mime}});
      const result=await db.prepare('INSERT OR IGNORE INTO land_attachments (id,report_id,owner,object_key,filename,mime,size,sha256,created_at) VALUES (?,?,?,?,?,?,?,?,?)').bind(id,demo.reportId,demo.id,key,`নমুনা-${demo.file}`,demo.mime,bytes.length,await checksum(bytes),created).run();if(!result.meta?.changes)await env.BUCKET.delete(key);
    }
  }
  return demoAccounts.map(({id,name,email,district,subject},index)=>({index,id,name,email,district,subject}));
}
export async function demoLogin(req,env,body,origin){
  if(!Number.isInteger(body.index)||body.index<0||body.index>=demoAccounts.length)throw new DomainError('ডেমো অ্যাকাউন্ট বাছুন।');
  await authLimit(req,env,'demo',String(body.index));await ensureDemos(env,origin);
  const row=await database(env).prepare('SELECT * FROM land_users WHERE id=? AND is_demo=1 AND role=\'user\'').bind(demoAccounts[body.index].id).first();return issueSession(req,env,row);
}
