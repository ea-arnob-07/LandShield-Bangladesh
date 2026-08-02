import { DomainError } from './land-domain.js';
export const DOCX_MIME='application/vnd.openxmlformats-officedocument.wordprocessingml.document';
export function validateDocx(bytes){
  const bad=()=>{throw new DomainError('সঠিক, ম্যাক্রোমুক্ত DOCX ফাইল দিন।');};
  if(bytes.length<22||bytes[0]!==80||bytes[1]!==75)bad();
  const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);let end=-1;
  for(let p=bytes.length-22;p>=Math.max(0,bytes.length-65557);p--)if(v.getUint32(p,true)===0x06054b50){end=p;break;}
  if(end<0||v.getUint16(end+4,true)||v.getUint16(end+6,true))bad();
  const count=v.getUint16(end+10,true),size=v.getUint32(end+12,true),offset=v.getUint32(end+16,true);if(count>1000||offset+size>end)bad();
  let pos=offset,total=0,document=false,content=false;
  for(let n=0;n<count;n++){
    if(pos+46>bytes.length||v.getUint32(pos,true)!==0x02014b50)bad();
    const flags=v.getUint16(pos+8,true),original=v.getUint32(pos+24,true),len=v.getUint16(pos+28,true),extra=v.getUint16(pos+30,true),comment=v.getUint16(pos+32,true);
    if(pos+46+len+extra+comment>offset+size||(flags&1))bad();
    const name=new TextDecoder().decode(bytes.slice(pos+46,pos+46+len));if(name.includes('..')||name.startsWith('/')||/vbaProject|activeX|embeddings/i.test(name))bad();
    total+=original;if(total>25*1024*1024)bad();if(name==='word/document.xml'){if(original>2*1024*1024)bad();document=true;}if(name==='[Content_Types].xml')content=true;
    pos+=46+len+extra+comment;
  }
  if(!document||!content||pos!==offset+size)bad();
}
