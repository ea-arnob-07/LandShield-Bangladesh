import React, { useState, useMemo, useEffect } from 'react';
import {
  UserProfile,
  Language,
  LandParcel,
  KhatianRecord,
  DeedRecord,
  MutationRecord,
  TaxRecord,
  EncumbranceRecord,
  CaveatRecord,
  DisputeRecord,
  PropertyAlert
} from './types';
import {
  mockUsers,
  mockParcels,
  mockKhatians,
  mockDeeds,
  mockMutations,
  mockTaxes,
  mockEncumbrances,
  mockCaveats,
  mockDisputes,
  mockAlerts
} from './data/mockData';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { TabType } from './components/layout/NavigationTabs';
import { RoleDashboardContainer } from './components/dashboard/RoleDashboardContainer';
import { AccessDenied } from './components/common/AccessDenied';
import { CadastralMap } from './components/gis/CadastralMap';
import { DigitalLandProfile } from './components/profile/DigitalLandProfile';
import { AIDocumentLab } from './components/docai/AIDocumentLab';
import { BuySellEscrowWizard } from './components/conveyancing/BuySellEscrowWizard';
import { SmartMutationDashboard } from './components/mutation/SmartMutationDashboard';
import { LDTaxPortal } from './components/tax/LDTaxPortal';
import { DisputeAndCaveatManager } from './components/disputes/DisputeAndCaveatManager';
import { AIInheritanceCalculator } from './components/faraid/AIInheritanceCalculator';
import { InSARErosionPortal } from './components/insar/InSARErosionPortal';
import { DiasporaPortal } from './components/diaspora/DiasporaPortal';
import { AuditLedgerExplorer } from './components/audit/AuditLedgerExplorer';
import { GovApiSandbox } from './components/interop/GovApiSandbox';
import { AuditLedgerService } from './services/auditLedger';
import { isTabAllowedForRole, getRoleConfig } from './config/roleConfig';

// New UX Architecture Components
import { PublicLayout } from './components/public/PublicLayout';
import { AuthModal } from './components/auth/AuthModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { Breadcrumbs } from './components/common/Breadcrumbs';
import { ContextHelpModal } from './components/common/ContextHelpModal';

// Tab to URL Path mapping
const TAB_PATH_MAP: Record<TabType, string> = {
  DASHBOARD: '/dashboard',
  LAND_SEARCH_GIS: '/land-search-gis',
  LAND_PROFILE: '/land-profile',
  BUY_SELL_ESCROW: '/buy-sell-escrow',
  DOC_AI_LAB: '/doc-ai-lab',
  SMART_MUTATION: '/smart-mutation',
  LD_TAX: '/ld-tax',
  CAVEATS_DISPUTES: '/caveats-disputes',
  FARAID_INHERITANCE: '/faraid-inheritance',
  INSAR_EROSION: '/insar-erosion',
  DIASPORA_PORTAL: '/diaspora-portal',
  AUDIT_EXPLORER: '/audit-explorer',
  GOV_API_SANDBOX: '/gov-api-sandbox',
};

const PATH_TAB_MAP: Record<string, TabType> = Object.entries(TAB_PATH_MAP).reduce(
  (acc, [tab, path]) => {
    acc[path] = tab as TabType;
    return acc;
  },
  {} as Record<string, TabType>
);

