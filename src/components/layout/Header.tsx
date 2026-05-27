import React, { useState } from 'react';
import { UserRole, UserProfile, Language, PropertyAlert, LandParcel } from '../../types';
import { getTranslation } from '../../utils/translations';
import { getRoleConfig } from '../../config/roleConfig';
import { UniversalNotificationCenter } from '../common/UniversalNotificationCenter';
import {
  Globe,
  Moon,
  Sun,
  Bell,
  Search,
  ShieldCheck,
  UserCheck,
  Sparkles,
  ChevronDown,
  CheckCircle,
  Landmark,
  Menu,
  X,
  LogOut,
  HelpCircle,
  Fingerprint
} from 'lucide-react';

interface HeaderProps {
  currentUser: UserProfile;
  availableUsers: UserProfile[];
  onSwitchUser: (user: UserProfile) => void;
  language: Language;
  onToggleLanguage: () => void;
  nightTheme: boolean;
  onToggleTheme: () => void;
  alerts: PropertyAlert[];
  onMarkAlertRead: (id: string) => void;
  parcels: LandParcel[];
  onSelectParcelByScenario: (landId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLogout: () => void;
  onOpenGlobalSearch?: () => void;
  onOpenHelp?: () => void;
  onToggleMobileSidebar?: () => void;
  isRoleModalOpen?: boolean;
  onToggleRoleModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  availableUsers,
  onSwitchUser,
  language,
  onToggleLanguage,
  nightTheme,
  onToggleTheme,
  alerts,
  onMarkAlertRead,
  parcels,
  onSelectParcelByScenario,
  searchQuery,
  onSearchChange,
  onLogout,
  onOpenGlobalSearch,
  onOpenHelp,
  onToggleMobileSidebar,
  isRoleModalOpen: externalRoleModalOpen,
  onToggleRoleModal
}) => {
  const [internalRoleOpen, setInternalRoleOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isScenarioDropdownOpen, setIsScenarioDropdownOpen] = useState(false);

  const isRoleDropdownOpen = externalRoleModalOpen !== undefined ? externalRoleModalOpen : internalRoleOpen;
  const setIsRoleDropdownOpen = (open: boolean) => {
    if (onToggleRoleModal) {
      onToggleRoleModal();
    } else {
      setInternalRoleOpen(open);
    }
  };

  const roleConfig = getRoleConfig(currentUser.role);

  // Filter alerts by role
  const roleAlerts = alerts.filter(a =>
    a.recipientNid === currentUser.nid ||
    roleConfig.notificationKeywords.includes(a.eventType)
  );
  const unreadAlertsCount = roleAlerts.filter(a => !a.isRead).length;

  return (
    <header className="bs-app-header sticky top-0 z-40 bg-[#0d1411] text-white border-l-[5px] border-[#ef3962] shadow-sm">
      {/* Main Header Bar */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 py-3 min-h-[72px]">
        <div className="flex items-center justify-between gap-3 md:gap-5">
          {/* Left: Mobile Hamburger & Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {onToggleMobileSidebar && (
              <button
                onClick={onToggleMobileSidebar}
                className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                title="Open Role Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Logo */}
            <div className="relative flex-shrink-0 w-10 h-10 bg-[#07624d] flex items-center justify-center text-[#dffaf0] border-l-2 border-[#ef3962]"><ShieldCheck className="w-6 h-6" /></div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1.5"><span>LANDTECH</span><span className="text-[9px] px-1.5 py-0.5 bg-[#1e5240] text-[#b7f3d9] font-black uppercase font-mono tracking-wider">DEMO</span></h1>
              </div>
              <p className="text-[10px] text-[#a4baaf] font-bold tracking-[.15em] hidden sm:block">{language === 'bn' ? 'BANGLADESH · ভূমি কর্মক্ষেত্র' : 'BANGLADESH · LAND WORKSPACE'}</p>
            </div>
          </div>

          {/* Center: Global Search Bar with Ctrl+K trigger */}
          <div className="hidden lg:flex flex-1 max-w-sm relative">
            <div
              onClick={onOpenGlobalSearch}
              className="relative w-full cursor-pointer group"
            >
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-emerald-700 transition-colors" />
              <input
                type="text"
                readOnly
                placeholder={getTranslation(language, 'searchPlaceholder')}
                className="bs-app-search w-full pl-9 pr-14 py-1.5 border rounded-xl text-xs cursor-pointer"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-500 shadow-2xs">
                Ctrl+K
              </span>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Demo Scenario Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsScenarioDropdownOpen(!isScenarioDropdownOpen);
                  if (isRoleDropdownOpen) setIsRoleDropdownOpen(false);
                  setIsAlertsOpen(false);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden md:inline">{getTranslation(language, 'quickScenario')}</span>
                <ChevronDown className="w-3 h-3 text-amber-700" />
              </button>

              {isScenarioDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">
                      {language === 'bn' ? '১০টি বাস্তবসম্মত ডেমো দৃশ্যপট' : '10 Realistic Bangladesh Scenarios'}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {language === 'bn' ? 'যেকোনো দৃশ্যপট নির্বাচন করে প্ল্যাটফর্ম পরীক্ষা করুন' : 'Select a scenario to evaluate land ecosystem behavior'}
                    </p>
                  </div>
                  <div className="max-h-80 overflow-y-auto py-1 space-y-1">
                    {parcels.map((p, idx) => (
                      <button
                        key={p.landId}
                        onClick={() => {
                          onSelectParcelByScenario(p.landId);
                          setIsScenarioDropdownOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-2 group cursor-pointer"
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5 ${
                          p.riskScore > 60 ? 'bg-red-500' : p.riskScore > 30 ? 'bg-amber-500' : 'bg-emerald-600'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-800">
                            {p.scenarioLabel || p.mouzaBn}
                          </p>
                          <p className="text-[10px] text-slate-500 line-clamp-1">
                            {p.scenarioDescription}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Context Help Button */}
            {onOpenHelp && (
              <button
                onClick={onOpenHelp}
                className="bs-app-control p-2 rounded-xl transition-colors cursor-pointer"
                title={language === 'bn' ? 'পৃষ্ঠা নির্দেশিকা' : 'Context Help'}
              >
                <HelpCircle className="w-4 h-4 text-emerald-800" />
              </button>
            )}

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="bs-app-control px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Toggle English / বাংলা"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-800" />
              <span>{getTranslation(language, 'switchLanguage')}</span>
            </button>

            <button onClick={onToggleTheme} className="bs-app-icon-control p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700" aria-label={nightTheme ? (language === 'bn' ? 'দিনের থিম' : 'Light theme') : (language === 'bn' ? 'রাতের থিম' : 'Night theme')}>
              {nightTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Universal Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsAlertsOpen(!isAlertsOpen);
                  if (isRoleDropdownOpen) setIsRoleDropdownOpen(false);
                  setIsScenarioDropdownOpen(false);
                }}
                className="bs-app-control relative p-2 rounded-xl transition-all cursor-pointer"
                title="Role Notifications"
              >
                <Bell className="w-4 h-4 text-slate-700" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>

              <UniversalNotificationCenter
                isOpen={isAlertsOpen}
                onClose={() => setIsAlertsOpen(false)}
                currentUser={currentUser}
                alerts={alerts}
                onMarkAlertRead={onMarkAlertRead}
                language={language}
              />
            </div>

            {/* Role Switcher & User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsRoleDropdownOpen(!isRoleDropdownOpen);
                  setIsAlertsOpen(false);
                  setIsScenarioDropdownOpen(false);
                }}
                className="bs-app-user flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-2xl text-left transition-all cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-xl object-cover border border-emerald-600"
                />
                <div className="hidden sm:block text-left leading-tight">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-emerald-950 truncate max-w-[120px]">
                      {language === 'bn' ? currentUser.nameBn : currentUser.name}
                    </p>
                  </div>
                  <span className={`inline-block text-[9px] font-black px-1.5 py-0.2 rounded ${roleConfig.badgeBg} ${roleConfig.badgeText}`}>
                    {language === 'bn' ? roleConfig.nameBn : roleConfig.nameEn}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-800 ml-0.5" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {language === 'bn' ? '১০টি ভিন্ন ভিন্ন ভূমিকা নির্বাচন করুন' : 'Switch Role (10 Available Roles)'}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {language === 'bn' ? 'ভূমিকা পরিবর্তনের সাথে সাথে ড্যাশবোর্ড ও মেনু সম্পূর্ণ বদলে যাবে' : 'Every role features a unique dashboard, sidebar & permissions'}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsRoleDropdownOpen(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto py-1 space-y-1">
                    {availableUsers.map(user => {
                      const isActive = user.id === currentUser.id;
                      const uConfig = getRoleConfig(user.role);
                      return (
                        <button
                          key={user.id}
                          onClick={() => {
                            onSwitchUser(user);
                            setIsRoleDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                            isActive ? 'bg-emerald-50 text-emerald-950 border border-emerald-300 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold truncate">
                                {language === 'bn' ? user.nameBn : user.name}
                              </p>
                              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded ${uConfig.badgeBg} ${uConfig.badgeText}`}>
                                {language === 'bn' ? uConfig.nameBn : uConfig.nameEn}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 truncate mt-0.5">
                              {language === 'bn' ? user.designationBn : user.designation}
                            </p>
                          </div>
                          {isActive && <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Dropdown Footer with Quick Sign Out */}
                  <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between px-2">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {language === 'bn' ? 'নমুনা প্রোফাইল' : 'Sample profile'}
                    </span>
                    <button
                      onClick={() => {
                        setIsRoleDropdownOpen(false);
                        onLogout();
                      }}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'লগআউট' : 'Sign Out'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Standalone Logout Button */}
            <button
              onClick={onLogout}
              className="bs-app-control px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              title={language === 'bn' ? 'লগআউট করে পাবলিক ওয়েবসাইটে যান' : 'Logout to Public Website'}
            >
              <LogOut className="w-4 h-4 text-red-600" />
              <span className="hidden lg:inline">{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
