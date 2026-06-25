import { mkdir,copyFile,readdir } from 'node:fs/promises';
import { join } from 'node:path';
await mkdir('public/ocr/core',{recursive:true});await mkdir('public/ocr/lang',{recursive:true});
await copyFile('node_modules/tesseract.js/dist/worker.min.js','public/ocr/worker.min.js');
for(const name of await readdir('node_modules/tesseract.js-core'))if(name.endsWith('.wasm')||name.endsWith('.wasm.js'))await copyFile(join('node_modules/tesseract.js-core',name),join('public/ocr/core',name));
for(const lang of ['ben','eng'])await copyFile(`node_modules/@tesseract.js-data/${lang}/4.0.0/${lang}.traineddata.gz`,`public/ocr/lang/${lang}.traineddata.gz`);
console.log('Bengali and English OCR model/worker assets prepared for same-origin processing.');
