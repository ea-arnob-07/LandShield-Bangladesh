export interface ReportRow { label?:string; value:string }
export interface ReportSection { heading:string; rows:ReportRow[] }
export interface CurrentPosition {latitude:number;longitude:number;accuracy?:number;capturedAt:string}
export interface LandPoint extends CurrentPosition {label:string;source:'gps'|'map'|'search'|'coordinates'}
export interface ReportLocation {district:string;upazila:string;point?:LandPoint}
export interface LandReport {
  id:string;
  kind:'document'|'application'|'buyer';
  title:string;
  createdAt:string;
  summary:string;
  engine:string;
  sections:ReportSection[];
  category?:string;
  risk?:'HIGH'|'MEDIUM'|'LOW'|'UNKNOWN';
  location?:ReportLocation;
}
export interface SavedReport {
  id:string; kind:LandReport['kind']; title:string; status:string;
  shared:boolean; version:number; createdAt:string; updatedAt:string;
  report:LandReport;
  category:string; risk:'HIGH'|'MEDIUM'|'LOW'|'UNKNOWN'; classifiedBy:string|null;
  assignedContactId:string|null;referral:OfficeReferral|null;
  applicant?:{id:string;name:string};
}
export interface AdminOverview {
  counts:{total:number;pending:number;highRisk:number;active:number;resolved:number;demoCount:number};
  byCategory:{category:string;count:number}[];
  urgent:SavedReport[];
}
export interface Attachment { id:string; filename:string; mime:string; size:number; sha256:string; url:string }
export interface ReportImage { name:string; mime:'image/png'|'image/jpeg'; bytes:Uint8Array; width:number; height:number }
export interface RecordEvent { id:string; action:string; detail:string; actor:string; createdAt:string }
export interface RecordDetail { item:SavedReport; attachments:Attachment[]; events:RecordEvent[] }
export interface OfficeContact {
  id:string;version:number;officeName:string;officeType:'land'|'survey'|'registry'|'engineer'|'help';personName:string;designation:string;district:string;upazila:string;address:string;phone:string;mobile:string;email:string;categories:string[];sourceType:'government'|'professional';sourceUrl:string;sourceCheckedAt:string;latitude:number|null;longitude:number|null;active:boolean;notes:string;updatedAt?:string;
  coordinateSourceUrl?:string;coordinateCheckedAt?:string;
}
export interface OfficeReferral {contact:OfficeContact;note:string;assignedAt:string;assignedBy:string;needsReview?:boolean}
export interface ContactResults {items:OfficeContact[];coverage:'local'|'not_listed'|'area_required';total:number}
export interface ApplicationInput {
  description:string; applicant:string; district:string; upazila:string; mouza:string;
  ulid:string; dagNo:string; khatianNo:string; desiredOutcome:string;
  point?:LandPoint;
}
export interface ReportFilters {areas:{district:string;upazila:string;total:number}[];applicants:{id:string;name:string;total:number}[];offices:{id:string;officeName:string;personName:string;designation:string;total:number}[]}
export interface ReportMapPoint {id:string;title:string;district:string;upazila:string;latitude:number;longitude:number;risk:SavedReport['risk'];status:string;createdAt:string}
export interface ReportMapResults {items:ReportMapPoint[];total:number;located:number;unlocated:number;nextCursor:string|null}
export interface RoutingResult {
  category:string; categoryLabel:string; legalDomain:string; office:string;
  escalation:string; risk:'HIGH'|'MEDIUM'|'LOW'; reasons:string[];
  evidence:string[]; nextSteps:string[]; summary:string; match:string;
  engine:string; sources:{label:string;url:string}[];
}
export type DeedFields=Record<'deedNo'|'date'|'mouza'|'dagNo'|'khatianNo'|'area'|'seller'|'buyer',string>;
