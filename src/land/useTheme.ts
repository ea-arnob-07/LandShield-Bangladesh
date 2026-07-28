import { useEffect, useState } from 'react';

export type Theme='light'|'dark';
const readPreference=():Theme|null=>{
  try{const value=localStorage.getItem('ns-theme');return value==='light'||value==='dark'?value:null;}catch{return null;}
};
const systemTheme=():Theme=>typeof window!=='undefined'&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';

export function useTheme(){
  const [preference,setPreference]=useState<Theme|null>(readPreference);
  const [system,setSystem]=useState<Theme>(systemTheme);
  const theme=preference||system;
  useEffect(()=>{
    const media=window.matchMedia('(prefers-color-scheme: dark)');
    const change=()=>setSystem(media.matches?'dark':'light');
    const storage=(event:StorageEvent)=>{if(event.key==='ns-theme'||event.key===null)setPreference(readPreference());};
    media.addEventListener('change',change);window.addEventListener('storage',storage);
    return()=>{media.removeEventListener('change',change);window.removeEventListener('storage',storage);};
  },[]);
  useEffect(()=>{
    const root=document.documentElement;root.dataset.theme=theme;root.style.colorScheme=theme;
    root.classList.toggle('dark',theme==='dark');root.classList.toggle('light',theme==='light');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#101c1b':'#f5f8f7');
  },[theme]);
  const toggle=()=>{
    const next=theme==='dark'?'light':'dark';setPreference(next);
    try{localStorage.setItem('ns-theme',next);}catch{}
  };
  return {theme,toggle};
}

