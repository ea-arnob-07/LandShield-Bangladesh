import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import type { LandParcel, Language } from '../../types';
import { Compass, Crosshair, Layers3, LoaderCircle, Map as MapIcon, Maximize2, Navigation, RotateCcw, Satellite, Search, ShieldAlert, X } from 'lucide-react';
import { api } from '../../land/api';
import type { ReportMapPoint } from '../../land/types';
import { BANGLADESH_BOUNDS, findParcelMatches, parcelCenter, parseCoordinates } from './map-utils';
import type { Coordinate, PlaceResult } from './map-utils';

interface CadastralMapProps {parcels:LandParcel[];selectedParcel:LandParcel|null;onSelectParcel:(parcel:LandParcel)=>void;language:Language;reportPoints?:ReportMapPoint[];onSelectReport?:(id:string)=>void}
type MapStyle='satellite'|'streets';
interface MapPoint {coordinates:Coordinate;label:string;source:'location'|'coordinates'|'place'|'parcel';accuracy?:number}
const SATELLITE_TILES='https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2025_3857/default/g/{z}/{y}/{x}.jpg';
const STREET_TILES='https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const SATELLITE_ATTRIBUTION='<a href="https://maps.eox.at/" target="_blank" rel="noopener noreferrer">EOX::Maps</a> · EOxCloudless (Copernicus Sentinel 2025)';
const STREET_ATTRIBUTION='© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';
const escapeHtml=(value:string)=>value.replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]||char));

