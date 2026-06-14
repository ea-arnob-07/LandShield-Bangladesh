import { LandParcel, EncumbranceRecord, CaveatRecord, DisputeRecord } from '../types';

export interface RiskAnalysisReport {
  score: number; // 0 - 100
  grade: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  gradeBn: string;
  isConveyancingAllowed: boolean;
  factors: {
    category: string;
    categoryBn: string;
    points: number;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    titleEn: string;
    titleBn: string;
    descriptionEn: string;
    descriptionBn: string;
    remedyEn: string;
    remedyBn: string;
  }[];
  summaryEn: string;
  summaryBn: string;
}

export class FraudDetectionEngine {
  public static evaluateRisk(
    parcel: LandParcel,
    encumbrances: EncumbranceRecord[] = [],
    caveats: CaveatRecord[] = [],
    disputes: DisputeRecord[] = []
  ): RiskAnalysisReport {
    let score = 0;
    const factors: RiskAnalysisReport['factors'] = [];

    // 1. Khas / Vested / Waqf / State Property Check (+45)
    if (parcel.vulnerability === 'KHAS' || parcel.vulnerability === 'VESTED_PROPERTY' || parcel.vulnerability === 'RIVER_BED') {
      score += 45;
      factors.push({
        category: 'GOVT_PROTECTED_LAND',
        categoryBn: 'সংরক্ষিত সরকারি খাস বা অর্পিত সম্পত্তি',
        points: 45,
        severity: 'CRITICAL',
        titleEn: 'State Protected / Khas Land Restraint',
        titleBn: '১ নং খাস বা সরকারি অর্পিত সম্পত্তি সংক্রান্ত সতর্কতা',
        descriptionEn: 'The land is cataloged as State Khas or Waterbody riverbed. Private conveyance is legally void.',
        descriptionBn: 'জমিটি সরকারি ১ নং খাস খতিয়ান বা নদীগর্ভভুক্ত। কোনো প্রকার ব্যক্তিগত সাব-কবলা দলিল সম্পাদন অবৈধ।',
        remedyEn: 'Conveyance strictly prohibited under SATA 1950. Contact District Collector.',
        remedyBn: 'হস্তান্তর আইনত নিষিদ্ধ। প্রয়োজনে জেলা প্রশাসক কার্যালয়ে যোগাযোগ করুন।'
      });
    }

    // 2. Statutory Caveat Lock (+35)
    const activeCaveats = caveats.filter(c => c.landId === parcel.landId && c.status === 'ACTIVE');
    if (activeCaveats.length > 0 || parcel.status === 'LOCKED_CAVEAT') {
      score += 35;
      factors.push({
        category: 'STATUTORY_CAVEAT',
        categoryBn: 'ডিজিটাল সংবিধিবদ্ধ কেভিয়েট লক',
        points: 35,
        severity: 'CRITICAL',
        titleEn: 'Active Owner Statutory Caveat',
        titleBn: 'জমির মালিকের সক্রিয় ডিজিটাল কেভিয়েট',
        descriptionEn: 'Landowner or court has lodged an active statutory caveat blocking transactions.',
        descriptionBn: 'জমির মূল মালিক বা কোর্ট কর্তৃক স্বত্ব সুরক্ষার্থে ডিজিটাল কেভিয়েট বলবৎ রয়েছে।',
        remedyEn: 'Owner must perform biometric 2FA release before registration proceeds.',
        remedyBn: 'রেজিস্ট্রি প্রক্রিয়ার পূর্বে মূল মালিককে বায়োমেট্রিক আনলক করতে হবে।'
      });
    }

    // 3. Active Court Injunction & Civil Suits (+30)
    const activeDisputes = disputes.filter(d => d.landId === parcel.landId && (d.hasActiveInjunction || d.status === 'INJUNCTION_GRANTED'));
    if (activeDisputes.length > 0 || parcel.status === 'DISPUTED') {
      score += 30;
      factors.push({
        category: 'JUDICIAL_INJUNCTION',
        categoryBn: 'দেওয়ানি আদালতের নিষেধাজ্ঞা',
        points: 30,
        severity: 'CRITICAL',
        titleEn: 'Active Judicial Injunction / Title Suit',
        titleBn: 'চলমান দেওয়ানি মামলা ও অস্থায়ী নিষেধাজ্ঞা',
        descriptionEn: 'Court injunction in place under CPC Order 39. Unauthorized transfer violates court order.',
        descriptionBn: 'আদালতের নিষেধাজ্ঞার কারণে এই জমির স্বত্ব বা দখল পরিবর্তন আইনত স্থগিত।',
        remedyEn: 'Await final court decree or obtain clearance order from learned trial court.',
        remedyBn: 'আদালতের চূড়ান্ত ডিক্রি বা স্থগিতাদেশ প্রত্যাহার আদেশ দাখিল আবশ্যক।'
      });
    }

    // 4. Bank Mortgage / Encumbrance (+25)
    const activeEncumbrances = encumbrances.filter(e => e.landId === parcel.landId && e.status === 'ACTIVE_CHARGE');
    if (activeEncumbrances.length > 0 || parcel.status === 'MORTGAGED') {
      score += 25;
      factors.push({
        category: 'BANK_MORTGAGE',
        categoryBn: 'ব্যাংক বন্ধক ও দায়বদ্ধতা',
        points: 25,
        severity: 'HIGH',
        titleEn: 'Unreleased Commercial Bank Charge',
        titleBn: 'তফসিলি ব্যাংকে সক্রিয় ঋণ বন্ধকী দায়',
        descriptionEn: 'Parcel is mortgaged to financial institution. CIB real-time lock active.',
        descriptionBn: 'জমিটি আর্থিক প্রতিষ্ঠানে দায়বদ্ধ। ব্যাংক অনাপত্তিপত্র ব্যতীত হস্তান্তর সম্ভব নয়।',
        remedyEn: 'Obtain certified Bank Redemption Deed (দায়মুক্তি দলিল) and CIB clearance.',
        remedyBn: 'ব্যাংক থেকে ঋণ পরিশোধের দায়মুক্তি দলিল ও সিআইবি ক্লিয়ারেন্স নিন।'
      });
    }

    // 5. InSAR Riverine Active Erosion / Sikasti (+25)
    if (parcel.erosionStatus === 'ACTIVE_EROSION') {
      score += 25;
      factors.push({
        category: 'RIVERINE_EROSION',
        categoryBn: 'ইনসার রাডার নদীভাঙন (সিকস্তি)',
        points: 25,
        severity: 'HIGH',
        titleEn: 'Physical Land Submergence / Sikasti Risk',
        titleBn: 'নদীগর্ভে ভূমি বিলীন ও সিকস্তি ঝুঁকি',
        descriptionEn: 'Satellite radar confirms majority of plot is submerged by riverbank erosion.',
        descriptionBn: 'উপগ্রহ রাডার চিত্রে জমির অধিকাংশ অংশ নদীর পানিতে নিমজ্জিত পাওয়া গেছে।',
        remedyEn: 'Verify physical land existence and claim Sikasti land tax abatement.',
        remedyBn: 'সরজমিনে জমি অস্তিত্ব পরীক্ষা করুন এবং সিকস্তি কর মওকুফ নিন।'
      });
    }

    // 6. Inherited Land / Under Mutation (+15)
    if (parcel.status === 'UNDER_MUTATION') {
      score += 15;
      factors.push({
        category: 'MUTATION_PENDING',
        categoryBn: 'নামজারি ও বাটোয়ারা প্রক্রিয়াধীন',
        points: 15,
        severity: 'MEDIUM',
        titleEn: 'Succession Partition / e-Mutation Pending',
        titleBn: 'উত্তরাধিকার সূত্রে বণ্টন ও নামজারি অনিষ্পন্ন',
        descriptionEn: 'Khatian is undergoing inheritance partition. Co-sharer shares should be finalized.',
        descriptionBn: 'ওয়ারিশান সূত্রে নামজারি চলমান রয়েছে। সহ-শরিকদের সাথে বাটোয়ারা স্পষ্ট করা প্রয়োজন।',
        remedyEn: 'Complete AI Faraid inheritance partition deed prior to registration.',
        remedyBn: 'রেজিস্ট্রির পূর্বে ওয়ারিশান বণ্টননামা দলিল সম্পাদন নিশ্চিত করুন।'
      });
    }

    // Baseline clean score check
    if (factors.length === 0) {
      score = 4; // Baseline clean score
    }

    // Clamp score 0 - 100
    score = Math.min(100, Math.max(0, score));

    let grade: RiskAnalysisReport['grade'] = 'LOW';
    let gradeBn = 'নিরাপদ (সবুজ)';
    let isConveyancingAllowed = true;

    if (score >= 70) {
      grade = 'CRITICAL';
      gradeBn = 'উচ্চ ঝুঁকিপূর্ণ ও স্থগিত (লাল)';
      isConveyancingAllowed = false;
    } else if (score >= 40) {
      grade = 'HIGH';
      gradeBn = 'সতর্কতা ও আইনগত যাচাই প্রয়োজন (হলুদ-লাল)';
      isConveyancingAllowed = false;
    } else if (score >= 20) {
      grade = 'MEDIUM';
      gradeBn = 'পর্যবেক্ষণ প্রয়োজন (হলুদ)';
      isConveyancingAllowed = true;
    }

    return {
      score,
      grade,
      gradeBn,
      isConveyancingAllowed,
      factors,
      summaryEn: isConveyancingAllowed
        ? 'Risk evaluation indicates safe parameters. Standard title conveyancing may proceed.'
        : 'High-risk anomalies detected. SRO and AC Land systems have locked automated conveyancing.',
      summaryBn: isConveyancingAllowed
        ? 'ঝুঁকি মূল্যায়ন সন্তোষজনক। প্রচলিত নিয়মে দলিল সম্পাদন ও নামজারি সম্পন্ন করা যাবে।'
        : 'গুরুতর ঝুঁকি ও অসঙ্গতি চিহ্নিত হয়েছে। সাব-রেজিস্ট্রার ও সহকারী কমিশনার (ভূমি) স্তরে লেনদেন স্থগিত রয়েছে।'
    };
  }
}
