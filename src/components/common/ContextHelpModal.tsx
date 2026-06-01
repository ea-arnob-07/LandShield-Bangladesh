import React from 'react';
import { Language, UserRole } from '../../types';
import { TabType } from '../layout/NavigationTabs';
import { getRoleConfig } from '../../config/roleConfig';
import { HelpCircle, X, ExternalLink, BookOpen, ShieldCheck, PhoneCall } from 'lucide-react';

interface ContextHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabType;
  userRole: UserRole;
  language: Language;
}

export const ContextHelpModal: React.FC<ContextHelpModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  userRole,
  language
}) => {
  if (!isOpen) return null;

  const roleConfig = getRoleConfig(userRole);

  const getHelpContent = () => {
    switch (activeTab) {
      case 'DASHBOARD':
        return {
          titleBn: `${roleConfig.nameBn} ড্যাশবোর্ড নির্দেশিকা`,
          titleEn: `${roleConfig.nameEn} Dashboard Guide`,
          tipsBn: [
            'আপনার ভূমিকার জন্য অনুমোদিত কুইক অ্যাকশন বাটনে ক্লিক করে সরাসরি সেবা শুরু করুন।',
            'পরিসংখ্যান কার্ডে ক্লিক করে লাইভ কেস ও লেনদেনের অগ্রগতি পর্যবেক্ষণ করুন।',
            'প্রয়োজনে উপরে ডানপাশে ডেমো রোল সিলেক্টর দিয়ে অন্যান্য সরকারি কর্মকর্তার ইন্টারফেস পরীক্ষা করতে পারেন।'
          ],
          tipsEn: [
            'Click any role-specific Quick Action button to initiate authorized workflows.',
            'Monitor throughput, active cases, and risk metrics via the live statistics cards.',
            'Switch roles anytime via the top header profile menu to evaluate different officer viewpoints.'
          ]
        };
      case 'LAND_SEARCH_GIS':
        return {
          titleBn: 'ক্যাডাস্ট্রাল জিআইএস মানচিত্র ব্যবহার নির্দেশিকা',
          titleEn: 'Cadastral GIS Map Navigation Guide',
          tipsBn: [
            'মানচিত্রের যেকোনো দাগে ক্লিক করে উক্ত জমির বিস্তারিত ডিজিটাল প্রোফাইল ওপেন করুন।',
            'উপরে লেয়ার বাটন চেপে স্যাটেলাইট ইমেজ, দাগ বাউন্ডারি ও জিপিএস নোড অন/অফ করুন।',
            'সার্চ বারে দাগ নং বা মৌজা লিখে সরাসরি কাঙ্ক্ষিত প্লটে জুম করুন।'
          ],
          tipsEn: [
            'Click any parcel polygon on the map to inspect its ownership and risk metrics.',
            'Toggle layers for satellite view, cadastral boundary lines, and GPS corner nodes.',
            'Search Dag number or Mouza in the search bar to jump directly to the target plot.'
          ]
        };
      case 'LAND_PROFILE':
        return {
          titleBn: 'ডিজিটাল ভূমি প্রোফাইল সহায়িকা',
          titleEn: 'Digital Land Profile Guide',
          tipsBn: [
            'খতিয়ান শৃঙ্খল ট্যাবে সাবেক সিএস, এসএ, আরএস থেকে বর্তমান বিএস খতিয়ানের উত্তরাধিকার ধারাবাহিকতা যাচাই করুন।',
            'দলিল তালিকা ট্যাবে বালাম ভলিউম নম্বর ও রেজিস্ট্রি তারিখের সাথে মূল দলিলের মিল পরীক্ষা করুন।',
            'কেভিয়েট ও বিরোধ সেকশনে কোনো স্থগিতাদেশ বা দেওয়ানি মামলা নথিভুক্ত আছে কিনা নিশ্চিত হোন।'
          ],
          tipsEn: [
            'Inspect the title chain tab to verify historical ownership flow from CS/SA/RS to current BS.',
            'Cross-check deed volume and registration dates with physical registry records.',
            'Review caveat and dispute flags to ensure the title is free from civil litigation.'
          ]
        };
      case 'SMART_MUTATION':
        return {
          titleBn: 'স্মার্ট ই-নামজারি পরিচালনা নির্দেশিকা',
          titleEn: 'Smart e-Mutation Portal Guide',
          tipsBn: [
            'এসিল্যান্ড হিসেবে লগইন থাকলে "অনুমোদন করুন" বাটনে ক্লিক করে সরাসরি নতুন বিএস খতিয়ান সৃজন করা যায়।',
            'নাগরিক হিসেবে আবেদন স্থিতি ও কানুনগো তদন্ত প্রতিবেদন লাইভ ট্র্যাক করুন।',
            'অনুমোদনের পর ডিসিআর ফি পরিশোধ করে ডিজিটাল পর্চা ডাউনলোড করুন।'
          ],
          tipsEn: [
            'Logged in as AC Land? Click "Approve Mutation" to generate an official BS Khatian in 1-click.',
            'Citizens can track Kanungo inquiries, public notice periods, and hearing dates live.',
            'Download certified digital porcha upon settling official DCR fees.'
          ]
        };
      case 'LD_TAX':
        return {
          titleBn: 'ভূমি উন্নয়ন কর (LD Tax) পরিশোধ নির্দেশিকা',
          titleEn: 'Land Development Tax Portal Guide',
          tipsBn: [
            'হোল্ডিং নম্বর নির্বাচন করে বকেয়া ও বর্তমান অর্থ বছরের কর হিসাব করুন।',
            '"এখনই কর পরিশোধ করুন" বাটনে ক্লিক করে বিকাশ/কার্ড গেটওয়েতে পেমেন্ট সম্পন্ন করুন।',
            'পেমেন্টের সাথে সাথেই কিউআর কোড সম্বলিত সরকারি দাখিলা সংরক্ষণ করুন।'
          ],
          tipsEn: [
            'Select your holding to calculate arrears and statutory current demand.',
            'Click "Pay Tax Online" to simulate instant settlement via mobile banking.',
            'Immediately download the generated QR-coded official Dakhila receipt.'
          ]
        };
      default:
        return {
          titleBn: 'সেবা নির্দেশিকা ও আইনি নীতিমালা',
          titleEn: 'Service Guidelines & Regulatory Provisions',
          tipsBn: [
            'এই মডিউলে সম্পাদিত প্রতিটি পরিবর্তন সরাসরি ক্রিপ্টোগ্রাফিক অডিট লেজারে সংরক্ষিত হয়।',
            'জরুরি কোনো অসঙ্গতি দেখলে ডানদিকের হেল্পলাইন ১৬১২২ তে যোগাযোগ করুন।'
          ],
          tipsEn: [
            'Every action in this module is recorded in the SHA-256 tamper-proof ledger.',
            'For urgent assistance or clarification, contact the National Land Hotline at 16122.'
          ]
        };
    }
  };

  const help = getHelpContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? help.titleBn : help.titleEn}
              </h3>
              <span className="text-[10px] text-slate-400">
                {language === 'bn' ? 'প্রসঙ্গ সংবেদনশীল নির্দেশিকা' : 'Context-sensitive user manual'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'bn' ? 'কার্যকরী টিপস ও ধাপসমূহ:' : 'Operational Tips & Guidance:'}</span>
          </h4>

          <div className="space-y-2">
            {(language === 'bn' ? help.tipsBn : help.tipsEn).map((tip, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-800 text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
          <span className="flex items-center gap-1.5 font-semibold">
            <PhoneCall className="w-4 h-4 text-emerald-700" />
            {language === 'bn' ? 'জাতীয় ভূমি হেল্পলাইন: ১৬১২২' : 'Hotline: 16122 (24/7)'}
          </span>
          <span className="text-[10px] font-mono text-emerald-700">Toll Free</span>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all cursor-pointer"
          >
            {language === 'bn' ? 'ঠিক আছে' : 'Got it'}
          </button>
        </div>
      </div>
    </div>
  );
};
