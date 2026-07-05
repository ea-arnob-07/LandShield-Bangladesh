import React, { useState } from 'react';
import { MutationRecord, Language, UserProfile, LandParcel } from '../../types';
import { getTranslation } from '../../utils/translations';
import { AuditLedgerService } from '../../services/auditLedger';
import {
  GitPullRequest,
  CheckCircle2,
  XCircle,
  Clock,
  FileCheck2,
  Building,
  UserCheck,
  ShieldCheck,
  QrCode,
  FileText,
  AlertCircle
} from 'lucide-react';

interface SmartMutationDashboardProps {
  mutations: MutationRecord[];
  parcels: LandParcel[];
  currentUser: UserProfile;
  language: Language;
  onApproveMutation: (caseNo: string) => void;
}

export const SmartMutationDashboard: React.FC<SmartMutationDashboardProps> = ({
  mutations,
  parcels,
  currentUser,
  language,
  onApproveMutation
}) => {
  const [selectedMutation, setSelectedMutation] = useState<MutationRecord>(mutations[0] || null);

  const handleApprove = (caseNo: string) => {
    onApproveMutation(caseNo);
    AuditLedgerService.getInstance().addAuditEntry(
      currentUser.id,
      currentUser.role,
      currentUser.name,
      'MUTATION_APPROVED_BY_AC_LAND',
      'সহকারী কমিশনার (ভূমি) কর্তৃক ই-নামজারি ডকেট চূড়ান্ত অনুমোদন',
      selectedMutation.landId,
      `e-Mutation ${caseNo} approved. New Khatian generated with QR stamp.`,
      `ই-নামজারি কেস নং ${caseNo} অনুমোদিত হয়েছে এবং নতুন ডিজিটাল খতিয়ান প্রকাশিত হয়েছে।`
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="gov-card p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white shadow-gov">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold mb-2">
              <GitPullRequest className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'bn' ? 'স্বয়ংক্রিয় ই-নামজারি ও এসআরও সিঙ্ক হাব' : 'Smart e-Mutation & SRO Synchronizer'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {language === 'bn' ? 'সহকারী কমিশনার (ভূমি) ই-নামজারি ড্যাশবোর্ড' : 'AC Land & SRO e-Mutation Pipeline'}
            </h2>
            <p className="text-xs text-emerald-200/80">
              {language === 'bn'
                ? 'সাব-রেজিস্ট্রি থেকে আগত স্বয়ংক্রিয় ডকেট পর্যালোচনা, কানুনগো প্রতিবেদন যাচাই ও তাৎক্ষণিক খতিয়ান সৃজন'
                : 'Review automated mutation dockets from SRO, inspect Kanungo field findings, and publish digital khatians'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] text-emerald-300 block font-semibold">বিচারাধীন কেস</span>
            <span className="font-mono text-base font-black text-white">{mutations.length} Cases Active</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Docket List & Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Mutation Case List */}
        <div className="lg:col-span-1 gov-card p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
            {language === 'bn' ? 'নামজারি আবেদনসমূহ' : 'Mutation Dockets'}
          </h3>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {mutations.map(m => {
              const isSelected = selectedMutation?.caseNo === m.caseNo;
              return (
                <button
                  key={m.caseNo}
                  onClick={() => setSelectedMutation(m)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-300 shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold font-mono text-emerald-950">{m.caseNo}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      m.status === 'AC_LAND_APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                      m.status === 'KANUNGO_REVIEW' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {language === 'bn' ? m.applicantNameBn : m.applicantName}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    Land ID: {m.landId}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Docket Inspector */}
        {selectedMutation && (
          <div className="lg:col-span-2 gov-card p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  ই-নামজারি কেস বিবরণী
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-mono">
                  {selectedMutation.caseNo}
                </h3>
                <p className="text-xs text-slate-500">
                  ভূমি আইডি: <span className="font-mono font-bold text-slate-800">{selectedMutation.landId}</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-semibold">আবেদনের তারিখ</span>
                <span className="text-xs font-bold text-slate-800">{selectedMutation.applicationDate}</span>
              </div>
            </div>

            {/* Applicant Details */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">আবেদনকারীর নাম</span>
                <span className="font-bold text-slate-900">{selectedMutation.applicantNameBn}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">জাতীয় পরিচয়পত্র (NID)</span>
                <span className="font-mono font-bold text-slate-900">{selectedMutation.applicantNid}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">পূর্ববর্তী খতিয়ান নং</span>
                <span className="font-mono font-bold text-slate-900">{selectedMutation.previousKhatian}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">সৃজিতব্য নতুন খতিয়ান নং</span>
                <span className="font-mono font-bold text-emerald-800">
                  {selectedMutation.newKhatian === 'PENDING_APPROVAL' ? 'অনুমোদন সাপেক্ষে সৃজন' : selectedMutation.newKhatian}
                </span>
              </div>
            </div>

            {/* Officer Inspection Pipeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                কর্মকর্তা পরিদর্শন ও প্রতিবেদন পর্যালোচনা
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 block">১. ইউনিয়ন ভূমি উপ-সহকারী কর্মকর্তা (ULAO) প্রতিবেদন:</span>
                  <p className="text-slate-600 mt-0.5">{selectedMutation.ulaoNotes || 'সরজমিনে সীমানা ও দখল যাচাইকরণ সম্পন্ন।'}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 block">২. রাজস্ব কানুনগো (Kanungo) যাচাই নোট:</span>
                  <p className="text-slate-600 mt-0.5">{selectedMutation.kanungoNotes || 'সিএস, এসএ, আরএস ও বিএস রেকর্ড ধারাবাহিকতা সঠিক।'}</p>
                </div>
              </div>
            </div>

            {/* Approval Action */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span className="text-xs font-bold text-slate-700">সহকারী কমিশনার (ভূমি) ডিজিটাল স্বাক্ষর প্রযোজ্য</span>
              </div>

              {selectedMutation.status === 'AC_LAND_APPROVED' ? (
                <div className="px-4 py-2 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ই-নামজারি অনুমোদিত ও খতিয়ান জারিকৃত ({selectedMutation.approvedAt || 'Active'})
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(selectedMutation.caseNo)}
                    className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {language === 'bn' ? 'ই-নামজারি অনুমোদন করুন' : 'Approve & Issue Khatian'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
