import React, { useState } from 'react';
import { Language } from '../../types';
import {
  GitPullRequest,
  CheckCircle2,
  Clock,
  UserCheck,
  FileText,
  X,
  ArrowRight,
  ShieldCheck,
  Download
} from 'lucide-react';

interface ApplicationTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  caseNo?: string;
  onDownloadPorcha?: () => void;
}

export const ApplicationTimelineModal: React.FC<ApplicationTimelineModalProps> = ({
  isOpen,
  onClose,
  language,
  caseNo = 'MUT-SAV-2026-902',
  onDownloadPorcha
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      stepNo: 1,
      titleBn: 'আবেদন দাখিল ও কোর্ট ফি গ্রহণ',
      titleEn: 'Application Submitted & Fee Acknowledged',
      date: '০২ সেপ্টেম্বর ২০২৬, ১০:৩০ পূর্বাহ্ন',
      officerBn: 'ডিজিটাল গেটওয়ে (অটোমেটেড)',
      officerEn: 'Digital Gateway (Automated)',
      status: 'COMPLETED'
    },
    {
      stepNo: 2,
      titleBn: 'প্রাথমিক যাচাই ও ইউনিয়ন ভূমি নায়েব প্রস্তাব',
      titleEn: 'Union Land Officer (Nayeb) Verification',
      date: '০৫ সেপ্টেম্বর ২০২৬, ০২:১৫ অপরাহ্ন',
      officerBn: 'ইউনিয়ন ভূমি সহকারী কর্মকর্তা, সাভার',
      officerEn: 'Union Land Sub-Officer, Savar',
      status: 'COMPLETED'
    },
    {
      stepNo: 3,
      titleBn: 'কানুনগো সিলসিলা অডিট ও সার্ভেয়ার সীমানা রিপোর্ট',
      titleEn: 'Kanungo Title Chain & Field Survey',
      date: '১২ সেপ্টেম্বর ২০২৬, ১১:৪৫ পূর্বাহ্ন',
      officerBn: 'উপজেলা কানুনগো ও সার্ভেয়ার সেল',
      officerEn: 'Upazila Kanungo & Surveyor Cell',
      status: 'COMPLETED'
    },
    {
      stepNo: 4,
      titleBn: 'সহকারী কমিশনার (ভূমি) দ্বারা চূড়ান্ত অনুমোদন',
      titleEn: 'AC Land Formal Hearing & Approval',
      date: '১৮ সেপ্টেম্বর ২০২৬, ০৩:০০ অপরাহ্ন',
      officerBn: 'সৈয়দা ফারহানা, বিসিএস (সহকারী কমিশনার)',
      officerEn: 'Syeda Farhana, BCS (Assistant Commissioner)',
      status: 'COMPLETED'
    },
    {
      stepNo: 5,
      titleBn: 'ডিসিআর পরিশোধ ও বিএস খতিয়ান হস্তান্তর',
      titleEn: 'DCR Settlement & Certified Porcha Issuance',
      date: '১৯ সেপ্টেম্বর ২০২৬, ০৯:২০ পূর্বাহ্ন',
      officerBn: 'সিস্টেম জেনারেটেড কিউআর কোড রেকর্ড',
      officerEn: 'System-Generated QR Khatian Record',
      status: 'COMPLETED'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <GitPullRequest className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'ই-নামজারি ট্র্যাকিং টাইমলাইন' : 'Mutation Tracking Timeline'}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Case No: {caseNo}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 relative">
              {/* Connector line */}
              {idx !== steps.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-emerald-300" />
              )}

              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 z-10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              </div>

              <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {language === 'bn' ? step.titleBn : step.titleEn}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {language === 'bn' ? 'সম্পন্ন' : 'Completed'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500">
                  {language === 'bn' ? step.officerBn : step.officerEn}
                </p>

                <span className="text-[10px] text-slate-400 font-mono block">
                  {step.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            {language === 'bn' ? 'এসিল্যান্ড অনুমোদিত ডিজিটাল রেকর্ড' : 'AC Land Verified Digital Porcha'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
            <button
              onClick={() => {
                if (onDownloadPorcha) onDownloadPorcha();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'পর্চা ডাউনলোড' : 'Download Porcha'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
