import type { PatroJsLanguage } from './utils';

export interface PatroJsDateProps {
  year: number;
  month: number; // 1–12
  day: number;
}

export interface PatroJsDay {
  day: number;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  adDate: Date;
}

export interface PatroJsMonth {
  year: number;
  month: number;
  monthName: string;
  weekDays: string[];
  days: (PatroJsDay | null)[];
  allMonths: string[];
}

export type PatroJsFormatPattern =
  | 'YYYY-MM-DD'
  | 'DD/MM/YYYY'
  | 'DD Month YYYY'
  | 'MMMM DD, YYYY'
  | 'YYYY_MM_DD'
  | 'DD-MM-YYYY'
  | (string & {});

export interface PatroJsDateFormatter {
  format(date: PatroJsDateProps, language: PatroJsLanguage, pattern?: PatroJsFormatPattern): string;
  parse(value: string, language: PatroJsLanguage): PatroJsDateProps | null;
  isValid(value: string, language: PatroJsLanguage): boolean;
  placeholder(language: PatroJsLanguage, pattern?: PatroJsFormatPattern): string;
}

export interface PatroJsAdapterFormatter {
  name: string;
  format: PatroJsDateFormatter['format'];
  parse: PatroJsDateFormatter['parse'];
  isValid: PatroJsDateFormatter['isValid'];
  placeholder: PatroJsDateFormatter['placeholder'];
}