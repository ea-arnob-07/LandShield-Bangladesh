// Local adapter for the same Worker handlers. No second API implementation.
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync, readdirSync, existsSync, writeFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import worker from './worker.js';
export function createLocalEnv(root, memory=false) {
  if(existsSync(join(root,'.env'))&&typeof process.loadEnvFile==='function'){try{process.loadEnvFile(join(root,'.env'));}catch{}}
  const data=join(root,'.data');mkdirSync(join(data,'media'),{recursive:true});
  const sqlite=new DatabaseSync(memory?':memory:':join(data,'landshield.sqlite'));
  sqlite.exec('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; CREATE TABLE IF NOT EXISTS local_migrations (name TEXT PRIMARY KEY);');
  for(const name of readdirSync(join(root,'drizzle')).filter(n=>n.endsWith('.sql')).sort()){
    if(sqlite.prepare('SELECT name FROM local_migrations WHERE name=?').get(name))continue;
    sqlite.exec('BEGIN');
    try {sqlite.exec(readFileSync(join(root,'drizzle',name),'utf8'));sqlite.prepare('INSERT INTO local_migrations (name) VALUES (?)').run(name);sqlite.exec('COMMIT');}
    catch(e){sqlite.exec('ROLLBACK');throw e;}
  }
  const runSync=Symbol('local-sqlite-run');
  const prepare=(sql)=>{
    let args=[];
    const stmt={bind(...values){args=values;return stmt;},async first(){return sqlite.prepare(sql).get(...args)||null;},async all(){return{results:sqlite.prepare(sql).all(...args)};},[runSync](){const result=sqlite.prepare(sql).run(...args);return{success:true,meta:{changes:Number(result.changes),last_row_id:Number(result.lastInsertRowid)}};},async run(){return stmt[runSync]();}};
    return stmt;
  };
  // DatabaseSync statements must stay in one uninterrupted transaction. Awaiting
  // between them allowed other requests to read partial writes or begin a batch.
  const DB={prepare,async batch(statements){sqlite.exec('BEGIN IMMEDIATE');try{const out=statements.map(s=>s[runSync]());sqlite.exec('COMMIT');return out;}catch(e){sqlite.exec('ROLLBACK');throw e;}}};
  const pathFor=key=>{if(!/^(?:land-evidence|evidence)\/[\w-]+$/.test(key))throw new Error('Invalid object key');return join(data,'media',key.split('/')[1]);};
  const BUCKET={async put(key,bytes){writeFileSync(pathFor(key),Buffer.from(bytes));},async get(key){const p=pathFor(key);return existsSync(p)?{body:readFileSync(p)}:null;},async delete(key){const p=pathFor(key);if(existsSync(p))unlinkSync(p);}};
  const ASSETS={async fetch(req){const name=new URL(req.url).pathname.match(/^\/demo\/(sample-deed\.png|application-report\.pdf|document-report\.docx)$/)?.[1];if(!name||!existsSync(join(root,'public','demo',name)))return new Response('Not found',{status:404});return new Response(readFileSync(join(root,'public','demo',name)));}};
  return {env:{DB,BUCKET,ASSETS,LOCAL_PREVIEW:false,LAND_AUTH_PEPPER:process.env.LAND_AUTH_PEPPER||'local-development-only-not-for-hosting',...(process.env.LAND_DEMO_PASSWORD?{LAND_DEMO_PASSWORD:process.env.LAND_DEMO_PASSWORD}:{}),...(process.env.LAND_ADMIN_BOOTSTRAP?{LAND_ADMIN_BOOTSTRAP:process.env.LAND_ADMIN_BOOTSTRAP}:{}),...(process.env.PHOTON_ENDPOINT?{PHOTON_ENDPOINT:process.env.PHOTON_ENDPOINT}:{}),...(process.env.OPENAI_API_KEY?{OPENAI_API_KEY:process.env.OPENAI_API_KEY}:{}),...(process.env.AI_MODEL?{AI_MODEL:process.env.AI_MODEL}:{})},sqlite,close:()=>sqlite.close()};
}
export function landApiPlugin() {
  let local;
  return{name:'landshield-api',configureServer(server){
    local=createLocalEnv(server.config.root);
    server.middlewares.use(async(req,res,next)=>{
      if(!req.url?.startsWith('/api/'))return next();
      try{
        const chunks=[];let size=0;
        for await(const part of req){size+=part.length;if(size>11*1024*1024){res.statusCode=413;res.end('{"error":"ফাইলটি খুব বড়।"}');return;}chunks.push(part);}
        const origin=`http://${req.headers.host||'localhost:4173'}`;
        const init={method:req.method,headers:req.headers};
        if(!['GET','HEAD'].includes(req.method))init.body=Buffer.concat(chunks);
        const response=await worker.fetch(new Request(new URL(req.url,origin),init),local.env,{});
        res.statusCode=response.status;response.headers.forEach((v,k)=>res.setHeader(k,v));
        res.end(Buffer.from(await response.arrayBuffer()));
      }catch(e){console.error(e.message);res.statusCode=503;res.setHeader('content-type','application/json');res.end(JSON.stringify({error:'স্থানীয় সেবা সাময়িকভাবে পাওয়া যাচ্ছে না।'}));}
    });
    server.httpServer?.once('close',()=>local?.close());
  }};
}
