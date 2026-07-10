import { describe, it, expect } from 'vitest';
import { bsToAd, bsToAdDate, adToBs, todayBs } from '../converter';

describe('bsToAd', () => {
  it('converts BS 2000/01/01 to AD 1943-04-14', () => {
    expect(bsToAd({ year: 2000, month: 1, day: 1 })).toBe('1943-04-14');
  });

  it('returns correct AD format', () => {
    const result = bsToAd({ year: 2081, month: 1, day: 15 });
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('round-trips through adToBs', () => {
    const original = { year: 2081, month: 6, day: 15 };
    const ad = bsToAd(original);
    const adDate = new Date(ad);
    const back = adToBs(adDate);
    expect(back).toEqual(original);
  });
});

describe('bsToAdDate', () => {
  it('returns a valid Date object', () => {
    const d = bsToAdDate({ year: 2081, month: 1, day: 1 });
    expect(d).toBeInstanceOf(Date);
    expect(d.getTime()).not.toBeNaN();
  });
});

describe('adToBs', () => {
  it('converts AD 1943-04-14 to BS 2000/01/01', () => {
    const result = adToBs(new Date('1943-04-14'));
    expect(result).toEqual({ year: 2000, month: 1, day: 1 });
  });

  it('returns correct shape', () => {
    const result = adToBs(new Date());
    expect(result).toHaveProperty('year');
    expect(result).toHaveProperty('month');
    expect(result).toHaveProperty('day');
    expect(result.year).toBeGreaterThanOrEqual(2000);
    expect(result.month).toBeGreaterThanOrEqual(1);
    expect(result.month).toBeLessThanOrEqual(12);
    expect(result.day).toBeGreaterThanOrEqual(1);
  });
});

describe('todayBs', () => {
  it('returns today as PatroJsDateProps', () => {
    const result = todayBs();
    expect(result).toHaveProperty('year');
    expect(result).toHaveProperty('month');
    expect(result).toHaveProperty('day');
  });
});