export const App: React.FC = () => {
  // Global Authentication State (null = Guest / Public Home Page)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const savedUserId = localStorage.getItem('bhumiseba_active_user_id');
      if (savedUserId) {
        const found = mockUsers.find(u => u.id === savedUserId);
        if (found) return found;
      }
    } catch (e) {
      // ignore localStorage error
    }
    return null; // Default to Guest / Public Website
  });

  const [language, setLanguage] = useState<Language>('bn'); // Default Bangla-first
  const [nightTheme, setNightTheme] = useState(() => {
    try { return localStorage.getItem('landtech_theme') === 'night'; } catch { return false; }
  });
  const [activeTab, setActiveTab] = useState<TabType>('DASHBOARD');
  const [parcels, setParcels] = useState<LandParcel[]>(mockParcels);
  const [selectedParcelId, setSelectedParcelId] = useState<string>(mockParcels[0].landId);
  const [searchQuery, setSearchQuery] = useState('');

  // Layout & Modal states
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Data states
  const [khatians, setKhatians] = useState<KhatianRecord[]>(mockKhatians);
  const [deeds, setDeeds] = useState<DeedRecord[]>(mockDeeds);
  const [mutations, setMutations] = useState<MutationRecord[]>(mockMutations);
  const [taxes, setTaxes] = useState<TaxRecord[]>(mockTaxes);
  const [encumbrances, setEncumbrances] = useState<EncumbranceRecord[]>(mockEncumbrances);
  const [caveats, setCaveats] = useState<CaveatRecord[]>(mockCaveats);
  const [disputes, setDisputes] = useState<DisputeRecord[]>(mockDisputes);
  const [alerts, setAlerts] = useState<PropertyAlert[]>(mockAlerts);

  useEffect(() => {
    document.documentElement.classList.toggle('bs-theme-night', nightTheme);
    try { localStorage.setItem('landtech_theme', nightTheme ? 'night' : 'light'); } catch { /* local preference only */ }
  }, [nightTheme]);

  // Synchronize initial URL and browser history (popstate)
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;

      if (!currentUser) {
        if (pathname === '/login') {
          setAuthModalMode('LOGIN');
          setIsAuthModalOpen(true);
        } else if (pathname === '/register') {
          setAuthModalMode('REGISTER');
          setIsAuthModalOpen(true);
        } else if (PATH_TAB_MAP[pathname]) {
          // Attempted direct URL to protected route while logged out: prompt login
          setAuthModalMode('LOGIN');
          setIsAuthModalOpen(true);
          window.history.replaceState({}, '', '/');
        }
      } else {
        // Logged in: match tab from path or default to DASHBOARD
        const matchingTab = PATH_TAB_MAP[pathname];
        if (matchingTab && isTabAllowedForRole(currentUser.role, matchingTab)) {
          setActiveTab(matchingTab);
        } else if (pathname === '/' || !matchingTab) {
          setActiveTab('DASHBOARD');
          window.history.replaceState({}, '', '/dashboard');
        }
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [currentUser]);

  // Selected Parcel Memo
  const selectedParcel = useMemo(() => {
    return parcels.find(p => p.landId === selectedParcelId) || parcels[0];
  }, [parcels, selectedParcelId]);

  // Filtered Parcels based on search query
  const filteredParcels = useMemo(() => {
    if (!searchQuery) return parcels;
    const q = searchQuery.toLowerCase();
    return parcels.filter(
      p =>
        p.landId.toLowerCase().includes(q) ||
        p.dagNo.toLowerCase().includes(q) ||
        p.khatianNo.toLowerCase().includes(q) ||
        p.mouza.toLowerCase().includes(q) ||
        p.mouzaBn.includes(q) ||
        p.currentOwners.some(o => o.name.toLowerCase().includes(q) || o.nameBn.includes(q))
    );
  }, [parcels, searchQuery]);

  // Tab Selection with browser history synchronization
  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    const path = TAB_PATH_MAP[tab] || '/dashboard';
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  // Login handler
  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('bhumiseba_active_user_id', user.id);
    } catch (e) {
      // ignore
    }

    setActiveTab('DASHBOARD');
    window.history.pushState({}, '', '/dashboard');

    AuditLedgerService.getInstance().addAuditEntry(
      user.id,
      user.role,
      user.name,
      'USER_SESSION_AUTHENTICATED',
      'ব্যবহারকারী প্রমাণীকরণ ও ভূমিকা রূপান্তর',
      'BD-SESSION-AUTH',
      `User ${user.name} logged in with role ${user.role}`,
      `ব্যবহারকারী ${user.nameBn} (${user.designationBn}) হিসেবে সিস্টেমে প্রবেশ করেছেন`
    );
  };

  // Switch role handler (when logged in)
  const handleSwitchUser = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('bhumiseba_active_user_id', user.id);
    } catch (e) {
      // ignore
    }

    // If current tab is unauthorized for the newly selected role, reset to DASHBOARD
    if (!isTabAllowedForRole(user.role, activeTab)) {
      handleSelectTab('DASHBOARD');
    }

    AuditLedgerService.getInstance().addAuditEntry(
      user.id,
      user.role,
      user.name,
      'USER_SESSION_AUTHENTICATED',
      'ব্যবহারকারী প্রমাণীকরণ ও ভূমিকা রূপান্তর',
      'BD-SESSION-AUTH',
      `User ${user.name} switched active role to ${user.role}`,
      `ব্যবহারকারী ${user.nameBn} (${user.designationBn}) হিসেবে সক্রিয় ভূমিকা পরিবর্তন করেছেন`
    );
  };

  // Logout handler (transitions immediately to Public Website)
  const handleLogout = () => {
    if (currentUser) {
      AuditLedgerService.getInstance().addAuditEntry(
        currentUser.id,
        currentUser.role,
        currentUser.name,
        'USER_SESSION_TERMINATED',
        'সেশন সমাপ্তি ও লগআউট',
        'BD-SESSION-LOGOUT',
        `User ${currentUser.name} signed out`,
        `ব্যবহারকারী ${currentUser.nameBn} নিরাপদ সেশন সমাপ্ত করে লগআউট করেছেন`
      );
    }

    setCurrentUser(null);
    try {
      localStorage.removeItem('bhumiseba_active_user_id');
    } catch (e) {
      // ignore
    }

    setActiveTab('DASHBOARD');
    window.history.pushState({}, '', '/');
  };

  const handleToggleLanguage = () => {
    setLanguage(prev => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleSelectParcel = (parcel: LandParcel) => {
    setSelectedParcelId(parcel.landId);
  };

  const handleSelectParcelByScenario = (landId: string) => {
    setSelectedParcelId(landId);
    if (currentUser && isTabAllowedForRole(currentUser.role, 'LAND_PROFILE')) {
      handleSelectTab('LAND_PROFILE');
    } else {
      handleSelectTab('DASHBOARD');
    }
  };

  const handleMarkAlertRead = (id: string) => {
    setAlerts(alerts.map(a => (a.id === id ? { ...a, isRead: true } : a)));
  };

  // Transaction Complete Flow: Updates Owner, creates new Khatian & logs
  const handleCompleteTransaction = (newOwnerName: string, newNid: string) => {
    const updatedParcels = parcels.map(p => {
      if (p.landId === selectedParcel.landId) {
        return {
          ...p,
          currentOwners: [
            {
              nid: newNid,
              name: newOwnerName,
              nameBn: newOwnerName,
              fatherHusbandName: 'Verified Heir',
              fatherHusbandNameBn: 'যাচাইকৃত স্বত্বাধিকারী',
              shareDecimal: 1.0,
              hisabShare: '১৬ আনা (সম্পূর্ণ স্বত্ব)'
            }
          ],
          khatianNo: `BS-MUT-${Date.now().toString().slice(-4)}`,
          status: 'VERIFIED' as const,
          riskScore: 4,
          riskLevel: 'LOW' as const
        };
      }
      return p;
    });

    setParcels(updatedParcels);
    if (currentUser && isTabAllowedForRole(currentUser.role, 'LAND_PROFILE')) {
      handleSelectTab('LAND_PROFILE');
    }
  };

  // AC Land Approves Mutation
  const handleApproveMutation = (caseNo: string) => {
    const updatedMutations = mutations.map(m => {
      if (m.caseNo === caseNo) {
        return {
          ...m,
          status: 'AC_LAND_APPROVED' as const,
          newKhatian: `BS-NEW-${Date.now().toString().slice(-4)}`,
          approvedAt: new Date().toLocaleString()
        };
      }
      return m;
    });
    setMutations(updatedMutations);
  };

  // Tax Paid Handler
  const handleTaxPaid = (holdingNo: string) => {
    const updatedTaxes = taxes.map(t => {
      if (t.holdingNo === holdingNo) {
        return {
          ...t,
          status: 'PAID' as const,
          arrearsBDT: 0,
          totalDueBDT: t.currentDemandBDT,
          lastPaidDate: new Date().toISOString().split('T')[0],
          dakhilaNo: `DAK-AUTO-${Date.now().toString().slice(-6)}`
        };
      }
      return t;
    });
    setTaxes(updatedTaxes);
  };

  // Lodge Caveat Handler
  const handleLodgeCaveat = (newCaveat: CaveatRecord) => {
    setCaveats([newCaveat, ...caveats]);
    setParcels(
      parcels.map(p => {
        if (p.landId === newCaveat.landId) {
          return { ...p, status: 'LOCKED_CAVEAT' as const, riskScore: 85, riskLevel: 'CRITICAL' as const };
        }
        return p;
      })
    );
  };

  // =========================================================================
  // EXPERIENCE A: BEFORE LOGIN — PUBLIC WEBSITE / HOME PAGE
  // =========================================================================
  if (!currentUser) {
    return (
      <>
        <PublicLayout
          language={language}
          onToggleLanguage={handleToggleLanguage}
          nightTheme={nightTheme}
          onToggleTheme={() => setNightTheme(value => !value)}
          onOpenLogin={() => {
            setAuthModalMode('LOGIN');
            setIsAuthModalOpen(true);
          }}
          onOpenRegister={() => {
            setAuthModalMode('REGISTER');
            setIsAuthModalOpen(true);
          }}
          parcels={parcels}
          onSelectParcel={(parcelId) => {
            setSelectedParcelId(parcelId);
            setAuthModalMode('LOGIN');
            setIsAuthModalOpen(true);
          }}
        />

        {/* Unified Authentication Modal with 10-Role Demo Switcher */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          availableUsers={mockUsers}
          onSelectUser={handleLogin}
          language={language}
          initialMode={authModalMode}
        />
      </>
    );
  }

  // =========================================================================
  // EXPERIENCE B: AFTER LOGIN — AUTHENTICATED ROLE-BASED APPLICATION
  // =========================================================================
  const isAuthorized = isTabAllowedForRole(currentUser.role, activeTab);

  return (
    <div className="bs-workspace-root min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Sticky Top Header with Role Badge, Global Search, Notifications, Profile & Logout */}
      <Header
        currentUser={currentUser}
        availableUsers={mockUsers}
        onSwitchUser={handleSwitchUser}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        nightTheme={nightTheme}
        onToggleTheme={() => setNightTheme(value => !value)}
        alerts={alerts}
        onMarkAlertRead={handleMarkAlertRead}
        parcels={parcels}
        onSelectParcelByScenario={handleSelectParcelByScenario}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogout={handleLogout}
        onOpenGlobalSearch={() => setIsGlobalSearchOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        isRoleModalOpen={isRoleModalOpen}
        onToggleRoleModal={() => setIsRoleModalOpen(prev => !prev)}
      />

      {/* Main Layout Container: Left Sidebar + Content Area */}
      <div className="flex-1 flex flex-row w-full">
        {/* Dynamic Role-Specific Left Sidebar (Collapsible & Mobile Drawer) */}
        <Sidebar
          currentUser={currentUser}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          language={language}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
          onOpenRoleSwitcher={() => setIsRoleModalOpen(true)}
          onLogout={handleLogout}
        />

        {/* Content Area */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Breadcrumb Navigation Trail */}
          <Breadcrumbs
            activeTab={activeTab}
            onNavigateTab={handleSelectTab}
            userRole={currentUser.role}
            language={language}
          />

          {/* Dynamic View Area with Access Guarding */}
          <main className="flex-1 max-w-[1650px] w-full mx-auto px-4 sm:px-8 py-6">
            {!isAuthorized ? (
              <AccessDenied
                currentUser={currentUser}
                attemptedTab={activeTab}
                onReturnToDashboard={() => handleSelectTab('DASHBOARD')}
                onOpenRoleSwitcher={() => setIsRoleModalOpen(true)}
                language={language}
              />
            ) : (
              <>
                {/* 1. ROLE-SPECIFIC DASHBOARD CONTAINER */}
                {activeTab === 'DASHBOARD' && (
                  <RoleDashboardContainer
                    currentUser={currentUser}
                    parcels={filteredParcels}
                    selectedParcel={selectedParcel}
                    onSelectParcel={handleSelectParcel}
                    onNavigateToTab={handleSelectTab}
                    language={language}
                  />
                )}

                {/* 2. LAND SEARCH & GIS CADASTRAL MAP */}
                {activeTab === 'LAND_SEARCH_GIS' && (
                  <div className="space-y-6">
                    <div className="gov-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                          {language === 'bn' ? 'স্যাটেলাইট ও নামসহ ভূমি মানচিত্র' : 'Satellite land map with place names'}
                        </h2>
                        <p className="text-xs text-slate-500">
                          {language === 'bn'
                            ? 'বাস্তব ছবি ও রাস্তার নাম দেখুন। নমুনা দাগের আঁকা স্তর চাইলে আলাদা করে চালু করুন।'
                            : 'Explore real imagery and street names. Turn on illustrative sample plots separately.'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-800 font-mono">
                          {filteredParcels.length} {language === 'bn' ? 'টি নমুনা পার্সেল' : 'sample parcels'}
                        </span>
                      </div>
                    </div>

                    <CadastralMap
                      parcels={filteredParcels}
                      selectedParcel={selectedParcel}
                      onSelectParcel={handleSelectParcel}
                      language={language}
                    />
                  </div>
                )}

                {/* 3. DIGITAL LAND PROFILE */}
                {activeTab === 'LAND_PROFILE' && (
                  <DigitalLandProfile
                    parcel={selectedParcel}
                    khatian={khatians.find(k => k.landId === selectedParcel.landId)}
                    deeds={deeds.filter(d => d.landId === selectedParcel.landId)}
                    tax={taxes.find(t => t.landId === selectedParcel.landId)}
                    encumbrances={encumbrances}
                    caveats={caveats}
                    disputes={disputes}
                    currentUser={currentUser}
                    language={language}
                    onNavigateToBuySell={() => handleSelectTab('BUY_SELL_ESCROW')}
                    onNavigateToDocAi={() => handleSelectTab('DOC_AI_LAB')}
                  />
                )}

                {/* 4. BUY/SELL CONVEYANCING & MICRO-ESCROW WIZARD */}
                {activeTab === 'BUY_SELL_ESCROW' && (
                  <BuySellEscrowWizard
                    parcel={selectedParcel}
                    currentUser={currentUser}
                    language={language}
                    onCompleteTransaction={handleCompleteTransaction}
                  />
                )}

                {/* 5. AI DOCUMENT INTELLIGENCE LAB */}
                {activeTab === 'DOC_AI_LAB' && (
                  <AIDocumentLab
                    currentParcel={selectedParcel}
                    language={language}
                  />
                )}

                {/* 6. SMART e-MUTATION HUB */}
                {activeTab === 'SMART_MUTATION' && (
                  <SmartMutationDashboard
                    mutations={mutations}
                    parcels={parcels}
                    currentUser={currentUser}
                    language={language}
                    onApproveMutation={handleApproveMutation}
                  />
                )}

                {/* 7. LAND DEVELOPMENT TAX (LD TAX) */}
                {activeTab === 'LD_TAX' && (
                  <LDTaxPortal
                    parcels={parcels}
                    selectedParcel={selectedParcel}
                    taxRecords={taxes}
                    currentUser={currentUser}
                    language={language}
                    onTaxPaid={handleTaxPaid}
                  />
                )}

                {/* 8. CAVEATS & DISPUTES */}
                {activeTab === 'CAVEATS_DISPUTES' && (
                  <DisputeAndCaveatManager
                    parcels={parcels}
                    selectedParcel={selectedParcel}
                    caveats={caveats}
                    disputes={disputes}
                    currentUser={currentUser}
                    language={language}
                    onLodgeCaveat={handleLodgeCaveat}
                  />
                )}

                {/* 9. AI INHERITANCE & FARAID PARTITION */}
                {activeTab === 'FARAID_INHERITANCE' && (
                  <AIInheritanceCalculator
                    parcel={selectedParcel}
                    language={language}
                  />
                )}

                {/* 10. InSAR RIVERINE EROSION & PAYASTI */}
                {activeTab === 'INSAR_EROSION' && (
                  <InSARErosionPortal language={language} />
                )}

                {/* 11. DIASPORA PORTAL & CONSULAR POA */}
                {activeTab === 'DIASPORA_PORTAL' && (
                  <DiasporaPortal
                    currentUser={currentUser}
                    selectedParcel={selectedParcel}
                    language={language}
                  />
                )}

                {/* 12. SHA-256 AUDIT LEDGER EXPLORER */}
                {activeTab === 'AUDIT_EXPLORER' && (
                  <AuditLedgerExplorer language={language} />
                )}

                {/* 13. GOVTECH API SANDBOX */}
                {activeTab === 'GOV_API_SANDBOX' && (
                  <GovApiSandbox language={language} />
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Authenticated GovTech Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
              BD
            </div>
            <div>
              <p className="text-white font-bold">
                {language === 'bn' ? 'LandTech · ভূমিসেবা কর্মক্ষেত্র' : 'LandTech · Land Services Workspace'}
              </p>
              <p className="text-[11px] text-slate-500">
                {language === 'bn'
                  ? 'ধারণাগত ডেমো · সরকারি রেকর্ড বা আইনি সীমানা নয়'
                  : 'Concept demo · no official records or legal boundaries'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="text-emerald-400 font-mono">LANDTECH · DEMO</span>
          </div>
        </div>
      </footer>

      {/* Omni-Search Global Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        currentUser={currentUser}
        parcels={parcels}
        onNavigateTab={handleSelectTab}
        onSelectParcel={handleSelectParcel}
        language={language}
      />

      {/* Context-Sensitive Help Modal */}
      <ContextHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        activeTab={activeTab}
        userRole={currentUser.role}
        language={language}
      />
    </div>
  );
};

export default App;
