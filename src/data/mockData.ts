import {
  UserProfile,
  LandParcel,
  KhatianRecord,
  DeedRecord,
  MutationRecord,
  TaxRecord,
  EncumbranceRecord,
  CaveatRecord,
  DisputeRecord,
  PropertyAlert,
  TransactionEscrow,
  InSARData
} from '../types';

export const mockUsers: UserProfile[] = [
  {
    id: 'usr-citizen-01',
    nid: '1990*********0142',
    name: 'Rahima Begum',
    nameBn: 'রহিমা বেগম',
    role: 'CITIZEN',
    email: 'rahima.begum@example.invalid',
    phone: '+880 1711-234567',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    designation: 'General Citizen & Prospective Land Buyer',
    designationBn: 'সাধারণ নাগরিক ও প্রত্যাশিত ক্রেতা',
    jurisdiction: 'Dhaka Division',
    jurisdictionBn: 'ঢাকা বিভাগ',
    isNidVerified: true,
    isBiometricVerified: true,
  },
  {
    id: 'usr-owner-01',
    nid: '1982*********0789',
    name: 'Abdul Karim Chowdhury',
    nameBn: 'আব্দুল করিম চৌধুরী',
    role: 'OWNER',
    email: 'abdul.karim@example.invalid',
    phone: '+880 1819-876543',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    designation: 'Verified Land Owner (Portfolio: 3 Parcels)',
    designationBn: 'যাচাইকৃত জমির মালিক (৩টি প্লটের স্বত্বাধিকারী)',
    jurisdiction: 'Dhanmondi, Dhaka',
    jurisdictionBn: 'ধানমন্ডি, ঢাকা',
    isNidVerified: true,
    isBiometricVerified: true,
  },
  {
    id: 'usr-buyer-01',
    nid: '1995*********0456',
    name: 'Tariqul Islam',
    nameBn: 'তারিকুল ইসলাম',
    role: 'BUYER_SELLER',
    email: 'tariqul.islam@example.invalid',
    phone: '+880 1912-345678',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    designation: 'Registered Conveyancing Buyer',
    designationBn: 'নিবন্ধিত জমির ক্রেতা',
    jurisdiction: 'Gulshan, Dhaka',
    jurisdictionBn: 'গুলশান, ঢাকা',
    isNidVerified: true,
    isBiometricVerified: true,
  },
  {
    id: 'usr-lawyer-01',
    nid: '1978*********0321',
    name: 'Advocate Aminul Haque',
    nameBn: 'অ্যাডভোকেট আমিনুল হক',
    role: 'LAWYER',
    email: 'aminul.law@supremecourt.gov.bd',
    phone: '+880 1713-987654',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    designation: 'Supreme Court & Land Vetting Advocate',
    designationBn: 'সুপ্রিম কোর্ট ও ভূমি বিষয়ক আইনজীবী',
    jurisdiction: 'Dhaka Bar Association (Reg: 4521/BD)',
    jurisdictionBn: 'ঢাকা বার অ্যাসোসিয়েশন (সনদ: ৪৫২১/বিডি)',
    isNidVerified: true,
    isBiometricVerified: true,
  },
  {
    id: 'usr-surveyor-01',
    nid: '1985*********0654',
    name: 'Surveyor Rafiqul Amin',
    nameBn: 'সার্ভেয়ার রফিকুল আমিন',
    role: 'SURVEYOR',
    email: 'rafiqul.survey@dlrs.gov.bd',
    phone: '+880 1611-456789',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    designation: 'Licensed Cadastral Surveyor (DLR&S Lic: 104)',
    designationBn: 'লাইসেন্সপ্রাপ্ত ক্যাডাস্ট্রাল সার্ভেয়ার (ডিএলআরএস)',
    jurisdiction: 'Dhaka Metropolitan & Savar Circle',
    jurisdictionBn: 'ঢাকা মেট্রোপলিটন ও সাভার সার্কেল',
    isNidVerified: true,
    isBiometricVerified: true,
  },
  {
    id: 'usr-sro-01',
    nid: '1975*********0987',
    name: 'Mahmud Hasan, BCS',
    nameBn: 'মাহমুদ হাসান, বিসিএস',
    role: 'SRO_OFFICER',
    email: 'sro.dhanmondi@minlaw.gov.bd',
    phone: '+880 1715-112233',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    designation: 'Sub-Registrar Officer (SRO), Dhanmondi',
    designationBn: 'সাব-রেজিস্ট্রার কর্মকর্তা, ধানমন্ডি সাব-রেজিস্ট্রি',
    jurisdiction: 'Dhanmondi Sub-Registry Office, Dhaka',
    jurisdictionBn: 'ধানমন্ডি সাব-রেজিস্ট্রি অফিস, ঢাকা',
    isNidVerified: true,
    isBiometricVerified: true,
  },
  {
    id: 'usr-acland-01',
    nid: '1987*********0112',
    name: 'Syeda Farhana, BCS (Admin)',
    nameBn: 'সৈয়দা ফারহানা, বিসিএস (প্রশাসন)',
    role: 'AC_LAND',
    email: 'acland.savar@minland.gov.bd',
    phone: '+880 1712-998877',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    designation: 'Assistant Commissioner (Land), Savar Upazila',
    designationBn: 'সহকারী কমিশনার (ভূমি), সাভার রাজস্ব সার্কেল',
    jurisdiction: 'Savar Upazila Land Office, Dhaka',
    jurisdictionBn: 'সাভার উপজেলা ভূমি অফিস, ঢাকা',
    isNidVerified: true,
    isBiometricVerified: true,
  },
  {
    id: 'usr-admin-01',
    nid: '1972*********0555',
    name: 'Dr. Kamal Hossain, BCS',
    nameBn: 'ড. কামাল হোসেন, বিসিএস',
    role: 'GOV_ADMIN',
    email: 'jointsec.land@minland.gov.bd',
    phone: '+880 1711-001122',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    designation: 'Joint Secretary, Ministry of Land',
    designationBn: 'যুগ্ম সচিব, ভূমি মন্ত্রণালয়',
    jurisdiction: 'National Land Administration System',
    jurisdictionBn: 'জাতীয় ভূমি ব্যবস্থাপনা ও নীতি সেল',
    isNidVerified: true,
    isBiometricVerified: true,
  },
  {
    id: 'usr-bank-01',
    nid: '1980*********0777',
    name: 'Nazmul Huda',
    nameBn: 'নাজমুল হুদা',
    role: 'BANK_OFFICER',
    email: 'credit.dhanmondi@sonalibank.com.bd',
    phone: '+880 1817-654321',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    designation: 'Senior Principal Officer (Credit & Mortgage)',
    designationBn: 'সিনিয়র প্রিন্সিপাল অফিসার (ঋণ ও বন্ধকী যাচাই)',
    jurisdiction: 'Sonali Bank PLC, Principal Branch',
    jurisdictionBn: 'সোনালী ব্যাংক পিএলসি, প্রধান কার্যালয়',
    isNidVerified: true,
    isBiometricVerified: true,
  },
  {
    id: 'usr-auditor-01',
    nid: '1976*********0888',
    name: 'Mahfuzur Rahman',
    nameBn: 'মাহফুজুর রহমান',
    role: 'AUDITOR',
    email: 'audit.dg@acc.org.bd',
    phone: '+880 1914-789012',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    designation: 'Director (System Audit & Vigilance)',
    designationBn: 'পরিচালক (ডিজিটাল সিস্টেম অডিট ও নজরদারি)',
    jurisdiction: 'National Land Audit & Anti-Corruption Cell',
    jurisdictionBn: 'জাতীয় ভূমি অডিট ও তথ্য নিরাপত্তা শাখা',
    isNidVerified: true,
    isBiometricVerified: true,
  }
];

