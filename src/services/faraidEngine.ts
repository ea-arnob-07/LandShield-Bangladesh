import { HeirInput, FaraidShare } from '../types';

export class FaraidInheritanceEngine {
  public static calculateFaraid(
    deceasedGender: 'MALE' | 'FEMALE',
    totalLandSatak: number,
    heirs: HeirInput[]
  ): {
    shares: FaraidShare[];
    totalDistributedSatak: number;
    summaryBn: string;
    summaryEn: string;
    partitionPlots: { heirName: string; satak: number; plotLabel: string; color: string }[];
  } {
    const wifeHeir = heirs.find(h => h.relation === 'WIFE');
    const husbandHeir = heirs.find(h => h.relation === 'HUSBAND');
    const sonHeir = heirs.find(h => h.relation === 'SON');
    const daughterHeir = heirs.find(h => h.relation === 'DAUGHTER');
    const fatherHeir = heirs.find(h => h.relation === 'FATHER');
    const motherHeir = heirs.find(h => h.relation === 'MOTHER');

    const numWives = wifeHeir ? wifeHeir.count : 0;
    const numHusbands = husbandHeir ? husbandHeir.count : 0;
    const numSons = sonHeir ? sonHeir.count : 0;
    const numDaughters = daughterHeir ? daughterHeir.count : 0;
    const hasChildren = (numSons + numDaughters) > 0;
    const hasFather = fatherHeir && fatherHeir.count > 0;
    const hasMother = motherHeir && motherHeir.count > 0;

    let fixedShareTotal = 0;
    const shares: FaraidShare[] = [];
    const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#84cc16'];

    // 1. Spousal Share (Quranic Sharer / জাবিল ফুরুজ)
    if (deceasedGender === 'MALE' && numWives > 0) {
      const wifeShareFraction = hasChildren ? (1 / 8) : (1 / 4);
      const fractionStr = hasChildren ? '১/৮' : '১/৪';
      fixedShareTotal += wifeShareFraction;

      const totalWifeSatak = totalLandSatak * wifeShareFraction;
      const perWifeSatak = totalWifeSatak / numWives;

      shares.push({
        relation: 'Wife / Wives',
        relationBn: numWives > 1 ? `স্ত্রীগণ (${numWives} জন)` : 'স্ত্রী (১ জন)',
        count: numWives,
        shareFraction: fractionStr,
        shareDecimal: wifeShareFraction,
        satakPerPerson: parseFloat(perWifeSatak.toFixed(3)),
        totalSatak: parseFloat(totalWifeSatak.toFixed(3)),
        hisabNotation: FaraidInheritanceEngine.decimalToBengaliHisab(wifeShareFraction),
        color: colors[0]
      });
    } else if (deceasedGender === 'FEMALE' && numHusbands > 0) {
      const husbandShareFraction = hasChildren ? (1 / 4) : (1 / 2);
      const fractionStr = hasChildren ? '১/৪' : '১/২';
      fixedShareTotal += husbandShareFraction;

      const totalHusbandSatak = totalLandSatak * husbandShareFraction;

      shares.push({
        relation: 'Husband',
        relationBn: 'স্বামী (১ জন)',
        count: 1,
        shareFraction: fractionStr,
        shareDecimal: husbandShareFraction,
        satakPerPerson: parseFloat(totalHusbandSatak.toFixed(3)),
        totalSatak: parseFloat(totalHusbandSatak.toFixed(3)),
        hisabNotation: FaraidInheritanceEngine.decimalToBengaliHisab(husbandShareFraction),
        color: colors[0]
      });
    }

    // 2. Mother's Share
    if (hasMother) {
      const motherFraction = hasChildren ? (1 / 6) : (1 / 3);
      const fractionStr = hasChildren ? '১/৬' : '১/৩';
      fixedShareTotal += motherFraction;

      const totalMotherSatak = totalLandSatak * motherFraction;

      shares.push({
        relation: 'Mother',
        relationBn: 'মাতা',
        count: 1,
        shareFraction: fractionStr,
        shareDecimal: motherFraction,
        satakPerPerson: parseFloat(totalMotherSatak.toFixed(3)),
        totalSatak: parseFloat(totalMotherSatak.toFixed(3)),
        hisabNotation: FaraidInheritanceEngine.decimalToBengaliHisab(motherFraction),
        color: colors[1]
      });
    }

    // 3. Father's Share
    if (hasFather) {
      const fatherFraction = hasChildren ? (1 / 6) : (1 / 6); // Primary fixed share
      const fractionStr = '১/৬';
      fixedShareTotal += fatherFraction;

      const totalFatherSatak = totalLandSatak * fatherFraction;

      shares.push({
        relation: 'Father',
        relationBn: 'পিতা',
        count: 1,
        shareFraction: fractionStr,
        shareDecimal: fatherFraction,
        satakPerPerson: parseFloat(totalFatherSatak.toFixed(3)),
        totalSatak: parseFloat(totalFatherSatak.toFixed(3)),
        hisabNotation: FaraidInheritanceEngine.decimalToBengaliHisab(fatherFraction),
        color: colors[2]
      });
    }

    // 4. Residuary Heirs (Asabah / আসাবা): Sons & Daughters
    const remainingFraction = Math.max(0, 1 - fixedShareTotal);

    if (numSons > 0 || numDaughters > 0) {
      if (numSons > 0 && numDaughters > 0) {
        // Sons get 2 parts, Daughters get 1 part
        const totalPortions = (numSons * 2) + (numDaughters * 1);
        const portionValueFraction = remainingFraction / totalPortions;

        const sonFractionTotal = portionValueFraction * (numSons * 2);
        const daughterFractionTotal = portionValueFraction * (numDaughters * 1);

        const sonPerPersonSatak = (totalLandSatak * portionValueFraction * 2);
        const daughterPerPersonSatak = (totalLandSatak * portionValueFraction * 1);

        shares.push({
          relation: 'Sons',
          relationBn: `পুত্র (${numSons} জন)`,
          count: numSons,
          shareFraction: `আসাবা (পুত্রের অংশ দ্বিগুণ: ${(sonFractionTotal * 100).toFixed(1)}%)`,
          shareDecimal: sonFractionTotal,
          satakPerPerson: parseFloat(sonPerPersonSatak.toFixed(3)),
          totalSatak: parseFloat((sonPerPersonSatak * numSons).toFixed(3)),
          hisabNotation: FaraidInheritanceEngine.decimalToBengaliHisab(sonFractionTotal),
          color: colors[3]
        });

        shares.push({
          relation: 'Daughters',
          relationBn: `কন্যা (${numDaughters} জন)`,
          count: numDaughters,
          shareFraction: `আসাবা (কন্যার অংশ একগুণ: ${(daughterFractionTotal * 100).toFixed(1)}%)`,
          shareDecimal: daughterFractionTotal,
          satakPerPerson: parseFloat(daughterPerPersonSatak.toFixed(3)),
          totalSatak: parseFloat((daughterPerPersonSatak * numDaughters).toFixed(3)),
          hisabNotation: FaraidInheritanceEngine.decimalToBengaliHisab(daughterFractionTotal),
          color: colors[4]
        });
      } else if (numSons > 0 && numDaughters === 0) {
        const perSonSatak = (totalLandSatak * remainingFraction) / numSons;
        shares.push({
          relation: 'Sons',
          relationBn: `পুত্র (${numSons} জন)`,
          count: numSons,
          shareFraction: 'আসাবা (অবশিষ্টাংশ সম্পূর্ণ)',
          shareDecimal: remainingFraction,
          satakPerPerson: parseFloat(perSonSatak.toFixed(3)),
          totalSatak: parseFloat((totalLandSatak * remainingFraction).toFixed(3)),
          hisabNotation: FaraidInheritanceEngine.decimalToBengaliHisab(remainingFraction),
          color: colors[3]
        });
      } else if (numSons === 0 && numDaughters > 0) {
        const daughterFraction = numDaughters === 1 ? (1 / 2) : (2 / 3);
        const perDaughterSatak = (totalLandSatak * daughterFraction) / numDaughters;

        shares.push({
          relation: 'Daughters',
          relationBn: `কন্যা (${numDaughters} জন)`,
          count: numDaughters,
          shareFraction: numDaughters === 1 ? '১/২' : '২/৩',
          shareDecimal: daughterFraction,
          satakPerPerson: parseFloat(perDaughterSatak.toFixed(3)),
          totalSatak: parseFloat((totalLandSatak * daughterFraction).toFixed(3)),
          hisabNotation: FaraidInheritanceEngine.decimalToBengaliHisab(daughterFraction),
          color: colors[4]
        });
      }
    }

    // Generate physical plot partition simulation
    const partitionPlots = shares.map((s, idx) => ({
      heirName: s.relationBn,
      satak: s.totalSatak,
      plotLabel: `প্লট-${String.fromCharCode(65 + idx)} (${s.satakPerPerson} শতক/জন)`,
      color: s.color
    }));

    return {
      shares,
      totalDistributedSatak: totalLandSatak,
      summaryBn: `মুসলিম পারিবারিক ফরায়েজ আইন ও শরীয়ত বিধি মোতাবেক মোট ${totalLandSatak} শতক ভূমির নির্ভুল হিস্যা বণ্টন সম্পন্ন হয়েছে।`,
      summaryEn: `Faraid succession calculation completed for ${totalLandSatak} Satak based on Muslim Personal Law (Shariat).`,
      partitionPlots
    };
  }

