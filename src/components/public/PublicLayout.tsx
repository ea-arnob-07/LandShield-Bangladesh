import React, { useEffect, useRef, useState } from 'react';
import { Language, LandParcel } from '../../types';
import { PublicNavbar } from './PublicNavbar';
import { PublicHero } from './PublicHero';
import { PublicServices } from './PublicServices';
import { PublicLandSearch } from './PublicLandSearch';
import { PublicHowItWorks } from './PublicHowItWorks';
import { PublicServiceInfo } from './PublicServiceInfo';
import { PublicTrustSecurity } from './PublicTrustSecurity';
import { PublicFAQ } from './PublicFAQ';
import { PublicHelpSupport } from './PublicHelpSupport';
import { PublicFooter } from './PublicFooter';
import { CadastralMap } from '../gis/CadastralMap';

interface PublicLayoutProps {
  language: Language;
  onToggleLanguage: () => void;
  nightTheme: boolean;
  onToggleTheme: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  parcels: LandParcel[];
  onSelectParcel: (parcelId: string) => void;
}

const PublicMapSection: React.FC<{ language: Language }> = ({ language }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: '80px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return <section id="map" ref={sectionRef} className="py-14 sm:py-20 bg-[#eef4ef] border-y border-[#dce8df] scroll-mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <span className="text-xs font-extrabold tracking-widest text-emerald-700">{language === 'bn' ? 'মানচিত্র · বাস্তব ভূচিত্র' : 'MAP · REAL IMAGERY'}</span>
      <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 mb-2">{language === 'bn' ? 'স্যাটেলাইটে এলাকা ও জায়গার নাম দেখুন' : 'Explore satellite imagery and place names'}</h2>
      <p className="text-sm text-slate-600 mb-6">{language === 'bn' ? 'মানচিত্রে ঘুরে দেখুন। রাস্তার মানচিত্রে বাংলা স্থাননামও পাওয়া যাবে।' : 'Pan and zoom the map. The street view also shows local place names.'}</p>
      {visible ? <CadastralMap parcels={[]} selectedParcel={null} onSelectParcel={() => {}} language={language} /> : <div className="h-[400px] bg-[#dce9df] border border-[#c7d9cb] flex items-center justify-center text-emerald-900 font-bold">{language === 'bn' ? 'মানচিত্র খুলছে…' : 'Opening map…'}</div>}
    </div>
  </section>;
};

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  language,
  onToggleLanguage,
  nightTheme,
  onToggleTheme,
  onOpenLogin,
  onOpenRegister,
  parcels,
  onSelectParcel
}) => {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bs-public-root min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Public Navbar */}
      <PublicNavbar
        language={language}
        onToggleLanguage={onToggleLanguage}
        nightTheme={nightTheme}
        onToggleTheme={onToggleTheme}
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
        activeSection={activeSection}
        onNavigateSection={scrollToSection}
      />

      {/* Hero Section */}
      <div id="hero">
        <PublicHero
          language={language}
          parcels={parcels}
          onSearchLandClick={() => scrollToSection('search')}
          onExploreServicesClick={() => scrollToSection('services')}
          onMapClick={() => scrollToSection('map')}
          onLoginClick={onOpenLogin}
        />
      </div>

      {/* Services Section */}
      <PublicServices
        language={language}
        onSelectService={serviceKey => scrollToSection(serviceKey === 'GIS_MAP' ? 'map' : 'search')}
        onOpenLogin={onOpenLogin}
      />

      {/* Public Land Search Section */}
      <PublicLandSearch
        parcels={parcels}
        language={language}
        onOpenLogin={onOpenLogin}
        onSelectParcel={onSelectParcel}
      />

      <PublicMapSection language={language} />

      {/* How It Works Section */}
      <PublicHowItWorks
        language={language}
        onOpenLogin={onOpenLogin}
        onStartSearch={() => scrollToSection('search')}
      />

      {/* Service Information & Fees Section */}
      <PublicServiceInfo
        language={language}
        onOpenLogin={onOpenLogin}
      />

      {/* Trust & Security Section */}
      <PublicTrustSecurity
        language={language}
      />

      {/* FAQ Section */}
      <PublicFAQ
        language={language}
      />

      {/* Help & Support Section */}
      <PublicHelpSupport
        language={language}
      />

      {/* Public Footer */}
      <PublicFooter
        language={language}
        onNavigateSection={scrollToSection}
        onOpenLogin={onOpenLogin}
      />
    </div>
  );
};
