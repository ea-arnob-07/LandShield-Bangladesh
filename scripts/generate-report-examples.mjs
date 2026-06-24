// Synthetic fixtures generated through the same exports used in the UI.
import { mkdir,writeFile,readFile,copyFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { makeDocx,makePdf } from '../src/land/export-report.ts';
import { documentReport,applicationReport } from '../src/land/reports.ts';
import { withOfficeReferral } from '../src/land/office-report.ts';
import { contactSeeds } from '../server/contact-seeds.js';
import { withKnownOfficeLocation } from '../server/office-locations.js';
import { extractDeedFields,routeApplication } from '../server/land-domain.js';
import { checksum } from '../server/land-storage.js';
const require=createRequire(import.meta.url),{createCanvas,GlobalFonts}=require('@napi-rs/canvas');
GlobalFonts.registerFromPath('public/fonts/landshield-bangla-400.ttf','LandShield Bangla');
GlobalFonts.registerFromPath('public/fonts/landshield-bangla-700.ttf','LandShield Bangla');
await mkdir('docs/examples',{recursive:true});await mkdir('public/demo',{recursive:true});
const text='দলিল নম্বর: ৭৮৪১\nতারিখ: ১৫/০৩/২০২২\nমৌজা: ধানমন্ডি\nদাগ নম্বর: ১২০৪\nখতিয়ান নম্বর: ৮৪২১\nপরিমাণ: ৭.৫ শতক\nবিক্রেতা: নমুনা দাতা\nক্রেতা: নমুনা গ্রহীতা\n\nএটি কাল্পনিক দলিলের পাঠ। কোনো বাস্তব জমির দলিল বা মালিকানার দাবি নয়। দলিলের নম্বর, দাগ, খতিয়ান, জমির পরিমাণ ও পক্ষের নাম মূল সরকারি উৎসের সঙ্গে যাচাই করতে হবে।';
const doc=documentReport(text,extractDeedFields(text),[{name:'sample-deed.png',sha256:await checksum(await readFile('docs/examples/sample-deed.png'))}],'ব্যবহারকারী পর্যালোচিত নমুনা পাঠ');
const input={applicant:'নমুনা আবেদনকারী',description:'আমার কেনা জমির নামজারি আবেদন দীর্ঘদিন ধরে আটকে আছে। আবেদন নম্বর ও প্রাপ্তিস্বীকার আছে, কিন্তু বর্তমান অগ্রগতি জানতে পারছি না। মৌজা ও দাগ নম্বরের সঙ্গে জমা দেওয়া কাগজের তথ্য মিলিয়ে পরবর্তী ধাপ জানতে চাই। আগের মালিকের খতিয়ান এবং নিবন্ধিত দলিলের অনুলিপি সঙ্গে আছে। সংশ্লিষ্ট দপ্তরে প্রয়োজনীয় তথ্যসহ একটি পরিষ্কার আবেদন দিতে চাই। এটি ইন্টারফেস পরীক্ষার জন্য কাল্পনিক নমুনা, বাস্তব আবেদন নয়।',district:'ঢাকা',upazila:'সাভার',mouza:'বিরুলিয়া',ulid:'',dagNo:'১০৪',khatianNo:'৮৪২১',desiredOutcome:'আবেদনের অগ্রগতি ও প্রয়োজনীয় অতিরিক্ত কাগজের তালিকা জানতে চাই।',point:{latitude:23.834225,longitude:90.2576536,label:'নমুনা নির্বাচিত স্থান সাভার (বাস্তব জমির দাবি নয়)',source:'coordinates',capturedAt:'2026-10-18T11:00:00.000Z'}};
const app=withOfficeReferral(applicationReport(input,routeApplication(input),['sample-deed.png','নমুনা-প্রাপ্তিস্বীকার.pdf']),{contact:withKnownOfficeLocation({...contactSeeds.find(x=>x.id==='official:savar-acland'),version:1},'source-seed'),note:'কাল্পনিক নমুনায় যোগাযোগের তথ্য দেখানোর উদাহরণ; বাস্তব দায়িত্ব অর্পণ নয়।',assignedBy:'example-admin',assignedAt:'2026-10-18T10:00:00.000Z'});
const imageBytes=new Uint8Array(await readFile('docs/examples/sample-deed.png'));
const dimensions=new DataView(imageBytes.buffer,imageBytes.byteOffset,imageBytes.byteLength);
const images=[{name:'sample-deed.png',mime:'image/png',bytes:imageBytes,width:dimensions.getUint32(16),height:dimensions.getUint32(20)}];
for(const [name,report,id]of [['document-report',doc,1],['application-report',app,2]]){
  report.id=`LSR-10000000-0000-4000-8000-00000000000${id}`;report.createdAt='2026-10-18T06:00:00.000Z';
  await writeFile(`docs/examples/${name}.docx`,makeDocx(report,images));
  await writeFile(`docs/examples/${name}.pdf`,await makePdf(report,()=>createCanvas(1240,1754),images));
  await writeFile(`docs/examples/${name}.json`,JSON.stringify(report,null,2)+'\n');
}
for(const name of ['sample-deed.png','document-report.docx','application-report.pdf'])await copyFile(`docs/examples/${name}`,`public/demo/${name}`);
console.log('Synthetic PDF, Word and demo attachment fixtures updated.');
