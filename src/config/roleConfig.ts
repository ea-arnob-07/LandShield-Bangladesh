import { UserRole } from '../types';
import { TabType } from '../components/layout/NavigationTabs';
import { Permission, ROLE_PERMISSIONS } from '../types/permissions';

export interface NavItemConfig {
  id: TabType;
  labelBn: string;
  labelEn: string;
  iconName: string;
  badge?: string;
  badgeColor?: string;
  descriptionBn: string;
}

export interface StatItemConfig {
  id: string;
  labelBn: string;
  labelEn: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'neutral' | 'warning' | 'negative';
  subtextBn: string;
  subtextEn: string;
  iconName: string;
  accentColor: string;
}

export interface QuickActionConfig {
  id: string;
  labelBn: string;
  labelEn: string;
  descriptionBn: string;
  descriptionEn: string;
  targetTab: TabType;
  iconName: string;
  btnVariant?: 'primary' | 'secondary' | 'accent' | 'warning';
}

export interface RoleWorkflowStep {
  stepNo: number;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  targetTab: TabType;
  statusBn: string;
}

export interface RoleAnnouncement {
  id: string;
  titleBn: string;
  titleEn: string;
  date: string;
  badgeBn: string;
  badgeVariant: 'info' | 'warning' | 'success';
}

export interface RoleDefinition {
  role: UserRole;
  nameBn: string;
  nameEn: string;
  taglineBn: string;
  taglineEn: string;
  descriptionBn: string;
  descriptionEn: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  avatarDefault: string;
  allowedTabs: TabType[];
  permissions: Permission[];
  navigation: NavItemConfig[];
  stats: StatItemConfig[];
  quickActions: QuickActionConfig[];
  workflows: RoleWorkflowStep[];
  announcements: RoleAnnouncement[];
  notificationKeywords: string[];
}

