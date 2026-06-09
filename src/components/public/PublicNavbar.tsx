import React, { useState } from 'react';
import type { Language } from '../../types';
import { LogIn, Menu, Moon, ShieldCheck, Sun, UserPlus, X } from 'lucide-react';

interface PublicNavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  nightTheme: boolean;
  onToggleTheme: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
}

const navLinks = [
  { id: 'hero', bn: 'ড্যাশবোর্ড', en: 'Dashboard' },
  { id: 'services', bn: 'ভূমি সেবা', en: 'Services' },
  { id: 'search', bn: 'পার্সেল খুঁজুন', en: 'Parcel search' },
  { id: 'map', bn: 'মানচিত্র', en: 'Map' },
  { id: 'how-it-works', bn: 'কীভাবে কাজ করে', en: 'How it works' },
  { id: 'service-info', bn: 'সেবা ও ফি', en: 'Service guide' },
  { id: 'security', bn: 'তথ্য ও নীতি', en: 'Data & policy' },
  { id: 'faq', bn: 'প্রশ্নোত্তর', en: 'FAQ' },
  { id: 'help', bn: 'সহায়তা', en: 'Help' }
];

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ language, onToggleLanguage, nightTheme, onToggleTheme, onOpenLogin, onOpenRegister, activeSection, onNavigateSection }) => {
  const [open, setOpen] = useState(false);
  const navigate = (id: string) => { onNavigateSection(id); setOpen(false); };

  return <header className="bs-public-header sticky top-0 z-40">
    <div className="bs-public-header-inner">
      <button onClick={() => navigate('hero')} className="bs-brand" aria-label="LandTech home">
        <span className="bs-brand-icon"><ShieldCheck size={25} strokeWidth={1.8} /></span>
        <span className="bs-brand-name">LAND<span>TECH</span><small>BANGLADESH · DEMO</small></span>
        <i aria-hidden="true" />
      </button>
      <nav className="bs-header-nav" aria-label={language === 'bn' ? 'প্রধান মেনু' : 'Main navigation'}>
        {navLinks.slice(0, 5).map(link => <button key={link.id} onClick={() => navigate(link.id)} className={activeSection === link.id ? 'active' : ''}>{language === 'bn' ? link.bn : link.en}</button>)}
      </nav>
      <div className="bs-header-tools">
        <div className="bs-language-switch" role="group" aria-label={language === 'bn' ? 'ভাষা নির্বাচন' : 'Choose language'}>
          <button className={language === 'bn' ? 'chosen' : ''} onClick={() => language !== 'bn' && onToggleLanguage()} aria-pressed={language === 'bn'}>বাংলা</button>
          <button className={language === 'en' ? 'chosen' : ''} onClick={() => language !== 'en' && onToggleLanguage()} aria-pressed={language === 'en'}>English</button>
        </div>
        <button className="bs-icon-control" onClick={onToggleTheme} aria-label={nightTheme ? (language === 'bn' ? 'দিনের থিম' : 'Light theme') : (language === 'bn' ? 'রাতের থিম' : 'Night theme')} title={nightTheme ? 'Light theme' : 'Night theme'}>{nightTheme ? <Sun size={18} /> : <Moon size={18} />}</button>
        <button className="bs-icon-control" onClick={() => setOpen(value => !value)} aria-label={open ? (language === 'bn' ? 'মেনু বন্ধ করুন' : 'Close menu') : (language === 'bn' ? 'মেনু খুলুন' : 'Open menu')} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </div>
    {open && <nav className="bs-header-menu" aria-label={language === 'bn' ? 'সব মেনু' : 'All navigation'}>
      <div className="bs-header-menu-inner">
        {navLinks.map(link => <button key={link.id} onClick={() => navigate(link.id)} className={activeSection === link.id ? 'active' : ''}>{language === 'bn' ? link.bn : link.en}</button>)}
        <button onClick={() => { onOpenLogin(); setOpen(false); }}><LogIn size={16} />{language === 'bn' ? 'ডেমো কর্মক্ষেত্র' : 'Demo workspace'}</button>
        <button onClick={() => { onOpenRegister(); setOpen(false); }}><UserPlus size={16} />{language === 'bn' ? 'ডেমো প্রোফাইল' : 'Demo profile'}</button>
      </div>
    </nav>}
  </header>;
};
