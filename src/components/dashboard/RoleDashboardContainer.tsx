import React, { useState } from 'react';
import { UserProfile, LandParcel, Language } from '../../types';
import { TabType } from '../layout/NavigationTabs';
import { getRoleConfig } from '../../config/roleConfig';
import { RoleQuickActions } from './RoleQuickActions';
import { RecentActivityStream } from './RecentActivityStream';
import { ApplicationTimelineModal } from '../common/ApplicationTimelineModal';
import {
  ShieldCheck,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Landmark,
  Scale,
  Waves,
  Building,
  FileText,
  BadgePercent,
  Receipt,
  GitPullRequest,
  AlertTriangle,
  Server,
  CreditCard,
  History,
  MapPin,
  FileCheck2,
  ChevronRight,
  Clock
} from 'lucide-react';

interface RoleDashboardContainerProps {
  currentUser: UserProfile;
  parcels: LandParcel[];
  selectedParcel: LandParcel;
  onSelectParcel: (parcel: LandParcel) => void;
  onNavigateToTab: (tab: TabType) => void;
  language: Language;
}

export const RoleDashboardContainer: React.FC<RoleDashboardContainerProps> = ({
  currentUser,
  parcels,
  selectedParcel,
  onSelectParcel,
  onNavigateToTab,
  language
}) => {
  const roleConfig = getRoleConfig(currentUser.role);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  // Helper to render icon by name
  const renderIcon = (name: string, className: string = 'w-5 h-5') => {
    switch (name) {
      case 'Compass': return <Compass className={className} />;
      case 'Building': return <Building className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'BadgePercent': return <BadgePercent className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Scale': return <Scale className={className} />;
      case 'Receipt': return <Receipt className={className} />;
      case 'Waves': return <Waves className={className} />;
      case 'Server': return <Server className={className} />;
      case 'ShieldAlert': return <AlertTriangle className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'GitPullRequest': return <GitPullRequest className={className} />;
      case 'CreditCard': return <CreditCard className={className} />;
      case 'Lock': return <Lock className={className} />;
      case 'FileCheck2': return <FileCheck2 className={className} />;
      case 'History': return <History className={className} />;
      default: return <Landmark className={className} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. ROLE-TAILORED HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white p-6 sm:p-8 shadow-gov-lg border border-emerald-800/40">
        {/* Background decorative watermark */}
        <div className="absolute right-0 top-0 bottom-0 w-96 opacity-10 pointer-events-none flex items-center justify-center">
          <Landmark className="w-96 h-96 -mr-20 -mt-10" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${roleConfig.badgeBg} ${roleConfig.badgeText}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? roleConfig.nameBn : roleConfig.nameEn}</span>
            </span>

            <span className="text-[11px] text-emerald-300 font-medium px-2.5 py-0.5 rounded-full bg-emerald-800/60 border border-emerald-600/40">
              {currentUser.jurisdictionBn || currentUser.jurisdiction}
            </span>

            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> NID: {currentUser.nid}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {language === 'bn' ? `স্বাগতম, ${currentUser.nameBn}` : `Welcome, ${currentUser.name}`}
          </h2>

          <p className="text-emerald-100/90 text-xs sm:text-sm font-normal leading-relaxed">
            {language === 'bn' ? roleConfig.descriptionBn : roleConfig.descriptionEn}
          </p>

          {/* Role Quick Action Buttons in Banner */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            {roleConfig.quickActions.slice(0, 3).map(action => (
              <button
                key={action.id}
                onClick={() => onNavigateToTab(action.targetTab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95 ${
                  action.btnVariant === 'primary'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950'
                    : action.btnVariant === 'accent'
                    ? 'bg-amber-500 hover:bg-amber-400 text-amber-950'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm'
                }`}
              >
                {renderIcon(action.iconName, 'w-4 h-4')}
                <span>{language === 'bn' ? action.labelBn : action.labelEn}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. ROLE-SPECIFIC QUICK ACTIONS PANEL */}
      <RoleQuickActions
        role={currentUser.role}
        language={language}
        onNavigateTab={onNavigateToTab}
        onOpenTrackingModal={() => setIsTimelineOpen(true)}
      />

      {/* 3. ROLE-SPECIFIC STATISTICS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {roleConfig.stats.map(stat => (
          <div key={stat.id} className="gov-card p-4 flex items-center gap-3.5 relative overflow-hidden">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              stat.accentColor === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
              stat.accentColor === 'blue' ? 'bg-blue-100 text-blue-800' :
              stat.accentColor === 'purple' ? 'bg-purple-100 text-purple-800' :
              stat.accentColor === 'red' ? 'bg-red-100 text-red-700' :
              stat.accentColor === 'teal' ? 'bg-teal-100 text-teal-800' :
              stat.accentColor === 'amber' ? 'bg-amber-100 text-amber-800' :
              stat.accentColor === 'cyan' ? 'bg-cyan-100 text-cyan-800' :
              'bg-slate-100 text-slate-800'
            }`}>
              {renderIcon(stat.iconName, 'w-6 h-6')}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold text-slate-500 truncate">
                {language === 'bn' ? stat.labelBn : stat.labelEn}
              </p>
              <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {stat.value}
              </h4>
              <span className={`text-[10px] font-bold flex items-center gap-1 ${
                stat.changeType === 'positive' ? 'text-emerald-700' :
                stat.changeType === 'warning' ? 'text-amber-700' :
                stat.changeType === 'negative' ? 'text-red-700' :
                'text-blue-700'
              }`}>
                {stat.change && (
                  <>
                    <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{stat.change}</span>
                  </>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. DEDICATED ROLE WORKSPACE DATA WIDGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Role Interactive Table / Action Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Custom widget based on role */}
          {currentUser.role === 'CITIZEN' && (
            <div className="gov-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-800" />
                    <span>{language === 'bn' ? 'আমার সাম্প্রতিক নাগরিক আবেদনসমূহ' : 'My Recent Citizen Applications'}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'ই-নামজারি, খতিয়ান সংশোধন ও কর দাখিলা আবেদনের সরাসরি স্থিতি' : 'Live tracking of your mutation petitions & tax dakhila'}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToTab('LAND_PROFILE')}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  {language === 'bn' ? 'সকল আবেদন' : 'View All'} <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 flex items-center justify-between transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">ই-নামজারি আবেদন #MUT-SAV-2026-902</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">অনুমোদিত</span>
                    </div>
                    <p className="text-[11px] text-slate-500">সাভার মৌজা, দাগ নং ১০৪ • খতিয়ান নং BS-MUT-9014</p>
                  </div>
                  <button
                    onClick={() => onNavigateToTab('LAND_PROFILE')}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                  >
                    পর্চা ডাউনলোড
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 flex items-center justify-between transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">ভূমি উন্নয়ন কর পরিশোধ #TAX-DHAN-8921</span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-md">দাখিলা প্রাপ্ত</span>
                    </div>
                    <p className="text-[11px] text-slate-500">ধানমন্ডি আবাসিক এলাকা, হোল্ডিং নং HLD-DHAN-904</p>
                  </div>
                  <button
                    onClick={() => onNavigateToTab('LD_TAX')}
                    className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold transition-all"
                  >
                    দাখিলা প্রিন্ট
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentUser.role === 'OWNER' && (
            <div className="gov-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-emerald-800" />
                    <span>{language === 'bn' ? 'আমার মালিকানাধীন ৩টি প্লটের পোর্টফোলিও' : 'My Land Ownership Portfolio (3 Parcels)'}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'এনআইডি যুক্ত সরকারি খতিয়ান ও সুরক্ষামূলক কেভিয়েট স্থিতি' : 'NID mapped official parcels & caveat locks'}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToTab('CAVEATS_DISPUTES')}
                  className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1 hover:bg-red-100"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>কেভিয়েট লক</span>
                </button>
              </div>

              <div className="space-y-3">
                {parcels.slice(0, 3).map(p => (
                  <div
                    key={p.landId}
                    onClick={() => onSelectParcel(p)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      p.landId === selectedParcel.landId
                        ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{p.mouzaBn || p.mouza}</span>
                        <span className="text-[10px] font-mono text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                          দাগ: {p.dagNo}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.riskScore < 30 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        খতিয়ান: {p.khatianNo} • আয়তন: {p.areaSatak} শতক ({p.areaKatha} কাঠা) • হোল্ডিং: {p.holdingNo}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectParcel(p);
                        onNavigateToTab('LAND_PROFILE');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-800 hover:text-white text-slate-700 text-xs font-bold transition-all flex items-center gap-1"
                    >
                      পর্চা দেখুন <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentUser.role === 'BUYER_SELLER' && (
            <div className="gov-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BadgePercent className="w-4 h-4 text-amber-600" />
                    <span>{language === 'bn' ? 'সক্রিয় ক্রয়-বিক্রয় এসক্রো ও ভায়া দলিল ভেটিং' : 'Active Conveyancing Escrows & Deed Vetting'}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'বাংলাদেশ ব্যাংক এসক্রো হিসাব ও সাব-রেজিস্ট্রির প্রস্তুতি' : 'Safeguarded funds held until biometric deed registration'}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToTab('BUY_SELL_ESCROW')}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-amber-950 rounded-lg text-xs font-bold transition-all shadow-xs"
                >
                  এসক্রো উইজার্ড
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950">বায়না চুক্তি #ESC-2026-DHAN-01</span>
                  <span className="text-[11px] font-mono font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    তহবিল সংরক্ষিত: ৳ ১,২০,০০,০০০
                  </span>
                </div>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  ধানমন্ডি ১০৪ দাগের সাড়ে সাত শতক আবাসিক প্লট। বিক্রেতা আব্দুল করিম চৌধুরী এর এনআইডি ও সিএস-এসএ-আরএস-বিএস ভায়া দলিল এআই স্ক্রুটিনিতে শতভাগ নিষ্কণ্টক প্রমাণিত হয়েছে।
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => onNavigateToTab('DOC_AI_LAB')}
                    className="text-xs font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> এআই দলিল রিপোর্ট
                  </button>
                  <button
                    onClick={() => onNavigateToTab('BUY_SELL_ESCROW')}
                    className="text-xs font-bold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    রেজিস্ট্রেশন টোকেন
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentUser.role === 'LAWYER' && (
            <div className="gov-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-indigo-700" />
                    <span>{language === 'bn' ? 'চলমান মোকদ্দমা ডায়েরি ও শুনানি দিনপঞ্জি' : 'Active Land Suits & Hearing Calendar'}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'টাইটেল স্যুট, বাটোয়ারা ও ১৪৪ ধারা নিষেধাজ্ঞার হালনাগাদ রেকর্ড' : 'Track civil suits, section 144 CrPC, and partition litigation'}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToTab('CAVEATS_DISPUTES')}
                  className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                >
                  কেভিয়েট ফাইল করুন
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-200/80 flex items-center justify-between transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Title Suit No: 412/2025</span>
                      <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-md">ইনজাংশন সক্রিয়</span>
                    </div>
                    <p className="text-[11px] text-slate-600">সাভার ৫৪১২ দাগ • সহকারী জজ ১ম আদালত, ঢাকা • শুনানি: ১৫ মার্চ</p>
                  </div>
                  <button
                    onClick={() => onNavigateToTab('CAVEATS_DISPUTES')}
                    className="px-3 py-1.5 bg-white border border-slate-300 text-indigo-900 rounded-lg text-xs font-bold hover:bg-indigo-50"
                  >
                    আরজি দেখুন
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-200/80 flex items-center justify-between transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">বাটোয়ারা মামলা #PART-104-DHA</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md">ফারায়েজ প্রতিবেদন সাপেক্ষ</span>
                    </div>
                    <p className="text-[11px] text-slate-600">উত্তরাধিকার বণ্টন ও সীমানা নির্ধারণ সংক্রান্ত মোকদ্দমা</p>
                  </div>
                  <button
                    onClick={() => onNavigateToTab('FARAID_INHERITANCE')}
                    className="px-3 py-1.5 bg-white border border-slate-300 text-indigo-900 rounded-lg text-xs font-bold hover:bg-indigo-50"
                  >
                    ফারায়েজ চালান
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentUser.role === 'SURVEYOR' && (
            <div className="gov-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-teal-700" />
                    <span>{language === 'bn' ? 'ডিএলআরএস ক্যাডাস্ট্রাল জিপিএস নোড ও নদীভাঙন জরিপ' : 'DLRS Cadastral GPS Demarcation & Erosion Radar'}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'আরটিকে জিপিএস কো-অর্ডিনেট এবং ইনসার রাডার সিকস্তি মনিটরিং' : 'Centimeter accurate RTK GPS boundary pins & satellite radar'}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToTab('LAND_SEARCH_GIS')}
                  className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                >
                  জিআইএস ম্যাপ
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200/80 space-y-2">
                  <span className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-teal-700" /> ক্যাডাস্ট্রাল নোড ডায়াগনস্টিক
                  </span>
                  <p className="text-[11px] text-teal-900/80">
                    ধানমন্ডি ১০৪ দাগে ৪টি জিপিএস নোড সক্রিয় রয়েছে। উত্তর-পশ্চিম কর্নারের কো-অর্ডিনেট ২৩.৭৪৬৫° N, ৯০.৩৭৩৮° E।
                  </p>
                  <button
                    onClick={() => onNavigateToTab('LAND_SEARCH_GIS')}
                    className="text-xs font-bold text-teal-800 underline block"
                  >
                    সীমানা নোড পরিবর্তন ও যাচাই →
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-50/60 border border-cyan-200/80 space-y-2">
                  <span className="text-xs font-bold text-cyan-950 flex items-center gap-1.5">
                    <Waves className="w-4 h-4 text-cyan-700" /> ইনসার নদীভাঙন রাডার
                  </span>
                  <p className="text-[11px] text-cyan-900/80">
                    চাঁদপুর হাইমচর ও পদ্মাপাড়ে সেনটিনেল-১ স্যাটেলাইট রাডারে সিকস্তি জমির পরিমাপ হালনাগাদ করা হয়েছে।
                  </p>
                  <button
                    onClick={() => onNavigateToTab('INSAR_EROSION')}
                    className="text-xs font-bold text-cyan-800 underline block"
                  >
                    ইনসার রাডার পোর্টালে যান →
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentUser.role === 'SRO_OFFICER' && (
            <div className="gov-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4 text-emerald-800" />
                    <span>{language === 'bn' ? 'সাব-রেজিস্ট্রি থেকে এসিল্যান্ডে তাৎক্ষণিক নামজারি সিঙ্ক' : 'Realtime SRO-to-AC Land Mutation Trigger'}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'দলিল স্বাক্ষরিত হওয়ার সাথে সাথে স্বয়ংক্রিয়ভাবে এসিল্যান্ডে ডকেট তৈরি হয়' : 'Automatic e-Mutation docket generation upon deed seal'}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToTab('SMART_MUTATION')}
                  className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                >
                  সিঙ্ক হাব খুলুন
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">Deed No: 4821/2026 (Saf-Kabala)</span>
                    <p className="text-[11px] text-emerald-800">
                      ধানমন্ডি সাব-রেজিস্ট্রি • দাতা: আব্দুল করিম চৌধুরী • গ্রহীতা: তারিকুল ইসলাম • স্ট্যাম্প শুল্ক: পরিশোধিত
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-900 bg-white px-2.5 py-1 rounded-md border border-emerald-300">
                    AC Land Synced ✓
                  </span>
                </div>
              </div>
            </div>
          )}

          {currentUser.role === 'AC_LAND' && (
            <div className="gov-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4 text-emerald-900" />
                    <span>{language === 'bn' ? 'ই-নামজারি রাজস্ব আদালত ও অনুমোদন কিউ' : 'e-Mutation Judicial Review & Approval Queue'}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'ইউএলএও ও কানুনগো তদন্ত রিপোর্টের ভিত্তিতে নতুন খতিয়ান মঞ্জুর' : 'Review ground reports and grant certified khatian orders'}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToTab('SMART_MUTATION')}
                  className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-950 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                >
                  সকল কেস রিভিউ
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">কেস নং: MUT-SAV-2026-902 (সাভার সার্কেল)</span>
                    <p className="text-[11px] text-slate-500">আবেদনকারী: রহিমা বেগম • কানুনগো রিপোর্ট: নিষ্কণ্টক • প্রস্তাবিত খতিয়ান: BS-NEW-902</p>
                  </div>
                  <button
                    onClick={() => onNavigateToTab('SMART_MUTATION')}
                    className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-all"
                  >
                    অনুমোদন করুন
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-red-50/60 border border-red-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-red-900">কেস নং: MUT-SAV-2026-8914</span>
                      <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">কেভিয়েট লক</span>
                    </div>
                    <p className="text-[11px] text-red-700">সাভার ৫৪১২ দাগে দেওয়ানি আদালত কর্তৃক ইনজাংশন থাকার কারণে নামজারি স্থগিত</p>
                  </div>
                  <button
                    onClick={() => onNavigateToTab('CAVEATS_DISPUTES')}
                    className="px-3 py-1.5 bg-white border border-red-300 text-red-800 rounded-lg text-xs font-bold hover:bg-red-50"
                  >
                    আদেশ নথি
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentUser.role === 'GOV_ADMIN' && (
            <div className="gov-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Server className="w-4 h-4 text-slate-800" />
                    <span>{language === 'bn' ? 'জাতীয় ইন্টারঅপারেবিলিটি এপিআই ও ম্যাক্রো কর্মদক্ষতা' : 'National Interoperability APIs & Macro Governance'}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'মন্ত্রণালয়সমূহ ও বাংলাদেশ ব্যাংকের সমন্বিত রিয়েলটাইম গেটওয়ে' : 'Cross-agency unified gateway performance monitoring'}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToTab('GOV_API_SANDBOX')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                >
                  এপিআই স্যান্ডবক্স
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-800">বাংলাদেশ ব্যাংক এসক্রো গেটওয়ে</span>
                    <span className="text-[10px] text-emerald-700 font-bold">Sample status</span>
                  </div>
                  <p className="text-[11px] text-slate-500">রিয়েলটাইম লিয়েন ও ফান্ড ভেরিফিকেশন লেটেন্সি: ৬৪ms</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-800">নির্বাচন কমিশন এনআইডি গেটওয়ে</span>
                    <span className="text-[10px] text-emerald-700 font-bold">Connected</span>
                  </div>
                  <p className="text-[11px] text-slate-500">বায়োমেট্রিক ও ভোটার ডাটাবেজ ভেরিফিকেশন সক্রিয়</p>
                </div>
              </div>
            </div>
          )}

          {currentUser.role === 'BANK_OFFICER' && (
            <div className="gov-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-800" />
                    <span>{language === 'bn' ? 'ব্যাংক কোল্যাটেরাল ঋণ ও বন্ধকী চার্জ পরীক্ষণ' : 'Bank Collateral Loans & Mortgage Lien Registry'}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'একই জমিতে একাধিক ব্যাংক ঋণ নেওয়ার অপচেষ্টা স্বয়ংক্রিয়ভাবে প্রতিহত' : 'Instant detection of duplicate mortgages or encumbrances'}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToTab('LAND_PROFILE')}
                  className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                >
                  দায়মুক্ত সনদ
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950">মর্টগেজ রেজিস্ট্রি #MORT-2024-SONALI-09</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                    লিয়েন সক্রিয়
                  </span>
                </div>
                <p className="text-xs text-emerald-900/90 leading-relaxed">
                  ধানমন্ডি ১০৪ দাগ • সোনালী ব্যাংক পিএলসি প্রধান শাখা • ঋণ স্থিতি: ৳ ১,৫০,০০,০০০ • লিয়েন লক থাকার কারণে কোনো নামজারি বা বিক্রি সম্ভব নয়।
                </p>
              </div>
            </div>
          )}

          {currentUser.role === 'AUDITOR' && (
            <div className="gov-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-red-700" />
                    <span>{language === 'bn' ? 'ক্রিপ্টোগ্রাফিক SHA-256 ব্লক অখণ্ডতা ও অডিট ট্রেইল' : 'Cryptographic SHA-256 Block Integrity & Tamper Audit'}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'ডাটাবেজে কোনো ব্যাকডেটেড পরিবর্তন বা আনঅথরাইজড ওভাররাইটের চেষ্টা নেই' : 'Tamper-evident blockchain state across all land mutations'}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToTab('AUDIT_EXPLORER')}
                  className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                >
                  লেজার এক্সপ্লোরার
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-emerald-400">
                  <span>LAST BLOCK HASH: #3842</span>
                  <span>STATUS: VALIDATED ✓</span>
                </div>
                <p className="text-slate-400 text-[11px] truncate">
                  f38a9d18b2c451098ac61de9284fa091bb812a3d0092c4b81726aef10928a412
                </p>
                <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                  Transaction: USER_SESSION_AUTHENTICATED • Nonce: 49102 • Proof of Authority
                </div>
              </div>
            </div>
          )}

          {/* Role Golden Workflow Stepper */}
          <div className="gov-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span>
                  {language === 'bn'
                    ? `${roleConfig.nameBn}-এর নির্ধারিত সেবা প্রবাহ`
                    : `${roleConfig.nameEn} Dedicated Workflow`}
                </span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                ভূমিকা নির্দেশিকা
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {roleConfig.workflows.map(step => (
                <div
                  key={step.stepNo}
                  onClick={() => onNavigateToTab(step.targetTab)}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 group-hover:bg-emerald-800 group-hover:text-white flex items-center justify-center text-[10px] font-black transition-colors">
                      {step.stepNo}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 group-hover:text-emerald-800">
                      {step.statusBn}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-800 group-hover:text-emerald-900 line-clamp-1">
                    {language === 'bn' ? step.titleBn : step.titleEn}
                  </h5>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {language === 'bn' ? step.descBn : step.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Selected Parcel Snapshot & Role Notices */}
        <div className="space-y-6">
          {/* Active Land Parcel Quick Snapshot */}
          <div className="gov-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-emerald-800" />
                {language === 'bn' ? 'নির্বাচিত জমির তথ্য' : 'Active Land Record'}
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
                  ঝুঁকি: {selectedParcel.riskScore}/১০০
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {language === 'bn' ? selectedParcel.mouzaBn : selectedParcel.mouza}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'bn' ? `${selectedParcel.upazilaBn}, ${selectedParcel.districtBn}` : `${selectedParcel.upazila}, ${selectedParcel.district}`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">দাগ নম্বর</span>
                  <span className="font-bold text-slate-800">{selectedParcel.dagNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">খতিয়ান নং</span>
                  <span className="font-bold text-slate-800">{selectedParcel.khatianNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">জমির পরিমাণ</span>
                  <span className="font-bold text-emerald-900">{selectedParcel.areaSatak} শতক</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">শ্রেণি</span>
                  <span className="font-bold text-slate-800">{language === 'bn' ? selectedParcel.classificationBn : selectedParcel.classification}</span>
                </div>
              </div>

              <div className="pt-1">
                <span className="text-[10px] text-slate-500 block mb-1 font-semibold">রেকর্ডীয় মালিক</span>
                <div className="flex items-center gap-2">
                  <img
                    src={selectedParcel.currentOwners[0]?.photoUrl || currentUser.avatar}
                    alt="owner"
                    className="w-7 h-7 rounded-lg object-cover border border-slate-200"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {language === 'bn' ? selectedParcel.currentOwners[0]?.nameBn : selectedParcel.currentOwners[0]?.name}
                    </p>
                    <p className="text-[10px] text-emerald-800 font-semibold">
                      {selectedParcel.currentOwners[0]?.hisabShare}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Role Announcements & Circulars */}
          <div className="gov-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-800" />
                <span>{language === 'bn' ? 'ভূমিকা সংক্রান্ত জরুরি বিজ্ঞপ্তি' : 'Official Notices'}</span>
              </h4>
              <span className="text-[10px] text-slate-400 font-medium">লাইভ আপডেট</span>
            </div>

            <div className="space-y-2">
              {roleConfig.announcements.map(ann => (
                <div key={ann.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      ann.badgeVariant === 'success' ? 'bg-emerald-100 text-emerald-800' :
                      ann.badgeVariant === 'warning' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {ann.badgeBn}
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium">{ann.date}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-800 leading-snug">
                    {language === 'bn' ? ann.titleBn : ann.titleEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Stream */}
          <RecentActivityStream
            role={currentUser.role}
            language={language}
            onOpenTimeline={() => setIsTimelineOpen(true)}
          />
        </div>
      </div>

      {/* Application Tracking Timeline Modal */}
      <ApplicationTimelineModal
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
        language={language}
        onDownloadPorcha={() => onNavigateToTab('LAND_PROFILE')}
      />
    </div>
  );
};
