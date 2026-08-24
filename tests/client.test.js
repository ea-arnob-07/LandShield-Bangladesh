import test from 'node:test';
import assert from 'node:assert/strict';
import { api, ApiError } from '../src/land/api.ts';
import { signInPath, signOutPath } from '../src/land/auth.ts';
test('API preserves status errors and caller headers for conflict recovery',async t=>{
  const original=globalThis.fetch;t.after(()=>{globalThis.fetch=original;});
  globalThis.fetch=async(url,options)=>{assert.equal(url,'/api/cases/example/action');assert.equal(options.headers.get('x-demo'),'yes');assert.equal(options.headers.get('content-type'),'application/json');return new Response(JSON.stringify({error:'Reload the latest case'}),{status:409});};
  await assert.rejects(api('/cases/example/action',{method:'POST',body:'{}',headers:new Headers({'x-demo':'yes'})}),e=>e instanceof ApiError&&e.status===409&&e.message==='Reload the latest case');
});
test('API gives a useful error when a proxy returns HTML instead of JSON',async t=>{
  const original=globalThis.fetch;t.after(()=>{globalThis.fetch=original;});
  globalThis.fetch=async()=>new Response('<html>Unavailable</html>',{status:503});
  await assert.rejects(api('/state'),e=>e instanceof ApiError&&e.status===503&&!e.message.includes('<html>'));
});
test('cancelled case reads retain AbortError and pass cancellation to fetch',async t=>{
  const original=globalThis.fetch;t.after(()=>{globalThis.fetch=original;});const controller=new AbortController();
  globalThis.fetch=async(_url,options)=>new Promise((_resolve,reject)=>{options.signal.addEventListener('abort',()=>reject(new DOMException('Cancelled','AbortError')),{once:true});});
  const pending=api('/state',{signal:controller.signal});controller.abort();
  await assert.rejects(pending,e=>e.name==='AbortError');
});
test('hosted sign-in returns to the requested workspace without external redirects',()=>{
  const path='/#/land/profile';
  assert.equal(signInPath(path),`/signin-with-platform?return_to=${encodeURIComponent(path)}`);
  for(const unsafe of ['https://outside.test','//outside.test','/\\outside.test','/signin-with-platform','/signout-with-platform','/callback'])assert.equal(signInPath(unsafe),'/signin-with-platform?return_to=%2F');
  assert.equal(signOutPath(),'/signout-with-platform?return_to=%2F');
});
test('a protected API session expiry closes the signed-in interface and preserves the status',async t=>{
  const previousFetch=globalThis.fetch,previousWindow=Object.getOwnPropertyDescriptor(globalThis,'window');const events=[];
  Object.defineProperty(globalThis,'window',{configurable:true,value:{dispatchEvent:event=>events.push(event.type)}});
  t.after(()=>{globalThis.fetch=previousFetch;if(previousWindow)Object.defineProperty(globalThis,'window',previousWindow);else delete globalThis.window;});
  globalThis.fetch=async()=>new Response(JSON.stringify({error:'Sign in required'}),{status:401});
  await assert.rejects(api('/cases/example/action',{method:'POST',body:'{}'}),e=>e instanceof ApiError&&e.status===401);
  assert.deepEqual(events,['ns-session-expired']);
  globalThis.fetch=async()=>new Response('<html>Sign in</html>',{status:401});
  await assert.rejects(api('/state'),e=>e instanceof ApiError&&e.status===401);
  assert.deepEqual(events,['ns-session-expired','ns-session-expired']);
});
