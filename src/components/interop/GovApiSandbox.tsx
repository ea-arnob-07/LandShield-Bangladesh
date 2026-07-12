import React, { useState } from 'react';
import { Language } from '../../types';
import { GovTechAdapters, GovApiResponse } from '../../services/govAdapters';
import {
  Server,
  Play,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';

interface GovApiSandboxProps {
  language: Language;
}

export const GovApiSandbox: React.FC<GovApiSandboxProps> = ({ language }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('NID');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<GovApiResponse<any> | null>(null);

  const endpoints = [
    {
      id: 'NID',
      name: 'Election Commission / Porichoy Gateway',
      nameBn: 'নির্বাচন কমিশন / পরিচয় এনআইডি যাচাইকরণ গেটওয়ে',
      method: 'POST',
      path: '/api/v1/porichoy/verify-nid',
      payload: { nid: '19822692548000789', dob: '1982-11-14', name: 'Abdul Karim Chowdhury' }
    },
    {
      id: 'SRO_SYNC',
      name: 'SRO-AC Land Mutation Webhook Hub',
      nameBn: 'সাব-রেজিস্ট্রি ও এসিল্যান্ড মিউটেশন ইন্টারকানেক্ট হাব',
      method: 'POST',
      path: '/api/v1/sro-acland/sync-mutation',
      payload: { deedNo: 'DALIL-2026-7841', sroOffice: 'Dhanmondi Sub-Registry', landId: 'BD-DH-DHA-DHAN-12-104', transferredSatak: 7.5 }
    },
    {
      id: 'BANK_CIB',
      name: 'Bangladesh Bank CIB Land Charge Registry',
      nameBn: 'বাংলাদেশ ব্যাংক সিআইবি ও বন্ধকী রেজিস্ট্রি',
      method: 'GET',
      path: '/api/v1/cib/land-mortgage?landId=BD-DH-DHA-TEJ-14-880',
      payload: { landId: 'BD-DH-DHA-TEJ-14-880' }
    },
    {
      id: 'JUDICIARY',
      name: 'Judicial E-Court Title Suit Gateway',
      nameBn: 'জুডিশিয়াল ই-কোর্ট দেওয়ানি মোকদ্দমা গেটওয়ে',
      method: 'GET',
      path: '/api/v1/judiciary/case-status?landId=BD-SY-SYL-SAD-22-194',
      payload: { landId: 'BD-SY-SYL-SAD-22-194' }
    },
    {
      id: 'LD_TAX',
      name: 'National Land Development Tax Gateway',
      nameBn: 'জাতীয় ভূমি উন্নয়ন কর পরিশোধ এপিআই',
      method: 'POST',
      path: '/api/v1/ldtax/process-dakhila',
      payload: { holdingNo: 'HLD-DHAN-904', amountBDT: 900, payerNid: '19822692548000789' }
    }
  ];

  const activeEp = endpoints.find(e => e.id === selectedEndpoint) || endpoints[0];

  const handleExecute = async () => {
    setIsLoading(true);
    setResponse(null);

    let res: GovApiResponse<any>;
    if (selectedEndpoint === 'NID') {
      res = await GovTechAdapters.verifyNID('19822692548000789', '1982-11-14', 'Abdul Karim Chowdhury');
    } else if (selectedEndpoint === 'SRO_SYNC') {
      res = await GovTechAdapters.dispatchSroDeedToAcLand({
        deedNo: 'DALIL-2026-7841',
        sroOffice: 'Dhanmondi Sub-Registry',
        landId: 'BD-DH-DHA-DHAN-12-104',
        sellerNid: '19602692548000101',
        buyerNid: '19822692548000789',
        transferredSatak: 7.5
      });
    } else if (selectedEndpoint === 'BANK_CIB') {
      res = await GovTechAdapters.queryBankMortgage('BD-DH-DHA-TEJ-14-880');
    } else if (selectedEndpoint === 'JUDICIARY') {
      res = await GovTechAdapters.queryCourtDisputes('BD-SY-SYL-SAD-22-194');
    } else {
      res = await GovTechAdapters.processTaxPayment('HLD-DHAN-904', 900, '19822692548000789');
    }

    setTimeout(() => {
      setResponse(res);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="gov-card p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white shadow-gov">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-slate-200 text-xs font-semibold mb-2">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'bn' ? 'আন্তঃমন্ত্রণালয় জাতীয় ডিজিটাল গভ-টেক ইন্টারঅপারেবিলিটি' : 'GovTech Interoperability Gateway Sandbox'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {language === 'bn' ? 'সরকারি এপিআই এডাপ্টার ও লাইভ স্যান্ডবক্স' : 'GovTech API Adapters & Sandbox'}
            </h2>
            <p className="text-xs text-slate-300">
              {language === 'bn'
                ? 'ভূমি মন্ত্রণালয়, আইন মন্ত্রণালয়, বাংলাদেশ ব্যাংক, নির্বাচন কমিশন ও বিচার বিভাগের মধ্যে নিরাপদ এপিআই আদান-প্রদান'
                : 'Production-ready adapter interfaces simulating live transactions across 5 national GovTech stakeholders'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] text-emerald-300 block font-semibold">এপিআই সিকিউরিটি</span>
            <span className="font-mono text-xs font-bold text-white">mTLS & SHA-256 HMAC</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Endpoint Selector List */}
        <div className="lg:col-span-1 gov-card p-4 space-y-2">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
            সরকারি এপিআই রুটসমূহ (Routes)
          </h3>

          <div className="space-y-1.5">
            {endpoints.map(ep => {
              const isSelected = selectedEndpoint === ep.id;
              return (
                <button
                  key={ep.id}
                  onClick={() => {
                    setSelectedEndpoint(ep.id);
                    setResponse(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      ep.method === 'POST' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">v1</span>
                  </div>
                  <p className="truncate font-semibold">{ep.nameBn}</p>
                  <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">{ep.path}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Request & Live Response Inspector */}
        <div className="lg:col-span-2 gov-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  activeEp.method === 'POST' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {activeEp.method}
                </span>
                <span className="text-xs font-mono font-bold text-slate-800">{activeEp.path}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{activeEp.nameBn}</p>
            </div>

            <button
              onClick={handleExecute}
              disabled={isLoading}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isLoading ? 'Executing...' : 'Send API Request'}
            </button>
          </div>

          {/* Request Payload */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              HTTP Request Payload (JSON)
            </span>
            <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
              {JSON.stringify(activeEp.payload, null, 2)}
            </pre>
          </div>

          {/* Live Response Payload */}
          {response && (
            <div className="space-y-1 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Response 200 OK — Cryptographically Signed
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">
                  LATENCY: ~340ms
                </span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
