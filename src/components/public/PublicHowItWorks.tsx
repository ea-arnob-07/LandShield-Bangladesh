import React from 'react';
import { Language } from '../../types';
import {
  Search,
  CheckCircle2,
  FileText,
  GitPullRequest,
  Award,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';

interface PublicHowItWorksProps {
  language: Language;
  onOpenLogin: () => void;
  onStartSearch: () => void;
}

export const PublicHowItWorks: React.FC<PublicHowItWorksProps> = ({
  language,
  onOpenLogin,
  onStartSearch
}) => {
  const steps = [
    {
      stepNo: '০১',
      stepNoEn: '01',
      titleBn: 'অনুসন্ধান ও প্রাথমিক যাচাই',
      titleEn: 'Search & Initial Discovery',
      descBn: 'মৌজা, দাগ নং ও খতিয়ান নম্বর দিয়ে সরকারি ডিজিটাল আর্কাইভে জমির বর্তমান রেকর্ড, অবস্থান ও প্রাথমিক হিস্যা অনুসন্ধান করুন।',
      descEn: 'Search current land records, physical parcel bounds, and base Khatian shares in the national digital archive.',
      icon: <Search className="w-6 h-6 text-emerald-600" />,
      timeBn: 'তাৎক্ষণিক (২ মিনিট)',
      timeEn: 'Instant (2 mins)',
      badgeBn: 'পাবলিক ফ্রি সার্ভিস',
      badgeEn: 'Free Public Tool'
    },
    {
      stepNo: '০২',
      stepNoEn: '02',
      titleBn: 'স্বত্ব ও বৈধতা নিশ্চিতকরণ',
      titleEn: 'Title & Encumbrance Verification',
      descBn: 'দলিলের সত্যতা, নামজারি ধারাবাহিকতা, কোনো ব্যাংক ঋণ (লিয়েন) বা আদালতের কেভিয়েট/নিষেধাজ্ঞা আছে কিনা এআই এর মাধ্যমে পরীক্ষা করুন।',
      descEn: 'AI document validation of deed genuine chain, checking mortgage liens, and verifying no civil court caveats exist.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      timeBn: '৫ মিনিট',
      timeEn: '5 mins',
      badgeBn: 'জালিয়াতি রোধ',
      badgeEn: 'Fraud Prevention'
    },
    {
      stepNo: '০৩',
      stepNoEn: '03',
      titleBn: 'অনলাইন আবেদন ও নথি জমাদান',
      titleEn: 'Digital Filing & Submission',
      descBn: 'এনআইডি ও বায়োমেট্রিক নিশ্চিত করে ই-নামজারি, ভূমি উন্নয়ন কর বা পর্চার জন্য নির্ধারিত ফি পরিশোধপূর্বক অনলাইনে আবেদন দাখিল করুন।',
      descEn: 'File paperless petitions for e-Mutation, LD Tax, or certified porchas with verified NID and official digital fee deposit.',
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      timeBn: '১০ মিনিট',
      timeEn: '10 mins',
      badgeBn: 'কাগজবিহীন',
      badgeEn: 'Paperless Filing'
    },
    {
      stepNo: '০৪',
      stepNoEn: '04',
      titleBn: 'ফিল্ড পরিদর্শন ও লাইভ ট্র্যাকিং',
      titleEn: 'Field Inspection & Live Tracking',
      descBn: 'সার্ভেয়ার ও কানুনগোর সরেজমিন তদন্ত, এসিল্যান্ড শুনানি ও ধাপভিত্তিক অগ্রগতি আপনার মোবাইল এসএমএস ও ড্যাশবোর্ডে ট্র্যাক করুন।',
      descEn: 'Track field kanungo verification, public hearing notices, and approval status in real-time via SMS and dashboard.',
      icon: <GitPullRequest className="w-6 h-6 text-amber-600" />,
      timeBn: '৭-২৮ কার্যদিবস',
      timeEn: '7-28 Business Days',
      badgeBn: 'লাইভ মনিটরিং',
      badgeEn: 'Live Tracking'
    },
    {
      stepNo: '০৫',
      stepNoEn: '05',
      titleBn: 'অনুমোদন ও ডিজিটাল পর্চা হস্তান্তর',
      titleEn: 'Approval & Digital Porcha Issuance',
      descBn: 'সহকারী কমিশনার (ভূমি) এর অনুমোদনের পর অনলাইনে ডিসিআর প্রদান এবং কিউআর কোড ও হ্যাশযুক্ত স্থায়ী খতিয়ান ডাউনলোড করুন।',
      descEn: 'Receive AC Land formal approval, clear official DCR receipt, and download tamper-proof QR-coded BS Khatian copy.',
      icon: <Award className="w-6 h-6 text-emerald-800" />,
      timeBn: 'তাৎক্ষণিক ডাউনলোড',
      timeEn: 'Instant Download',
      badgeBn: 'সরকারি সার্টিফাইড',
      badgeEn: 'Legally Binding'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/50 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'কার্যপদ্ধতি রূপরেখা' : 'Step-by-Step Workflow'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {language === 'bn' ? (
              <>
                মাত্র ৫টি সহজ ধাপে সম্পন্ন করুন আপনার <span className="text-emerald-400">ভূমিসেবা</span>
              </>
            ) : (
              <>
                Complete Your Land Services in <span className="text-emerald-400">5 Seamless Steps</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {language === 'bn'
              ? 'অনুসন্ধান থেকে শুরু করে দলিল যাচাই, আবেদন, ফিল্ড তদন্ত এবং চূড়ান্ত নামজারি খতিয়ান প্রাপ্তি — পুরো প্রক্রিয়া শতভাগ ডিজিটাল।'
              : 'From initial search to document vetting, digital submission, live tracking, and final porcha issuance — completely transparent.'}
          </p>
        </div>

        {/* Process Steps Visual Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 border border-slate-700 rounded-3xl p-5 flex flex-col justify-between hover:border-emerald-500 hover:bg-slate-800 transition-all group relative space-y-4"
            >
              {/* Step Header */}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-emerald-400/80 font-mono group-hover:text-emerald-300 transition-colors">
                  {language === 'bn' ? step.stepNo : step.stepNoEn}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {language === 'bn' ? step.badgeBn : step.badgeEn}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:border-emerald-500 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {language === 'bn' ? step.titleBn : step.titleEn}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'bn' ? step.descBn : step.descEn}
                </p>
              </div>

              {/* Timeframe */}
              <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {language === 'bn' ? step.timeBn : step.timeEn}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900/90 to-slate-800/90 border border-emerald-700/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white">
              {language === 'bn'
                ? 'আপনার কাঙ্ক্ষিত জমির তথ্য যাচাই করতে প্রস্তুত?'
                : 'Ready to verify or apply for your land services?'}
            </h4>
            <p className="text-xs text-emerald-200 mt-0.5">
              {language === 'bn'
                ? 'এখনই বিনামূল্যে সার্চ করুন অথবা পূর্ণাঙ্গ সেবা গ্রহণের জন্য লগইন করুন।'
                : 'Search now for free or log in to access your role-based workflow.'}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onStartSearch}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{language === 'bn' ? 'সার্চ শুরু করুন' : 'Start Search'}</span>
            </button>

            <button
              onClick={onOpenLogin}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
            >
              <span>{language === 'bn' ? 'লগইন করুন' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
