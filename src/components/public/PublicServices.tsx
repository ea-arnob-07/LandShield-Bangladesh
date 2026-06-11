import React, { useState } from 'react';
import { Language } from '../../types';
import {
  Search,
  FileText,
  GitPullRequest,
  Receipt,
  ShieldCheck,
  FileCheck2,
  Scale,
  GitFork,
  MapPin,
  Waves,
  Plane,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  X
} from 'lucide-react';

interface PublicServicesProps {
  language: Language;
  onSelectService: (serviceKey: string) => void;
  onOpenLogin: () => void;
}

interface ServiceCardData {
  id: string;
  titleBn: string;
  titleEn: string;
  categoryBn: string;
  categoryEn: string;
  descBn: string;
  descEn: string;
  icon: React.ReactNode;
  tagBn: string;
  tagEn: string;
  featuresBn: string[];
  featuresEn: string[];
  requiresAuth: boolean;
}

export const PublicServices: React.FC<PublicServicesProps> = ({
  language,
  onSelectService,
  onOpenLogin
}) => {
  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const services: ServiceCardData[] = [
    {
      id: 'LAND_SEARCH',
      titleBn: 'ভূমি রেকর্ড অনুসন্ধান',
      titleEn: 'Land Record Search',
      categoryBn: 'নাগরিক সেবা',
      categoryEn: 'Citizen Service',
      descBn: 'মৌজা, দাগ ও খতিয়ান নম্বর দিয়ে নমুনা রেকর্ড অনুসন্ধানের ইন্টারফেস দেখুন।',
      descEn: 'Explore the sample record search by Mouza, Dag No, or Khatian.',
      icon: <Search className="w-6 h-6 text-emerald-600" />,
      tagBn: 'পাবলিক এক্সেস',
      tagEn: 'Public Access',
      featuresBn: ['দাগ নম্বর সার্চ', 'মৌজা ও উপজেলা ভিত্তিক ফিল্টার', 'নমুনা রেকর্ড দেখা'],
      featuresEn: ['Dag number search', 'Mouza & Upazila filters', 'Sample records'],
      requiresAuth: false
    },
    {
      id: 'KHATIAN_INFO',
      titleBn: 'খতিয়ান ও পর্চা তথ্য',
      titleEn: 'Khatian & Porcha Information',
      categoryBn: 'নাগরিক সেবা',
      categoryEn: 'Citizen Service',
      descBn: 'সিএস, এসএ, আরএস ও বিএস খতিয়ানের বিস্তারিত হিস্যা, খতিয়ান শৃঙ্খল ও সার্টিফাইড পর্চা আবেদন।',
      descEn: 'Inspect CS, SA, RS, and BS Khatian shares, chain of title, and apply for certified online copies.',
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      tagBn: 'সার্টিফাইড কপি',
      tagEn: 'Certified Copy',
      featuresBn: ['মালিকের হিস্যা বণ্টন', 'খতিয়ান হিস্ট্রি ট্র্যাকিং', 'অনলাইনে পর্চা আবেদন'],
      featuresEn: ['Owner share breakdown', 'Title history tracking', 'Online porcha request'],
      requiresAuth: true
    },
    {
      id: 'SMART_MUTATION',
      titleBn: 'ই-নামজারি (Mutation / Namjari)',
      titleEn: 'Smart e-Mutation & Jamabandi',
      categoryBn: 'নামজারি ও রাজস্ব',
      categoryEn: 'Mutation & Revenue',
      descBn: 'জমি ক্রয়ের পর স্বয়ংক্রিয় নামজারি আবেদন, সহকারী কমিশনার (ভূমি) দ্বারা অনুমোদন ও নতুন খতিয়ান সৃজন।',
      descEn: 'File paperless mutation, track field verification by Kanungo, and receive AC Land approved BS Khatian.',
      icon: <GitPullRequest className="w-6 h-6 text-amber-600" />,
      tagBn: 'ডেমো ওয়ার্কফ্লো',
      tagEn: 'Demo workflow',
      featuresBn: ['অনলাইন আবেদন ও ট্র্যাকিং', 'ডিজিটাল নোটিশ ও শুনানি', 'তাৎক্ষণিক ডিসিআর ও খতিয়ান'],
      featuresEn: ['Online application & tracker', 'Digital notice & hearing', 'Instant DCR & Porcha'],
      requiresAuth: true
    },
    {
      id: 'LD_TAX',
      titleBn: 'ভূমি উন্নয়ন কর (LD Tax)',
      titleEn: 'Land Development Tax Portal',
      categoryBn: 'নামজারি ও রাজস্ব',
      categoryEn: 'Mutation & Revenue',
      descBn: 'অনলাইনে বকেয়া ও হাল ভূমি কর হিসাব, তাৎক্ষণিক ই-পেমেন্ট এবং কিউআর কোডযুক্ত সরকারি দাখিলা ডাউনলোড।',
      descEn: 'Calculate holding arrears and current demand, pay via digital channels, and get QR-coded Dakhila.',
      icon: <Receipt className="w-6 h-6 text-teal-600" />,
      tagBn: 'তাৎক্ষণিক দাখিলা',
      tagEn: 'Instant Dakhila',
      featuresBn: ['হোল্ডিং নম্বর দিয়ে কর যাচাই', 'বিকাশ/নগদ/কার্ডে পেমেন্ট', 'ডিজিটাল দাখিলা প্রিন্ট'],
      featuresEn: ['Holding tax check', 'bKash/Nagad/Card gateway', 'QR verified receipt'],
      requiresAuth: true
    },
    {
      id: 'GIS_MAP',
      titleBn: 'জিআইএস ক্যাডাস্ট্রাল মানচিত্র',
      titleEn: 'GIS Cadastral Mapping',
      categoryBn: 'মানচিত্র ও সার্ভে',
      categoryEn: 'Maps & Survey',
      descBn: 'বাস্তব স্যাটেলাইট চিত্র ও জায়গার নাম দেখুন; লগইনের পর আলাদা নমুনা প্লট স্তর ঘুরে দেখুন।',
      descEn: 'Explore real satellite imagery with place labels, plus optional sample plot overlays in the workspace.',
      icon: <MapPin className="w-6 h-6 text-indigo-600" />,
      tagBn: 'স্যাটেলাইট জিআইএস',
      tagEn: 'Satellite GIS',
      featuresBn: ['ইন্টারঅ্যাক্টিভ স্যাটেলাইট', 'জায়গার নাম ও রাস্তা', 'নমুনা সীমানা স্তর'],
      featuresEn: ['Interactive satellite', 'Place names and streets', 'Illustrative boundaries'],
      requiresAuth: false
    },
    {
      id: 'DOC_AI',
      titleBn: 'এআই দলিল ও জালিয়াতি পরীক্ষা',
      titleEn: 'AI Document OCR & Fraud Lab',
      categoryBn: 'আইনি ও যাচাই',
      categoryEn: 'Legal & Verification',
      descBn: 'বাংলা দলিল স্ক্যান করে স্ট্যাম্প নম্বর, এনআইডি মিল, বালাম বহি ভলিউম ও জালিয়াতি ঝুঁকি নির্ণয়।',
      descEn: 'AI optical recognition of Bangla deed copies to verify stamp duty, volume cross-checks, and fraud scores.',
      icon: <FileCheck2 className="w-6 h-6 text-purple-600" />,
      tagBn: 'এআই ওসিআর',
      tagEn: 'AI OCR Tech',
      featuresBn: ['দলিল স্ক্যানিং ও টেক্সট এক্সট্রাক্ট', 'জালিয়াতি ঝুঁকি স্কোরিং', 'সাব-রেজিস্ট্রি ক্রস-চেক'],
      featuresEn: ['Deed scan text extraction', 'Forgery risk indicator', 'Sub-registry cross-match'],
      requiresAuth: true
    },
    {
      id: 'CAVEATS_DISPUTES',
      titleBn: 'কেভিয়েট ও জমি বিরোধ ট্র্যাকার',
      titleEn: 'Caveat Protection & Dispute Registry',
      categoryBn: 'আইনি ও যাচাই',
      categoryEn: 'Legal & Verification',
      descBn: 'মালিকানা সুরক্ষায় ডিজিটাল কেভিয়েট লক প্রদান এবং দেওয়ানি মামলা ও পারিবারিক বিরোধের তথ্য অনুসন্ধান।',
      descEn: 'Prevent unauthorized transactions with legal caveat locks and review recorded civil court disputes.',
      icon: <Scale className="w-6 h-6 text-red-600" />,
      tagBn: 'মালিকানা সুরক্ষা',
      tagEn: 'Ownership Guard',
      featuresBn: ['তাৎক্ষণিক কেভিয়েট লক', 'আদালতি মোকদ্দমা তালিকা', 'বিরোধ সতর্কতা অ্যালার্ট'],
      featuresEn: ['Instant caveat protection', 'Court dispute history', 'Conflict notification'],
      requiresAuth: true
    },
    {
      id: 'FARAID',
      titleBn: 'উত্তরাধিকার ও ফরায়েজ ক্যালকুলেটর',
      titleEn: 'Faraid Inheritance Partition',
      categoryBn: 'নাগরিক সেবা',
      categoryEn: 'Citizen Service',
      descBn: 'ইসলামিক ও রাষ্ট্রীয় উত্তরাধিকার আইন অনুযায়ী ওয়ারিশদের মাঝে সুনির্দিষ্ট আনা-গণ্ডা ও শতাংশ বণ্টন।',
      descEn: 'Automated Islamic and statutory inheritance share calculator with precise decimal and ana distributions.',
      icon: <GitFork className="w-6 h-6 text-emerald-700" />,
      tagBn: 'স্বয়ংক্রিয় হিসাব',
      tagEn: 'Automated Engine',
      featuresBn: ['ওয়ারিশ হিস্যা নিখুঁত হিসাব', 'বাটোয়ারা খসড়া রূপরেখা', 'আইনি বৈধতা যাচাই'],
      featuresEn: ['Exact heir proportioning', 'Partition draft generator', 'Statutory compliance'],
      requiresAuth: false
    },
    {
      id: 'INSAR_EROSION',
      titleBn: 'ইনসার স্যাটেলাইট নদীভাঙন (সিকস্তি-পয়স্তি)',
      titleEn: 'InSAR Satellite River Erosion',
      categoryBn: 'মানচিত্র ও সার্ভে',
      categoryEn: 'Maps & Survey',
      descBn: 'ইউরোপীয় মহাকাশ সংস্থার রাডার ডেটা দিয়ে নদীভাঙন এলাকা, সিকস্তি ক্ষতিপূরণ এবং নতুন চরের অধিকার নির্ণয়।',
      descEn: 'Copernicus radar data tracking delta river erosion, lost land compensation, and payasti accretion.',
      icon: <Waves className="w-6 h-6 text-cyan-600" />,
      tagBn: 'রাডার অ্যানালাইসিস',
      tagEn: 'Radar Analytics',
      featuresBn: ['সিকস্তি দাগের ক্ষতিপূরণ দাবি', 'পয়স্তি জমির ড্রোন সার্ভে', 'ভাঙন ঝুঁকি মানচিত্র'],
      featuresEn: ['Lost land claim tracker', 'Accreted land survey', 'Erosion hazard map'],
      requiresAuth: true
    },
    {
      id: 'DIASPORA',
      titleBn: 'প্রবাসী কনস্যুলার সেবা ও আমমোক্তারনামা',
      titleEn: 'Diaspora Consular Land Portal',
      categoryBn: 'নাগরিক সেবা',
      categoryEn: 'Citizen Service',
      descBn: 'বিদেশে অবস্থানরত বাংলাদেশিদের জন্য দূতাবাস অনুমোদিত পাওয়ার অব অ্যাটর্নি ও দূরবর্তী জমি তদারকি।',
      descEn: 'Overseas biometric verification, embassy power-of-attorney vetting, and remote property protection.',
      icon: <Plane className="w-6 h-6 text-sky-600" />,
      tagBn: 'প্রবাসী বান্ধব',
      tagEn: 'Diaspora Friendly',
      featuresBn: ['দূতাবাস নোটারি যাচাই', 'অনলাইনে কেভিয়েট লক', 'দূরবর্তী সম্পত্তি নিরাপত্তা'],
      featuresEn: ['Embassy POA vetting', 'Remote caveat lock', 'Overseas asset security'],
      requiresAuth: true
    },
    {
      id: 'CONVEYANCING_ESCROW',
      titleBn: 'ডিজিটাল বায়না ও নিরাপদ এসক্রো',
      titleEn: 'Conveyancing & Smart Escrow',
      categoryBn: 'নামজারি ও রাজস্ব',
      categoryEn: 'Mutation & Revenue',
      descBn: 'জমি কেনাবেচায় প্রতারণা রোধে ডিজিটাল বায়নাপত্র, সাব-রেজিস্ট্রি বায়োমেট্রিক এবং শর্তাধীন তহবিল ছাড়।',
      descEn: 'End-to-end conveyancing wizard with digital deed draft, sub-registry biometric check, and escrow payout.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-800" />,
      tagBn: 'জালিয়াতিহীন ক্রয়',
      tagEn: 'Zero Fraud Escrow',
      featuresBn: ['শর্তাধীন এসক্রো ব্যাংক ডিপোজিট', 'আইনজীবী ও ব্যাংক ভেটিং', 'সাব-রেজিস্ট্রি স্বয়ংক্রিয় নোটিশ'],
      featuresEn: ['Milestone escrow release', 'Lawyer & bank vetting', 'Auto SRO registration sync'],
      requiresAuth: true
    }
  ];

  const categories = [
    { id: 'ALL', labelBn: 'সকল সেবা', labelEn: 'All Services' },
    { id: 'CITIZEN', labelBn: 'নাগরিক সেবা', labelEn: 'Citizen Services' },
    { id: 'MUTATION', labelBn: 'নামজারি ও রাজস্ব', labelEn: 'Mutation & Revenue' },
    { id: 'LEGAL', labelBn: 'আইনি ও যাচাই', labelEn: 'Legal & Verification' },
    { id: 'SURVEY', labelBn: 'মানচিত্র ও সার্ভে', labelEn: 'Maps & Survey' }
  ];

  const filteredServices = services.filter(s => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'CITIZEN') return s.categoryEn === 'Citizen Service';
    if (activeCategory === 'MUTATION') return s.categoryEn === 'Mutation & Revenue';
    if (activeCategory === 'LEGAL') return s.categoryEn === 'Legal & Verification';
    if (activeCategory === 'SURVEY') return s.categoryEn === 'Maps & Survey';
    return true;
  });

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'স্মার্ট ভূমিসেবা তালিকা' : 'Comprehensive Land Services'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'bn'
              ? 'ভূমি সংক্রান্ত সকল সেবা এক প্ল্যাটফর্মে'
              : 'All Land Administration Services on One Unified Platform'}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'bn'
              ? 'নাগরিক, জমির মালিক, ক্রেতা-বিক্রেতা ও প্রবাসীদের জন্য পরিকল্পিত মডিউলগুলো নমুনা তথ্য দিয়ে ঘুরে দেখুন।'
              : 'Explore planned modules for citizens, owners, buyers and the diaspora using sample data.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-950/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {language === 'bn' ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="gov-card p-6 flex flex-col justify-between group hover:border-emerald-500 transition-all duration-300 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-emerald-50 flex items-center justify-center transition-colors">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                    {language === 'bn' ? service.tagBn : service.tagEn}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {language === 'bn' ? service.titleBn : service.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {language === 'bn' ? service.descBn : service.descEn}
                  </p>
                </div>

                {/* Feature Bullets */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {(language === 'bn' ? service.featuresBn : service.featuresEn).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold text-slate-600 hover:text-emerald-800 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>{language === 'bn' ? 'বিস্তারিত নির্দেশিকা' : 'Service Details'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <button
                  onClick={() => {
                    if (service.requiresAuth) {
                      onOpenLogin();
                    } else {
                      onSelectService(service.id);
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span>{language === 'bn' ? (service.requiresAuth ? 'ডেমোতে দেখুন' : 'এখনই দেখুন') : (service.requiresAuth ? 'Open demo' : 'Explore now')}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  {selectedService.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'bn' ? selectedService.titleBn : selectedService.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? selectedService.categoryBn : selectedService.categoryEn}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'bn' ? selectedService.descBn : selectedService.descEn}
            </p>

            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900">
                {language === 'bn' ? 'প্রধান বৈশিষ্ট্য ও সুবিধা:' : 'Key Features & Benefits:'}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {(language === 'bn' ? selectedService.featuresBn : selectedService.featuresEn).map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
              <button
                onClick={() => {
                  const s = selectedService;
                  setSelectedService(null);
                  if (s.requiresAuth) {
                    onOpenLogin();
                  } else {
                    onSelectService(s.id);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <span>{language === 'bn' ? (selectedService.requiresAuth ? 'লগইন করে সেবা গ্রহণ করুন' : 'সেবায় প্রবেশ করুন') : (selectedService.requiresAuth ? 'Login to Proceed' : 'Launch Service')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
