import React from 'react';
import { UserRole, Language } from '../../types';
import { TabType } from '../layout/NavigationTabs';
import { isTabAllowedForRole } from '../../config/roleConfig';
import {
  Search,
  FileText,
  GitPullRequest,
  Receipt,
  Building,
  ShieldCheck,
  FileCheck2,
  Lock,
  ArrowRight,
  Scale,
  Clock,
  Compass,
  MapPin,
  Waves,
  CreditCard,
  UserCheck,
  BarChart3,
  Server,
  Fingerprint,
  AlertTriangle,
  FileSearch,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface RoleQuickActionsProps {
  role: UserRole;
  language: Language;
  onNavigateTab: (tab: TabType) => void;
  onOpenTrackingModal: () => void;
}

interface QuickActionItem {
  id: string;
  labelBn: string;
  labelEn: string;
  tab?: TabType;
  action?: () => void;
  icon: React.ReactNode;
  variant?: 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'slate';
}

export const RoleQuickActions: React.FC<RoleQuickActionsProps> = ({
  role,
  language,
  onNavigateTab,
  onOpenTrackingModal
}) => {
  const getActionsForRole = (): QuickActionItem[] => {
    switch (role) {
      case 'CITIZEN':
        return [
          {
            id: 'cit-1',
            labelBn: 'ভূমি অনুসন্ধান',
            labelEn: 'Search Land',
            tab: 'LAND_SEARCH_GIS',
            icon: <Search className="w-4 h-4 text-emerald-600" />,
            variant: 'emerald'
          },
          {
            id: 'cit-2',
            labelBn: 'ভূমি প্রোফাইল দেখুন',
            labelEn: 'View Land Profile',
            tab: 'LAND_PROFILE',
            icon: <FileText className="w-4 h-4 text-blue-600" />,
            variant: 'blue'
          },
          {
            id: 'cit-3',
            labelBn: 'সেবা আবেদন (নামজারি)',
            labelEn: 'Apply for Service',
            tab: 'SMART_MUTATION',
            icon: <GitPullRequest className="w-4 h-4 text-amber-600" />,
            variant: 'amber'
          },
          {
            id: 'cit-4',
            labelBn: 'আবেদন ট্র্যাকিং',
            labelEn: 'Track Application',
            action: onOpenTrackingModal,
            icon: <Clock className="w-4 h-4 text-purple-600" />,
            variant: 'purple'
          },
          {
            id: 'cit-5',
            labelBn: 'ভূমি কর পরিশোধ/যাচাই',
            labelEn: 'Pay/Check Land Tax',
            tab: 'LD_TAX',
            icon: <Receipt className="w-4 h-4 text-teal-600" />,
            variant: 'emerald'
          }
        ];

      case 'OWNER':
        return [
          {
            id: 'own-1',
            labelBn: 'আমার সম্পত্তিসমূহ',
            labelEn: 'My Properties',
            tab: 'LAND_PROFILE',
            icon: <Building className="w-4 h-4 text-emerald-600" />,
            variant: 'emerald'
          },
          {
            id: 'own-2',
            labelBn: 'মালিকানা স্বত্ব যাচাই',
            labelEn: 'Ownership Verification',
            tab: 'DOC_AI_LAB',
            icon: <ShieldCheck className="w-4 h-4 text-blue-600" />,
            variant: 'blue'
          },
          {
            id: 'own-3',
            labelBn: 'সম্পত্তি দলিলপত্র',
            labelEn: 'Property Documents',
            tab: 'LAND_PROFILE',
            icon: <FileCheck2 className="w-4 h-4 text-purple-600" />,
            variant: 'purple'
          },
          {
            id: 'own-4',
            labelBn: 'কেভিয়েট সুরক্ষা লক',
            labelEn: 'Caveat Protection',
            tab: 'CAVEATS_DISPUTES',
            icon: <Lock className="w-4 h-4 text-red-600" />,
            variant: 'red'
          },
          {
            id: 'own-5',
            labelBn: 'কর স্থিতি ও দাখিলা',
            labelEn: 'Tax Status',
            tab: 'LD_TAX',
            icon: <Receipt className="w-4 h-4 text-teal-600" />,
            variant: 'emerald'
          },
          {
            id: 'own-6',
            labelBn: 'হস্তান্তর ও বিক্রয় আবেদন',
            labelEn: 'Transfer Request',
            tab: 'BUY_SELL_ESCROW',
            icon: <ArrowRight className="w-4 h-4 text-amber-600" />,
            variant: 'amber'
          }
        ];

      case 'BUYER_SELLER':
        return [
          {
            id: 'bs-1',
            labelBn: 'সম্পত্তি অনুসন্ধান',
            labelEn: 'Search Property',
            tab: 'LAND_SEARCH_GIS',
            icon: <Search className="w-4 h-4 text-emerald-600" />,
            variant: 'emerald'
          },
          {
            id: 'bs-2',
            labelBn: 'বিক্রেতার স্বত্ব যাচাই',
            labelEn: 'Verify Seller',
            tab: 'LAND_PROFILE',
            icon: <UserCheck className="w-4 h-4 text-blue-600" />,
            variant: 'blue'
          },
          {
            id: 'bs-3',
            labelBn: 'দলিলপত্র এআই পরীক্ষা',
            labelEn: 'Verify Documents',
            tab: 'DOC_AI_LAB',
            icon: <FileCheck2 className="w-4 h-4 text-purple-600" />,
            variant: 'purple'
          },
          {
            id: 'bs-4',
            labelBn: 'দায়মুক্ততা (এনইসি) চেক',
            labelEn: 'Check Encumbrance',
            tab: 'LAND_PROFILE',
            icon: <ShieldCheck className="w-4 h-4 text-teal-600" />,
            variant: 'emerald'
          },
          {
            id: 'bs-5',
            labelBn: 'বায়না ও ক্রয় প্রক্রিয়া শুরু',
            labelEn: 'Start Buy/Sell Process',
            tab: 'BUY_SELL_ESCROW',
            icon: <CreditCard className="w-4 h-4 text-amber-600" />,
            variant: 'amber'
          },
          {
            id: 'bs-6',
            labelBn: 'লেনদেন ও এসক্রো ট্র্যাকিং',
            labelEn: 'Track Transaction',
            tab: 'BUY_SELL_ESCROW',
            icon: <Clock className="w-4 h-4 text-slate-600" />,
            variant: 'slate'
          }
        ];

      case 'LAWYER':
        return [
          {
            id: 'law-1',
            labelBn: 'ক্লায়েন্ট কেস ডায়েরি',
            labelEn: 'Client Cases',
            tab: 'CAVEATS_DISPUTES',
            icon: <FileText className="w-4 h-4 text-blue-600" />,
            variant: 'blue'
          },
          {
            id: 'law-2',
            labelBn: 'জমি বিরোধ ও দেওয়ানি মামলা',
            labelEn: 'Land Dispute',
            tab: 'CAVEATS_DISPUTES',
            icon: <Scale className="w-4 h-4 text-amber-600" />,
            variant: 'amber'
          },
          {
            id: 'law-3',
            labelBn: 'দলিল পর্যালোচনা ল্যাব',
            labelEn: 'Document Review',
            tab: 'DOC_AI_LAB',
            icon: <FileSearch className="w-4 h-4 text-purple-600" />,
            variant: 'purple'
          },
          {
            id: 'law-4',
            labelBn: 'খতিয়ান শৃঙ্খল যাচাই',
            labelEn: 'Land Record Verification',
            tab: 'LAND_PROFILE',
            icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
            variant: 'emerald'
          },
          {
            id: 'law-5',
            labelBn: 'আইনি কেভিয়েট দায়ের',
            labelEn: 'Legal Caveat',
            tab: 'CAVEATS_DISPUTES',
            icon: <Lock className="w-4 h-4 text-red-600" />,
            variant: 'red'
          },
          {
            id: 'law-6',
            labelBn: 'শুনানি ও তারিখ ট্র্যাকিং',
            labelEn: 'Hearing/Case Tracking',
            tab: 'CAVEATS_DISPUTES',
            icon: <Clock className="w-4 h-4 text-slate-600" />,
            variant: 'slate'
          }
        ];

      case 'SURVEYOR':
        return [
          {
            id: 'sur-1',
            labelBn: 'ক্যাডাস্ট্রাল জিআইএস',
            labelEn: 'Cadastral GIS',
            tab: 'LAND_SEARCH_GIS',
            icon: <Compass className="w-4 h-4 text-emerald-600" />,
            variant: 'emerald'
          },
          {
            id: 'sur-2',
            labelBn: 'প্লট সরেজমিন পরিদর্শন',
            labelEn: 'Parcel Inspection',
            tab: 'LAND_SEARCH_GIS',
            icon: <MapPin className="w-4 h-4 text-blue-600" />,
            variant: 'blue'
          },
          {
            id: 'sur-3',
            labelBn: 'সীমানা জিপিএস স্থানাঙ্ক',
            labelEn: 'Boundary Coordinates',
            tab: 'LAND_SEARCH_GIS',
            icon: <ShieldCheck className="w-4 h-4 text-purple-600" />,
            variant: 'purple'
          },
          {
            id: 'sur-4',
            labelBn: 'সার্ভে ইনস্পেকশন কিউ',
            labelEn: 'Survey Queue',
            tab: 'LAND_SEARCH_GIS',
            icon: <Clock className="w-4 h-4 text-amber-600" />,
            variant: 'amber'
          },
          {
            id: 'sur-5',
            labelBn: 'নদীভাঙন ও সিকস্তি বিশ্লেষণ',
            labelEn: 'River Erosion Analysis',
            tab: 'INSAR_EROSION',
            icon: <Waves className="w-4 h-4 text-cyan-600" />,
            variant: 'blue'
          }
        ];

      case 'SRO_OFFICER':
        return [
          {
            id: 'sro-1',
            labelBn: 'দলিল রেজিস্ট্রি কিউ',
            labelEn: 'Registration Queue',
            tab: 'BUY_SELL_ESCROW',
            icon: <Clock className="w-4 h-4 text-emerald-600" />,
            variant: 'emerald'
          },
          {
            id: 'sro-2',
            labelBn: 'মূল দলিল এআই যাচাই',
            labelEn: 'Deed Verification',
            tab: 'DOC_AI_LAB',
            icon: <FileCheck2 className="w-4 h-4 text-blue-600" />,
            variant: 'blue'
          },
          {
            id: 'sro-3',
            labelBn: 'স্ট্যাম্প শুল্ক ও ফি আদায়',
            labelEn: 'Stamp Duty',
            tab: 'BUY_SELL_ESCROW',
            icon: <CreditCard className="w-4 h-4 text-teal-600" />,
            variant: 'emerald'
          },
          {
            id: 'sro-4',
            labelBn: 'বায়োমেট্রিক ও এনআইডি ম্যাচ',
            labelEn: 'Biometric Verification',
            tab: 'BUY_SELL_ESCROW',
            icon: <Fingerprint className="w-4 h-4 text-purple-600" />,
            variant: 'purple'
          },
          {
            id: 'sro-5',
            labelBn: 'দলিল রেজিস্ট্রি সম্পাদন',
            labelEn: 'Register Deed',
            tab: 'BUY_SELL_ESCROW',
            icon: <ShieldCheck className="w-4 h-4 text-amber-600" />,
            variant: 'amber'
          },
          {
            id: 'sro-6',
            labelBn: 'এসআরও-এসিল্যান্ড সিঙ্ক',
            labelEn: 'Mutation Sync',
            tab: 'SMART_MUTATION',
            icon: <GitPullRequest className="w-4 h-4 text-blue-600" />,
            variant: 'blue'
          }
        ];

      case 'AC_LAND':
        return [
          {
            id: 'acl-1',
            labelBn: 'নামজারি আবেদন কিউ',
            labelEn: 'Mutation Queue',
            tab: 'SMART_MUTATION',
            icon: <GitPullRequest className="w-4 h-4 text-emerald-600" />,
            variant: 'emerald'
          },
          {
            id: 'acl-2',
            labelBn: 'সরেজমিন ফিল্ড রিপোর্ট',
            labelEn: 'Field Verification',
            tab: 'LAND_SEARCH_GIS',
            icon: <MapPin className="w-4 h-4 text-blue-600" />,
            variant: 'blue'
          },
          {
            id: 'acl-3',
            labelBn: 'কেভিয়েট ও খাসজমি চেক',
            labelEn: 'Caveat Check',
            tab: 'CAVEATS_DISPUTES',
            icon: <Lock className="w-4 h-4 text-red-600" />,
            variant: 'red'
          },
          {
            id: 'acl-4',
            labelBn: 'নামজারি অনুমোদন করুন',
            labelEn: 'Approve Mutation',
            tab: 'SMART_MUTATION',
            icon: <CheckCircle2 className="w-4 h-4 text-teal-600" />,
            variant: 'emerald'
          },
          {
            id: 'acl-5',
            labelBn: 'নতুন বিএস খতিয়ান সৃজন',
            labelEn: 'Issue Khatian',
            tab: 'SMART_MUTATION',
            icon: <FileText className="w-4 h-4 text-purple-600" />,
            variant: 'purple'
          },
          {
            id: 'acl-6',
            labelBn: 'সার্কেল ভূমি রেকর্ডসমূহ',
            labelEn: 'Land Records',
            tab: 'LAND_PROFILE',
            icon: <Building className="w-4 h-4 text-slate-600" />,
            variant: 'slate'
          }
        ];

      case 'GOV_ADMIN':
        return [
          {
            id: 'adm-1',
            labelBn: 'জাতীয় রাজস্ব অ্যানালিটিক্স',
            labelEn: 'National/Regional Analytics',
            tab: 'DASHBOARD',
            icon: <BarChart3 className="w-4 h-4 text-emerald-600" />,
            variant: 'emerald'
          },
          {
            id: 'adm-2',
            labelBn: 'সারাদেশে সেবা মনিটরিং',
            labelEn: 'Service Monitoring',
            tab: 'GOV_API_SANDBOX',
            icon: <Server className="w-4 h-4 text-blue-600" />,
            variant: 'blue'
          },
          {
            id: 'adm-3',
            labelBn: 'ঝুলে থাকা আবেদনসমূহ',
            labelEn: 'Pending Approvals',
            tab: 'SMART_MUTATION',
            icon: <Clock className="w-4 h-4 text-amber-600" />,
            variant: 'amber'
          },
          {
            id: 'adm-4',
            labelBn: 'কর্মকর্তা পারফরম্যান্স অডিট',
            labelEn: 'Officer Performance',
            tab: 'DASHBOARD',
            icon: <UserCheck className="w-4 h-4 text-purple-600" />,
            variant: 'purple'
          },
          {
            id: 'adm-5',
            labelBn: 'মন্ত্রণালয়ের নীতি রিপোর্ট',
            labelEn: 'Reports',
            tab: 'AUDIT_EXPLORER',
            icon: <FileText className="w-4 h-4 text-teal-600" />,
            variant: 'emerald'
          },
          {
            id: 'adm-6',
            labelBn: 'সরকারি এপিআই মনিটরিং',
            labelEn: 'Gov API Monitoring',
            tab: 'GOV_API_SANDBOX',
            icon: <Server className="w-4 h-4 text-slate-600" />,
            variant: 'slate'
          }
        ];

      case 'BANK_OFFICER':
        return [
          {
            id: 'bnk-1',
            labelBn: 'ঋণগ্রহীতার এনআইডি যাচাই',
            labelEn: 'Borrower Verification',
            tab: 'LAND_PROFILE',
            icon: <UserCheck className="w-4 h-4 text-blue-600" />,
            variant: 'blue'
          },
          {
            id: 'bnk-2',
            labelBn: 'জমির টাইটেল ও স্বত্ব চেক',
            labelEn: 'Land Title Check',
            tab: 'LAND_PROFILE',
            icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
            variant: 'emerald'
          },
          {
            id: 'bnk-3',
            labelBn: 'বন্ধক ও পূর্ববর্তী লিয়েন চেক',
            labelEn: 'Mortgage/Lien Check',
            tab: 'LAND_PROFILE',
            icon: <CreditCard className="w-4 h-4 text-amber-600" />,
            variant: 'amber'
          },
          {
            id: 'bnk-4',
            labelBn: 'দায়মুক্ততা (NEC) সনদ যাচাই',
            labelEn: 'Encumbrance Check',
            tab: 'LAND_PROFILE',
            icon: <FileCheck2 className="w-4 h-4 text-purple-600" />,
            variant: 'purple'
          },
          {
            id: 'bnk-5',
            labelBn: 'বন্ধকী নিরাপত্তা মূল্যায়ন',
            labelEn: 'Loan Security Review',
            tab: 'DOC_AI_LAB',
            icon: <FileSearch className="w-4 h-4 text-teal-600" />,
            variant: 'emerald'
          }
        ];

      case 'AUDITOR':
        return [
          {
            id: 'aud-1',
            labelBn: 'জাতীয় অডিট লেজার',
            labelEn: 'Audit Ledger',
            tab: 'AUDIT_EXPLORER',
            icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
            variant: 'emerald'
          },
          {
            id: 'aud-2',
            labelBn: 'SHA-256 হ্যাশ ভেরিফিকেশন',
            labelEn: 'Hash Verification',
            tab: 'AUDIT_EXPLORER',
            icon: <Fingerprint className="w-4 h-4 text-blue-600" />,
            variant: 'blue'
          },
          {
            id: 'aud-3',
            labelBn: 'সিকিউরিটি এক্সেস লগ',
            labelEn: 'Security Logs',
            tab: 'AUDIT_EXPLORER',
            icon: <Lock className="w-4 h-4 text-purple-600" />,
            variant: 'purple'
          },
          {
            id: 'aud-4',
            labelBn: 'নামজারি ফরেনসিক পরীক্ষা',
            labelEn: 'Mutation Forensics',
            tab: 'AUDIT_EXPLORER',
            icon: <FileSearch className="w-4 h-4 text-amber-600" />,
            variant: 'amber'
          },
          {
            id: 'aud-5',
            labelBn: 'ভিজিল্যান্স ও দুদক রিপোর্ট',
            labelEn: 'Audit Reports',
            tab: 'AUDIT_EXPLORER',
            icon: <FileText className="w-4 h-4 text-teal-600" />,
            variant: 'emerald'
          },
          {
            id: 'aud-6',
            labelBn: 'সন্দেহজনক ব্যাকডেটেড এন্ট্রি',
            labelEn: 'Suspicious Activity',
            tab: 'AUDIT_EXPLORER',
            icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
            variant: 'red'
          }
        ];

      default:
        return [];
    }
  };

  const actions = getActionsForRole().filter(act => {
    if (!act.tab) return true;
    return isTabAllowedForRole(role, act.tab);
  });

  return (
    <div className="gov-card p-5 space-y-3.5 border-l-4 border-l-emerald-700">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              {language === 'bn' ? 'অনুমোদিত কুইক অ্যাকশন' : 'Role-Specific Quick Actions'}
            </h3>
            <p className="text-[10px] text-slate-500">
              {language === 'bn' ? 'আপনার ভূমিকার জন্য সরাসরি অনুমোদিত সেবা ও অ্যাকশনসমূহ' : 'Permitted instant actions for your active role'}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
          {actions.length} {language === 'bn' ? 'টি অ্যাকশন' : 'Actions'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {actions.map(act => (
          <button
            key={act.id}
            onClick={() => {
              if (act.action) {
                act.action();
              } else if (act.tab) {
                onNavigateTab(act.tab);
              }
            }}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col items-start justify-between min-h-[82px] group text-left shadow-2xs hover:shadow-sm cursor-pointer"
          >
            <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform">
              {act.icon}
            </div>

            <div className="w-full">
              <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-950 block leading-tight truncate">
                {language === 'bn' ? act.labelBn : act.labelEn}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
