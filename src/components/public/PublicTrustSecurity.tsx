import React from 'react';
import { Language } from '../../types';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  Users,
  Fingerprint,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  FileText,
  BadgeCheck
} from 'lucide-react';

interface PublicTrustSecurityProps {
  language: Language;
}

export const PublicTrustSecurity: React.FC<PublicTrustSecurityProps> = ({ language }) => {
  const securityPillars = [
    {
      titleBn: 'যাচাইকৃত জাতীয় ভূমি রেকর্ড',
      titleEn: 'Verified Land Records Architecture',
      descBn: 'দাগ নম্বর, মৌজা ও খতিয়ানের ত্রিমাত্রিক ম্যাপিং যা সাবেক আরএস ও বর্তমান বিএস রেকর্ডের দ্বৈত অসঙ্গতি দূর করে।',
      descEn: 'Cross-verified cadastral polygons reconciling historical RS surveys with current BS digital land profiles.',
      icon: <BadgeCheck className="w-6 h-6 text-emerald-600" />
    },
    {
      titleBn: '১০ স্তরের ভূমিকাভিত্তিক নিরাপত্তা (RBAC)',
      titleEn: '10-Tier Role-Based Access Control',
      descBn: 'সাধারণ নাগরিক থেকে শুরু করে সহকারী কমিশনার (ভূমি), সাব-রেজিস্ট্রার ও দুদক অডিটর পর্যন্ত কঠোরভাবে সীমাবদ্ধ অনুমতি।',
      descEn: 'Fine-grained permission segregation from General Citizen to AC Land, Sub-Registrar, Bank Officer, and Auditor.',
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      titleBn: 'SHA-256 ক্রিপ্টোগ্রাফিক অডিট লেজার',
      titleEn: 'SHA-256 Immutable Audit Ledger',
      descBn: 'প্রতিটি মিউটেশন অনুমোদন, বায়না চুক্তি ও কর লেনদেন গাণিতিক হ্যাশ দিয়ে সিল করা হয়, ফলে পেছনের তারিখে রেকর্ড বদল অসম্ভব।',
      descEn: 'Every transaction, ownership mutation, and tax settlement is cryptographically hashed to prevent retro-editing.',
      icon: <Lock className="w-6 h-6 text-purple-600" />
    },
    {
      titleBn: 'এআই দলিল পরীক্ষা ও ওসিআর যাচাই',
      titleEn: 'AI OCR Document Integrity Lab',
      descBn: 'হাতে লেখা বা টাইপকৃত বাংলা দলিলের স্ট্যাম্প নম্বর, বালাম ভলিউম ও জালিয়াতির সংকেত স্বয়ংক্রিয়ভাবে চিহ্নিত করে।',
      descEn: 'Computer vision and NLP extracting Bengali deed data, cross-checking volume numbers, and detecting tampering.',
      icon: <Cpu className="w-6 h-6 text-amber-600" />
    },
    {
      titleBn: 'নিরাপদ ডিজিটাল এসক্রো লেনদেন',
      titleEn: 'Smart Conveyancing Escrow',
      descBn: 'জমি কেনাবেচায় প্রতারণা ঠেকাতে এসক্রো ব্যাংক ব্যবস্থার মাধ্যমে সাব-রেজিস্ট্রি দলিলের পর শর্তসাপেক্ষে অর্থ পরিশোধ।',
      descEn: 'Condition-based fund release ensuring money is transferred only after verified registration at the Sub-Registry.',
      icon: <Fingerprint className="w-6 h-6 text-teal-600" />
    },
    {
      titleBn: 'কেভিয়েট লক ও মামলা সতর্কতা',
      titleEn: 'Caveat Protection & Dispute Registry',
      descBn: 'জমিতে অননুমোদিত কেনাবেচা বা জাল ওয়ারিশ সৃষ্টি ঠেকাতে তাৎক্ষণিক ডিজিটাল লক এবং দেওয়ানি বিরোধের নোটিশ।',
      descEn: 'Instant property freeze against illicit mutation attempts with automated legal alerts to Land & Law ministries.',
      icon: <ShieldCheck className="w-6 h-6 text-red-600" />
    }
  ];

  return (
    <section id="security" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'নিরাপত্তা ও বিশ্বাসযোগ্যতা' : 'Trust, Integrity & Security'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {language === 'bn'
              ? 'ভূমি ব্যবস্থাপনায় শতভাগ স্বচ্ছতা ও আইনি সুরক্ষা'
              : 'End-to-End Transparency & Cryptographic Land Security'}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            {language === 'bn'
              ? 'প্রযুক্তির সর্বোচ্চ প্রয়োগের মাধ্যমে মধ্যস্বত্বভোগী ও জালিয়াতিমুক্ত বাংলাদেশ ভূমি সেবা ব্যবস্থা বিনির্মাণ।'
              : 'Eliminating fraudulent deeds, double registrations, and unauthorized title transfers through unified GovTech engineering.'}
          </p>
        </div>

        {/* Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/80 transition-all space-y-3.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:bg-emerald-950 group-hover:border-emerald-700 transition-colors">
                {pillar.icon}
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {language === 'bn' ? pillar.titleBn : pillar.titleEn}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'bn' ? pillar.descBn : pillar.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Transparent Simulation Notice Banner */}
        <div className="p-6 rounded-3xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-xs space-y-2 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400" />
            <span>
              {language === 'bn' ? 'স্বচ্ছতা ও সিস্টেম পরিচিতি' : 'Platform Transparency & Pilot Prototype Disclosure'}
            </span>
          </div>
          <p className="leading-relaxed text-amber-200/90 text-xs">
            {language === 'bn'
              ? 'ভূমিসেবা (BSUP) একটি সমন্বিত আর্কিটেকচারাল প্রোটোটাইপ ও পাইলট প্ল্যাটফর্ম। এখানে প্রদর্শিত ডিজিটাল লেজার, এআই ভেরিফিকেশন ও ই-নামজারি ইন্টারফেস পরীক্ষামূলক ও সিমুলেটেড ডেটা দ্বারা পরিচালিত। এটি সরাসরি কোনো রিয়েল সরকারি প্রোডাকশন ডাটাবেজের সাথে সরাসরি কানেক্টেড বলে দাবি করে না।'
              : 'BhumiSeba Unified Platform (BSUP) is an architectural enterprise demonstration and GovTech evaluation prototype. All blockchain ledgers, AI verification flows, and mutation workflows run on high-fidelity simulated test datasets designed to showcase the target national architecture.'}
          </p>
        </div>
      </div>
    </section>
  );
};
