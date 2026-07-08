import React, { useState } from 'react';
import { CaveatRecord, DisputeRecord, LandParcel, Language, UserProfile } from '../../types';
import { getTranslation } from '../../utils/translations';
import { AuditLedgerService } from '../../services/auditLedger';
import {
  Scale,
  Lock,
  Plus,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Calendar,
  CheckCircle2,
  AlertOctagon
} from 'lucide-react';

interface DisputeAndCaveatManagerProps {
  parcels: LandParcel[];
  selectedParcel: LandParcel;
  caveats: CaveatRecord[];
  disputes: DisputeRecord[];
  currentUser: UserProfile;
  language: Language;
  onLodgeCaveat: (caveat: CaveatRecord) => void;
}

export const DisputeAndCaveatManager: React.FC<DisputeAndCaveatManagerProps> = ({
  parcels,
  selectedParcel,
  caveats,
  disputes,
  currentUser,
  language,
  onLodgeCaveat
}) => {
  const [caveatReason, setCaveatReason] = useState('');
  const [caveatType, setCaveatType] = useState<CaveatRecord['caveatType']>('STATUTORY_CITIZEN');
  const [isLodgeSuccess, setIsLodgeSuccess] = useState(false);

  const handleLodge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caveatReason) return;

    const newCaveat: CaveatRecord = {
      id: `CAV-${Date.now().toString().slice(-6)}`,
      landId: selectedParcel.landId,
      caveatorName: currentUser.name,
      caveatorNid: currentUser.nid,
      caveatType,
      reason: caveatReason,
      reasonBn: caveatReason,
      filedDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
      status: 'ACTIVE',
      blockedActions: ['BLOCK_DEED_REGISTRATION', 'BLOCK_MUTATION_APPLICATION', 'BLOCK_SURVEY_DEMARCATION']
    };

    onLodgeCaveat(newCaveat);
    setIsLodgeSuccess(true);
    setCaveatReason('');

    AuditLedgerService.getInstance().addAuditEntry(
      currentUser.id,
      currentUser.role,
      currentUser.name,
      'STATUTORY_CAVEAT_LODGED',
      'মালিক কর্তৃক সংবিধিবদ্ধ ডিজিটাল কেভিয়েট জারি',
      selectedParcel.landId,
      `Statutory caveat ${newCaveat.id} lodged blocking transactions for 1 year`,
      `ভূমি আইডি ${selectedParcel.landId} এ ১ বছরের জন্য কেভিয়েট নং ${newCaveat.id} জারি করে রেজিস্ট্রি ও নামজারি লক করা হয়েছে।`
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="gov-card p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white shadow-gov">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold mb-2">
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'bn' ? 'সংবিধিবদ্ধ কেভিয়েট ও বিচারিক মামলা ট্র্যাকার' : 'Statutory Caveats & Judicial Litigation Hub'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {language === 'bn' ? 'স্বত্ব সুরক্ষা, কেভিয়েট লক ও আদালতের নিষেধাজ্ঞা' : 'Title Protection, Caveats & Injunctions'}
            </h2>
            <p className="text-xs text-emerald-200/80">
              {language === 'bn'
                ? 'মালিক কর্তৃক আগাম প্রতিরোধমূলক কেভিয়েট জারি এবং দেওয়ানি স্বত্ব মোকদ্দমার রিয়েলটাইম নজরদারি'
                : 'Lodge proactive statutory caveats and monitor Civil Title Suits & Section 144/145 CrPC orders'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] text-emerald-300 block font-semibold">সক্রিয় কেভিয়েট ও মামলা</span>
            <span className="font-mono text-sm font-bold text-white">
              {caveats.length} Caveats | {disputes.length} Lawsuits
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Lodge New Statutory Caveat */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-800" />
              {language === 'bn' ? 'নতুন সংবিধিবদ্ধ কেভিয়েট (Caveat) দায়ের' : 'Lodge New Statutory Caveat'}
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">
              {selectedParcel.landId}
            </span>
          </div>

          {isLodgeSuccess && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-xs font-bold text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              কেভিয়েট সফলভাবে সংরক্ষিত ও সিস্টেম লক সক্রিয় হয়েছে!
            </div>
          )}

          <form onSubmit={handleLodge} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">কেভিয়েটের ধরণ</label>
              <select
                value={caveatType}
                onChange={(e) => setCaveatType(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
              >
                <option value="STATUTORY_CITIZEN">নাগরিক স্বত্ব সুরক্ষামূলক কেভিয়েট (Citizen Caveat)</option>
                <option value="COURT_INJUNCTION">দেওয়ানি আদালতের স্থগিতাদেশ (Court Restraint)</option>
                <option value="GOVT_RESTRAINT">সরকারি প্রশাসন নোটিশ (Govt Notice)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">কেভিয়েট দায়েরের সুনির্দিষ্ট আইনি কারণ</label>
              <textarea
                value={caveatReason}
                onChange={(e) => setCaveatReason(e.target.value)}
                placeholder="উদাহরণ: বিদেশে অবস্থানকালে জাল আমমোক্তারনামা ঠেকানোর জন্য অথবা সহ-শরিকের অসম্মতিতে বিক্রির আশঙ্কায়..."
                rows={3}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-normal focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Lock className="w-4 h-4" />
              {language === 'bn' ? 'ডিজিটাল কেভিয়েট কার্যকর করুন' : 'Lock Parcel with Caveat'}
            </button>
          </form>
        </div>

        {/* Right: Active Disputes & Injunctions */}
        <div className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-800" />
              {language === 'bn' ? 'আদালতি মোকদ্দমা ও নিষেধাজ্ঞা তালিকা' : 'Active Judicial Lawsuits & Injunctions'}
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold">
              Judiciary E-Court
            </span>
          </div>

          <div className="space-y-3">
            {disputes.map(disp => (
              <div key={disp.caseId} className="p-4 rounded-2xl border border-red-200 bg-red-50/50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-950 font-mono">{disp.caseId}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-200 text-red-800">
                    {disp.status}
                  </span>
                </div>
                <p className="font-bold text-slate-800">{disp.courtNameBn}</p>
                <p className="text-slate-600 text-[11px]">{disp.legalSummaryBn}</p>
                <div className="flex items-center justify-between pt-2 border-t border-red-100 text-[10px] text-slate-500 font-mono">
                  <span>দায়ের তারিখ: {disp.filingDate}</span>
                  <span className="text-red-700 font-bold">পরবর্তী শুনানি: {disp.nextHearingDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
