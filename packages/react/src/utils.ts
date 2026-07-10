import type { PatroJsDateProps, PatroJsLanguage } from '@patrojs/core';

export function isBefore(a: PatroJsDateProps, b: PatroJsDateProps): boolean {
  if (a.year !== b.year) return a.year < b.year;
  if (a.month !== b.month) return a.month < b.month;
  return a.day < b.day;
}

export function isAfter(a: PatroJsDateProps, b: PatroJsDateProps): boolean {
  if (a.year !== b.year) return a.year > b.year;
  if (a.month !== b.month) return a.month > b.month;
  return a.day > b.day;
}

export function isDisabledDate(
  date: PatroJsDateProps,
  minDate?: PatroJsDateProps | null,
  maxDate?: PatroJsDateProps | null,
  disabledDates?: ((d: PatroJsDateProps) => boolean) | null,
  disabledWeekdays?: number[] | null,
  adDate?: Date,
): boolean {
  if (minDate && isBefore(date, minDate)) return true;
  if (maxDate && isAfter(date, maxDate)) return true;
  if (disabledDates && disabledDates(date)) return true;
  if (disabledWeekdays && adDate && disabledWeekdays.includes(adDate.getDay())) return true;
  return false;
}

export function findNext(
  days: ReadonlyArray<{ day: number; isDisabled: boolean } | null>,
  from: number,
  step: number,
): number {
  let i = from + step;
  while (i >= 0 && i < days.length) {
    if (days[i] && !days[i]!.isDisabled) return i;
    i += step;
  }
  return from;
}

export function bsDateEqual(a: PatroJsDateProps | null, b: PatroJsDateProps | null): boolean {
  if (!a || !b) return false;
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

export function getWeekdayLabel(dayIndex: number, language: PatroJsLanguage): string {
  const labels: Record<PatroJsLanguage, string[]> = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ne: ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'],
  };
  return labels[language][dayIndex];
}
