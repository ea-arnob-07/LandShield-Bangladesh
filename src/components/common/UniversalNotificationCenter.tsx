import React, { useState, useMemo } from 'react';
import { PropertyAlert, Language, UserProfile } from '../../types';
import { getRoleConfig } from '../../config/roleConfig';
import {
  Bell,
  X,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  ShieldCheck,
  Server,
  Trash2
} from 'lucide-react';

interface UniversalNotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  alerts: PropertyAlert[];
  onMarkAlertRead: (id: string) => void;
  language: Language;
}

export const UniversalNotificationCenter: React.FC<UniversalNotificationCenterProps> = ({
  isOpen,
  onClose,
  currentUser,
  alerts,
  onMarkAlertRead,
  language
}) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'APPLICATION' | 'LAND' | 'PAYMENT' | 'SECURITY' | 'SYSTEM'>('ALL');
  const roleConfig = getRoleConfig(currentUser.role);

  // Role filtered notifications
  const roleAlerts = useMemo(() => {
    return alerts.filter(a =>
      a.recipientNid === currentUser.nid ||
      roleConfig.notificationKeywords.includes(a.eventType)
    );
  }, [alerts, currentUser.nid, roleConfig.notificationKeywords]);

  // Helper to categorize alerts
  const categorizeAlert = (alert: PropertyAlert): 'APPLICATION' | 'LAND' | 'PAYMENT' | 'SECURITY' | 'SYSTEM' => {
    if (alert.eventType.includes('MUTATION') || alert.eventType.includes('APPLICATION')) return 'APPLICATION';
    if (alert.eventType.includes('TAX') || alert.eventType.includes('PAYMENT')) return 'PAYMENT';
    if (alert.eventType.includes('CAVEAT') || alert.eventType.includes('SECURITY') || alert.eventType.includes('FRAUD')) return 'SECURITY';
    if (alert.eventType.includes('LAND') || alert.eventType.includes('SEARCH') || alert.eventType.includes('DEED')) return 'LAND';
    return 'SYSTEM';
  };

  const filteredAlerts = useMemo(() => {
    if (activeCategory === 'ALL') return roleAlerts;
    return roleAlerts.filter(a => categorizeAlert(a) === activeCategory);
  }, [roleAlerts, activeCategory]);

  const unreadCount = roleAlerts.filter(a => !a.isRead).length;

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              {language === 'bn' ? 'ইউনিভার্সাল নোটিফিকেশন' : 'Notifications Center'}
            </h4>
            <span className="text-[10px] text-slate-500">
              {unreadCount} {language === 'bn' ? 'টি অপঠিত বার্তা' : 'unread items'}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1 overflow-x-auto py-2.5 border-b border-slate-100 scrollbar-none text-[10px]">
        {[
          { id: 'ALL', labelBn: 'সকল', labelEn: 'All' },
          { id: 'APPLICATION', labelBn: 'আবেদন', labelEn: 'App' },
          { id: 'LAND', labelBn: 'জমি', labelEn: 'Land' },
          { id: 'PAYMENT', labelBn: 'পেমেন্ট', labelEn: 'Pay' },
          { id: 'SECURITY', labelBn: 'নিরাপত্তা', labelEn: 'Security' },
          { id: 'SYSTEM', labelBn: 'সিস্টেম', labelEn: 'System' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-2.5 py-1 rounded-full font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeCategory === cat.id
                ? 'bg-emerald-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'bn' ? cat.labelBn : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Notification Items List */}
      <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 my-1">
        {filteredAlerts.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            {language === 'bn' ? 'কোনো নোটিফিকেশন নেই' : 'No notifications in this category'}
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const category = categorizeAlert(alert);
            return (
              <div
                key={alert.id}
                onClick={() => onMarkAlertRead(alert.id)}
                className={`p-2.5 rounded-2xl cursor-pointer transition-colors space-y-1 ${
                  alert.isRead ? 'opacity-60 hover:opacity-100' : 'bg-emerald-50/50 hover:bg-emerald-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      alert.isRead ? 'bg-slate-300' : 'bg-emerald-600'
                    }`} />
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {language === 'bn' ? alert.titleBn : alert.titleEn}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 flex-shrink-0">
                    {alert.timestamp}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-snug pl-3.5">
                  {language === 'bn' ? alert.messageBn : alert.messageEn}
                </p>

                <div className="pl-3.5 pt-0.5 flex items-center gap-2">
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                    {category}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>{language === 'bn' ? 'ভূমিকা অনুযায়ী ফিল্টারকৃত' : 'Role-filtered feed'}</span>
        <button
          onClick={() => roleAlerts.forEach(a => onMarkAlertRead(a.id))}
          className="text-emerald-800 font-bold hover:underline cursor-pointer"
        >
          {language === 'bn' ? 'সবগুলো পঠিত মার্ক করুন' : 'Mark all read'}
        </button>
      </div>
    </div>
  );
};
