import React from 'react';
import { UserRole, Language } from '../../types';
import { Clock, CheckCircle2, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

interface RecentActivityStreamProps {
  role: UserRole;
  language: Language;
  onOpenTimeline: () => void;
}

export const RecentActivityStream: React.FC<RecentActivityStreamProps> = ({
  role,
  language,
  onOpenTimeline
}) => {
  const getActivities = () => {
    switch (role) {
      case 'CITIZEN':
        return [
          {
            titleBn: 'ই-নামজারি আবেদন #MUT-SAV-2026-902 অনুমোদিত হয়েছে',
            titleEn: 'e-Mutation #MUT-SAV-2026-902 approved by AC Land',
            timeBn: '২ ঘণ্টা পূর্বে',
            timeEn: '2 hours ago',
            type: 'success'
          },
          {
            titleBn: 'ধানমন্ডি মৌজার হোল্ডিং HLD-DHAN-904 এর ভূমি কর দাখিলা ডাউনলোড',
            titleEn: 'LD Tax Dakhila downloaded for Holding HLD-DHAN-904',
            timeBn: 'গতকাল, ০৩:১৫ অপরাহ্ন',
            timeEn: 'Yesterday, 3:15 PM',
            type: 'info'
          },
          {
            titleBn: 'দাগ নং ১০৪ এর খতিয়ান শৃঙ্খল অনুসন্ধান সম্পন্ন',
            titleEn: 'Title chain verified for Dag No 104',
            timeBn: '২ দিন পূর্বে',
            timeEn: '2 days ago',
            type: 'neutral'
          }
        ];
      case 'AC_LAND':
        return [
          {
            titleBn: 'নামজারি কেস #MUT-SAV-2026-902 এর শুনানি গ্রহণ ও অনুমোদন প্রদান',
            titleEn: 'Hearing concluded & approved for Case #MUT-SAV-2026-902',
            timeBn: '১ ঘণ্টা পূর্বে',
            timeEn: '1 hour ago',
            type: 'success'
          },
          {
            titleBn: 'কানুনগো ফিল্ড ইনস্পেকশন রিপোর্ট Savar-Field-104 পর্যালোচনা',
            titleEn: 'Reviewed Kanungo field report Savar-Field-104',
            timeBn: '৪ ঘণ্টা পূর্বে',
            timeEn: '4 hours ago',
            type: 'info'
          },
          {
            titleBn: 'নদী ভাঙন সিকস্তি দাগ নং ৬০০ এ খাসজমি সংরক্ষণ আদেশ জারি',
            titleEn: 'Issued Khas preservation order for eroded Dag 600',
            timeBn: 'গতকাল',
            timeEn: 'Yesterday',
            type: 'warning'
          }
        ];
      default:
        return [
          {
            titleBn: 'সিস্টেমে ডিজিটাল সেশন প্রমাণীকরণ ও নিরাপত্তা অডিট লগ গৃহীত',
            titleEn: 'Session authenticated & SHA-256 security audit logged',
            timeBn: '১০ মিনিট পূর্বে',
            timeEn: '10 mins ago',
            type: 'info'
          },
          {
            titleBn: 'অনুমোদিত মডিউলে ভূমি ডাটাবেজ কোয়েরি সম্পন্ন',
            titleEn: 'Authorized land database query executed successfully',
            timeBn: '১ ঘণ্টা পূর্বে',
            timeEn: '1 hour ago',
            type: 'success'
          }
        ];
    }
  };

  const items = getActivities();

  return (
    <div className="gov-card p-5 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-emerald-800" />
          <span>{language === 'bn' ? 'সাম্প্রতিক অনুমোদিত কার্যকলাপ' : 'Recent Permitted Activity'}</span>
        </h4>
        <button
          onClick={onOpenTimeline}
          className="text-[10px] font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>{language === 'bn' ? 'টাইমলাইন দেখুন' : 'View Timeline'}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/90 flex items-start gap-2.5 text-xs"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-800 font-medium leading-snug">
                {language === 'bn' ? item.titleBn : item.titleEn}
              </p>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                {language === 'bn' ? item.timeBn : item.timeEn}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
