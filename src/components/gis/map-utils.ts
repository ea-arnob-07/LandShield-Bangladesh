import type { LandParcel } from '../../types';

export type Coordinate = [number,number];
export const BANGLADESH_BOUNDS: [Coordinate,Coordinate] = [[20.45,88],[26.75,92.8]];
export const DHAKA: Coordinate = [23.7461,90.3742];
export const normalizeMapQuery=(value:string)=>value.normalize('NFC').replace(/[০-৯]/g,d=>String('০১২৩৪৫৬৭৮৯'.indexOf(d))).trim().toLocaleLowerCase();
export function parseCoordinates(query:string):Coordinate|null {
  const normalized=normalizeMapQuery(query);
  const match=normalized.match(/^([+-]?\d+(?:\.\d+)?)\s*(?:[,;]|\s+)\s*([+-]?\d+(?:\.\d+)?)$/);
  if(!match)return null;
  const lat=Number(match[1]),lng=Number(match[2]);
  if(!Number.isFinite(lat)||!Number.isFinite(lng)||Math.abs(lat)>90||Math.abs(lng)>180)throw new Error('অক্ষাংশ −৯০ থেকে ৯০ এবং দ্রাঘিমাংশ −১৮০ থেকে ১৮০-এর মধ্যে দিন।');
  return[lat,lng];
}
export function findParcelMatches(parcels:LandParcel[],query:string):LandParcel[]{
  const value=normalizeMapQuery(query).replace(/^(?:দাগ(?:\s*নম্বর)?|খতিয়ান(?:\s*নম্বর)?|খতিয়ান(?:\s*নম্বর)?|plot(?:\s*(?:no|number))?|khatian(?:\s*(?:no|number))?|ulid)\s*[:#-]?\s*/,'');
  if(!value)return[];
  const exact=parcels.filter(p=>[p.landId,p.dagNo,p.khatianNo].some(v=>normalizeMapQuery(v)===value));
  if(exact.length)return exact;
  return parcels.filter(p=>[p.mouza,p.mouzaBn].some(v=>normalizeMapQuery(v).includes(value))).slice(0,5);
}
export function parcelCenter(parcel:Pick<LandParcel,'polygon'>):Coordinate|null{
  const points=parcel.polygon.filter(p=>p.length>=2&&Number.isFinite(p[0])&&Number.isFinite(p[1])&&Math.abs(p[0])<=90&&Math.abs(p[1])<=180);
  return points.length?[points.reduce((s,p)=>s+p[0],0)/points.length,points.reduce((s,p)=>s+p[1],0)/points.length]:null;
}
export interface PlaceResult {id:string;label:string;lat:number;lng:number}
