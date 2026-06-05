import React from 'react';
import type { Language } from '../../types';
import { ArrowUpRight, CircleHelp, ExternalLink, Landmark, PhoneCall } from 'lucide-react';

interface PublicHelpSupportProps {
  language: Language;
}

export const PublicHelpSupport: React.FC<PublicHelpSupportProps> = ({ language }) => (
  <section id="help" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-9">
      <div className="max-w-3xl">
        <span className="text-xs font-extrabold tracking-widest text-emerald-700">{language === 'bn' ? 'সহায়তা ও আসল উৎস' : 'HELP AND OFFICIAL SOURCES'}</span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">{language === 'bn' ? 'বাস্তব সেবার জন্য কোথায় যাবেন' : 'Where to go for real services'}</h2>
        <p className="text-sm sm:text-base text-slate-600 mt-3">{language === 'bn' ? 'এই সাইটে কোনো আবেদন বা অভিযোগ পাঠানো হয় না। সরকারি তথ্য ও সহায়তার জন্য নিচের উৎস ব্যবহার করুন।' : 'This demo does not submit applications or complaints. Use the official sources below for real information and support.'}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <a href="https://land.gov.bd/" target="_blank" rel="noopener noreferrer" className="gov-card p-6 group border-t-4 border-t-emerald-700 block hover:border-emerald-600">
          <Landmark className="w-7 h-7 text-emerald-800" />
          <h3 className="text-base font-bold text-slate-900 mt-4">{language === 'bn' ? 'ভূমি তথ্য বাতায়ন' : 'Official land portal'}</h3>
          <p className="text-sm text-slate-600 mt-2">{language === 'bn' ? 'হালনাগাদ সরকারি সেবা, ফি, নিয়ম ও সঠিক লিংক দেখুন।' : 'Check current public services, fees, rules and links.'}</p>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-800 mt-5">land.gov.bd <ArrowUpRight size={15} /></span>
        </a>
        <a href="https://hotline.land.gov.bd/" target="_blank" rel="noopener noreferrer" className="gov-card p-6 group border-t-4 border-t-blue-600 block hover:border-blue-600">
          <PhoneCall className="w-7 h-7 text-blue-700" />
          <h3 className="text-base font-bold text-slate-900 mt-4">{language === 'bn' ? 'সরকারি ভূমি হটলাইন' : 'Official land hotline'}</h3>
          <p className="text-sm text-slate-600 mt-2">{language === 'bn' ? 'ভূমি সংক্রান্ত প্রশ্নের জন্য সরকারি হটলাইন ১৬১২২।' : 'Contact the official hotline at 16122 for land service questions.'}</p>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 mt-5">16122 <ExternalLink size={14} /></span>
        </a>
        <a href="https://hotline.land.gov.bd/crm" target="_blank" rel="noopener noreferrer" className="gov-card p-6 group border-t-4 border-t-amber-500 block hover:border-amber-500">
          <CircleHelp className="w-7 h-7 text-amber-700" />
          <h3 className="text-base font-bold text-slate-900 mt-4">{language === 'bn' ? 'অভিযোগ ও কারিগরি সহায়তা' : 'Complaints and technical help'}</h3>
          <p className="text-sm text-slate-600 mt-2">{language === 'bn' ? 'সরকারি অভিযোগ প্রতিকার ও সহায়তা পাতায় যান।' : 'Open the official complaints and support page.'}</p>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-700 mt-5">hotline.land.gov.bd <ArrowUpRight size={15} /></span>
        </a>
      </div>
    </div>
  </section>
);
