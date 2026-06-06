import React from 'react';
import type { LandParcel, Language } from '../../types';
import { ArrowRight, CircleHelp, ClipboardList, FileText, MapPin, Search, ShieldCheck } from 'lucide-react';

interface PublicHeroProps {
  language: Language;
  parcels: LandParcel[];
  onSearchLandClick: () => void;
  onExploreServicesClick: () => void;
  onMapClick: () => void;
  onLoginClick: () => void;
}

export const PublicHero: React.FC<PublicHeroProps> = ({ language, parcels, onSearchLandClick, onExploreServicesClick, onMapClick, onLoginClick }) => {
  const highRisk = parcels.filter(parcel => parcel.riskLevel === 'HIGH' || parcel.riskLevel === 'CRITICAL').length;
  const disputed = parcels.filter(parcel => parcel.status === 'DISPUTED' || parcel.status === 'LOCKED_CAVEAT').length;
  const stats = [
    [parcels.length, language === 'bn' ? 'মোট নমুনা পার্সেল' : 'Sample parcels'],
    [highRisk, language === 'bn' ? 'উচ্চ ঝুঁকির নমুনা' : 'High risk samples'],
    [disputed, language === 'bn' ? 'বিরোধ/সতর্কতা নমুনা' : 'Dispute samples'],
    [10, language === 'bn' ? 'ডেমো ভূমিকা' : 'Demo roles']
  ] as const;
  const shortcuts = [
    { title: language === 'bn' ? 'ভূমি সেবা' : 'Land services', sub: language === 'bn' ? 'সব মডিউল ও কাজ' : 'Modules and tasks', icon: <ClipboardList size={22} />, action: onExploreServicesClick },
    { title: language === 'bn' ? 'নথি কেন্দ্র' : 'Records centre', sub: language === 'bn' ? 'নমুনা রেকর্ড খুঁজুন' : 'Explore sample records', icon: <FileText size={22} />, action: onSearchLandClick },
    { title: language === 'bn' ? 'স্যাটেলাইট মানচিত্র' : 'Satellite map', sub: language === 'bn' ? 'বাস্তব ছবি ও স্থাননাম' : 'Real imagery and labels', icon: <MapPin size={22} />, action: onMapClick },
    { title: language === 'bn' ? 'ডেমো কর্মক্ষেত্র' : 'Demo workspace', sub: language === 'bn' ? 'ভূমিকা অনুযায়ী পর্যালোচনা' : 'Role-based review', icon: <ShieldCheck size={22} />, action: onLoginClick }
  ];

  return <div className="bs-home-shell">
    <section className="bs-hero" aria-labelledby="bs-hero-title">
      <div className="bs-hero-photo" />
      <div className="bs-hero-scrim" />
      <div className="bs-hero-content">
        <div className="bs-hero-kicker"><ShieldCheck size={17} />{language === 'bn' ? 'ল্যান্ডটেক · বাংলাদেশ' : 'LANDTECH · BANGLADESH'}</div>
        <h1 id="bs-hero-title">{language === 'bn' ? <>ভূমির তথ্য এক জায়গায়।<br /><span>সিদ্ধান্ত হোক যাচাই করে।</span></> : <>Land information in one place.<br /><span>Decide with clarity.</span></>}</h1>
        <p>{language === 'bn' ? 'পার্সেল, খতিয়ান, দলিল, কর, ঝুঁকি ও বিরোধের অবস্থা—একটি নমুনা কর্মক্ষেত্রে দেখুন। বাস্তব সিদ্ধান্তের আগে মূল রেকর্ড যাচাই করুন।' : 'Explore sample parcels, records, deeds, tax, risk and disputes in one workspace. Verify original records before a real decision.'}</p>
        <div className="bs-hero-actions">
          <button className="primary" onClick={onSearchLandClick}><Search size={17} />{language === 'bn' ? 'পার্সেল খুঁজুন' : 'Find a parcel'}<ArrowRight size={16} /></button>
          <button className="secondary" onClick={onExploreServicesClick}>{language === 'bn' ? 'ভূমি সেবা দেখুন' : 'Explore services'}</button>
        </div>
      </div>
      <div className="bs-hero-stamp"><strong>01 / 10</strong><span>{language === 'bn' ? 'সচল ডেমো' : 'LIVE DEMO'}</span><small>{language === 'bn' ? 'নমুনা ডেটা' : 'SAMPLE DATA'}</small></div>
    </section>
    <div className="bs-stats-strip" aria-label={language === 'bn' ? 'নমুনা তথ্যের হিসাব' : 'Sample data statistics'}>
      {stats.map(([number, label]) => <div key={label}><strong>{String(number).padStart(2, '0')}</strong><span>{label}</span></div>)}
    </div>
    <div className="bs-demo-strip"><CircleHelp size={17} /><span>{language === 'bn' ? 'প্রদর্শনীর সব জমির তথ্য কাল্পনিক। স্যাটেলাইট চিত্র ছাড়া এটি সরকারি পোর্টাল, লাইভ রেজিস্ট্রি বা আইনি যাচাই নয়।' : 'All parcel records are fictional. Apart from satellite imagery, this is not a government portal, live registry or legal verification.'}</span></div>
    <div className="bs-service-shortcuts">
      {shortcuts.map(shortcut => <button key={shortcut.title} onClick={shortcut.action}><span className="bs-shortcut-icon">{shortcut.icon}</span><strong>{shortcut.title}</strong><small>{shortcut.sub}</small><ArrowRight size={17} className="bs-shortcut-arrow" /></button>)}
    </div>
  </div>;
};
