import { NEPALI_DIGITS, MONTHS_EN, MONTHS_NE, DAYS_SHORT_EN, DAYS_SHORT_NE, BIKRAM_SAMBAT } from './data';
import type { PatroJsFormatPattern, PatroJsDateProps } from './types';

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

export function formatBsDatePattern(
  date: PatroJsDateProps,
  language: PatroJsLanguage = 'en',
  pattern: PatroJsFormatPattern = 'YYYY-MM-DD'
): string {
  const { year, month, day } = date;
  const monthName = getMonthName(month, language);
  const pad2 = (n: number) => (n > 9 ? n : '0' + n);

  if (language === 'ne') {
    switch (pattern) {
      case 'YYYY-MM-DD':
        return `${toNepaliDigits(year)}-${toNepaliDigits(pad2(month))}-${toNepaliDigits(pad2(day))}`;
      case 'DD/MM/YYYY':
        return `${toNepaliDigits(pad2(day))}/${toNepaliDigits(pad2(month))}/${toNepaliDigits(year)}`;
      case 'DD-MM-YYYY':
        return `${toNepaliDigits(pad2(day))}-${toNepaliDigits(pad2(month))}-${toNepaliDigits(year)}`;
      case 'YYYY_MM_DD':
        return `${toNepaliDigits(year)}_${toNepaliDigits(pad2(month))}_${toNepaliDigits(pad2(day))}`;
      case 'DD Month YYYY':
        return `${toNepaliDigits(pad2(day))} ${monthName} ${toNepaliDigits(year)}`;
      case 'MMMM DD, YYYY':
        return `${monthName} ${toNepaliDigits(pad2(day))}, ${toNepaliDigits(year)}`;
      default:
        return pattern
          .replace(/YYYY/g, toNepaliDigits(year))
          .replace(/MM/g, toNepaliDigits(pad2(month)))
          .replace(/DD/g, toNepaliDigits(pad2(day)))
          .replace(/M/g, toNepaliDigits(month))
          .replace(/D/g, toNepaliDigits(day));
    }
  }

  switch (pattern) {
    case 'YYYY-MM-DD':
      return `${year}-${pad2(month)}-${pad2(day)}`;
    case 'DD/MM/YYYY':
      return `${pad2(day)}/${pad2(month)}/${year}`;
    case 'DD-MM-YYYY':
      return `${pad2(day)}-${pad2(month)}-${year}`;
    case 'YYYY_MM_DD':
      return `${year}_${pad2(month)}_${pad2(day)}`;
    case 'DD Month YYYY':
      return `${pad2(day)} ${monthName} ${year}`;
    case 'MMMM DD, YYYY':
      return `${monthName} ${pad2(day)}, ${year}`;
    default:
      return pattern
        .replace(/YYYY/g, String(year))
        .replace(/MM/g, String(pad2(month)))
        .replace(/DD/g, String(pad2(day)))
        .replace(/MMMM/g, monthName)
        .replace(/M/g, String(month))
        .replace(/D/g, String(day));
  }
}

export function createDefaultFormatter(): {
  format: (date: PatroJsDateProps, language?: PatroJsLanguage, pattern?: PatroJsFormatPattern) => string;
  parse: (value: string, language?: PatroJsLanguage) => PatroJsDateProps | null;
  isValid: (value: string, language?: PatroJsLanguage) => boolean;
  placeholder: (language?: PatroJsLanguage, pattern?: PatroJsFormatPattern) => string;
} {
  return {
    format(date, language = 'en', pattern = 'YYYY-MM-DD') {
      return formatBsDatePattern(date, language, pattern);
    },
    parse(value, _language = 'en') {
      const nepalDigits = /[०१२३४५६७८९]/;
      if (nepalDigits.test(value)) {
        const latin = value.split('').map(ch => {
          const idx = NEPALI_DIGITS.indexOf(ch);
          return idx >= 0 ? String(idx) : ch;
        }).join('');
        const clean = latin.replace(/[^\d-]/g, '');
        const parts = clean.split('-').filter(Boolean);
        if (parts.length === 3) {
          const [y, m, d] = parts.map(Number);
          if (!isNaN(y) && !isNaN(m) && !isNaN(d)) return { year: y, month: m, day: d };
        }
        return null;
      }
      const cleaned = value.replace(/[^\d\-/.]/g, '');
      const sep = cleaned.includes('/') ? '/' : cleaned.includes('-') ? '-' : null;
      if (!sep) return null;
      const parts = cleaned.split(sep).map(s => {
        const latin = s.split('').map(ch => {
          const idx = NEPALI_DIGITS.indexOf(ch);
          return idx >= 0 ? String(idx) : ch;
        }).join('');
        return parseInt(latin, 10);
      });
      if (parts.length !== 3 || parts.some(isNaN)) return null;
      // Assume YYYY-MM-DD or YYYY/MM/DD
      if (parts[0] > 999) return { year: parts[0], month: parts[1], day: parts[2] };
      // DD/MM/YYYY or DD-MM-YYYY
      return { year: parts[2], month: parts[1], day: parts[0] };
    },
    isValid(value, language = 'en') {
      const parsed = this.parse(value, language);
      if (!parsed) return false;
      if (parsed.year < 2000 || parsed.year > 2099) return false;
      if (parsed.month < 1 || parsed.month > 12) return false;
      const dim = BIKRAM_SAMBAT[parsed.year]?.[parsed.month] ?? 30;
      return parsed.day >= 1 && parsed.day <= dim;
    },
    placeholder(language = 'en', pattern = 'YYYY-MM-DD') {
      const demo: PatroJsDateProps = { year: 2081, month: 1, day: 15 };
      return formatBsDatePattern(demo, language, pattern);
    },
  };
}