export const mockParcels: LandParcel[] = [
  // 1. Scenario 1: Clean Verified Property (Dhanmondi, Dhaka)
  {
    landId: 'BD-DH-DHA-DHAN-12-104',
    division: 'Dhaka',
    divisionBn: 'ঢাকা',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    upazila: 'Dhanmondi',
    upazilaBn: 'ধানমন্ডি',
    mouza: 'Dhanmondi Residential Area',
    mouzaBn: 'ধানমন্ডি আবাসিক এলাকা',
    jlNo: '12',
    dagNo: '104',
    surveyType: 'BS_CITY',
    areaSatak: 7.5,
    areaKatha: 4.54,
    areaAcre: 0.075,
    classification: 'Bari',
    classificationBn: 'বাস্তু (আবাসিক ভিটা)',
    vulnerability: 'CLEAN',
    vulnerabilityBn: 'নিষ্কণ্টক ব্যক্তিগত মালিকানা',
    erosionStatus: 'STABLE',
    marketValueBDT: 65000000,
    govtTaxRatePerSatak: 120,
    coordinates: [23.7461, 90.3742],
    polygon: [
      [23.7465, 90.3738],
      [23.7466, 90.3746],
      [23.7457, 90.3747],
      [23.7456, 90.3739],
      [23.7465, 90.3738]
    ],
    boundaryPoints: [
      { id: 'BP-104-1', label: 'North-West (রোড ৬এ কর্নার)', lat: 23.7465, lng: 90.3738 },
      { id: 'BP-104-2', label: 'North-East (১০৫ দাগ সীমানা)', lat: 23.7466, lng: 90.3746 },
      { id: 'BP-104-3', label: 'South-East (লেকভিউ বাউন্ডারি)', lat: 23.7457, lng: 90.3747 },
      { id: 'BP-104-4', label: 'South-West (১০৩ দাগ সীমানা)', lat: 23.7456, lng: 90.3739 }
    ],
    currentOwners: [
      {
        nid: '1982*********0789',
        name: 'Abdul Karim Chowdhury',
        nameBn: 'আব্দুল করিম চৌধুরী',
        fatherHusbandName: 'Late Rafiqul Chowdhury',
        fatherHusbandNameBn: 'মৃত রফিকুল চৌধুরী',
        shareDecimal: 1.0,
        hisabShare: '১৬ আনা (পূর্ণ হিস্যা)',
        phone: '+880 1819-876543',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      }
    ],
    khatianNo: 'BS-8421',
    holdingNo: 'HLD-DHAN-904',
    status: 'VERIFIED',
    riskScore: 4,
    riskLevel: 'LOW',
    riskFactors: ['All land records clean', 'Tax paid up to current FY', 'No encumbrance or caveat'],
    riskFactorsBn: ['সকল খতিয়ান ও পর্চা হালনাগাদ', 'চলতি অর্থবছর পর্যন্ত ভূমি কর পরিশোধিত', 'কোনো ব্যাংক দায় বা মামলা নেই'],
    scenarioLabel: 'Scenario 1: Clean Verified Property (নিষ্কণ্টক যাচাইকৃত সম্পত্তি)',
    scenarioDescription: '100% clean title in Dhanmondi. All tax paid, single owner, zero mortgage, safe for conveyancing.'
  },

  // 2. Scenario 2: Ownership Conflict & Double Sale (Savar, Dhaka)
  {
    landId: 'BD-DH-DHA-SAV-104-5412',
    division: 'Dhaka',
    divisionBn: 'ঢাকা',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    upazila: 'Savar',
    upazilaBn: 'সাভার',
    mouza: 'Birulia',
    mouzaBn: 'বিরুলিয়া',
    jlNo: '104',
    dagNo: '5412',
    surveyType: 'RS',
    areaSatak: 18.0,
    areaKatha: 10.9,
    areaAcre: 0.18,
    classification: 'Commercial',
    classificationBn: 'বাণিজ্যিক / বাগান',
    vulnerability: 'CLEAN',
    vulnerabilityBn: 'ব্যক্তিগত স্বত্ব কিন্তু বিরোধপূর্ণ',
    erosionStatus: 'STABLE',
    marketValueBDT: 24000000,
    govtTaxRatePerSatak: 80,
    coordinates: [23.8524, 90.3187],
    polygon: [
      [23.8530, 90.3180],
      [23.8532, 90.3195],
      [23.8518, 90.3194],
      [23.8516, 90.3181],
      [23.8530, 90.3180]
    ],
    boundaryPoints: [
      { id: 'BP-5412-1', label: 'NW Pillar (North Road)', lat: 23.8530, lng: 90.3180, isEncroached: true },
      { id: 'BP-5412-2', label: 'NE Pillar (Plot 5413)', lat: 23.8532, lng: 90.3195 },
      { id: 'BP-5412-3', label: 'SE Pillar (Canal Boundary)', lat: 23.8518, lng: 90.3194 },
      { id: 'BP-5412-4', label: 'SW Pillar (Disputed Fence)', lat: 23.8516, lng: 90.3181, isEncroached: true }
    ],
    currentOwners: [
      {
        nid: '1977*********0999',
        name: 'Mokbul Hossain',
        nameBn: 'মকবুল হোসেন',
        fatherHusbandName: 'Late Azimuddin',
        fatherHusbandNameBn: 'মৃত আজিমুদ্দিন',
        shareDecimal: 0.5,
        hisabShare: '৮ আনা',
        phone: '+880 1711-888999'
      },
      {
        nid: '1981*********0333',
        name: 'Sirajul Islam (Disputed Seller)',
        nameBn: 'সিরাজুল ইসলাম (বিতর্কিত বিক্রেতা)',
        fatherHusbandName: 'Late Azimuddin',
        fatherHusbandNameBn: 'মৃত আজিমুদ্দিন',
        shareDecimal: 0.5,
        hisabShare: '৮ আনা',
        phone: '+880 1722-111222'
      }
    ],
    khatianNo: 'RS-3109',
    holdingNo: 'HLD-SAV-5120',
    status: 'DISPUTED',
    riskScore: 88,
    riskLevel: 'CRITICAL',
    riskFactors: [
      'Duplicate sale attempt detected: Deed #4912 executed without co-sharer consent',
      'Conflicting deed registered in alternative sub-registry',
      'NID mismatch on forged Power of Attorney'
    ],
    riskFactorsBn: [
      'দ্বৈত বিক্রয়ের অপচেষ্টা: সহ-শরিকের সম্মতি ব্যতীত দলিল নং ৪৯১২ প্রস্তুত',
      'সাভার ও মিরপুর সাব-রেজিস্ট্রিতে পৃথক দুটি সমান্তরাল দলিলের অসঙ্গতি',
      'ভুয়া আমমোক্তারনামায় (Power of Attorney) এনআইডি অমিল'
    ],
    scenarioLabel: 'Scenario 2: Ownership Conflict & Double Sale (জাল দলিল ও দ্বৈত মালিকানা দ্বন্দ্ব)',
    scenarioDescription: 'Critical fraud signal! Forged deed detected with conflicting NID and unauthorized sale without co-sharer consent.'
  },

  // 3. Scenario 3: Area Mismatch (Gulshan, Dhaka)
  {
    landId: 'BD-DH-DHA-GUL-08-302',
    division: 'Dhaka',
    divisionBn: 'ঢাকা',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    upazila: 'Gulshan',
    upazilaBn: 'গুলশান',
    mouza: 'Gulshan Model Town',
    mouzaBn: 'গুলশান মডেল টাউন',
    jlNo: '08',
    dagNo: '302',
    surveyType: 'BS_CITY',
    areaSatak: 8.5,
    areaKatha: 5.15,
    areaAcre: 0.085,
    classification: 'Commercial',
    classificationBn: 'বাণিজ্যিক প্লট',
    vulnerability: 'CLEAN',
    vulnerabilityBn: 'ব্যক্তিগত স্বত্ব',
    erosionStatus: 'STABLE',
    marketValueBDT: 120000000,
    govtTaxRatePerSatak: 150,
    coordinates: [23.7925, 90.4078],
    polygon: [
      [23.7930, 90.4072],
      [23.7931, 90.4084],
      [23.7920, 90.4085],
      [23.7919, 90.4073],
      [23.7930, 90.4072]
    ],
    boundaryPoints: [
      { id: 'BP-302-1', label: 'Avenue Road Corner', lat: 23.7930, lng: 90.4072 },
      { id: 'BP-302-2', label: 'Commercial Building North', lat: 23.7931, lng: 90.4084 },
      { id: 'BP-302-3', label: 'Rear Boundary 303', lat: 23.7920, lng: 90.4085 },
      { id: 'BP-302-4', label: 'Service Road West', lat: 23.7919, lng: 90.4073 }
    ],
    currentOwners: [
      {
        nid: '1968*********0444',
        name: 'Kamrul Ahsan',
        nameBn: 'কামরুল আহসান',
        fatherHusbandName: 'Late Nurul Ahsan',
        fatherHusbandNameBn: 'মৃত নুরুল আহসান',
        shareDecimal: 1.0,
        hisabShare: '১৬ আনা',
        phone: '+880 1711-445566'
      }
    ],
    khatianNo: 'BS-1204',
    holdingNo: 'HLD-GUL-302',
    status: 'VERIFIED',
    riskScore: 62,
    riskLevel: 'HIGH',
    riskFactors: [
      'Deed draft claims 15.0 Satak but registered BS Khatian area is only 8.5 Satak',
      'Over-transfer anomaly: 6.5 Satak excess land claimed beyond record',
      'Mandatory surveyor field boundary check required'
    ],
    riskFactorsBn: [
      'খসড়া দলিলে ১৫.০ শতক উল্লেখ থাকলেও বিএস খতিয়ানে প্রকৃত পরিমাণ মাত্র ৮.৫ শতক',
      'অতিরিক্ত হস্তান্তরের অসঙ্গতি: খতিয়ানের সীমার বাইরে ৬.৫ শতক বেশি দাবি',
      'বাধ্যতামূলক সরজমিনে সার্ভেয়ার দ্বারা পরিমাপ আবশ্যক'
    ],
    scenarioLabel: 'Scenario 3: Area Mismatch Anomaly (দলিলে জমির পরিমাণের গরমিল)',
    scenarioDescription: 'Deed draft claims 15.0 Satak but official BS Khatian record confirms only 8.5 Satak. AI OCR flags over-transfer error.'
  },

  // 4. Scenario 4: Mortgage Encumbered Property (Tejgaon, Dhaka)
  {
    landId: 'BD-DH-DHA-TEJ-14-880',
    division: 'Dhaka',
    divisionBn: 'ঢাকা',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    upazila: 'Tejgaon',
    upazilaBn: 'তেজগাঁও',
    mouza: 'Tejgaon Industrial Area',
    mouzaBn: 'তেজগাঁও শিল্প এলাকা',
    jlNo: '14',
    dagNo: '880',
    surveyType: 'BS_CITY',
    areaSatak: 25.0,
    areaKatha: 15.15,
    areaAcre: 0.25,
    classification: 'Industrial',
    classificationBn: 'শিল্প কারখানা / বাণিজ্যিক',
    vulnerability: 'CLEAN',
    vulnerabilityBn: 'ব্যাংক বন্ধকাবদ্ধ সম্পত্তি',
    erosionStatus: 'STABLE',
    marketValueBDT: 180000000,
    govtTaxRatePerSatak: 180,
    coordinates: [23.7645, 90.3980],
    polygon: [
      [23.7652, 90.3970],
      [23.7654, 90.3992],
      [23.7638, 90.3990],
      [23.7636, 90.3968],
      [23.7652, 90.3970]
    ],
    boundaryPoints: [
      { id: 'BP-880-1', label: 'Industrial Avenue Gate', lat: 23.7652, lng: 90.3970 },
      { id: 'BP-880-2', label: 'Warehouse East Corner', lat: 23.7654, lng: 90.3992 },
      { id: 'BP-880-3', label: 'Plot 881 Boundary', lat: 23.7638, lng: 90.3990 },
      { id: 'BP-880-4', label: 'Truck Terminal Boundary', lat: 23.7636, lng: 90.3968 }
    ],
    currentOwners: [
      {
        nid: '1970*********0888',
        name: 'Nasir Uddin Industrial Ltd.',
        nameBn: 'নাসির উদ্দিন ইন্ডাস্ট্রিয়াল লিঃ (ব্যবস্থাপনা পরিচালক)',
        fatherHusbandName: 'Late Nasir Uddin',
        fatherHusbandNameBn: 'মৃত নাসির উদ্দিন',
        shareDecimal: 1.0,
        hisabShare: '১৬ আনা',
        phone: '+880 1819-009988'
      }
    ],
    khatianNo: 'BS-9912',
    holdingNo: 'HLD-TEJ-880',
    status: 'MORTGAGED',
    riskScore: 74,
    riskLevel: 'HIGH',
    riskFactors: [
      'Active bank charge: Mortgaged to Sonali Bank PLC for BDT 45,000,000',
      'No Objection Certificate (NOC) / Redemption deed missing',
      'Transaction blocked under Banking Companies Act until charge release'
    ],
    riskFactorsBn: [
      'সক্রিয় ব্যাংক দায়বদ্ধতা: সোনালী ব্যাংক পিএলসি-তে ৪৫ কোটি টাকার ঋণ বন্ধক',
      'ব্যাংক অনাপত্তিপত্র (NOC) বা দায়মুক্তি দলিল ব্যতীত যেকোনো হস্তান্তর অবৈধ',
      'ব্যাংক কোম্পানি আইনের আওতায় সাব-রেজিস্ট্রার কর্তৃক রেজিস্ট্রি স্থগিত থাকবে'
    ],
    scenarioLabel: 'Scenario 4: Active Bank Mortgage / Encumbrance (ব্যাংক ঋণ বন্ধকী সম্পত্তি)',
    scenarioDescription: 'Heavy commercial mortgage active with Sonali Bank. Real-time CIB API lock prevents registration without Bank NOC.'
  },

  // 5. Scenario 5: Active Court Injunction / Title Suit (Sylhet Sadar)
  {
    landId: 'BD-SY-SYL-SAD-22-194',
    division: 'Sylhet',
    divisionBn: 'সিলেট',
    district: 'Sylhet',
    districtBn: 'সিলেট',
    upazila: 'Sylhet Sadar',
    upazilaBn: 'সিলেট সদর',
    mouza: 'Ambarkhana',
    mouzaBn: 'আম্বরখানা',
    jlNo: '22',
    dagNo: '194',
    surveyType: 'RS',
    areaSatak: 12.0,
    areaKatha: 7.27,
    areaAcre: 0.12,
    classification: 'Bari',
    classificationBn: 'বাস্তু (আবাসিক)',
    vulnerability: 'CLEAN',
    vulnerabilityBn: 'আদালতের নিষেধাজ্ঞা বলবৎ',
    erosionStatus: 'STABLE',
    marketValueBDT: 36000000,
    govtTaxRatePerSatak: 75,
    coordinates: [24.9045, 91.8720],
    polygon: [
      [24.9050, 91.8712],
      [24.9052, 91.8728],
      [24.9038, 91.8726],
      [24.9036, 91.8710],
      [24.9050, 91.8712]
    ],
    boundaryPoints: [
      { id: 'BP-194-1', label: 'Ambarkhana Point North', lat: 24.9050, lng: 91.8712 },
      { id: 'BP-194-2', label: 'Court Road Boundary', lat: 24.9052, lng: 91.8728 },
      { id: 'BP-194-3', label: 'Plot 195 Boundary', lat: 24.9038, lng: 91.8726 },
      { id: 'BP-194-4', label: 'Tea Estate Border', lat: 24.9036, lng: 91.8710 }
    ],
    currentOwners: [
      {
        nid: '1974*********0555',
        name: 'Syed Jalal Ahmed',
        nameBn: 'সৈয়দ জালাল আহমেদ',
        fatherHusbandName: 'Late Syed Badrul Ahmed',
        fatherHusbandNameBn: 'মৃত সৈয়দ বদরুল আহমেদ',
        shareDecimal: 1.0,
        hisabShare: '১৬ আনা',
        phone: '+880 1712-443322'
      }
    ],
    khatianNo: 'RS-4512',
    holdingNo: 'HLD-SYL-194',
    status: 'DISPUTED',
    riskScore: 92,
    riskLevel: 'CRITICAL',
    riskFactors: [
      'Active Civil Title Suit #142/2025 in Joint District Judge Court 1, Sylhet',
      'Interim injunction order issued under Order 39 Rule 1 CPC',
      'Transfer or mutation strictly prohibited pending final decree'
    ],
    riskFactorsBn: [
      '১ম যুগ্ম জেলা জজ আদালত, সিলেটে দেওয়ানি স্বত্ব মামলা নং ১৪২/২০২৫ চলমান',
      'দেওয়ানি কার্যবিধির ৩৯ আদেশ ১ বিধি অনুসারে অন্তর্বর্তীকালীন নিষেধাজ্ঞা বহাল',
      'চূড়ান্ত রায় ব্যতীত যেকোনো প্রকার হস্তান্তর ও নামজারি আইনত নিষিদ্ধ'
    ],
    scenarioLabel: 'Scenario 5: Court Title Suit & Injunction (দেওয়ানি স্বত্ব মামলা ও নিষেধাজ্ঞা)',
    scenarioDescription: 'Property under active civil injunction from Joint District Judge Court. Any conveyancing or mutation attempt is auto-locked.'
  },

  // 6. Scenario 6: Digital Statutory Caveat (Panchlaish, Chittagong)
  {
    landId: 'BD-CT-CTG-PAN-05-612',
    division: 'Chittagong',
    divisionBn: 'চট্টগ্রাম',
    district: 'Chittagong',
    districtBn: 'চট্টগ্রাম',
    upazila: 'Panchlaish',
    upazilaBn: 'পাঁচলাইশ',
    mouza: 'Nasirabad Housing Society',
    mouzaBn: 'নাসিরাবাদ হাউজিং সোসাইটি',
    jlNo: '05',
    dagNo: '612',
    surveyType: 'BS_CITY',
    areaSatak: 10.0,
    areaKatha: 6.06,
    areaAcre: 0.1,
    classification: 'Bari',
    classificationBn: 'বাস্তু (আবাসিক)',
    vulnerability: 'CLEAN',
    vulnerabilityBn: 'মালিক কর্তৃক কেভিয়েট সুরক্ষিত',
    erosionStatus: 'STABLE',
    marketValueBDT: 55000000,
    govtTaxRatePerSatak: 110,
    coordinates: [22.3654, 91.8215],
    polygon: [
      [22.3660, 91.8208],
      [22.3662, 91.8222],
      [22.3648, 91.8220],
      [22.3646, 91.8206],
      [22.3660, 91.8208]
    ],
    boundaryPoints: [
      { id: 'BP-612-1', label: 'Road 3 Corner', lat: 22.3660, lng: 91.8208 },
      { id: 'BP-612-2', label: 'Plot 613 Boundary', lat: 22.3662, lng: 91.8222 },
      { id: 'BP-612-3', label: 'Hill View Side', lat: 22.3648, lng: 91.8220 },
      { id: 'BP-612-4', label: 'Road 4 Border', lat: 22.3646, lng: 91.8206 }
    ],
    currentOwners: [
      {
        nid: '1985*********0777',
        name: 'Dr. Shahabuddin Mahmud (Diaspora in UK)',
        nameBn: 'ডাঃ শাহাবুদ্দিন মাহমুদ (যুক্তরাজ্য প্রবাসী)',
        fatherHusbandName: 'Late Master Mahmud',
        fatherHusbandNameBn: 'মৃত মাস্টার মাহমুদ',
        shareDecimal: 1.0,
        hisabShare: '১৬ আনা',
        phone: '+44 7911 123456'
      }
    ],
    khatianNo: 'BS-7814',
    holdingNo: 'HLD-CTG-612',
    status: 'LOCKED_CAVEAT',
    riskScore: 85,
    riskLevel: 'CRITICAL',
    riskFactors: [
      'Proactive Statutory Caveat #CAV-2026-904 filed by Non-Resident Bangladeshi (NRB) owner',
      'All deed registration, mutation, and survey demarcation locked',
      'Requires biometric multi-factor release by registered owner via Bangladesh High Commission'
    ],
    riskFactorsBn: [
      'প্রবাসী মালিক কর্তৃক সুরক্ষামূলক ডিজিটাল কেভিয়েট নং CAV-2026-904 জারি',
      'জমি সংক্রান্ত সকল দলিল রেজিস্ট্রি, নামজারি ও সীমানা নির্ধারণ সাময়িকভাবে লক',
      'বাংলাদেশ দূতাবাসের মাধ্যমে প্রবাসীর বায়োমেট্রিক আনলক ব্যতীত হস্তান্তর সম্ভব নয়'
    ],
    scenarioLabel: 'Scenario 6: Digital Statutory Caveat (ডিজিটাল সংবিধিবদ্ধ কেভিয়েট লক)',
    scenarioDescription: 'Expatriate owner in London locked parcel with statutory caveat to prevent fraudulent Power of Attorney while abroad.'
  },

  // 7. Scenario 7: Suspicious Rapid Flipping (Gazipur Sadar)
  {
    landId: 'BD-DH-GAZ-SAD-45-1205',
    division: 'Dhaka',
    divisionBn: 'ঢাকা',
    district: 'Gazipur',
    districtBn: 'গাজীপুর',
    upazila: 'Gazipur Sadar',
    upazilaBn: 'গাজীপুর সদর',
    mouza: 'Joydebpur',
    mouzaBn: 'জয়দেবপুর',
    jlNo: '45',
    dagNo: '1205',
    surveyType: 'RS',
    areaSatak: 30.0,
    areaKatha: 18.18,
    areaAcre: 0.3,
    classification: 'Commercial',
    classificationBn: 'বাণিজ্যিক / ডাঙ্গা',
    vulnerability: 'CLEAN',
    vulnerabilityBn: 'দ্রুত হস্তান্তর সন্দেহজনক',
    erosionStatus: 'STABLE',
    marketValueBDT: 42000000,
    govtTaxRatePerSatak: 70,
    coordinates: [23.9982, 90.4201],
    polygon: [
      [23.9990, 90.4190],
      [23.9992, 90.4215],
      [23.9974, 90.4212],
      [23.9972, 90.4188],
      [23.9990, 90.4190]
    ],
    boundaryPoints: [
      { id: 'BP-1205-1', label: 'Dhaka-Mymensingh Hwy Node', lat: 23.9990, lng: 90.4190 },
      { id: 'BP-1205-2', label: 'Factory Wall East', lat: 23.9992, lng: 90.4215 },
      { id: 'BP-1205-3', label: 'Plot 1206 Border', lat: 23.9974, lng: 90.4212 },
      { id: 'BP-1205-4', label: 'Feeder Road West', lat: 23.9972, lng: 90.4188 }
    ],
    currentOwners: [
      {
        nid: '1992*********0123',
        name: 'Apex Land Holdings Syndicate',
        nameBn: 'অ্যাপেক্স ল্যান্ড হোল্ডিংস সিন্ডিকেট',
        fatherHusbandName: 'Motiur Rahman',
        fatherHusbandNameBn: 'মতিউর রহমান',
        shareDecimal: 1.0,
        hisabShare: '১৬ আনা',
        phone: '+880 1718-990011'
      }
    ],
    khatianNo: 'RS-8841',
    holdingNo: 'HLD-GAZ-1205',
    status: 'VERIFIED',
    riskScore: 68,
    riskLevel: 'HIGH',
    riskFactors: [
      'Suspicious rapid title flipping: 4 conveyancing deeds executed within past 9 months',
      'Valuation spiked artificially by 340% between consecutive transactions',
      'Flagged for anti-money laundering and syndicate title investigation'
    ],
    riskFactorsBn: [
      'সন্দেহজনক দ্রুত হস্তান্তর: বিগত ৯ মাসে জমিটি ৪ বার হাতবদল হয়েছে',
      'পরপর দলিলের মাধ্যমে জমির মূল্য কৃত্রিমভাবে ৩৪০% বৃদ্ধি দেখানো হয়েছে',
      'মানিলন্ডারিং প্রতিরোধ সেল ও ভূমি গোয়েন্দা নজরদারিতে অন্তর্ভুক্ত'
    ],
    scenarioLabel: 'Scenario 7: Suspicious Rapid Flipping (সন্দেহজনক দ্রুত পুনঃহস্তান্তর)',
    scenarioDescription: 'AI Fraud Matrix flagged this parcel for 4 consecutive deed transfers in 9 months with suspicious price manipulation.'
  },

  // 8. Scenario 8: InSAR Riverine Erosion Zone - Sikasti (Haimchar, Chandpur)
  {
    landId: 'BD-BA-CHA-HIM-02-401',
    division: 'Chittagong',
    divisionBn: 'চট্টগ্রাম',
    district: 'Chandpur',
    districtBn: 'চাঁদপুর',
    upazila: 'Haimchar',
    upazilaBn: 'হাইমচর',
    mouza: 'Char Bhairabi',
    mouzaBn: 'চর ভৈরবী',
    jlNo: '02',
    dagNo: '401',
    surveyType: 'RS',
    areaSatak: 45.0,
    areaKatha: 27.27,
    areaAcre: 0.45,
    classification: 'Charland',
    classificationBn: 'নদী সিকস্তি / চরভূমি',
    vulnerability: 'RIVER_BED',
    vulnerabilityBn: 'মেঘনা নদীভাঙন কবলিত (সিকস্তি)',
    erosionStatus: 'ACTIVE_EROSION',
    marketValueBDT: 2500000,
    govtTaxRatePerSatak: 20,
    coordinates: [23.0645, 90.6410],
    polygon: [
      [23.0660, 90.6390],
      [23.0662, 90.6430],
      [23.0630, 90.6428],
      [23.0628, 90.6388],
      [23.0660, 90.6390]
    ],
    boundaryPoints: [
      { id: 'BP-401-1', label: 'North Submerged Node', lat: 23.0660, lng: 90.6390, isEncroached: true },
      { id: 'BP-401-2', label: 'River Channel East', lat: 23.0662, lng: 90.6430, isEncroached: true },
      { id: 'BP-401-3', label: 'Eroded Embankment South', lat: 23.0630, lng: 90.6428, isEncroached: true },
      { id: 'BP-401-4', label: 'Remaining Shoreline West', lat: 23.0628, lng: 90.6388 }
    ],
    currentOwners: [
      {
        nid: '1965*********0666',
        name: 'Md. Joynal Abedin',
        nameBn: 'মোঃ জয়নাল আবেদীন',
        fatherHusbandName: 'Late Eusuf Ali',
        fatherHusbandNameBn: 'মৃত ইউসুফ আলী',
        shareDecimal: 1.0,
        hisabShare: '১৬ আনা',
        phone: '+880 1815-334455'
      }
    ],
    khatianNo: 'RS-1092',
    holdingNo: 'HLD-CHA-401',
    status: 'DISPUTED',
    riskScore: 79,
    riskLevel: 'HIGH',
    riskFactors: [
      'InSAR Radar confirms 72% of plot is currently submerged under Meghna River channel',
      'Alluvion and Diluvion Regulation (Sikasti Act 1950) automatically applies',
      'Physical land delivery impossible; transaction prohibited without re-emergence survey'
    ],
    riskFactorsBn: [
      'ইনসার রাডার বিশ্লেষণ অনুযায়ী প্লটটির ৭২% অংশ বর্তমানে মেঘনা নদীর গর্ভে নিমজ্জিত',
      'পয়স্তি ও সিকস্তি বিধান (রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন) প্রযোজ্য',
      'সরজমিনে জমি হস্তান্তর অসম্ভব; চর জেগে ওঠার সরকারি জরিপ ব্যতীত বিক্রয় নিষিদ্ধ'
    ],
    scenarioLabel: 'Scenario 8: InSAR Riverine Erosion & Sikasti (নদীভাঙন কবলিত সিকস্তি জমি)',
    scenarioDescription: 'Satellite radar (InSAR) proves 72% of parcel is under water. Automatic Sikasti legal protection triggered.'
  },

  // 9. Scenario 9: AI Inheritance & Succession Case - Faraid (Paba, Rajshahi)
  {
    landId: 'BD-RJ-RAJ-PAD-18-720',
    division: 'Rajshahi',
    divisionBn: 'রাজশাহী',
    district: 'Rajshahi',
    districtBn: 'রাজশাহী',
    upazila: 'Paba',
    upazilaBn: 'পবা',
    mouza: 'Damkurahat',
    mouzaBn: 'দামকুড়াহাট',
    jlNo: '18',
    dagNo: '720',
    surveyType: 'RS',
    areaSatak: 40.0,
    areaKatha: 24.24,
    areaAcre: 0.4,
    classification: 'Nal',
    classificationBn: 'নাল (আমবাগান ও কৃষিজমি)',
    vulnerability: 'CLEAN',
    vulnerabilityBn: 'ওয়ারিশান বাটোয়ারা প্রক্রিয়াধীন',
    erosionStatus: 'STABLE',
    marketValueBDT: 16000000,
    govtTaxRatePerSatak: 35,
    coordinates: [24.4120, 88.5430],
    polygon: [
      [24.4130, 88.5415],
      [24.4132, 88.5448],
      [24.4110, 88.5445],
      [24.4108, 88.5412],
      [24.4130, 88.5415]
    ],
    boundaryPoints: [
      { id: 'BP-720-1', label: 'North Canal Road', lat: 24.4130, lng: 88.5415 },
      { id: 'BP-720-2', label: 'Mango Orchard East', lat: 24.4132, lng: 88.5448 },
      { id: 'BP-720-3', label: 'Plot 721 Border', lat: 24.4110, lng: 88.5445 },
      { id: 'BP-720-4', label: 'Village Path West', lat: 24.4108, lng: 88.5412 }
    ],
    currentOwners: [
      {
        nid: '1955*********0001',
        name: 'Late Alhaj Mozammel Haque (Deceased)',
        nameBn: 'মৃত আলহাজ্ব মোজাম্মেল হক (মূল রেকর্ডীয় মালিক)',
        fatherHusbandName: 'Late Munshi Mansur',
        fatherHusbandNameBn: 'মৃত মুন্সী মনসুর',
        shareDecimal: 1.0,
        hisabShare: '১৬ আনা (অবিভক্ত)',
        phone: 'N/A (Deceased)'
      }
    ],
    khatianNo: 'RS-503',
    holdingNo: 'HLD-RAJ-720',
    status: 'UNDER_MUTATION',
    riskScore: 28,
    riskLevel: 'MEDIUM',
    riskFactors: [
      'Original owner deceased; parcel requires inheritance Faraid partition mutation',
      'Legal heirs: 1 Wife, 2 Sons, 3 Daughters awaiting automated succession partition',
      'Partition Deed (বণ্টননামা দলিল) generation recommended prior to individual sale'
    ],
    riskFactorsBn: [
      'মূল রেকর্ডীয় মালিক মৃত্যুবরণ করেছেন; ওয়ারিশান সূত্রে ফরায়েজ নামজারি আবশ্যক',
      'উত্তরাধিকারী: ১ স্ত্রী, ২ পুত্র ও ৩ কন্যার মধ্যে হিস্যা বণ্টন প্রক্রিয়ার খসড়া প্রস্তুত',
      'ব্যক্তিগত হস্তান্তরের পূর্বে নিবন্ধিত বাটোয়ারা দলিল সম্পাদন করা সমীচীন'
    ],
    scenarioLabel: 'Scenario 9: Inheritance Succession & Faraid (ওয়ারিশান ফরায়েজ ও বাটোয়ারা বণ্টন)',
    scenarioDescription: 'Original owner deceased. AI Faraid Engine calculates exact Shariat Quranic shares for 1 wife, 2 sons, and 3 daughters.'
  },

  // 10. Scenario 10: Protected Government Khas Land (Rupsha, Khulna)
  {
    landId: 'BD-KH-KHL-RUM-30-55',
    division: 'Khulna',
    divisionBn: 'খুলনা',
    district: 'Khulna',
    districtBn: 'খুলনা',
    upazila: 'Rupsha',
    upazilaBn: 'রূপসা',
    mouza: 'Naihati',
    mouzaBn: 'নৈহাটী',
    jlNo: '30',
    dagNo: '55',
    surveyType: 'RS',
    areaSatak: 50.0,
    areaKatha: 30.3,
    areaAcre: 0.5,
    classification: 'Doba',
    classificationBn: 'সরকারি খাস জলাশয় / বিল',
    vulnerability: 'KHAS',
    vulnerabilityBn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার (১ নং খাস খতিয়ানভুক্ত)',
    erosionStatus: 'STABLE',
    marketValueBDT: 50000000,
    govtTaxRatePerSatak: 0,
    coordinates: [22.8120, 89.5890],
    polygon: [
      [22.8135, 89.5870],
      [22.8138, 89.5915],
      [22.8105, 89.5910],
      [22.8102, 89.5868],
      [22.8135, 89.5870]
    ],
    boundaryPoints: [
      { id: 'BP-55-1', label: 'Govt River Embankment NW', lat: 22.8135, lng: 89.5870 },
      { id: 'BP-55-2', label: 'Khas Canal Border NE', lat: 22.8138, lng: 89.5915 },
      { id: 'BP-55-3', label: 'Waterbody Siphon SE', lat: 22.8105, lng: 89.5910 },
      { id: 'BP-55-4', label: 'Govt Signboard SW', lat: 22.8102, lng: 89.5868 }
    ],
    currentOwners: [
      {
        nid: 'GOVT-BD-0000000000',
        name: 'Government of the People\'s Republic of Bangladesh',
        nameBn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার (জেলা প্রশাসক, খুলনা)',
        fatherHusbandName: 'Collector of Khulna District',
        fatherHusbandNameBn: 'কালেক্টর, খুলনা জেলা',
        shareDecimal: 1.0,
        hisabShare: '১৬ আনা (১ নং খাস খতিয়ান)',
        phone: '16122 (Govt Land Helpline)'
      }
    ],
    khatianNo: 'KHAS-01',
    holdingNo: 'HLD-KHAS-RUP-55',
    status: 'GOVT_KHAS',
    riskScore: 98,
    riskLevel: 'CRITICAL',
    riskFactors: [
      'STRICT STATE PROPERTY: Enrolled in 1 No. Khas Khatian (Government Ownership)',
      'Any private deed or transaction attempt is cognizable criminal fraud under Penal Code 420',
      'All conveyancing, mutation, and tax registration blocked automatically'
    ],
    riskFactorsBn: [
      'কঠোর সরকারি সম্পত্তি: রাষ্ট্রীয় ১ নং খাস খতিয়ানভুক্ত সংরক্ষিত জমি',
      'যেকোনো ব্যক্তিগত দলিলের অপচেষ্টা দণ্ডবিধি ৪২০ ধারায় শাস্তিযোগ্য অপরাধ',
      'সকল প্রকার রেজিস্ট্রি, নামজারি ও কর গ্রহণ সিস্টেম দ্বারা স্থায়ীভাবে ব্লক'
    ],
    scenarioLabel: 'Scenario 10: Protected Government Khas Land (১ নং খাস খতিয়ানভুক্ত সরকারি জমি)',
    scenarioDescription: '100% state-owned protected Khas land. AI Fraud engine blocks all private conveyancing attempts with legal seizure alert.'
  }
];

