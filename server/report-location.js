import { DomainError } from './land-domain.js';
export function validateLandPoint(raw){
  if(!raw||typeof raw!=='object'||Array.isArray(raw)||typeof raw.latitude!=='number'||typeof raw.longitude!=='number'||!Number.isFinite(raw.latitude)||!Number.isFinite(raw.longitude)||Math.abs(raw.latitude)>90||Math.abs(raw.longitude)>180)throw new DomainError('লোকেশনের সঠিক অক্ষাংশ ও দ্রাঘিমাংশ দিন।');
  if(typeof raw.label!=='string'||!raw.label.trim()||raw.label.length>300||!['gps','map','search','coordinates'].includes(raw.source)||typeof raw.capturedAt!=='string'||raw.capturedAt.length>50||!Number.isFinite(Date.parse(raw.capturedAt)))throw new DomainError('নির্বাচিত লোকেশনের তথ্য সঠিক নয়।');
  const point={latitude:raw.latitude,longitude:raw.longitude,label:raw.label.trim(),source:raw.source,capturedAt:raw.capturedAt};
  if(raw.accuracy!==undefined){if(typeof raw.accuracy!=='number'||!Number.isFinite(raw.accuracy)||raw.accuracy<0||raw.accuracy>200000)throw new DomainError('লোকেশনের নির্ভুলতার তথ্য সঠিক নয়।');point.accuracy=raw.accuracy;}
  return point;
}
export const locationColumn=key=>`trim(COALESCE(json_extract(report,'$.location.${key}'),''))`;
