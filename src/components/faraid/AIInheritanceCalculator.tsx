import React, { useState } from 'react';
import { HeirInput, Language, LandParcel } from '../../types';
import { FaraidInheritanceEngine } from '../../services/faraidEngine';
import {
  GitFork,
  Users,
  Plus,
  Trash2,
  Sparkles,
  Info,
  Layers,
  CheckCircle2,
  PieChart
} from 'lucide-react';

interface AIInheritanceCalculatorProps {
  parcel: LandParcel;
  language: Language;
}

export const AIInheritanceCalculator: React.FC<AIInheritanceCalculatorProps> = ({
  parcel,
  language
}) => {
  const [totalLandSatak, setTotalLandSatak] = useState<number>(parcel.areaSatak || 40.0);
  const [deceasedGender, setDeceasedGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [heirs, setHeirs] = useState<HeirInput[]>([
    { id: '1', relation: 'WIFE', count: 1 },
    { id: '2', relation: 'SON', count: 2 },
    { id: '3', relation: 'DAUGHTER', count: 3 }
  ]);

  const faraidResult = FaraidInheritanceEngine.calculateFaraid(deceasedGender, totalLandSatak, heirs);

  const handleAddHeir = (relation: HeirInput['relation']) => {
    const existing = heirs.find(h => h.relation === relation);
    if (existing) {
      setHeirs(heirs.map(h => h.relation === relation ? { ...h, count: h.count + 1 } : h));
    } else {
      setHeirs([...heirs, { id: Date.now().toString(), relation, count: 1 }]);
    }
  };

  const handleUpdateCount = (id: string, newCount: number) => {
    if (newCount <= 0) {
      setHeirs(heirs.filter(h => h.id !== id));
    } else {
      setHeirs(heirs.map(h => h.id === id ? { ...h, count: newCount } : h));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="gov-card p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white shadow-gov">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold mb-2">
              <GitFork className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'bn' ? 'এআই চালিত ইসলামিক ফরায়েজ ও বাটোয়ারা বণ্টন' : 'AI Islamic Faraid & Estate Partition Engine'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {language === 'bn' ? 'উত্তরাধিকার হিস্যা ও শারীরিক প্লট বণ্টন' : 'Inheritance Equity & Physical Plot Partition'}
            </h2>
            <p className="text-xs text-emerald-200/80">
              {language === 'bn'
                ? 'মুসলিম পারিবারিক উত্তরাধিকার আইন ও শরীয়ত বিধি অনুযায়ী নির্ভুল আনা-গণ্ডা ও শতক হিস্যা গণনা'
                : 'Quranic Sharers (Zawil-Furood) and Residuaries (Asabah) calculation with traditional Bengali Hisab'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] text-emerald-300 block font-semibold">বণ্টনযোগ্য মোট জমি</span>
            <span className="font-mono text-base font-black text-white">{totalLandSatak} Satak</span>
          </div>
        </div>
      </div>

      {/* Main Calculation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Heir Matrix */}
        <div className="lg:col-span-1 gov-card p-5 space-y-5">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
            {language === 'bn' ? 'মৃত ব্যক্তি ও ওয়ারিশান ইনপুট' : 'Deceased & Legal Heirs Input'}
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                {language === 'bn' ? 'মৃত ব্যক্তির লিঙ্গ' : 'Deceased Gender'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDeceasedGender('MALE')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    deceasedGender === 'MALE' ? 'bg-emerald-800 text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {language === 'bn' ? 'পুরুষ (স্বামী / পিতা)' : 'Male (Husband / Father)'}
                </button>
                <button
                  onClick={() => setDeceasedGender('FEMALE')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    deceasedGender === 'FEMALE' ? 'bg-emerald-800 text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {language === 'bn' ? 'মহিলা (স্ত্রী / মাতা)' : 'Female (Wife / Mother)'}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                {language === 'bn' ? 'মোট জমির পরিমাণ (শতক)' : 'Total Land Area (Satak)'}
              </label>
              <input
                type="number"
                value={totalLandSatak}
                onChange={(e) => setTotalLandSatak(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold font-mono focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            {/* Heir Selector Buttons */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                {language === 'bn' ? 'ওয়ারিশ যোগ করুন' : 'Add Legal Heir'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {deceasedGender === 'MALE' && (
                  <button
                    onClick={() => handleAddHeir('WIFE')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 hover:bg-emerald-100"
                  >
                    + স্ত্রী (Wife)
                  </button>
                )}
                {deceasedGender === 'FEMALE' && (
                  <button
                    onClick={() => handleAddHeir('HUSBAND')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 hover:bg-emerald-100"
                  >
                    + স্বামী (Husband)
                  </button>
                )}
                <button
                  onClick={() => handleAddHeir('SON')}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200 hover:bg-blue-100"
                >
                  + পুত্র (Son)
                </button>
                <button
                  onClick={() => handleAddHeir('DAUGHTER')}
                  className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 text-[11px] font-bold border border-purple-200 hover:bg-purple-100"
                >
                  + কন্যা (Daughter)
                </button>
                <button
                  onClick={() => handleAddHeir('MOTHER')}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200 hover:bg-amber-100"
                >
                  + মাতা (Mother)
                </button>
                <button
                  onClick={() => handleAddHeir('FATHER')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-300 hover:bg-slate-200"
                >
                  + পিতা (Father)
                </button>
              </div>
            </div>

            {/* Active Heirs List */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              {heirs.map(h => (
                <div key={h.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-800">
                    {h.relation === 'WIFE' ? 'স্ত্রী' :
                     h.relation === 'HUSBAND' ? 'স্বামী' :
                     h.relation === 'SON' ? 'পুত্র' :
                     h.relation === 'DAUGHTER' ? 'কন্যা' :
                     h.relation === 'MOTHER' ? 'মাতা' : 'পিতা'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateCount(h.id, h.count - 1)}
                      className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="font-bold font-mono text-slate-900 w-4 text-center">{h.count}</span>
                    <button
                      onClick={() => handleUpdateCount(h.id, h.count + 1)}
                      className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Calculated Faraid Table & Physical Plot Partition Visualizer */}
        <div className="lg:col-span-2 gov-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'ফরায়েজ হিস্যা বণ্টন ফলাফল ও খতিয়ান নোটিফিকেশন' : 'Faraid Inheritance Distribution Table'}
              </h3>
              <p className="text-xs text-slate-500">
                {faraidResult.summaryBn}
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-mono">
              নমুনা হিস্যা গণনা
            </span>
          </div>

          {/* Distribution Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">উত্তরাধিকারী</th>
                  <th className="p-3">সংখ্যা</th>
                  <th className="p-3">হিস্যা অনুপাত</th>
                  <th className="p-3">ঐতিহ্যবাহী হিসেব</th>
                  <th className="p-3">মাথাপিছু জমি (শতক)</th>
                  <th className="p-3">মোট অংশ (শতক)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {faraidResult.shares.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                      {s.relationBn}
                    </td>
                    <td className="p-3 font-mono">{s.count} জন</td>
                    <td className="p-3 font-mono text-emerald-900 font-bold">{s.shareFraction}</td>
                    <td className="p-3 font-bold text-slate-900">{s.hisabNotation}</td>
                    <td className="p-3 font-mono font-bold text-emerald-950">{s.satakPerPerson} শতক</td>
                    <td className="p-3 font-mono font-black text-slate-900">{s.totalSatak} শতক</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visual Physical Plot Divider Simulation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-800" />
              {language === 'bn' ? 'প্রস্তাবিত শারীরিক দাগ বাটোয়ারা ও সীমানা রূপরেখা' : 'Proposed Physical Boundary Partition Layout'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {faraidResult.partitionPlots.map((plot, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 text-xs space-y-1 shadow-sm"
                  style={{ borderLeftColor: plot.color, borderLeftWidth: '6px' }}
                >
                  <span className="font-bold text-slate-900 block">{plot.plotLabel}</span>
                  <p className="text-slate-600 text-[11px]">{plot.heirName}</p>
                  <span className="text-emerald-900 font-mono font-bold text-[11px]">
                    মোট অংশ: {plot.satak} শতক
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-amber-950">আইনি সতর্কবার্তা:</strong> এআই ফরায়েজ ক্যালকুলেটরের হিস্যা একটি প্রস্তাবিত খসড়া (AI-Generated Draft)। ব্যক্তিগত হস্তান্তরের পূর্বে সহকারী কমিশনার (ভূমি) কার্যালয় অথবা সাব-রেজিস্ট্রারে নিবন্ধিত আপস-বণ্টননামা দলিল (Partition Deed) সম্পাদন আইনত আবশ্যক।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