export const mockKhatians: KhatianRecord[] = [
  {
    khatianNo: 'BS-8421',
    landId: 'BD-DH-DHA-DHAN-12-104',
    mouza: 'Dhanmondi Residential Area',
    mouzaBn: 'ধানমন্ডি আবাসিক এলাকা',
    jlNo: '12',
    surveyType: 'BS_CITY',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    upazila: 'Dhanmondi',
    upazilaBn: 'ধানমন্ডি',
    holdingNo: 'HLD-DHAN-904',
    recordedDate: '2019-11-14',
    issuingAuthority: 'Assistant Commissioner (Land), Dhanmondi Circle',
    volumeNo: 'Vol-42',
    pageNo: 'Page-108',
    status: 'ACTIVE',
    owners: [
      {
        name: 'Abdul Karim Chowdhury',
        nameBn: 'আব্দুল করিম চৌধুরী',
        fatherName: 'Late Rafiqul Chowdhury',
        fatherNameBn: 'মৃত রফিকুল চৌধুরী',
        nid: '1982*********0789',
        shareRatio: 1.0,
        hisabNotation: '১৬ আনা',
        address: 'House #32, Road #6A, Dhanmondi, Dhaka'
      }
    ],
    dagList: [
      {
        dagNo: '104',
        classification: 'বাস্তু (ভিটা)',
        totalAreaSatak: 7.5,
        shareAreaSatak: 7.5
      }
    ]
  },
  {
    khatianNo: 'RS-3109',
    landId: 'BD-DH-DHA-SAV-104-5412',
    mouza: 'Birulia',
    mouzaBn: 'বিরুলিয়া',
    jlNo: '104',
    surveyType: 'RS',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    upazila: 'Savar',
    upazilaBn: 'সাভার',
    holdingNo: 'HLD-SAV-5120',
    recordedDate: '2008-04-19',
    issuingAuthority: 'Savar Upazila Settlement Office',
    volumeNo: 'Vol-18',
    pageNo: 'Page-340',
    status: 'DISPUTED',
    owners: [
      {
        name: 'Mokbul Hossain',
        nameBn: 'মকবুল হোসেন',
        fatherName: 'Late Azimuddin',
        fatherNameBn: 'মৃত আজিমুদ্দিন',
        nid: '1977*********0999',
        shareRatio: 0.5,
        hisabNotation: '৮ আনা',
        address: 'Birulia, Savar, Dhaka'
      },
      {
        name: 'Sirajul Islam',
        nameBn: 'সিরাজুল ইসলাম',
        fatherName: 'Late Azimuddin',
        fatherNameBn: 'মৃত আজিমুদ্দিন',
        nid: '1981*********0333',
        shareRatio: 0.5,
        hisabNotation: '৮ আনা',
        address: 'Birulia, Savar, Dhaka'
      }
    ],
    dagList: [
      {
        dagNo: '5412',
        classification: 'বাণিজ্যিক / বাগান',
        totalAreaSatak: 18.0,
        shareAreaSatak: 18.0
      }
    ]
  }
];

