import React from 'react';
import { UserProfile, Language } from '../../types';
import { TabType } from './NavigationTabs';
import { getRoleConfig } from '../../config/roleConfig';
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
  Server,
  Building,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  LogOut,
  ShieldCheck,
  Landmark,
  X,
  CreditCard
} from 'lucide-react';

interface SidebarProps {
  currentUser: UserProfile;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenRoleSwitcher: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  activeTab,
  onSelectTab,
  language,
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
  onOpenRoleSwitcher,
  onLogout
}) => {
  const roleConfig = getRoleConfig(currentUser.role);

  const getNavIcon = (name: string, className: string = 'w-4 h-4') => {
    switch (name) {
      case 'LayoutDashboard': return <LayoutDashboard className={className} />;
      case 'MapPin': return <MapPin className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'BadgePercent': return <BadgePercent className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'GitPullRequest': return <GitPullRequest className={className} />;
      case 'Receipt': return <Receipt className={className} />;
      case 'Scale': return <Scale className={className} />;
      case 'GitFork': return <GitFork className={className} />;
      case 'Waves': return <Waves className={className} />;
      case 'Plane': return <Plane className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Server': return <Server className={className} />;
      case 'Building': return <Building className={className} />;
      case 'CreditCard': return <CreditCard className={className} />;
      default: return <Landmark className={className} />;
    }
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`bs-app-sidebar fixed lg:sticky top-0 lg:top-[72px] h-screen lg:h-[calc(100vh-72px)] bg-slate-950 text-slate-200 border-r border-slate-800 z-50 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'w-20' : 'w-64 sm:w-72'}`}
      >
        {/* Mobile Header with Close Button */}
        <div className="p-4 border-b border-slate-800/80 flex lg:hidden items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
              BD
            </div>
            <div>
              <p className="text-xs font-bold text-white">LandTech মেনু</p>
              <p className="text-[10px] text-slate-400">BANGLADESH · DEMO</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Card */}
        <div className={`p-4 border-b border-slate-800/80 transition-all ${isCollapsed ? 'px-2 py-3' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className={`rounded-xl object-cover border-2 border-emerald-600 ${isCollapsed ? 'w-10 h-10' : 'w-11 h-11'}`}
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
            </div>

            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white truncate">
                    {language === 'bn' ? currentUser.nameBn : currentUser.name}
                  </h4>
                </div>

                <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-md ${roleConfig.badgeBg} ${roleConfig.badgeText} mt-0.5 truncate max-w-full`}>
                  {language === 'bn' ? roleConfig.nameBn : roleConfig.nameEn}
                </span>

                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {currentUser.designationBn || currentUser.designation}
                </p>
              </div>
            )}
          </div>

          {/* Quick Role Switcher Trigger Button */}
          {!isCollapsed && (
            <button
              onClick={onOpenRoleSwitcher}
              className="w-full mt-3 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ভূমিকা পরিবর্তন করুন (১০টি)' : 'Switch Role (10 Roles)'}</span>
            </button>
          )}
        </div>

        {/* Role Navigation Title */}
        {!isCollapsed && (
          <div className="px-4 pt-3 pb-1">
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
              {language === 'bn' ? 'অনুমোদিত সেবা মডিউল' : 'Authorized Services'}
            </span>
          </div>
        )}

        {/* Dynamic Navigation Items (Filtered strictly by role) */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-none">
          {roleConfig.navigation.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                title={isCollapsed ? (language === 'bn' ? item.labelBn : item.labelEn) : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                  isActive
                    ? 'bg-emerald-800 text-white font-bold shadow-md shadow-emerald-950/40 ring-1 ring-emerald-600'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                } ${isCollapsed ? 'justify-center px-2' : ''}`}
              >
                <span className={`flex-shrink-0 transition-colors ${
                  isActive ? 'text-emerald-300' : 'text-slate-400 group-hover:text-emerald-400'
                }`}>
                  {getNavIcon(item.iconName, 'w-4 h-4')}
                </span>

                {!isCollapsed && (
                  <div className="flex-1 text-left min-w-0 flex items-center justify-between">
                    <span className="truncate">
                      {language === 'bn' ? item.labelBn : item.labelEn}
                    </span>

                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold text-white uppercase ml-1.5 ${
                        item.badgeColor || 'bg-emerald-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-emerald-400 rounded-r-full"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Bar with Desktop Collapse Toggle & Helpline */}
        <div className="p-3 border-t border-slate-800/80 space-y-2 bg-slate-950/90">
          {!isCollapsed && (
            <div className="px-2 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> ১৬১২২ হেল্পলাইন
              </span>
              <span className="font-mono text-slate-500">24/7 Support</span>
            </div>
          )}

          {/* Quick Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className={`w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-900/40 transition-colors cursor-pointer ${
                isCollapsed ? 'justify-center px-1' : 'px-3'
              }`}
              title={language === 'bn' ? 'লগআউট' : 'Sign Out'}
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span>{language === 'bn' ? 'লগআউট' : 'Sign Out'}</span>}
            </button>
          )}

          {/* Desktop Collapse / Expand Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex w-full items-center justify-center p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : (
              <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                <ChevronLeft className="w-4 h-4" />
                <span>সাইডবার ছোট করুন</span>
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
