import test from 'node:test';
import assert from 'node:assert/strict';
import { unzipSync,strFromU8 } from 'fflate';
import { makeDocx,makePdf,printReport } from '../src/land/export-report.ts';
import { createCanvas,GlobalFonts } from '@napi-rs/canvas';
import { PDFDocument,PDFName } from 'pdf-lib';
import { readFileSync } from 'node:fs';
import { fitReportImage } from '../src/land/report-image-data.ts';
import { resolve } from 'node:path';
import { documentReport,applicationReport } from '../src/land/reports.ts';
import { extractDeedFields,routeApplication } from '../server/land-domain.js';
test('Word export is valid OOXML with Bengali text and XML escaping',()=>{const text='দলিল নম্বর: ৭৮৪১\nমৌজা: ধানমন্ডি\nক্রেতা: A & B <Trust>';const report=documentReport(text,extractDeedFields(text),[],'ব্যবহারকারীর পাঠ');const bytes=makeDocx(report);assert.equal(String.fromCharCode(...bytes.slice(0,2)),'PK');const files=unzipSync(bytes);assert.ok(files['[Content_Types].xml']);assert.ok(files['word/styles.xml']);const xml=strFromU8(files['word/document.xml']);assert.ok(xml.includes('দলিল নম্বর'));assert.ok(xml.includes('A &amp; B &lt;Trust&gt;'));assert.ok(xml.includes('পাওয়া যায়নি / দেওয়া হয়নি'));assert.ok(!xml.includes('100%'));});
test('application report preserves the original statement, routing reasons and attachment names',()=>{const input={description:'আমার জমির নামজারি আবেদন দীর্ঘদিন ধরে আটকে আছে, বর্তমান অগ্রগতি জানতে চাই।',applicant:'নমুনা আবেদনকারী',district:'ঢাকা',upazila:'সাভার',mouza:'বিরুলিয়া',ulid:'',dagNo:'১০৪',khatianNo:'',desiredOutcome:'অগ্রগতি জানতে চাই'};const report=applicationReport(input,routeApplication(input),['scan.pdf']);const output=JSON.stringify(report);assert.ok(output.includes(input.description));assert.ok(output.includes('scan.pdf'));assert.ok(output.includes('দপ্তর'));assert.ok(output.includes('নিয়মভিত্তিক'));assert.ok(output.includes('স্বয়ংক্রিয়ভাবে'));});
test('long reports add pages instead of truncating the final evidence',async()=>{
  GlobalFonts.registerFromPath(resolve('public/fonts/landshield-bangla-400.ttf'),'LandShield Bangla');GlobalFonts.registerFromPath(resolve('public/fonts/landshield-bangla-700.ttf'),'LandShield Bangla');
  const report=documentReport('পর্যালোচনার জন্য মূল তথ্য ও নথির উল্লেখ। '.repeat(650)+'চূড়ান্ত তথ্য অক্ষত',extractDeedFields(''),[],'নমুনা'),drawn=[];
  const bytes=await makePdf(report,()=>{const canvas=createCanvas(1240,1754),ctx=canvas.getContext('2d'),draw=ctx.fillText.bind(ctx);ctx.fillText=(value,...args)=>{drawn.push(value);draw(value,...args);};return canvas;});
  assert.ok((await PDFDocument.load(bytes)).getPageCount()>3);assert.ok(drawn.some(text=>text.includes('চূড়ান্ত তথ্য অক্ষত')));assert.ok(strFromU8(unzipSync(makeDocx(report))['word/document.xml']).includes('চূড়ান্ত তথ্য অক্ষত'));
});
test('print output escapes user text and waits for Bengali fonts',async()=>{
  const old=global.window;let html='',printed=0,loaded=0;const win={closed:false,opener:{},print(){printed++;},document:{write(value){html=value;},close(){},getElementById(){return{addEventListener(){}};},fonts:{ready:Promise.resolve(),async load(){loaded++;}}}};
  global.window={location:{origin:'https://land.test'},open:()=>win};
  try{const report=documentReport('<script>unsafe</script> & data',extractDeedFields(''),[],'নমুনা');printReport(report);await new Promise(resolve=>setImmediate(resolve));assert.ok(!html.includes('<script>unsafe'));assert.ok(html.includes('&lt;script&gt;unsafe&lt;/script&gt; &amp; data'));assert.equal(win.opener,null);assert.equal(loaded,2);assert.equal(printed,1);}finally{if(old===undefined)delete global.window;else global.window=old;}
});
test('Word embeds full original images with internal relationships and uncropped aspect ratios',()=>{
  const bytes=readFileSync('public/demo/sample-deed.png'),image={name:'দলিল & <মূল>.png',mime:'image/png',bytes,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)};
  const report=documentReport('মূল নথির সঙ্গে মিলিয়ে পর্যালোচনার নমুনা।',extractDeedFields(''),[image.name],'নমুনা');
  const files=unzipSync(makeDocx(report,[image])),xml=strFromU8(files['word/document.xml']),rels=strFromU8(files['word/_rels/document.xml.rels']);
  assert.deepEqual(files['word/media/image1.png'],new Uint8Array(bytes));assert.match(rels,/Target="media\/image1.png"/);assert.match(xml,/r:embed="rIdImage1"/);assert.match(xml,/মূল নথির ছবি/);assert.match(xml,/দলিল &amp; &lt;মূল&gt;.png/);assert.ok(!xml.includes('srcRect'));assert.ok(!rels.includes('TargetMode="External"'));
  const size=fitReportImage(image,674,640);assert.ok(size.width<=674&&size.height<=640);assert.ok(Math.abs(size.width/size.height-image.width/image.height)<.003);
  assert.throws(()=>makeDocx(report,[{...image,mime:'image/svg+xml'}]));
});

