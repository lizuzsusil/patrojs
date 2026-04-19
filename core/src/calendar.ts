import {BIKRAM_SAMBAT, DAYS_SHORT_EN, DAYS_SHORT_NE, MONTHS_EN, MONTHS_NE} from './data';
import { bsToAdDate, todayBs } from './converter';
import { getMonthName, type PatroJsLanguage } from './utils';
import type { PatroJsMonth, PatroJsDay, PatroJsDateProps } from './types';

export function getDaysInMonth(year: number, month: number): number {
  return BIKRAM_SAMBAT[year]?.[month] ?? 30; // BIKRAM_SAMBAT[year][month] is 1-indexed directly
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