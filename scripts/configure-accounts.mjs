// Pipe the returned values directly into the hosting secret configuration.
// Input and output contain secrets: never commit them or add them to the ZIP.
import { createInterface } from 'node:readline';
import { execFileSync } from 'node:child_process';
import { hashPassword } from '../server/land-auth.js';
if(process.stdin.isTTY)execFileSync('stty',['-echo'],{stdio:['inherit','ignore','ignore']});
console.log('Ready for account configuration JSON on stdin (input is hidden).');
try{
  const input=createInterface({input:process.stdin,terminal:false});
  for await(const line of input){
    const value=JSON.parse(line);if(typeof value.password!=='string'||value.password.length<8||typeof value.email!=='string'||!value.email.includes('@'))throw new Error('Valid email and password required');
    const pepper=Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');
    const passwordHash=await hashPassword(value.password,{LAND_AUTH_PEPPER:pepper});
    console.log(JSON.stringify({pepper,bootstrap:JSON.stringify({id:`account:${crypto.randomUUID()}`,email:value.email.trim().toLowerCase(),name:value.name||'ভূমিসেবা অ্যাডমিন',passwordHash})}));
    input.close();break;
  }
}finally{if(process.stdin.isTTY)execFileSync('stty',['echo'],{stdio:['inherit','ignore','ignore']});}