export const mockDeeds: DeedRecord[] = [
  {
    deedNo: 'DALIL-2022-7841',
    landId: 'BD-DH-DHA-DHAN-12-104',
    sroOffice: 'Dhanmondi Sub-Registry Office, Dhaka',
    sroOfficeBn: 'ধানমন্ডি সাব-রেজিস্ট্রি অফিস, ঢাকা',
    registrationDate: '2022-03-15',
    deedType: 'Saf-Kabala',
    deedTypeBn: 'সাফ-কবলা দলিল',
    considerationBDT: 55000000,
    sellers: [
      { name: 'Begum Laila Arjumand', nameBn: 'বেগম লায়লা আরজুমান্দ', nid: '1960*********0101' }
    ],
    buyers: [
      { name: 'Abdul Karim Chowdhury', nameBn: 'আব্দুল করিম চৌধুরী', nid: '1982*********0789' }
    ],
    areaTransferredSatak: 7.5,
    viaDeedChain: ['DALIL-1994-1120', 'DALIL-1972-0451'],
    isVerified: true,
    docUrl: 'https://example.gov.bd/deeds/dhanmondi-104.pdf',
    boundaries: {
      north: 'Road #6A, Dhanmondi',
      south: 'Plot #103 Boundary Wall',
      east: 'Plot #105 Lakeview Boundary',
      west: 'Road #7 Entrance'
    }
  },
  {
    deedNo: 'DALIL-FORGED-2026-4912',
    landId: 'BD-DH-DHA-SAV-104-5412',
    sroOffice: 'Mirpur Sub-Registry Office (Jurisdiction Conflict)',
    sroOfficeBn: 'মিরপুর সাব-রেজিস্ট্রি অফিস (এখতিয়ার বহির্ভূত)',
    registrationDate: '2026-02-10',
    deedType: 'Saf-Kabala',
    deedTypeBn: 'সাফ-কবলা দলিল (জালিয়াতি সন্দেহযুক্ত)',
    considerationBDT: 15000000,
    sellers: [
      { name: 'Sirajul Islam (Single Signer)', nameBn: 'সিরাজুল ইসলাম (একক স্বাক্ষরকারী)', nid: '1981*********0333' }
    ],
    buyers: [
      { name: 'Rashedul Huq Enterprise', nameBn: 'রাশেদুল হক এন্টারপ্রাইজ', nid: '1989*********0987' }
    ],
    areaTransferredSatak: 18.0,
    viaDeedChain: ['INVALID_VIA_DEED_REF'],
    isVerified: false,
    docUrl: 'https://example.gov.bd/deeds/savar-forged-4912.pdf',
    boundaries: {
      north: 'Road',
      south: 'Canal',
      east: 'Plot 5413',
      west: 'Disputed Area'
    }
  }
];

