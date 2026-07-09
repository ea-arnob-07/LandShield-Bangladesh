import React, { useState } from 'react';
import { InSARData, Language, LandParcel } from '../../types';
import { mockInSARData } from '../../data/mockData';
import {
  Waves,
  Satellite,
  Compass,
  AlertTriangle,
  Info,
  Calendar,
  Layers,
  CheckCircle2,
  TrendingDown
} from 'lucide-react';

interface InSARErosionPortalProps {
  language: Language;
}

export const InSARErosionPortal: React.FC<InSARErosionPortalProps> = ({ language }) => {
  const data: InSARData = mockInSARData[0];
  const [selectedYearIndex, setSelectedYearIndex] = useState(data.historicalTimeline.length - 1);
  const currentTimeline = data.historicalTimeline[selectedYearIndex];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="gov-card p-6 bg-gradient-to-r from-cyan-950 via-slate-900 to-emerald-950 text-white shadow-gov">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/80 border border-cyan-500/40 text-cyan-200 text-xs font-semibold mb-2">
              <Satellite className="w-3.5 h-3.5 text-cyan-300" />
              <span>{language === 'bn' ? 'স্পারসো ও সিইজিআইএস উপগ্রহ রাডার ইনসার (InSAR) মনিটরিং' : 'SPARRSO & CEGIS Satellite Radar InSAR Hub'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {language === 'bn' ? 'নদীভাঙন (সিকস্তি) ও নতুন চর (পয়স্তি) স্যাটেলাইট বিশ্লেষণ' : 'Riverine Erosion (Sikasti) & Accretion (Payasti) Radar'}
            </h2>
            <p className="text-xs text-cyan-200/80">
              {language === 'bn'
                ? 'পদ্মা, মেঘনা ও যমুনা নদীর তীরবর্তী ক্যাডাস্ট্রাল দাগের ভাঙন-পয়স্তি স্বয়ংক্রিয় পর্যবেক্ষণ ও কর মওকুফ'
                : 'Synthetic Aperture Radar temporal analysis of riverbank alluvion/diluvion under SATA 1950'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] text-cyan-300 block font-semibold">নদী অববাহিকা</span>
            <span className="font-bold text-sm text-white">{data.river}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Temporal Time-Lapse Slider & Legal Provisions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Satellite Time-Lapse Simulator */}
        <div className="lg:col-span-2 gov-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Waves className="w-4 h-4 text-cyan-700" />
                {language === 'bn' ? '৫ বছরের ঐতিহাসিক উপগ্রহ ইনসার সময়রেখা (Time-lapse)' : '5-Year InSAR Radar Time-Lapse (2021-2026)'}
              </h3>
              <p className="text-xs text-slate-500">
                মৌজা: {data.mouza} (ভূমি আইডি: {data.landId})
              </p>
            </div>
            <span className="text-xs font-mono font-black text-cyan-900 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
              বছর: {currentTimeline.year}
            </span>
          </div>

          {/* Temporal Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>২০২১ (প্রারম্ভিক অবস্থা)</span>
              <span>২০২৪ (তীব্র ভাঙন)</span>
              <span>২০২৬ (বর্তমান অবস্থা)</span>
            </div>
            <input
              type="range"
              min="0"
              max={data.historicalTimeline.length - 1}
              value={selectedYearIndex}
              onChange={(e) => setSelectedYearIndex(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-700"
            />
          </div>

          {/* Visual Radar Map Simulation Card */}
          <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between">
            {/* Water animation overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-blue-900/60 to-transparent transition-all duration-500"
              style={{
                top: `${Math.max(0, 100 - (100 - currentTimeline.waterLineOffsetMeters * 0.5))}%`
              }}
            />

            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-cyan-300 backdrop-blur-sm border border-cyan-500/30">
                SENTINEL-1 SAR TELEMETRY: {currentTimeline.year}
              </span>
              <span className="text-xs font-black text-white px-2.5 py-1 rounded-lg bg-red-600/90 backdrop-blur-sm shadow">
                {currentTimeline.riskRating}
              </span>
            </div>

            <div className="relative z-10 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs text-white max-w-sm">
              <p className="font-bold text-cyan-300">
                অক্ষত জমির পরিমাণ: {currentTimeline.landAreaSatak} শতক (মূল ৪৫ শতক)
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                ভাঙন হার: বার্ষিক ১৪.৫ মিটার | নিমজ্জিত অবস্থা: {(((45 - currentTimeline.landAreaSatak) / 45) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Legal Alluvion & Diluvion Regulations (SATA 1950) */}
        <div className="lg:col-span-1 gov-card p-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
            {language === 'bn' ? 'পয়স্তি ও সিকস্তি আইনি বিধানাবলী' : 'Sikasti Legal Framework'}
          </h3>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-3 bg-cyan-50/70 rounded-xl border border-cyan-200 space-y-1">
              <span className="font-bold text-cyan-950 block">১. সিকস্তি কর মওকুফ (Tax Relief):</span>
              <p className="text-[11px] text-cyan-900">
                নদীগর্ভে নিমজ্জিত জমির মালিক রাষ্ট্রীয় অধিগ্রহণ আইনের ৮৬ ধারা মতে ভূমি কর প্রদান থেকে রেহাই পাবেন।
              </p>
            </div>

            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-950 block">২. চর পয়স্তি স্বত্বাধিকার (Accretion Claim):</span>
              <p className="text-[11px] text-emerald-900">
                ৩০ বছরের মধ্যে চর জেগে উঠলে মূল মালিক বা তার ওয়ারিশগণ অগ্রাধিকার ভিত্তিতে বন্দোবস্ত পাওয়ার অধিকারী।
              </p>
            </div>

            <div className="p-3 bg-red-50/70 rounded-xl border border-red-200 space-y-1">
              <span className="font-bold text-red-950 block">৩. হস্তান্তর নিষেধাজ্ঞা (Sale Lock):</span>
              <p className="text-[11px] text-red-900">
                সরজমিনে অস্তিত্বহীন সিকস্তি জমি বিক্রি বা হস্তান্তর করা দণ্ডনীয় প্রতারণা।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