  // Convert decimal share to traditional Bengali land Hisab (আনা, গণ্ডা, কড়া, ক্রান্তি, তিল)
  public static decimalToBengaliHisab(decimalShare: number): string {
    const totalAnnas = decimalShare * 16;
    const annas = Math.floor(totalAnnas);
    const remAnna = totalAnnas - annas;

    const totalGondas = remAnna * 20;
    const gondas = Math.floor(totalGondas);
    const remGonda = totalGondas - gondas;

    const totalKoras = remGonda * 4;
    const koras = Math.floor(totalKoras);
    const remKora = totalKoras - koras;

    const totalKrantis = remKora * 3;
    const krantis = Math.floor(totalKrantis);

    const parts: string[] = [];
    if (annas > 0) parts.push(`${FaraidInheritanceEngine.toBnNum(annas)} আনা`);
    if (gondas > 0) parts.push(`${FaraidInheritanceEngine.toBnNum(gondas)} গণ্ডা`);
    if (koras > 0) parts.push(`${FaraidInheritanceEngine.toBnNum(koras)} কড়া`);
    if (krantis > 0) parts.push(`${FaraidInheritanceEngine.toBnNum(krantis)} ক্রান্তি`);

    return parts.length > 0 ? parts.join(' ') : '০ আনা';
  }

  private static toBnNum(num: number): string {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(d => bnDigits[parseInt(d, 10)] || d).join('');
  }
}
