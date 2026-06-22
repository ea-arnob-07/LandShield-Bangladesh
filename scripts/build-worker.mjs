import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('dist/server',{recursive:true});
for(const name of ['worker.js','land-domain.js','land-storage.js','land-ai.js','map-search.js','land-auth.js','land-demos.js','land-files.js','land-contacts.js','contact-seeds.js','report-location.js','office-locations.js'])await copyFile(`server/${name}`,`dist/server/${name==='worker.js'?'index.js':name}`);
console.log('LandShield Worker prepared with private records, evidence and human review.');
