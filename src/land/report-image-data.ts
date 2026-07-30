import type { ReportImage } from './types';

function validateImage(image:ReportImage){
  if(!['image/jpeg','image/png'].includes(image.mime)||!image.bytes.length||!Number.isFinite(image.width)||!Number.isFinite(image.height)||image.width<=0||image.height<=0)throw new Error('রিপোর্টের ছবিটি সঠিক নয়।');
}
export function reportImageDataUrl(image:ReportImage):string{
  validateImage(image);
  const chunks:string[]=[];
  for(let i=0;i<image.bytes.length;i+=32768)chunks.push(String.fromCharCode(...image.bytes.subarray(i,i+32768)));
  return `data:${image.mime};base64,${btoa(chunks.join(''))}`;
}

export function fitReportImage(image:ReportImage,maxWidth:number,maxHeight:number){
  validateImage(image);
  const scale=Math.min(maxWidth/image.width,maxHeight/image.height,1);
  return{width:Math.max(1,Math.round(image.width*scale)),height:Math.max(1,Math.round(image.height*scale))};
}
