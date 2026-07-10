import {BIKRAM_SAMBAT, DAYS_SHORT_EN, DAYS_SHORT_NE, MONTHS_EN, MONTHS_NE, BS_START_YEAR, BS_END_YEAR} from './data';
import { bsToAdDate, todayBs } from './converter';
import { getMonthName, type PatroJsLanguage } from './utils';
import type { PatroJsMonth, PatroJsDay, PatroJsDateProps } from './types';

export function getDaysInMonth(year: number, month: number): number {
  return BIKRAM_SAMBAT[year]?.[month] ?? 30; // BIKRAM_SAMBAT[year][month] is 1-indexed directly
}

export function isLeapYear(year: number): boolean {
  const days = BIKRAM_SAMBAT[year];
  if (!days) return false;
  const total = days.slice(1).reduce((sum, d) => sum + d, 0);
  return total > 365;
}

export function isValidBsYear(year: number): boolean {
  return year >= BS_START_YEAR && year <= BS_END_YEAR && BIKRAM_SAMBAT[year] !== undefined;
}

export function isValidBsDate(date: PatroJsDateProps): boolean {
  if (!isValidBsYear(date.year)) return false;
  if (date.month < 1 || date.month > 12) return false;
  const dim = getDaysInMonth(date.year, date.month);
  return date.day >= 1 && date.day <= dim;
}

export function getBsWeekday(date: PatroJsDateProps): number {
  return bsToAdDate(date).getDay();
}

export function getMonthData(
  year: number,
  month: number,
  selected: PatroJsDateProps | null,
  language: PatroJsLanguage = 'en'
): PatroJsMonth {
  const daysInMonth = getDaysInMonth(year, month);

  // Find what weekday BS year/month/1 falls on
  const firstDayAD = bsToAdDate({ year, month, day: 1 });
  const startWeekday = firstDayAD.getDay(); // 0 = Sunday

  const today = todayBs();

  // Build cells: leading nulls for empty grid slots, then day objects
  const days: (PatroJsDay | null)[] = [
    ...Array(startWeekday).fill(null),
  ];

  for (let d = 1; d <= daysInMonth; d++) {
    const isSelected =
      selected !== null &&
      selected.year === year &&
      selected.month === month &&
      selected.day === d;

    const isToday =
      today.year === year &&
      today.month === month &&
      today.day === d;

    days.push({
      day: d,
      isToday,
      isSelected,
      isDisabled: false,
      adDate: bsToAdDate({ year, month, day: d }),
    });
  }

  // Week day headers
  const weekDays = language === 'ne' ? DAYS_SHORT_NE : DAYS_SHORT_EN;

  const months = language === 'ne' ? MONTHS_NE : MONTHS_EN;

  return {
    year,
    month,
    days,
    weekDays,
    monthName: getMonthName(month, language),
    allMonths: months
  };
}