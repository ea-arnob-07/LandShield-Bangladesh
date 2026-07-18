import { Map,Files,FileCheck2,ReceiptText,Calculator,Scale,Handshake,Activity,Globe,Fingerprint,Network,Shield,ScanLine } from 'lucide-react';
export const landServices=[
  {route:'land/map',bn:'স্মার্ট ভূমি মানচিত্র',en:'Smart land map',description:'মৌজা, দাগ ও ULID দিয়ে জমি খুঁজুন',icon:Map},
  {route:'land/profile',bn:'জমির প্রোফাইল ও জরিপ',en:'Parcel & survey profile',description:'মালিক, খতিয়ান ও উৎস রেকর্ড একসঙ্গে',icon:Files},
  {route:'land/mutation',bn:'নামজারি',en:'Mutation',description:'আবেদন, শুনানি ও অগ্রগতির নমুনা',icon:FileCheck2},
  {route:'land/tax',bn:'ভূমি উন্নয়ন কর',en:'Land development tax',description:'হোল্ডিং, দাখিলা ও করের হিসাব দেখুন',icon:ReceiptText},
  {route:'documents',bn:'দলিল থেকে রিপোর্ট',en:'Document studio',description:'ছবি / PDF থেকে বাংলা PDF ও Word',icon:ScanLine},
  {route:'land/inheritance',bn:'উত্তরাধিকার হিসাব',en:'Inheritance calculator',description:'হিস্যা ও বণ্টনের গণনা বুঝে নিন',icon:Calculator},
  {route:'land/disputes',bn:'বিরোধ ও সতর্কতা',en:'Disputes & caveats',description:'দাবি, বিরোধ ও ঝুঁকির তথ্য দেখুন',icon:Scale},
  {route:'land/transaction',bn:'ক্রয়-বিক্রয়ের ধাপ',en:'Buy & sell workflow',description:'লেনদেনের আগে প্রস্তুতির নমুনা',icon:Handshake},
  {route:'land/erosion',bn:'নদীভাঙন পর্যবেক্ষণ',en:'River erosion',description:'ভাঙনের সম্ভাব্য প্রভাবের নমুনা',icon:Activity},
  {route:'land/diaspora',bn:'প্রবাসী ভূমিসেবা',en:'Diaspora services',description:'দূর থেকে জমির সেবার ধাপ জানুন',icon:Globe},
  {route:'land/audit',bn:'নিরীক্ষা ও অখণ্ডতা',en:'Audit & integrity',description:'ঘটনা, হ্যাশ ও ইতিহাসের নমুনা',icon:Fingerprint},
  {route:'land/sandbox',bn:'সরকারি API স্যান্ডবক্স',en:'Government API sandbox',description:'পরিকল্পিত সংযোগের নমুনা পরীক্ষা',icon:Network},
  {route:'land/dashboard',bn:'ভূমিকা অনুযায়ী ড্যাশবোর্ড',en:'Role dashboards',description:'মালিক, ক্রেতা ও কর্মকর্তার নমুনা দৃশ্য',icon:Shield},
];
