export type PatroJsCalendarSize = 'sm' | 'md' | 'lg';
export interface PatroJsSizeTokens {
    calendarWidth: number;
    dayCell: number;
    fontSize: number;
    headerFontSize: number;
    weekdayFontSize: number;
    inputPadding: string;
    calendarPadding: string;
}
export declare const SIZE_PRESETS: Record<PatroJsCalendarSize, PatroJsSizeTokens>;
export interface ColorConfig {
    primary?: string;
    primaryBg?: string;
    todayBorder?: string;
}
export declare const DEFAULT_COLORS: Required<ColorConfig>;
export interface RadiusConfig {
    calendar?: string;
    input?: string;
    day?: string;
    select?: string;
    navBtn?: string;
    todayBtn?: string;
}
export declare const DEFAULT_RADIUS: Required<RadiusConfig>;
export type GridStyle = 'borderless' | 'bordered';
export interface NavIconConfig {
    prev?: string;
    next?: string;
}
export declare const DEFAULT_NAV_ICONS: Required<NavIconConfig>;
export interface PatroJsPickerConfig {
    size?: PatroJsCalendarSize;
    sizeTokens?: Partial<PatroJsSizeTokens>;
    colors?: ColorConfig;
    radius?: RadiusConfig;
    gridStyle?: GridStyle;
    navIcons?: NavIconConfig;
}
export declare const DEFAULT_CONFIG: Required<PatroJsPickerConfig>;
export declare function resolveConfig(config?: PatroJsPickerConfig): {
    tokens: PatroJsSizeTokens;
    colors: Required<ColorConfig>;
    radius: Required<RadiusConfig>;
    gridStyle: GridStyle;
    navIcons: Required<NavIconConfig>;
};
//# sourceMappingURL=theme.d.ts.map