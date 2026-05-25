import { UserRole } from './index';

export type Permission =
  // Basic Citizen & Public Permissions
  | 'VIEW_PROFILE'
  | 'VIEW_LAND'
  | 'SEARCH_LAND'
  | 'VIEW_OWNERSHIP_DETAILS'
  | 'CALCULATE_FARAID'
  | 'ACCESS_DIASPORA'
  // Citizen Applications & Taxes
  | 'CREATE_MUTATION_APPLICATION'
  | 'VIEW_APPLICATION_STATUS'
  | 'PAY_LAND_TAX'
  | 'DOWNLOAD_DAKHILA'
  | 'DOWNLOAD_KHATIAN'
  // Ownership & Conveyancing
  | 'MANAGE_MY_PROPERTIES'
  | 'LODGE_CAVEAT'
  | 'INITIATE_ESCROW'
  | 'BUY_SELL_CONVEYANCING'
  // Legal & Dispute Management
  | 'MANAGE_LEGAL_CASES'
  | 'VIEW_COURT_DISPUTES'
  | 'VET_TITLE_CHAIN'
  | 'VERIFY_DEED_AI'
  | 'SCHEDULE_HEARING'
  // Cadastral & Survey (DLRS)
  | 'PERFORM_SURVEY'
  | 'EDIT_CADASTRAL_MAP'
  | 'INSPECT_INSAR_RADAR'
  | 'VERIFY_GPS_BOUNDARIES'
  // Registration (SRO - Sub-Registrar)
  | 'REGISTER_DEED'
  | 'VERIFY_BIOMETRIC_NID'
  | 'COLLECT_STAMP_DUTY'
  | 'TRIGGER_SRO_AC_SYNC'
  // Administration & Revenue (AC Land)
  | 'APPROVE_MUTATION'
  | 'REJECT_MUTATION'
  | 'REVIEW_KANUNGO_REPORT'
  | 'ISSUE_NEW_KHATIAN'
  | 'PROTECT_KHAS_LAND'
  // Higher Administration & Macro Oversight (Gov Admin)
  | 'VIEW_GOV_ANALYTICS'
  | 'GENERATE_MACRO_REPORTS'
  | 'ACCESS_GOV_API_SANDBOX'
  | 'MANAGE_SYSTEM_POLICIES'
  // Bank & Financial Collateral
  | 'VERIFY_MORTGAGE_COLLATERAL'
  | 'REGISTER_BANK_CHARGE'
  | 'DISCHARGE_MORTGAGE_LIEN'
  | 'ISSUE_NON_ENCUMBRANCE_CERT'
  // System Audit & Vigilance
  | 'VIEW_AUDIT_LEDGER'
  | 'INSPECT_CRYPTOGRAPHIC_HASH'
  | 'FLAG_SUSPICIOUS_TRANSACTION'
  | 'EXPORT_FORENSIC_LOGS';

