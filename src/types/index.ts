export type Language = 'bn' | 'en';

export type UserRole =
  | 'CITIZEN'
  | 'OWNER'
  | 'BUYER_SELLER'
  | 'LAWYER'
  | 'SURVEYOR'
  | 'SRO_OFFICER'
  | 'AC_LAND'
  | 'GOV_ADMIN'
  | 'BANK_OFFICER'
  | 'AUDITOR';

export interface UserProfile {
  id: string;
  nid: string; // Masked e.g. "1988**********54"
  name: string;
  nameBn: string;
  role: UserRole;
  email: string;
  phone: string;
  avatar: string;
  designation: string;
  designationBn: string;
  jurisdiction?: string;
  jurisdictionBn?: string;
  isNidVerified: boolean;
  isBiometricVerified: boolean;
  isDiaspora?: boolean;
  embassyLocation?: string;
}

export type SurveyType = 'CS' | 'SA' | 'RS' | 'BS_CITY';
export type LandClassification = 'Nal' | 'Bari' | 'Doba' | 'Commercial' | 'Industrial' | 'Charland';
export type VulnerabilityCategory = 'CLEAN' | 'KHAS' | 'VESTED_PROPERTY' | 'WAQF' | 'DEBOTTAR' | 'RIVER_BED';
export type ErosionStatus = 'STABLE' | 'ACTIVE_EROSION' | 'ACCRETION_CHAR';
export type LandStatus = 'VERIFIED' | 'DISPUTED' | 'LOCKED_CAVEAT' | 'MORTGAGED' | 'UNDER_MUTATION' | 'GOVT_KHAS';

export interface BoundaryPoint {
  id: string;
  label: string;
  lat: number;
  lng: number;
  isEncroached?: boolean;
}

export interface KhatianOwner {
  nid: string;
  name: string;
  nameBn: string;
  fatherHusbandName: string;
  fatherHusbandNameBn: string;
  shareDecimal: number; // e.g. 0.5000
  hisabShare: string; // e.g. "৮ আনা" or "১৬ আনা"
  phone?: string;
  photoUrl?: string;
}

export interface LandParcel {
  landId: string; // Unique Land ID (ULID) e.g. "BD-DH-DHA-DHAN-12-104"
  division: string;
  divisionBn: string;
  district: string;
  districtBn: string;
  upazila: string;
  upazilaBn: string;
  mouza: string;
  mouzaBn: string;
  jlNo: string;
  dagNo: string;
  surveyType: SurveyType;
  areaSatak: number;
  areaKatha: number;
  areaAcre: number;
  classification: LandClassification;
  classificationBn: string;
  vulnerability: VulnerabilityCategory;
  vulnerabilityBn: string;
  erosionStatus: ErosionStatus;
  marketValueBDT: number;
  govtTaxRatePerSatak: number;
  coordinates: [number, number]; // [lat, lng] center
  polygon: [number, number][]; // GeoJSON-compatible polygon nodes
  boundaryPoints: BoundaryPoint[];
  currentOwners: KhatianOwner[];
  khatianNo: string;
  holdingNo: string;
  status: LandStatus;
  riskScore: number; // 0 - 100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskFactors: string[];
  riskFactorsBn: string[];
  scenarioLabel?: string;
  scenarioDescription?: string;
}

export interface KhatianRecord {
  khatianNo: string;
  landId: string;
  mouza: string;
  mouzaBn: string;
  jlNo: string;
  surveyType: SurveyType;
  district: string;
  districtBn: string;
  upazila: string;
  upazilaBn: string;
  holdingNo: string;
  recordedDate: string;
  issuingAuthority: string;
  volumeNo: string;
  pageNo: string;
  status: 'ACTIVE' | 'SUPERSEDED' | 'DISPUTED';
  owners: {
    name: string;
    nameBn: string;
    fatherName: string;
    fatherNameBn: string;
    nid: string;
    shareRatio: number;
    hisabNotation: string;
    address: string;
  }[];
  dagList: {
    dagNo: string;
    classification: string;
    totalAreaSatak: number;
    shareAreaSatak: number;
  }[];
}

export interface DeedRecord {
  deedNo: string;
  landId: string;
  sroOffice: string;
  sroOfficeBn: string;
  registrationDate: string;
  deedType: 'Saf-Kabala' | 'Hebba' | 'Partition' | 'Exchange' | 'Waqf';
  deedTypeBn: string;
  considerationBDT: number;
  sellers: { name: string; nameBn: string; nid: string }[];
  buyers: { name: string; nameBn: string; nid: string }[];
  areaTransferredSatak: number;
  viaDeedChain: string[]; // Chain of title deeds (ভায়া দলিল)
  isVerified: boolean;
  docUrl: string;
  boundaries: {
    north: string;
    south: string;
    east: string;
    west: string;
  };
}

export type MutationStatus = 'SUBMITTED' | 'ULAO_VERIFIED' | 'KANUNGO_REVIEW' | 'AC_LAND_APPROVED' | 'REJECTED';

