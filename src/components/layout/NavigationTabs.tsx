import React from 'react';
import { Language, UserRole } from '../../types';
import { getTranslation } from '../../utils/translations';
import {
  LayoutDashboard,
  MapPin,
  FileText,
  BadgePercent,
  Sparkles,
  GitPullRequest,
  Receipt,
  Scale,
  GitFork,
  Waves,
  Plane,
  ShieldAlert,
  Server
} from 'lucide-react';

export type TabType =
  | 'DASHBOARD'
  | 'LAND_SEARCH_GIS'
  | 'LAND_PROFILE'
  | 'BUY_SELL_ESCROW'
  | 'DOC_AI_LAB'
  | 'SMART_MUTATION'
  | 'LD_TAX'
  | 'CAVEATS_DISPUTES'
  | 'FARAID_INHERITANCE'
  | 'INSAR_EROSION'
  | 'DIASPORA_PORTAL'
  | 'AUDIT_EXPLORER'
  | 'GOV_API_SANDBOX';

import { isTabAllowedForRole } from '../../config/roleConfig';

interface NavigationTabsProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  language: Language;
  userRole: UserRole;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onSelectTab,
  language,
  userRole
}) => {
  const allTabs: { id: TabType; labelBn: string; labelEn: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'DASHBOARD',
      labelBn: 'ড্যাশবোর্ড',
      labelEn: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'LAND_SEARCH_GIS',
      labelBn: 'ভূমি অনুসন্ধান ও জিআইএস',
      labelEn: 'GIS Cadastral Map',
      icon: <MapPin className="w-4 h-4" />
    },
    {
      id: 'LAND_PROFILE',
      labelBn: 'ডিজিটাল ভূমি প্রোফাইল',
      labelEn: 'Digital Land Profile',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 'BUY_SELL_ESCROW',
      labelBn: 'ক্রয়-বিক্রয় ও এসক্রো',
      labelEn: 'Buy/Sell & Escrow',
      icon: <BadgePercent className="w-4 h-4" />,
      badge: 'Escrow'
    },
    {
      id: 'DOC_AI_LAB',
      labelBn: 'এআই দলিল যাচাই ল্যাব',
      labelEn: 'AI Document Lab',
      icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
      badge: 'AI OCR'
    },
    {
      id: 'SMART_MUTATION',
      labelBn: 'স্মার্ট ই-নামজারি',
      labelEn: 'Smart e-Mutation',
      icon: <GitPullRequest className="w-4 h-4" />,
      badge: 'SRO-AC'
    },
    {
      id: 'LD_TAX',
      labelBn: 'ভূমি উন্নয়ন কর (LD Tax)',
      labelEn: 'Land Dev Tax',
      icon: <Receipt className="w-4 h-4" />
    },
    {
      id: 'CAVEATS_DISPUTES',
      labelBn: 'কেভিয়েট ও বিরোধ ট্র্যাকার',
      labelEn: 'Caveats & Disputes',
      icon: <Scale className="w-4 h-4" />
    },
    {
      id: 'FARAID_INHERITANCE',
      labelBn: 'এআই ফরায়েজ বাটোয়ারা',
      labelEn: 'AI Faraid Partition',
      icon: <GitFork className="w-4 h-4" />
    },
    {
      id: 'INSAR_EROSION',
      labelBn: 'ইনসার নদীভাঙন (সিকস্তি)',
      labelEn: 'InSAR River Erosion',
      icon: <Waves className="w-4 h-4" />,
      badge: 'Radar'
    },
    {
      id: 'DIASPORA_PORTAL',
      labelBn: 'প্রবাসী কনস্যুলার সেবা',
      labelEn: 'Diaspora Portal',
      icon: <Plane className="w-4 h-4" />
    },
    {
      id: 'AUDIT_EXPLORER',
      labelBn: 'ক্রিপ্টোগ্রাফিক অডিট লেজার',
      labelEn: 'SHA-256 Audit Ledger',
      icon: <ShieldAlert className="w-4 h-4" />
    },
    {
      id: 'GOV_API_SANDBOX',
      labelBn: 'সরকারি এপিআই স্যান্ডবক্স',
      labelEn: 'GovTech API Sandbox',
      icon: <Server className="w-4 h-4" />
    }
  ];

  // STEP 4 & 5: Filter tabs so user only sees what is permitted for their role
  const visibleTabs = allTabs.filter(tab => isTabAllowedForRole(userRole, tab.id));

  return (
    <nav className="bg-slate-900 text-slate-300 px-4 py-2 border-b border-slate-800 overflow-x-auto scrollbar-none shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
        {visibleTabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-md shadow-emerald-950/40 ring-1 ring-emerald-600'
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
              }`}
            >
              <span className={isActive ? 'text-emerald-300' : 'text-slate-400'}>
                {tab.icon}
              </span>
              <span>{language === 'bn' ? tab.labelBn : tab.labelEn}</span>
              {tab.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono uppercase ${
                  isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
