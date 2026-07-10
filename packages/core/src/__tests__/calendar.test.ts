import { describe, it, expect } from 'vitest';
import {
  getDaysInMonth,
  getMonthData,
  isLeapYear,
  isValidBsYear,
  isValidBsDate,
  getBsWeekday,
} from '../calendar';

describe('getDaysInMonth', () => {
  it('returns correct days for known months', () => {
    expect(getDaysInMonth(2081, 1)).toBe(31);
    expect(getDaysInMonth(2081, 2)).toBe(32);
    expect(getDaysInMonth(2081, 12)).toBe(31);
  });

  it('returns 30 for unknown year with fallback', () => {
    expect(getDaysInMonth(2100, 1)).toBe(30);
  });
});

describe('isLeapYear', () => {
  it('identifies 2081 as a leap year', () => {
    expect(isLeapYear(2081)).toBe(true);
  });

  it('identifies 2082 as a non-leap year', () => {
    expect(isLeapYear(2082)).toBe(false);
  });

  it('returns false for unknown year', () => {
    expect(isLeapYear(2100)).toBe(false);
  });
});

describe('isValidBsYear', () => {
  it('accepts 2000-2099', () => {
    expect(isValidBsYear(2000)).toBe(true);
    expect(isValidBsYear(2099)).toBe(true);
    expect(isValidBsYear(2081)).toBe(true);
  });

  it('rejects outside range', () => {
    expect(isValidBsYear(1999)).toBe(false);
    expect(isValidBsYear(2100)).toBe(false);
  });
});

describe('isValidBsDate', () => {
  it('accepts a valid date', () => {
    expect(isValidBsDate({ year: 2081, month: 1, day: 15 })).toBe(true);
  });

  it('rejects invalid year', () => {
    expect(isValidBsDate({ year: 1999, month: 1, day: 1 })).toBe(false);
  });

  it('rejects invalid month', () => {
    expect(isValidBsDate({ year: 2081, month: 13, day: 1 })).toBe(false);
  });

  it('rejects invalid day', () => {
    expect(isValidBsDate({ year: 2081, month: 1, day: 32 })).toBe(false);
  });
});

describe('getBsWeekday', () => {
  it('returns 0-6 for any valid date', () => {
    const weekday = getBsWeekday({ year: 2081, month: 1, day: 1 });
    expect(weekday).toBeGreaterThanOrEqual(0);
    expect(weekday).toBeLessThanOrEqual(6);
  });

  it('returns Wednesday (3) for BS 2000/01/01', () => {
    expect(getBsWeekday({ year: 2000, month: 1, day: 1 })).toBe(3);
  });
});

describe('getMonthData', () => {
  it('returns correct structure for 2081 Baishakh', () => {
    const data = getMonthData(2081, 1, null, 'en');
    expect(data.year).toBe(2081);
    expect(data.month).toBe(1);
    expect(data.monthName).toBe('Baishakh');
    expect(data.allMonths).toHaveLength(12);
    expect(data.days.length).toBeGreaterThanOrEqual(31);
    expect(data.weekDays).toHaveLength(7);
  });

  it('highlights selected date', () => {
    const selected = { year: 2081, month: 1, day: 15 };
    const data = getMonthData(2081, 1, selected, 'en');
    const selectedCell = data.days.find((d) => d?.day === 15);
    expect(selectedCell?.isSelected).toBe(true);
  });

  it('returns Nepali locale data', () => {
    const data = getMonthData(2081, 1, null, 'ne');
    expect(data.monthName).toBe('बैशाख');
    expect(data.weekDays[0]).toBe('आइत');
  });
});
