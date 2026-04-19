import React, { CSSProperties } from 'react';
import {
  ColorConfig,
  PatroJsPickerConfig,
  GridStyle,
  NavIconConfig,
  RadiusConfig,
  PatroJsSizeTokens, PatroJsDateProps, PatroJsLanguage
} from '@patrojs/core';

// Per-slot style/class overrides — React specific
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
  monthYearLabel?: CSSProperties;
  footer?: CSSProperties;
  todayButton?: CSSProperties;
}

type PatroJsPickerClassNamesBase = {
  [K in keyof PatroJsPickerStyles]?: string;
};

export interface PatroJsPickerClassNames extends PatroJsPickerClassNamesBase {}

export interface PatroJsProps {
  // value & events
  value?: PatroJsDateProps | null;
  onChange?: (
      bs: PatroJsDateProps,
      ad: string
  ) => void;

  // display
  language?: PatroJsLanguage;
  placeholder?: string;

  // behaviour
  showTodayButton?: boolean;
  todayLabel?: string;
  closeOnSelect?: boolean;
  closeOnOutsideClick?: boolean;

  // theming (framework-agnostic config from core)
  config?: PatroJsPickerConfig;

  // react-specific overrides on top of config
  styles?: PatroJsPickerStyles;
  classNames?: PatroJsPickerClassNames;
}

export type StyleResolver = {
  tokens: PatroJsSizeTokens;
  colors: Required<ColorConfig>;
  radius: Required<RadiusConfig>;
  gridStyle: GridStyle;
  navIcons: Required<NavIconConfig>;

  container: React.CSSProperties;
  input: React.CSSProperties;
  dropdown: React.CSSProperties;
  header: React.CSSProperties;
  navButton: React.CSSProperties;
  weekRow: React.CSSProperties;
  dayLabel: React.CSSProperties;
  grid: React.CSSProperties;
  footer: React.CSSProperties;
  todayButton: React.CSSProperties;

  dayCell: (isSelected: boolean, isToday: boolean) => React.CSSProperties;
};