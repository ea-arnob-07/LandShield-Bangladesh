import { useEffect,useState } from 'react';
import type { Attachment,ReportImage } from './types';

const isImage=(mime:string)=>['image/jpeg','image/png','image/webp'].includes(mime);
type PreviewImage=ReportImage&{url:string};

async function prepare(blob:Blob,name:string,signal:AbortSignal):Promise<ReportImage>{
  if(blob.size>10*1024*1024)throw new Error('ছবিটি ১০ MB সীমার বেশি।');
  signal.throwIfAborted();
  const bitmap=await createImageBitmap(blob);
  try{
    signal.throwIfAborted();
    if(!bitmap.width||!bitmap.height||bitmap.width*bitmap.height>50000000)throw new Error('ছবিটির রেজোলিউশন বেশি। ছোট কপি দিয়ে আবার চেষ্টা করুন।');
    const scale=Math.min(1,2400/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));
    const ctx=canvas.getContext('2d');if(!ctx)throw new Error('এই ব্রাউজারে ছবিটি প্রস্তুত করা যায়নি।');
    ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);
    const normalized=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(result=>result?resolve(result):reject(new Error('ছবিটি প্রস্তুত করা যায়নি।')),'image/jpeg',.92));
    const bytes=new Uint8Array(await normalized.arrayBuffer());signal.throwIfAborted();
    return{name,mime:'image/jpeg',bytes,width:canvas.width,height:canvas.height};
  }finally{bitmap.close();}
}

export default function useReportImages(files:File[],attachments:Attachment[]){
  const count=files.filter(x=>isImage(x.type)).length+attachments.filter(x=>isImage(x.mime)).length;
  const [images,setImages]=useState<PreviewImage[]>([]),[loading,setLoading]=useState(count>0),[error,setError]=useState(''),[retry,setRetry]=useState(0);
  useEffect(()=>{
    const controller=new AbortController(),urls:string[]=[];
    setImages([]);setError('');setLoading(count>0);
    void(async()=>{
      try{
        const prepared:PreviewImage[]=[];
        const add=async(blob:Blob,name:string)=>{const image=await prepare(blob,name,controller.signal);controller.signal.throwIfAborted();const url=URL.createObjectURL(new Blob([new Uint8Array(image.bytes)],{type:image.mime}));urls.push(url);prepared.push({...image,url});};
        for(const file of files.filter(x=>isImage(x.type)))await add(file,file.name);
        for(const attachment of attachments.filter(x=>isImage(x.mime))){
          const url=new URL(attachment.url,window.location.origin);
          if(url.origin!==window.location.origin||!url.pathname.startsWith('/api/attachments/'))throw new Error('ছবির ঠিকানা সঠিক নয়।');
          const response=await fetch(url,{credentials:'same-origin',signal:controller.signal});
          if(!response.ok)throw new Error('ছবিটি খোলা যায়নি। আবার লগইন করে চেষ্টা করুন।');
          if(attachment.size>10*1024*1024)throw new Error('ছবিটি ১০ MB সীমার বেশি।');
          const bytes=await response.arrayBuffer();if(bytes.byteLength>10*1024*1024)throw new Error('ছবিটি ১০ MB সীমার বেশি।');
          await add(new Blob([bytes],{type:attachment.mime}),attachment.filename);
        }
        if(!controller.signal.aborted)setImages(prepared);
      }catch(e){if(!controller.signal.aborted)setError((e as Error).message);}
      finally{if(!controller.signal.aborted)setLoading(false);}
    })();
    return()=>{controller.abort();urls.forEach(url=>URL.revokeObjectURL(url));};
  },[files,attachments,retry]);
  return{images,loading,error,count,retry:()=>setRetry(x=>x+1)};
}