export const CadastralMap=React.memo(function CadastralMap({parcels,selectedParcel,onSelectParcel,language,reportPoints,onSelectReport}:CadastralMapProps){
  const bn=language==='bn',uid=useId();
  // The portal destination remains the same DOM element. Moving that element
  // between the inline slot and native dialog preserves Leaflet and its tiles.
  const [host]=useState(()=>typeof document==='undefined'?null:document.createElement('div'));
  const inlineSlot=useRef<HTMLDivElement>(null),dialogSlot=useRef<HTMLDivElement>(null),dialog=useRef<HTMLDialogElement>(null);
  const input=useRef<HTMLInputElement>(null),closeButton=useRef<HTMLButtonElement>(null),returnFocus=useRef<HTMLElement|null>(null);
  const suppressFocus=useRef(false),focusInput=useRef(false),pendingOverview=useRef(false);
  const nodeRef=useRef<HTMLDivElement>(null),mapRef=useRef<L.Map|null>(null),groupRef=useRef<L.LayerGroup|null>(null),pointGroup=useRef<L.LayerGroup|null>(null);
  const request=useRef<AbortController|null>(null),navigationToken=useRef(0);
  const [expanded,setExpanded]=useState(false),[mapReady,setMapReady]=useState(false),[style,setStyle]=useState<MapStyle>('streets');
  const [attempt,setAttempt]=useState(0),[loading,setLoading]=useState(true),[mapError,setMapError]=useState(false),[fallback,setFallback]=useState(false),[labelsError,setLabelsError]=useState(false);
  const [query,setQuery]=useState(''),[searching,setSearching]=useState(false),[locating,setLocating]=useState(false),[error,setError]=useState('');
  const [places,setPlaces]=useState<PlaceResult[]>([]),[matches,setMatches]=useState<LandParcel[]>([]),[point,setPoint]=useState<MapPoint|null>(null);
  const [showSamplePlots,setShowSamplePlots]=useState(false),[showRisk,setShowRisk]=useState(true),[showNodes,setShowNodes]=useState(true),[surveyWalk,setSurveyWalk]=useState(false),[surveyNode,setSurveyNode]=useState(0);

  const cancelNavigation=()=>{navigationToken.current++;request.current?.abort();request.current=null;setSearching(false);setLocating(false);return navigationToken.current;};
  const openMap=(fromInput=false)=>{
    if(suppressFocus.current||expanded)return;
    returnFocus.current=document.activeElement instanceof HTMLElement?document.activeElement:null;
    focusInput.current=fromInput;pendingOverview.current=true;setExpanded(true);
  };
  const closeMap=()=>{cancelNavigation();setExpanded(false);};
  const choosePoint=(next:MapPoint)=>{pendingOverview.current=false;setPoint(next);setError('');setPlaces([]);setMatches([]);};
  const chooseSample=(parcel:LandParcel)=>{const coordinates=parcelCenter(parcel);if(!coordinates)return;cancelNavigation();onSelectParcel(parcel);setShowSamplePlots(true);choosePoint({coordinates,label:`${bn?parcel.mouzaBn:parcel.mouza} · ${bn?'নমুনা দাগ':'Sample plot'} ${parcel.dagNo}`,source:'parcel'});};

  useLayoutEffect(()=>{
    if(!host)return;host.className='bs-map-host';
    const slot=expanded?dialogSlot.current:inlineSlot.current;if(!slot)return;slot.appendChild(host);
    const previousOverflow=document.body.style.overflow;
    if(expanded){document.body.style.overflow='hidden';if(!dialog.current?.open)dialog.current?.showModal();}
    else if(dialog.current?.open){suppressFocus.current=true;dialog.current.close();}
    const frame=requestAnimationFrame(()=>{
      const map=mapRef.current;map?.invalidateSize({pan:false});
      if(expanded){map?.scrollWheelZoom.enable();if(pendingOverview.current&&map){map.fitBounds(BANGLADESH_BOUNDS,{padding:[24,24],animate:false});pendingOverview.current=false;}(focusInput.current?input.current:closeButton.current)?.focus({preventScroll:true});}
      else{map?.scrollWheelZoom.disable();if(suppressFocus.current)returnFocus.current?.focus({preventScroll:true});suppressFocus.current=false;}
    });
    return()=>{cancelAnimationFrame(frame);if(expanded){suppressFocus.current=true;dialog.current?.close();document.body.style.overflow=previousOverflow;}};
  },[expanded,host]);

  useEffect(()=>{
    if(!nodeRef.current)return;
    const map=L.map(nodeRef.current,{zoomControl:false,scrollWheelZoom:false,attributionControl:true,zoomSnap:.25});
    map.fitBounds(BANGLADESH_BOUNDS,{padding:[20,20],animate:false});
    L.control.zoom({position:'bottomright'}).addTo(map);mapRef.current=map;groupRef.current=L.layerGroup().addTo(map);pointGroup.current=L.layerGroup().addTo(map);
    let frame=0;const observer=new ResizeObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>map.invalidateSize({pan:false}));});observer.observe(nodeRef.current);
    setMapReady(true);
    return()=>{observer.disconnect();cancelAnimationFrame(frame);navigationToken.current++;request.current?.abort();map.remove();mapRef.current=null;groupRef.current=null;pointGroup.current=null;};
  },[]);

  useEffect(()=>{
    const map=mapRef.current;if(!mapReady||!map)return;
    let active=true,loaded=false,labelLoaded=false;setLoading(true);setMapError(false);setLabelsError(false);
    const fail=()=>{if(!active||loaded)return;if(style==='satellite'){setFallback(true);setStyle('streets');}else{setLoading(false);setMapError(true);}};
    const base=L.tileLayer(style==='satellite'?SATELLITE_TILES:STREET_TILES,{minZoom:2,maxZoom:style==='satellite'?18:19,...(style==='satellite'?{maxNativeZoom:14}:{}),keepBuffer:2,updateWhenIdle:true,attribution:style==='satellite'?SATELLITE_ATTRIBUTION:STREET_ATTRIBUTION});
    const labels=style==='satellite'?L.tileLayer.wms('https://tiles.maps.eox.at/wms',{layers:'overlay_bright_3857',format:'image/png',transparent:true,version:'1.1.1',minZoom:2,maxZoom:18,updateWhenIdle:true,attribution:STREET_ATTRIBUTION+' · EOX labels'}):null;
    base.on('tileload',()=>{if(!active)return;loaded=true;setLoading(false);setMapError(false);});
    // One failed tile does not discard a map whose other tiles loaded.
    base.on('load',()=>{if(!loaded)fail();});labels?.on('tileload',()=>{labelLoaded=true;if(active)setLabelsError(false);});labels?.on('load',()=>{if(active&&!labelLoaded)setLabelsError(true);});
    base.addTo(map);labels?.addTo(map);const timeout=window.setTimeout(()=>{fail();if(active&&loaded&&labels&&!labelLoaded)setLabelsError(true);},8000);map.invalidateSize({pan:false});
    return()=>{active=false;clearTimeout(timeout);labels?.remove();base.remove();};
  },[mapReady,style,attempt]);

  useEffect(()=>{
    const group=groupRef.current;if(!mapReady||!group)return;group.clearLayers();if(!showSamplePlots)return;
    parcels.forEach(parcel=>{
      const selected=parcel.landId===selectedParcel?.landId;
      const color=parcel.erosionStatus==='ACTIVE_EROSION'?'#138a9b':parcel.riskScore>=70||parcel.vulnerability==='KHAS'?'#cb4b43':parcel.riskScore>=40?'#c58b35':'#0c8a64';
      const polygon=L.polygon(parcel.polygon,{color:selected?'#074f3b':color,weight:selected?4:2,dashArray:'7,5',fillColor:showRisk?color:'#658279',fillOpacity:selected ? .32 : .19});
      polygon.on('click',()=>chooseSample(parcel));polygon.bindTooltip(`<strong>${escapeHtml(bn?parcel.mouzaBn:parcel.mouza)}</strong><br>${bn?'নমুনা দাগ':'Sample plot'} ${escapeHtml(parcel.dagNo)} · ${escapeHtml(parcel.landId)}`,{sticky:true});group.addLayer(polygon);
      if(showNodes&&selected)parcel.boundaryPoints.forEach((p,index)=>{const marker=L.circleMarker([p.lat,p.lng],{radius:surveyWalk&&surveyNode===index?9:6,color:'#fff',weight:2,fillColor:p.isEncroached?'#c14942':'#0b6e51',fillOpacity:1});marker.bindTooltip(`${bn?'নমুনা নোড':'Sample node'} ${index+1}: ${escapeHtml(p.label)}`);group.addLayer(marker);});
    });
  },[mapReady,parcels,selectedParcel,onSelectParcel,language,showSamplePlots,showRisk,showNodes,surveyWalk,surveyNode]);

  useEffect(()=>{
    const map=mapRef.current;if(!mapReady||!map||!reportPoints)return;
    const group=L.layerGroup().addTo(map),points=new Map<string,ReportMapPoint[]>();
    const selectReport=(id:string)=>{closeMap();onSelectReport?.(id);};
    for(const report of reportPoints){const key=`${report.latitude},${report.longitude}`;points.set(key,[...(points.get(key)||[]),report]);}
    for(const reports of points.values()){
      const first=reports[0],high=reports.some(r=>r.risk==='HIGH'),medium=reports.some(r=>r.risk==='MEDIUM');
      const low=reports.some(r=>r.risk==='LOW');
      const marker=L.circleMarker([first.latitude,first.longitude],{radius:reports.length>1?11:8,weight:2,color:'#fff',fillColor:high?'#bd403c':medium?'#b7781c':low?'#087557':'#326b9b',fillOpacity:.9});
      const area=[first.district,first.upazila].filter(Boolean).join(' · ');
      marker.bindTooltip(escapeHtml(reports.length>1?`${area} · ${reports.length} ${bn?'টি রিপোর্ট':'reports'}`:`${first.title}${area?' · '+area:''}`));
      if(reports.length===1)marker.on('click',()=>selectReport(first.id));
      else{
        const panel=document.createElement('div');panel.className='bs-report-map-popup';
        const heading=document.createElement('strong');heading.textContent=area|| (bn?'একই অবস্থানে জমা রিপোর্ট':'Reports at this location');panel.append(heading);
        for(const report of reports){const button=document.createElement('button');button.type='button';button.textContent=report.title;button.addEventListener('click',()=>{map.closePopup();selectReport(report.id);});panel.append(button);}
        marker.bindPopup(panel,{maxHeight:220});
      }
      group.addLayer(marker);
      const element=marker.getElement();
      if(element){element.setAttribute('tabindex','0');element.setAttribute('role','button');element.setAttribute('aria-label',reports.length>1?`${area} · ${reports.length} ${bn?'টি রিপোর্ট খুলুন':'reports: open list'}`:`${bn?'রিপোর্ট খুলুন: ':'Open report: '}${first.title}`);element.addEventListener('keydown',event=>{const key=(event as KeyboardEvent).key;if(key==='Enter'||key===' '){event.preventDefault();if(reports.length>1)marker.openPopup();else selectReport(first.id);}});}
    }
    return()=>{group.remove();};
  },[mapReady,reportPoints,onSelectReport,bn]);

  useEffect(()=>{
    const map=mapRef.current,group=pointGroup.current;if(!mapReady||!map||!group)return;group.clearLayers();if(!point)return;
    const marker=L.circleMarker(point.coordinates,{radius:9,weight:3,color:'#fff',fillColor:point.source==='location'?'#2477d7':'#087557',fillOpacity:1});marker.bindTooltip(escapeHtml(point.label));group.addLayer(marker);
    if(point.source==='location'&&point.accuracy){const circle=L.circle(point.coordinates,{radius:point.accuracy,color:'#2477d7',weight:1,fillOpacity:.09});group.addLayer(circle);map.fitBounds(circle.getBounds(),{maxZoom:15,padding:[35,35],animate:false});}
    else if(point.source==='parcel'&&selectedParcel)map.fitBounds(L.latLngBounds(selectedParcel.polygon),{maxZoom:16,padding:[35,35],animate:false});
    else map.setView(point.coordinates,15,{animate:false});
  },[mapReady,point]);

  useEffect(()=>{if(!surveyWalk||!selectedParcel?.boundaryPoints.length||!showSamplePlots)return;const timer=setInterval(()=>setSurveyNode(n=>(n+1)%selectedParcel.boundaryPoints.length),2000);return()=>clearInterval(timer);},[surveyWalk,selectedParcel,showSamplePlots]);

  const search=async(event:React.FormEvent)=>{
    event.preventDefault();openMap(true);const token=cancelNavigation();setError('');setMatches([]);setPlaces([]);
    try{
      const coordinates=parseCoordinates(query);if(coordinates){choosePoint({coordinates,label:bn?'আপনার দেওয়া স্থানাঙ্ক':'Entered coordinates',source:'coordinates'});return;}
      const found=findParcelMatches(parcels,query);if(found.length){if(found.length===1)chooseSample(found[0]);else setMatches(found);return;}
      if(/^(?:bd-|দাগ|খতিয়ান|খতিয়ান|ulid|plot|khatian|[\d০-৯.+-]+$)/i.test(query.trim()))throw new Error(bn?'জায়গার নাম অথবা অক্ষাংশ, দ্রাঘিমাংশ দিন। শুধু দাগ নম্বর দিয়ে সারা দেশের সরকারি রেকর্ড খোঁজা যায় না।':'Enter a place name or latitude, longitude. A plot number alone cannot search nationwide official records.');
      const controller=new AbortController();request.current=controller;setSearching(true);
      const response=await api<{items:PlaceResult[]}>(`/map/search?q=${encodeURIComponent(query.trim())}`,{signal:controller.signal},8000);
      if(token!==navigationToken.current)return;
      if(response.items.length===1){const p=response.items[0];choosePoint({coordinates:[p.lat,p.lng],label:p.label,source:'place'});}else if(response.items.length)setPlaces(response.items);else setError(bn?'এই নামে জায়গা পাওয়া যায়নি। উপজেলা / জেলা যোগ করে লিখুন, অথবা স্থানাঙ্ক দিন।':'No matching place. Add the upazila or district, or enter coordinates.');
    }catch(e){if(token===navigationToken.current&&(e as Error).name!=='AbortError')setError((e as Error).message);}finally{if(token===navigationToken.current)setSearching(false);}
  };
  const locate=()=>{
    openMap();const token=cancelNavigation();setError('');setPlaces([]);setMatches([]);
    if(!navigator.geolocation){setError(bn?'এই ব্রাউজারে লোকেশন পাওয়া যায় না। স্থানাঙ্ক লিখুন।':'Geolocation is unavailable. Enter coordinates.');return;}
    setLocating(true);navigator.geolocation.getCurrentPosition(position=>{if(token!==navigationToken.current)return;setLocating(false);choosePoint({coordinates:[position.coords.latitude,position.coords.longitude],accuracy:Math.max(1,position.coords.accuracy),label:bn?'আপনার বর্তমান অবস্থান':'Your current location',source:'location'});},failure=>{if(token!==navigationToken.current)return;setLocating(false);setError(bn?(failure.code===1?'লোকেশনের অনুমতি দেওয়া হয়নি। ব্রাউজারে Location অনুমতি দিন, অথবা স্থানাঙ্ক লিখুন।':failure.code===3?'লোকেশন পেতে সময় লাগছে। আবার চেষ্টা করুন, অথবা স্থানাঙ্ক লিখুন।':'লোকেশন পাওয়া যায়নি। GPS / Location চালু করে আবার চেষ্টা করুন।'):'Location unavailable. Allow Location in your browser or enter coordinates.');},{enableHighAccuracy:false,timeout:10000,maximumAge:30000});
  };
  const changeStyle=(next:MapStyle)=>{setFallback(false);if(next!==style)setStyle(next);else if(mapError)setAttempt(n=>n+1);};
  const overview=()=>{cancelNavigation();setPoint(null);setPlaces([]);setMatches([]);setError('');mapRef.current?.fitBounds(BANGLADESH_BOUNDS,{padding:[24,24],animate:false});};
  const external=point?`https://www.openstreetmap.org/#map=15/${point.coordinates[0]}/${point.coordinates[1]}`:'https://www.openstreetmap.org/#map=7/23.7/90.4';
  const content=<div className="bs-map-content">
    <header className="bs-map-heading"><div><span>{bn?'সহজ ভূমি অনুসন্ধান':'LAND MAP EXPLORER'}</span><h2 id={`${uid}-title`}>{bn?'জায়গা খুঁজুন, ম্যাপে দেখুন':'Find a place on the map'}</h2></div><button ref={closeButton} className="bs-map-expand" onClick={()=>expanded?closeMap():openMap()} aria-label={bn?expanded?'পূর্ণ মানচিত্র বন্ধ করুন':'পূর্ণ মানচিত্র খুলুন':expanded?'Close expanded map':'Expand map'}>{expanded?<X size={20}/>:<Maximize2 size={18}/>}<span>{bn?expanded?'বন্ধ করুন':'পূর্ণ ম্যাপ':expanded?'Close':'Expand'}</span></button></header>
    <div className="bs-map-search-area"><form onSubmit={search} className="bs-map-search"><label htmlFor={`${uid}-query`}>{bn?parcels.length?'জায়গার নাম, স্থানাঙ্ক অথবা নমুনা জমি':'বাংলাদেশের যেকোনো জায়গার নাম বা স্থানাঙ্ক':parcels.length?'Place name, coordinates or sample parcel':'Any place in Bangladesh or coordinates'}</label><div><Search size={18}/><input ref={input} id={`${uid}-query`} value={query} maxLength={180} onFocus={()=>openMap(true)} onChange={e=>{setQuery(e.target.value);setError('');setPlaces([]);setMatches([]);}} placeholder={bn?'জেলা / উপজেলা / এলাকার নাম অথবা অক্ষাংশ, দ্রাঘিমাংশ':'District / upazila / place or latitude, longitude'} aria-describedby={`${uid}-hint`} autoComplete="off"/><button type="submit" disabled={searching||!query.trim()}>{searching?<LoaderCircle size={17} className="spin"/>:<Search size={17}/>}<span>{bn?'খুঁজুন':'Search'}</span></button></div></form><button className="bs-map-location" onClick={locate} disabled={locating||!mapReady}>{locating?<LoaderCircle size={18} className="spin"/>:<Crosshair size={18}/>}<span>{bn?locating?'লোকেশন পাওয়া হচ্ছে…':'আমার লাইভ লোকেশন':locating?'Locating…':'My live location'}</span></button></div>
    <p id={`${uid}-hint`} className="bs-map-hint">{bn?'ইনপুটে ক্লিক করলেই পূর্ণ ম্যাপ খুলবে। জায়গা খুঁজতে শুধু এলাকার নাম দিন; GPS অবস্থান আপনার ব্রাউজারেই থাকে।':'Click the input to expand. Search with a public place name; GPS stays in your browser.'}</p>
    {(error||locating||searching)&&<p className={`bs-map-feedback ${error?'error':''}`} role={error?'alert':'status'}>{error||(locating?(bn?'ব্রাউজারে লোকেশনের অনুমতি দিন। অবস্থান পেলে ম্যাপ সেখানে যাবে।':'Allow Location when prompted. The map will show your position.'):(bn?'জায়গা খোঁজা হচ্ছে…':'Searching for a place…'))}</p>}
    {(places.length>0||matches.length>0)&&<ul className="bs-map-results" aria-label={bn?'অনুসন্ধানের ফল':'Search results'}>{matches.map(p=><li key={p.landId}><button onClick={()=>chooseSample(p)}><MapIcon size={17}/><span><strong>{bn?p.mouzaBn:p.mouza} · {bn?'নমুনা দাগ':'Sample plot'} {p.dagNo}</strong><small>{p.landId} · {bn?'খতিয়ান':'Khatian'} {p.khatianNo}</small></span></button></li>)}{places.map(p=><li key={p.id}><button onClick={()=>{cancelNavigation();choosePoint({coordinates:[p.lat,p.lng],label:p.label,source:'place'});}}><MapIcon size={17}/><span><strong>{p.label}</strong><small>Photon / OpenStreetMap</small></span></button></li>)}</ul>}
      {(fallback||labelsError)&&!mapError&&<div className="bs-map-feedback" role="status">{bn?fallback?'স্যাটেলাইটের বদলে দ্রুত রাস্তার মানচিত্র দেখানো হচ্ছে।':'ছবি দেখা যাচ্ছে; জায়গার নামের স্তরটি পাওয়া যায়নি।':fallback?'Showing streets while satellite imagery is unavailable.':'Imagery loaded; the labels layer is unavailable.'}</div>}
    <div className="bs-map-shell">
      <div ref={nodeRef} className="bs-map-canvas" role="region" aria-label={bn?'জায়গার নামসহ ইন্টারঅ্যাকটিভ মানচিত্র':'Interactive map with place names'}/>
      <div className="bs-map-tools" role="group" aria-label={bn?'মানচিত্রের ধরন':'Map style'}><button className={style==='streets'?'active':''} aria-pressed={style==='streets'} onClick={()=>changeStyle('streets')}><MapIcon size={16}/>{bn?'রাস্তা ও জায়গার নাম':'Streets & places'}</button><button className={style==='satellite'?'active':''} aria-pressed={style==='satellite'} onClick={()=>changeStyle('satellite')}><Satellite size={16}/>{bn?'স্যাটেলাইট':'Satellite'}</button></div>
      <div className="bs-map-options"><button onClick={overview}><RotateCcw size={15}/>{bn?'পুরো বাংলাদেশ':'Bangladesh overview'}</button>{parcels.length>0&&<button className={showSamplePlots?'active':''} aria-pressed={showSamplePlots} onClick={()=>{setShowSamplePlots(v=>!v);setSurveyWalk(false);}}><Layers3 size={15}/>{bn?'নমুনা দাগ':'Sample plots'}</button>}{parcels.length>0&&showSamplePlots&&<><button className={showRisk?'active':''} aria-pressed={showRisk} onClick={()=>setShowRisk(v=>!v)}><ShieldAlert size={15}/>{bn?'ঝুঁকির রং':'Risk colors'}</button><button className={showNodes?'active':''} aria-pressed={showNodes} onClick={()=>setShowNodes(v=>!v)}><Compass size={15}/>{bn?'নোড':'Nodes'}</button><button className={surveyWalk?'active':''} aria-pressed={surveyWalk} onClick={()=>setSurveyWalk(v=>!v)}><Navigation size={15}/>{bn?'নোড পরিক্রমা':'Node walk'}</button></>}</div>

      {loading&&!mapError&&<div className="bs-map-status" role="status"><LoaderCircle size={15} className="spin"/>{bn?'মানচিত্র আসছে…':'Loading map…'}</div>}
      {mapError&&<div className="bs-map-status bs-map-error" role="alert"><strong>{bn?'মানচিত্রের ছবি পাওয়া যাচ্ছে না।':'Map tiles are unavailable.'}</strong><button onClick={()=>setAttempt(n=>n+1)}>{bn?'আবার চেষ্টা':'Retry'}</button><a href={external} target="_blank" rel="noopener noreferrer">{bn?'OpenStreetMap-এ খুলুন':'Open in OpenStreetMap'}</a></div>}
      {point&&<div className="bs-map-selected bs-map-point"><span>{point.source==='parcel'?(bn?'নমুনা জমি':'SAMPLE PARCEL'):point.source==='location'?(bn?'লাইভ অবস্থান':'YOUR LOCATION'):(bn?'নির্বাচিত অবস্থান':'SELECTED LOCATION')}</span><strong>{point.label}</strong><small>{point.coordinates.map(v=>v.toFixed(6)).join(', ')}{point.accuracy?` · ± ${Math.round(point.accuracy)} m`:''}</small></div>}
      {!point&&showSamplePlots&&selectedParcel&&<div className="bs-map-selected"><span>{bn?'নমুনা পার্সেল':'SAMPLE PARCEL'}</span><strong>{bn?selectedParcel.mouzaBn:selectedParcel.mouza}</strong><small>{selectedParcel.landId} · {bn?'দাগ':'Plot'} {selectedParcel.dagNo}</small></div>}
      <div className="bs-map-disclaimer">{bn?reportPoints?'পিনগুলো আবেদনে দেওয়া অবস্থান; জমির আইনি সীমানা নয়।':parcels.length?'আঁকা দাগ ও সীমানা নমুনা; আইনি সীমানা নয়।':'সারা বাংলাদেশে অনুসন্ধান করুন। এটি সরকারি ক্যাডাস্ট্রাল রেকর্ড নয়।':reportPoints?'Pins are submitted locations, not legal land boundaries.':parcels.length?'Sample boundaries have no legal standing.':'Search across Bangladesh. This is not an official cadastral record.'}</div>
    </div>
    <footer className="bs-map-source">{bn?'জায়গা অনুসন্ধান:':'Place search:'} Photon · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a><span>{expanded?(bn?'Esc চাপলেও বন্ধ হবে':'Press Esc to close'):(bn?'ইনপুট ও লোকেশনে পূর্ণ ম্যাপ':'Input and Location expand the map')}</span></footer>
  </div>;
  return <div className="bs-map-workbench"><div ref={inlineSlot}/><dialog ref={dialog} className="bs-map-dialog" aria-labelledby={`${uid}-title`} onCancel={e=>{e.preventDefault();closeMap();}} onClose={()=>{if(!dialog.current?.open)setExpanded(false);}}><div ref={dialogSlot}/></dialog>{host&&createPortal(content,host)}</div>;
});
