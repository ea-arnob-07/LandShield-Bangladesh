import React from 'react';
import { Language, UserRole } from '../../types';
import { TabType } from '../layout/NavigationTabs';
import { getRoleConfig } from '../../config/roleConfig';
import { ChevronRight, Home, LayoutDashboard } from 'lucide-react';

interface BreadcrumbsProps {
  activeTab: TabType;
  onNavigateTab: (tab: TabType) => void;
  userRole: UserRole;
  language: Language;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  activeTab,
  onNavigateTab,
  userRole,
  language
}) => {
  const roleConfig = getRoleConfig(userRole);
  const currentNavItem = roleConfig.navigation.find(item => item.id === activeTab);

  const getTabLabel = (tab: TabType) => {
    if (tab === 'DASHBOARD') {
      return language === 'bn' ? `${roleConfig.nameBn} ড্যাশবোর্ড` : `${roleConfig.nameEn} Dashboard`;
    }
    if (currentNavItem) {
      return language === 'bn' ? currentNavItem.labelBn : currentNavItem.labelEn;
    }
    return tab;
  };

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 py-2.5 px-4 sm:px-6 bg-white border-b border-slate-200/70 overflow-x-auto whitespace-nowrap">
      <button
        onClick={() => onNavigateTab('DASHBOARD')}
        className="flex items-center gap-1 text-slate-600 hover:text-emerald-800 transition-colors cursor-pointer"
        title="Dashboard Home"
      >
        <Home className="w-3.5 h-3.5 text-emerald-700" />
        <span className="font-semibold">{language === 'bn' ? 'হোম' : 'Home'}</span>
      </button>

      <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />

      <button
        onClick={() => onNavigateTab('DASHBOARD')}
        className={`hover:text-emerald-800 transition-colors cursor-pointer ${
          activeTab === 'DASHBOARD' ? 'text-emerald-800 font-bold' : 'text-slate-600'
        }`}
      >
        <span>{language === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}</span>
      </button>

      {activeTab !== 'DASHBOARD' && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="text-emerald-950 font-bold">
            {getTabLabel(activeTab)}
          </span>
        </>
      )}

      {/* Role tag */}
      <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono hidden sm:inline">
        Active Role: {roleConfig.nameEn}
      </span>
    </nav>
  );
};
