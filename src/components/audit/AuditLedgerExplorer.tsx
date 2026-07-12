import React, { useState } from 'react';
import { AuditBlock, Language } from '../../types';
import { AuditLedgerService } from '../../services/auditLedger';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Link as LinkIcon,
  Fingerprint,
  FileCode2
} from 'lucide-react';

interface AuditLedgerExplorerProps {
  language: Language;
}

export const AuditLedgerExplorer: React.FC<AuditLedgerExplorerProps> = ({ language }) => {
  const auditService = AuditLedgerService.getInstance();
  const [chain, setChain] = useState<AuditBlock[]>(() => auditService.getChain());
  const [filterQuery, setFilterQuery] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);

  const handleVerifyLedger = () => {
    const result = auditService.verifyChainIntegrity();
    setVerificationResult(result);
    setChain(auditService.getChain());
  };

  const filteredChain = chain.filter(b =>
    b.targetLandId.toLowerCase().includes(filterQuery.toLowerCase()) ||
    b.action.toLowerCase().includes(filterQuery.toLowerCase()) ||
    b.userName.toLowerCase().includes(filterQuery.toLowerCase()) ||
    b.currentHash.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="gov-card p-6 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 text-white shadow-gov">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold mb-2">
              <Lock className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'bn' ? 'জাতীয় ক্রিপ্টোগ্রাফিক অপরিবর্তনীয় অডিট লেজার' : 'National Tamper-Evident SHA-256 Audit Core'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {language === 'bn' ? 'ক্রিপ্টোগ্রাফিক অডিট লেজার ও হ্যাশ প্রমাণ এক্সপ্লোরার' : 'Cryptographic Audit Explorer & Hash Ledger'}
            </h2>
            <p className="text-xs text-emerald-200/80">
              {language === 'bn'
                ? 'ভূমি রেকর্ড সৃষ্টি, দলিল রেজিস্ট্রি, নামজারি অনুমোদন ও কর আদায়ের প্রতিটি কার্যক্রম SHA-256 হ্যাশ চেইনিংয়ে অপরিবর্তনীয়ভাবে সংরক্ষিত'
                : 'Immutable SHA-256 hash chaining securing all title mutations, registrations, caveats, and officer decisions.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleVerifyLedger}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              {language === 'bn' ? 'লেজার ইন্টিগ্রিটি যাচাই করুন' : 'Verify Ledger Integrity'}
            </button>
          </div>
        </div>
      </div>

      {/* Verification Status Banner */}
      {verificationResult && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          verificationResult.isValid
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
            : 'bg-red-50 border-red-300 text-red-950'
        }`}>
          <div className="flex items-center gap-2.5">
            {verificationResult.isValid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            )}
            <span className="text-xs font-bold">{verificationResult.message}</span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border">
            {chain.length} Blocks Verified
          </span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="gov-card p-4 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="ভূমি আইডি, হ্যাশ, ইউজার বা অ্যাকশন দিয়ে ফিল্টার করুন..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-700 focus:outline-none"
          />
        </div>

        <span className="text-xs font-mono font-bold text-slate-500">
          Total Blocks: {chain.length}
        </span>
      </div>

      {/* Visual Blockchain Style Blocks Feed */}
      <div className="space-y-4">
        {filteredChain.map((block, idx) => (
          <div
            key={block.index}
            className="gov-card p-5 border border-slate-200 bg-white shadow-sm space-y-3 relative hover:border-emerald-400 transition-all"
          >
            {/* Block Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center shadow-sm">
                  #{block.index}
                </span>
                <span className="font-bold text-xs text-slate-900">
                  {language === 'bn' ? block.actionBn : block.action}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                  {block.targetLandId}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                <span>{new Date(block.timestamp).toLocaleString()}</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold font-sans">
                  {block.userRole}
                </span>
              </div>
            </div>

            {/* Block Content Payload */}
            <div className="text-xs text-slate-700 space-y-1">
              <p className="font-medium">
                {language === 'bn' ? block.detailsBn : block.details}
              </p>
              <p className="text-[11px] text-slate-500">
                স্বাক্ষরকারী ব্যবহারকারী: <strong className="text-slate-800">{block.userName}</strong> (ID: {block.userId})
              </p>
            </div>

            {/* Hash Proof Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] font-mono">
              <div className="truncate">
                <span className="text-slate-400 block text-[9px]">PREVIOUS BLOCK HASH (PrevHash)</span>
                <span className="text-slate-600 truncate">{block.prevHash}</span>
              </div>
              <div className="truncate">
                <span className="text-emerald-700 block text-[9px] font-bold">CURRENT BLOCK SHA-256 HASH</span>
                <span className="text-emerald-900 font-bold truncate">{block.currentHash}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
