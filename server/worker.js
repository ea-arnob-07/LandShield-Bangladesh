import { DomainError,routeApplication } from './land-domain.js';
import { database,storedRow,ownedRecord,saveReport,changeStatus,checksum,listReports,classifyReport,adminOverview,adminReportFilters,adminReportMap,ensureSchema } from './land-storage.js';
import { aiStructure } from './land-ai.js';
import { searchPlaces } from './map-search.js';
import { accountIdentity,register,login,logout,updateProfile,clearAccountCookie } from './land-auth.js';
import { ensureDemos,demoLogin,demoAccounts } from './land-demos.js';
import { DOCX_MIME,validateDocx } from './land-files.js';
import { contacts,saveContact,assignContact } from './land-contacts.js';
const json=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
export function requestIdentity(req,env){
  const id=req.headers.get('oai-authenticated-user-id');
  if(!id){if(env.LOCAL_PREVIEW===true)return{id:'local-land-preview',displayName:'স্থানীয় নমুনা ব্যবহারকারী',email:null,localPreview:true,isAdmin:true};return null;}
  let name=req.headers.get('oai-authenticated-user-full-name');const email=req.headers.get('oai-authenticated-user-email')||null;
  if(req.headers.get('oai-authenticated-user-full-name-encoding')==='percent-encoded-utf-8'){try{name=name?decodeURIComponent(name):null;}catch{name=null;}}
  let admins=[];try{admins=JSON.parse(env.SITE_ADMIN_USER_IDS||'[]');}catch{admins=String(env.SITE_ADMIN_USER_IDS||'').split(',').map(v=>v.trim());}
  return{id,displayName:name?.trim()||email||'ভূমিসেবা ব্যবহারকারী',email,provider:'platform',localPreview:false,isAdmin:Array.isArray(admins)&&admins.includes(id)};
}
async function boundedBytes(req,limit){
  if(Number(req.headers.get('content-length'))>limit)throw new DomainError('ফাইল / অনুরোধটি খুব বড়।',413);
  const reader=req.body?.getReader();if(!reader)return new Uint8Array();const parts=[];let size=0;
  try{while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>limit){await reader.cancel();throw new DomainError('ফাইল / অনুরোধটি খুব বড়।',413);}parts.push(value);}}finally{reader.releaseLock();}
  const bytes=new Uint8Array(size);let offset=0;for(const part of parts){bytes.set(part,offset);offset+=part.byteLength;}return bytes;
}
async function bodyOf(req,limit=300000){const bytes=await boundedBytes(req,limit);try{const body=JSON.parse(new TextDecoder().decode(bytes));if(!body||typeof body!=='object'||Array.isArray(body))throw new Error('Invalid body');return body;}catch{throw new DomainError('অনুরোধের তথ্য সঠিক নয়।');}}
function requireUser(user){if(!user)throw new DomainError('নিজের রিপোর্ট সংরক্ষণ করতে ব্যবহারকারী লগইন করুন।',401);return user;}
function requireAdmin(user){requireUser(user);if(!user.isAdmin)throw new DomainError('এই অ্যাকাউন্টে অ্যাডমিনের অনুমতি নেই।',403);}
function validateSignature(file,bytes){
  if(file.type===DOCX_MIME){validateDocx(bytes);return;}
  const begins=new TextDecoder().decode(bytes.slice(0,12));
  const ok=(file.type==='image/jpeg'&&bytes[0]===255&&bytes[1]===216)||(file.type==='image/png'&&bytes[0]===137&&begins.slice(1,4)==='PNG')||(file.type==='image/webp'&&begins.startsWith('RIFF')&&begins.slice(8,12)==='WEBP')||(file.type==='application/pdf'&&begins.startsWith('%PDF-'))||(file.type==='video/mp4'&&begins.slice(4,8)==='ftyp')||(file.type==='video/webm'&&bytes[0]===26&&bytes[1]===69&&bytes[2]===223&&bytes[3]===163)||(file.type==='text/plain'&&!bytes.slice(0,1000).includes(0));
  if(!ok)throw new DomainError('ফাইলের ধরন ও আসল তথ্য মিলছে না। JPG, PNG, WebP, PDF, DOCX, TXT, MP4 বা WebM দিন।');
}
async function api(req,env,url){
  const account=await accountIdentity(req,env),user=account===undefined?requestIdentity(req,env):account;
  if(!['GET','HEAD'].includes(req.method)){const origin=req.headers.get('origin');if(origin&&origin!==url.origin)throw new DomainError('অন্য ওয়েবসাইট থেকে পরিবর্তনের অনুমতি নেই।',403);}
  if(url.pathname==='/api/health'&&req.method==='GET')return json({ok:true,project:'LandShield · BhumiSeba',storage:!!env.DB,aiAvailable:!!env.OPENAI_API_KEY});
  if(url.pathname==='/api/session'&&req.method==='GET')return json({authenticated:!!user,user,aiAvailable:!!env.OPENAI_API_KEY});
  if(url.pathname==='/api/contacts'&&req.method==='GET')return json(await contacts(env,url));
  if(url.pathname==='/api/admin/contacts'){
    requireAdmin(user);
    if(req.method==='GET')return json(await contacts(env,url,true));
    if(req.method==='POST')return json({item:await saveContact(env,user,null,await bodyOf(req,12000))},201);
  }
  const contactPath=url.pathname.match(/^\/api\/admin\/contacts\/([^/]+)$/);
  if(contactPath&&req.method==='PATCH'){requireAdmin(user);return json({item:await saveContact(env,user,decodeURIComponent(contactPath[1]),await bodyOf(req,12000))});}
  const auth=url.pathname.match(/^\/api\/auth\/(login|register|logout|demos|demo|profile|platform-sso)$/);
  if(auth){
    const action=auth[1];
    if(action==='platform-sso'&&req.method==='GET'){await logout(req,env);return new Response(null,{status:302,headers:{location:'/signin-with-platform?return_to=%2F%23%2Faccount','set-cookie':clearAccountCookie(req),'cache-control':'no-store'}});}
    if(action==='demos'&&req.method==='GET')return json({items:await ensureDemos(env,url.origin)});
    if(action==='logout'&&req.method==='POST'){const response=json({authenticated:false,user:null});response.headers.set('set-cookie',await logout(req,env));return response;}
    if(action==='profile'&&req.method==='PATCH'){requireUser(user);return json({user:await updateProfile(env,user,await bodyOf(req,4000))});}
    if(['login','register','demo'].includes(action)&&req.method==='POST'){
      if(!req.headers.get('content-type')?.startsWith('application/json'))throw new DomainError('JSON ফরম্যাট প্রয়োজন।',415);
      const body=await bodyOf(req,4000);
      if(action==='login'&&typeof body.email==='string'&&body.email.trim().toLowerCase()===demoAccounts[1].email)await ensureDemos(env,url.origin);
      const result=action==='register'?await register(req,env,body):action==='login'?await login(req,env,body):await demoLogin(req,env,body,url.origin);
      if(result.user.isAdmin)await ensureDemos(env,url.origin);
      const response=json({authenticated:true,user:result.user,aiAvailable:!!env.OPENAI_API_KEY},action==='register'?201:200);response.headers.set('set-cookie',result.cookie);return response;
    }
  }
  if(url.pathname==='/api/land/analyze'&&req.method==='POST')return json({analysis:routeApplication(await bodyOf(req,40000))});
  if(url.pathname==='/api/map/search'&&req.method==='GET')return json(await searchPlaces(url.searchParams.get('q'),env));
  if(url.pathname==='/api/ai/structure'&&req.method==='POST'){requireUser(user);return json(await aiStructure(await bodyOf(req,4*1024*1024),env));}
  if(url.pathname==='/api/reports'){
    requireUser(user);
    if(req.method==='GET')return json(await listReports(env,user,url));
    if(req.method==='POST'){if(user.isDemo)throw new DomainError('ডেমোতে নতুন ব্যক্তিগত তথ্য রাখা যায় না। নিজের অ্যাকাউন্ট খুলুন।',403);const body=await bodyOf(req);if(body.consent!==true)throw new DomainError('সংরক্ষণের আগে সম্মতি দিন।');if(typeof body.shared!=='boolean')throw new DomainError('পর্যালোচনার অনুমতি বাছুন।');const result=await saveReport(env,user,body.report,body.shared);return json(result,result.replayed?200:201);}
  }
  if(url.pathname==='/api/admin/queue'&&req.method==='GET'){requireAdmin(user);await ensureDemos(env,url.origin);return json(await listReports(env,user,url,true));}
  if(url.pathname==='/api/admin/overview'&&req.method==='GET'){requireAdmin(user);await ensureDemos(env,url.origin);return json(await adminOverview(env));}
  if(url.pathname==='/api/admin/report-filters'&&req.method==='GET'){requireAdmin(user);await ensureDemos(env,url.origin);return json(await adminReportFilters(env));}
  if(url.pathname==='/api/admin/report-map'&&req.method==='GET'){requireAdmin(user);await ensureDemos(env,url.origin);return json(await adminReportMap(env,user,url));}
  const record=url.pathname.match(/^\/api\/reports\/(LSR-[0-9a-f-]{36})(?:\/(attachments|status|classification|referral))?$/i);
  if(record){requireUser(user);const row=await ownedRecord(env,user,record[1]);
    if(req.method==='PATCH'&&record[2]==='referral'){requireAdmin(user);const referral=await assignContact(env,user,row,await bodyOf(req,5000));return json({referral});}
    if(req.method==='GET'&&!record[2]){const attachments=(await database(env).prepare('SELECT id,filename,mime,size,sha256 FROM land_attachments WHERE report_id=? ORDER BY created_at').bind(row.id).all()).results.map(a=>({...a,url:`/api/attachments/${a.id}`}));const events=(await database(env).prepare('SELECT id,actor,action,detail,created_at AS createdAt FROM land_events WHERE report_id=? ORDER BY created_at').bind(row.id).all()).results;return json({item:storedRow(row),attachments,events});}
    if(req.method==='PATCH'&&record[2]==='status'){requireAdmin(user);return json({item:await changeStatus(env,user,row,await bodyOf(req,10000))});}
    if(req.method==='PATCH'&&record[2]==='classification'){requireAdmin(user);return json({item:await classifyReport(env,user,row,await bodyOf(req,2000))});}
    if(req.method==='POST'&&record[2]==='attachments'){
      if(user.isDemo)throw new DomainError('ডেমোতে ব্যক্তিগত সংযুক্তি দেওয়া যায় না।',403);
      if(row.owner!==user.id)throw new DomainError('শুধু আবেদনকারী নতুন ফাইল যোগ করতে পারবেন।',403);
      if(!env.BUCKET)throw new DomainError('ফাইল সংরক্ষণ প্রস্তুত হয়নি।',503);
      const bytes=await boundedBytes(req,11*1024*1024);const form=await new Request(req.url,{method:'POST',headers:req.headers,body:bytes}).formData();const file=form.get('file');
      if(!file||typeof file==='string'||!file.size||file.size>10*1024*1024)throw new DomainError('১০ MB-এর মধ্যে একটি ফাইল দিন।');
      const fileBytes=new Uint8Array(await file.arrayBuffer());validateSignature(file,fileBytes);const sha256=await checksum(fileBytes);
      const existing=await database(env).prepare('SELECT * FROM land_attachments WHERE owner=? AND report_id=? AND sha256=?').bind(user.id,row.id,sha256).first();if(existing)return json({id:existing.id,url:`/api/attachments/${existing.id}`,filename:existing.filename,replayed:true});
      const count=await database(env).prepare('SELECT COUNT(*) AS total FROM land_attachments WHERE report_id=?').bind(row.id).first();if(count.total>=10)throw new DomainError('একটি রিপোর্টে সর্বোচ্চ ১০টি সংযুক্তি রাখুন।');
      const id=crypto.randomUUID(),key=`land-evidence/${id}`,now=new Date().toISOString(),filename=String(file.name).split(/[\\/]/).pop().replace(/[\x00-\x1f\x7f]/g,'').slice(0,200)||'attachment';
      await env.BUCKET.put(key,fileBytes,{httpMetadata:{contentType:file.type}});
      let results;try{results=await database(env).batch([
        database(env).prepare('INSERT OR IGNORE INTO land_attachments (id,report_id,owner,object_key,filename,mime,size,sha256,created_at) SELECT ?,?,?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM land_attachments WHERE report_id=?)<10').bind(id,row.id,user.id,key,filename,file.type,file.size,sha256,now,row.id),
        database(env).prepare("INSERT INTO land_events (id,report_id,actor,action,detail,created_at) SELECT ?,?,?,'attachment',?,? WHERE changes()=1").bind(crypto.randomUUID(),row.id,user.id,`সংযুক্তি: ${filename}`,now)
      ]);}catch(error){await env.BUCKET.delete(key);throw error;}
      if(!results[0].meta?.changes){await env.BUCKET.delete(key);const replay=await database(env).prepare('SELECT * FROM land_attachments WHERE owner=? AND report_id=? AND sha256=?').bind(user.id,row.id,sha256).first();if(replay)return json({id:replay.id,url:`/api/attachments/${replay.id}`,filename:replay.filename,replayed:true});throw new DomainError('সংযুক্তির সীমা পূর্ণ হয়েছে।',409);}
      return json({id,url:`/api/attachments/${id}`,filename,sha256,replayed:false},201);
    }
  }
  const attachment=url.pathname.match(/^\/api\/attachments\/([0-9a-f-]{36})$/i);
  if(attachment&&req.method==='GET'){requireUser(user);const file=await database(env).prepare('SELECT * FROM land_attachments WHERE id=?').bind(attachment[1]).first();if(!file)throw new DomainError('ফাইলটি পাওয়া যায়নি।',404);await ownedRecord(env,user,file.report_id);const object=await env.BUCKET.get(file.object_key);if(!object)throw new DomainError('ফাইলটি পাওয়া যায়নি।',404);return new Response(object.body,{headers:{'content-type':file.mime,'cache-control':'private, no-store','x-content-type-options':'nosniff','content-security-policy':"default-src 'none'; sandbox",'content-disposition':`attachment; filename*=UTF-8''${encodeURIComponent(file.filename)}`}});}
  throw new DomainError('এই ঠিকানার সেবা পাওয়া যায়নি।',404);
}
export default {async fetch(req,env){const url=new URL(req.url);if(url.pathname.startsWith('/api/')){try{await ensureSchema(env);return await api(req,env,url);}catch(error){if(!(error instanceof DomainError))console.error('Land API failure',error.message);return json({error:error instanceof DomainError?error.message:'সেবাটি সাময়িকভাবে পাওয়া যাচ্ছে না। লেখা রেখে আবার চেষ্টা করুন।'},error.status||503);}}const response=await env.ASSETS.fetch(req);const out=new Response(response.body,response);out.headers.set('X-Content-Type-Options','nosniff');out.headers.set('Referrer-Policy','strict-origin-when-cross-origin');out.headers.set('Permissions-Policy','geolocation=(self), microphone=(self), camera=(self)');return out;}};