export const mockMutations: MutationRecord[] = [
  {
    caseNo: 'MUT-SAV-2026-8914',
    landId: 'BD-DH-DHA-SAV-104-5412',
    applicantName: 'Tariqul Islam',
    applicantNameBn: 'তারিকুল ইসলাম',
    applicantNid: '1995*********0456',
    previousKhatian: 'RS-3109',
    newKhatian: 'PENDING_APPROVAL',
    applicationDate: '2026-08-15',
    status: 'KANUNGO_REVIEW',
    ulaoNotes: 'Union Land Assistant Officer report filed: Co-sharer dispute noticed during field survey.',
    kanungoNotes: 'Kanungo inspection confirmed duplicate deed attempt #4912. Recommended hearing call.',
    acLandNotes: 'Hearing scheduled for next Tuesday. Notice issued to all co-sharers.',
    dakhilaNo: 'DAK-SAV-2026-0041',
    qrCodeRef: 'https://bhumiseba.gov.bd/verify/mutation/MUT-SAV-2026-8914'
  },
  {
    caseNo: 'MUT-DHAN-2022-104',
    landId: 'BD-DH-DHA-DHAN-12-104',
    applicantName: 'Abdul Karim Chowdhury',
    applicantNameBn: 'আব্দুল করিম চৌধুরী',
    applicantNid: '1982*********0789',
    previousKhatian: 'BS-4100',
    newKhatian: 'BS-8421',
    applicationDate: '2022-04-02',
    status: 'AC_LAND_APPROVED',
    ulaoNotes: 'Field inspection clean. Boundary verified with Road 6A layout.',
    kanungoNotes: 'Chain of title verified from CS to BS. No dispute found.',
    acLandNotes: 'Order passed. New Khatian BS-8421 created and published on national portal.',
    dakhilaNo: 'DAK-DHAN-2022-8421',
    approvedAt: '2022-04-18 11:30 AM',
    qrCodeRef: 'https://bhumiseba.gov.bd/verify/mutation/MUT-DHAN-2022-104'
  }
];

