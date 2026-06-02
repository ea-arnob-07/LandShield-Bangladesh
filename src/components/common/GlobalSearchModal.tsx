import React, { useState, useEffect, useMemo } from 'react';
import { UserProfile, Language, LandParcel } from '../../types';
import { TabType } from '../layout/NavigationTabs';
import { getRoleConfig } from '../../config/roleConfig';
import {
  Search,
  X,
  FileText,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Receipt,
  GitPullRequest,
  Building,
  Scale
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  parcels: LandParcel[];
  onNavigateTab: (tab: TabType) => void;
  onSelectParcel: (parcel: LandParcel) => void;
  language: Language;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  parcels,
  onNavigateTab,
  onSelectParcel,
  language
}) => {
  const [query, setQuery] = useState('');
  const roleConfig = getRoleConfig(currentUser.role);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Permitted nav modules
  const filteredNavItems = useMemo(() => {
    if (!query) return roleConfig.navigation;
    const q = query.toLowerCase();
    return roleConfig.navigation.filter(
      item =>
        item.labelBn.includes(q) ||
        item.labelEn.toLowerCase().includes(q) ||
        item.descriptionBn.includes(q)
    );
  }, [roleConfig.navigation, query]);

  // Filtered parcels matching query
  const filteredParcels = useMemo(() => {
    if (!query) return parcels.slice(0, 3);
    const q = query.toLowerCase();
    return parcels.filter(
      p =>
        p.landId.toLowerCase().includes(q) ||
        p.dagNo.toLowerCase().includes(q) ||
        p.khatianNo.toLowerCase().includes(q) ||
        p.mouza.toLowerCase().includes(q) ||
        p.mouzaBn.includes(q) ||
        (p.scenarioLabel && p.scenarioLabel.toLowerCase().includes(q))
    ).slice(0, 4);
  }, [parcels, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/80">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'bn'
                ? 'অনুমোদিত সেবা, দাগ নম্বর, খতিয়ান বা মৌজা সার্চ করুন...'
                : 'Search authorized services, Dag number, Khatian or Mouza...'
            }
            className="w-full bg-transparent border-none text-sm text-slate-800 focus:outline-none placeholder-slate-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-600 hidden sm:inline">
            ESC to close
          </span>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-5">
          {/* Permitted Services */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
              {language === 'bn' ? 'অনুমোদিত সেবা মডিউল' : 'Permitted Service Modules'}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredNavItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigateTab(item.id);
                    onClose();
                  }}
                  className="p-2.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200/80 hover:border-emerald-300 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-900 truncate">
                      {language === 'bn' ? item.labelBn : item.labelEn}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {item.descriptionBn}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Permitted Land Parcels */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
              {language === 'bn' ? 'সম্পর্কিত ভূমি পার্সেল ও রেকর্ড' : 'Related Land Records & Scenarios'}
            </span>

            <div className="space-y-1.5">
              {filteredParcels.map(parcel => (
                <button
                  key={parcel.landId}
                  onClick={() => {
                    onSelectParcel(parcel);
                    if (roleConfig.allowedTabs.includes('LAND_PROFILE')) {
                      onNavigateTab('LAND_PROFILE');
                    } else {
                      onNavigateTab('DASHBOARD');
                    }
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-2xl hover:bg-slate-50 border border-slate-200/60 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800 truncate">
                          {language === 'bn' ? parcel.mouzaBn : parcel.mouza}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                          দাগ: {parcel.dagNo}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">
                        খতিয়ান: {parcel.khatianNo} • {parcel.areaSatak} শতাংশ
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    parcel.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {parcel.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>{language === 'bn' ? 'নেভিগেট করতে ক্লিক করুন' : 'Click any result to navigate'}</span>
          <span className="font-mono text-[10px] bg-slate-200 px-1.5 py-0.5 rounded">
            Role: {roleConfig.nameEn}
          </span>
        </div>
      </div>
    </div>
  );
};
