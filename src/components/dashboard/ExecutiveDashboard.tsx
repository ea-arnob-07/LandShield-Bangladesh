import React from 'react';
import { UserProfile, LandParcel, Language } from '../../types';
import { getTranslation } from '../../utils/translations';
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  AlertTriangle,
  FileCheck2,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Landmark,
  Scale,
  Waves,
  Building
} from 'lucide-react';

interface ExecutiveDashboardProps {
  currentUser: UserProfile;
  parcels: LandParcel[];
  selectedParcel: LandParcel;
  onSelectParcel: (parcel: LandParcel) => void;
  onNavigateToTab: (tab: any) => void;
  language: Language;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  currentUser,
  parcels,
  selectedParcel,
  onSelectParcel,
  onNavigateToTab,
  language
}) => {
  const cleanParcelsCount = parcels.filter(p => p.riskScore < 30).length;
  const highRiskCount = parcels.filter(p => p.riskScore >= 70).length;
  const underMutationCount = parcels.filter(p => p.status === 'UNDER_MUTATION').length;

  const goldenSteps = [
    { num: 1, labelBn: 'ভূমি অনুসন্ধান', labelEn: 'Land Search', tab: 'LAND_SEARCH_GIS' },
    { num: 2, labelBn: 'জিআইএস পরিদর্শন', labelEn: 'GIS Cadastral', tab: 'LAND_SEARCH_GIS' },
    { num: 3, labelBn: 'ভূমি প্রোফাইল', labelEn: 'Land Profile', tab: 'LAND_PROFILE' },
    { num: 4, labelBn: 'মালিকানা যাচাই', labelEn: 'Owner Verify', tab: 'LAND_PROFILE' },
    { num: 5, labelBn: 'খতিয়ান শৃঙ্খল', labelEn: 'Title Chain', tab: 'LAND_PROFILE' },
    { num: 6, labelBn: 'এআই দলিল পরীক্ষা', labelEn: 'AI OCR Parser', tab: 'DOC_AI_LAB' },
    { num: 7, labelBn: 'ব্যাংক ঋণ পরীক্ষা', labelEn: 'Mortgage Check', tab: 'LAND_PROFILE' },
    { num: 8, labelBn: 'আদালতি বিরোধ', labelEn: 'Court Disputes', tab: 'CAVEATS_DISPUTES' },
    { num: 9, labelBn: 'কেভিয়েট চেক', labelEn: 'Caveat Audit', tab: 'CAVEATS_DISPUTES' },
    { num: 10, labelBn: 'ঝুঁকি স্কোরিং', labelEn: 'Risk Matrix', tab: 'LAND_PROFILE' },
    { num: 11, labelBn: 'বায়না ও এসক্রো', labelEn: 'Buy/Sell Escrow', tab: 'BUY_SELL_ESCROW' },
    { num: 12, labelBn: 'আইনগত ভেটিং', labelEn: 'Legal Vetting', tab: 'BUY_SELL_ESCROW' },
    { num: 13, labelBn: 'সাব-রেজিস্ট্রি', labelEn: 'SRO Register', tab: 'BUY_SELL_ESCROW' },
    { num: 14, labelBn: 'এসআরও-এসিল্যান্ড সিঙ্ক', labelEn: 'SRO-AC Sync', tab: 'SMART_MUTATION' },
    { num: 15, labelBn: 'স্মার্ট নামজারি', labelEn: 'e-Mutation', tab: 'SMART_MUTATION' },
    { num: 16, labelBn: 'ভূমি কর দাখিলা', labelEn: 'LD Tax Dakhila', tab: 'LD_TAX' },
    { num: 17, labelBn: 'নতুন খতিয়ান ও অডিট', labelEn: 'Final Porcha & Audit', tab: 'AUDIT_EXPLORER' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Banner with National Identity */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white p-6 sm:p-8 shadow-gov-lg">
        {/* Background decorative watermark */}
        <div className="absolute right-0 top-0 bottom-0 w-96 opacity-10 pointer-events-none flex items-center justify-center">
          <Landmark className="w-96 h-96 -mr-20 -mt-10" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-emerald-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'bn' ? 'ভূমিসেবা · নমুনা কর্মক্ষেত্র' : 'BhumiSeba · demo workspace'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {language === 'bn'
              ? `স্বাগতম, ${currentUser.nameBn}`
              : `Welcome to BSUP, ${currentUser.name}`}
          </h2>

          <p className="text-emerald-100/90 text-xs sm:text-sm font-normal leading-relaxed">
            {language === 'bn'
              ? 'একটি নমুনা পার্সেল ধরে জরিপ, দলিল, নামজারি, কর, বন্ধক ও বিরোধের পর্যালোচনার পথ দেখুন। এখানে প্রদর্শিত তথ্য ও সিদ্ধান্ত কাল্পনিক।'
              : 'Follow a sample parcel through survey, deeds, mutation, tax, mortgages and disputes. Displayed records and decisions are fictional.'}
          </p>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => onNavigateToTab('LAND_SEARCH_GIS')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Compass className="w-4 h-4" />
              {language === 'bn' ? 'ক্যাডাস্ট্রাল ম্যাপে জমি খুঁজুন' : 'Search Land on GIS Map'}
            </button>

            <button
              onClick={() => onNavigateToTab('BUY_SELL_ESCROW')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold flex items-center gap-2 backdrop-blur-sm transition-all"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-300" />
              {language === 'bn' ? 'অনলাইন ক্রয়-বিক্রয় ও এসক্রো' : 'Start Digital Conveyancing'}
            </button>

            <button
              onClick={() => onNavigateToTab('DOC_AI_LAB')}
              className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 rounded-xl text-xs font-bold flex items-center gap-2 backdrop-blur-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              {language === 'bn' ? 'এআই দলিল যাচাই ল্যাব' : 'AI Document Intelligence'}
            </button>
          </div>
        </div>
      </div>

      {/* Core GovTech Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="gov-card p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">
              {language === 'bn' ? 'নমুনা ভূমি আইডি' : 'Sample land IDs'}
            </p>
            <h4 className="text-xl font-black text-slate-900">
              {parcels.length} <span className="text-xs font-normal text-slate-400">{language === 'bn' ? 'পার্সেল' : 'parcels'}</span>
            </h4>
            <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {language === 'bn' ? 'নমুনা ডেটা' : 'Demo data'}
            </span>
          </div>
        </div>

        <div className="gov-card p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">
              {language === 'bn' ? 'পর্যালোচনার ধাপ' : 'Review stages'}
            </p>
            <h4 className="text-xl font-black text-slate-900">
              ১৭ <span className="text-xs font-normal text-slate-400">{language === 'bn' ? 'নমুনা ধাপ' : 'sample steps'}</span>
            </h4>
            <span className="text-[10px] text-blue-700 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {language === 'bn' ? 'অনুসন্ধান থেকে অডিট' : 'Search to audit'}
            </span>
          </div>
        </div>

        <div className="gov-card p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">
              {language === 'bn' ? 'উচ্চ ঝুঁকির নমুনা' : 'High-risk samples'}
            </p>
            <h4 className="text-xl font-black text-red-600">
              {highRiskCount} <span className="text-xs font-normal text-slate-400">{language === 'bn' ? 'টি' : 'cases'}</span>
            </h4>
            <span className="text-[10px] text-red-700 font-bold">
              {language === 'bn' ? 'অফিসে যাচাই প্রয়োজন' : 'Needs source verification'}
            </span>
          </div>
        </div>

        <div className="gov-card p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">
              {language === 'bn' ? 'কম ঝুঁকির নমুনা' : 'Lower-risk samples'}
            </p>
            <h4 className="text-xl font-black text-slate-900">
              {cleanParcelsCount} <span className="text-xs font-normal text-slate-400">{language === 'bn' ? 'টি' : 'parcels'}</span>
            </h4>
            <span className="text-[10px] text-amber-700 font-bold">
              {language === 'bn' ? 'চূড়ান্ত আইনি সিদ্ধান্ত নয়' : 'Not legal clearance'}
            </span>
          </div>
        </div>
      </div>

      {/* 17-Step Golden Path Interactive Stepper */}
      <div className="gov-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">
                17
              </span>
              {language === 'bn'
                ? '১৭ ধাপের নমুনা ভূমিসেবা যাত্রা'
                : '17-step sample land service journey'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'bn'
                ? 'ভূমি অনুসন্ধান থেকে শুরু করে সাব-রেজিস্ট্রি, স্বয়ংক্রিয় নামজারি ও অডিট লেজার পর্যন্ত সম্পূর্ণ সমন্বিত প্রবাহ'
                : 'From Land Search to SRO Registration, Automated e-Mutation, Tax Enrollment, and SHA-256 Audit Trail'}
            </p>
          </div>

          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            BSUP Golden Path
          </span>
        </div>

        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {goldenSteps.map((step, idx) => (
              <button
                key={step.num}
                onClick={() => onNavigateToTab(step.tab)}
                className="group flex flex-col items-center p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-emerald-50 hover:border-emerald-300 transition-all text-center w-28"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 group-hover:bg-emerald-800 group-hover:text-white flex items-center justify-center text-[10px] font-black transition-colors mb-1">
                  {step.num}
                </span>
                <span className="text-[11px] font-bold text-slate-800 group-hover:text-emerald-900 leading-tight">
                  {language === 'bn' ? step.labelBn : step.labelEn}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Section: Currently Selected Parcel Snapshot & Role Workspace Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Currently Selected Land Snapshot */}
        <div className="lg:col-span-1 gov-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-emerald-800" />
              {language === 'bn' ? 'নির্বাচিত জমির প্রোফাইল সারাংশ' : 'Active Parcel Snapshot'}
            </span>
            <button
              onClick={() => onNavigateToTab('LAND_PROFILE')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-0.5"
            >
              {language === 'bn' ? 'সম্পূর্ণ প্রোফাইল' : 'Full View'} <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {selectedParcel.landId}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                selectedParcel.riskScore > 60 ? 'bg-red-100 text-red-700' :
                selectedParcel.riskScore > 30 ? 'bg-amber-100 text-amber-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                {selectedParcel.riskLevel} ({selectedParcel.riskScore}/100)
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">
                {language === 'bn' ? selectedParcel.mouzaBn : selectedParcel.mouza}
              </h4>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? `${selectedParcel.upazilaBn}, ${selectedParcel.districtBn}` : `${selectedParcel.upazila}, ${selectedParcel.district}`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">{getTranslation(language, 'dagNo')}</span>
                <span className="font-bold text-slate-800">{selectedParcel.dagNo}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">{getTranslation(language, 'khatianNo')}</span>
                <span className="font-bold text-slate-800">{selectedParcel.khatianNo}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">{getTranslation(language, 'area')}</span>
                <span className="font-bold text-emerald-900">{selectedParcel.areaSatak} {language === 'bn' ? 'শতক' : 'Satak'}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">{getTranslation(language, 'classification')}</span>
                <span className="font-bold text-slate-800">{language === 'bn' ? selectedParcel.classificationBn : selectedParcel.classification}</span>
              </div>
            </div>

            <div className="pt-1">
              <span className="text-[10px] text-slate-500 block mb-1 font-semibold">{getTranslation(language, 'currentOwner')}</span>
              <div className="flex items-center gap-2">
                <img
                  src={selectedParcel.currentOwners[0]?.photoUrl || currentUser.avatar}
                  alt="owner"
                  className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                />
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    {language === 'bn' ? selectedParcel.currentOwners[0]?.nameBn : selectedParcel.currentOwners[0]?.name}
                  </p>
                  <p className="text-[10px] text-emerald-800 font-semibold">
                    {selectedParcel.currentOwners[0]?.hisabShare} (এনআইডি যাচাইকৃত)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role-Specific Contextual Workspaces */}
        <div className="lg:col-span-2 gov-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-800" />
                {language === 'bn'
                  ? `${currentUser.designationBn} ওয়ার্কস্পেস অ্যাকশন`
                  : `${currentUser.designation} Workspace Actions`}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'আপনার ভূমিকা অনুযায়ী দ্রুত কার্যক্রম পরিচালনা করুন' : 'Role-tailored GovTech workflow quick shortcuts'}
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
              ROLE: {currentUser.role}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => onNavigateToTab('LAND_SEARCH_GIS')}
              className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-emerald-50/50 hover:border-emerald-300 text-left transition-all group flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-900">
                  {language === 'bn' ? 'ক্যাডাস্ট্রাল জিআইএস ম্যাপ' : 'Interactive Cadastral GIS'}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'bn' ? 'দাগভিত্তিক সীমানা, ঝুঁকি ওভারলে ও জিপিএস নোড পরিদর্শন' : 'Inspect PostGIS polygons, boundary pins & risk heatmaps'}
                </p>
              </div>
            </button>

            <button
              onClick={() => onNavigateToTab('DOC_AI_LAB')}
              className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-emerald-50/50 hover:border-emerald-300 text-left transition-all group flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-800 group-hover:text-white transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                  {language === 'bn' ? 'এআই দলিল ও খতিয়ান ল্যাব' : 'AI Document Intelligence'}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'bn' ? 'ওসিআর এক্সট্র্যাকশন ও জাতীয় ডাটাবেজের সাথে অসংগতি নির্ণয়' : 'Deed OCR parsing, anomaly highlighter & risk grading'}
                </p>
              </div>
            </button>

            <button
              onClick={() => onNavigateToTab('SMART_MUTATION')}
              className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-emerald-50/50 hover:border-emerald-300 text-left transition-all group flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-800 group-hover:text-white transition-colors">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-purple-900">
                  {language === 'bn' ? 'এসআরও-এসিল্যান্ড ই-নামজারি সিঙ্ক' : 'SRO-AC Land Mutation Hub'}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'bn' ? 'দলিল রেজিস্ট্রির পর তাৎক্ষণিক অটো-ডকেট ও কানুনগো রিপোর্ট' : 'Auto-triggered mutation docket upon deed registration'}
                </p>
              </div>
            </button>

            <button
              onClick={() => onNavigateToTab('AUDIT_EXPLORER')}
              className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-emerald-50/50 hover:border-emerald-300 text-left transition-all group flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-800 group-hover:text-white transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-amber-900">
                  {language === 'bn' ? 'SHA-256 অডিট লেজার এক্সপ্লোরার' : 'SHA-256 Audit Ledger'}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'bn' ? 'ক্রিপ্টোগ্রাফিক অপরিবর্তনীয় ব্লকচেইন হ্যাশ চেইনিং পর্যবেক্ষণ' : 'Inspect tamper-evident cryptographic block proofs'}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
