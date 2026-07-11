import React, { useState } from 'react';
import {
  LandParcel,
  KhatianRecord,
  DeedRecord,
  TaxRecord,
  EncumbranceRecord,
  CaveatRecord,
  DisputeRecord,
  Language,
  UserProfile
} from '../../types';
import { getTranslation } from '../../utils/translations';
import { FraudDetectionEngine } from '../../services/fraudDetection';
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Receipt,
  Scale,
  Lock,
  GitCommit,
  QrCode,
  Download,
  Building,
  UserCheck,
  CheckCircle,
  ExternalLink,
  Info,
  Calendar,
  DollarSign
} from 'lucide-react';

interface DigitalLandProfileProps {
  parcel: LandParcel;
  khatian?: KhatianRecord;
  deeds: DeedRecord[];
  tax?: TaxRecord;
  encumbrances: EncumbranceRecord[];
  caveats: CaveatRecord[];
  disputes: DisputeRecord[];
  currentUser: UserProfile;
  language: Language;
  onNavigateToBuySell: () => void;
  onNavigateToDocAi: () => void;
}

export const DigitalLandProfile: React.FC<DigitalLandProfileProps> = ({
  parcel,
  khatian,
  deeds,
  tax,
  encumbrances,
  caveats,
  disputes,
  currentUser,
  language,
  onNavigateToBuySell,
  onNavigateToDocAi
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'PORCHA' | 'CHAIN_TITLE' | 'MORTGAGE' | 'CAVEATS' | 'TAX' | 'RISK_MATRIX'>('PORCHA');

  const riskReport = FraudDetectionEngine.evaluateRisk(parcel, encumbrances, caveats, disputes);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Card: Single-Pane Land Identity */}
      <div className="gov-card p-6 border-l-8 border-l-emerald-800 bg-gradient-to-br from-white to-slate-50 shadow-gov">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-extrabold bg-emerald-900 text-white tracking-wide shadow-sm">
                {parcel.landId}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-800 font-mono">
                {parcel.surveyType} Survey
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                riskReport.grade === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                riskReport.grade === 'HIGH' ? 'bg-amber-100 text-amber-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                {language === 'bn' ? `ঝুঁকি সূচক: ${riskReport.score}/১০০` : `Risk Score: ${riskReport.score}/100`} ({riskReport.grade})
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {language === 'bn' ? parcel.mouzaBn : parcel.mouza}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'bn'
                ? `উপজেলা: ${parcel.upazilaBn} | জেলা: ${parcel.districtBn} | বিভাগ: ${parcel.divisionBn} | জে.এল. নং: ${parcel.jlNo}`
                : `Upazila: ${parcel.upazila} | District: ${parcel.district} | Division: ${parcel.division} | JL No: ${parcel.jlNo}`}
            </p>
          </div>

          {/* Key Metric Badges */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 text-right shadow-sm">
              <span className="text-[10px] text-slate-400 font-semibold block">{getTranslation(language, 'area')}</span>
              <span className="text-base sm:text-lg font-black text-emerald-900">
                {parcel.areaSatak} {language === 'bn' ? 'শতক' : 'Satak'}
              </span>
              <span className="text-[10px] text-slate-500 block">
                ({parcel.areaKatha} {language === 'bn' ? 'কাঠা' : 'Katha'})
              </span>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200 text-right shadow-sm">
              <span className="text-[10px] text-slate-400 font-semibold block">{getTranslation(language, 'marketValue')}</span>
              <span className="text-base sm:text-lg font-black text-slate-900">
                ৳ {(parcel.marketValueBDT / 100000).toFixed(1)}L
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold block">
                {language === 'bn' ? 'সরকারি হার হালনাগাদ' : 'Official Valuation'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              {language === 'bn' ? 'রেকর্ডীয় মালিক:' : 'Recorded Owner:'}
            </span>
            <span className="text-xs font-bold text-slate-800">
              {language === 'bn' ? parcel.currentOwners[0]?.nameBn : parcel.currentOwners[0]?.name}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
              {parcel.currentOwners[0]?.hisabShare}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToDocAi}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              {language === 'bn' ? 'দলিল বিশ্লেষণ করুন' : 'AI Analyze Deeds'}
            </button>

            <button
              onClick={onNavigateToBuySell}
              disabled={!riskReport.isConveyancingAllowed}
              className="px-4 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              {language === 'bn' ? 'অনলাইন ক্রয়-বিক্রয় শুরু' : 'Initiate Conveyancing'}
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveSubTab('PORCHA')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all border-b-2 ${
            activeSubTab === 'PORCHA'
              ? 'border-emerald-800 text-emerald-900 bg-white shadow-sm'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          {language === 'bn' ? 'ডিজিটাল স্মার্ট খতিয়ান (পর্চা)' : 'Digital Smart Khatian (Porcha)'}
        </button>

        <button
          onClick={() => setActiveSubTab('CHAIN_TITLE')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all border-b-2 ${
            activeSubTab === 'CHAIN_TITLE'
              ? 'border-emerald-800 text-emerald-900 bg-white shadow-sm'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <GitCommit className="w-4 h-4" />
          {language === 'bn' ? 'ভায়া দলিল ও মালিকানা শৃঙ্খল' : 'Chain of Title & Via Deeds'}
        </button>

        <button
          onClick={() => setActiveSubTab('MORTGAGE')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all border-b-2 ${
            activeSubTab === 'MORTGAGE'
              ? 'border-emerald-800 text-emerald-900 bg-white shadow-sm'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building className="w-4 h-4" />
          {language === 'bn' ? 'ব্যাংক ঋণ ও দায়বদ্ধতা (CIB)' : 'Bank Charges & Mortgage'}
        </button>

        <button
          onClick={() => setActiveSubTab('CAVEATS')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all border-b-2 ${
            activeSubTab === 'CAVEATS'
              ? 'border-emerald-800 text-emerald-900 bg-white shadow-sm'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          {language === 'bn' ? 'কেভিয়েট ও দেওয়ানি মামলা' : 'Caveats & Court Suits'}
        </button>

        <button
          onClick={() => setActiveSubTab('TAX')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all border-b-2 ${
            activeSubTab === 'TAX'
              ? 'border-emerald-800 text-emerald-900 bg-white shadow-sm'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Receipt className="w-4 h-4" />
          {language === 'bn' ? 'ভূমি কর দাখিলা (LD Tax)' : 'Land Tax Dakhila'}
        </button>

        <button
          onClick={() => setActiveSubTab('RISK_MATRIX')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all border-b-2 ${
            activeSubTab === 'RISK_MATRIX'
              ? 'border-emerald-800 text-emerald-900 bg-white shadow-sm'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          {language === 'bn' ? '১০০-পয়েন্ট জালিয়াতি ঝুঁকি ইঞ্জিন' : '100-Point Risk Engine'}
        </button>
      </div>

      {/* Sub-Tab Contents */}
      {/* 1. DIGITAL SMART KHATIAN (PORCHA) */}
      {activeSubTab === 'PORCHA' && (
        <div className="gov-card p-6 khatian-watermark border border-emerald-900/20 shadow-lg relative space-y-6">
          {/* Official Gov Header Stamp */}
          <div className="text-center space-y-1 pb-4 border-b-2 border-emerald-900/30">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                BD
              </div>
              <h3 className="text-base sm:text-lg font-black text-emerald-950 uppercase tracking-wide">
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার — ডিজিটাল ভূমি রেকর্ড ও জরিপ
              </h3>
            </div>
            <p className="text-xs font-bold text-slate-700">
              {parcel.surveyType} জরিপ খতিয়ান নম্বর: <span className="font-mono text-emerald-900 font-extrabold text-sm">{parcel.khatianNo}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              মৌজা: {parcel.mouzaBn} (জে.এল. নং: {parcel.jlNo}) | উপজেলা: {parcel.upazilaBn} | জেলা: {parcel.districtBn}
            </p>
          </div>

          {/* Khatian Owners Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {language === 'bn' ? '১. স্বত্বাধিকারী ও মালিকগণের বিবরণ (হিস্যাসহ)' : '1. Recorded Proprietors & Ownership Equity'}
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">ক্রমিক</th>
                    <th className="p-3">মালিকের নাম ও পিতার নাম</th>
                    <th className="p-3">জাতীয় পরিচয়পত্র (NID)</th>
                    <th className="p-3">হিস্যা (ঐতিহ্যবাহী হিসেব)</th>
                    <th className="p-3">দশমিক অংশ</th>
                    <th className="p-3">অংশীয় জমি (শতক)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {parcel.currentOwners.map((owner, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-bold">{idx + 1}</td>
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block">{owner.nameBn}</span>
                        <span className="text-[11px] text-slate-500">পিতা/স্বামী: {owner.fatherHusbandNameBn}</span>
                      </td>
                      <td className="p-3 font-mono text-slate-600">{owner.nid}</td>
                      <td className="p-3 font-bold text-emerald-900">{owner.hisabShare}</td>
                      <td className="p-3 font-mono">{owner.shareDecimal.toFixed(4)}</td>
                      <td className="p-3 font-bold text-slate-900">
                        {(parcel.areaSatak * owner.shareDecimal).toFixed(2)} শতক
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dag & Plot Geometry Details */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {language === 'bn' ? '২. দাগ ও ভূমির সীমানা বিবরণ' : '2. Cadastral Dag Plot & Boundaries'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">দাগ নম্বর</span>
                <span className="font-bold text-slate-900 text-sm font-mono">{parcel.dagNo}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">জমির শ্রেণি</span>
                <span className="font-bold text-slate-900">{parcel.classificationBn}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">মোট দাগের পরিমাণ</span>
                <span className="font-bold text-emerald-900 text-sm">{parcel.areaSatak} শতক</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">হোল্ডিং নম্বর</span>
                <span className="font-bold text-slate-900 font-mono">{parcel.holdingNo}</span>
              </div>
            </div>
          </div>

          {/* Porcha Digital Signature & QR Stamp Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center p-1 shadow-sm">
                <QrCode className="w-12 h-12" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">জাতীয় ডিজিটাল ভূমি রেকর্ড কিউআর কোড</p>
                <p className="text-[10px] text-slate-500 font-mono">
                  VERIFY: https://eporcha.gov.bd/khatian/{parcel.khatianNo}
                </p>
                <p className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> সহকারী কমিশনার (ভূমি) কর্তৃক ডিজিটাল স্বাক্ষরিত
                </p>
              </div>
            </div>

            <button
              onClick={() => alert(`ডাউনলোড হচ্ছে: স্মার্ট খতিয়ান_${parcel.khatianNo}.pdf`)}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              {language === 'bn' ? 'স্মার্ট খতিয়ান পিডিএফ ডাউনলোড' : 'Download Smart Khatian PDF'}
            </button>
          </div>
        </div>
      )}

      {/* 2. CHAIN OF TITLE & VIA DEEDS (ভায়া দলিল শৃঙ্খল) */}
      {activeSubTab === 'CHAIN_TITLE' && (
        <div className="gov-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'মালিকানা শৃঙ্খল ও ভায়া দলিল ইতিহাস (Chain of Title)' : 'Chain of Title & Genealogical Via Deeds'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn'
                  ? 'সিএস জরিপ থেকে বর্তমান বিএস খতিয়ান পর্যন্ত নিরবচ্ছিন্ন হস্তান্তরের প্রামাণ্য ইতিহাস'
                  : 'Evolutionary legal ownership genealogy from CS survey to present BS record'}
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ৪ ধাপের ভায়া দলিল যাচাইকৃত
            </span>
          </div>

          <div className="relative pl-6 space-y-6 border-l-2 border-emerald-700/40">
            {/* Step 1: CS Survey */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-800 ring-4 ring-emerald-100"></span>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">সিএস জরিপ (Cadastral Survey 1910-1940)</span>
                  <span className="text-[10px] font-mono text-slate-500">খতিয়ান নং: CS-104</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  মূল রেকর্ডীয় প্রজা: মুন্সী মনসুর আলী (পূর্ণ ১৬ আনা হিস্যা)
                </p>
              </div>
            </div>

            {/* Step 2: SA Survey & Inheritance */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-700 ring-4 ring-emerald-100"></span>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">এসএ রেকর্ড ও বণ্টননামা (State Acquisition 1956-1962)</span>
                  <span className="text-[10px] font-mono text-slate-500">খতিয়ান নং: SA-840</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  ওয়ারিশান সূত্রে মোজাম্মেল হক ও রফিকুল চৌধুরী যৌথ মালিকানা প্রাপ্ত।
                </p>
              </div>
            </div>

            {/* Step 3: RS Saf-Kabala Transfer */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100"></span>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">আরএস সাফ-কবলা দলিল (Revisional Survey 1994)</span>
                  <span className="text-[10px] font-mono text-slate-500">দলিল নং: DALIL-1994-1120</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  ধানমন্ডি সাব-রেজিস্ট্রি অফিসে বেগম লায়লা আরজুমান্দ বরাবর হস্তান্তরিত।
                </p>
              </div>
            </div>

            {/* Step 4: Present BS Mutation */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950">বর্তমান বিএস মিউটেশন খতিয়ান (City/BS Survey 2022)</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800">খতিয়ান নং: {parcel.khatianNo}</span>
                </div>
                <p className="text-xs text-emerald-900 mt-1">
                  বর্তমান রেকর্ডীয় একক স্বত্বাধিকারী: {parcel.currentOwners[0]?.nameBn} (দলিল নং: DALIL-2022-7841)।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. BANK CHARGES & MORTGAGE (CIB) */}
      {activeSubTab === 'MORTGAGE' && (
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'বাংলাদেশ ব্যাংক সিআইবি ও বন্ধকী দায় তথ্য' : 'Bangladesh Bank CIB Land Charge Registry'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'দেশের সকল তফসিলি ব্যাংকের বন্ধক ডাটাবেজের সাথে সরাসরি সমন্বয়' : 'Real-time integration with national banking land mortgage database'}
              </p>
            </div>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
              parcel.status === 'MORTGAGED' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {parcel.status === 'MORTGAGED' ? 'সক্রিয় বন্ধকী দায় বিদ্যমান' : 'দায়মুক্ত (Unencumbered)'}
            </span>
          </div>

          {encumbrances.filter(e => e.landId === parcel.landId).length === 0 ? (
            <div className="p-8 text-center bg-emerald-50/50 rounded-2xl border border-emerald-200">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800">কোনো ব্যাংক ঋণ বা বন্ধক পাওয়া যায়নি</h4>
              <p className="text-xs text-slate-500 mt-1">
                বাংলাদেশ ব্যাংক সিআইবি ও ভূমি দায়বদ্ধতা পোর্টাল অনুযায়ী এই জমিটি সম্পূর্ণ নিষ্কণ্টক।
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {encumbrances.filter(e => e.landId === parcel.landId).map(enc => (
                <div key={enc.id} className="p-4 rounded-2xl border border-red-200 bg-red-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-900">{enc.bankName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-200 text-red-800 font-bold">
                      {enc.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                    <div>
                      <span className="text-[10px] text-slate-500 block">শাখা</span>
                      <span className="font-bold">{enc.bankBranch}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">বন্ধককৃত ঋণের পরিমাণ</span>
                      <span className="font-bold text-red-700 font-mono">৳ {(enc.mortgageAmountBDT / 10000000).toFixed(2)} কোটি</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-red-800 font-medium pt-1 border-t border-red-200">
                    ⚠️ ব্যাংকের দায়মুক্তি দলিল (Redemption Deed) ও অনাপত্তিপত্র (NOC) ব্যতীত সাব-রেজিস্ট্রার কর্তৃক হস্তান্তর আইনত স্থগিত।
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. CAVEATS & DISPUTES */}
      {activeSubTab === 'CAVEATS' && (
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'সংবিধিবদ্ধ কেভিয়েট ও দেওয়ানি মোকদ্দমা স্ট্যাটাস' : 'Statutory Caveats & Judicial Litigation'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'আদালতের নিষেধাজ্ঞা ও মালিকের প্রতিরোধমূলক সতর্কবার্তা' : 'Injunctions, Title Suits & Citizen Protective Caveats'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Caveat Card */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-700" />
                  {language === 'bn' ? 'ডিজিটাল সংবিধিবদ্ধ কেভিয়েট' : 'Statutory Caveat'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  {caveats.some(c => c.landId === parcel.landId && c.status === 'ACTIVE') ? 'সক্রিয় (ACTIVE)' : 'কোনো কেভিয়েট নেই'}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {caveats.find(c => c.landId === parcel.landId)?.reasonBn || 'জমিটির উপর কোনো স্বত্ব সুরক্ষামূলক স্থগিতাদেশ নেই।'}
              </p>
            </div>

            {/* Dispute Card */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-blue-700" />
                  {language === 'bn' ? 'আদালতি মোকদ্দমা ও ইনজাংশন' : 'Court Cases & Injunctions'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  {disputes.some(d => d.landId === parcel.landId) ? 'মামলা চলমান' : 'মামলামুক্ত'}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {disputes.find(d => d.landId === parcel.landId)?.legalSummaryBn || 'কোনো দেওয়ানি স্বত্ব বা বাটোয়ারা মোকদ্দমা চলমান নেই।'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAX STATUS */}
      {activeSubTab === 'TAX' && (
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'ভূমি উন্নয়ন কর (LD Tax) ও ই-দাখিলা' : 'Land Development Tax & e-Dakhila'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'হোল্ডিং ভিত্তিক বার্ষিক খাজনা ও পরিশোধের ডিজিটাল রশিদ' : 'Holding-level annual rent demand and digital receipt'}
              </p>
            </div>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
              tax?.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
            }`}>
              {tax?.status === 'PAID' ? 'কর পরিশোধিত (PAID)' : 'বকেয়া বিদ্যমান (OVERDUE)'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block">অর্থবছর</span>
              <span className="font-bold text-slate-800">{tax?.fiscalYear || '২০২৬-২০২৭'}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">বকেয়া কর (Arrears)</span>
              <span className="font-bold text-slate-800">৳ {tax?.arrearsBDT || 0}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">হাল দাবি (Current Demand)</span>
              <span className="font-bold text-slate-800">৳ {tax?.currentDemandBDT || 900}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">মোট প্রদেয় কর</span>
              <span className="font-bold text-emerald-900 text-sm font-mono">৳ {tax?.totalDueBDT || 900}</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. 100-POINT RISK ENGINE BREAKDOWN */}
      {activeSubTab === 'RISK_MATRIX' && (
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                {language === 'bn' ? '১০০-পয়েন্ট ঝুঁকি বিশ্লেষণ ও ফ্রড ডিটেকশন ফলাফল' : '100-Point Composite Fraud & Risk Evaluation'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'কৃত্রিম বুদ্ধিমত্তা ও নিয়মভিত্তিক বহুস্তরীয় স্বত্ব ঝুঁকি নিরীক্ষণ' : 'Rule-based and AI heuristic validation across all registry parameters'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-slate-900">{riskReport.score}/100</span>
              <span className="block text-[10px] font-bold text-slate-500">{riskReport.gradeBn}</span>
            </div>
          </div>

          <div className="space-y-3">
            {riskReport.factors.map((factor, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                  factor.severity === 'CRITICAL' ? 'bg-red-50/70 border-red-200 text-red-900' :
                  factor.severity === 'HIGH' ? 'bg-amber-50/70 border-amber-200 text-amber-900' :
                  'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{language === 'bn' ? factor.titleBn : factor.titleEn}</span>
                  <span className="font-mono px-2 py-0.5 rounded bg-white text-slate-900 border text-[10px]">
                    +{factor.points} Points
                  </span>
                </div>
                <p className="text-[11px] opacity-90">
                  {language === 'bn' ? factor.descriptionBn : factor.descriptionEn}
                </p>
                <div className="pt-1 border-t border-slate-200/60 font-semibold text-[10px]">
                  💡 প্রতিকার: {language === 'bn' ? factor.remedyBn : factor.remedyEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
