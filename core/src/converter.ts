import { BIKRAM_SAMBAT, AD_EPOCH } from './data';
import type { PatroJsDateProps } from './types';

// ─── BS → AD ────────────────────────────────────────────────────────────────
// Counts days from BS 2000/01/01, then adds to the AD epoch (1943-04-14)
export function bsToAd(bsDate: PatroJsDateProps): string {
  const { year, month, day } = bsDate;
  let daysDiff = 0;

  for (let i = 2000; i <= year; i++) {
    if (i === year) {
      for (let j = 1; j < month; j++) {
        daysDiff += BIKRAM_SAMBAT[i][j];
      }
      daysDiff += day - 1;
    } else {
      for (let j = 1; j <= 12; j++) {
        daysDiff += BIKRAM_SAMBAT[i][j];
      }
    }
  }

  const result = new Date(AD_EPOCH);
  result.setDate(result.getDate() + daysDiff);

  const y = result.getFullYear();
  const m = result.getMonth() + 1;
  const d = result.getDate();
  return `${y}-${m > 9 ? m : '0' + m}-${d > 9 ? d : '0' + d}`;
}

// ─── BS → AD as Date object ──────────────────────────────────────────────────
export function bsToAdDate(bsDate: PatroJsDateProps): Date {
  return new Date(bsToAd(bsDate));
}

// ─── AD → BS ────────────────────────────────────────────────────────────────
// Counts days elapsed since AD epoch, walks BS calendar to find the date
export function adToBs(adDate: Date): PatroJsDateProps {
  const startDate = new Date(AD_EPOCH);
  const daysElapsed = Math.floor(
    (adDate.getTime() - startDate.getTime()) / 86400000
  );

  let totalD = 0;
  let year = 0;
  let month = 0;
  let day = 0;
  let found = false;

  for (let i = 2000; i < 2100 && !found; i++) {
    for (let j = 1; j <= 12; j++) {
      totalD += BIKRAM_SAMBAT[i][j];
      if (daysElapsed - totalD < 0) {
        day = daysElapsed - totalD + BIKRAM_SAMBAT[i][j] + 1;
        year = i;
        month = j;
        found = true;
        break;
      }
    }
  }

  return { year, month, day };
}

// ─── Today → BS ─────────────────────────────────────────────────────────────
export function todayBs(): PatroJsDateProps {
  return adToBs(new Date());
}