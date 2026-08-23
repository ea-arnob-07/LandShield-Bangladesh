import test from 'node:test';
import assert from 'node:assert/strict';
import { aiStructure } from '../server/land-ai.js';

const env={OPENAI_API_KEY:'unit-test-only',AI_MODEL:'configured-model'};
const request={kind:'application',text:'আমার জমির নামজারি আবেদন দীর্ঘদিন ধরে আটকে আছে।',consent:true};

test('optional AI sends consented evidence with a server credential and strict output format',async t=>{
  const response={transcript:request.text,summary:'নামজারির অগ্রগতি সম্পর্কে সহায়তা প্রয়োজন।'};
  t.mock.method(globalThis,'fetch',async(url,init)=>{
    assert.equal(url,'https://api.openai.com/v1/responses');
    assert.equal(init.headers.authorization,'Bearer unit-test-only');
    const payload=JSON.parse(init.body);
    assert.equal(payload.model,env.AI_MODEL);
    assert.equal(payload.input[0].content[0].text,request.text);
    assert.equal(payload.text.format.strict,true);
    assert.match(payload.instructions,/Never invent missing facts/);
    return Response.json({output:[{content:[{type:'output_text',text:JSON.stringify(response)}]}]});
  });
  const result=await aiStructure(request,env);
  assert.equal(result.transcript,request.text);
  assert.equal(result.summary,response.summary);
  assert.match(result.engine,/মানবীয় যাচাই বাকি/);
});

test('AI consent and missing evidence fail before contacting the provider',async t=>{
  let calls=0;t.mock.method(globalThis,'fetch',async()=>{calls++;throw new Error('should not run');});
  await assert.rejects(aiStructure({...request,consent:false},env),e=>e.status===400);
  await assert.rejects(aiStructure({...request,text:''},env),e=>e.status===400);
  await assert.rejects(aiStructure({...request,text:'x'.repeat(18001)},env),e=>e.status===400);
  assert.equal(calls,0);
});

test('malformed and empty provider results are rejected without inventing a transcript',async t=>{
  for(const value of ['not json',JSON.stringify({transcript:'',summary:'খালি পাঠ'})]){
    const mock=t.mock.method(globalThis,'fetch',async()=>Response.json({output:[{content:[{type:'output_text',text:value}]}]}));
    await assert.rejects(aiStructure(request,env),e=>e.status===502);
    mock.mock.restore();
  }
});
