import React, { useEffect, useRef, useState } from 'react';
import { TaxRecord, LandParcel, Language, UserProfile } from '../../types';
import { getTranslation } from '../../utils/translations';
import { GovTechAdapters } from '../../services/govAdapters';
import { AuditLedgerService } from '../../services/auditLedger';
import {
  Receipt,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Download,
  CreditCard,
  Building,
  DollarSign,
  ShieldCheck
} from 'lucide-react';

interface LDTaxPortalProps {
  parcels: LandParcel[];
  selectedParcel: LandParcel;
  taxRecords: TaxRecord[];
  currentUser: UserProfile;
  language: Language;
  onTaxPaid: (holdingNo: string) => void;
}

export const LDTaxPortal: React.FC<LDTaxPortalProps> = ({
  parcels,
  selectedParcel,
  taxRecords,
  currentUser,
  language,
  onTaxPaid
}) => {
  const selectedTax = taxRecords.find(t => t.landId === selectedParcel.landId) || taxRecords[0];
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [issuedDakhilaNo, setIssuedDakhilaNo] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const paymentInFlight=useRef(false),selectedLand=useRef(selectedParcel.landId),mounted=useRef(true);
  selectedLand.current=selectedParcel.landId;
  useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;};},[]);
  useEffect(() => {setPaymentSuccess(false);setIssuedDakhilaNo('');setPaymentError('');}, [selectedParcel.landId]);

  const downloadSampleReceipt = () => {
    const text = [
      'ল্যান্ডশিল্ড · ভূমিসেবা — নমুনা দাখিলা',
      'DEMONSTRATION ONLY — No money was paid. Not an official receipt.',
      `Holding: ${selectedTax.holdingNo}`,
      `Land ID: ${selectedTax.landId}`,
      `Fiscal year: ${selectedTax.fiscalYear}`,
      `Demo receipt: ${issuedDakhilaNo || selectedTax.dakhilaNo || 'Not issued'}`,
      `Status: ${selectedTax.status}`,
      `Generated: ${new Date().toISOString()}`,
    ].join('\n');
    const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download=`demo-dakhila-${selectedTax.holdingNo}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };

  const handlePayTax = async () => {
    if(paymentInFlight.current)return;
    paymentInFlight.current=true;setIsProcessingPayment(true);setPaymentError('');
    const landId=selectedParcel.landId;
    try{
      const res = await GovTechAdapters.processTaxPayment(selectedTax.holdingNo,selectedTax.totalDueBDT,currentUser.nid);
      if(!res.success)throw new Error('Demo payment failed');
      if(mounted.current&&selectedLand.current===landId){setIssuedDakhilaNo(`DEMO-${res.data.dakhilaNumber}`);setPaymentSuccess(true);}
      onTaxPaid(selectedTax.holdingNo);
      AuditLedgerService.getInstance().addAuditEntry(
        currentUser.id,
        currentUser.role,
        currentUser.name,
        'LD_TAX_PAID',
        'নমুনা কর পরিশোধ ও ডেমো দাখিলা সৃজন',
        selectedTax.landId,
        `Demo tax payment for Holding ${selectedTax.holdingNo}: BDT ${selectedTax.totalDueBDT}. No money was transferred.`,
        `হোল্ডিং নং ${selectedTax.holdingNo} এর ৳ ${selectedTax.totalDueBDT} কর পরিশোধের নমুনা দেখানো হয়েছে। কোনো টাকা লেনদেন হয়নি।`
      );
    }catch{if(mounted.current&&selectedLand.current===landId)setPaymentError(language==='bn'?'কর পরিশোধের ডেমো সম্পন্ন হয়নি। আবার চেষ্টা করুন।':'The payment demo failed. Please try again.');}
    finally{paymentInFlight.current=false;if(mounted.current)setIsProcessingPayment(false);}
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="gov-card p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white shadow-gov">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold mb-2">
              <Receipt className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'bn' ? 'ভূমি উন্নয়ন করের ডেমো' : 'Land development tax demo'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {language === 'bn' ? 'নমুনা কর হিসাব ও দাখিলা' : 'Sample tax assessment and receipt'}
            </h2>
            <p className="text-xs text-emerald-200/80">
              {language === 'bn'
                ? 'কর হিসাব ও পরিশোধের প্রবাহ দেখুন। সরকারি সংযোগ বা বাস্তব টাকা লেনদেন নেই।'
                : 'Explore the tax and payment workflow. Government services and real payments are not connected.'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] text-emerald-300 block font-semibold">হোল্ডিং নম্বর</span>
            <span className="font-mono text-sm font-bold text-white">{selectedTax?.holdingNo}</span>
          </div>
        </div>
      </div>

      {/* Main Tax Card & Payment Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Tax Assessment Breakdown */}
        <div className="md:col-span-2 gov-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'ভূমি উন্নয়ন কর হিসাব বিবরণী' : 'Land Tax Assessment Breakdown'}
              </h3>
              <p className="text-xs text-slate-500">
                ভূমি আইডি: <span className="font-mono font-bold text-slate-800">{selectedTax?.landId}</span>
              </p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              selectedTax?.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
            }`}>
              {selectedTax?.status === 'PAID' ? 'পরিশোধিত (PAID)' : 'বকেয়া (OVERDUE)'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-semibold">অর্থবছর</span>
              <span className="text-xs font-bold text-slate-900">{selectedTax?.fiscalYear}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-semibold">বকেয়া দাবি (Arrears)</span>
              <span className="text-xs font-bold text-slate-900">৳ {selectedTax?.arrearsBDT}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-semibold">হাল দাবি (Demand)</span>
              <span className="text-xs font-bold text-slate-900">৳ {selectedTax?.currentDemandBDT}</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-[10px] text-emerald-700 block font-semibold">মোট প্রদেয় অর্থ</span>
              <span className="text-sm font-black text-emerald-950">৳ {selectedTax?.totalDueBDT}</span>
            </div>
          </div>

          {/* Payment Action Box */}
          {selectedTax?.status === 'OVERDUE' && !paymentSuccess ? (
            <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950">
                  {language === 'bn' ? 'কর পরিশোধের নমুনা' : 'Tax payment demo'}
                </span>
                <span className="text-base font-black text-amber-950 font-mono">
                  ৳ {selectedTax.totalDueBDT}
                </span>
              </div>
              <p className="text-xs text-amber-900">
                {language === 'bn'
                  ? 'নমুনা কর রেকর্ড হালনাগাদ ও ডেমো দাখিলা দেখুন। কোনো টাকা নেওয়া হবে না; পেমেন্ট সেবা সংযুক্ত নেই।'
                  : 'Update the sample tax record and view a demo receipt. No money is taken; payment services are not connected.'}
              </p>

              <button
                onClick={handlePayTax}
                disabled={isProcessingPayment}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                <CreditCard className="w-4 h-4" />
                {isProcessingPayment
                  ? (language === 'bn' ? 'ডেমো চলছে...' : 'Running demo...')
                  : (language === 'bn' ? 'কর পরিশোধের ডেমো দেখুন (৳ ' + selectedTax.totalDueBDT + ')' : 'Try tax payment demo (৳ ' + selectedTax.totalDueBDT + ')')}
              </button>
            </div>
          ) : (
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                {language === 'bn' ? 'নমুনা কর রেকর্ড পরিশোধিত দেখানো হচ্ছে' : 'Sample tax record marked as paid'}
              </div>
              <p className="text-xs text-emerald-800">
                দাখিলা নম্বর: <span className="font-mono font-bold">{issuedDakhilaNo || selectedTax?.dakhilaNo}</span>
              </p>
            </div>
          )}
          {paymentError&&<p role="alert" className="text-sm text-red-700">{paymentError}</p>}
        </div>

        {/* Right: Digital Smart Dakhila Preview */}
        <div className="md:col-span-1 gov-card p-5 space-y-4 border-emerald-800/30 bg-white">
          <div className="text-center pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase text-emerald-800 block">{language==='bn'?'ডেমো দাখিলা':'DEMO RECEIPT'}</span>
            <h4 className="text-sm font-black text-slate-900">{language==='bn'?'সরকারি কাজে ব্যবহারযোগ্য নয়':'Not valid for official use'}</h4>
          </div>

          <div className="w-32 h-32 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto p-2 shadow-md">
            <QrCode className="w-28 h-28" aria-hidden="true" />
          </div>
          <p className="text-xs text-center text-slate-500">{language==='bn'?'QR ছবিটি নমুনা; যাচাইয়ের কোড নয়।':'Illustrative QR symbol; not a verification code.'}</p>

          <div className="space-y-1.5 text-center text-xs">
            <p className="font-bold text-slate-800">{selectedParcel.mouzaBn}</p>
            <p className="text-[11px] text-slate-500">হোল্ডিং: {selectedTax?.holdingNo}</p>
            <p className="text-[10px] font-mono text-emerald-800 font-bold">
              DEMO · NOT AN OFFICIAL RECEIPT
            </p>
          </div>

          <button
            onClick={downloadSampleReceipt}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            {language === 'bn' ? 'নমুনা দাখিলা নামান (.txt)' : 'Download sample receipt (.txt)'}
          </button>
        </div>
      </div>
    </div>
  );
};
