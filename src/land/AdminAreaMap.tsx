import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import {ChevronDown,LoaderCircle,MapPin} from 'lucide-react';
import {api} from './api';
import type {ReportMapResults} from './types';
import type {LandParcel} from '../types';
import {issueLabels} from './issue-labels';

const CadastralMap=lazy(()=>import('../components/gis/CadastralMap').then(module=>({default:module.CadastralMap})));
const noParcel=()=>{};
const noParcels:LandParcel[]=[];

export default function AdminAreaMap({bn,filters,revision,onOpen}:{bn:boolean;filters:string;revision:number;onOpen:(id:string)=>void}){
  const [expanded,setExpanded]=useState(false),[data,setData]=useState<ReportMapResults|null>(null),[loading,setLoading]=useState(false),[error,setError]=useState(''),[retry,setRetry]=useState(0);
  const request=useRef<AbortController|null>(null);
  useEffect(()=>{
    if(!expanded)return;
    request.current?.abort();
    const controller=new AbortController();request.current=controller;setData(null);setLoading(true);setError('');
    void api<ReportMapResults>(`/admin/report-map?${filters}`,{signal:controller.signal}).then(result=>{if(!controller.signal.aborted)setData(result);}).catch(e=>{if(!controller.signal.aborted)setError((e as Error).message);}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return()=>{controller.abort();request.current?.abort();};
  },[expanded,filters,revision,retry]);
  const more=async()=>{
    if(!data?.nextCursor||loading)return;
    const controller=new AbortController();request.current?.abort();request.current=controller;setLoading(true);setError('');
    const params=new URLSearchParams(filters);params.set('before',data.nextCursor);
    try{const next=await api<ReportMapResults>(`/admin/report-map?${params}`,{signal:controller.signal});if(!controller.signal.aborted)setData(current=>current?{...next,items:[...current.items,...next.items]}:next);}
    catch(e){if(!controller.signal.aborted)setError((e as Error).message);}
    finally{if(!controller.signal.aborted)setLoading(false);}
  };
  useEffect(()=>()=>request.current?.abort(),[]);
  return <section className="ls-admin-area-map" aria-label={bn?'বাংলাদেশজুড়ে জমা হওয়া রিপোর্টের মানচিত্র':'Map of submitted reports across Bangladesh'}>
    <button className="ls-area-map-toggle" aria-expanded={expanded} aria-controls="admin-area-map-content" onClick={()=>{request.current?.abort();setExpanded(value=>!value);}}><MapPin size={21}/><span><strong>{bn?'বাংলাদেশজুড়ে রিপোর্টের মানচিত্র':'Report map across Bangladesh'}</strong><small>{bn?'জমির নির্বাচিত অবস্থানে সমস্যা দেখুন · বর্তমান ফিল্টার অনুযায়ী':'Issues at their selected land locations · follows the current filters'}</small></span><ChevronDown size={20} className={expanded?'expanded':''}/></button>
    {expanded&&<div id="admin-area-map-content" className="ls-area-map-content">
      {data&&<><div className="ls-map-counts"><span><strong>{data.total}</strong>{bn?'মোট রিপোর্ট':'total reports'}</span><span><strong>{data.located}</strong>{bn?'লোকেশনসহ':'with a map pin'}</span><span><strong>{data.unlocated}</strong>{bn?'ম্যাপ পিন দেওয়া হয়নি':'without a map pin'}</span></div><p className="ls-muted">{bn?'পিনে ক্লিক করে সংশ্লিষ্ট রিপোর্ট খুলুন। একই অবস্থানের একাধিক রিপোর্ট থাকলে তালিকা থেকে বাছুন।':'Click a pin to open its report. Choose from a list when several reports share one location.'}</p>
      <div className="ls-map-risk-legend" aria-label={bn?'পিনের ঝুঁকির রং':'Pin risk colors'}>{(['HIGH','MEDIUM','LOW','UNKNOWN'] as const).map(risk=><span key={risk} className={`ls-risk ${risk.toLowerCase()}`}>{issueLabels(bn).risk[risk]}</span>)}</div>
      <Suspense fallback={<p className="ls-note" role="status">{bn?'ম্যাপ প্রস্তুত হচ্ছে…':'Preparing the map…'}</p>}><CadastralMap parcels={noParcels} selectedParcel={null} onSelectParcel={noParcel} language={bn?'bn':'en'} reportPoints={data.items} onSelectReport={onOpen}/></Suspense>
      {data.located===0&&<p className="ls-note">{bn?'এই ফিল্টারে কোনো রিপোর্টে ম্যাপ পিন নেই। রিপোর্টগুলো নিচের তালিকায় আছে; নতুন আবেদনে অবস্থান দেওয়া হলে এখানেই পিন দেখা যাবে।':'No report in this filter has a map pin. Reports remain in the list below; locations included in new applications will appear here.'}</p>}
      {data.unlocated>0&&<small className="ls-muted">{bn?'ম্যাপ পিন ছাড়া রিপোর্টের অবস্থান অনুমান করা হয় না। জেলা–উপজেলা দেওয়া থাকলে সেই এলাকার ফিল্টারে পাওয়া যাবে।':'Locations are not guessed for reports without pins. Entered district and upazila remain available in the area filters.'}</small>}
      {data.nextCursor&&<div className="ls-map-more"><span>{bn?`${data.located}টির মধ্যে ${data.items.length}টি পিনের তথ্য দেখানো হচ্ছে।`:`Showing ${data.items.length} of ${data.located} located reports.`}</span><button className="ls-btn" disabled={loading} onClick={more}>{bn?'আরও রিপোর্ট ম্যাপে দেখুন':'Load more reports on the map'}</button></div>}</>}
      {loading&&<p className="ls-note" role="status"><LoaderCircle size={17} className="spin"/>{bn?'রিপোর্টের অবস্থান খুলছে…':'Loading report locations…'}</p>}
      {error&&<p className="ls-error" role="alert">{error} <button className="ls-text-button" onClick={()=>setRetry(value=>value+1)}>{bn?'আবার চেষ্টা করুন':'Retry'}</button></p>}
    </div>}
  </section>;
}
