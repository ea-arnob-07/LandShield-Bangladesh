import React from 'react';
import { UserProfile, Language } from '../../types';
import { TabType } from '../layout/NavigationTabs';
import { getRoleConfig } from '../../config/roleConfig';
import {
  ShieldAlert,
  Lock,
  ArrowLeft,
  AlertTriangle,
  UserCheck,
  Building2,
  CheckCircle2
} from 'lucide-react';

interface AccessDeniedProps {
  currentUser: UserProfile;
  attemptedTab: TabType;
  onReturnToDashboard: () => void;
  onOpenRoleSwitcher: () => void;
  language: Language;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({
  currentUser,
  attemptedTab,
  onReturnToDashboard,
  onOpenRoleSwitcher,
  language
}) => {
  const roleConfig = getRoleConfig(currentUser.role);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="gov-card overflow-hidden border-2 border-red-200/80 shadow-2xl bg-white">
        {/* Top Security Banner */}
        <div className="bg-gradient-to-r from-red-800 via-red-700 to-slate-900 text-white p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-300 flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
              <ShieldAlert className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-900/80 border border-red-500/30 text-red-200 text-[10px] font-bold uppercase tracking-wider mb-1">
                <Lock className="w-3 h-3" />
                <span>403 Forbidden • সিকিউরিটি গার্ড সতর্কবার্তা</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                {language === 'bn' ? 'অননুমোদিত প্রবেশাধিকার সংরক্ষিত' : 'Access Restricted by Role Policy'}
              </h2>
              <p className="text-red-200 text-xs sm:text-sm mt-0.5">
                {language === 'bn'
                  ? 'আপনার বর্তমান ভূমিকা এই মডিউল ব্যবহারের অনুমতিপ্রাপ্ত নয়'
                  : 'Your current authenticated role does not possess permissions for this module'}
              </p>
            </div>
          </div>
        </div>

        {/* Security Diagnostics & Explanations */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Current Role Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {language === 'bn' ? 'আপনার বর্তমান ভূমিকা ও প্রোফাইল' : 'Your Active Role & Profile'}
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-300"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {language === 'bn' ? currentUser.nameBn : currentUser.name}
                  </h4>
                  <span className={`inline-block text-[11px] font-extrabold px-2 py-0.5 rounded-md ${roleConfig.badgeBg} ${roleConfig.badgeText} mt-0.5`}>
                    {language === 'bn' ? roleConfig.nameBn : roleConfig.nameEn}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 pt-1 leading-relaxed">
                {language === 'bn' ? roleConfig.descriptionBn : roleConfig.descriptionEn}
              </p>
            </div>

            {/* Attempted Module Info */}
            <div className="p-4 rounded-2xl bg-red-50/50 border border-red-200/80 space-y-2">
              <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                {language === 'bn' ? 'নিষিদ্ধ মডিউল / টার্গেট রুট' : 'Restricted Target Module'}
              </span>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-red-100 text-red-800 flex items-center justify-center font-mono font-bold text-xs">
                  403
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 font-mono">
                    TAB: {attemptedTab}
                  </h4>
                  <span className="text-[11px] text-red-700 font-medium">
                    {language === 'bn' ? 'রোল-ভিত্তিক পারমিশন মিসিং' : 'Missing Role Authorization Token'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                {language === 'bn'
                  ? 'এই সেবাটি কেবল নির্দিষ্ট অনুমোদিত কর্মকর্তাদের জন্য সংরক্ষিত। সরকারি নীতি অনুযায়ী গোপনীয়তা ও অখণ্ডতা রক্ষার্থে এটি সীমাবদ্ধ রাখা হয়েছে।'
                  : 'This service is strictly quarantined to designated authorized roles to maintain institutional integrity and security.'}
              </p>
            </div>
          </div>

          {/* Permitted Modules Checklist for this role */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
            <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>
                {language === 'bn'
                  ? `আপনার ভূমিকা (${roleConfig.nameBn})-এর জন্য অনুমোদিত সেবা মডিউলসমূহ:`
                  : `Permitted service modules for your active role (${roleConfig.nameEn}):`}
              </span>
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {roleConfig.navigation.map(nav => (
                <span
                  key={nav.id}
                  className="text-[11px] font-semibold bg-white text-emerald-800 px-3 py-1 rounded-lg border border-emerald-200/80 shadow-xs"
                >
                  {language === 'bn' ? nav.labelBn : nav.labelEn}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <button
              onClick={onReturnToDashboard}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'bn' ? 'আমার অনুমোদিত ড্যাশবোর্ডে ফিরুন' : 'Return to My Role Dashboard'}</span>
            </button>

            <button
              onClick={onOpenRoleSwitcher}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-200"
            >
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>{language === 'bn' ? 'অন্য ভূমিকায় স্যুইচ করুন (১০টি ভূমিকা)' : 'Switch Role (10 Available Roles)'}</span>
            </button>
          </div>
        </div>

        {/* Cryptographic Security Note */}
        <div className="bg-slate-50 border-t border-slate-200/80 px-6 py-3 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="font-mono">IP: 103.48.24.12 • RBAC Gatekeeper v2.6</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {language === 'bn' ? 'অডিট লেজারে রেকর্ড সংরক্ষিত' : 'Logged to SHA-256 Audit Trail'}
          </span>
        </div>
      </div>
    </div>
  );
};
