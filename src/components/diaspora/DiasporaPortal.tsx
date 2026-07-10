import React, { useState } from 'react';
import { Language, UserProfile, LandParcel } from '../../types';
import { AuditLedgerService } from '../../services/auditLedger';
import {
  Plane,
  Building,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Lock,
  Globe,
  QrCode
} from 'lucide-react';

interface DiasporaPortalProps {
  currentUser: UserProfile;
  selectedParcel: LandParcel;
  language: Language;
}

export const DiasporaPortal: React.FC<DiasporaPortalProps> = ({
  currentUser,
  selectedParcel,
  language
}) => {
  const [embassy, setEmbassy] = useState('Bangladesh High Commission, London (UK)');
  const [attorneyName, setAttorneyName] = useState('Advocate Aminul Haque');
  const [attorneyNid, setAttorneyNid] = useState('19782692548000321');
  const [isAttested, setIsAttested] = useState(false);
  const [poaReference, setPoaReference] = useState('');

  const handleAttestPoa = (e: React.FormEvent) => {
    e.preventDefault();
    const poaNo = `POA-EMB-LON-${Date.now().toString().slice(-6)}`;
    setPoaReference(poaNo);
    setIsAttested(true);

    AuditLedgerService.getInstance().addAuditEntry(
      currentUser.id,
      currentUser.role,
      currentUser.name,
      'CONSULAR_POA_ATTESTED',
      'বাংলাদেশ দূতাবাস কর্তৃক প্রবাসী ডিজিটাল আমমোক্তারনামা সত্যায়ন',
      selectedParcel.landId,
      `Consular Power of Attorney ${poaNo} attested by ${embassy} with biometric 2FA`,
      `লন্ডনস্থ বাংলাদেশ দূতাবাস কর্তৃক বায়োমেট্রিক ২এফএ যাচাইয়ের মাধ্যমে আমমোক্তারনামা নং ${poaNo} সত্যায়িত হয়েছে।`
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="gov-card p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 text-white shadow-gov">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-blue-500/40 text-blue-200 text-xs font-semibold mb-2">
              <Globe className="w-3.5 h-3.5 text-blue-300" />
              <span>{language === 'bn' ? 'প্রবাসী বাংলাদেশীদের জন্য ডিজিটাল কনস্যুলার কনভেয়্যান্সিং' : 'Diaspora Digital Conveyancing & Consular POA'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {language === 'bn' ? 'দূতাবাস ই-কেওয়াইসি ও আমমোক্তারনামা (Power of Attorney)' : 'Embassy e-KYC & Power of Attorney Attestation'}
            </h2>
            <p className="text-xs text-blue-200/80">
              {language === 'bn'
                ? 'যুক্তরাজ্য, যুক্তরাষ্ট্র, মধ্যপ্রাচ্যসহ বিশ্বজুড়ে অবস্থানরত প্রবাসী নাগরিকদের জন্য বায়োমেট্রিক স্বত্ব সুরক্ষা ও বৈধ প্রতিনিধি নিয়োগ'
                : 'Biometric multi-factor authentication and verified Power of Attorney attestation via Bangladesh Embassies'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] text-blue-300 block font-semibold">কনস্যুলার চ্যানেল</span>
            <span className="font-mono text-xs font-bold text-white">MINISTRY OF FOREIGN AFFAIRS</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Consular POA Application Form */}
        <div className="gov-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-800" />
            {language === 'bn' ? 'দূতাবাস ডিজিটাল আমমোক্তারনামা আবেদন' : 'Consular Digital POA Application'}
          </h3>

          <form onSubmit={handleAttestPoa} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">অবস্থানরত সংশ্লিষ্ট বাংলাদেশ দূতাবাস/মিশন</label>
              <select
                value={embassy}
                onChange={(e) => setEmbassy(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              >
                <option value="Bangladesh High Commission, London (UK)">Bangladesh High Commission, London (UK)</option>
                <option value="Embassy of Bangladesh, Washington DC (USA)">Embassy of Bangladesh, Washington DC (USA)</option>
                <option value="Consulate General of Bangladesh, Dubai (UAE)">Consulate General of Bangladesh, Dubai (UAE)</option>
                <option value="Embassy of Bangladesh, Riyadh (KSA)">Embassy of Bangladesh, Riyadh (KSA)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">বাংলাদেশে মনোনীত প্রতিনিধি / আইনজীবীর নাম</label>
              <input
                type="text"
                value={attorneyName}
                onChange={(e) => setAttorneyName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">মনোনীত প্রতিনিধির এনআইডি (NID)</label>
              <input
                type="text"
                value={attorneyNid}
                onChange={(e) => setAttorneyNid(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-semibold"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-800 hover:bg-blue-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              {language === 'bn' ? 'দূতাবাস বায়োমেট্রিক সত্যায়ন সম্পাদন' : 'Attest Consular Power of Attorney'}
            </button>
          </form>
        </div>

        {/* Right: Issued Consular POA Certificate Preview */}
        <div className="gov-card p-6 space-y-4 border-blue-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-700" />
              {language === 'bn' ? 'সত্যায়িত ডিজিটাল আমমোক্তারনামা সনদ' : 'Attested Consular POA Certificate'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold">
              POA ACT 2012
            </span>
          </div>

          {isAttested ? (
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                আমমোক্তারনামা সফলভাবে পররাষ্ট্র মন্ত্রণালয় ও সাব-রেজিস্ট্রিতে অনুমোদিত!
              </div>

              <div className="bg-white p-3 rounded-xl border border-emerald-100 text-xs space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">POA Ref:</span>
                  <span className="font-bold text-slate-900">{poaReference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mission:</span>
                  <span className="font-bold text-slate-700">{embassy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Attorney:</span>
                  <span className="font-bold text-emerald-800">{attorneyName}</span>
                </div>
              </div>

              <p className="text-[11px] text-emerald-900 font-semibold">
                ✓ বাংলাদেশের সংশ্লিষ্ট সাব-রেজিস্ট্রার এই আমমোক্তারনামার সরাসরি কিউআর কোড স্ক্যান করে দলিল রেজিস্ট্রি সম্পন্ন করতে পারবেন।
              </p>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
              <Globe className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500">
                আমমোক্তারনামা সত্যায়নের জন্য বামপাশের ফর্মটি পূরণ করে বায়োমেট্রিক স্বাক্ষর নিশ্চিত করুন।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
