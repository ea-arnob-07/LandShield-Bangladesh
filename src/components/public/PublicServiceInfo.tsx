import React, { useState } from 'react';
import { Language } from '../../types';
import {
  FileText,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  Building2,
  HelpCircle,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  FolderOpen
} from 'lucide-react';

interface PublicServiceInfoProps {
  language: Language;
  onOpenLogin: () => void;
}

interface DetailedServiceGuide {
  id: string;
  nameBn: string;
  nameEn: string;
  whatItIsBn: string;
  whatItIsEn: string;
  whoCanUseBn: string;
  whoCanUseEn: string;
  authorityBn: string;
  authorityEn: string;
  feeBDT: string;
  timelineBn: string;
  timelineEn: string;
  requiredDocumentsBn: string[];
  requiredDocumentsEn: string[];
  processStepsBn: string[];
  processStepsEn: string[];
}

export const PublicServiceInfo: React.FC<PublicServiceInfoProps> = ({
  language,
  onOpenLogin
}) => {
  const guides: DetailedServiceGuide[] = [
    {
      id: 'MUTATION',
      nameBn: 'ই-নামজারি ও জমাভাগ (e-Mutation)',
      nameEn: 'e-Mutation & Share Partition',
      whatItIsBn: 'জমি কেনা বা ওয়ারিশ সূত্রে প্রাপ্তির পর সহকারী কমিশনার (ভূমি) এর নিকট সাবেক মালিকের নাম কর্তন করে নতুন মালিকের নামে খতিয়ান রেকর্ড প্রস্তুতকরণ।',
      whatItIsEn: 'Transferring title records into the new owner\'s name after purchase or inheritance by the Assistant Commissioner (Land).',
      whoCanUseBn: 'যেকোনো বৈধ ক্রেতা, হেবা গ্রহীতা বা ওয়ারিশ সূত্রে ভূমির স্বত্বাধিকারী।',
      whoCanUseEn: 'Any legal buyer, heba receiver, or rightful legal heir possessing valid transfer deeds.',
      authorityBn: 'সহকারী কমিশনার (ভূমি) ও উপজেলা ভূমি রাজস্ব অফিস',
      authorityEn: 'Assistant Commissioner (Land), Upazila Land Revenue Office',
      feeBDT: 'আবেদন ফি: ২০/- | নোটিশ জারি: ৫০/- | রেকর্ড সংশোধন: ১,০০০/- | খতিয়ান ফি: ১০০/- (মোট ১,১৭০/- টাকা)',
      timelineBn: 'সর্বোচ্চ ২৮ কার্যদিবস (জরুরি শুনানিতে কম সময়)',
      timelineEn: 'Maximum 28 working days (shorter for clean deeds)',
      requiredDocumentsBn: [
        'মূল রেজিস্ট্রার্ড সাব-কবলা দলিল বা হেবা দলিলের স্ক্যান কপি',
        'জাতীয় পরিচয়পত্র (NID) নম্বর ও স্মার্টকার্ড কপি',
        'ওয়ারিশান সনদ (ওয়ারিশসূত্রে প্রাপ্তির ক্ষেত্রে)',
        'দাখিলা (হালনাগাদ ভূমি উন্নয়ন কর পরিশোধের প্রমাণপত্র)',
        'পিঠ খতিয়ান ও সাবেক নামজারি খতিয়ানের কপি'
      ],
      requiredDocumentsEn: [
        'Scanned copy of registered Sub-Kabala / Heba deed',
        'National ID (NID) number & digital smart card copy',
        'Heirship certificate (if acquired via inheritance)',
        'Latest Land Development Tax Dakhila clearance',
        'Copy of previous title chain and original CS/RS/BS Khatian'
      ],
      processStepsBn: [
        '১. অনলাইনে এনআইডি ও দলিল আপলোড করে আবেদন দাখিল ও ২০ টাকা কোর্ট ফি পরিশোধ',
        '২. ইউনিয়ন ভূমি সহকারী কর্মকর্তা (নায়েব) কর্তৃক প্রস্তাব ও সরেজমিন তদন্ত রিপোর্ট',
        '৩. কানুনগো কর্তৃক সিলসিলা ও সরকারি স্বার্থ যাচাই',
        '৪. এসিল্যান্ড কর্তৃক নোটিশ জারি ও প্রয়োজনে শুনানি গ্রহণ',
        '৫. নামজারি অনুমোদন এবং ১,১০০ টাকা সরকারি ডিসিআর ও খতিয়ান ফি পরিশোধের পর কিউআর কোডযুক্ত নতুন খতিয়ান প্রাপ্তি'
      ],
      processStepsEn: [
        '1. Submit online application with NID & deed scan with 20 BDT initial fee',
        '2. Field verification and inquiry report by Union Land Sub-Officer (Nayeb)',
        '3. Kanungo title chain audit and checking against Khas/Vested land',
        '4. Issuance of public notice and legal hearing by AC Land',
        '5. Formal approval and download of official QR-coded BS Khatian upon DCR payment'
      ]
    },
    {
      id: 'LD_TAX',
      nameBn: 'ভূমি উন্নয়ন কর (Land Development Tax)',
      nameEn: 'Land Development Tax (LD Tax)',
      whatItIsBn: 'রাষ্ট্রের ভূমি ব্যবহারের জন্য সরকার কর্তৃক নির্ধারিত বাৎসরিক রাজস্ব কর যা পরিশোধপূর্বক সরকারি দাখিলা গ্রহণ করতে হয়।',
      whatItIsEn: 'Annual statutory property tax payable to the government for holding land, certified by an official Dakhila receipt.',
      whoCanUseBn: 'সকল ভূমির মালিক বা তাদের মনোনীত বৈধ প্রতিনিধি।',
      whoCanUseEn: 'All registered land owners, corporate entities, or authorized representatives.',
      authorityBn: 'ভূমি সংস্কার বোর্ড ও সংশ্লিষ্ট ইউনিয়ন ভূমি অফিস',
      authorityEn: 'Land Reforms Board & Union Land Revenue Office',
      feeBDT: 'জমির শ্রেণিভেদে সরকারি নির্ধারিত হার (কৃষি জমির ২৫ বিঘা পর্যন্ত করমুক্ত)',
      timelineBn: 'তাৎক্ষণিক ই-পেমেন্ট ও অনলাইন দাখিলা প্রস্তুত',
      timelineEn: 'Instant e-Payment & QR Dakhila generation',
      requiredDocumentsBn: [
        'সর্বশেষ খতিয়ানের নম্বর ও মৌজা',
        'হোল্ডিং নম্বর (অথবা হোল্ডিং এন্ট্রির আবেদন)',
        'এনআইডি নম্বর ও মোবাইল নম্বর'
      ],
      requiredDocumentsEn: [
        'Latest Khatian number & Mouza name',
        'Tax holding number (or holding creation application)',
        'National ID number & mobile phone number'
      ],
      processStepsBn: [
        '১. মোবাইল ও এনআইডি দিয়ে হোল্ডিং যাচাই ও বকেয়া দাবি প্রদর্শন',
        '২. বিকাশ, নগদ, রকেট বা ডেবিট/ক্রেডিট কার্ডের মাধ্যমে পেমেন্ট',
        '৩. সাথে সাথে কিউআর কোডযুক্ত ডিজিটাল দাখিলা প্রিন্ট/সংরক্ষণ'
      ],
      processStepsEn: [
        '1. Verify tax holding and inspect arrears vs current demand',
        '2. Settle payment via mobile banking or internet banking gateways',
        '3. Instant download and print of verified QR-coded tax Dakhila'
      ]
    },
    {
      id: 'CERTIFIED_PORCHA',
      nameBn: 'সার্টিফাইড খতিয়ান ও পর্চা আবেদন',
      nameEn: 'Certified Khatian / Porcha Copy',
      whatItIsBn: 'জেলা প্রশাসকের রেকর্ডরুম বা অনলাইন সার্ভার থেকে সরকারি সিলমোহরযুক্ত খতিয়ানের আইনি কপি সংগ্রহ।',
      whatItIsEn: 'Official certified copies of Khatian records issued directly by the District Record Room or digital repository.',
      whoCanUseBn: 'যেকোনো নাগরিক বা আইনজীবী।',
      whoCanUseEn: 'Any citizen, lawyer, or legal researcher.',
      authorityBn: 'জেলা প্রশাসকের কার্যালয় (রেকর্ডরুম শাখা)',
      authorityEn: 'Deputy Commissioner\'s Office (Record Room Wing)',
      feeBDT: 'অনলাইন কপি: ৫০/- টাকা | সার্টিফাইড ডাকযোগে কপি: ১০০/- টাকা + ডাক মাশুল',
      timelineBn: 'অনলাইন কপি তাৎক্ষণিক | ডাকযোগে ৩-৫ কার্যদিবস',
      timelineEn: 'Online instant | Courier delivery in 3-5 days',
      requiredDocumentsBn: [
        'বিভাগ, জেলা, উপজেলা ও মৌজার নাম',
        'খতিয়ানের ধরন (সিএস/এসএ/আরএস/বিএস)',
        'খতিয়ান নম্বর বা দাগ নম্বর'
      ],
      requiredDocumentsEn: [
        'Division, District, Upazila & Mouza',
        'Survey survey type (CS / SA / RS / BS)',
        'Khatian number or Dag number'
      ],
      processStepsBn: [
        '১. খতিয়ানের ধরন নির্বাচন ও দাগ বা খতিয়ান দিয়ে সার্চ',
        '২. নির্ধারিত ফি পরিশোধ',
        '৩. কিউআর কোডযুক্ত পিডিএফ ডাউনলোড অথবা ডাকযোগে গ্রহণের ঠিকানা প্রদান'
      ],
      processStepsEn: [
        '1. Select survey type and locate record by Dag/Khatian',
        '2. Clear statutory government copy fees via gateway',
        '3. Instant PDF download or opt for home delivery via postal service'
      ]
    },
    {
      id: 'CAVEAT',
      nameBn: 'মালিকানা সুরক্ষা কেভিয়েট ও স্থগিতাদেশ',
      nameEn: 'Caveat Protection & Stay Registry',
      whatItIsBn: 'নিজের জমিতে প্রতারণামূলক হস্তান্তর রোধে বা দেওয়ানি মামলা চলাকালীন সাব-রেজিস্ট্রি ও নামজারি লক করার সরকারি ব্যবস্থা।',
      whatItIsEn: 'Statutory caveat lock registered in the system to freeze unauthorized sales or fraudulent mutations.',
      whoCanUseBn: 'প্রকৃত জমির মালিক বা তাদের নিয়োজিত সুপ্রিম কোর্ট/বার কাউন্সিল আইনজীবী।',
      whoCanUseEn: 'Verified property owners or licensed advocates representing legal parties.',
      authorityBn: 'ভূমি মন্ত্রণালয়, সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিস ও রাজস্ব আদালত',
      authorityEn: 'Ministry of Land, Sub-Registry Office & Revenue Court',
      feeBDT: 'সরকারি আইনি বিজ্ঞপ্তি ফি: ৫০০/- টাকা',
      timelineBn: 'আবেদনের সাথে সাথেই সুরক্ষামূলক ফ্ল্যাগ কার্যকর',
      timelineEn: 'Protective alert flag activates immediately upon filing',
      requiredDocumentsBn: [
        'মালিকানার সপক্ষে দলিল ও খতিয়ান',
        'আদালতের মামলা নম্বর বা বিরোধের নোটিশ',
        'এনআইডি বায়োমেট্রিক কনফার্মেশন'
      ],
      requiredDocumentsEn: [
        'Deed and recorded Khatian proving legal standing',
        'Civil court case number or dispute notice (if filed)',
        'NID biometric confirmation'
      ],
      processStepsBn: [
        '১. লগইন করে দাগ নম্বর নির্বাচন ও কেভিয়েট কারণ উল্লেখ',
        '২. আদালতের নথি বা প্রতারণার প্রমাণাদি আপলোড',
        '৩. সিস্টেমে জমি "LOCKED_CAVEAT" হিসেবে চিহ্নিত ও সংশ্লিষ্ট সাব-রেজিস্ট্রারকে সতর্কবার্তা প্রেরণ'
      ],
      processStepsEn: [
        '1. Login to select parcel and declare grounds for caveat',
        '2. Upload court summons or documentary evidence',
        '3. System marks parcel as "LOCKED_CAVEAT" and alerts Sub-Registrars'
      ]
    }
  ];

  const [activeGuideId, setActiveGuideId] = useState<string>(guides[0].id);
  const currentGuide = guides.find(g => g.id === activeGuideId) || guides[0];

  return (
    <section id="service-info" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <FolderOpen className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সেবা নির্দেশিকা ও সিটিজেন চার্টার' : 'Citizen Service Directory & Charter'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'bn'
              ? 'সেবার ধাপ, কাগজপত্র ও ফি ধারণা'
              : 'Explore service steps, documents and fees'}
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            {language === 'bn'
              ? 'এটি নমুনা নির্দেশিকা। ফি, সময়সীমা ও শর্ত বদলাতে পারে; প্রকৃত আবেদনের আগে সরকারি ভূমি তথ্য বাতায়নে যাচাই করুন।'
              : 'Illustrative guidance only. Fees, timelines and requirements may change; verify them on the official land portal before applying.'}
          </p>
          <a href="https://land.gov.bd/" target="_blank" rel="noopener noreferrer" className="inline-flex text-sm font-bold text-emerald-800 underline underline-offset-4">{language === 'bn' ? 'সরকারি ভূমি তথ্য বাতায়ন ↗' : 'Official land portal ↗'}</a>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {guides.map(guide => (
            <button
              key={guide.id}
              onClick={() => setActiveGuideId(guide.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeGuideId === guide.id
                  ? 'bg-emerald-800 text-white shadow-md shadow-emerald-950/20 ring-2 ring-emerald-600'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'bn' ? guide.nameBn : guide.nameEn}
            </button>
          ))}
        </div>

        {/* Selected Guide Details Card */}
        <div className="gov-card p-6 sm:p-8 space-y-8 max-w-5xl mx-auto">
          {/* Top Title & Metadata Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                {language === 'bn' ? 'নমুনা সেবা নির্দেশিকা' : 'Illustrative service guide'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                {language === 'bn' ? currentGuide.nameBn : currentGuide.nameEn}
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {language === 'bn' ? currentGuide.whatItIsBn : currentGuide.whatItIsEn}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLogin}
                className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>{language === 'bn' ? 'ডেমো ধাপ দেখুন' : 'Explore demo flow'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3 Quick Facts: Authority, Fees, Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>{language === 'bn' ? 'দায়িত্বপ্রাপ্ত কর্তৃপক্ষ' : 'Responsible Authority'}</span>
              </span>
              <p className="text-xs font-bold text-slate-900">
                {language === 'bn' ? currentGuide.authorityBn : currentGuide.authorityEn}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-amber-700" />
                <span>{language === 'bn' ? 'উদাহরণ ফি · যাচাই করুন' : 'Example fee · verify'}</span>
              </span>
              <p className="text-xs font-bold text-emerald-800">
                {currentGuide.feeBDT}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-700" />
                <span>{language === 'bn' ? 'সেবা প্রদানের সময়সীমা' : 'Service SLA Timeline'}</span>
              </span>
              <p className="text-xs font-bold text-slate-900">
                {language === 'bn' ? currentGuide.timelineBn : currentGuide.timelineEn}
              </p>
            </div>
          </div>

          {/* Two Columns: Required Documents & Step-by-Step Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Required Documents */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                <FileCheck className="w-4 h-4 text-emerald-700" />
                <span>{language === 'bn' ? 'প্রয়োজনীয় কাগজপত্র ও প্রমাণক' : 'Mandatory Checklist & Documents'}</span>
              </h4>

              <div className="space-y-2.5">
                {(language === 'bn' ? currentGuide.requiredDocumentsBn : currentGuide.requiredDocumentsEn).map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/70 border border-slate-200/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 leading-normal">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Procedure */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                <Users className="w-4 h-4 text-blue-700" />
                <span>{language === 'bn' ? 'আবেদন ও সেবা গ্রহণের পর্যায়ক্রমিক ধাপ' : 'Step-by-Step Application Process'}</span>
              </h4>

              <div className="space-y-2.5">
                {(language === 'bn' ? currentGuide.processStepsBn : currentGuide.processStepsEn).map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/60 text-xs text-slate-700 leading-normal">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