/**
 * Default permission mappings for each of the 10 platform roles
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  CITIZEN: [
    'VIEW_PROFILE',
    'VIEW_LAND',
    'SEARCH_LAND',
    'VIEW_OWNERSHIP_DETAILS',
    'CALCULATE_FARAID',
    'ACCESS_DIASPORA',
    'CREATE_MUTATION_APPLICATION',
    'VIEW_APPLICATION_STATUS',
    'PAY_LAND_TAX',
    'DOWNLOAD_DAKHILA',
    'DOWNLOAD_KHATIAN',
  ],
  OWNER: [
    'VIEW_PROFILE',
    'VIEW_LAND',
    'SEARCH_LAND',
    'VIEW_OWNERSHIP_DETAILS',
    'MANAGE_MY_PROPERTIES',
    'LODGE_CAVEAT',
    'PAY_LAND_TAX',
    'DOWNLOAD_DAKHILA',
    'DOWNLOAD_KHATIAN',
    'CREATE_MUTATION_APPLICATION',
    'VIEW_APPLICATION_STATUS',
    'CALCULATE_FARAID',
    'ACCESS_DIASPORA',
    'BUY_SELL_CONVEYANCING',
  ],
  BUYER_SELLER: [
    'VIEW_PROFILE',
    'VIEW_LAND',
    'SEARCH_LAND',
    'VIEW_OWNERSHIP_DETAILS',
    'INITIATE_ESCROW',
    'BUY_SELL_CONVEYANCING',
    'VERIFY_DEED_AI',
    'VET_TITLE_CHAIN',
    'VIEW_APPLICATION_STATUS',
    'DOWNLOAD_KHATIAN',
  ],
  LAWYER: [
    'VIEW_PROFILE',
    'VIEW_LAND',
    'SEARCH_LAND',
    'VIEW_OWNERSHIP_DETAILS',
    'MANAGE_LEGAL_CASES',
    'VIEW_COURT_DISPUTES',
    'VET_TITLE_CHAIN',
    'VERIFY_DEED_AI',
    'LODGE_CAVEAT',
    'SCHEDULE_HEARING',
    'DOWNLOAD_KHATIAN',
  ],
  SURVEYOR: [
    'VIEW_PROFILE',
    'VIEW_LAND',
    'SEARCH_LAND',
    'VIEW_OWNERSHIP_DETAILS',
    'PERFORM_SURVEY',
    'EDIT_CADASTRAL_MAP',
    'INSPECT_INSAR_RADAR',
    'VERIFY_GPS_BOUNDARIES',
    'DOWNLOAD_KHATIAN',
  ],
  SRO_OFFICER: [
    'VIEW_PROFILE',
    'VIEW_LAND',
    'SEARCH_LAND',
    'VIEW_OWNERSHIP_DETAILS',
    'REGISTER_DEED',
    'VERIFY_BIOMETRIC_NID',
    'COLLECT_STAMP_DUTY',
    'TRIGGER_SRO_AC_SYNC',
    'VERIFY_DEED_AI',
    'VET_TITLE_CHAIN',
    'VIEW_AUDIT_LEDGER',
  ],
  AC_LAND: [
    'VIEW_PROFILE',
    'VIEW_LAND',
    'SEARCH_LAND',
    'VIEW_OWNERSHIP_DETAILS',
    'APPROVE_MUTATION',
    'REJECT_MUTATION',
    'REVIEW_KANUNGO_REPORT',
    'ISSUE_NEW_KHATIAN',
    'SCHEDULE_HEARING',
    'PROTECT_KHAS_LAND',
    'VIEW_COURT_DISPUTES',
    'VIEW_AUDIT_LEDGER',
  ],
  GOV_ADMIN: [
    'VIEW_PROFILE',
    'VIEW_LAND',
    'SEARCH_LAND',
    'VIEW_OWNERSHIP_DETAILS',
    'VIEW_GOV_ANALYTICS',
    'GENERATE_MACRO_REPORTS',
    'ACCESS_GOV_API_SANDBOX',
    'MANAGE_SYSTEM_POLICIES',
    'PROTECT_KHAS_LAND',
    'VIEW_AUDIT_LEDGER',
  ],
  BANK_OFFICER: [
    'VIEW_PROFILE',
    'VIEW_LAND',
    'SEARCH_LAND',
    'VIEW_OWNERSHIP_DETAILS',
    'VERIFY_MORTGAGE_COLLATERAL',
    'REGISTER_BANK_CHARGE',
    'DISCHARGE_MORTGAGE_LIEN',
    'ISSUE_NON_ENCUMBRANCE_CERT',
    'VET_TITLE_CHAIN',
    'VIEW_COURT_DISPUTES',
  ],
  AUDITOR: [
    'VIEW_PROFILE',
    'VIEW_LAND',
    'SEARCH_LAND',
    'VIEW_OWNERSHIP_DETAILS',
    'VIEW_AUDIT_LEDGER',
    'INSPECT_CRYPTOGRAPHIC_HASH',
    'FLAG_SUSPICIOUS_TRANSACTION',
    'EXPORT_FORENSIC_LOGS',
    'VIEW_GOV_ANALYTICS',
  ],
};

/**
 * Helper to check if a role has a specific permission
 */
export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
};

/**
 * Helper to check if a role has ANY of the given permissions
 */
export const hasAnyPermission = (role: UserRole, permissions: Permission[]): boolean => {
  const userPerms = ROLE_PERMISSIONS[role] || [];
  return permissions.some(p => userPerms.includes(p));
};

/**
 * Helper to check if a role has ALL of the given permissions
 */
export const hasAllPermissions = (role: UserRole, permissions: Permission[]): boolean => {
  const userPerms = ROLE_PERMISSIONS[role] || [];
  return permissions.every(p => userPerms.includes(p));
};