export const ROLE_CONFIGURATIONS: Record<UserRole, RoleDefinition> = {
  CITIZEN: {
    role: 'CITIZEN',
    nameBn: 'সাধারণ নাগরিক',
    nameEn: 'General Citizen',
    taglineBn: 'জনবান্ধব ডিজিটাল ভূমিসেবা ও তথ্য যাচাই',
    taglineEn: 'Citizen-Centric Land Information & Public Services',
    descriptionBn: 'ভূমি অনুসন্ধান, উত্তরাধিকার বণ্টন হিসাব, খতিয়ান যাচাই, কর পরিশোধ ও নামজারি আবেদনের সর্বজনীন সেবা পোর্টাল।',
    descriptionEn: 'Universal citizen portal for parcel search, faraid partition, land tax and mutation filings.',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    borderColor: 'border-emerald-200',
    avatarDefault: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    allowedTabs: [
      'DASHBOARD',
      'LAND_SEARCH_GIS',
      'LAND_PROFILE',
      'LD_TAX',
      'FARAID_INHERITANCE',
      'DIASPORA_PORTAL'
    ],
    permissions: ROLE_PERMISSIONS.CITIZEN,
    navigation: [
      {
        id: 'DASHBOARD',
        labelBn: 'নাগরিক ড্যাশবোর্ড',
        labelEn: 'Citizen Dashboard',
        iconName: 'LayoutDashboard',
        descriptionBn: 'আপনার আবেদনের অবস্থা ও সংক্ষিপ্ত বিবরণ'
      },
      {
        id: 'LAND_SEARCH_GIS',
        labelBn: 'ভূমি অনুসন্ধান ও মানচিত্র',
        labelEn: 'Land Search & GIS',
        iconName: 'MapPin',
        descriptionBn: 'দাগ নম্বর বা মৌজা দিয়ে জমি খুঁজুন'
      },
      {
        id: 'LAND_PROFILE',
        labelBn: 'ডিজিটাল ভূমি রেকর্ড ও পর্চা',
        labelEn: 'Digital Land Profile',
        iconName: 'FileText',
        badge: 'Porcha',
        badgeColor: 'bg-emerald-600',
        descriptionBn: 'খতিয়ান ও মালিকানা যাচাই'
      },
      {
        id: 'LD_TAX',
        labelBn: 'ভূমি উন্নয়ন কর (LD Tax)',
        labelEn: 'Land Dev Tax',
        iconName: 'Receipt',
        descriptionBn: 'বকেয়া কর ও ই-দাখিলা গ্রহণ'
      },
      {
        id: 'FARAID_INHERITANCE',
        labelBn: 'এআই উত্তরাধিকার বাটোয়ারা',
        labelEn: 'AI Faraid Partition',
        iconName: 'GitFork',
        badge: 'AI',
        badgeColor: 'bg-indigo-600',
        descriptionBn: 'ইসলামিক ফারায়েজ ও অংশ বণ্টন ক্যালকুলেটর'
      },
      {
        id: 'DIASPORA_PORTAL',
        labelBn: 'প্রবাসী কনস্যুলার সেবা',
        labelEn: 'Diaspora Portal',
        iconName: 'Plane',
        descriptionBn: 'দূতাবাস সত্যায়ন ও ডিজিটাল পাওয়ার অফ অ্যাটর্নি'
      }
    ],
    stats: [
      {
        id: 'cit-stat-1',
        labelBn: 'জমির রেকর্ড অনুসন্ধান',
        labelEn: 'Land Searches Performed',
        value: '৭ টি',
        change: '+২ এই সপ্তাহে',
        changeType: 'positive',
        subtextBn: 'নিরাপদ এনআইডি যাচাইকৃত কোয়েরি',
        subtextEn: 'NID authenticated searches',
        iconName: 'Compass',
        accentColor: 'emerald'
      },
      {
        id: 'cit-stat-2',
        labelBn: 'দাখিলকৃত আবেদন',
        labelEn: 'Submitted Applications',
        value: '৩ টি',
        change: '১ টি প্রক্রিয়াধীন',
        changeType: 'neutral',
        subtextBn: 'ই-নামজারি ও রেকর্ড সংশোধন',
        subtextEn: 'e-Mutation & correction',
        iconName: 'FileText',
        accentColor: 'blue'
      },
      {
        id: 'cit-stat-3',
        labelBn: 'অনুমোদিত সেবা গ্রহণ',
        labelEn: 'Approved Services',
        value: '২ টি',
        change: '১০০% ডিজিটাল',
        changeType: 'positive',
        subtextBn: 'স্মার্ট কিউআর খতিয়ান ও দাখিলা',
        subtextEn: 'QR verified porcha issued',
        iconName: 'CheckCircle2',
        accentColor: 'green'
      },
      {
        id: 'cit-stat-4',
        labelBn: 'ভূমি কর পরিশোধ স্থিতি',
        labelEn: 'Tax Clearance Status',
        value: 'হালনাগাদ',
        change: 'অর্থবছর ২০২৫-২৬',
        changeType: 'positive',
        subtextBn: 'কোনো বকেয়া জরিমানা নেই',
        subtextEn: 'Zero tax arrears',
        iconName: 'Receipt',
        accentColor: 'amber'
      }
    ],
    quickActions: [
      {
        id: 'qa-cit-search',
        labelBn: 'ক্যাডাস্ট্রাল ম্যাপে জমি খুঁজুন',
        labelEn: 'Search Land on GIS Map',
        descriptionBn: 'মৌজা ও দাগ নম্বর দিয়ে নোড ও সীমানা দেখুন',
        descriptionEn: 'Inspect parcel coordinates and boundary GPS',
        targetTab: 'LAND_SEARCH_GIS',
        iconName: 'Compass',
        btnVariant: 'primary'
      },
      {
        id: 'qa-cit-tax',
        labelBn: 'ভূমি উন্নয়ন কর দাখিলা গ্রহণ',
        labelEn: 'Pay Land Tax & Download Dakhila',
        descriptionBn: 'অনলাইনে কর পরিশোধ করে রিয়েলটাইম কিউআর দাখিলা নিন',
        descriptionEn: 'Instant automated tax dakhila with QR code',
        targetTab: 'LD_TAX',
        iconName: 'Receipt',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-cit-faraid',
        labelBn: 'উত্তরাধিকার ফারায়েজ হিসাব করুন',
        labelEn: 'Calculate AI Faraid Inheritance',
        descriptionBn: 'ওয়ারিশদের হিস্যা অনুযায়ী স্বত্ব ও শতাংশ বণ্টন',
        descriptionEn: 'Automated legal Islamic inheritance calculator',
        targetTab: 'FARAID_INHERITANCE',
        iconName: 'GitFork',
        btnVariant: 'accent'
      },
      {
        id: 'qa-cit-profile',
        labelBn: 'ডিজিটাল খতিয়ান রেকর্ড দেখুন',
        labelEn: 'View Verified Khatian Record',
        descriptionBn: 'বিএস/সিটি জরিপের সর্বশেষ স্বত্বাধিকারী বিবরণ',
        descriptionEn: 'View BS / City survey ownership breakdown',
        targetTab: 'LAND_PROFILE',
        iconName: 'FileText',
        btnVariant: 'secondary'
      }
    ],
    workflows: [
      {
        stepNo: 1,
        titleBn: 'মৌজা ও দাগ দিয়ে জমি যাচাই',
        titleEn: 'Land Verification by Dag/Mouza',
        descBn: 'অনলাইনে জমির খতিয়ান ও দাগ নম্বর দিয়ে সরকারি রেকর্ড পরীক্ষা করুন।',
        descEn: 'Cross-reference parcel dag & khatian on digital records.',
        targetTab: 'LAND_SEARCH_GIS',
        statusBn: 'প্রথম পদক্ষেপ'
      },
      {
        stepNo: 2,
        titleBn: 'খতিয়ান ও ভায়া দলিলের বিবরণ দেখুন',
        titleEn: 'Inspect Khatian & Chain of Title',
        descBn: 'রেকর্ডীয় মালিকানা ও কর পরিশোধের সার্বিক স্থিতি পরখ করুন।',
        descEn: 'Review recorded ownership, boundaries and tax status.',
        targetTab: 'LAND_PROFILE',
        statusBn: 'প্রস্তুতি'
      },
      {
        stepNo: 3,
        titleBn: 'অনলাইনে জমির কর পরিশোধ',
        titleEn: 'Pay Land Development Tax',
        descBn: 'ডিজিটাল পেমেন্ট গেটওয়ে দিয়ে সরাসরি কর পরিশোধ করে দাখিলা সংগ্রহ করুন।',
        descEn: 'Settle annual land revenue tax through digital gateway.',
        targetTab: 'LD_TAX',
        statusBn: 'নিয়মিত কার্যক্রম'
      }
    ],
    announcements: [
      {
        id: 'ann-cit-1',
        titleBn: 'অনলাইনে শতভাগ ই-নামজারি ও কিউআর দাখিলা সেবা চালু',
        titleEn: 'Sample e-Mutation & QR Dakhila workflow',
        date: 'আজকের আপডেট',
        badgeBn: 'ভূমি মন্ত্রণালয়',
        badgeVariant: 'success'
      },
      {
        id: 'ann-cit-2',
        titleBn: 'উত্তরাধিকার সম্পত্তি নামজারির ক্ষেত্রে ডিজিটাল ফারায়েজ সনদ বাধ্যতামূলক',
        titleEn: 'Digital Faraid Certificate mandatory for inheritance mutation',
        date: 'বিজ্ঞপ্তি',
        badgeBn: 'আইন নির্দেশনা',
        badgeVariant: 'info'
      }
    ],
    notificationKeywords: ['SEARCH_PERFORMED', 'TAX_DEMAND_GENERATED', 'DAKHILA']
  },

  OWNER: {
    role: 'OWNER',
    nameBn: 'জমির মালিক',
    nameEn: 'Land Owner',
    taglineBn: 'ব্যক্তিগত সম্পত্তির সুরক্ষা, খতিয়ান পোর্টফোলিও ও ডিজিটাল লক',
    taglineEn: 'Property Portfolio Protection, Deeds & Digital Caveats',
    descriptionBn: 'নিজস্ব মালিকানাধীন ৩টি প্লটের খতিয়ান, ভায়া দলিল, কর পরিশোধের দাখিলা ও অননুমোদিত হস্তান্তর রোধে সংবিধিবদ্ধ কেভিয়েট লক।',
    descriptionEn: 'Manage personal land parcels, title deeds, tax dakhilas, and digital caveat locks against unauthorized mutation.',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    borderColor: 'border-blue-200',
    avatarDefault: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    allowedTabs: [
      'DASHBOARD',
      'LAND_SEARCH_GIS',
      'LAND_PROFILE',
      'LD_TAX',
      'CAVEATS_DISPUTES',
      'FARAID_INHERITANCE',
      'BUY_SELL_ESCROW'
    ],
    permissions: ROLE_PERMISSIONS.OWNER,
    navigation: [
      {
        id: 'DASHBOARD',
        labelBn: 'মালিকানা ড্যাশবোর্ড',
        labelEn: 'Owner Dashboard',
        iconName: 'LayoutDashboard',
        descriptionBn: 'সম্পত্তি পোর্টফোলিও ও সার্বিক নজরদারি'
      },
      {
        id: 'LAND_PROFILE',
        labelBn: 'আমার সম্পত্তি ও পর্চা',
        labelEn: 'My Lands & Porcha',
        iconName: 'Building',
        badge: '3 Parcels',
        badgeColor: 'bg-emerald-700',
        descriptionBn: 'মালিকানাধীন প্লট ও ডিজিটাল খতিয়ান'
      },
      {
        id: 'CAVEATS_DISPUTES',
        labelBn: 'কেভিয়েট ডিজিটাল লক',
        labelEn: 'Caveat Digital Lock',
        iconName: 'ShieldAlert',
        badge: 'Secure',
        badgeColor: 'bg-red-600',
        descriptionBn: 'অননুমোদিত বিক্রি ও নামজারি ব্লকিং লক'
      },
      {
        id: 'LD_TAX',
        labelBn: 'হোল্ডিং কর ও দাখিলা',
        labelEn: 'Tax Dakhila Portal',
        iconName: 'Receipt',
        descriptionBn: 'চলতি বছরের কর ও ই-দাখিলা আর্কাইভ'
      },
      {
        id: 'LAND_SEARCH_GIS',
        labelBn: 'ক্যাডাস্ট্রাল সীমানা নোড',
        labelEn: 'Cadastral Boundary Pins',
        iconName: 'MapPin',
        descriptionBn: 'জিপিএস সীমানা ও মৌজা নকশা'
      },
      {
        id: 'BUY_SELL_ESCROW',
        labelBn: 'বায়না ও হস্তান্তর এসক্রো',
        labelEn: 'Conveyancing & Escrow',
        iconName: 'BadgePercent',
        descriptionBn: 'নিরাপদ বায়না চুক্তি ও ব্যাংক তহবিল'
      }
    ],
    stats: [
      {
        id: 'own-stat-1',
        labelBn: 'মোট নিবন্ধিত সম্পত্তি',
        labelEn: 'Total Owned Parcels',
        value: '৩ টি প্লট',
        change: 'ধানমন্ডি, সাভার, গুলশান',
        changeType: 'positive',
        subtextBn: 'জাতীয় ডাটাবেজে এনআইডি লিঙ্কড',
        subtextEn: 'Direct NID verified ownership',
        iconName: 'Building',
        accentColor: 'blue'
      },
      {
        id: 'own-stat-2',
        labelBn: 'মোট জমির পরিমাণ',
        labelEn: 'Total Land Area',
        value: '২১.৪ শতক',
        change: '১২.৯ কাঠা',
        changeType: 'positive',
        subtextBn: 'বাস্তু ও আবাসিক শ্রেণিভুক্ত',
        subtextEn: 'Residential classification',
        iconName: 'Compass',
        accentColor: 'emerald'
      },
      {
        id: 'own-stat-3',
        labelBn: 'কেভিয়েট সিকিউরিটি লক',
        labelEn: 'Active Caveat Locks',
        value: '১ টি সক্রিয়',
        change: 'নিরাপত্তা বলয় সুরক্ষিত',
        changeType: 'positive',
        subtextBn: 'অননুমোদিত হস্তান্তর সম্পূর্ণ নিষিদ্ধ',
        subtextEn: 'Unauthorized mutation blocked',
        iconName: 'ShieldCheck',
        accentColor: 'red'
      },
      {
        id: 'own-stat-4',
        labelBn: 'বকেয়া কর পরিশোধের স্থিতি',
        labelEn: 'Tax Clearance Status',
        value: '৳ ০ বকেয়া',
        change: 'পরিশোধিত',
        changeType: 'positive',
        subtextBn: 'অনলাইন কিউআর দাখিলা সংগৃহীত',
        subtextEn: 'Verified Dakhila on file',
        iconName: 'Receipt',
        accentColor: 'green'
      }
    ],
    quickActions: [
      {
        id: 'qa-own-lock',
        labelBn: 'ডিজিটাল কেভিয়েট লক সক্রিয় করুন',
        labelEn: 'Lodge Digital Caveat Lock',
        descriptionBn: 'জালিয়াতি বা বিরোধের আশঙ্কায় তাৎক্ষণিক নামজারি ব্লক করুন',
        descriptionEn: 'Lock parcel against unauthorized mutation/transfer',
        targetTab: 'CAVEATS_DISPUTES',
        iconName: 'ShieldAlert',
        btnVariant: 'accent'
      },
      {
        id: 'qa-own-profile',
        labelBn: 'স্মার্ট খতিয়ান ও ভায়া দলিল ডাউনলোড',
        labelEn: 'Download Smart Khatian & Deeds',
        descriptionBn: 'কিউআর কোড সম্বলিত সরকারি ডিজিটাল পর্চা সংগ্রহ',
        descriptionEn: 'Certified tamper-evident digital porcha PDF',
        targetTab: 'LAND_PROFILE',
        iconName: 'FileText',
        btnVariant: 'primary'
      },
      {
        id: 'qa-own-tax',
        labelBn: 'ভূমি উন্নয়ন কর পরিশোধ ও দাখিলা',
        labelEn: 'Pay Land Tax & Download Dakhila',
        descriptionBn: 'হোল্ডিং ভিত্তিক চলতি অর্থবছরের কর পরিশোধ করুন',
        descriptionEn: 'Instant settlement of annual land revenue',
        targetTab: 'LD_TAX',
        iconName: 'Receipt',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-own-convey',
        labelBn: 'নিরাপদ বায়না এসক্রো শুরু করুন',
        labelEn: 'Initiate Secure Conveyancing Escrow',
        descriptionBn: 'ক্রেতার সাথে বাংলাদেশ ব্যাংক অনুমোদিত এসক্রো চুক্তি',
        descriptionEn: 'Bangladesh Bank backed escrow conveyancing',
        targetTab: 'BUY_SELL_ESCROW',
        iconName: 'BadgePercent',
        btnVariant: 'secondary'
      }
    ],
    workflows: [
      {
        stepNo: 1,
        titleBn: 'সম্পত্তি পোর্টফোলিও পর্যবেক্ষণ',
        titleEn: 'Review Land Portfolio',
        descBn: 'ধানমন্ডি, সাভার ও গুলশান প্লটের বর্তমান খতিয়ান ও হোল্ডিং স্ট্যাটাস নিশ্চিত করুন।',
        descEn: 'Inspect current khatian and holding records across owned plots.',
        targetTab: 'LAND_PROFILE',
        statusBn: 'নিয়মিত'
      },
      {
        stepNo: 2,
        titleBn: 'সুরক্ষা কেভিয়েট স্থিতি পর্যবেক্ষণ',
        titleEn: 'Statutory Caveat Audit',
        descBn: 'আপনার জমিতে কেউ অননুমোদিত কোয়েরি বা দলিল দাখিল করলে তাৎক্ষণিক সতর্কতা পান।',
        descEn: 'Receive real-time alerts if any unauthorized title search is lodged.',
        targetTab: 'CAVEATS_DISPUTES',
        statusBn: 'নিরাপত্তা'
      },
      {
        stepNo: 3,
        titleBn: 'ভূমি কর দাখিলা সংরক্ষণ',
        titleEn: 'Archive Digital Tax Dakhila',
        descBn: 'হালনাগাদ কর দাখিলা ডাউনলোড করে রাখুন যা যেকোনো হস্তান্তরের পূর্বশর্ত।',
        descEn: 'Ensure annual cleared dakhila is archived digitally.',
        targetTab: 'LD_TAX',
        statusBn: 'বাৎসরিক'
      }
    ],
    announcements: [
      {
        id: 'ann-own-1',
        titleBn: 'আপনার ধানমন্ডি ১০৪ দাগে কেভিয়েট লক সক্রিয় রয়েছে',
        titleEn: 'Caveat Lock active on Dhanmondi Plot 104',
        date: 'সতর্কতা',
        badgeBn: 'নিরাপত্তা ব্যবস্থা',
        badgeVariant: 'warning'
      },
      {
        id: 'ann-own-2',
        titleBn: 'চলতি অর্থবছরের সকল ভূমি উন্নয়ন কর সফলভাবে পরিশোধিত হয়েছে',
        titleEn: 'All land taxes settled for current financial year',
        date: 'দাখিলা হালনাগাদ',
        badgeBn: 'অর্থ বিভাগ',
        badgeVariant: 'success'
      }
    ],
    notificationKeywords: ['SEARCH_PERFORMED', 'CAVEAT_LODGED', 'TAX_DEMAND_GENERATED']
  },

  BUYER_SELLER: {
    role: 'BUYER_SELLER',
    nameBn: 'নিবন্ধিত জমির ক্রেতা',
    nameEn: 'Registered Land Buyer',
    taglineBn: 'নিরাপদ জমি ক্রয়, ভায়া দলিল ভেটিং ও এসক্রো লেনদেন',
    taglineEn: 'Fraud-Free Land Acquisition, Title Vetting & Escrow',
    descriptionBn: 'জমির প্রকৃত মালিকানা যাচাই, জাল দলিল সনাক্তকরণে এআই ল্যাব ও সাব-রেজিস্ট্রি পর্যন্ত সুরক্ষিত আর্থিক এসক্রো।',
    descriptionEn: 'Inspect clean title chains, verify seller NID, detect fraudulent deeds via AI, and manage secure escrow payments.',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    borderColor: 'border-amber-200',
    avatarDefault: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    allowedTabs: [
      'DASHBOARD',
      'LAND_SEARCH_GIS',
      'LAND_PROFILE',
      'BUY_SELL_ESCROW',
      'DOC_AI_LAB',
      'FARAID_INHERITANCE'
    ],
    permissions: ROLE_PERMISSIONS.BUYER_SELLER,
    navigation: [
      {
        id: 'DASHBOARD',
        labelBn: 'ক্রেতা ড্যাশবোর্ড',
        labelEn: 'Buyer Dashboard',
        iconName: 'LayoutDashboard',
        descriptionBn: 'ক্রয় প্রক্রিয়া, এসক্রো স্থিতি ও যাচাইকরণ'
      },
      {
        id: 'BUY_SELL_ESCROW',
        labelBn: 'ক্রয়-বিক্রয় ও এসক্রো উইজার্ড',
        labelEn: 'Buy/Sell & Escrow Hub',
        iconName: 'BadgePercent',
        badge: 'Escrow',
        badgeColor: 'bg-amber-600',
        descriptionBn: 'বায়না চুক্তি ও বাংলাদেশ ব্যাংক এসক্রো'
      },
      {
        id: 'DOC_AI_LAB',
        labelBn: 'এআই দলিল যাচাই ল্যাব',
        labelEn: 'AI Document Intelligence',
        iconName: 'Sparkles',
        badge: 'AI OCR',
        badgeColor: 'bg-purple-600',
        descriptionBn: 'জাল দলিল সনাক্তকরণ ও ভায়া দলিল চেইন'
      },
      {
        id: 'LAND_SEARCH_GIS',
        labelBn: 'ভূমি অনুসন্ধান ও ক্যাডাস্ট্রাল',
        labelEn: 'Land Search & GIS',
        iconName: 'MapPin',
        descriptionBn: 'দাগ নম্বর দিয়ে জমির অবস্থান ও বিরোধ চেক'
      },
      {
        id: 'LAND_PROFILE',
        labelBn: 'ডিজিটাল ভূমি প্রোফাইল ও ঝুঁকি',
        labelEn: 'Digital Land Profile',
        iconName: 'FileText',
        descriptionBn: 'মালিকের এনআইডি, খতিয়ান ও বন্ধকী হিস্ট্রি'
      }
    ],
    stats: [
      {
        id: 'buy-stat-1',
        labelBn: 'সুরক্ষিত এসক্রো লেনদেন',
        labelEn: 'Active Escrow Transactions',
        value: '৳ ২.১৫ কোটি',
        change: 'তহবিল সুরক্ষিত',
        changeType: 'positive',
        subtextBn: 'বাংলাদেশ ব্যাংক গেটওয়েতে সংরক্ষিত',
        subtextEn: 'Held in Bangladesh Bank escrow',
        iconName: 'BadgePercent',
        accentColor: 'amber'
      },
      {
        id: 'buy-stat-2',
        labelBn: 'সংরক্ষিত যাচাইকৃত প্লট',
        labelEn: 'Vetted Saved Parcels',
        value: '৪ টি',
        change: '২ টি নিষ্কণ্টক',
        changeType: 'positive',
        subtextBn: 'কোনো স্থগিতাদেশ বা ব্যাংক দায় নেই',
        subtextEn: 'Zero caveats or mortgage lien',
        iconName: 'Building',
        accentColor: 'emerald'
      },
      {
        id: 'buy-stat-3',
        labelBn: 'এআই দলিল বিশ্লেষণ স্কোর',
        labelEn: 'AI Deed Vetting Score',
        value: '৯৬/১০০',
        change: 'সবুজ গ্রেড (নিরাপদ)',
        changeType: 'positive',
        subtextBn: 'ভায়া দলিলের শৃঙ্খল শতভাগ অটুট',
        subtextEn: 'Unbroken chain of title',
        iconName: 'Sparkles',
        accentColor: 'purple'
      },
      {
        id: 'buy-stat-4',
        labelBn: 'সাব-রেজিস্ট্রি অ্যাপয়েন্টমেন্ট',
        labelEn: 'SRO Registration Date',
        value: '১৫ মার্চ',
        change: 'ধানমন্ডি সাব-রেজিস্ট্রি',
        changeType: 'neutral',
        subtextBn: 'বায়োমেট্রিক রেজিস্ট্রেশন টোকেন ইস্যুড',
        subtextEn: 'Biometric token issued',
        iconName: 'CheckCircle2',
        accentColor: 'blue'
      }
    ],
    quickActions: [
      {
        id: 'qa-buy-escrow',
        labelBn: 'ডিজিটাল বায়না ও এসক্রো চালু করুন',
        labelEn: 'Start Digital Conveyancing Escrow',
        descriptionBn: 'দলিল রেজিস্ট্রি না হওয়া পর্যন্ত অর্থ ব্যাংক হেফাজতে রাখুন',
        descriptionEn: 'Safeguard purchase funds until SRO registration',
        targetTab: 'BUY_SELL_ESCROW',
        iconName: 'BadgePercent',
        btnVariant: 'primary'
      },
      {
        id: 'qa-buy-docai',
        labelBn: 'বিক্রেতার দলিল এআই ল্যাবে পরীক্ষা করুন',
        labelEn: 'Analyze Seller Deeds via AI OCR',
        descriptionBn: 'জাল দলিল, নামজারি ফাঁকি ও এনআইডি অসংগতি যাচাই',
        descriptionEn: 'Detect anomalies against national land database',
        targetTab: 'DOC_AI_LAB',
        iconName: 'Sparkles',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-buy-profile',
        labelBn: 'জমির ঝুঁকি স্কোর ও বন্ধক চেক করুন',
        labelEn: 'Inspect Risk Score & Mortgage Lien',
        descriptionBn: 'ব্যাংক লোন বা কোনো আদালতের মামলা আছে কি না দেখুন',
        descriptionEn: 'Check for bank charge, court suit, or caveats',
        targetTab: 'LAND_PROFILE',
        iconName: 'FileText',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-buy-gis',
        labelBn: 'ক্যাডাস্ট্রাল ম্যাপে সীমানা ও রাস্তা দেখুন',
        labelEn: 'Inspect Boundaries & Road Access',
        descriptionBn: 'স্যাটেলাইট ওভারলেতে জমির বাস্তব অবস্থান ও সংযোগ সড়ক',
        descriptionEn: 'View physical boundary nodes and access roads',
        targetTab: 'LAND_SEARCH_GIS',
        iconName: 'Compass',
        btnVariant: 'secondary'
      }
    ],
    workflows: [
      {
        stepNo: 1,
        titleBn: 'জমির টাইটেল ও পর্চা যাচাই',
        titleEn: 'Land Title & Porcha Check',
        descBn: 'খতিয়ানে বিক্রেতার এনআইডি ও উত্তরাধিকার হিস্যা শতভাগ নিশ্চিত করুন।',
        descEn: 'Confirm seller NID match and legal inheritance share.',
        targetTab: 'LAND_PROFILE',
        statusBn: 'প্রাথমিক পরীক্ষা'
      },
      {
        stepNo: 2,
        titleBn: 'এআই দলিল ভেরিফিকেশন',
        titleEn: 'AI Deed Verification',
        descBn: 'ভায়া দলিলের চেইন স্ক্যান করে জাতীয় রেজিস্ট্রি সার্ভারে মেলা নিন।',
        descEn: 'Scan chain of title deeds against SRO central database.',
        targetTab: 'DOC_AI_LAB',
        statusBn: 'দলিল পরীক্ষা'
      },
      {
        stepNo: 3,
        titleBn: 'এসক্রো ফান্ডিং ও বায়না চুক্তি',
        titleEn: 'Escrow Funding & Bayna Contract',
        descBn: 'বাংলাদেশ ব্যাংক এসক্রো অ্যাকাউন্টে অর্থ জমা দিয়ে নিরাপদ বায়না সম্পাদন।',
        descEn: 'Fund micro-escrow securely before SRO registry visit.',
        targetTab: 'BUY_SELL_ESCROW',
        statusBn: 'আর্থিক সুরক্ষা'
      }
    ],
    announcements: [
      {
        id: 'ann-buy-1',
        titleBn: 'বায়না এসক্রো সিস্টেমে জমি ক্রয়ে আর্থিক ঝুঁকি শূন্যের কোঠায়',
        titleEn: 'Zero financial risk with Buyer Escrow Protection',
        date: 'পরামর্শ',
        badgeBn: 'নিরাপদ লেনদেন',
        badgeVariant: 'success'
      },
      {
        id: 'ann-buy-2',
        titleBn: 'সাব-রেজিস্ট্রির পূর্বে অবশ্যই এআই দলিল যাচাই ল্যাব রিপোর্ট সংগ্রহ করুন',
        titleEn: 'Obtain AI OCR report before executing deed at SRO',
        date: 'বিজ্ঞপ্তি',
        badgeBn: 'আইনি পরামর্শ',
        badgeVariant: 'info'
      }
    ],
    notificationKeywords: ['MUTATION_INITIATED', 'SEARCH_PERFORMED', 'DEED_DRAFTED']
  },

  LAWYER: {
    role: 'LAWYER',
    nameBn: 'ভূমি/জমি বিষয়ক আইনজীবী',
    nameEn: 'Land Dispute & Title Advocate',
    taglineBn: 'আদালতি মোকদ্দমা, স্বত্ব যাচাই, কেভিয়েট ও ভায়া দলিল ভেটিং',
    taglineEn: 'Litigation, Injunctions, Title Chain Vetting & Caveats',
    descriptionBn: 'সুপ্রিম কোর্ট ও জেলা আদালতের টাইটেল স্যুট, ১৪৪ ধারা ইনজাংশন, ভায়া দলিল ভেটিং ও মক্কেলের পক্ষে ডিজিটাল কেভিয়েট ফাইল।',
    descriptionEn: 'Supreme Court & Bar land dispute litigation, title deeds chain scrutiny, section 144 injunctions, and legal caveat lodgment.',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-800',
    borderColor: 'border-indigo-200',
    avatarDefault: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    allowedTabs: [
      'DASHBOARD',
      'CAVEATS_DISPUTES',
      'DOC_AI_LAB',
      'LAND_PROFILE',
      'LAND_SEARCH_GIS',
      'FARAID_INHERITANCE'
    ],
    permissions: ROLE_PERMISSIONS.LAWYER,
    navigation: [
      {
        id: 'DASHBOARD',
        labelBn: 'আইনজীবী ড্যাশবোর্ড',
        labelEn: 'Advocate Dashboard',
        iconName: 'LayoutDashboard',
        descriptionBn: 'চলমান মোকদ্দমা, শুনানি দিন ও আইনি ডকেট'
      },
      {
        id: 'CAVEATS_DISPUTES',
        labelBn: 'আদালতি বিরোধ ও কেভিয়েট',
        labelEn: 'Disputes & Caveats',
        iconName: 'Scale',
        badge: 'Court',
        badgeColor: 'bg-indigo-700',
        descriptionBn: '১৪৪ ধারা, টাইটেল স্যুট ও ইনজাংশন ট্র্যাকার'
      },
      {
        id: 'DOC_AI_LAB',
        labelBn: 'এআই ভায়া দলিল ভেটিং ল্যাব',
        labelEn: 'Title Chain AI Vetting',
        iconName: 'Sparkles',
        badge: 'OCR',
        badgeColor: 'bg-purple-600',
        descriptionBn: 'ভায়া দলিলের ধারাবাহিকতা ও আইনি ত্রুটি পরীক্ষা'
      },
      {
        id: 'LAND_PROFILE',
        labelBn: 'ডিজিটাল ভূমি প্রোফাইল ও খতিয়ান',
        labelEn: 'Digital Land Profile',
        iconName: 'FileText',
        descriptionBn: 'সিএস, এসএ, আরএস ও বিএস খতিয়ান চেইন'
      },
      {
        id: 'FARAID_INHERITANCE',
        labelBn: 'ফারায়েজ ও বাটোয়ারা মোকদ্দমা',
        labelEn: 'Faraid & Partition Suit',
        iconName: 'GitFork',
        descriptionBn: 'বাটোয়ারা মামলায় হিস্যা নির্ধারণী হিসাব'
      },
      {
        id: 'LAND_SEARCH_GIS',
        labelBn: 'ক্যাডাস্ট্রাল জিআইএস ম্যাপ',
        labelEn: 'Cadastral GIS Map',
        iconName: 'MapPin',
        descriptionBn: 'দখল ও সীমানা বিরোধের ভূ-মানচিত্র'
      }
    ],
    stats: [
      {
        id: 'law-stat-1',
        labelBn: 'সক্রিয় ল্যান্ড মোকদ্দমা',
        labelEn: 'Active Land Disputes',
        value: '১২ টি মামলা',
        change: '৩ টি টাইটেল স্যুট',
        changeType: 'neutral',
        subtextBn: 'ঢাকা জেলা ও দায়রা জজ আদালত',
        subtextEn: 'Dhaka District Judge Court',
        iconName: 'Scale',
        accentColor: 'indigo'
      },
      {
        id: 'law-stat-2',
        labelBn: 'আসন্ন আদালতের শুনানি',
        labelEn: 'Upcoming Court Hearings',
        value: '৪ টি',
        change: 'আগামী ৭ দিনে',
        changeType: 'warning',
        subtextBn: 'ইনজাংশন ও আরজি জবাব শুনানি',
        subtextEn: 'Injunction & written statement',
        iconName: 'History',
        accentColor: 'amber'
      },
      {
        id: 'law-stat-3',
        labelBn: 'মক্কেলের দাখিলকৃত কেভিয়েট',
        labelEn: 'Lodged Client Caveats',
        value: '৫ টি সক্রিয়',
        change: '১০০% লক কার্যকর',
        changeType: 'positive',
        subtextBn: 'এসআরও ও এসিল্যান্ডে বিক্রি স্থগিত',
        subtextEn: 'All transfers successfully blocked',
        iconName: 'ShieldAlert',
        accentColor: 'red'
      },
      {
        id: 'law-stat-4',
        labelBn: 'ভেটিং সম্পন্ন ভায়া দলিল',
        labelEn: 'Vetted Title Deeds',
        value: '১৮ টি দলিল',
        change: 'এআই সার্টিফায়েড',
        changeType: 'positive',
        subtextBn: 'জাল দলিল সনাক্তকরণ সম্পন্ন',
        subtextEn: 'AI OCR verified authentic',
        iconName: 'FileCheck2',
        accentColor: 'emerald'
      }
    ],
    quickActions: [
      {
        id: 'qa-law-caveat',
        labelBn: 'মক্কেলের পক্ষে ডিজিটাল কেভিয়েট ফাইল করুন',
        labelEn: 'Lodge Statutory Caveat for Client',
        descriptionBn: 'জমির অবৈধ হস্তান্তর ও ভুয়া নামজারি তাৎক্ষণিক লক করুন',
        descriptionEn: 'Instantly restrain unauthorized transfers or mutations',
        targetTab: 'CAVEATS_DISPUTES',
        iconName: 'ShieldAlert',
        btnVariant: 'accent'
      },
      {
        id: 'qa-law-docai',
        labelBn: 'ভায়া দলিলের শৃঙ্খল এআই ভেটিং ল্যাবে যাচাই',
        labelEn: 'Vet Title Deed Chain in AI Lab',
        descriptionBn: 'সিএস থেকে বিএস পর্যন্ত দলিলের ধারাবাহিকতায় কোনো ফাঁক আছে কি না',
        descriptionEn: 'Inspect unbroken historical title flow from CS to BS',
        targetTab: 'DOC_AI_LAB',
        iconName: 'Sparkles',
        btnVariant: 'primary'
      },
      {
        id: 'qa-law-faraid',
        labelBn: 'বাটোয়ারা মামলার অংশ নির্ধারণ (ফারায়েজ)',
        labelEn: 'Partition Suit Share Computation',
        descriptionBn: 'ওয়ারিশদের আইনগত আনা-গণ্ডা ও শতকের সুনির্দিষ্ট হিসাব',
        descriptionEn: 'Compute exact heirs fractional and satak entitlement',
        targetTab: 'FARAID_INHERITANCE',
        iconName: 'GitFork',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-law-profile',
        labelBn: 'আদালতের নিষেধাজ্ঞার স্ট্যাটাস হালনাগাদ',
        labelEn: 'Update Court Injunction Status',
        descriptionBn: 'স্থগিতাদেশ আদেশ জমি আইডিতে ট্যাগ করে দিন',
        descriptionEn: 'Tag injunction decree to unique Land ID',
        targetTab: 'CAVEATS_DISPUTES',
        iconName: 'Scale',
        btnVariant: 'secondary'
      }
    ],
    workflows: [
      {
        stepNo: 1,
        titleBn: 'ভায়া দলিলের শৃঙ্খল বিশ্লেষণ',
        titleEn: 'Chain of Title Deed Analysis',
        descBn: 'দলিল লেখক ও সাব-রেজিস্ট্রির বালাম বইয়ের সাথে মূল দলিলের মেলা নিন।',
        descEn: 'Compare deed volume records with client original documents.',
        targetTab: 'DOC_AI_LAB',
        statusBn: 'আইনি নিরীক্ষা'
      },
      {
        stepNo: 2,
        titleBn: 'আদালতি বিরোধ ও কেভিয়েট এন্ট্রি',
        titleEn: 'Court Dispute & Caveat Entry',
        descBn: 'মামলা নম্বর ও আদালতের নাম সিস্টেমে অন্তর্ভুক্ত করে জমি লক করুন।',
        descEn: 'Register case suit number to lock land against transfer.',
        targetTab: 'CAVEATS_DISPUTES',
        statusBn: 'সুরক্ষা আদেশ'
      },
      {
        stepNo: 3,
        titleBn: 'ওয়ারিশদের অংশ বাটোয়ারা প্রতিবেদন',
        titleEn: 'Partition Suit Heir Report',
        descBn: 'ফারায়েজ ইঞ্জিন থেকে সত্যায়িত হিস্যা প্রতিবেদন আদালতে দাখিল।',
        descEn: 'Generate certified faraid partition report for court.',
        targetTab: 'FARAID_INHERITANCE',
        statusBn: 'আদালতি দাখিল'
      }
    ],
    announcements: [
      {
        id: 'ann-law-1',
        titleBn: 'সাভার ৫৪১২ দাগের দেওয়ানি মামলায় অস্থায়ী নিষেধাজ্ঞার শুনানি আগামী সোমবার',
        titleEn: 'Injunction hearing on Savar 5412 suit next Monday',
        date: 'আদালত নোটিশ',
        badgeBn: 'জেলা জজ কোর্ট',
        badgeVariant: 'warning'
      },
      {
        id: 'ann-law-2',
        titleBn: 'স্মার্ট কেভিয়েট ব্যবস্থার মাধ্যমে সাব-রেজিস্ট্রি সরাসরি ব্লক হচ্ছে',
        titleEn: 'Smart Caveat system now directly blocks SRO registration',
        date: 'সার্কুলার',
        badgeBn: 'সুপ্রিম কোর্ট ও আইন মন্ত্রণালয়',
        badgeVariant: 'info'
      }
    ],
    notificationKeywords: ['CAVEAT_LODGED', 'MUTATION_INITIATED', 'DEED_DRAFTED']
  },

  SURVEYOR: {
    role: 'SURVEYOR',
    nameBn: 'ক্যাডাস্ট্রাল সার্ভেয়ার / আমিন',
    nameEn: 'Cadastral Surveyor (DLRS)',
    taglineBn: 'ডিএলআরএস জরিপ, জিপিএস সীমানা নোড ও ইনসার নদীভাঙন রাডার',
    taglineEn: 'DLRS Land Survey, GPS Boundary Nodes & InSAR Radar',
    descriptionBn: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর (DLRS) লাইসেন্সপ্রাপ্ত সার্ভেয়ার। ক্যাডাস্ট্রাল ম্যাপ ডিজিটাইজেশন, সীমানা ডিমারকেশন ও নদীভাঙন পরিমাপ।',
    descriptionEn: 'Directorate of Land Records & Surveys (DLRS) licensed surveyor. Boundary demarcation, GPS nodes, polygon mapping and InSAR radar.',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-800',
    borderColor: 'border-teal-200',
    avatarDefault: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    allowedTabs: [
      'DASHBOARD',
      'LAND_SEARCH_GIS',
      'INSAR_EROSION',
      'LAND_PROFILE'
    ],
    permissions: ROLE_PERMISSIONS.SURVEYOR,
    navigation: [
      {
        id: 'DASHBOARD',
        labelBn: 'সার্ভেয়ার ড্যাশবোর্ড',
        labelEn: 'Surveyor Dashboard',
        iconName: 'LayoutDashboard',
        descriptionBn: 'জরিপ টাস্ক, সীমানা কো-অর্ডিনেট ও পরিমাপ'
      },
      {
        id: 'LAND_SEARCH_GIS',
        labelBn: 'ক্যাডাস্ট্রাল জিআইএস ম্যাপ',
        labelEn: 'Cadastral GIS Map',
        iconName: 'MapPin',
        badge: 'GPS Nodes',
        badgeColor: 'bg-teal-700',
        descriptionBn: 'দাগভিত্তিক পলিগন ও জিপিএস বাউন্ডারি নোডস'
      },
      {
        id: 'INSAR_EROSION',
        labelBn: 'ইনসার নদীভাঙন ও পয়স্তি',
        labelEn: 'InSAR Erosion Radar',
        iconName: 'Waves',
        badge: 'Radar',
        badgeColor: 'bg-cyan-600',
        descriptionBn: 'ভূ-উপগ্রহ রাডারে সিকস্তি ও পয়স্তি জমি ট্র্যাকিং'
      },
      {
        id: 'LAND_PROFILE',
        labelBn: 'ভূমি নকশা ও খতিয়ান মিলকরণ',
        labelEn: 'Khatian & Map Matching',
        iconName: 'FileText',
        descriptionBn: 'মৌজা জে.এল. এবং নকশার বাস্তব সীমানা'
      }
    ],
    stats: [
      {
        id: 'sur-stat-1',
        labelBn: 'সম্পন্ন ক্যাডাস্ট্রাল ম্যাপ',
        labelEn: 'Parcels Surveyed & Mapped',
        value: '৩,১৮০ দাগ',
        change: '+৪৫ দাগ এই মাসে',
        changeType: 'positive',
        subtextBn: 'পোস্টজিআইএস জিওকোডেড পলিগন',
        subtextEn: 'PostGIS verified polygons',
        iconName: 'MapPin',
        accentColor: 'teal'
      },
      {
        id: 'sur-stat-2',
        labelBn: 'জিপিএস সীমানা ডিমারকেশন',
        labelEn: 'GPS Boundary Nodes Verified',
        value: '১২,৪৫০ টি',
        change: 'আরটিকে জিপিএস একুরেসি',
        changeType: 'positive',
        subtextBn: '±২ সেমি পর্যন্ত নির্ভুল নোড',
        subtextEn: 'RTK centimeter precision',
        iconName: 'Compass',
        accentColor: 'emerald'
      },
      {
        id: 'sur-stat-3',
        labelBn: 'ইনসার সিকস্তি ভাঙন শনাক্ত',
        labelEn: 'InSAR Erosion Flagged',
        value: '৭ টি মৌজা',
        change: 'মেঘনা ও পদ্মা নদীগর্ভ',
        changeType: 'warning',
        subtextBn: 'সিকস্তি পয়স্তি আইন মোতাবেক পুনর্বাসন',
        subtextEn: 'Sikasti land submerged mapping',
        iconName: 'Waves',
        accentColor: 'cyan'
      },
      {
        id: 'sur-stat-4',
        labelBn: 'সীমানা বিরোধ নোটিশ',
        labelEn: 'Pending Boundary Disputes',
        value: '২ টি দাগ',
        change: 'তদন্তাধীন',
        changeType: 'neutral',
        subtextBn: '১০৫ ও ১০৪ দাগ সীমানা ওভারল্যাপ',
        subtextEn: 'Overlap boundary inspection',
        iconName: 'ShieldAlert',
        accentColor: 'amber'
      }
    ],
    quickActions: [
      {
        id: 'qa-sur-gis',
        labelBn: 'ক্যাডাস্ট্রাল জিআইএস ম্যাপে জিপিএস নোড দেখুন',
        labelEn: 'Inspect GPS Boundary Nodes on Map',
        descriptionBn: 'দাগের কর্নার নোড, রাস্তা ও সীমানা বাউন্ডারি পিন যাচাই',
        descriptionEn: 'Inspect parcel corner pins, GPS latitude/longitude',
        targetTab: 'LAND_SEARCH_GIS',
        iconName: 'Compass',
        btnVariant: 'primary'
      },
      {
        id: 'qa-sur-insar',
        labelBn: 'ইনসার ভূ-উপগ্রহ রাডার নদীভাঙন বিশ্লেষণ',
        labelEn: 'Analyze InSAR Satellite River Erosion',
        descriptionBn: 'স্যাটেলাইট রাডারে সিকস্তি ও পয়স্তি জমির হ্রাস-বৃদ্ধি ট্র্যাকিং',
        descriptionEn: 'Sentinel-1 radar ground displacement & erosion tracking',
        targetTab: 'INSAR_EROSION',
        iconName: 'Waves',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-sur-profile',
        labelBn: 'খতিয়ানের সাথে বাস্তব নকশার পরিমাপ মিলকরণ',
        labelEn: 'Match Khatian Area with Cadastral Map',
        descriptionBn: 'খতিয়ানে উল্লেখিত শতক ও নকশার ক্ষেত্রফল সমতাকরণ',
        descriptionEn: 'Reconcile khatian recorded area with GIS polygon area',
        targetTab: 'LAND_PROFILE',
        iconName: 'FileText',
        btnVariant: 'secondary'
      }
    ],
    workflows: [
      {
        stepNo: 1,
        titleBn: 'আরটিকে জিপিএস গ্রাউন্ড সার্ভে',
        titleEn: 'RTK GPS Ground Demarcation',
        descBn: 'মাঠপর্যায়ে সীমানা খুঁটি স্থাপন করে ভৌগোলিক অক্ষাংশ-দ্রাঘিমাংশ সংগ্রহ।',
        descEn: 'Capture boundary corner coordinates using geodetic GPS.',
        targetTab: 'LAND_SEARCH_GIS',
        statusBn: 'মাঠ কাজ'
      },
      {
        stepNo: 2,
        titleBn: 'ইনসার রাডারে সিকস্তি জমি যাচাই',
        titleEn: 'InSAR Riverine Erosion Audit',
        descBn: 'নদীগর্ভে বিলীন জমি ও জেগে ওঠা চরের মৌজা ম্যাপ প্রতিস্থাপন।',
        descEn: 'Update cadastral shoreline for eroded or accreted charland.',
        targetTab: 'INSAR_EROSION',
        statusBn: 'ভূ-উপগ্রহ নিরীক্ষা'
      },
      {
        stepNo: 3,
        titleBn: 'ডিএলআরএস নকশা অনুমোদন',
        titleEn: 'DLRS Map Approval',
        descBn: 'ডিজিটাল মৌজা ম্যাপে নতুন দাগ ও সাব-প্লট সংযোজন।',
        descEn: 'Submit verified polygon coordinates to DLRS central server.',
        targetTab: 'LAND_PROFILE',
        statusBn: 'চূড়ান্ত রেকর্ড'
      }
    ],
    announcements: [
      {
        id: 'ann-sur-1',
        titleBn: 'হাইমচর মেঘনা অববাহিকায় ইনসার সিকস্তি জরিপের নতুন তথ্য আপডেট',
        titleEn: 'InSAR radar erosion updated for Haimchar Meghna basin',
        date: 'সার্ভে রিপোর্ট',
        badgeBn: 'ডিএলআরএস',
        badgeVariant: 'warning'
      },
      {
        id: 'ann-sur-2',
        titleBn: 'সারাদেশে ড্রোন ও আরটিকে জিপিএস ভিত্তিক ডিজিটাল ক্যাডাস্ট্রাল ম্যাপিং চালু',
        titleEn: 'Drone & RTK GPS cadastral mapping rolling out nationwide',
        date: 'প্রজ্ঞাপন',
        badgeBn: 'ভূমি রেকর্ড অধিদপ্তর',
        badgeVariant: 'info'
      }
    ],
    notificationKeywords: ['SEARCH_PERFORMED', 'MUTATION_INITIATED']
  },

  SRO_OFFICER: {
    role: 'SRO_OFFICER',
    nameBn: 'সাব-রেজিস্ট্রার কর্মকর্তা',
    nameEn: 'Sub-Registrar Officer (SRO)',
    taglineBn: 'দলিল নিবন্ধন, বায়োমেট্রিক এনআইডি যাচাই ও এসিল্যান্ডে তাৎক্ষণিক সিঙ্ক',
    taglineEn: 'Deed Registry, Biometric KYC & Realtime AC Land Sync',
    descriptionBn: 'আইন ও বিচার মন্ত্রণালয়ের অধীন সাব-রেজিস্ট্রার। সাফ-কবলা, হেবা ও বাটোয়ারা দলিল রেজিস্ট্রি এবং এসিল্যান্ডে স্বয়ংক্রিয় নামজারি ডকেট প্রেরণ।',
    descriptionEn: 'Sub-Registry officer under Ministry of Law. Saf-Kabala/Heba deed registration, biometric authentication and instant SRO-AC Land mutation sync.',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    borderColor: 'border-emerald-300',
    avatarDefault: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    allowedTabs: [
      'DASHBOARD',
      'SMART_MUTATION',
      'DOC_AI_LAB',
      'BUY_SELL_ESCROW',
      'LAND_PROFILE',
      'AUDIT_EXPLORER'
    ],
    permissions: ROLE_PERMISSIONS.SRO_OFFICER,
    navigation: [
      {
        id: 'DASHBOARD',
        labelBn: 'সাব-রেজিস্ট্রার ড্যাশবোর্ড',
        labelEn: 'SRO Dashboard',
        iconName: 'LayoutDashboard',
        descriptionBn: 'দৈনিক রেজিস্ট্রি কিউ, স্ট্যাম্প শুল্ক ও অডিট'
      },
      {
        id: 'SMART_MUTATION',
        labelBn: 'এসআরও-এসিল্যান্ড সিঙ্ক হাব',
        labelEn: 'SRO-AC Land Mutation Hub',
        iconName: 'GitPullRequest',
        badge: 'Sync',
        badgeColor: 'bg-emerald-700',
        descriptionBn: 'দলিল নিবন্ধনের পর অটো-ডকেট নামজারি প্রেরণ'
      },
      {
        id: 'DOC_AI_LAB',
        labelBn: 'এআই দলিল জালিয়াতি সনাক্তকরণ',
        labelEn: 'AI Deed Fraud Detection',
        iconName: 'Sparkles',
        badge: 'OCR',
        badgeColor: 'bg-purple-600',
        descriptionBn: 'ভুয়া বালাম ও দাতা-গ্রহীতা এনআইডি যাচাই'
      },
      {
        id: 'BUY_SELL_ESCROW',
        labelBn: 'বায়না ও রেজিস্ট্রি লেনদেন',
        labelEn: 'Registration Transactions',
        iconName: 'BadgePercent',
        descriptionBn: 'স্ট্যাম্প ডিউটি ও সরকারি ফি পরিশোধ স্থিতি'
      },
      {
        id: 'LAND_PROFILE',
        labelBn: 'জমি ও খতিয়ান প্রোফাইল',
        labelEn: 'Land Profile & Caveats',
        iconName: 'FileText',
        descriptionBn: 'জমিতে কেভিয়েট বা নিষেধাজ্ঞা আছে কি না'
      },
      {
        id: 'AUDIT_EXPLORER',
        labelBn: 'ক্রিপ্টোগ্রাফিক অডিট ট্রেইল',
        labelEn: 'Cryptographic Audit Trail',
        iconName: 'ShieldAlert',
        descriptionBn: 'দলিল নিবন্ধনের অপরিবর্তনীয় হ্যাশ প্রমাণ'
      }
    ],
    stats: [
      {
        id: 'sro-stat-1',
        labelBn: 'আজকের নিবন্ধিত দলিল',
        labelEn: 'Deeds Registered Today',
        value: '২৮ টি দলিল',
        change: 'সাফ-কবলা ও হেবা',
        changeType: 'positive',
        subtextBn: 'ধানমন্ডি সাব-রেজিস্ট্রি অফিস',
        subtextEn: 'Dhanmondi Sub-Registry',
        iconName: 'FileCheck2',
        accentColor: 'emerald'
      },
      {
        id: 'sro-stat-2',
        labelBn: 'এসিল্যান্ডে অটো-প্রেরিত ডকেট',
        labelEn: 'Auto-Synced to AC Land',
        value: '২৮ / ২৮ টি',
        change: '১০০% রিয়েলটাইম',
        changeType: 'positive',
        subtextBn: 'তাৎক্ষণিক ই-নামজারি প্রক্রিয়া শুরু',
        subtextEn: 'Zero delay instant dispatch',
        iconName: 'GitPullRequest',
        accentColor: 'blue'
      },
      {
        id: 'sro-stat-3',
        labelBn: 'সংগৃহীত রাজস্ব (আজকে)',
        labelEn: 'Revenue Collected Today',
        value: '৳ ৪২.৮ লাখ',
        change: 'ই-চালান গেটওয়ে',
        changeType: 'positive',
        subtextBn: 'স্ট্যাম্প শুল্ক, স্থানীয় কর ও নিবন্ধন ফি',
        subtextEn: 'Stamp duty & registration fees',
        iconName: 'Receipt',
        accentColor: 'amber'
      },
      {
        id: 'sro-stat-4',
        labelBn: 'জালিয়াতি আটকে দেওয়া দলিল',
        labelEn: 'Fraud Attempts Blocked',
        value: '২ টি দলিল',
        change: 'কেভিয়েট বিদ্যমান',
        changeType: 'positive',
        subtextBn: 'এনআইডি অমিল ও আদালতের ইনজাংশন',
        subtextEn: 'Blocked via active caveat',
        iconName: 'ShieldAlert',
        accentColor: 'red'
      }
    ],
    quickActions: [
      {
        id: 'qa-sro-sync',
        labelBn: 'এসআরও-এসিল্যান্ড ই-নামজারি সিঙ্ক চালান',
        labelEn: 'Trigger SRO-AC Land Instant Sync',
        descriptionBn: 'দলিল রেজিস্ট্রির সাথে সাথে অটো-ডকেট এসিল্যান্ড কোর্টে প্রেরণ করুন',
        descriptionEn: 'Auto-dispatch e-mutation docket upon deed registration',
        targetTab: 'SMART_MUTATION',
        iconName: 'GitPullRequest',
        btnVariant: 'primary'
      },
      {
        id: 'qa-sro-docai',
        labelBn: 'এআই দলিল ও দাতা এনআইডি স্ক্রুটিনি',
        labelEn: 'Scrutinize Deed & Parties in AI Lab',
        descriptionBn: 'ভায়া দলিলের সঠিকতা ও জাতীয় ভোটার ডাটাবেজে বায়োমেট্রিক ম্যাচ',
        descriptionEn: 'Verify deed OCR match & national NID biometric match',
        targetTab: 'DOC_AI_LAB',
        iconName: 'Sparkles',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-sro-escrow',
        labelBn: 'স্ট্যাম্প শুল্ক ও রেজিস্ট্রেশন ফি ছাড়পত্র',
        labelEn: 'Verify Stamp Duty & Registration Fees',
        descriptionBn: 'ই-চালানের মাধ্যমে সরকারি কোষাগারে অর্থ জমার সত্যতা নিশ্চিতকরণ',
        descriptionEn: 'Verify government treasury e-Challan receipts',
        targetTab: 'BUY_SELL_ESCROW',
        iconName: 'BadgePercent',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-sro-audit',
        labelBn: 'SHA-256 ক্রিপ্টোগ্রাফিক দলিল স্ট্যাম্পিং',
        labelEn: 'Cryptographic SHA-256 Deed Seal',
        descriptionBn: 'দলিলের ডিজিটাল হ্যাশ ব্লকচেইন অডিট ট্রেইলে সংরক্ষণ',
        descriptionEn: 'Commit immutable cryptographic hash to ledger',
        targetTab: 'AUDIT_EXPLORER',
        iconName: 'ShieldAlert',
        btnVariant: 'secondary'
      }
    ],
    workflows: [
      {
        stepNo: 1,
        titleBn: 'দাতা ও গ্রহীতার এনআইডি ও কেভিয়েট পরীক্ষা',
        titleEn: 'Biometric NID & Caveat Verification',
        descBn: 'জমিতে আদালতের নিষেধাজ্ঞা বা সংবিধিবদ্ধ কেভিয়েট নেই তা নিশ্চিতকরণ।',
        descEn: 'Confirm zero active caveats or injunctions on land.',
        targetTab: 'LAND_PROFILE',
        statusBn: 'নিবন্ধন পূর্বশর্ত'
      },
      {
        stepNo: 2,
        titleBn: 'দলিল রেজিস্ট্রি ও স্ট্যাম্প ডিউটি সংরক্ষণ',
        titleEn: 'Deed Registration & Seal',
        descBn: 'সাব-রেজিস্ট্রি বালাম বইতে ডিজিটাল এন্ট্রি ও কিউআর সনদ প্রদান।',
        descEn: 'Digital volume indexing & issuing verifiable QR deed.',
        targetTab: 'DOC_AI_LAB',
        statusBn: 'রেজিস্ট্রেশন'
      },
      {
        stepNo: 3,
        titleBn: 'এসিল্যান্ডে নামজারি অটো-ডকেট ট্রান্সফার',
        titleEn: 'Instant SRO-AC Land Mutation Dispatch',
        descBn: 'দলিল সম্পন্নের সাথে সাথে এসিল্যান্ডের ড্যাশবোর্ডে ফাইল প্রেরণ।',
        descEn: 'Instant automated docket push to AC Land portal.',
        targetTab: 'SMART_MUTATION',
        statusBn: 'স্বয়ংক্রিয় সিঙ্ক'
      }
    ],
    announcements: [
      {
        id: 'ann-sro-1',
        titleBn: 'দলিল রেজিস্ট্রির পর সেবাগ্রহীতাকে আর এসিল্যান্ড অফিসে দৌড়াতে হবে না',
        titleEn: 'Citizens no longer need to physically visit AC Land after SRO',
        date: 'যৌথ প্রজ্ঞাপন',
        badgeBn: 'আইন ও ভূমি মন্ত্রণালয়',
        badgeVariant: 'success'
      },
      {
        id: 'ann-sro-2',
        titleBn: 'সাভার সাব-রেজিস্ট্রিতে ভুয়া দলিলের নামজারি প্রচেষ্টা কেভিয়েট দ্বারা প্রতিহত',
        titleEn: 'Fraudulent mutation attempt prevented in Savar Sub-Registry',
        date: 'নিরাপত্তা এলার্ট',
        badgeBn: 'ভিজিল্যান্স সেল',
        badgeVariant: 'warning'
      }
    ],
    notificationKeywords: ['DEED_DRAFTED', 'MUTATION_INITIATED', 'CAVEAT_LODGED']
  },

  AC_LAND: {
    role: 'AC_LAND',
    nameBn: 'সহকারী কমিশনার (ভূমি)',
    nameEn: 'Assistant Commissioner (Land)',
    taglineBn: 'স্মার্ট ই-নামজারি অনুমোদন, কানুনগো প্রতিবেদন ও খতিয়ান সৃজন',
    taglineEn: 'e-Mutation Approvals, Kanungo Reviews & Khatian Issuance',
    descriptionBn: 'উপজেলা ভূমি অফিসের রাজস্ব কর্মকর্তা ও এক্সিকিউটিভ ম্যাজিস্ট্রেট। ই-নামজারি আবেদন অনুমোদন, খতিয়ান সৃজন ও খাস জমি সুরক্ষা।',
    descriptionEn: 'Upazila revenue administrative head. Review Kanungo/ULAO reports, approve e-mutations, issue certified khatians and protect khas land.',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-950',
    borderColor: 'border-emerald-300',
    avatarDefault: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    allowedTabs: [
      'DASHBOARD',
      'SMART_MUTATION',
      'LAND_SEARCH_GIS',
      'LAND_PROFILE',
      'LD_TAX',
      'CAVEATS_DISPUTES',
      'AUDIT_EXPLORER'
    ],
    permissions: ROLE_PERMISSIONS.AC_LAND,
    navigation: [
      {
        id: 'DASHBOARD',
        labelBn: 'এসিল্যান্ড ড্যাশবোর্ড',
        labelEn: 'AC Land Dashboard',
        iconName: 'LayoutDashboard',
        descriptionBn: 'নামজারি কিউ, নিষ্পত্তি হার ও সরকারি রাজস্ব'
      },
      {
        id: 'SMART_MUTATION',
        labelBn: 'ই-নামজারি অনুমোদন পোর্টাল',
        labelEn: 'Smart e-Mutation Approvals',
        iconName: 'GitPullRequest',
        badge: 'Approvals',
        badgeColor: 'bg-emerald-700',
        descriptionBn: 'কানুনগো রিপোর্ট, শুনানি ও নতুন খতিয়ান আদেশ'
      },
      {
        id: 'LAND_SEARCH_GIS',
        labelBn: 'মৌজা নকশা ও খাস জমি পরিদর্শন',
        labelEn: 'Cadastral GIS & Khas Land',
        iconName: 'MapPin',
        descriptionBn: 'সরকারি খাস জমি ও ভিপি সম্পত্তি মানচিত্র'
      },
      {
        id: 'LAND_PROFILE',
        labelBn: 'ডিজিটাল খতিয়ান ডাটাবেজ',
        labelEn: 'Digital Khatian Master',
        iconName: 'FileText',
        descriptionBn: 'বিএস ও সিটি খতিয়ান সার্চ ও সংশোধন'
      },
      {
        id: 'CAVEATS_DISPUTES',
        labelBn: 'কেভিয়েট ও স্থগিতাদেশ ট্র্যাকার',
        labelEn: 'Caveats & Injunctions',
        iconName: 'Scale',
        descriptionBn: 'নামজারি আটকানোর সংবিধিবদ্ধ কেভিয়েট'
      },
      {
        id: 'LD_TAX',
        labelBn: 'ভূমি উন্নয়ন কর নিরীক্ষা',
        labelEn: 'Land Revenue Audit',
        iconName: 'Receipt',
        descriptionBn: 'ইউএলএও কর আদায় ও বকেয়া মনিটরিং'
      },
      {
        id: 'AUDIT_EXPLORER',
        labelBn: 'ক্রিপ্টোগ্রাফিক অডিট লেজার',
        labelEn: 'Audit Ledger Explorer',
        iconName: 'ShieldAlert',
        descriptionBn: 'নামজারি অনুমোদনের অপরিবর্তনীয় অডিট হ্যাশ'
      }
    ],
    stats: [
      {
        id: 'acl-stat-1',
        labelBn: 'অপেক্ষমাণ ই-নামজারি আবেদন',
        labelEn: 'Pending Mutation Dockets',
        value: '৩ টি কেস',
        change: 'গড় নিষ্পত্তি ৪.২ মিনিট',
        changeType: 'positive',
        subtextBn: 'সাভার রাজস্ব সার্কেল, ঢাকা',
        subtextEn: 'Savar Revenue Circle, Dhaka',
        iconName: 'GitPullRequest',
        accentColor: 'emerald'
      },
      {
        id: 'acl-stat-2',
        labelBn: 'এই মাসে অনুমোদিত খতিয়ান',
        labelEn: 'Khatians Approved This Month',
        value: '১৮৪ টি',
        change: '+২২% বৃদ্ধি',
        changeType: 'positive',
        subtextBn: 'স্বয়ংক্রিয় কিউআর পর্চা জারি',
        subtextEn: 'Automated QR porcha generated',
        iconName: 'CheckCircle2',
        accentColor: 'green'
      },
      {
        id: 'acl-stat-3',
        labelBn: 'কেভিয়েট স্থগিতাদেশ যুক্ত কেস',
        labelEn: 'Caveat Restrained Cases',
        value: '১ টি স্থগিত',
        change: 'তদন্তাধীন',
        changeType: 'warning',
        subtextBn: 'সাভার ৫৪১২ দাগের ভুয়া দলিল রোধ',
        subtextEn: 'Restrained on caveat flag',
        iconName: 'ShieldAlert',
        accentColor: 'red'
      },
      {
        id: 'acl-stat-4',
        labelBn: 'সংগৃহীত রাজস্ব লক্ষ্যমাত্রা',
        labelEn: 'Revenue Collection Rate',
        value: '৯৪.৮%',
        change: '৳ ৮.২ কোটি আদায়',
        changeType: 'positive',
        subtextBn: 'চলতি অর্থবছর ২০২৫-২৬',
        subtextEn: 'Current FY Target Met',
        iconName: 'Receipt',
        accentColor: 'amber'
      }
    ],
    quickActions: [
      {
        id: 'qa-acl-approve',
        labelBn: 'ই-নামজারি কিউ পরীক্ষা ও অনুমোদন করুন',
        labelEn: 'Review & Approve e-Mutation Dockets',
        descriptionBn: 'কানুনগো ও তহশিলদার প্রতিবেদনের ভিত্তিতে ডিজিটাল খতিয়ান আদেশ',
        descriptionEn: 'Execute mutation approval and issue new khatian order',
        targetTab: 'SMART_MUTATION',
        iconName: 'GitPullRequest',
        btnVariant: 'primary'
      },
      {
        id: 'qa-acl-khas',
        labelBn: 'খাস ও অর্পিত সম্পত্তি ক্যাডাস্ট্রালে পরিদর্শন',
        labelEn: 'Inspect Khas & Vested Land on GIS Map',
        descriptionBn: 'সরকারি খাস জমি চিহ্নিত করে দখল উচ্ছেদ ও সুরক্ষা নিশ্চিত করুন',
        descriptionEn: 'Monitor government khas boundaries and prevent encroachment',
        targetTab: 'LAND_SEARCH_GIS',
        iconName: 'Compass',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-acl-caveats',
        labelBn: 'সংবিধিবদ্ধ কেভিয়েট ও আদালতের ইনজাংশন লিস্ট',
        labelEn: 'Review Caveat & Court Injunction List',
        descriptionBn: 'আদালতের আদেশ মোতাবেক সংশ্লিষ্ট দাগে নামজারি ব্লক নিশ্চিত করুন',
        descriptionEn: 'Enforce court injunction blocks against unauthorized mutation',
        targetTab: 'CAVEATS_DISPUTES',
        iconName: 'Scale',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-acl-tax',
        labelBn: 'ইউনিয়ন ভূমি কর আদায় নিরীক্ষা',
        labelEn: 'Audit Union Land Tax Collection',
        descriptionBn: 'ইউএলএও কর্মকর্তাদের আদায়কৃত রাজস্ব ও কর দাখিলা রিপোর্ট',
        descriptionEn: 'Review revenue targets and union land office reports',
        targetTab: 'LD_TAX',
        iconName: 'Receipt',
        btnVariant: 'secondary'
      }
    ],
    workflows: [
      {
        stepNo: 1,
        titleBn: 'এসআরও প্রেরিত অটো-ডকেট গ্রহণ',
        titleEn: 'Receive SRO Auto-Docket',
        descBn: 'দলিল রেজিস্ট্রির তথ্য পর্যালোচনা করে ইউএলএও ও কানুনগো তদন্ত আদেশ।',
        descEn: 'Inspect registration deed and assign ULAO/Kanungo inquiry.',
        targetTab: 'SMART_MUTATION',
        statusBn: 'প্রাথমিক যাচাই'
      },
      {
        stepNo: 2,
        titleBn: 'কেভিয়েট ও রেকর্ড অসংগতি চেক',
        titleEn: 'Check Caveats & Discrepancies',
        descBn: 'জমি কোনো বিরোধপূর্ণ বা খাস তালিকাভুক্ত কি না তা নিশ্চিতকরণ।',
        descEn: 'Confirm zero caveat alerts and khas land overlap.',
        targetTab: 'CAVEATS_DISPUTES',
        statusBn: 'আইনি নিরীক্ষা'
      },
      {
        stepNo: 3,
        titleBn: 'অনুমোদন ও নতুন খতিয়ান আদেশ',
        titleEn: 'Approve & Issue Final Khatian',
        descBn: 'ডিজিটাল স্বাক্ষরে নামজারি অনুমোদন এবং স্বয়ংক্রিয় ডিএলআরএস আপডেট।',
        descEn: 'Approve with digital signature and update national ledger.',
        targetTab: 'SMART_MUTATION',
        statusBn: 'চূড়ান্ত অনুমোদন'
      }
    ],
    announcements: [
      {
        id: 'ann-acl-1',
        titleBn: 'সাভার সার্কেলে ই-নামজারি নিষ্পত্তির গড় সময় ৪.২ মিনিটে নেমে এসেছে',
        titleEn: 'Average mutation turnaround reduced to 4.2 minutes in Savar',
        date: 'পারফরম্যান্স রিপোর্ট',
        badgeBn: 'ভূমি প্রশাসন',
        badgeVariant: 'success'
      },
      {
        id: 'ann-acl-2',
        titleBn: 'সাভার ৫৪১২ দাগে অননুমোদিত দলিলের নামজারি আবেদন তদন্তাধীন রয়েছে',
        titleEn: 'Conflicting mutation docket flagged for in-depth probe',
        date: 'সতর্কতা',
        badgeBn: 'ভিজিল্যান্স সেল',
        badgeVariant: 'warning'
      }
    ],
    notificationKeywords: ['MUTATION_INITIATED', 'CAVEAT_LODGED', 'DEED_DRAFTED']
  },

  GOV_ADMIN: {
    role: 'GOV_ADMIN',
    nameBn: 'সরকারি প্রশাসক / যুগ্ম সচিব',
    nameEn: 'Gov Administrator (Joint Secretary)',
    taglineBn: 'জাতীয় ভূমি ব্যবস্থাপনা, ম্যাক্রো এনালিটিক্স ও ইন্টারঅপারেবিলিটি এপিআই',
    taglineEn: 'National Land Governance, Macro Analytics & API Gateway',
    descriptionBn: 'ভূমি মন্ত্রণালয়ের নীতি সেল ও জাতীয় প্রশাসন। জেলা/বিভাগীয় কর্মদক্ষতা পর্যবেক্ষণ, আন্তঃমন্ত্রণালয় এপিআই ও সিস্টেম নজরদারি।',
    descriptionEn: 'Ministry of Land national policy and governance. Oversee division/district KPIs, inter-agency APIs, macro fraud analytics, and policies.',
    badgeBg: 'bg-slate-800',
    badgeText: 'text-white',
    borderColor: 'border-slate-700',
    avatarDefault: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    allowedTabs: [
      'DASHBOARD',
      'GOV_API_SANDBOX',
      'AUDIT_EXPLORER',
      'LAND_SEARCH_GIS',
      'SMART_MUTATION',
      'LAND_PROFILE',
      'INSAR_EROSION'
    ],
    permissions: ROLE_PERMISSIONS.GOV_ADMIN,
    navigation: [
      {
        id: 'DASHBOARD',
        labelBn: 'জাতীয় নির্বাহী ড্যাশবোর্ড',
        labelEn: 'National Executive Dashboard',
        iconName: 'LayoutDashboard',
        descriptionBn: 'ম্যাক্রো পরিসংখ্যান, বিভাগীয় কর্মদক্ষতা ও রাজস্ব'
      },
      {
        id: 'GOV_API_SANDBOX',
        labelBn: 'সরকারি এপিআই স্যান্ডবক্স',
        labelEn: 'GovTech API Sandbox',
        iconName: 'Server',
        badge: 'Interop',
        badgeColor: 'bg-emerald-700',
        descriptionBn: 'বাংলাদেশ ব্যাংক, এনআইডি ও আইন মন্ত্রণালয় এপিআই গেটওয়ে'
      },
      {
        id: 'AUDIT_EXPLORER',
        labelBn: 'ক্রিপ্টোগ্রাফিক অডিট লেজার',
        labelEn: 'SHA-256 Audit Ledger',
        iconName: 'ShieldAlert',
        badge: 'SHA-256',
        badgeColor: 'bg-amber-600',
        descriptionBn: 'অপরিবর্তনীয় ব্লকচেইন হ্যাশ অডিট ও জালিয়াতি প্রতিরোধ'
      },
      {
        id: 'LAND_SEARCH_GIS',
        labelBn: 'জাতীয় ক্যাডাস্ট্রাল মানচিত্র',
        labelEn: 'National Cadastral Map',
        iconName: 'MapPin',
        descriptionBn: '৬৪ জেলার সামগ্রিক ভূ-উপগ্রহ ও দাগভিত্তিক ডাটাবেজ'
      },
      {
        id: 'SMART_MUTATION',
        labelBn: 'সারাদেশের নামজারি মনিটরিং',
        labelEn: 'National Mutation Oversight',
        iconName: 'GitPullRequest',
        descriptionBn: 'এসিল্যান্ড ও এসআরও অফিসসমূহের নিষ্পত্তি গতি'
      },
      {
        id: 'INSAR_EROSION',
        labelBn: 'জাতীয় নদীভাঙন রাডার পোর্টাল',
        labelEn: 'National River Erosion Portal',
        iconName: 'Waves',
        descriptionBn: 'সিকস্তি পয়স্তি ও নদীগর্ভ খাস জমি নীতি সেল'
      }
    ],
    stats: [
      {
        id: 'gov-stat-1',
        labelBn: 'জাতীয় ক্যাটালগকৃত ভূমি আইডি',
        labelEn: 'National Cataloged Parcels',
        value: '৩.৮ কোটি',
        change: '১০০% ডিজিটাল',
        changeType: 'positive',
        subtextBn: 'এক নাগরিক এক খতিয়ান ডাটাবেজ',
        subtextEn: 'Unified land database',
        iconName: 'Building',
        accentColor: 'slate'
      },
      {
        id: 'gov-stat-2',
        labelBn: 'বাৎসরিক ভূমি রাজস্ব আহরণ',
        labelEn: 'Annual Revenue Collected',
        value: '৳ ১,২৪০ কোটি',
        change: '+১৮.৪% প্রবৃদ্ধি',
        changeType: 'positive',
        subtextBn: 'ভূমি উন্নয়ন কর ও নিবন্ধন শুল্ক',
        subtextEn: 'Land revenue & stamp taxes',
        iconName: 'TrendingUp',
        accentColor: 'emerald'
      },
      {
        id: 'gov-stat-3',
        labelBn: 'রিয়েলটাইম এপিআই লেনদেন',
        labelEn: 'Realtime Interop API Calls',
        value: '৯৯.৯৮%',
        change: 'লেটেন্সি < ৮৫ms',
        changeType: 'positive',
        subtextBn: 'বাংলাদেশ ব্যাংক ও নির্বাচন কমিশন গেটওয়ে',
        subtextEn: 'Central Bank & NID sync healthy',
        iconName: 'Server',
        accentColor: 'blue'
      },
      {
        id: 'gov-stat-4',
        labelBn: 'প্রতিরোধকৃত দ্বৈত বিক্রি কেস',
        labelEn: 'Double Sale Fraud Blocked',
        value: '১,৪২০ টি কেস',
        change: 'ডিজিটাল সুরক্ষা বলয়',
        changeType: 'positive',
        subtextBn: 'ভুয়া পর্চা ও জালিয়াতি শূন্যের কোঠায়',
        subtextEn: 'Tamper attempts neutralized',
        iconName: 'ShieldCheck',
        accentColor: 'red'
      }
    ],
    quickActions: [
      {
        id: 'qa-gov-api',
        labelBn: 'সরকারি ইন্টারঅপারেবিলিটি এপিআই গেটওয়ে পরিচালনা',
        labelEn: 'Manage GovTech Interoperability APIs',
        descriptionBn: 'বাংলাদেশ ব্যাংক, এনআইডি ও বিচার বিভাগের এপিআই স্বাস্থ্য পর্যবেক্ষণ',
        descriptionEn: 'Inspect cross-ministry API gateway metrics & tokens',
        targetTab: 'GOV_API_SANDBOX',
        iconName: 'Server',
        btnVariant: 'primary'
      },
      {
        id: 'qa-gov-audit',
        labelBn: 'জাতীয় ক্রিপ্টোগ্রাফিক অডিট লেজার বিশ্লেষণ',
        labelEn: 'Inspect National Cryptographic Ledger',
        descriptionBn: 'SHA-256 চেইনে কোনো পূর্বতন পরিবর্তন বা টেম্পারিং হয়েছে কি না',
        descriptionEn: 'Inspect tamper-evident cryptographic block integrity',
        targetTab: 'AUDIT_EXPLORER',
        iconName: 'ShieldAlert',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-gov-gis',
        labelBn: 'জাতীয় ক্যাডাস্ট্রাল ভৌগোলিক মানচিত্র পরিদর্শন',
        labelEn: 'Inspect Nationwide Cadastral GIS',
        descriptionBn: 'বিভাগভিত্তিক জমি ডিজিটাইজেশন ও পলিগন কাভারেজ সূচক',
        descriptionEn: 'Division-level land digitization and GIS coverage',
        targetTab: 'LAND_SEARCH_GIS',
        iconName: 'Compass',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-gov-mutation',
        labelBn: 'জাতীয় ই-নামজারি নিষ্পত্তির সময়সীমা নিরীক্ষা',
        labelEn: 'Audit Nationwide Mutation Turnaround',
        descriptionBn: 'কোন জেলায় গড় নিষ্পত্তি সময় বেশি তা সনাক্ত করে নির্দেশনা প্রদান',
        descriptionEn: 'Identify performance bottlenecks across Upazilas',
        targetTab: 'SMART_MUTATION',
        iconName: 'GitPullRequest',
        btnVariant: 'secondary'
      }
    ],
    workflows: [
      {
        stepNo: 1,
        titleBn: 'ম্যাক্রো ভূমি রাজস্ব ও এনালিটিক্স পর্যালোচনা',
        titleEn: 'Review Macro Land Revenue Analytics',
        descBn: 'সারাদেশের ৬৪ জেলার কর আহরণ ও সেবা প্রদানের গতিবিধি নিরীক্ষণ।',
        descEn: 'Monitor 64 districts revenue collection and KPI metrics.',
        targetTab: 'DASHBOARD',
        statusBn: 'জাতীয় পর্যবেক্ষণ'
      },
      {
        stepNo: 2,
        titleBn: 'আন্তঃমন্ত্রণালয় এপিআই সংযোগ সুরক্ষা',
        titleEn: 'Inter-Agency API Integrity Check',
        descBn: 'আইন মন্ত্রণালয় ও বাংলাদেশ ব্যাংকের সাথে লাইভ ডেটা সিঙ্ক বজায় রাখা।',
        descEn: 'Maintain live data pipeline with Ministry of Law and Central Bank.',
        targetTab: 'GOV_API_SANDBOX',
        statusBn: 'সিস্টেম সুরক্ষা'
      },
      {
        stepNo: 3,
        titleBn: 'অডিট লেজার ও ক্রিপ্টো হ্যাশ যাচাই',
        titleEn: 'Cryptographic Hash Verification',
        descBn: 'ভূমি ডাটাবেজে কোনো অননুমোদিত ডাটাবেজ ব্যাকডোর যাতে না থাকে তা নিশ্চিতকরণ।',
        descEn: 'Zero tolerance for retrospective ledger modifications.',
        targetTab: 'AUDIT_EXPLORER',
        statusBn: 'নিরাপত্তা অডিট'
      }
    ],
    announcements: [
      {
        id: 'ann-gov-1',
        titleBn: 'ভূমি মন্ত্রণালয় ও আইন মন্ত্রণালয়ের সমন্বিত একক সেবা ফ্রেমওয়ার্ক অনুমোদিত',
        titleEn: 'Joint Unified Land Service Framework Approved',
        date: 'কেবিনেট সিদ্ধান্ত',
        badgeBn: 'জাতীয় নীতি',
        badgeVariant: 'success'
      },
      {
        id: 'ann-gov-2',
        titleBn: 'বাংলাদেশ ব্যাংকের সাথে রিয়েলটাইম বন্ধক যাচাই এপিআই শতভাগ সচল',
        titleEn: 'Sample bank mortgage verification API',
        date: 'এপিআই গেটওয়ে',
        badgeBn: 'সিস্টেম স্ট্যাটাস',
        badgeVariant: 'info'
      }
    ],
    notificationKeywords: ['SEARCH_PERFORMED', 'CAVEAT_LODGED', 'MUTATION_INITIATED']
  },

  BANK_OFFICER: {
    role: 'BANK_OFFICER',
    nameBn: 'ব্যাংক / ঋণ কর্মকর্তা',
    nameEn: 'Bank Officer (Credit & Mortgage)',
    taglineBn: 'ঋণ বন্ধকী যাচাই, দায়মুক্তি সনদ ও ডিজিটাল লিয়েন রেজিস্ট্রেশন',
    taglineEn: 'Mortgage Vetting, Lien Registry & Non-Encumbrance Audit',
    descriptionBn: 'বাণিজ্যিক ব্যাংক ও আর্থিক প্রতিষ্ঠানের ক্রেডিট অফিসার। ঋণ প্রদানের পূর্বে জমির বন্ধকী দায়, খতিয়ান ও কেভিয়েট যাচাই এবং ব্যাংক লিয়েন ডিজিটাল চার্জ যুক্তকরণ।',
    descriptionEn: 'Commercial bank credit officer. Verify mortgage collateral, verify non-encumbrance status, register digital bank liens on parcels.',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    borderColor: 'border-emerald-200',
    avatarDefault: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    allowedTabs: [
      'DASHBOARD',
      'LAND_PROFILE',
      'CAVEATS_DISPUTES',
      'DOC_AI_LAB',
      'LAND_SEARCH_GIS'
    ],
    permissions: ROLE_PERMISSIONS.BANK_OFFICER,
    navigation: [
      {
        id: 'DASHBOARD',
        labelBn: 'ব্যাংক ক্রেডিট ড্যাশবোর্ড',
        labelEn: 'Bank Credit Dashboard',
        iconName: 'LayoutDashboard',
        descriptionBn: 'বন্ধকী পোর্টফোলিও, ঋণ যাচাই ও দায়মুক্তি কিউ'
      },
      {
        id: 'LAND_PROFILE',
        labelBn: 'ডিজিটাল ভূমি প্রোফাইল ও দায় যাচাই',
        labelEn: 'Digital Land Profile & Liens',
        iconName: 'Building',
        badge: 'Collateral',
        badgeColor: 'bg-emerald-700',
        descriptionBn: 'জমির বাজারমূল্য, পূর্বতন বন্ধক ও খতিয়ান'
      },
      {
        id: 'CAVEATS_DISPUTES',
        labelBn: 'আদালতি বিরোধ ও কেভিয়েট ট্র্যাকার',
        labelEn: 'Litigation & Caveat Checks',
        iconName: 'Scale',
        descriptionBn: 'বন্ধকী সম্পত্তিতে কোনো মামলা বা ইনজাংশন আছে কি না'
      },
      {
        id: 'DOC_AI_LAB',
        labelBn: 'এআই ভায়া দলিল ভেটিং ল্যাব',
        labelEn: 'AI Deed Chain Vetting',
        iconName: 'Sparkles',
        badge: 'CIB',
        badgeColor: 'bg-purple-600',
        descriptionBn: 'ঋণ গ্রহীতার জমা দেওয়া দলিলের যথার্থতা'
      },
      {
        id: 'LAND_SEARCH_GIS',
        labelBn: 'ক্যাডাস্ট্রাল জিআইএস লোকেশন',
        labelEn: 'Cadastral GIS Verification',
        iconName: 'MapPin',
        descriptionBn: 'জমির বাস্তব অবস্থান ও ভৌগোলিক পরিদর্শন'
      }
    ],
    stats: [
      {
        id: 'bnk-stat-1',
        labelBn: 'সক্রিয় নিবন্ধিত ব্যাংক বন্ধকী',
        labelEn: 'Active Registered Mortgages',
        value: '৳ ১৮৫ কোটি',
        change: 'সোনালী ব্যাংক পিএলসি',
        changeType: 'positive',
        subtextBn: 'ডিজিটাল লিয়েন মার্ক করা রয়েছে',
        subtextEn: 'Digital lien locked on Land IDs',
        iconName: 'CreditCard',
        accentColor: 'emerald'
      },
      {
        id: 'bnk-stat-2',
        labelBn: 'প্রক্রিয়াধীন কোল্যাটেরাল ঋণ আবেদন',
        labelEn: 'Pending Collateral Vetting',
        value: '৮ টি আবেদন',
        change: 'যাচাই চলমান',
        changeType: 'neutral',
        subtextBn: 'সিআইবি ও দায়মুক্তি সনদ নিরীক্ষা',
        subtextEn: 'Non-encumbrance verification',
        iconName: 'FileText',
        accentColor: 'blue'
      },
      {
        id: 'bnk-stat-3',
        labelBn: 'প্রতিরোধকৃত দ্বৈত বন্ধক জালিয়াতি',
        labelEn: 'Double Mortgage Prevented',
        value: '৩ টি প্রয়াস',
        change: '১০০% প্রতিরোধ',
        changeType: 'positive',
        subtextBn: 'অন্য ব্যাংকে বিদ্যমান ঋণ তৎক্ষণাৎ ধরা পড়েছে',
        subtextEn: 'Prior mortgage detected instantly',
        iconName: 'ShieldCheck',
        accentColor: 'red'
      },
      {
        id: 'bnk-stat-4',
        labelBn: 'ইস্যুকৃত দায়মুক্তি সনদ (NOC)',
        labelEn: 'Discharged Liens (NOC)',
        value: '১২ টি',
        change: 'সম্পূর্ণ খালাস',
        changeType: 'positive',
        subtextBn: 'ঋণ পরিশোধ সাপেক্ষে লিয়েন অবমুক্ত',
        subtextEn: 'Lien unlocked upon loan closure',
        iconName: 'CheckCircle2',
        accentColor: 'green'
      }
    ],
    quickActions: [
      {
        id: 'qa-bnk-profile',
        labelBn: 'বন্ধকী জমির পূর্বতন দায় ও খতিয়ান যাচাই',
        labelEn: 'Verify Existing Liens & Ownership',
        descriptionBn: 'জমিতে পূর্বে অন্য কোনো ব্যাংকের ঋণ বা সরকারি নিষেধাজ্ঞা আছে কি না',
        descriptionEn: 'Check for existing bank charge or government restraint',
        targetTab: 'LAND_PROFILE',
        iconName: 'Building',
        btnVariant: 'primary'
      },
      {
        id: 'qa-bnk-docai',
        labelBn: 'ঋণ গ্রহীতার দলিল এআই ভেটিং ল্যাবে পরীক্ষা',
        labelEn: 'Screen Borrower Deeds in AI Lab',
        descriptionBn: 'ভায়া দলিলের জালিয়াতি ও মূল বালামের সাথে হুবহু মিল যাচাই',
        descriptionEn: 'Detect counterfeit deeds and ownership chain anomalies',
        targetTab: 'DOC_AI_LAB',
        iconName: 'Sparkles',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-bnk-disputes',
        labelBn: 'আদালতের নিষেধাজ্ঞা ও কেভিয়েট স্থিতি চেক',
        labelEn: 'Check Court Injunctions & Caveats',
        descriptionBn: 'সম্পত্তি নিয়ে কোনো দেওয়ানি মোকদ্দমা বা টাইটেল স্যুট চলছে কি না',
        descriptionEn: 'Ensure land is free from pending title suits or court stays',
        targetTab: 'CAVEATS_DISPUTES',
        iconName: 'Scale',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-bnk-gis',
        labelBn: 'ক্যাডাস্ট্রাল মানচিত্রে বন্ধকী প্লটের ভৌগোলিক যাচাই',
        labelEn: 'Inspect Collateral Location on GIS Map',
        descriptionBn: 'জমির বাস্তব সীমানা ও রাস্তা সংযোগ নিশ্চিতকরণ',
        descriptionEn: 'Confirm access road and boundary coordinates on map',
        targetTab: 'LAND_SEARCH_GIS',
        iconName: 'Compass',
        btnVariant: 'secondary'
      }
    ],
    workflows: [
      {
        stepNo: 1,
        titleBn: 'সিআইবি ও পূর্বতন বন্ধক যাচাই',
        titleEn: 'CIB & Prior Mortgage Search',
        descBn: 'জাতীয় ডাটাবেজে একই জমি অন্য ব্যাংকে মর্টগেজ দেওয়া আছে কি না পরীক্ষা।',
        descEn: 'Query national land registry for prior active bank encumbrances.',
        targetTab: 'LAND_PROFILE',
        statusBn: 'প্রাথমিক যাচাই'
      },
      {
        stepNo: 2,
        titleBn: 'আদালতি মোকদ্দমা ও কেভিয়েট স্ক্রিনিং',
        titleEn: 'Litigation & Injunction Screening',
        descBn: 'আদালতের কোনো স্থগিতাদেশ বা সংবিধিবদ্ধ কেভিয়েট নেই তা নিশ্চিতকরণ।',
        descEn: 'Confirm absence of active civil court injunctions.',
        targetTab: 'CAVEATS_DISPUTES',
        statusBn: 'আইনি নিরীক্ষা'
      },
      {
        stepNo: 3,
        titleBn: 'ডিজিটাল ব্যাংক চার্জ ও লিয়েন মার্কিং',
        titleEn: 'Register Digital Bank Lien',
        descBn: 'ঋণ মঞ্জুরির পর জমি আইডিতে ব্যাংক মর্টগেজ ডিজিটাল সিল যুক্তকরণ।',
        descEn: 'Attach official mortgage charge flag to land parcel ID.',
        targetTab: 'LAND_PROFILE',
        statusBn: 'চার্জ রেজিস্ট্রেশন'
      }
    ],
    announcements: [
      {
        id: 'ann-bnk-1',
        titleBn: 'একই জমিতে দ্বৈত ঋণ বন্ধক প্রতিরোধে বাংলাদেশ ব্যাংক এপিআই বাধ্যতামূলক',
        titleEn: 'Central Bank API mandatory to eliminate double-mortgage fraud',
        date: 'বাংলাদেশ ব্যাংক নির্দেশিকা',
        badgeBn: 'ব্যাংকিং নীতিমালা',
        badgeVariant: 'warning'
      },
      {
        id: 'ann-bnk-2',
        titleBn: 'সোনালী ব্যাংকের সকল বন্ধকী সম্পত্তি সফলভাবে ডিজিটাল লিয়েন সুরক্ষিত',
        titleEn: 'All Sonali Bank collateral secured under digital lien locks',
        date: 'অভ্যন্তরীণ সার্কুলার',
        badgeBn: 'ক্রেডিট শাখা',
        badgeVariant: 'success'
      }
    ],
    notificationKeywords: ['MORTGAGE_CREATED', 'CAVEAT_LODGED', 'SEARCH_PERFORMED']
  },

  AUDITOR: {
    role: 'AUDITOR',
    nameBn: 'সিস্টেম অডিটর ও ভিজিল্যান্স',
    nameEn: 'System Auditor & Vigilance',
    taglineBn: 'SHA-256 ক্রিপ্টোগ্রাফিক ব্লকচেইন অডিট ও ডিজিটাল ফরেনসিক নজরদারি',
    taglineEn: 'SHA-256 Cryptographic Audit & Forensic Vigilance',
    descriptionBn: 'জাতীয় ভূমি অডিট ও দুর্নীতি দমন সেল। অপরিবর্তনীয় ক্রিপ্টোগ্রাফিক ব্লকচেইন হ্যাশ অডিট, পূর্বতন তারিখ পরিবর্তনের জালিয়াতি সনাক্তকরণ ও ফরেনসিক লগ সংরক্ষণ।',
    descriptionEn: 'National land audit & anti-corruption cell. Immutable cryptographic block verification, retrospective date tampering detection and forensic audit trails.',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-900',
    borderColor: 'border-red-300',
    avatarDefault: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    allowedTabs: [
      'DASHBOARD',
      'AUDIT_EXPLORER',
      'GOV_API_SANDBOX',
      'LAND_PROFILE',
      'SMART_MUTATION',
      'LAND_SEARCH_GIS'
    ],
    permissions: ROLE_PERMISSIONS.AUDITOR,
    navigation: [
      {
        id: 'DASHBOARD',
        labelBn: 'অডিটর ড্যাশবোর্ড',
        labelEn: 'Auditor Dashboard',
        iconName: 'LayoutDashboard',
        descriptionBn: 'ক্রিপ্টোগ্রাফিক ব্লকচেইন অখণ্ডতা ও অডিট নোটিফিকেশন'
      },
      {
        id: 'AUDIT_EXPLORER',
        labelBn: 'SHA-256 অডিট লেজার এক্সপ্লোরার',
        labelEn: 'SHA-256 Audit Ledger',
        iconName: 'ShieldAlert',
        badge: 'Ledger',
        badgeColor: 'bg-red-700',
        descriptionBn: 'অপরিবর্তনীয় ক্রিপ্টোগ্রাফিক হ্যাশ চেইনিং ও ব্লক প্রুফ'
      },
      {
        id: 'GOV_API_SANDBOX',
        labelBn: 'এপিআই অ্যাক্সেস সিকিউরিটি লগ',
        labelEn: 'Gov API Security Logs',
        iconName: 'Server',
        descriptionBn: 'বাহ্যিক গেটওয়ে কোয়েরি ও অননুমোদিত রিকোয়েস্ট মনিটরিং'
      },
      {
        id: 'SMART_MUTATION',
        labelBn: 'নামজারি ফরেনসিক নিরীক্ষা',
        labelEn: 'Mutation Forensic Audit',
        iconName: 'GitPullRequest',
        descriptionBn: 'এসআরও ও এসিল্যান্ডের আদেশের সময়কাল ও হ্যাশ অডিট'
      },
      {
        id: 'LAND_PROFILE',
        labelBn: 'রেকর্ড সংশোধন ইতিহাস',
        labelEn: 'Record Modification Trail',
        iconName: 'FileText',
        descriptionBn: 'খতিয়ান পরিবর্তনের পূর্বাপর হিস্ট্রি অডিট'
      }
    ],
    stats: [
      {
        id: 'aud-stat-1',
        labelBn: 'যাচাইকৃত ক্রিপ্টোগ্রাফিক ব্লক',
        labelEn: 'Verified Cryptographic Blocks',
        value: '৩,৮৪২ টি ব্লক',
        change: '১০০% হ্যাশ ম্যাচ',
        changeType: 'positive',
        subtextBn: 'SHA-256 অপরিবর্তনীয় চেইন',
        subtextEn: 'Tamper-evident blockchain state',
        iconName: 'Lock',
        accentColor: 'red'
      },
      {
        id: 'aud-stat-2',
        labelBn: 'পূর্বতন তারিখ পরিবর্তনের চেষ্টা',
        labelEn: 'Retrospective Edits Detected',
        value: '০ টি (শূন্য)',
        change: 'সিস্টেম নিরাপদ',
        changeType: 'positive',
        subtextBn: 'কোনো ব্যাকডেটেড এন্ট্রি সম্ভব হয়নি',
        subtextEn: 'Zero backdated entries allowed',
        iconName: 'ShieldCheck',
        accentColor: 'green'
      },
      {
        id: 'aud-stat-3',
        labelBn: 'অননুমোদিত প্রবেশ প্রয়াস',
        labelEn: 'Unauthorized Access Blocked',
        value: '৭ টি এলার্ট',
        change: 'আইপি ব্লক করা হয়েছে',
        changeType: 'warning',
        subtextBn: 'রোল পারমিশন গার্ড দ্বারা প্রতিহত',
        subtextEn: 'Defended via RBAC guards',
        iconName: 'ShieldAlert',
        accentColor: 'amber'
      },
      {
        id: 'aud-stat-4',
        labelBn: 'ফরেনসিক অডিট সম্পন্ন রেকর্ড',
        labelEn: 'Forensic Audit Completed',
        value: '১৪,৫০০ টি',
        change: 'ডিজিটাল সিল মোহর',
        changeType: 'positive',
        subtextBn: 'দুদক ও সিএজি নিরীক্ষা মানসম্মত',
        subtextEn: 'ACC & CAG compliance passed',
        iconName: 'FileCheck2',
        accentColor: 'blue'
      }
    ],
    quickActions: [
      {
        id: 'qa-aud-ledger',
        labelBn: 'SHA-256 ক্রিপ্টোগ্রাফিক চেইন অখণ্ডতা নিরীক্ষা',
        labelEn: 'Verify SHA-256 Cryptographic Chain Integrity',
        descriptionBn: 'প্রত্যেক ব্লকের পূর্ববর্তী হ্যাশ ও বর্তমান হ্যাশের ধারাবাহিকতা পরীক্ষা',
        descriptionEn: 'Verify sequential parent-child hash integrity across blocks',
        targetTab: 'AUDIT_EXPLORER',
        iconName: 'ShieldAlert',
        btnVariant: 'primary'
      },
      {
        id: 'qa-aud-api',
        labelBn: 'সরকারি এপিআই ট্রানজেকশন অডিট পরিদর্শন',
        labelEn: 'Inspect GovTech API Audit Trails',
        descriptionBn: 'কোন সরকারি সংস্থা থেকে কিউরি করা হয়েছে তার টাইমস্ট্যাম্প ও লগ',
        descriptionEn: 'Inspect API client caller IDs, timestamps and payloads',
        targetTab: 'GOV_API_SANDBOX',
        iconName: 'Server',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-aud-mutation',
        labelBn: 'এসিল্যান্ড নামজারি নিষ্পত্তির সময়ক্রম ফরেনসিক অডিট',
        labelEn: 'Forensic Audit of Mutation Lifecycle',
        descriptionBn: 'আবেদন থেকে খতিয়ান অনুমোদন পর্যন্ত ধাপগুলোর ক্রিপ্টো প্রমাণ যাচাই',
        descriptionEn: 'Inspect timestamped proofs for each mutation event',
        targetTab: 'SMART_MUTATION',
        iconName: 'GitPullRequest',
        btnVariant: 'secondary'
      },
      {
        id: 'qa-aud-profile',
        labelBn: 'খতিয়ান ও দলিলের পূর্বাপর ইতিহাস অডিট',
        labelEn: 'Audit Historical Ownership Alterations',
        descriptionBn: 'রেকর্ডে কোনো বেআইনি রদবদল বা ওভাররাইট হয়েছে কি না',
        descriptionEn: 'Detect unauthorized database overrides or retro-modifications',
        targetTab: 'LAND_PROFILE',
        iconName: 'FileText',
        btnVariant: 'secondary'
      }
    ],
    workflows: [
      {
        stepNo: 1,
        titleBn: 'ক্রিপ্টোগ্রাফিক হ্যাশ চেইন ভেরিফিকেশন',
        titleEn: 'Cryptographic Hash Chain Verification',
        descBn: 'সিস্টেমের সকল ট্রানজেকশনের হ্যাশ চেইনিং পুনরায় গণনা করে মিলিয়ে দেখা।',
        descEn: 'Recalculate SHA-256 hash tree to ensure zero tampering.',
        targetTab: 'AUDIT_EXPLORER',
        statusBn: 'স্বয়ংক্রিয় অডিট'
      },
      {
        stepNo: 2,
        titleBn: 'নামজারি ও দলিলের সময়ক্রম নিরীক্ষা',
        titleEn: 'Timeline Forensics Audit',
        descBn: 'সাব-রেজিস্ট্রির দলিল নম্বর ও এসিল্যান্ডের ডকেটের টাইমস্ট্যাম্প মিলিয়ে দেখা।',
        descEn: 'Audit SRO registration timestamp with AC Land docket time.',
        targetTab: 'SMART_MUTATION',
        statusBn: 'ফরেনসিক যাচাই'
      },
      {
        stepNo: 3,
        titleBn: 'ভিজিল্যান্স ও দুদক ফরেনসিক এক্সপোর্ট',
        titleEn: 'Export Certified Forensic Audit Report',
        descBn: 'আইনগত কার্যধারার জন্য ক্রিপ্টোগ্রাফিক স্বাক্ষরযুক্ত প্রতিবেদন রপ্তানি।',
        descEn: 'Export tamper-proof audit report for anti-corruption probe.',
        targetTab: 'AUDIT_EXPLORER',
        statusBn: 'আইনগত রিপোর্ট'
      }
    ],
    announcements: [
      {
        id: 'ann-aud-1',
        titleBn: 'জাতীয় ডিজিটাল ভূমি লেজারে বিগত ২৪ ঘণ্টায় শূন্য হ্যাশ অসংগতি রেকর্ড',
        titleEn: 'Zero hash anomalies recorded in National Land Ledger in past 24h',
        date: 'দৈনিক অডিট বুলেটিন',
        badgeBn: 'সিস্টেম অখণ্ডতা',
        badgeVariant: 'success'
      },
      {
        id: 'ann-aud-2',
        titleBn: 'যেকোনো কর্মকর্তা কর্তৃক ব্যাকডেটেড এন্ট্রি প্রচেষ্টা স্বয়ংক্রিয়ভাবে অডিট ফ্ল্যাগড হবে',
        titleEn: 'Any backdated database entry attempt automatically flagged by engine',
        date: 'সতর্কীকরণ সার্কুলার',
        badgeBn: 'দুদক ও ভিজিল্যান্স',
        badgeVariant: 'warning'
      }
    ],
    notificationKeywords: ['SEARCH_PERFORMED', 'CAVEAT_LODGED', 'MUTATION_INITIATED', 'MORTGAGE_CREATED']
  }
};

/**
 * Get role configuration helper
 */
export const getRoleConfig = (role: UserRole): RoleDefinition => {
  return ROLE_CONFIGURATIONS[role] || ROLE_CONFIGURATIONS.CITIZEN;
};

/**
 * Check if a tab is allowed for a given role
 */
export const isTabAllowedForRole = (role: UserRole, tab: TabType): boolean => {
  const config = getRoleConfig(role);
  return config.allowedTabs.includes(tab);
};
