import { DomainError } from './land-domain.js';
import { checksum,database } from './land-storage.js';

const encoder=new TextEncoder(),SESSION_DAYS=7,ITERATIONS=100000;
const hex=bytes=>Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
const unhex=value=>new Uint8Array(value.match(/../g).map(x=>parseInt(x,16)));
const random=()=>hex(crypto.getRandomValues(new Uint8Array(32)));
const secret=env=>{if(!env.LAND_AUTH_PEPPER)throw new DomainError('অ্যাকাউন্ট সেবা প্রস্তুত হয়নি।',503);return env.LAND_AUTH_PEPPER;};
// WebCrypto PBKDF2 is capped at 100,000 iterations in Workers. A separate,
// server-only HMAC pepper protects a database-only disclosure; never ship it.
export async function hashPassword(password,env,salt=random()){
  const key=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveBits']);
  const derived=await crypto.subtle.deriveBits({name:'PBKDF2',salt:unhex(salt),iterations:ITERATIONS,hash:'SHA-256'},key,256);
  const pepper=await crypto.subtle.importKey('raw',encoder.encode(secret(env)),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  return `pbkdf2-sha256+hmac$${ITERATIONS}$${salt}$${hex(new Uint8Array(await crypto.subtle.sign('HMAC',pepper,derived)))}`;
}
export async function verifyPassword(password,encoded,env){
  if(!/^pbkdf2-sha256\+hmac\$100000\$[a-f0-9]{64}\$[a-f0-9]{64}$/.test(encoded||''))return false;
  const actual=await hashPassword(password,env,encoded.split('$')[2]);
  let diff=actual.length^encoded.length;for(let i=0;i<actual.length;i++)diff|=actual.charCodeAt(i)^(encoded.charCodeAt(i)||0);return diff===0;
}
export const publicUser=row=>({id:row.id,displayName:row.name,email:row.email,phone:row.phone,district:row.district,address:row.address,createdAt:row.created_at,isAdmin:row.role==='admin',isDemo:!!row.is_demo,provider:row.is_demo?'demo':'password',localPreview:false});
const cookieName=req=>new URL(req.url).protocol==='https:'?'__Host-land_session':'land_session_dev';
const tokenOf=req=>{const name=cookieName(req);return(req.headers.get('cookie')||'').split(';').map(v=>v.trim()).find(v=>v.startsWith(`${name}=`))?.slice(name.length+1);};
const cookie=(req,value,maxAge)=>`${cookieName(req)}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${new URL(req.url).protocol==='https:'?'; Secure':''}`;
export const clearAccountCookie=req=>cookie(req,'',0);
export async function accountIdentity(req,env){
  const token=tokenOf(req);if(token===undefined)return undefined;if(!/^[a-f0-9]{64}$/.test(token))return null;
  const row=await database(env).prepare('SELECT u.* FROM land_sessions s JOIN land_users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?').bind(await checksum(encoder.encode(token)),Date.now()).first();return row?publicUser(row):null;
}
export async function issueSession(req,env,row){
  const token=random(),expires=Date.now()+SESSION_DAYS*86400000,db=database(env),old=tokenOf(req);
  await db.batch([
    db.prepare('DELETE FROM land_sessions WHERE expires_at<=? OR token_hash=?').bind(Date.now(),await checksum(encoder.encode(old||''))),
    db.prepare('INSERT INTO land_sessions (token_hash,user_id,expires_at) VALUES (?,?,?)').bind(await checksum(encoder.encode(token)),row.id,expires)
  ]);
  return{user:publicUser(row),cookie:cookie(req,token,SESSION_DAYS*86400)};
}
export async function logout(req,env){const token=tokenOf(req);if(token)await database(env).prepare('DELETE FROM land_sessions WHERE token_hash=?').bind(await checksum(encoder.encode(token))).run();return cookie(req,'out',86400);}
const emailOf=value=>{if(typeof value!=='string'||value.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))throw new DomainError('সঠিক ইমেইল ঠিকানা দিন।');return value.trim().toLowerCase();};
const field=(value,max,required=false)=>{if(typeof value!=='string'||value.trim().length>max||(required&&!value.trim()))throw new DomainError('নাম ও যোগাযোগের তথ্য সঠিকভাবে দিন।');return value.trim();};
const passwordOf=value=>{if(typeof value!=='string'||value.length<8||value.length>128)throw new DomainError('পাসওয়ার্ড ৮–১২৮ অক্ষরের হতে হবে।');return value;};
export async function authLimit(req,env,action,email=''){
  const db=database(env),now=Date.now(),ip=req.headers.get('cf-connecting-ip')||'local';
  const buckets=[[`ip:${action}:${ip}`,action==='register'?10:40,15*60000],[`email:${action}:${email}`,action==='register'?5:10,15*60000]];
  for(const [value,max,window]of buckets){const key=await checksum(encoder.encode(`${secret(env)}:${value}`));const row=await db.prepare('INSERT INTO land_auth_limits (key,hits,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET hits=CASE WHEN expires_at<=? THEN 1 ELSE hits+1 END,expires_at=CASE WHEN expires_at<=? THEN excluded.expires_at ELSE expires_at END RETURNING hits').bind(key,now+window,now,now).first();if(row.hits>max)throw new DomainError('অনেকবার চেষ্টা হয়েছে। ১৫ মিনিট পরে আবার চেষ্টা করুন।',429);}
  await db.prepare('DELETE FROM land_auth_limits WHERE expires_at<=?').bind(now).run();
}
export async function ensureAdmin(env){
  if(!env.LAND_ADMIN_BOOTSTRAP)return;
  let value;try{value=JSON.parse(env.LAND_ADMIN_BOOTSTRAP);}catch{throw new DomainError('অ্যাডমিন কনফিগারেশন সঠিক নয়।',503);}
  const items=Array.isArray(value)?value:[value];
  for(const item of items){
    if(!/^account:[a-f0-9-]{36}$/.test(item.id)||!/^pbkdf2-sha256\+hmac\$100000\$[a-f0-9]{64}\$[a-f0-9]{64}$/.test(item.passwordHash||''))throw new DomainError('অ্যাডমিন কনফিগারেশন সঠিক নয়।',503);
    const email=emailOf(item.email);
    await database(env).prepare("INSERT OR IGNORE INTO land_users (id,email,name,password_hash,role,is_demo,created_at) VALUES (?,?,?,?,'admin',0,?)").bind(item.id,email,field(item.name,100,true),item.passwordHash,new Date().toISOString()).run();
    const row=await database(env).prepare('SELECT id,role FROM land_users WHERE email=?').bind(email).first();if(row.id!==item.id||row.role!=='admin')throw new DomainError('অ্যাডমিন অ্যাকাউন্টের পরিচয় মিলছে না।',503);
  }
}
export async function register(req,env,body){
  const email=emailOf(body.email),password=passwordOf(body.password),name=field(body.name,100,true);
  await authLimit(req,env,'register',email);await ensureAdmin(env);
  if(email.endsWith('@demo.landshield.example'))throw new DomainError('এই ঠিকানা ডেমোর জন্য সংরক্ষিত।');
  if(await database(env).prepare('SELECT id FROM land_users WHERE email=?').bind(email).first())throw new DomainError('এই ইমেইল ব্যবহার করা যাচ্ছে না। লগইন করুন বা অন্য ইমেইল দিন।',409);
  const row={id:`account:${crypto.randomUUID()}`,email,name,password_hash:await hashPassword(password,env),role:'user',is_demo:0,phone:field(body.phone||'',30),district:field(body.district||'',100),address:field(body.address||'',500),created_at:new Date().toISOString()};
  try{await database(env).prepare('INSERT INTO land_users (id,email,name,password_hash,role,is_demo,phone,district,address,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)').bind(row.id,row.email,row.name,row.password_hash,row.role,0,row.phone,row.district,row.address,row.created_at).run();}catch(error){if(String(error.message).includes('UNIQUE'))throw new DomainError('এই ইমেইল ব্যবহার করা যাচ্ছে না।',409);throw error;}
  return issueSession(req,env,row);
}
export async function login(req,env,body){
  const email=emailOf(body.email),password=passwordOf(body.password);await authLimit(req,env,'login',email);await ensureAdmin(env);
  const row=await database(env).prepare("SELECT * FROM land_users WHERE email=? AND (is_demo=0 OR (id='demo:boundary' AND is_demo=1 AND role='user'))").bind(email).first();
  // Unknown accounts still pay the same KDF cost and return the same error.
  const dummy=`pbkdf2-sha256+hmac$100000$${'0'.repeat(64)}$${'0'.repeat(64)}`;
  if(!await verifyPassword(password,row?.password_hash||dummy,env)||!row)throw new DomainError('ইমেইল বা পাসওয়ার্ড সঠিক নয়।',401);
  if(body.admin===true&&row.role!=='admin')throw new DomainError('এই অ্যাকাউন্টে অ্যাডমিন অনুমতি নেই।',403);
  return issueSession(req,env,row);
}
export async function updateProfile(env,user,body){
  if(user.provider!=='password'||user.isDemo)throw new DomainError('এই অ্যাকাউন্টের প্রোফাইল এখানে পরিবর্তন করা যাবে না।',403);
  await database(env).prepare('UPDATE land_users SET name=?,phone=?,district=?,address=? WHERE id=?').bind(field(body.name,100,true),field(body.phone||'',30),field(body.district||'',100),field(body.address||'',500),user.id).run();
  return publicUser(await database(env).prepare('SELECT * FROM land_users WHERE id=?').bind(user.id).first());
}
