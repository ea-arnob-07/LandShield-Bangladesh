import React, { useState } from 'react';
import { Language } from '../../types';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface PublicFAQProps {
  language: Language;
}

interface FAQItem {
  questionBn: string;
  questionEn: string;
  answerBn: string;
  answerEn: string;
  category: string;
}

export const PublicFAQ: React.FC<PublicFAQProps> = ({ language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const faqs: FAQItem[] = [
    {
      category: 'MUTATION',
      questionBn: 'ই-নামজারি (e-Mutation) করতে সর্বোচ্চ কতদিন সময় লাগে?',
      questionEn: 'How long does an e-Mutation take to be finalized?',
      answerBn: 'সময়সীমা আবেদন ও যাচাইয়ের ওপর নির্ভর করে। এই ডেমোতে কেবল আবেদন অগ্রগতির নমুনা ধাপ দেখানো হয়েছে। প্রকৃত অগ্রগতি ও বর্তমান সময়সীমা সরকারি মিউটেশন সাইটে যাচাই করুন।',
      answerEn: 'Timelines vary with the application and checks. This demo only shows sample tracking steps; check the official mutation service for a real application.'
    },
    {
      category: 'MUTATION',
      questionBn: 'নামজারির সরকারি ফি কত এবং কীভাবে প্রদান করতে হয়?',
      questionEn: 'What are the official mutation fees and payment methods?',
      answerBn: 'ফি ও পরিশোধের মাধ্যম পরিবর্তন হতে পারে। ভূমি তথ্য বাতায়নের নির্ধারিত ফি পাতায় বর্তমান হার দেখুন; এই সাইটে কোনো আসল পেমেন্ট হয় না।',
      answerEn: 'Fees and payment methods may change. Check the current schedule on the official land portal; this demo does not process payments.'
    },
    {
      category: 'TAX',
      questionBn: 'অনলাইনে ভূমি উন্নয়ন কর পরিশোধ করলে কীভাবে দাখিলা পাবো?',
      questionEn: 'How do I receive the tax dakhila after paying online?',
      answerBn: 'বাস্তব ভূমি করের দাখিলা সংশ্লিষ্ট সরকারি সেবা থেকে সংগ্রহ করুন। এখানে কর ও দাখিলা স্ক্রিন কেবল নমুনা; কোনো টাকা গ্রহণ বা সরকারি রসিদ ইস্যু করা হয় না।',
      answerEn: 'Obtain real tax receipts through the official service. The tax and receipt screens here are illustrative and do not take money or issue official documents.'
    },
    {
      category: 'TAX',
      questionBn: 'কৃষি জমির ক্ষেত্রে কি ভূমি উন্নয়ন কর মওকুফ আছে?',
      questionEn: 'Is agricultural land exempt from land development tax?',
      answerBn: 'জমির ধরন, পরিমাণ ও বর্তমান বিধি অনুযায়ী কর বা অব্যাহতি নির্ধারিত হয়। নিজের হোল্ডিংয়ের সঠিক হিসাব সরকারি ভূমি উন্নয়ন কর সেবায় যাচাই করুন।',
      answerEn: 'Tax or exemption depends on the holding and current rules. Verify the calculation for your own land through the official land tax service.'
    },
    {
      category: 'LEGAL',
      questionBn: 'জমি কেনার আগে বিক্রেতার স্বত্ব ও জালিয়াতি কীভাবে যাচাই করব?',
      questionEn: 'How can I verify a seller\'s title and avoid forged deeds before buying?',
      answerBn: 'বিক্রেতার দলিল, খতিয়ান, নামজারি, কর, দখল ও সম্ভাব্য বিরোধ স্বাধীনভাবে যাচাই করুন। এই ডেমোর এআই বা স্কোর কোনো আসল দলিলের সত্যতা নিশ্চিত করে না। প্রয়োজন হলে যোগ্য পেশাদারের পরামর্শ নিন।',
      answerEn: 'Independently check deeds, records, mutation, tax, possession and disputes. Demo AI scores do not verify genuine title; seek qualified advice where needed.'
    },
    {
      category: 'LEGAL',
      questionBn: 'কেভিয়েট (Caveat) লক কী এবং এটি কেন প্রয়োজন?',
      questionEn: 'What is a Caveat Lock and why is it used?',
      answerBn: 'এখানে কেভিয়েট বা বিরোধ সতর্কতার একটি পরিকল্পিত ইন্টারফেস দেখানো হয়। এই ডেমো থেকে কোনো সরকারি নোটিশ, লক বা আইনি আদেশ জারি হয় না। বাস্তব বিরোধে সংশ্লিষ্ট কর্তৃপক্ষের সঙ্গে যোগাযোগ করুন।',
      answerEn: 'This is a concept interface for dispute alerts. It issues no legal order, registry lock or official notice; contact the relevant authority for a real dispute.'
    },
    {
      category: 'DIASPORA',
      questionBn: 'প্রবাসী বাংলাদেশিরা কি বিদেশ থেকে ভূমিসেবা গ্রহণ করতে পারবেন?',
      questionEn: 'Can non-resident Bangladeshis (NRBs) access land services from abroad?',
      answerBn: 'প্রবাসী অংশে ক্ষমতাপত্র ও জমি তদারকির নমুনা ধাপ রয়েছে। বাস্তবে দূতাবাস, সরকারি ভূমি সেবা ও প্রয়োজনীয় আইনি প্রক্রিয়া যাচাই করে পদক্ষেপ নিন।',
      answerEn: 'The diaspora section demonstrates power-of-attorney and property monitoring flows. Check actual requirements with the mission and official land services.'
    }
  ];

  const categories = [
    { id: 'ALL', labelBn: 'সকল প্রশ্নোত্তর', labelEn: 'All Questions' },
    { id: 'MUTATION', labelBn: 'ই-নামজারি', labelEn: 'e-Mutation' },
    { id: 'TAX', labelBn: 'ভূমি কর (LD Tax)', labelEn: 'Land Tax' },
    { id: 'LEGAL', labelBn: 'আইনি ও দলিল যাচাই', labelEn: 'Legal & Title' },
    { id: 'DIASPORA', labelBn: 'প্রবাসী সেবা', labelEn: 'Diaspora' }
  ];

  const filteredFaqs = faqs.filter(f => activeCategory === 'ALL' || f.category === activeCategory);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'Frequently Asked Questions'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'bn'
              ? 'নাগরিকদের সাধারণ প্রশ্নের উত্তর'
              : 'Answers to Common Land Administration Questions'}
          </h2>

          <p className="text-sm text-slate-600">
            {language === 'bn'
              ? 'সাধারণ ধারণার জন্য নমুনা উত্তর। ফি, সময়সীমা ও আইনি অবস্থার জন্য সরকারি উৎস যাচাই করুন।'
              : 'Illustrative answers. Check official sources for current fees, timelines and legal status.'}
          </p>
          <a href="https://land.gov.bd/" target="_blank" rel="noopener noreferrer" className="inline-flex text-sm font-bold text-emerald-800 underline underline-offset-4">{language === 'bn' ? 'সরকারি ভূমি তথ্য বাতায়ন ↗' : 'Official land portal ↗'}</a>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {language === 'bn' ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="gov-card overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm font-bold text-slate-900">
                    {language === 'bn' ? faq.questionBn : faq.questionEn}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {language === 'bn' ? faq.answerBn : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
