import type { CurrentPosition,LandPoint } from './types';
export const locationMapUrl=(point:Pick<CurrentPosition,'latitude'|'longitude'>)=>`https://www.openstreetmap.org/?mlat=${point.latitude.toFixed(6)}&mlon=${point.longitude.toFixed(6)}#map=17/${point.latitude.toFixed(6)}/${point.longitude.toFixed(6)}`;
export const coordinateText=(point:Pick<CurrentPosition,'latitude'|'longitude'>)=>`${point.latitude.toFixed(6)}, ${point.longitude.toFixed(6)}`;
export function validPosition(latitude:number,longitude:number){return Number.isFinite(latitude)&&Number.isFinite(longitude)&&Math.abs(latitude)<=90&&Math.abs(longitude)<=180;}
export function readCurrentPosition(bn:boolean):Promise<CurrentPosition>{
  return new Promise((resolve,reject)=>{
    if(!navigator.geolocation){reject(new Error(bn?'এই ব্রাউজারে লাইভ লোকেশন পাওয়া যাচ্ছে না। ম্যাপে জায়গা বাছুন।':'Live location is unavailable. Choose a point on the map.'));return;}
    navigator.geolocation.getCurrentPosition(result=>{
      const {latitude,longitude,accuracy}=result.coords;
      if(!validPosition(latitude,longitude)){reject(new Error(bn?'সঠিক অবস্থান পাওয়া যায়নি। ম্যাপে জায়গা বাছুন।':'No valid location was returned. Choose a point on the map.'));return;}
      resolve({latitude,longitude,...(Number.isFinite(accuracy)&&accuracy>=0?{accuracy}:{}),capturedAt:new Date(result.timestamp||Date.now()).toISOString()});
    },error=>reject(new Error(bn?(error.code===1?'লোকেশনের অনুমতি বন্ধ আছে। ব্রাউজারের সাইট সেটিংসে অনুমতি দিন, অথবা ম্যাপে বাছুন।':error.code===3?'লোকেশন পেতে সময় শেষ হয়েছে। আবার চেষ্টা করুন অথবা ম্যাপে বাছুন।':'লাইভ লোকেশন পাওয়া যায়নি। জায়গা খুঁজে বা ম্যাপে বাছুন।'):(error.code===1?'Location permission is blocked. Allow it in site settings, or choose on the map.':error.code===3?'Location timed out. Retry or choose on the map.':'Live location is unavailable. Search or choose on the map.'))),{enableHighAccuracy:true,timeout:12000,maximumAge:30000});
  });
}
export const pointSource=(point:LandPoint,bn=true)=>({gps:bn?'লাইভ লোকেশন থেকে বাছাই':'Selected from live location',map:bn?'ম্যাপে বাছাই':'Selected on the map',search:bn?'জায়গা খুঁজে বাছাই':'Selected from place search',coordinates:bn?'স্থানাঙ্ক দিয়ে বাছাই':'Selected by coordinates'})[point.source];
