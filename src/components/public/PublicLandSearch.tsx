import React, { useState, useMemo } from 'react';
import { Language, LandParcel } from '../../types';
import {
  Search,
  MapPin,
  FileText,
  ShieldCheck,
  ArrowRight,
  Lock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';

interface PublicLandSearchProps {
  parcels: LandParcel[];
  language: Language;
  onOpenLogin: () => void;
  onSelectParcel: (parcelId: string) => void;
}

export const PublicLandSearch: React.FC<PublicLandSearchProps> = ({
  parcels,
  language,
  onOpenLogin,
  onSelectParcel
}) => {
  const [searchMouza, setSearchMouza] = useState('');
  const [searchDag, setSearchDag] = useState('');
  const [searchKhatian, setSearchKhatian] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Available unique mouzas for filter dropdown
  const uniqueMouzas = useMemo(() => {
    return Array.from(new Set(parcels.map(p => language === 'bn' ? p.mouzaBn : p.mouza)));
  }, [parcels, language]);

  // Filtered public parcels
  const searchResults = useMemo(() => {
    if (!hasSearched && !searchMouza && !searchDag && !searchKhatian) {
      // By default show first 3 public verified parcels as featured demo
      return parcels.slice(0, 4);
    }

    return parcels.filter(p => {
      const matchMouza = !searchMouza || 
        p.mouza.toLowerCase().includes(searchMouza.toLowerCase()) || 
        p.mouzaBn.includes(searchMouza);

      const matchDag = !searchDag || 
        p.dagNo.toLowerCase().includes(searchDag.toLowerCase());

      const matchKhatian = !searchKhatian || 
        p.khatianNo.toLowerCase().includes(searchKhatian.toLowerCase());

      return matchMouza && matchDag && matchKhatian;
    });
  }, [parcels, searchMouza, searchDag, searchKhatian, hasSearched]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const handleReset = () => {
    setSearchMouza('');
    setSearchDag('');
    setSearchKhatian('');
    setHasSearched(false);
  };

  return (
    <section id="search" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Search className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'নমুনা ভূমি রেকর্ড অনুসন্ধান' : 'Sample land record search'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'bn'
              ? 'মৌজা ও দাগ নম্বর দিয়ে নমুনা রেকর্ড খুঁজুন'
              : 'Search sample land records by area and plot'}
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            {language === 'bn'
              ? 'এখানে দেখানো তথ্য ডেমোর জন্য তৈরি। জমি কেনা বা আইনি সিদ্ধান্তের আগে মূল সরকারি রেকর্ড যাচাই করুন।'
              : 'These records are demonstration data. Check official source records before any legal or purchase decision.'}
          </p>
        </div>

        {/* Search Filter Card */}
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-gov space-y-6">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Mouza input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'bn' ? 'মৌজার নাম' : 'Mouza / Area'}</span>
                </label>
                <input
                  type="text"
                  value={searchMouza}
                  onChange={(e) => setSearchMouza(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: ধানমন্ডি, সাভার...' : 'e.g., Dhanmondi, Savar...'}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Dag No input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'bn' ? 'দাগ নম্বর (CS/RS/BS)' : 'Dag / Parcel No.'}</span>
                </label>
                <input
                  type="text"
                  value={searchDag}
                  onChange={(e) => setSearchDag(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: ১০৪, ৭২০, ৫৬...' : 'e.g., 104, 720, 56...'}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Khatian No input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'bn' ? 'খতিয়ান নম্বর' : 'Khatian Record No.'}</span>
                </label>
                <input
                  type="text"
                  value={searchKhatian}
                  onChange={(e) => setSearchKhatian(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: BS-409, BS-MUT-9014...' : 'e.g., BS-409, BS-MUT-9014...'}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Submit & Reset buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{language === 'bn' ? 'রেকর্ড অনুসন্ধান করুন' : 'Search Records'}</span>
                </button>

                {(searchMouza || searchDag || searchKhatian || hasSearched) && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    {language === 'bn' ? 'রিসেট' : 'Reset'}
                  </button>
                )}
              </div>

              {/* Privacy Badge */}
              <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  {language === 'bn'
                    ? 'নমুনা তথ্য · বাস্তব এনআইডি ব্যবহার করবেন না'
                    : 'Sample data · do not enter a real NID'}
                </span>
              </span>
            </div>
          </form>
        </div>

        {/* Public Results Area */}
        <div className="space-y-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              {language === 'bn'
                ? `অনুসন্ধানের ফলাফল (${searchResults.length} টি রেকর্ড পাওয়া গেছে)`
                : `Search Results (${searchResults.length} Records Found)`}
            </h3>
            <span className="text-xs text-slate-500">
              {language === 'bn' ? 'নমুনা প্রদর্শন' : 'Demonstration records'}
            </span>
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-8 space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
              <p className="text-sm font-bold text-slate-800">
                {language === 'bn' ? 'কোনো রেকর্ড পাওয়া যায়নি' : 'No matching land records found'}
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {language === 'bn'
                  ? 'আপনার মৌজা বা দাগ নম্বর সঠিকভাবে টাইপ করেছেন কিনা নিশ্চিত করুন। অথবা ডেমো টেস্টের জন্য "ধানমন্ডি" বা দাগ "১০৪" সার্চ করুন।'
                  : 'Please check your Mouza name or Dag number. For demo testing, try searching "Dhanmondi" or Dag "104".'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((parcel) => (
                <div
                  key={parcel.landId}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 uppercase">
                        {parcel.landId}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">
                        {language === 'bn' ? parcel.mouzaBn : parcel.mouza}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {language === 'bn'
                          ? `উপজেলা: ${parcel.upazilaBn || parcel.upazila} • জেলা: ${parcel.districtBn || parcel.district}`
                          : `Upazila: ${parcel.upazila} • District: ${parcel.district}`}
                      </p>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      parcel.status === 'VERIFIED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : parcel.status === 'UNDER_MUTATION'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {parcel.status === 'VERIFIED'
                        ? (language === 'bn' ? 'নমুনায় যাচাইকৃত' : 'Verified in sample')
                        : parcel.status === 'UNDER_MUTATION'
                        ? (language === 'bn' ? 'নামজারি প্রক্রিয়াধীন' : 'Under Mutation')
                        : (language === 'bn' ? 'সরকারি রেকর্ডভুক্ত' : 'Recorded')}
                    </span>
                  </div>

                  {/* Public Data Pills */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">
                        {language === 'bn' ? 'দাগ নম্বর' : 'Dag No'}
                      </span>
                      <span className="text-xs font-bold text-slate-800 font-mono">
                        {parcel.dagNo}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">
                        {language === 'bn' ? 'খতিয়ান' : 'Khatian'}
                      </span>
                      <span className="text-xs font-bold text-slate-800 font-mono">
                        {parcel.khatianNo}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">
                        {language === 'bn' ? 'জমির পরিমাণ' : 'Land Area'}
                      </span>
                      <span className="text-xs font-bold text-emerald-800">
                        {parcel.areaSatak} {language === 'bn' ? 'শতাংশ' : 'Dec'}
                      </span>
                    </div>
                  </div>

                  {/* Privacy Protected Notice & CTA */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{language === 'bn' ? 'মালিকানা হিস্যা সুরক্ষিত' : 'Ownership NID Masked'}</span>
                    </div>

                    <button
                      onClick={onOpenLogin}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>{language === 'bn' ? 'পূর্ণাঙ্গ প্রোফাইল দেখতে লগইন' : 'Login for Full Profile'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
