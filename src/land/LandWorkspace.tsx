import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { Map, Files, FileCheck2, ReceiptText, Scale, Calculator, Shield, Network, Globe, ScanLine, Handshake, Activity, Fingerprint } from 'lucide-react';
import { mockUsers,mockParcels,mockKhatians,mockDeeds,mockMutations,mockTaxes,mockEncumbrances,mockCaveats,mockDisputes } from '../data/mockData';
import type { CaveatRecord,LandParcel,Language } from '../types';
const CadastralMap=lazy(()=>import('../components/gis/CadastralMap').then(m=>({default:m.CadastralMap})));
const DigitalLandProfile=lazy(()=>import('../components/profile/DigitalLandProfile').then(m=>({default:m.DigitalLandProfile})));
const AIDocumentLab=lazy(()=>import('../components/docai/AIDocumentLab').then(m=>({default:m.AIDocumentLab})));
const BuySellEscrowWizard=lazy(()=>import('../components/conveyancing/BuySellEscrowWizard').then(m=>({default:m.BuySellEscrowWizard})));
const SmartMutationDashboard=lazy(()=>import('../components/mutation/SmartMutationDashboard').then(m=>({default:m.SmartMutationDashboard})));
const LDTaxPortal=lazy(()=>import('../components/tax/LDTaxPortal').then(m=>({default:m.LDTaxPortal})));
const DisputeAndCaveatManager=lazy(()=>import('../components/disputes/DisputeAndCaveatManager').then(m=>({default:m.DisputeAndCaveatManager})));
const AIInheritanceCalculator=lazy(()=>import('../components/faraid/AIInheritanceCalculator').then(m=>({default:m.AIInheritanceCalculator})));
const InSARErosionPortal=lazy(()=>import('../components/insar/InSARErosionPortal').then(m=>({default:m.InSARErosionPortal})));
const DiasporaPortal=lazy(()=>import('../components/diaspora/DiasporaPortal').then(m=>({default:m.DiasporaPortal})));
const AuditLedgerExplorer=lazy(()=>import('../components/audit/AuditLedgerExplorer').then(m=>({default:m.AuditLedgerExplorer})));
const GovApiSandbox=lazy(()=>import('../components/interop/GovApiSandbox').then(m=>({default:m.GovApiSandbox})));
const RoleDashboardContainer=lazy(()=>import('../components/dashboard/RoleDashboardContainer').then(m=>({default:m.RoleDashboardContainer})));
import ParcelSources from './ParcelSources';
import '../index.css';
import './legacy-theme.css';
import type { TabType } from '../components/layout/NavigationTabs';
const modules=[
  {id:'LAND_SEARCH_GIS',slug:'map',bn:'ভূমি মানচিত্র',en:'Land map',icon:Map},
  {id:'LAND_PROFILE',slug:'profile',bn:'জমির প্রোফাইল',en:'Land profile',icon:Files},
  {id:'SMART_MUTATION',slug:'mutation',bn:'নামজারি',en:'Mutation',icon:FileCheck2},
  {id:'LD_TAX',slug:'tax',bn:'ভূমি উন্নয়ন কর',en:'Land tax',icon:ReceiptText},
  {id:'DOC_AI_LAB',slug:'documents',bn:'দলিল বিশ্লেষণ',en:'Document lab',icon:ScanLine},
  {id:'FARAID_INHERITANCE',slug:'inheritance',bn:'উত্তরাধিকার',en:'Inheritance',icon:Calculator},
  {id:'CAVEATS_DISPUTES',slug:'disputes',bn:'বিরোধ ও সতর্কতা',en:'Disputes',icon:Scale},
  {id:'BUY_SELL_ESCROW',slug:'transaction',bn:'ক্রয় ও বিক্রয়',en:'Buy & sell',icon:Handshake},
  {id:'INSAR_EROSION',slug:'erosion',bn:'নদীভাঙন',en:'River erosion',icon:Activity},
  {id:'DIASPORA_PORTAL',slug:'diaspora',bn:'প্রবাসী সেবা',en:'Diaspora',icon:Globe},
  {id:'AUDIT_EXPLORER',slug:'audit',bn:'অডিট লেজার',en:'Audit ledger',icon:Fingerprint},
  {id:'GOV_API_SANDBOX',slug:'sandbox',bn:'API স্যান্ডবক্স',en:'API sandbox',icon:Network},
  {id:'DASHBOARD',slug:'dashboard',bn:'ভূমিকার ড্যাশবোর্ড',en:'Role dashboard',icon:Shield},
] as const;
export default function LandWorkspace({bn,slug='map',navigate}:{bn:boolean;slug?:string;navigate:(slug:string)=>void}){
  const language:Language=bn?'bn':'en';
  const [userId,setUserId]=useState(mockUsers[1].id),[parcels,setParcels]=useState(mockParcels),[selectedId,setSelectedId]=useState(mockParcels[0].landId),[query,setQuery]=useState(''),[mutations,setMutations]=useState(mockMutations),[taxes,setTaxes]=useState(mockTaxes),[caveats,setCaveats]=useState(mockCaveats);
  const user=mockUsers.find(u=>u.id===userId)||mockUsers[0],parcel=parcels.find(p=>p.landId===selectedId)||parcels[0];
  const active=modules.find(m=>m.slug===slug)||modules[0],tab=active.id as TabType;
  const allowed=true;
  const selectParcel=useCallback((p:LandParcel)=>setSelectedId(p.landId),[]);
  const filtered=useMemo(()=>parcels.filter(p=>`${p.landId} ${p.dagNo} ${p.khatianNo} ${p.mouza} ${p.mouzaBn}`.toLowerCase().includes(query.toLowerCase())),[parcels,query]);
  const nav=(id:TabType)=>navigate(modules.find(m=>m.id===id)?.slug||'dashboard');
  const lodge=(c:CaveatRecord)=>{setCaveats([c,...caveats]);setParcels(parcels.map(p=>p.landId===c.landId?{...p,status:'LOCKED_CAVEAT',riskLevel:'CRITICAL',riskScore:85}:p));};
  return <div className="ns-land-workspace">
    {tab!=='LAND_SEARCH_GIS'&&<div className="ns-land-controls"><label><span>{bn?'নমুনা ভূমিকায় দেখুন':'Land demo role'}</span><select value={userId} onChange={e=>setUserId(e.target.value)}>{mockUsers.map(u=><option key={u.id} value={u.id}>{bn?u.designationBn:u.designation}</option>)}</select></label><label><span>{bn?'নমুনা জমি':'Sample parcel'}</span><select value={selectedId} onChange={e=>setSelectedId(e.target.value)}>{parcels.map(p=><option key={p.landId} value={p.landId}>{bn?p.mouzaBn:p.mouza} · {bn?'দাগ':'Plot'} {p.dagNo}</option>)}</select></label><label><span>{bn?'দাগ / খতিয়ান খুঁজুন':'Find plot / khatian'}</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={bn?'দাগ, মৌজা বা খতিয়ান…':'Plot, mouza or khatian…'}/></label></div>}
    <nav className="ns-land-tabs" aria-label={bn?'ভূমির মডিউল':'Land modules'}>{modules.map(m=><button key={m.slug} className={m.slug===active.slug?'active':''} onClick={()=>navigate(m.slug)} aria-current={m.slug===active.slug?'page':undefined}><m.icon size={16}/>{bn?m.bn:m.en}</button>)}</nav>
    {tab!=='LAND_SEARCH_GIS'&&<div className="ns-land-demo"><Shield size={16}/>{bn?'ভূমির সব রেকর্ড, অনুমোদন, হিসাব ও API ফল নমুনা। সরকারি সংযোগ, পেমেন্ট বা আইনি সিদ্ধান্ত নয়।':'All land records, approvals, calculations and API results are samples. No official connection, payment or legal decision.'}</div>}
    {!allowed?<div className="ns-card ns-empty"><Shield size={28}/><h3>{bn?'এই ডেমো ভূমিকায় মডিউলটি খোলা যায় না':'This demo role cannot access this module'}</h3><p>{bn?'উপরের তালিকা থেকে সংশ্লিষ্ট ভূমিকা নির্বাচন করুন।':'Choose an appropriate role from the selector above.'}</p></div>:<div className="ns-land-module"><Suspense fallback={<div className="ls-loading" role="status">{bn?'সেবাটি প্রস্তুত হচ্ছে…':'Preparing this service…'}</div>}>
      {tab==='LAND_SEARCH_GIS'&&<><div className="ns-land-map-head"><h2>{bn?'বাংলাদেশজুড়ে ভূমি মানচিত্র':'Land map across Bangladesh'}</h2><span>{bn?'সব জেলা · সব উপজেলা':'All districts · all upazilas'}</span></div><CadastralMap parcels={[]} selectedParcel={null} onSelectParcel={selectParcel} language={language}/><div className="ls-nationwide-note"><Map size={22}/><div><strong>{bn?'আপনার এলাকার জমির সমস্যা জানান':'Report a land issue in your area'}</strong><p>{bn?'বাংলাদেশের যেকোনো এলাকার জন্য আবেদন করুন। জমির জেলা, উপজেলা ও ম্যাপ পিন দিলে অ্যাডমিন সেই এলাকাতেই রিপোর্ট দেখতে পাবেন।':'Apply for any area in Bangladesh. Include the land district, upazila and map pin so admins can review it under that area.'}</p></div><button className="ls-btn primary" onClick={()=>{window.location.hash='/application';}}>{bn?'ভূমির আবেদন করুন':'Create a land application'}</button></div></>}
      {tab==='LAND_PROFILE'&&<><ParcelSources parcel={parcel} bn={bn} navigate={navigate}/><DigitalLandProfile parcel={parcel} khatian={mockKhatians.find(k=>k.landId===parcel.landId)} deeds={mockDeeds.filter(d=>d.landId===parcel.landId)} tax={taxes.find(t=>t.landId===parcel.landId)} encumbrances={mockEncumbrances} caveats={caveats} disputes={mockDisputes} currentUser={user} language={language} onNavigateToBuySell={()=>navigate('transaction')} onNavigateToDocAi={()=>navigate('documents')}/></>}
      {tab==='DOC_AI_LAB'&&<AIDocumentLab currentParcel={parcel} language={language}/>}
      {tab==='BUY_SELL_ESCROW'&&<BuySellEscrowWizard parcel={parcel} currentUser={user} language={language} onCompleteTransaction={(name,nid)=>{setParcels(parcels.map(p=>p.landId===parcel.landId?{...p,currentOwners:[{nid,name,nameBn:name,fatherHusbandName:'Demo owner',fatherHusbandNameBn:'নমুনা মালিক',shareDecimal:1,hisabShare:'১৬ আনা'}],status:'VERIFIED'}:p));navigate('profile');}}/>}
      {tab==='SMART_MUTATION'&&<SmartMutationDashboard mutations={mutations} parcels={parcels} currentUser={user} language={language} onApproveMutation={no=>setMutations(mutations.map(m=>m.caseNo===no?{...m,status:'AC_LAND_APPROVED',newKhatian:`DEMO-${Date.now().toString().slice(-6)}`,approvedAt:new Date().toISOString()}:m))}/>}
      {tab==='LD_TAX'&&<LDTaxPortal parcels={parcels} selectedParcel={parcel} taxRecords={taxes} currentUser={user} language={language} onTaxPaid={holding=>setTaxes(current=>current.map(t=>t.holdingNo===holding?{...t,status:'PAID',arrearsBDT:0,totalDueBDT:0,lastPaidDate:new Date().toISOString().split('T')[0],dakhilaNo:`DEMO-DAK-${Date.now().toString().slice(-6)}`}:t))}/>}
      {tab==='CAVEATS_DISPUTES'&&<DisputeAndCaveatManager parcels={parcels} selectedParcel={parcel} caveats={caveats} disputes={mockDisputes} currentUser={user} language={language} onLodgeCaveat={lodge}/>}
      {tab==='FARAID_INHERITANCE'&&<AIInheritanceCalculator parcel={parcel} language={language}/>}
      {tab==='INSAR_EROSION'&&<InSARErosionPortal language={language}/>}
      {tab==='DIASPORA_PORTAL'&&<DiasporaPortal currentUser={user} selectedParcel={parcel} language={language}/>}
      {tab==='AUDIT_EXPLORER'&&<AuditLedgerExplorer language={language}/>}
      {tab==='GOV_API_SANDBOX'&&<GovApiSandbox language={language}/>}
      {tab==='DASHBOARD'&&<RoleDashboardContainer currentUser={user} parcels={filtered} selectedParcel={parcel} onSelectParcel={selectParcel} onNavigateToTab={nav} language={language}/>}
    </Suspense></div>}
  </div>;
}
