import { NEPALI_DIGITS, MONTHS_EN, MONTHS_NE, DAYS_SHORT_EN, DAYS_SHORT_NE } from './data';

export function toNepaliDigits(value: number | string): string {
  return value
    .toString()
    .split('')
    .map(ch => NEPALI_DIGITS[parseInt(ch)] ?? ch)
    .join('');
}

export function toEnglishDigits(value: string): number {
  return parseInt(
    value
      .split('')
      .map(ch => {
        const idx = NEPALI_DIGITS.indexOf(ch);
        return idx >= 0 ? idx.toString() : ch;
      })
      .join('')
  );
}

export type PatroJsLanguage = 'en' | 'ne';

export function getMonthName(month: number, language: PatroJsLanguage): string {
  // month is 1-based
  return language === 'ne' ? MONTHS_NE[month - 1] : MONTHS_EN[month - 1];
}

export function getDayLabel(dayIndex: number, language: PatroJsLanguage): string {
  // dayIndex: 0 = Sunday
  return language === 'ne' ? DAYS_SHORT_NE[dayIndex] : DAYS_SHORT_EN[dayIndex];
}

// Format a BS date as a string: "2081-04-15" or "२०८१-०४-१५"
export function formatBsDate(
  year: number,
  month: number,
  day: number,
  language: PatroJsLanguage = 'en'
): string {
  if (language === 'ne') {
    return `${toNepaliDigits(year)}-${toNepaliDigits(month > 9 ? month : '0' + month)}-${toNepaliDigits(day > 9 ? day : '0' + day)}`;
  }
  return `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`;
}