export interface MutationRecord {
  caseNo: string;
  landId: string;
  applicantName: string;
  applicantNameBn: string;
  applicantNid: string;
  previousKhatian: string;
  newKhatian: string;
  applicationDate: string;
  status: MutationStatus;
  ulaoNotes?: string;
  kanungoNotes?: string;
  acLandNotes?: string;
  dakhilaNo: string;
  approvedAt?: string;
  qrCodeRef: string;
}

export interface TaxRecord {
  holdingNo: string;
  landId: string;
  fiscalYear: string;
  arrearsBDT: number;
  currentDemandBDT: number;
  penaltyBDT: number;
  totalDueBDT: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  lastPaidDate?: string;
  dakhilaNo?: string;
  dakhilaQr?: string;
}

export interface EncumbranceRecord {
  id: string;
  landId: string;
  bankName: string;
  bankBranch: string;
  loanAccountNo: string;
  mortgageAmountBDT: number;
  mortgageDate: string;
  status: 'ACTIVE_CHARGE' | 'DISCHARGED';
  nocReference?: string;
  dischargedDate?: string;
}

export interface CaveatRecord {
  id: string;
  landId: string;
  caveatorName: string;
  caveatorNid: string;
  caveatType: 'STATUTORY_CITIZEN' | 'COURT_INJUNCTION' | 'GOVT_RESTRAINT';
  reason: string;
  reasonBn: string;
  filedDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  blockedActions: string[];
}

export interface DisputeRecord {
  caseId: string;
  landId: string;
  courtName: string;
  courtNameBn: string;
  caseType: 'Title Suit' | 'Partition Suit' | 'Sec 144 CrPC' | 'Land Survey Tribunal';
  caseTypeBn: string;
  plaintiff: string;
  plaintiffBn: string;
  defendant: string;
  defendantBn: string;
  filingDate: string;
  lastHearingDate: string;
  nextHearingDate: string;
  status: 'PENDING_TRIAL' | 'INJUNCTION_GRANTED' | 'DISMISSED' | 'DECREED';
  legalSummary: string;
  legalSummaryBn: string;
  hasActiveInjunction: boolean;
}

export interface AuditBlock {
  index: number;
  timestamp: string;
  userId: string;
  userRole: UserRole;
  userName: string;
  action: string;
  actionBn: string;
  targetLandId: string;
  details: string;
  detailsBn: string;
  prevHash: string;
  currentHash: string;
  nonce: number;
}

export interface PropertyAlert {
  id: string;
  recipientNid: string;
  landId: string;
  eventType: 'SEARCH_PERFORMED' | 'CAVEAT_LODGED' | 'MORTGAGE_CREATED' | 'MUTATION_INITIATED' | 'DEED_DRAFTED' | 'TAX_DEMAND_GENERATED';
  titleBn: string;
  titleEn: string;
  messageBn: string;
  messageEn: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  timestamp: string;
  isRead: boolean;
}

export type EscrowStage =
  | 'OFFER_AGREED'
  | 'KYC_VETTED'
  | 'ESCROW_FUNDED'
  | 'SRO_REGISTERED'
  | 'MUTATION_DISPATCHED'
  | 'COMPLETED'
  | 'DISPUTED';

export interface TransactionEscrow {
  txId: string;
  landId: string;
  buyerNid: string;
  buyerName: string;
  buyerNameBn: string;
  sellerNid: string;
  sellerName: string;
  sellerNameBn: string;
  agreedAmountBDT: number;
  escrowStage: EscrowStage;
  depositedAmountBDT: number;
  stampDutyBDT: number;
  regTaxBDT: number;
  localTaxBDT: number;
  microEscrowFeeBDT: number;
  createdAt: string;
  sroAppointmentDate?: string;
  mutationDocketNo?: string;
}

export interface OCRVerificationResult {
  confidenceScore: number;
  riskGrade: 'GREEN' | 'YELLOW' | 'RED';
  extractedFields: {
    deedNo: string;
    date: string;
    sroOffice: string;
    mouza: string;
    dagNo: string;
    khatianNo: string;
    areaSatak: number;
    sellerName: string;
    sellerNid: string;
    buyerName: string;
    buyerNid: string;
    considerationBDT: number;
    boundaryNorth: string;
    boundarySouth: string;
    boundaryEast: string;
    boundaryWest: string;
  };
  discrepancies: {
    field: string;
    extractedValue: string;
    dbValue: string;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    messageBn: string;
    messageEn: string;
  }[];
  summaryBn: string;
  summaryEn: string;
}

export interface HeirInput {
  id: string;
  relation: 'WIFE' | 'HUSBAND' | 'SON' | 'DAUGHTER' | 'FATHER' | 'MOTHER';
  count: number;
  name?: string;
}

export interface FaraidShare {
  relation: string;
  relationBn: string;
  count: number;
  shareFraction: string;
  shareDecimal: number;
  satakPerPerson: number;
  totalSatak: number;
  hisabNotation: string;
  color: string;
}

export interface InSARData {
  landId: string;
  mouza: string;
  river: string;
  erosionRateMetersYear: number;
  submergedPercentage: number;
  status: ErosionStatus;
  historicalTimeline: {
    year: number;
    landAreaSatak: number;
    waterLineOffsetMeters: number;
    riskRating: string;
  }[];
}
