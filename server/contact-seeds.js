// Public professional contact details read from the linked government pages.
// Observed on 2026-10-18; office holders and phone numbers can change.
const general=['mutation','boundary','record','tax','inheritance','fraud','review','document','buyer','unclassified'];
const base={sourceType:'government',sourceCheckedAt:'2026-10-18',active:true,latitude:null,longitude:null,email:'',mobile:'',phone:'',personName:'',notes:'যাওয়ার আগে ফোন করে বর্তমান কর্মকর্তা, সেবার এখতিয়ার ও ঠিকানা নিশ্চিত করুন।'};
const land=(id,district,upazila,personName,mobile,email,sourceUrl)=>({...base,id,officeName:`উপজেলা ভূমি অফিস, ${upazila}`,officeType:'land',district,upazila,address:`উপজেলা ভূমি অফিস, ${upazila}, ${district}, বাংলাদেশ`,personName,designation:'সহকারী কমিশনার (ভূমি)',mobile,email,sourceUrl,categories:general});
export const contactSeeds=[
  {...base,id:'official:land-helpline',officeName:'ভূমি সেবা সহায়তা ১৬১২২',officeType:'help',district:'',upazila:'',address:'বাংলাদেশজুড়ে ফোনে ভূমি সেবার সহায়তা',designation:'জাতীয় ভূমি সেবা হেল্পলাইন',phone:'16122',sourceUrl:'https://hotline.land.gov.bd/',categories:general,notes:'স্থানীয় অফিসের যোগাযোগ না পেলে সংশ্লিষ্ট দপ্তর জানতে এখানে যোগাযোগ করুন।'},
  {...land('official:savar-acland','ঢাকা','সাভার','জনাব রাহাত খান','01933444041','','https://acl.savar.dhaka.gov.bd/pages/officers'),phone:'+8802223375494'},
  {...base,id:'official:savar-surveyor',officeName:'উপজেলা ভূমি অফিস, সাভার',officeType:'survey',district:'ঢাকা',upazila:'সাভার',address:'উপজেলা ভূমি অফিস, সাভার, ঢাকা, বাংলাদেশ',personName:'মোঃ ইমন হাসান',designation:'সার্ভেয়ার',mobile:'01646529122',sourceUrl:'https://acl.savar.dhaka.gov.bd/pages/staff-profiles',categories:['boundary','record'],notes:'জরিপ ও পরিমাপের বিষয়ে অফিসে যোগাযোগের তথ্য; নির্দিষ্ট আবেদনের দায়িত্ব অফিস নিশ্চিত করবে।'},
  land('official:patiya-acland','চট্টগ্রাম','পটিয়া','আবদুল্লাহ-আল মামুন','01937966946','aclpatiyactg@gmail.com','https://acl.patiya.chittagong.gov.bd/pages/officers'),
  land('official:paba-acland','রাজশাহী','পবা','মোহাম্মদ মেহেদী হাসান','01733352004','aclpaba@gmail.com','https://acl.paba.rajshahi.gov.bd/pages/officers'),
  {...base,id:'official:paba-kanungo',officeName:'উপজেলা ভূমি অফিস, পবা',officeType:'survey',district:'রাজশাহী',upazila:'পবা',address:'উপজেলা ভূমি অফিস, পবা, রাজশাহী, বাংলাদেশ',personName:'বিপুল চন্দ্র সাহা',designation:'কানুনগো',mobile:'01757954744',sourceUrl:'https://acl.paba.rajshahi.gov.bd/pages/officers',categories:['boundary','record']},
  land('official:dumuria-acland','খুলনা','ডুমুরিয়া','অমিত কুমার বিশ্বাস','01322875544','acldumuria@gmail.com','https://acl.dumuria.khulna.gov.bd/pages/officers/6980cd95c4774958d7c58e76')
];
