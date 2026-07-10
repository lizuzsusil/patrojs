import type { CSSProperties, ReactNode } from 'react';
import type {
  PatroJsPickerConfig,
  PatroJsDateProps,
  PatroJsLanguage,
  PatroJsSizeTokens,
  ColorConfig,
  RadiusConfig,
  GridStyle,
  NavIconConfig,
  PatroJsDay,
  PatroJsMonth,
  PatroJsFormatPattern,
} from '@patrojs/core';

export interface PatroJsPickerStyles {
  container?: CSSProperties;
  input?: CSSProperties;
  dropdown?: CSSProperties;
  header?: CSSProperties;
  weekRow?: CSSProperties;
  dayLabel?: CSSProperties;
  dayCell?: CSSProperties;
  selectedDay?: CSSProperties;
  today?: CSSProperties;
  todaySelected?: CSSProperties;
  navButton?: CSSProperties;
  select?: CSSProperties;
  footer?: CSSProperties;
  todayButton?: CSSProperties;
  error?: CSSProperties;
  loading?: CSSProperties;
  outsideDay?: CSSProperties;
}

type StyleSlot = keyof PatroJsPickerStyles;
export type PatroJsPickerClassNames = { [K in StyleSlot]?: string };

export interface PatroJsFormatter {
  format(date: PatroJsDateProps, language: PatroJsLanguage): string;
  parse(value: string, language: PatroJsLanguage): PatroJsDateProps | null;
  isValid(value: string, language: PatroJsLanguage): boolean;
  placeholder(language: PatroJsLanguage): string;
}

export interface PatroJsProps {
  value?: PatroJsDateProps | null;
  defaultValue?: PatroJsDateProps;
  onChange?: (bs: PatroJsDateProps, ad: string) => void;

  inline?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  language?: PatroJsLanguage;
  placeholder?: string;

  showTodayButton?: boolean;
  todayLabel?: string;
  closeOnSelect?: boolean;
  closeOnOutsideClick?: boolean;

  minDate?: PatroJsDateProps;
  maxDate?: PatroJsDateProps;
  disabledDates?: (date: PatroJsDateProps) => boolean;
  disabledWeekdays?: number[];

  config?: PatroJsPickerConfig;
  styles?: PatroJsPickerStyles;
  classNames?: PatroJsPickerClassNames;
  formatter?: PatroJsFormatter;
  minimal?: boolean;
  portal?: boolean;
  formatPattern?: PatroJsFormatPattern;

  readOnly?: boolean;
  disabled?: boolean;
  error?: boolean;
  loading?: boolean;

  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onMonthChange?: (year: number, month: number) => void;
  onYearChange?: (year: number) => void;

  weekStart?: number;
  showOutsideDays?: boolean;
  outsideDayLabel?: string;

  icon?: ReactNode | false;
  iconPosition?: 'start' | 'end';

  renderDay?: (day: PatroJsDay, props: {
    isDisabled: boolean;
    isFocused: boolean;
    onSelect: () => void;
  }) => ReactNode;
  renderHeader?: (defaultHeader: ReactNode) => ReactNode;
  renderFooter?: (defaultFooter: ReactNode) => ReactNode;
}

export interface StyleResolver {
  tokens: PatroJsSizeTokens;
  colors: ColorConfig;
  radius: RadiusConfig;
  gridStyle: GridStyle;
  navIcons: NavIconConfig;
}