test('PDF includes the full original image and keeps a normal report within three pages',async()=>{
  GlobalFonts.registerFromPath(resolve('public/fonts/landshield-bangla-400.ttf'),'LandShield Bangla');GlobalFonts.registerFromPath(resolve('public/fonts/landshield-bangla-700.ttf'),'LandShield Bangla');
  const bytes=readFileSync('public/demo/sample-deed.png'),image={name:'নমুনা দলিল.png',mime:'image/png',bytes,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)};
  const report=documentReport('দলিল নম্বর: ৭৮৪১\nমৌজা: ধানমন্ডি\nদাগ: ১০৪',extractDeedFields('দলিল নম্বর: ৭৮৪১'),[image.name],'নমুনা');
  const output=await makePdf(report,()=>createCanvas(1240,1754),[image]),pdf=await PDFDocument.load(output);
  assert.ok(pdf.getPageCount()<=3);
  const embedded=pdf.context.enumerateIndirectObjects().map(([,obj])=>obj).filter(obj=>obj.dict?.get(PDFName.of('Subtype'))?.toString()==='/Image');
  assert.ok(embedded.some(obj=>obj.dict.get(PDFName.of('Width'))?.asNumber()===image.width&&obj.dict.get(PDFName.of('Height'))?.asNumber()===image.height));
});

test('browser-prepared JPEG images embed in both PDF and Word exports',async()=>{
  const canvas=createCanvas(300,500),ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,300,500);ctx.fillStyle='#087557';ctx.fillRect(20,20,260,460);
  const image={name:'phone-photo.jpg',mime:'image/jpeg',bytes:canvas.toBuffer('image/jpeg'),width:300,height:500},report=documentReport('ফোনের ছবির নমুনা',extractDeedFields(''),[image.name],'নমুনা');
  const files=unzipSync(makeDocx(report,[image]));assert.deepEqual(files['word/media/image1.jpg'],new Uint8Array(image.bytes));
  const pdf=await PDFDocument.load(await makePdf(report,()=>createCanvas(1240,1754),[image]));
  assert.ok(pdf.context.enumerateIndirectObjects().some(([,obj])=>obj.dict?.get(PDFName.of('Filter'))?.toString()==='/DCTDecode'));
});

test('print includes safe full image data and waits for image decoding before printing',async()=>{
  const old=global.window;let html='',printed=0,ready;const decoded=new Promise(resolve=>{ready=resolve;});
  const win={closed:false,opener:{},print(){printed++;},document:{images:[{decode:()=>decoded}],write(value){html=value;},close(){},getElementById(){return{addEventListener(){}};},fonts:{ready:Promise.resolve(),async load(){}}}};
  global.window={location:{origin:'https://land.test'},open:()=>win};
  try{
    const bytes=readFileSync('public/demo/sample-deed.png'),image={name:'" onerror="bad.png',mime:'image/png',bytes,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)};
    printReport(documentReport('নমুনা',extractDeedFields(''),[],'নমুনা'),[image]);await new Promise(resolve=>setImmediate(resolve));assert.equal(printed,0);assert.match(html,/src="data:image\/png;base64,/);assert.ok(html.includes('&quot; onerror=&quot;bad.png'));assert.ok(!html.includes('alt="" onerror="'));
    ready();await new Promise(resolve=>setImmediate(resolve));assert.equal(printed,1);
  }finally{if(old===undefined)delete global.window;else global.window=old;}
});