export const mockTaxes: TaxRecord[] = [
  {
    holdingNo: 'HLD-DHAN-904',
    landId: 'BD-DH-DHA-DHAN-12-104',
    fiscalYear: '2026-2027 (চলতি বছর)',
    arrearsBDT: 0,
    currentDemandBDT: 900,
    penaltyBDT: 0,
    totalDueBDT: 900,
    status: 'PAID',
    lastPaidDate: '2026-07-10',
    dakhilaNo: 'DAK-2026-DHAN-89104',
    dakhilaQr: 'https://bhumiseba.gov.bd/tax/dakhila/DAK-2026-DHAN-89104'
  },
  {
    holdingNo: 'HLD-SAV-5120',
    landId: 'BD-DH-DHA-SAV-104-5412',
    fiscalYear: '2025-2026 / 2026-2027',
    arrearsBDT: 2880,
    currentDemandBDT: 1440,
    penaltyBDT: 250,
    totalDueBDT: 4570,
    status: 'OVERDUE',
    dakhilaNo: 'PENDING_PAYMENT'
  }
];

export const mockEncumbrances: EncumbranceRecord[] = [
  {
    id: 'ENC-TEJ-2024-88',
    landId: 'BD-DH-DHA-TEJ-14-880',
    bankName: 'Sonali Bank PLC',
    bankBranch: 'Principal Branch, Motijheel, Dhaka',
    loanAccountNo: 'CC-LOAN-9841204',
    mortgageAmountBDT: 45000000,
    mortgageDate: '2024-06-20',
    status: 'ACTIVE_CHARGE',
    nocReference: 'AWAITING_REPAYMENT'
  }
];

