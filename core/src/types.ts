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