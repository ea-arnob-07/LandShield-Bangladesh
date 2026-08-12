import type { LandReport,OfficeContact,OfficeReferral,ReportSection } from './types';

export function officeSection(contact:OfficeContact,heading='প্রস্তাবিত অফিসের যোগাযোগ'):ReportSection{
  return{heading,rows:[{label:'অফিস',value:contact.officeName},{label:'দায়িত্বপ্রাপ্ত ব্যক্তি / পদ',value:[contact.personName,contact.designation].filter(Boolean).join(' · ')},{label:'ফোন / মোবাইল',value:[contact.phone,contact.mobile].filter(Boolean).join(' / ')||'প্রকাশিত নেই'},{label:'ইমেইল',value:contact.email||'প্রকাশিত নেই'},{label:'ঠিকানা',value:contact.address},{label:'প্রকাশিত উৎস',value:contact.sourceUrl},{label:'উৎস দেখার তারিখ',value:contact.sourceCheckedAt},...(contact.coordinateSourceUrl?[{label:'অফিসের ম্যাপ পয়েন্টের উৎস',value:contact.coordinateSourceUrl},{value:'ম্যাপের পয়েন্ট আনুমানিক। যাওয়ার আগে অফিসের অবস্থান নিশ্চিত করুন।'}]:[]),{value:'যোগাযোগের আগে বর্তমান কর্মকর্তা, সঠিক অফিস ও এখতিয়ার নিশ্চিত করুন। এই নির্দেশনা সরকারি দপ্তরে আবেদন প্রেরণ বা দায়িত্ব গ্রহণের নিশ্চয়তা নয়।'}]};
}
export function withOfficeReferral(report:LandReport,referral?:OfficeReferral|null):LandReport{
  if(!referral)return report;
  const section=officeSection(referral.contact,'অ্যাডমিন নির্ধারিত অফিস ও যোগাযোগ');
  section.rows.push({label:'নির্ধারণের কারণ',value:referral.note},{label:'নির্ধারণের সময়',value:referral.assignedAt},{value:'যোগাযোগের তথ্য নির্ধারণের সময়কার সংরক্ষিত কপি। বর্তমান তথ্য প্রকাশিত উৎস থেকে মিলিয়ে নিন।'});
  if(referral.needsReview)section.rows.push({value:'ডিরেক্টরিতে এই যোগাযোগ বদলেছে বা নিষ্ক্রিয় হয়েছে। নতুন যোগাযোগের জন্য অ্যাডমিনের পর্যালোচনা প্রয়োজন।'});
  return{...report,sections:[...report.sections,section]};
}
export function reportLocation(report:LandReport){
  if(report.location)return report.location;
  const raw=report.sections.flatMap(s=>s.rows).find(r=>r.label==='অবস্থান')?.value||'';
  const [district='',upazila='']=raw.includes(' / ')?raw.split(' / '):[];
  return{district,upazila};
}
export const officeDirections=(contact:OfficeContact)=>`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.latitude!==null&&contact.longitude!==null?`${contact.latitude},${contact.longitude}`:contact.address)}`;
export function officeDistance(contact:OfficeContact,position?:{latitude:number;longitude:number}|null){
  if(!position||contact.latitude===null||contact.longitude===null)return null;
  const rad=(n:number)=>n*Math.PI/180,dLat=rad(contact.latitude-position.latitude),dLon=rad(contact.longitude-position.longitude);
  const a=Math.sin(dLat/2)**2+Math.cos(rad(position.latitude))*Math.cos(rad(contact.latitude))*Math.sin(dLon/2)**2;
  return 6371*2*Math.atan2(Math.sqrt(a),Math.sqrt(Math.max(0,1-a)));
}
