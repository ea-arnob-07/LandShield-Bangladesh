import React from 'react';
import { Language } from '../../types';
import { Landmark, ShieldCheck, PhoneCall, ExternalLink, Heart } from 'lucide-react';

interface PublicFooterProps {
  language: Language;
  onNavigateSection: (sectionId: string) => void;
  onOpenLogin: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({
  language,
  onNavigateSection,
  onOpenLogin
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Upper Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Government Branding */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center border border-emerald-700/50 shadow-md">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight">
                  {language === 'bn' ? 'LANDTECH · ভূমিসেবা' : 'LANDTECH · Land Services'}
                </span>
                <span className="text-[10px] block text-emerald-400 font-mono">
                  BANGLADESH · CONCEPT DEMO
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {language === 'bn'
                ? 'ভূমি তথ্য ও সেবার একটি ধারণাগত নমুনা প্ল্যাটফর্ম। দেখানো রেকর্ড, আবেদন ও ভূমিকা কাল্পনিক; সিদ্ধান্তের জন্য মূল সরকারি উৎস যাচাই করুন।'
                : 'A concept demonstration for land information and services. Records, applications and roles are fictional; verify official sources before making decisions.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                Sample audit view
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 text-[11px]">
                <PhoneCall className="w-3 h-3 text-emerald-400" />
                Demo help
              </span>
            </div>
          </div>

          {/* Col 3: Citizen Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'প্রধান সেবাসমূহ' : 'Core Services'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('search')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'ভূমি রেকর্ড অনুসন্ধান' : 'Land Record Search'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('service-info')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'ই-নামজারি ও জমাভাগ' : 'e-Mutation & Partition'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('service-info')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'ভূমি উন্নয়ন কর (LD Tax)' : 'Land Dev Tax (LD Tax)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'খতিয়ান ও পর্চা আবেদন' : 'Certified Porcha Application'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'উত্তরাধিকার ফরায়েজ হিসাব' : 'Faraid Inheritance Calculator'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Roles */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'প্ল্যাটফর্ম ও ভূমিকা' : 'Platform & Roles'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'নাগরিক ড্যাশবোর্ড' : 'Citizen Dashboard'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'জমির মালিক পোর্টাল' : 'Land Owner Portal'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'এসিল্যান্ড ও এসআরও লগইন' : 'AC Land & SRO Login'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'ব্যাংক অফিসার ও অডিটর' : 'Bank Officer & Auditor'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('security')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? '১০টি ভূমিকা আর্কিটেকচার' : '10 Role Architecture'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal, Help & Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'bn' ? 'নীতিমালা ও সহায়তা' : 'Policy & Support'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('help')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'নাগরিক সহায়তা কেন্দ্র' : 'Citizen Help Center'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'প্রশ্নোত্তর (FAQ)' : 'FAQ & Guidelines'}
                </button>
              </li>
              <li><button onClick={() => onNavigateSection('security')} className="hover:text-white">{language === 'bn' ? 'ডেমোর সীমা ও নিরাপত্তা' : 'Demo limits and security'}</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Disclaimer Strip */}
      <div className="bg-black/50 py-5 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            {language === 'bn'
              ? '© ২০২৬ LandTech · ভূমিসেবা ডেমো। সরকারি সেবা নয়।'
              : '© 2026 LandTech · land services concept demo. Not a government service.'}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-mono">LANDTECH DEMO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
