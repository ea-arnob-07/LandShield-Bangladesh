import { DomainError } from './land-domain.js';
import { validateLandPoint,locationColumn } from './report-location.js';
export const database=env=>{if(!env.DB)throw new DomainError('সংরক্ষণ সেবা প্রস্তুত হয়নি।',503);return env.DB;};
export const checksum=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(b=>b.toString(16).padStart(2,'0')).join('');
export const storedRow=row=>{const report=JSON.parse(row.report),referral=row.referral?JSON.parse(row.referral):null;const name=row.owner_name||report.sections.flatMap(s=>s.rows).find(r=>['আবেদনকারী','নাম'].includes(r.label))?.value||'ব্যবহারকারী';return{id:row.id,kind:row.kind,title:row.title,status:row.status,shared:!!row.shared,version:row.version,category:row.category||'unclassified',risk:row.risk||'UNKNOWN',classifiedBy:row.classified_by||null,assignedContactId:row.assigned_contact_id||null,referral:referral?{...referral,needsReview:row.current_contact_version!==undefined&&(row.current_contact_version!==referral.contact.version||row.current_contact_active!==1)}:null,applicant:{id:row.owner,name},createdAt:row.created_at,updatedAt:row.updated_at,report};};
export const categories=['unclassified','document','buyer','mutation','record','tax','inheritance','boundary','fraud','review'];
const text=(value,max,required=true)=>{if(typeof value!=='string'||value.length>max||(required&&!value.trim()))throw new DomainError('রিপোর্টের তথ্য সঠিক নয়।');return value;};
export function validateReport(raw){
  if(!raw||!/^LSR-[0-9a-f-]{36}$/i.test(raw.id)||!['document','application','buyer'].includes(raw.kind))throw new DomainError('রিপোর্টের পরিচয় সঠিক নয়।');
  if(!Array.isArray(raw.sections)||raw.sections.length<1||raw.sections.length>20)throw new DomainError('রিপোর্টের বিভাগ সঠিক নয়।');
  const sections=raw.sections.map(section=>{if(!section||!Array.isArray(section.rows)||section.rows.length>200)throw new DomainError('রিপোর্টের পাঠ সঠিক নয়।');return{heading:text(section.heading,200),rows:section.rows.map(row=>({...(row.label===undefined?{}:{label:text(row.label,250,false)}),value:text(row.value,65000,false)}))};});
  const createdAt=text(raw.createdAt,50);if(!Number.isFinite(Date.parse(createdAt)))throw new DomainError('রিপোর্টের তারিখ সঠিক নয়।');
  const result={id:raw.id,kind:raw.kind,title:text(raw.title,250),createdAt,summary:text(raw.summary,15000,false),engine:text(raw.engine,300),sections};
  if(raw.category!==undefined){if(!categories.includes(raw.category))throw new DomainError('রিপোর্টের ধরন সঠিক নয়।');result.category=raw.category;}
  if(raw.risk!==undefined){if(!['HIGH','MEDIUM','LOW','UNKNOWN'].includes(raw.risk))throw new DomainError('ঝুঁকির মান সঠিক নয়।');result.risk=raw.risk;}
  if(raw.location!==undefined){if(!raw.location||typeof raw.location!=='object'||Array.isArray(raw.location))throw new DomainError('জমির এলাকা সঠিক নয়।');result.location={district:text(raw.location.district??'',100,false),upazila:text(raw.location.upazila??'',100,false)};if(raw.location.point!==undefined)result.location.point=validateLandPoint(raw.location.point);}
  if(JSON.stringify(result).length>120000)throw new DomainError('রিপোর্টটি খুব বড়।',413);return result;
}
export async function findRecord(env,id){return database(env).prepare('SELECT *, (SELECT name FROM land_users WHERE id=land_reports.owner) AS owner_name, (SELECT version FROM land_contacts WHERE id=land_reports.assigned_contact_id) AS current_contact_version, (SELECT active FROM land_contacts WHERE id=land_reports.assigned_contact_id) AS current_contact_active FROM land_reports WHERE id=?').bind(id).first();}
export async function ownedRecord(env,user,id){const row=await findRecord(env,id);if(!row||(row.owner!==user.id&&!(user.isAdmin&&row.shared)))throw new DomainError('রিপোর্টটি পাওয়া যায়নি।',404);return row;}
export async function saveReport(env,user,raw,shared){
  const report=validateReport(raw),reportJSON=JSON.stringify(report);const payloadHash=await checksum(new TextEncoder().encode(JSON.stringify({report,shared})));const now=new Date().toISOString();
  const results=await database(env).batch([
    database(env).prepare("INSERT OR IGNORE INTO land_reports (id,owner,kind,title,status,shared,version,payload_hash,report,created_at,updated_at,category,risk) VALUES (?,?,?,?,'received',?,1,?,?,?,?,?,?)").bind(report.id,user.id,report.kind,report.title,shared?1:0,payloadHash,reportJSON,now,now,report.category||(report.kind==='application'?'unclassified':report.kind),report.risk||'UNKNOWN'),
    database(env).prepare("INSERT INTO land_events (id,report_id,actor,action,detail,created_at) SELECT ?,?,?,'created',?,? WHERE changes()=1").bind(crypto.randomUUID(),report.id,user.id,shared?'আবেদনকারী এই কর্মক্ষেত্রের অনুমোদিত অ্যাডমিনকে পর্যালোচনার সম্মতি দিয়েছেন।':'ব্যক্তিগত রিপোর্ট সংরক্ষিত হয়েছে।',now)
  ]);
  const row=await findRecord(env,report.id);if(!row||row.owner!==user.id||row.payload_hash!==payloadHash)throw new DomainError('এই রিপোর্ট নম্বরে ভিন্ন তথ্য আছে। নতুন রিপোর্ট তৈরি করুন।',409);
  return{item:storedRow(row),replayed:!results[0].meta?.changes};
}
function reportScope(user,url,admin){
  const where=[admin?'shared=1':'owner=?'],args=admin?[]:[user.id];
  const statusGroup=url.searchParams.get('status');if(statusGroup==='active')where.push("status IN ('reviewing','needs_documents','escalated')");else if(statusGroup==='open')where.push("status NOT IN ('resolved','rejected')");
  for(const [key,allowed]of [['kind',['document','application','buyer']],['status',['received','reviewing','needs_documents','escalated','resolved','rejected']],['category',categories],['risk',['HIGH','MEDIUM','LOW','UNKNOWN']]]){const value=url.searchParams.get(key);if(key==='status'&&['active','open'].includes(value))continue;if(value&&value!=='all'){if(!allowed.includes(value))throw new DomainError('ফিল্টার সঠিক নয়।');where.push(`${key}=?`);args.push(value);}}
  const office=url.searchParams.get('officeId');if(office&&office!=='all'){if(office==='unassigned')where.push('assigned_contact_id IS NULL');else if(office==='assigned')where.push('assigned_contact_id IS NOT NULL');else{if(office.length>100||!/^[a-zA-Z0-9:_-]+$/.test(office))throw new DomainError('অফিসের ফিল্টার সঠিক নয়।');where.push('assigned_contact_id=?');args.push(office);}}
  for(const key of ['district','upazila']){const value=url.searchParams.get(key);if(value&&value!=='all'){if(value.length>100||/[\u0000-\u001f]/.test(value))throw new DomainError('এলাকার ফিল্টার সঠিক নয়।');if(value==='__missing__')where.push(`${locationColumn(key)}=''`);else{where.push(`lower(${locationColumn(key)})=lower(trim(?))`);args.push(value);}}}
  const applicant=url.searchParams.get('applicantId');if(applicant&&applicant!=='all'){if(applicant.length>200||/[\u0000-\u001f]/.test(applicant))throw new DomainError('আবেদনকারীর ফিল্টার সঠিক নয়।');where.push('owner=?');args.push(applicant);}
  const q=(url.searchParams.get('q')||'').trim().slice(0,180);if(q){where.push("(title LIKE ? ESCAPE '\\' OR id LIKE ? ESCAPE '\\' OR report LIKE ? ESCAPE '\\')");const value=`%${q.replace(/[\\%_]/g,'\\$&')}%`;args.push(value,value,value);}
  return{where,args};
}
function reportCursor(url,where,args){
  const before=url.searchParams.get('before');if(before){let cursor;try{cursor=JSON.parse(before);}catch{throw new DomainError('তালিকার পৃষ্ঠা সঠিক নয়।');}if(!Array.isArray(cursor)||cursor.length!==2||typeof cursor[0]!=='string'||typeof cursor[1]!=='string')throw new DomainError('তালিকার পৃষ্ঠা সঠিক নয়।');where.push('(created_at<? OR (created_at=? AND id<?))');args.push(cursor[0],cursor[0],cursor[1]);}
}
export async function listReports(env,user,url,admin=false){
  const db=database(env),{where,args}=reportScope(user,url,admin);
  const count=await db.prepare(`SELECT COUNT(*) AS total FROM land_reports WHERE ${where.join(' AND ')}`).bind(...args).first();
  reportCursor(url,where,args);
  const rows=(await db.prepare(`SELECT *, (SELECT name FROM land_users WHERE id=land_reports.owner) AS owner_name FROM land_reports WHERE ${where.join(' AND ')} ORDER BY created_at DESC,id DESC LIMIT 31`).bind(...args).all()).results;
  const items=rows.slice(0,30).map(row=>{const item=storedRow(row);return{...item,report:{...item.report,sections:[]}};});const last=items.at(-1);
  return{items,total:count.total,nextCursor:rows.length>30?JSON.stringify([last.createdAt,last.id]):null};
}
export async function adminReportFilters(env){
  const db=database(env);
  const areas=(await db.prepare(`SELECT ${locationColumn('district')} AS district,${locationColumn('upazila')} AS upazila,COUNT(*) AS total FROM land_reports WHERE shared=1 GROUP BY 1,2 ORDER BY 1,2`).all()).results;
  const applicants=(await db.prepare("SELECT owner AS id,COALESCE((SELECT name FROM land_users WHERE id=land_reports.owner),'') AS name,COUNT(*) AS total FROM land_reports WHERE shared=1 GROUP BY owner ORDER BY total DESC,owner LIMIT 500").all()).results;
  const assignments=(await db.prepare("SELECT assigned_contact_id AS id,COUNT(*) AS total,(SELECT referral FROM land_reports AS latest WHERE latest.shared=1 AND latest.assigned_contact_id=land_reports.assigned_contact_id ORDER BY latest.updated_at DESC,latest.id DESC LIMIT 1) AS snapshot FROM land_reports WHERE shared=1 AND assigned_contact_id IS NOT NULL GROUP BY assigned_contact_id ORDER BY total DESC,id LIMIT 500").all()).results;
  const offices=assignments.map(row=>{const contact=JSON.parse(row.snapshot||'null')?.contact;return{id:row.id,total:row.total,officeName:contact?.officeName||'অফিসের তথ্য অনুপস্থিত',personName:contact?.personName||'',designation:contact?.designation||''};});
  return{areas,applicants,offices};
}
export async function adminReportMap(env,user,url){
  const db=database(env),{where,args}=reportScope(user,url,true);
  const latitude="json_extract(report,'$.location.point.latitude')",longitude="json_extract(report,'$.location.point.longitude')";
  const valid=`json_type(report,'$.location.point.latitude') IN ('integer','real') AND json_type(report,'$.location.point.longitude') IN ('integer','real') AND abs(${latitude})<=90 AND abs(${longitude})<=180`;
  const counts=await db.prepare(`SELECT COUNT(*) AS total,COALESCE(SUM(CASE WHEN ${valid} THEN 1 ELSE 0 END),0) AS located FROM land_reports WHERE ${where.join(' AND ')}`).bind(...args).first();
  where.push(`(${valid})`);reportCursor(url,where,args);
  const rows=(await db.prepare(`SELECT id,title,risk,status,created_at AS createdAt,${locationColumn('district')} AS district,${locationColumn('upazila')} AS upazila,${latitude} AS latitude,${longitude} AS longitude FROM land_reports WHERE ${where.join(' AND ')} ORDER BY created_at DESC,id DESC LIMIT 501`).bind(...args).all()).results;
  const items=rows.slice(0,500),last=items.at(-1);
  return{items,total:counts.total,located:counts.located,unlocated:counts.total-counts.located,nextCursor:rows.length>500?JSON.stringify([last.createdAt,last.id]):null};
}
export async function adminOverview(env){
  const db=database(env);
  const counts=await db.prepare("SELECT COUNT(*) AS total, COALESCE(SUM(status='received'),0) AS pending, COALESCE(SUM(risk='HIGH' AND status NOT IN ('resolved','rejected')),0) AS highRisk, COALESCE(SUM(status IN ('reviewing','needs_documents','escalated')),0) AS active, COALESCE(SUM(status='resolved'),0) AS resolved, COALESCE(SUM(owner IN (SELECT id FROM land_users WHERE is_demo=1)),0) AS demoCount FROM land_reports WHERE shared=1").first();
  const byCategory=(await db.prepare('SELECT category,COUNT(*) AS count FROM land_reports WHERE shared=1 GROUP BY category ORDER BY count DESC,category').all()).results;
  const urgent=(await db.prepare("SELECT * FROM land_reports WHERE shared=1 AND risk='HIGH' AND status NOT IN ('resolved','rejected') ORDER BY created_at DESC,id DESC LIMIT 3").all()).results.map(row=>{const item=storedRow(row);return{...item,report:{...item.report,sections:[]}};});
  return{counts,byCategory,urgent};
}
export async function classifyReport(env,user,row,body){
  if(!user.isAdmin||!row.shared)throw new DomainError('শ্রেণিবিন্যাসের অনুমতি নেই।',403);
  if(body.version!==row.version)throw new DomainError('অবস্থা বদলেছে। সর্বশেষ তথ্য আবার খুলুন।',409);
  if(!categories.includes(body.category)||!['HIGH','MEDIUM','LOW','UNKNOWN'].includes(body.risk))throw new DomainError('ধরন ও ঝুঁকি বাছুন।');
  const now=new Date().toISOString(),db=database(env);const result=await db.batch([
    db.prepare('UPDATE land_reports SET category=?,risk=?,classified_by=?,version=version+1,updated_at=? WHERE id=? AND version=? AND shared=1').bind(body.category,body.risk,user.id,now,row.id,row.version),
    db.prepare("INSERT INTO land_events (id,report_id,actor,action,detail,created_at) SELECT ?,?,?,'classified',?,? WHERE changes()=1").bind(crypto.randomUUID(),row.id,user.id,`ধরন: ${({unclassified:'শ্রেণিবিন্যাস বাকি',document:'দলিল পর্যালোচনা',buyer:'ক্রেতার যাচাই',mutation:'নামজারি',record:'খতিয়ান / রেকর্ড',tax:'ভূমি কর',inheritance:'উত্তরাধিকার',boundary:'সীমানা / দখল',fraud:'দলিলের অসঙ্গতি',review:'সাধারণ পর্যালোচনা'})[body.category]}; ঝুঁকি: ${({HIGH:'উচ্চ',MEDIUM:'মাঝারি',LOW:'কম',UNKNOWN:'নির্ধারণ বাকি'})[body.risk]} (অ্যাডমিনের প্রাথমিক শ্রেণিবিন্যাস)`,now)
  ]);if(!result[0].meta?.changes)throw new DomainError('অবস্থা বদলেছে। আবার খুলুন।',409);return storedRow(await findRecord(env,row.id));
}
export async function changeStatus(env,user,row,body){
  if(!user.isAdmin)throw new DomainError('অনুমোদিত অ্যাডমিন প্রয়োজন।',403);
  if(!row.shared)throw new DomainError('ব্যক্তিগত রিপোর্টের অনুমতি নেই।',403);
  if(body.version!==row.version)throw new DomainError('অবস্থা বদলেছে। সর্বশেষ তথ্য আবার খুলুন।',409);
  const status=body.status;if(!['reviewing','needs_documents','escalated','resolved','rejected'].includes(status))throw new DomainError('সঠিক অবস্থা বাছুন।');
  if(['resolved','rejected'].includes(row.status))throw new DomainError('সমাপ্ত কেসে নতুন আবেদন / পর্যালোচনা প্রয়োজন।',409);
  const note=text(body.note,3000);if(note.trim().length<8)throw new DomainError('সিদ্ধান্তের কারণ অন্তত ৮ অক্ষরে লিখুন।');
  if(['resolved','rejected'].includes(status)&&body.humanReviewed!==true)throw new DomainError('সমাপ্তির আগে মানবীয় পর্যালোচনা নিশ্চিত করুন।');
  const now=new Date().toISOString();const result=await database(env).batch([
    database(env).prepare('UPDATE land_reports SET status=?,version=version+1,updated_at=? WHERE id=? AND version=? AND shared=1').bind(status,now,row.id,row.version),
    database(env).prepare('INSERT INTO land_events (id,report_id,actor,action,detail,created_at) SELECT ?,?,?,?,?,? WHERE changes()=1').bind(crypto.randomUUID(),row.id,user.id,status,note,now)
  ]);if(!result[0].meta?.changes)throw new DomainError('অবস্থা বদলেছে। সর্বশেষ তথ্য আবার খুলুন।',409);return storedRow(await findRecord(env,row.id));
}
