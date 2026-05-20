export class DomainError extends Error {
  constructor(message,status=400){super(message);this.status=status;}
}
export const RULE_VERSION='land-routing-2026.1';
const official={label:'ভূমি তথ্য বাতায়ন ও সেবা নির্দেশনা',url:'https://land.gov.bd/'};
const mutation={label:'ই-মিউটেশন প্রক্রিয়ার ধাপ',url:'https://mutation.land.gov.bd/namjari-steps'};
const routes=[
  {id:'fraud',label:'দলিলের অসঙ্গতি / প্রতারণার অভিযোগ',words:['জাল দলিল','জালিয়াতি','জালিয়াতি','দ্বৈত বিক্রি','দুইবার বিক্রি','fake deed','forged','fraud','double sale'],office:'সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিসে দলিলের উৎস যাচাই; এসি (ভূমি)-তে রেকর্ড তুলনা',domain:'দলিল ও নিবন্ধন; সম্ভাব্য ফৌজদারি বিষয়',escalation:'আইনজীবী / সংশ্লিষ্ট আইন প্রয়োগকারী কর্তৃপক্ষের পরামর্শ',evidence:['মূল দলিল ও নিবন্ধন নম্বর','সর্বশেষ খতিয়ান ও নামজারি আদেশ','বিক্রেতা ও সহ-মালিকের তথ্য','অসঙ্গতির প্রমাণ'],risk:'HIGH'},
  {id:'boundary',label:'সীমানা / দখল / দাগের অমিল',words:['সীমানা','দখল','অতিব্যাপ্তি','boundary','encroach','overlap','চৌহদ্দি'],office:'সংশ্লিষ্ট এসি (ভূমি) অফিস / জরিপ অফিসে রেকর্ড ও সীমানা যাচাই',domain:'সীমানা ও রেকর্ড; মালিকানা বিরোধে আইনগত পর্যালোচনা',escalation:'প্রযোজ্য হলে আইনজীবীর মাধ্যমে এখতিয়ারসম্পন্ন আদালত / ট্রাইব্যুনাল',evidence:['মৌজা ম্যাপ ও দাগ নম্বর','সর্বশেষ ও আগের জরিপ খতিয়ান','দলিলের চৌহদ্দি','ঘটনাস্থলের ছবি / পরিমাপ'],risk:'MEDIUM'},
  {id:'mutation',label:'নামজারি / নামজারির বিলম্ব',words:['নামজারি','মিউটেশন','mutation','খারিজ','নাম পরিবর্তন'],office:'সংশ্লিষ্ট সহকারী কমিশনার (ভূমি) / উপজেলা ভূমি অফিস',domain:'ভূমি রেকর্ড হালনাগাদ ও নামজারি',escalation:'সংশ্লিষ্ট ভূমি অফিসের অভিযোগ প্রতিকার ব্যবস্থা',evidence:['আবেদন নম্বর ও তারিখ','দলিল / মালিকানা অর্জনের কাগজ','সর্বশেষ খতিয়ান','নোটিশ / শুনানির কাগজ'],risk:'MEDIUM'},
  {id:'tax',label:'ভূমি উন্নয়ন কর / দাখিলা',words:['ভূমি উন্নয়ন কর','ভূমি উন্নয়ন কর','দাখিলা','খাজনা','land tax','holding','হোল্ডিং'],office:'সংশ্লিষ্ট ইউনিয়ন / পৌর ভূমি অফিস',domain:'ভূমি উন্নয়ন কর ও হোল্ডিং সমন্বয়',escalation:'সংশ্লিষ্ট উপজেলা ভূমি অফিস / এসি (ভূমি)',evidence:['হোল্ডিং নম্বর','খতিয়ান / নামজারি তথ্য','আগের দাখিলা','পেমেন্টের রসিদ (যদি থাকে)'],risk:'LOW'},
  {id:'inheritance',label:'উত্তরাধিকার / সহ-মালিকের হিস্যা',words:['ওয়ারিশ','ওয়ারিশ','উত্তরাধিকার','হিস্যা','বণ্টন','বন্টন','inheritance','co-owner'],office:'ওয়ারিশের কাগজ সংগ্রহের পর সংশ্লিষ্ট এসি (ভূমি) অফিসে নামজারির নির্দেশনা',domain:'উত্তরাধিকার, সহ-মালিকানা ও নামজারি',escalation:'বিরোধ থাকলে যোগ্য আইনজীবী ও এখতিয়ারসম্পন্ন কর্তৃপক্ষ',evidence:['ওয়ারিশ সনদ','মৃত্যু সনদ','পূর্ব মালিকের খতিয়ান ও দলিল','সহ-মালিকদের হিস্যার তথ্য'],risk:'MEDIUM'},
  {id:'record',label:'খতিয়ান / রেকর্ড / মৌজা ম্যাপ',words:['খতিয়ান','খতিয়ান','রেকর্ড','পর্চা','মৌজা ম্যাপ','khatian','survey','record'],office:'সংশ্লিষ্ট রেকর্ড রুম / জরিপ অফিস; ভূমি রেকর্ড ও ম্যাপ সেবা',domain:'জরিপ রেকর্ড ও উৎস নথি যাচাই',escalation:'সংশ্লিষ্ট ভূমি অফিস; বিরোধের ধরন অনুযায়ী আইনি পর্যালোচনা',evidence:['জেলা, উপজেলা ও মৌজা','জরিপের ধরন','দাগ ও খতিয়ান নম্বর','যে রেকর্ডে ভুল আছে তার অনুলিপি'],risk:'MEDIUM'},
];
export const emptyDeedFields=()=>({deedNo:'',date:'',mouza:'',dagNo:'',khatianNo:'',area:'',seller:'',buyer:''});
export const normalizeDigits=t=>String(t).replace(/[০-৯]/g,n=>String('০১২৩৪৫৬৭৮৯'.indexOf(n)));
export function extractDeedFields(text){
  const data=emptyDeedFields();
  const patterns={deedNo:/(?:দলিল\s*(?:নং|নম্বর|নম্বরঃ|নম্বর:)?|deed\s*(?:no\.?|number)?)\s*[:ঃ#-]?\s*([০-৯\d][০-৯\d/-]*)/i,date:/(?:তারিখ|date)\s*[:ঃ-]?\s*([০-৯\d]{1,4}[/.\-][০-৯\d]{1,2}[/.\-][০-৯\d]{1,4})/i,mouza:/(?:মৌজা|mouza)\s*[:ঃ-]\s*([^\n;]+)/i,dagNo:/(?:দাগ\s*(?:নং|নম্বর)?|(?:plot|dag)\s*(?:no\.?|number)?)\s*[:ঃ#-]?\s*([০-৯\d][০-৯\d/, -]*)/i,khatianNo:/(?:খতিয়ান|খতিয়ান|khatian)\s*(?:নং|নম্বর|no\.?|number)?\s*[:ঃ#-]?\s*([a-zA-Z]{0,3}[- ]?[০-৯\d][০-৯\d/-]*)/i,area:/(?:পরিমাণ|area)\s*[:ঃ-]?\s*([০-৯\d.,]+\s*(?:শতক|একর|কাঠা|satak|acre|katha)?)/i,seller:/(?:বিক্রেতা|দাতা|seller)\s*[:ঃ-]\s*([^\n;]+)/i,buyer:/(?:ক্রেতা|গ্রহীতা|buyer)\s*[:ঃ-]\s*([^\n;]+)/i};
  for(const [k,p]of Object.entries(patterns)){const match=String(text).match(new RegExp('(?<![\\p{L}\\p{M}\\p{N}])'+p.source,p.flags+'u'));if(match)data[k]=match[1].trim().slice(0,200);}
  return data;
}
export function routeApplication(input){
  const description=String(input.description||'').trim();
  if(description.length<20||description.length>12000)throw new DomainError('সমস্যাটি অন্তত ২০ অক্ষরে লিখুন (সর্বোচ্চ ১২,০০০)।');
  const lower=description.toLowerCase();const scored=routes.map(r=>({...r,hits:r.words.filter(w=>lower.includes(w))}));
  // High-risk fraud evidence is kept visible even when another subject occurs more often.
  const chosen=scored.find(r=>r.id==='fraud'&&r.hits.length)||scored.filter(r=>r.hits.length).sort((a,b)=>b.hits.length-a.hits.length)[0];
  const risk=chosen?.risk||'MEDIUM';
  const match=chosen?`বিবরণে পাওয়া বিষয়: ${chosen.hits.join(', ')}`:'বিষয় স্পষ্ট নয়—অফিসের মানবীয় পর্যালোচনা প্রয়োজন।';
  return {category:chosen?.id||'review',categoryLabel:chosen?.label||'ভূমিসংক্রান্ত সাধারণ আবেদন / পর্যালোচনা',legalDomain:chosen?.domain||'বিষয় ও এখতিয়ার যাচাই প্রয়োজন',office:chosen?.office||'সংশ্লিষ্ট উপজেলা ভূমি অফিসের সহায়তা ডেস্কে প্রথমে বিষয় যাচাই',escalation:chosen?.escalation||'দায়িত্বপ্রাপ্ত অফিসের নির্দেশনা অনুযায়ী পরবর্তী কর্তৃপক্ষ',risk,reasons:[match,...(!input.mouza?['মৌজার তথ্য দেওয়া হয়নি।']:[]),...(!input.dagNo&&!input.ulid?['দাগ বা ULID দেওয়া হয়নি।']:[])],evidence:chosen?.evidence||['জমির অবস্থান','দাগ / খতিয়ান / দলিলের উল্লেখ','সমস্যার প্রাসঙ্গিক কাগজ'],nextSteps:['পড়া তথ্য, জমির পরিচয় ও আবেদনকারীর বক্তব্য নিজে মিলিয়ে নিন।','প্রাসঙ্গিক উৎস নথি সংগ্রহ করুন; অনুপস্থিত তথ্য অনুমান করে পূরণ করবেন না।','প্রস্তাবিত অফিসে এখতিয়ার ও প্রয়োজনীয় কাগজ নিশ্চিত করুন।','প্রস্তুত PDF / Word রিপোর্ট নিয়ে সংশ্লিষ্ট অফিসে যোগাযোগ করুন।'],summary:description,match,engine:`নিয়মভিত্তিক সহায়তা · ${RULE_VERSION}`,sources:[official,...(chosen?.id==='mutation'?[{...mutation,url:'https://mutation.land.gov.bd/namjari-steps'}]:[])]};
}