export const mockCaveats: CaveatRecord[] = [
  {
    id: 'CAV-CTG-2026-904',
    landId: 'BD-CT-CTG-PAN-05-612',
    caveatorName: 'Dr. Shahabuddin Mahmud',
    caveatorNid: '1985*********0777',
    caveatType: 'STATUTORY_CITIZEN',
    reason: 'Non-resident owner proactive security freeze against unauthorized power of attorney attempts.',
    reasonBn: 'প্রবাসী মালিক কর্তৃক জমি সুরক্ষায় আগাম সংবিধিবদ্ধ সতর্কতামূলক নিষেধাজ্ঞা।',
    filedDate: '2026-01-15',
    expiryDate: '2027-01-15',
    status: 'ACTIVE',
    blockedActions: ['BLOCK_DEED_REGISTRATION', 'BLOCK_MUTATION_APPLICATION', 'BLOCK_SURVEY_DEMARCATION']
  }
];

export const mockDisputes: DisputeRecord[] = [
  {
    caseId: 'CASE-SYL-2025-142',
    landId: 'BD-SY-SYL-SAD-22-194',
    courtName: '1st Joint District Judge Court, Sylhet',
    courtNameBn: '১ম যুগ্ম জেলা জজ আদালত, সিলেট',
    caseType: 'Title Suit',
    caseTypeBn: 'দেওয়ানি স্বত্ব সাব্যস্ত মামলা',
    plaintiff: 'Syed Jalal Ahmed & Others',
    plaintiffBn: 'সৈয়দ জালাল আহমেদ ও অন্যান্য',
    defendant: 'Rashid Ali Enterprise',
    defendantBn: 'রশিদ আলী এন্টারপ্রাইজ',
    filingDate: '2025-05-12',
    lastHearingDate: '2026-07-22',
    nextHearingDate: '2026-09-18',
    status: 'INJUNCTION_GRANTED',
    legalSummary: 'Interim temporary injunction restraining both parties from changing physical possession or executing conveyancing deed.',
    legalSummaryBn: 'উভয় পক্ষের প্রতি ভূমির দখল পরিবর্তন বা কোনো প্রকার হস্তান্তর দলিল সম্পাদনে অন্তর্বর্তীকালীন নিষেধাজ্ঞা জারি করা হয়েছে।',
    hasActiveInjunction: true
  }
];

