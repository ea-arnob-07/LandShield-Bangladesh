import CryptoJS from 'crypto-js';
import { AuditBlock, UserRole } from '../types';

export class AuditLedgerService {
  private static instance: AuditLedgerService;
  private chain: AuditBlock[] = [];

  private constructor() {
    this.initializeGenesisBlock();
  }

  public static getInstance(): AuditLedgerService {
    if (!AuditLedgerService.instance) {
      AuditLedgerService.instance = new AuditLedgerService();
    }
    return AuditLedgerService.instance;
  }

  private calculateHash(
    index: number,
    prevHash: string,
    timestamp: string,
    userId: string,
    action: string,
    targetLandId: string,
    details: string,
    nonce: number
  ): string {
    const rawData = `${index}-${prevHash}-${timestamp}-${userId}-${action}-${targetLandId}-${details}-${nonce}`;
    return CryptoJS.SHA256(rawData).toString();
  }

  private initializeGenesisBlock(): void {
    const timestamp = '2026-01-01T00:00:00.000Z';
    const genesisHash = this.calculateHash(
      0,
      '0000000000000000000000000000000000000000000000000000000000000000',
      timestamp,
      'SYS-GENESIS',
      'GENESIS_CREATION',
      'BD-GENESIS-LAND',
      'BhumiSeba Unified Platform Cryptographic Audit Genesis Anchor',
      0
    );

    this.chain = [
      {
        index: 0,
        timestamp,
        userId: 'SYS-ROOT',
        userRole: 'GOV_ADMIN',
        userName: 'National Land Authority Genesis Core',
        action: 'GENESIS_ANCHOR',
        actionBn: 'জাতীয় ক্রিপ্টোগ্রাফিক জেনেসিস ব্লক তৈরি',
        targetLandId: 'BD-NATIONAL-ROOT',
        details: 'Initial root anchor established for Bangladesh Land Records Ledger',
        detailsBn: 'বাংলাদেশ ডিজিটাল ভূমিসেবা জাতীয় অডিট লেজারের ভিত্তি নোড স্থাপন',
        prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
        currentHash: genesisHash,
        nonce: 1042
      }
    ];

    // Seed realistic audit entries
    this.addAuditEntry(
      'usr-owner-01',
      'OWNER',
      'Abdul Karim Chowdhury',
      'VERIFIED_KHATIAN_GENERATED',
      'স্মার্ট বিএস খতিয়ান ডিজিটাল অনুস্বাক্ষর',
      'BD-DH-DHA-DHAN-12-104',
      'Digital Porcha BS-8421 generated with biometric signing & QR stamp',
      'ডিজিটাল পর্চা বিএস-৮৪২১ কিউআর কোডসহ সফলভাবে জারি করা হয়েছে'
    );

    this.addAuditEntry(
      'usr-lawyer-01',
      'LAWYER',
      'Advocate Aminul Haque',
      'TITLE_VETTING_EXECUTED',
      'আইনগত স্বত্ব যাচাই ও খতিয়ান শৃঙ্খল পরীক্ষা',
      'BD-DH-DHA-DHAN-12-104',
      'CS to BS 4-tier title chain verified. 100% clean title vetted.',
      'সিএস থেকে বিএস পর্যন্ত ৪ ধাপের ভায়া দলিল ও রেকর্ড যাচাই সম্পন্ন।'
    );

    this.addAuditEntry(
      'usr-owner-01',
      'OWNER',
      'Dr. Shahabuddin Mahmud',
      'STATUTORY_CAVEAT_APPLIED',
      'প্রবাসী ডিজিটাল সংবিধিবদ্ধ কেভিয়েট লক',
      'BD-CT-CTG-PAN-05-612',
      'Statutory caveat CAV-CTG-2026-904 lodged blocking registration and mutation',
      'অননুমোদিত আমমোক্তারনামা প্রতিরোধে প্রবাসী মালিক কর্তৃক জমি লক করা হয়েছে'
    );
  }

  public addAuditEntry(
    userId: string,
    userRole: UserRole,
    userName: string,
    action: string,
    actionBn: string,
    targetLandId: string,
    details: string,
    detailsBn: string
  ): AuditBlock {
    const prevBlock = this.chain[this.chain.length - 1];
    const index = this.chain.length;
    const timestamp = new Date().toISOString();
    const nonce = Math.floor(Math.random() * 90000) + 10000;

    const currentHash = this.calculateHash(
      index,
      prevBlock.currentHash,
      timestamp,
      userId,
      action,
      targetLandId,
      details,
      nonce
    );

    const newBlock: AuditBlock = {
      index,
      timestamp,
      userId,
      userRole,
      userName,
      action,
      actionBn,
      targetLandId,
      details,
      detailsBn,
      prevHash: prevBlock.currentHash,
      currentHash,
      nonce
    };

    this.chain.push(newBlock);
    return newBlock;
  }

  public getChain(): AuditBlock[] {
    return [...this.chain];
  }

  public verifyChainIntegrity(): { isValid: boolean; brokenBlockIndex?: number; message: string } {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      // Verify previous hash pointer
      if (current.prevHash !== previous.currentHash) {
        return {
          isValid: false,
          brokenBlockIndex: i,
          message: `Hash link broken between block #${previous.index} and #${current.index}`
        };
      }

      // Recompute hash
      const recomputedHash = this.calculateHash(
        current.index,
        current.prevHash,
        current.timestamp,
        current.userId,
        current.action,
        current.targetLandId,
        current.details,
        current.nonce
      );

      if (recomputedHash !== current.currentHash) {
        return {
          isValid: false,
          brokenBlockIndex: i,
          message: `Tamper detected in Block #${current.index}! Stored hash does not match content hash.`
        };
      }
    }

    return {
      isValid: true,
      message: 'Cryptographic SHA-256 Ledger is fully valid & tamper-evident.'
    };
  }
}

export const auditLedger = AuditLedgerService.getInstance();
