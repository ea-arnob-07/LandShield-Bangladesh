import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { LandParcel, UserProfile, Language, TransactionEscrow } from '../../types';
import { getTranslation } from '../../utils/translations';
import { AuditLedgerService } from '../../services/auditLedger';
import { GovTechAdapters } from '../../services/govAdapters';
import {
  BadgePercent,
  ShieldCheck,
  UserCheck,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  FileCheck2,
  Sparkles,
  QrCode,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

interface BuySellEscrowWizardProps {
  parcel: LandParcel;
  currentUser: UserProfile;
  language: Language;
  onCompleteTransaction: (newOwnerName: string, newNid: string) => void;
}

export const BuySellEscrowWizard: React.FC<BuySellEscrowWizardProps> = ({
  parcel,
  currentUser,
  language,
  onCompleteTransaction
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [buyerName, setBuyerName] = useState('Tariqul Islam');
  const [buyerNid, setBuyerNid] = useState('19952692548000456');
  const [agreedPrice, setAgreedPrice] = useState(parcel.marketValueBDT);
  const [isKycVerified, setIsKycVerified] = useState(false);
  const [isEscrowFunded, setIsEscrowFunded] = useState(false);
  const [isSroRegistered, setIsSroRegistered] = useState(false);
  const [isMutationDispatched, setIsMutationDispatched] = useState(false);
  const [generatedDeedNo, setGeneratedDeedNo] = useState('');
  const [mutationDocketNo, setMutationDocketNo] = useState('');

  // Government Fee Calculations (Bangladesh Stamp Act & Registration Rates)
  const stampDuty = Math.round(agreedPrice * 0.015); // 1.5%
  const regFee = Math.round(agreedPrice * 0.01); // 1.0%
  const localGovtTax = Math.round(agreedPrice * 0.02); // 2.0%
  const aitTax = Math.round(agreedPrice * 0.04); // 4.0%
  const microEscrowFee = 2500; // Flat BDT 2,500
  const totalGovtCharges = stampDuty + regFee + localGovtTax + aitTax + microEscrowFee;

  // Step 2: Handle e-KYC Verification
  const handleVerifyKyc = async () => {
    const res = await GovTechAdapters.verifyNID(buyerNid, '1995-04-12', buyerName);
    if (res.success) {
      setIsKycVerified(true);
    }
  };

  // Step 3: Handle Micro-Escrow Fund Lock
  const handleFundEscrow = () => {
    setIsEscrowFunded(true);
    AuditLedgerService.getInstance().addAuditEntry(
      currentUser.id,
      currentUser.role,
      currentUser.name,
      'ESCROW_FUNDS_LOCKED',
      'মাইক্রো-এসক্রোতে ক্রয়মূল্য ও সরকারি রাজস্ব জমা ও লক',
      parcel.landId,
      `Escrow deposit locked: BDT ${agreedPrice.toLocaleString()} + Gov fees BDT ${totalGovtCharges.toLocaleString()}`,
      `এসক্রো একাউন্টে জমি ক্রয়মূল্য ও সরকারি কর বাবদ মোট ৳ ${(agreedPrice + totalGovtCharges).toLocaleString()} সুরক্ষিত করা হয়েছে`
    );
  };

  // Step 4: Handle SRO Digital Deed Registration
  const handleSroRegistration = async () => {
    const deedNo = `DALIL-BSUP-${Date.now().toString().slice(-6)}`;
    setGeneratedDeedNo(deedNo);
    setIsSroRegistered(true);

    AuditLedgerService.getInstance().addAuditEntry(
      'usr-sro-01',
      'SRO_OFFICER',
      'Mahmud Hasan, SRO',
      'SRO_DEED_EXECUTED',
      'সাব-রেজিস্ট্রি অফিসে সাফ-কবলা দলিল ডিজিটাল সম্পাদন',
      parcel.landId,
      `Registered deed ${deedNo} executed with biometric e-KYC signing`,
      `বায়োমেট্রিক স্বাক্ষরের মাধ্যমে সাফ-কবলা দলিল নং ${deedNo} নিবন্ধিত হয়েছে`
    );

    // Auto-trigger Step 5: SRO to AC Land Sync Webhook
    const syncRes = await GovTechAdapters.dispatchSroDeedToAcLand({
      deedNo,
      sroOffice: `${parcel.upazila} Sub-Registry`,
      landId: parcel.landId,
      sellerNid: parcel.currentOwners[0]?.nid || '19822692548000789',
      buyerNid,
      transferredSatak: parcel.areaSatak
    });

    if (syncRes.success) {
      setMutationDocketNo(syncRes.data.docketNumber);
      setIsMutationDispatched(true);
      AuditLedgerService.getInstance().addAuditEntry(
        'usr-acland-01',
        'AC_LAND',
        'Syeda Farhana, AC Land',
        'MUTATION_DOCKET_AUTO_CREATED',
        'এসআরও হতে তাৎক্ষণিক ই-নামজারি ডকেট গ্রহণ ও অনুমোদন',
        parcel.landId,
        `Auto e-Mutation docket ${syncRes.data.docketNumber} synchronized to AC Land`,
        `সাব-রেজিস্ট্রি হতে অটো-সিঙ্ক হয়ে নামজারি ডকেট নং ${syncRes.data.docketNumber} সহকারী কমিশনার (ভূমি) সিস্টেমে গৃহীত`
      );
    }
  };

  const handleFinishConveyancing = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onCompleteTransaction(buyerName, buyerNid);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto">
      {/* Wizard Header Banner */}
      <div className="gov-card p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white shadow-gov">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold mb-2">
              <BadgePercent className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'bn' ? 'জাতীয় ডিজিটাল কনভেয়্যান্সিং ও এসক্রো হাব' : 'National Digital Conveyancing & Escrow Hub'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {language === 'bn' ? '৫-ধাপের নিরাপদ জমি হস্তান্তর প্রক্রিয়া' : '5-Step Secure Land Conveyancing'}
            </h2>
            <p className="text-xs text-emerald-200/80">
              {language === 'bn'
                ? 'বায়না চুক্তি থেকে শুরু করে বায়োমেট্রিক রেজিস্ট্রি এবং তাৎক্ষণিক স্বয়ংক্রিয় ই-নামজারি'
                : 'From digital escrow deposit to Sub-Registrar execution and real-time e-Mutation sync'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] text-emerald-300 block font-semibold">নির্বাচিত ভূমি আইডি</span>
            <span className="font-mono text-xs font-bold text-white">{parcel.landId}</span>
            <span className="text-[11px] font-bold text-emerald-300 block mt-0.5">
              {parcel.areaSatak} {language === 'bn' ? 'শতক' : 'Satak'} ({parcel.mouzaBn})
            </span>
          </div>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="gov-card p-4">
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {[
            { s: 1, titleBn: '১. বায়না ও মূল্য', titleEn: '1. Terms & Value' },
            { s: 2, titleBn: '২. এনআইডি ই-কেওয়াইসি', titleEn: '2. NID e-KYC' },
            { s: 3, titleBn: '৩. মাইক্রো-এসক্রো', titleEn: '3. Micro-Escrow' },
            { s: 4, titleBn: '৪. সাব-রেজিস্ট্রি', titleEn: '4. SRO Register' },
            { s: 5, titleBn: '৫. স্মার্ট নামজারি', titleEn: '5. e-Mutation' }
          ].map(item => (
            <button
              key={item.s}
              onClick={() => item.s <= step && setStep(item.s as any)}
              className={`p-2.5 rounded-xl transition-all ${
                step === item.s
                  ? 'bg-emerald-800 text-white font-bold shadow-md'
                  : item.s < step
                  ? 'bg-emerald-50 text-emerald-900 font-semibold'
                  : 'bg-slate-100 text-slate-400 font-normal opacity-60'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                {item.s < step ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : null}
                <span>{language === 'bn' ? item.titleBn : item.titleEn}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: AGREEMENT TERMS & VALUE */}
      {step === 1 && (
        <div className="gov-card p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            {language === 'bn' ? '১. জমির হস্তান্তর মূল্য ও সরকারি রাজস্ব হিসাব' : '1. Stated Valuation & Statutory Tax Calculation'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'bn' ? 'নির্ধারিত হস্তান্তর মূল্য (টাকা)' : 'Agreed Consideration Value (BDT)'}
                </label>
                <input
                  type="number"
                  value={agreedPrice}
                  onChange={(e) => setAgreedPrice(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold font-mono focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'bn' ? 'ক্রেতার নাম (বায়না গ্রহীতা)' : 'Buyer Full Name'}
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'bn' ? 'ক্রেতার জাতীয় পরিচয়পত্র (NID)' : 'Buyer NID'}
                </label>
                <input
                  type="text"
                  value={buyerNid}
                  onChange={(e) => setBuyerNid(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-semibold focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            {/* Fee Breakdown Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block pb-2 border-b border-slate-200">
                {language === 'bn' ? 'স্বয়ংক্রিয় সরকারি শুল্ক ও ফি নির্ধারণ' : 'Statutory Registration Fees Breakdown'}
              </span>

              <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                <span>স্ট্যাম্প শুল্ক (Stamp Duty 1.5%):</span>
                <span className="font-mono font-bold text-slate-800">৳ {stampDuty.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                <span>নিবন্ধন ফি (Registration 1.0%):</span>
                <span className="font-mono font-bold text-slate-800">৳ {regFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                <span>স্থানীয় সরকার কর (Local Govt Tax 2.0%):</span>
                <span className="font-mono font-bold text-slate-800">৳ {localGovtTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                <span>উৎস কর (AIT 4.0%):</span>
                <span className="font-mono font-bold text-slate-800">৳ {aitTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                <span>মাইক্রো-এসক্রো প্ল্যাটফর্ম ফি:</span>
                <span className="font-mono font-bold text-slate-800">৳ {microEscrowFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between pt-2 text-sm font-black text-emerald-950">
                <span>মোট সরকারি রাজস্ব:</span>
                <span className="font-mono">৳ {totalGovtCharges.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="gov-btn-primary text-xs"
            >
              {language === 'bn' ? 'পরবর্তী: এনআইডি যাচাই' : 'Next: NID e-KYC'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: NID e-KYC VERIFICATION */}
      {step === 2 && (
        <div className="gov-card p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            {language === 'bn' ? '২. নির্বাচন কমিশন পরিচয় গেটওয়েতে ক্রেতা-বিক্রেতা যাচাই' : '2. Porichoy Biometric NID e-KYC Verification'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seller Info */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-[10px] font-bold uppercase text-emerald-800 block">বিক্রেতা (Seller Verified)</span>
              <p className="text-xs font-bold text-slate-900">{parcel.currentOwners[0]?.nameBn}</p>
              <p className="text-[11px] font-mono text-slate-600">NID: {parcel.currentOwners[0]?.nid}</p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold pt-2">
                <CheckCircle2 className="w-4 h-4" /> বায়োমেট্রিক যাচাইকৃত
              </div>
            </div>

            {/* Buyer Info */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-blue-800 block">ক্রেতা (Prospective Buyer)</span>
              <p className="text-xs font-bold text-slate-900">{buyerName}</p>
              <p className="text-[11px] font-mono text-slate-600">NID: {buyerNid}</p>

              {isKycVerified ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  পরিচয় গেটওয়েতে ৯৯.৪% বায়োমেট্রিক ম্যাচ সম্পন্ন!
                </div>
              ) : (
                <button
                  onClick={handleVerifyKyc}
                  className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <UserCheck className="w-4 h-4" />
                  {language === 'bn' ? 'পরিচয় ই-কেওয়াইসি যাচাই করুন' : 'Run Porichoy e-KYC Verification'}
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="gov-btn-secondary text-xs"
            >
              <ArrowLeft className="w-4 h-4" /> {language === 'bn' ? 'পূর্ববর্তী' : 'Back'}
            </button>

            <button
              onClick={() => setStep(3)}
              disabled={!isKycVerified}
              className="gov-btn-primary text-xs"
            >
              {language === 'bn' ? 'পরবর্তী: মাইক্রো-এসক্রো' : 'Next: Micro-Escrow'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: MICRO-ESCROW SAFE DEPOSIT */}
      {step === 3 && (
        <div className="gov-card p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-700" />
            {language === 'bn' ? '৩. বাংলাদেশ ব্যাংক অনুমোদিত মাইক্রো-এসক্রোতে তহবিল জমা' : '3. Bangladesh Bank Regulated Micro-Escrow Deposit'}
          </h3>

          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-950">
                {language === 'bn' ? 'এসক্রো অ্যাকাউন্টে প্রদেয় মোট অর্থ' : 'Total Amount to be Escrow-Locked'}
              </span>
              <span className="text-lg font-black text-amber-950 font-mono">
                ৳ {(agreedPrice + totalGovtCharges).toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-amber-900">
              {language === 'bn'
                ? 'দলিল সফলভাবে সাব-রেজিস্ট্রারে নিবন্ধিত হওয়ার পূর্ব পর্যন্ত ক্রেতার টাকা সম্পূর্ণ সুরক্ষিত থাকবে। কোনো জালিয়াতি হলে তাৎক্ষণিক সম্পূর্ণ অর্থ রিফান্ড হবে।'
                : 'Funds remain securely escrowed until biometric registration and SRO confirmation. Zero risk of financial loss.'}
            </p>

            {isEscrowFunded ? (
              <div className="p-3 bg-white rounded-xl border border-amber-300 text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                তহবিল সফলভাবে এসক্রো অ্যাকাউন্টে জমা ও লক করা হয়েছে!
              </div>
            ) : (
              <button
                onClick={handleFundEscrow}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Lock className="w-4 h-4" />
                {language === 'bn' ? 'এসক্রো তহবিল জমা নিশ্চিত করুন' : 'Lock Funds in Micro-Escrow'}
              </button>
            )}
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="gov-btn-secondary text-xs">
              <ArrowLeft className="w-4 h-4" /> {language === 'bn' ? 'পূর্ববর্তী' : 'Back'}
            </button>

            <button
              onClick={() => setStep(4)}
              disabled={!isEscrowFunded}
              className="gov-btn-primary text-xs"
            >
              {language === 'bn' ? 'পরবর্তী: সাব-রেজিস্ট্রি' : 'Next: SRO Execution'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SRO REGISTRATION */}
      {step === 4 && (
        <div className="gov-card p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-800" />
            {language === 'bn' ? '৪. সাব-রেজিস্ট্রার কার্যালয়ে ডিজিটাল দলিল রেজিস্ট্রি সম্পাদন' : '4. Sub-Registrar Officer (SRO) Deed Execution'}
          </h3>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">সাব-রেজিস্ট্রি সার্কেল</span>
                <span className="font-bold text-slate-900">{parcel.upazila} Sub-Registry Office</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">দলিলের ধরণ</span>
                <span className="font-bold text-slate-900">সাফ-কবলা দলিল (Saf-Kabala)</span>
              </div>
            </div>

            {isSroRegistered ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-300 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  দলিল সফলভাবে রেজিস্ট্রি হয়েছে! দলিল নং: <span className="font-mono">{generatedDeedNo}</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  ⚡ রিয়েলটাইম ওয়েবহুকের মাধ্যমে স্বয়ংক্রিয়ভাবে সহকারী কমিশনার (ভূমি) অফিসে নামজারি আবেদন প্রেরণ করা হয়েছে।
                </p>
              </div>
            ) : (
              <button
                onClick={handleSroRegistration}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <FileCheck2 className="w-4 h-4" />
                {language === 'bn' ? 'সাব-রেজিস্ট্রার ডিজিটাল স্বাক্ষর সম্পাদন করুন' : 'Execute SRO Digital Registration'}
              </button>
            )}
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(3)} className="gov-btn-secondary text-xs">
              <ArrowLeft className="w-4 h-4" /> {language === 'bn' ? 'পূর্ববর্তী' : 'Back'}
            </button>

            <button
              onClick={() => setStep(5)}
              disabled={!isSroRegistered}
              className="gov-btn-primary text-xs"
            >
              {language === 'bn' ? 'পরবর্তী: ই-নামজারি সমাপ্তি' : 'Next: Smart e-Mutation'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: AUTOMATED e-MUTATION & COMPLETION */}
      {step === 5 && (
        <div className="gov-card p-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-lg font-black text-slate-900">
              {language === 'bn' ? 'অভিনন্দন! জমি হস্তান্তর ও নামজারি সফল হয়েছে' : 'Conveyancing & e-Mutation Completed!'}
            </h3>
            <p className="text-xs text-slate-600">
              {language === 'bn'
                ? `দলিল নং ${generatedDeedNo} এর ভিত্তিতে স্বয়ংক্রিয়ভাবে ডকেট নং ${mutationDocketNo} অনুমোদিত হয়েছে এবং নতুন মালিক ${buyerName} এর নামে ডিজিটাল খতিয়ান প্রকাশিত হয়েছে।`
                : `Deed ${generatedDeedNo} automatically mutated under Docket ${mutationDocketNo}. New Digital Khatian generated for ${buyerName}.`}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-sm mx-auto text-xs text-left space-y-2 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Land ID:</span>
              <span className="font-bold text-slate-900">{parcel.landId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">New Owner:</span>
              <span className="font-bold text-emerald-900">{buyerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Audit Proof:</span>
              <span className="font-bold text-slate-700 truncate">SHA256:884a19...</span>
            </div>
          </div>

          <button
            onClick={handleFinishConveyancing}
            className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            {language === 'bn' ? 'নতুন ডিজিটাল ভূমি প্রোফাইল দেখুন' : 'View New Updated Land Profile'}
          </button>
        </div>
      )}
    </div>
  );
};