export const mockAlerts: PropertyAlert[] = [
  // Citizen
  {
    id: 'ALT-CIT-01',
    recipientNid: '1990*********0142',
    landId: 'BD-DH-DHA-SAV-104-5412',
    eventType: 'MUTATION_INITIATED',
    titleBn: 'আপনার ই-নামজারি আবেদন গৃহীত হয়েছে',
    titleEn: 'e-Mutation Petition Accepted',
    messageBn: 'আবেদন নং MUT-SAV-2026-902 সাভার সার্কেলে পর্যালোচনার জন্য গৃহীত হয়েছে।',
    messageEn: 'Petition MUT-SAV-2026-902 under review at Savar Upazila Land Office.',
    severity: 'INFO',
    timestamp: '১৫ মিনিট আগে',
    isRead: false
  },
  {
    id: 'ALT-CIT-02',
    recipientNid: '1990*********0142',
    landId: 'BD-DH-DHA-DHAN-12-104',
    eventType: 'TAX_DEMAND_GENERATED',
    titleBn: 'ভূমি উন্নয়ন কর দাখিলা তৈরি হয়েছে',
    titleEn: 'Land Dev Tax Dakhila Ready',
    messageBn: 'চলতি অর্থবছরের কর পরিশোধের কিউআর কোড সম্বলিত দাখিলা সংগ্রহ করুন।',
    messageEn: 'Your annual QR-verified tax dakhila is ready for download.',
    severity: 'INFO',
    timestamp: '২ ঘণ্টা আগে',
    isRead: false
  },
  // Land Owner
  {
    id: 'ALT-OWN-01',
    recipientNid: '1982*********0789',
    landId: 'BD-DH-DHA-DHAN-12-104',
    eventType: 'SEARCH_PERFORMED',
    titleBn: 'আপনার জমিতে তথ্য অনুসন্ধান হয়েছে',
    titleEn: 'Land Title Search Alert',
    messageBn: 'ধানমন্ডি ১০৪ দাগের জমির রেকর্ড পাবলিক পোর্টালে অনুসন্ধান করা হয়েছে।',
    messageEn: 'Public title record query performed on your Dhanmondi Plot #104.',
    severity: 'INFO',
    timestamp: '১০ মিনিট আগে',
    isRead: false
  },
  {
    id: 'ALT-OWN-02',
    recipientNid: '1982*********0789',
    landId: 'BD-DH-DHA-DHAN-12-104',
    eventType: 'CAVEAT_LODGED',
    titleBn: 'ডিজিটাল কেভিয়েট লক সক্রিয়',
    titleEn: 'Digital Caveat Lock Active',
    messageBn: 'আপনার জমিতে সংবিধিবদ্ধ সুরক্ষা লক সক্রিয় রয়েছে। কোনো হস্তান্তর সম্ভব নয়।',
    messageEn: 'Statutory caveat lock actively protecting your parcel from transfers.',
    severity: 'WARNING',
    timestamp: '১ দিন আগে',
    isRead: false
  },
  // Buyer
  {
    id: 'ALT-BUY-01',
    recipientNid: '1995*********0456',
    landId: 'BD-DH-DHA-DHAN-12-104',
    eventType: 'DEED_DRAFTED',
    titleBn: 'বায়না এসক্রো তহবিল নিশ্চিত হয়েছে',
    titleEn: 'Bayna Escrow Funds Secured',
    messageBn: 'বাংলাদেশ ব্যাংক গেটওয়েতে বায়না চুক্তির ১.২ কোটি টাকা সফলভাবে সংরক্ষিত।',
    messageEn: 'Conveyancing escrow balance of BDT 1.2 Cr locked safely for SRO registry.',
    severity: 'INFO',
    timestamp: '৩০ মিনিট আগে',
    isRead: false
  },
  // Lawyer
  {
    id: 'ALT-LAW-01',
    recipientNid: '1978*********0321',
    landId: 'BD-DH-DHA-SAV-104-5412',
    eventType: 'CAVEAT_LODGED',
    titleBn: 'আদালতের নিষেধাজ্ঞার নোটিশ জারি',
    titleEn: 'Court Injunction Notice Issued',
    messageBn: 'দেওয়ানি মোকদ্দমা নং ৪১২/২০২৫ এর প্রেক্ষিতে সাভার ৫৪১২ দাগে স্থিতাবস্থা বহাল।',
    messageEn: 'Injunction decree registered for Title Suit No 412/2025 on Savar Plot 5412.',
    severity: 'CRITICAL',
    timestamp: '১ ঘণ্টা আগে',
    isRead: false
  },
  // Surveyor
  {
    id: 'ALT-SUR-01',
    recipientNid: '1985*********0654',
    landId: 'BD-BA-CHA-HIM-02-401',
    eventType: 'SEARCH_PERFORMED',
    titleBn: 'ইনসার রাডার নদীভাঙন সতর্কতা',
    titleEn: 'InSAR Radar River Erosion Flag',
    messageBn: 'মেঘনা নদী অববাহিকায় ১২.৬ শতক জমি সিকস্তি শ্রেণিকরণের নির্দেশনা প্রাপ্তি।',
    messageEn: 'Sentinel-1 satellite radar displacement threshold breached in Meghna basin.',
    severity: 'WARNING',
    timestamp: '৩ ঘণ্টা আগে',
    isRead: false
  },
  // SRO Officer
  {
    id: 'ALT-SRO-01',
    recipientNid: '1975*********0987',
    landId: 'BD-DH-DHA-DHAN-12-104',
    eventType: 'DEED_DRAFTED',
    titleBn: 'নতুন সাফ-কবলা দলিল সাবমিশন',
    titleEn: 'New Saf-Kabala Deed Submitted',
    messageBn: 'দলিল নং ৪৮২১/২০২৬ এর স্ট্যাম্প শুল্ক যাচাই ও বায়োমেট্রিক কিউ সম্পন্ন।',
    messageEn: 'Stamp duty e-Challan verified for Deed 4821/2026. Ready for biometric seal.',
    severity: 'INFO',
    timestamp: '৪৫ মিনিট আগে',
    isRead: false
  },
  // AC Land
  {
    id: 'ALT-ACL-01',
    recipientNid: '1987*********0112',
    landId: 'BD-DH-DHA-SAV-104-5412',
    eventType: 'MUTATION_INITIATED',
    titleBn: 'এসআরও প্রেরিত অটো-ডকেট মুলতবি',
    titleEn: 'SRO Synced Docket Held Under Caveat',
    messageBn: 'সাভার ৫৪১২ দাগে দেওয়ানি আদালতের নিষেধাজ্ঞা থাকায় নামজারি স্থগিতাদেশ কার্যকর।',
    messageEn: 'SRO auto-docket restrained under Section 144 CrPC court injunction.',
    severity: 'CRITICAL',
    timestamp: '৫ মিনিট আগে',
    isRead: false
  },
  // Gov Admin
  {
    id: 'ALT-ADM-01',
    recipientNid: '1972*********0555',
    landId: 'BD-DH-DHA-DHAN-12-104',
    eventType: 'MUTATION_INITIATED',
    titleBn: 'জাতীয় রাজস্ব আহরণ লক্ষ্যমাত্রা অর্জিত',
    titleEn: 'National Land Revenue Target Reached',
    messageBn: 'আজকের দিনে সারাদেশে ৪,১৮০টি নামজারি ও দলিল নিবন্ধনের মাধ্যমে শতভাগ রাজস্ব আদায়।',
    messageEn: 'National collection crossed daily target with 4,180 real-time syncs.',
    severity: 'INFO',
    timestamp: '৪ ঘণ্টা আগে',
    isRead: false
  },
  // Bank Officer
  {
    id: 'ALT-BNK-01',
    recipientNid: '1980*********0777',
    landId: 'BD-DH-DHA-DHAN-12-104',
    eventType: 'MORTGAGE_CREATED',
    titleBn: 'সোনালী ব্যাংক বন্ধকী চার্জ নিশ্চিত',
    titleEn: 'Sonali Bank Mortgage Charge Confirmed',
    messageBn: 'ধানমন্ডি ১০৪ দাগে ১.৫ কোটি টাকার লিয়েন চার্জ জাতীয় ভূমি পোর্টালে লক করা হয়েছে।',
    messageEn: 'Collateral lien registered successfully on Land ID BD-DH-DHA-DHAN-12-104.',
    severity: 'INFO',
    timestamp: '৬ ঘণ্টা আগে',
    isRead: false
  },
  // Auditor
  {
    id: 'ALT-AUD-01',
    recipientNid: '1976*********0888',
    landId: 'BD-DH-DHA-DHAN-12-104',
    eventType: 'SEARCH_PERFORMED',
    titleBn: 'ক্রিপ্টোগ্রাফিক ব্লকচেইন অডিট সম্পন্ন',
    titleEn: 'Cryptographic Ledger Re-verified',
    messageBn: 'বিগত ২৪ ঘণ্টার ৩,৮৪২টি ট্রানজেকশনের হ্যাশ চেইনিং ১০০% অক্ষত ও অটুট রয়েছে।',
    messageEn: 'Cryptographic Proof of Authority verified 3,842 blocks with zero tampering.',
    severity: 'INFO',
    timestamp: '২০ মিনিট আগে',
    isRead: false
  }
];

export const mockInSARData: InSARData[] = [
  {
    landId: 'BD-BA-CHA-HIM-02-401',
    mouza: 'Char Bhairabi, Haimchar, Chandpur',
    river: 'Meghna River (মেঘনা নদী)',
    erosionRateMetersYear: 14.5,
    submergedPercentage: 72,
    status: 'ACTIVE_EROSION',
    historicalTimeline: [
      { year: 2021, landAreaSatak: 45.0, waterLineOffsetMeters: 180, riskRating: 'STABLE' },
      { year: 2022, landAreaSatak: 42.5, waterLineOffsetMeters: 120, riskRating: 'LOW_EROSION' },
      { year: 2023, landAreaSatak: 35.0, waterLineOffsetMeters: 65, riskRating: 'MEDIUM_EROSION' },
      { year: 2024, landAreaSatak: 22.0, waterLineOffsetMeters: 20, riskRating: 'HIGH_EROSION' },
      { year: 2025, landAreaSatak: 15.5, waterLineOffsetMeters: -15, riskRating: 'PARTIALLY_SUBMERGED' },
      { year: 2026, landAreaSatak: 12.6, waterLineOffsetMeters: -45, riskRating: 'CRITICAL_SIKASTI' }
    ]
  }
];
