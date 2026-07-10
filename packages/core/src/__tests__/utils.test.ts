import { describe, it, expect } from 'vitest';
import {
  toNepaliDigits,
  toEnglishDigits,
  getMonthName,
  getDayLabel,
  formatBsDate,
  formatBsDatePattern,
  createDefaultFormatter,
} from '../utils';

describe('toNepaliDigits', () => {
  it('converts 2081 to २०८१', () => {
    expect(toNepaliDigits(2081)).toBe('२०८१');
  });

  it('converts 0 to ०', () => {
    expect(toNepaliDigits(0)).toBe('०');
  });

  it('converts string "123" to १२३', () => {
    expect(toNepaliDigits('123')).toBe('१२३');
  });
});

describe('toEnglishDigits', () => {
  it('converts २०८१ to 2081', () => {
    expect(toEnglishDigits('२०८१')).toBe(2081);
  });

  it('returns NaN for invalid input', () => {
    expect(toEnglishDigits('abc')).toBeNaN();
  });
});

describe('getMonthName', () => {
  it('returns English month name', () => {
    expect(getMonthName(1, 'en')).toBe('Baishakh');
    expect(getMonthName(12, 'en')).toBe('Chaitra');
  });

  it('returns Nepali month name', () => {
    expect(getMonthName(1, 'ne')).toBe('बैशाख');
    expect(getMonthName(12, 'ne')).toBe('चैत्र');
  });
});

describe('getDayLabel', () => {
  it('returns English day label', () => {
    expect(getDayLabel(0, 'en')).toBe('Sun');
    expect(getDayLabel(6, 'en')).toBe('Sat');
  });

  it('returns Nepali day label', () => {
    expect(getDayLabel(0, 'ne')).toBe('आइत');
  });
});

describe('formatBsDate', () => {
  it('formats in YYYY-MM-DD with English digits', () => {
    expect(formatBsDate(2081, 1, 15, 'en')).toBe('2081-01-15');
  });

  it('formats in YYYY-MM-DD with Nepali digits', () => {
    expect(formatBsDate(2081, 1, 15, 'ne')).toBe('२०८१-०१-१५');
  });
});

describe('formatBsDatePattern', () => {
  const date = { year: 2081, month: 1, day: 15 };

  it('formats YYYY-MM-DD', () => {
    expect(formatBsDatePattern(date, 'en', 'YYYY-MM-DD')).toBe('2081-01-15');
  });

  it('formats DD/MM/YYYY', () => {
    expect(formatBsDatePattern(date, 'en', 'DD/MM/YYYY')).toBe('15/01/2081');
  });

  it('formats DD Month YYYY', () => {
    expect(formatBsDatePattern(date, 'en', 'DD Month YYYY')).toBe('15 Baishakh 2081');
  });

  it('formats MMMM DD, YYYY', () => {
    expect(formatBsDatePattern(date, 'en', 'MMMM DD, YYYY')).toBe('Baishakh 15, 2081');
  });

  it('formats Nepali DD Month YYYY', () => {
    expect(formatBsDatePattern(date, 'ne', 'DD Month YYYY')).toBe('१५ बैशाख २०८१');
  });

  it('formats YYYY_MM_DD', () => {
    expect(formatBsDatePattern(date, 'en', 'YYYY_MM_DD')).toBe('2081_01_15');
  });

  it('formats DD-MM-YYYY', () => {
    expect(formatBsDatePattern(date, 'en', 'DD-MM-YYYY')).toBe('15-01-2081');
  });
});

describe('createDefaultFormatter', () => {
  const fmt = createDefaultFormatter();
  const date = { year: 2081, month: 1, day: 15 };

  it('format works with default pattern', () => {
    expect(fmt.format(date, 'en')).toBe('2081-01-15');
  });

  it('format works with custom pattern', () => {
    expect(fmt.format(date, 'en', 'DD/MM/YYYY')).toBe('15/01/2081');
  });

  it('parse handles YYYY-MM-DD', () => {
    expect(fmt.parse('2081-01-15')).toEqual(date);
  });

  it('parse handles DD/MM/YYYY', () => {
    expect(fmt.parse('15/01/2081')).toEqual(date);
  });

  it('parse handles Nepali digits', () => {
    expect(fmt.parse('२०८१-०१-१५')).toEqual(date);
  });

  it('isValid validates correct date', () => {
    expect(fmt.isValid('2081-01-15')).toBe(true);
  });

  it('isValid rejects invalid date', () => {
    expect(fmt.isValid('2081-13-01')).toBe(false);
  });

  it('placeholder returns correct format', () => {
    const ph = fmt.placeholder('en');
    expect(ph).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
