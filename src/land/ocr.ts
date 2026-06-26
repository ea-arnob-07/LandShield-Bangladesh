import pdfWorkerURL from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import type { Worker } from 'tesseract.js';
import { DOCX_MIME,validateDocx } from '../../server/land-files.js';
export interface OCRText { text:string; engine:string; pages:number; confidence:number|null }
export function validateDocumentFiles(files:File[]){
  if(files.length>5)throw new Error('একবারে সর্বোচ্চ ৫টি ফাইল দিন।');
  if(files.reduce((s,f)=>s+f.size,0)>25*1024*1024)throw new Error('সব ফাইল মিলিয়ে সর্বোচ্চ ২৫ MB দিন।');
  for(const file of files){if(!['image/jpeg','image/png','image/webp','application/pdf','text/plain',DOCX_MIME].includes(file.type))throw new Error(`${file.name}: JPG, PNG, WebP, PDF, DOCX বা TXT দিন।`);if(file.size>10*1024*1024)throw new Error(`${file.name}: ফাইলটি ১০ MB-এর মধ্যে রাখুন।`);}
}
export const hashFile=async(file:File)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',await file.arrayBuffer()))).map(b=>b.toString(16).padStart(2,'0')).join('');
export async function readDocuments(files:File[],onProgress:(text:string,percent:number)=>void,signal:AbortSignal):Promise<OCRText>{
  validateDocumentFiles(files);let worker:Worker|null=null,pages=0,totalText='',confidenceSum=0,recognitions=0;
  const cancelled=()=>{if(signal.aborted)throw new DOMException('পড়া বন্ধ হয়েছে।','AbortError');};
  const terminate=()=>{if(worker)void worker.terminate().catch(()=>{});};signal.addEventListener('abort',terminate,{once:true});
  const readImage=async(image:File|HTMLCanvasElement)=>{cancelled();if(!worker){onProgress('বাংলা ও ইংরেজি OCR প্রস্তুত হচ্ছে…',5);const {createWorker}=await import('tesseract.js');worker=await createWorker(['ben','eng'],1,{workerPath:'/ocr/worker.min.js',corePath:'/ocr/core',langPath:'/ocr/lang',logger:m=>{if(m.status==='recognizing text')onProgress('নথির লেখা পড়া হচ্ছে…',Math.round(m.progress*100));}});cancelled();}
    const {data}=await worker.recognize(image);cancelled();recognitions++;confidenceSum+=Number(data.confidence)||0;return data.text;
  };
  try{
    for(const file of files){cancelled();onProgress(`${file.name} পড়া হচ্ছে…`,0);totalText+=`\n[উৎস: ${file.name}]\n`;
      if(file.type===DOCX_MIME){pages++;const bytes=new Uint8Array(await file.arrayBuffer());validateDocx(bytes);const {unzipSync,strFromU8}=await import('fflate');const entries=unzipSync(bytes,{filter:file=>file.name==='word/document.xml'&&file.originalSize<=2*1024*1024});if(!entries['word/document.xml'])throw new Error('DOCX-এর পাঠ পাওয়া যায়নি।');const xml=new DOMParser().parseFromString(strFromU8(entries['word/document.xml']),'application/xml');if(xml.getElementsByTagName('parsererror').length)throw new Error('DOCX-এর পাঠ সঠিক নয়।');totalText+=Array.from(xml.getElementsByTagNameNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main','p')).map(p=>Array.from(p.getElementsByTagNameNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main','t')).map(t=>t.textContent||'').join('')).join('\n');continue;}
      if(file.type==='text/plain'){pages++;totalText+=(await file.text()).slice(0,50000);continue;}
      if(file.type!=='application/pdf'){pages++;if(pages>10)throw new Error('সর্বোচ্চ ১০টি পৃষ্ঠা একবারে পড়ুন।');totalText+=await readImage(file);continue;}
      const pdfjs=await import('pdfjs-dist');pdfjs.GlobalWorkerOptions.workerSrc=pdfWorkerURL;
      const loading=pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer())});const abortPDF=()=>void loading.destroy();signal.addEventListener('abort',abortPDF,{once:true});
      let pdf;try{pdf=await loading.promise;if(pages+pdf.numPages>10)throw new Error('সব ফাইল মিলিয়ে সর্বোচ্চ ১০টি পৃষ্ঠা দিন।');
        for(let n=1;n<=pdf.numPages;n++){cancelled();pages++;const page=await pdf.getPage(n);const content=await page.getTextContent();const text=content.items.map(x=>'str'in x?x.str+('hasEOL'in x&&x.hasEOL?'\n':' '):'').join('');totalText+=`\n[পৃষ্ঠা ${n}]\n`;if(text.trim().length>=40){totalText+=text;continue;}const view=page.getViewport({scale:1.8});if(view.width*view.height>12_000_000)throw new Error('PDF পৃষ্ঠাটি খুব বড়; সাধারণ A4 আকারে দিন।');const canvas=document.createElement('canvas');canvas.width=view.width;canvas.height=view.height;const ctx=canvas.getContext('2d');if(!ctx)throw new Error('PDF পৃষ্ঠা পড়া যাচ্ছে না।');await page.render({canvas,canvasContext:ctx,viewport:view}).promise;totalText+=await readImage(canvas);page.cleanup();}
      }finally{signal.removeEventListener('abort',abortPDF);if(pdf)await pdf.destroy();else await loading.destroy();}
    }
    cancelled();if(totalText.length>60000)throw new Error('লেখা খুব বেশি; নথিটি ছোট ভাগে দিন।');return{text:totalText.trim(),pages,confidence:recognitions?Math.round(confidenceSum/recognitions):null,engine:recognitions?'Tesseract LSTM 7 · বাংলা + English OCR':'নথির পাঠ সরাসরি পড়া হয়েছে'};
  }finally{signal.removeEventListener('abort',terminate);if(worker)await worker.terminate().catch(()=>{});}
}
