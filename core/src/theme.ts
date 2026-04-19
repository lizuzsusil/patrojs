// ─── Size presets ────────────────────────────────────────────────────────────
export type PatroJsCalendarSize = 'sm' | 'md' | 'lg';

export interface PatroJsSizeTokens {
    calendarWidth: number;      // px
    dayCell: number;            // px (width = height, square)
    fontSize: number;           // px, day numbers
    headerFontSize: number;     // px, month/year label
    weekdayFontSize: number;    // px
    inputPadding: string;       // CSS shorthand
    calendarPadding: string;    // CSS shorthand
}

export const SIZE_PRESETS: Record<PatroJsCalendarSize, PatroJsSizeTokens> = {
    sm: {
        calendarWidth: 260,
        dayCell: 30,
        fontSize: 12,
        headerFontSize: 13,
        weekdayFontSize: 10,
        inputPadding: '7px 10px',
        calendarPadding: '8px',
    },
    md: {
        calendarWidth: 320,
        dayCell: 36,
        fontSize: 13,
        headerFontSize: 14,
        weekdayFontSize: 11,
        inputPadding: '10px 12px',
        calendarPadding: '10px',
    },
    lg: {
        calendarWidth: 380,
        dayCell: 44,
        fontSize: 15,
        headerFontSize: 16,
        weekdayFontSize: 12,
        inputPadding: '12px 16px',
        calendarPadding: '14px',
    },
};

// ─── Color config ────────────────────────────────────────────────────────────
// User passes either a hex/rgb string OR a Tailwind class string per slot.
// The resolver in react figures out which one it is.
export interface ColorConfig {
    primary?: string;       // selected day bg, today border, footer btn bg
    primaryFg?: string;     // text on primary background (default: #fff)
    todayBorder?: string;   // overrides primary for today border if set
}

export const DEFAULT_COLORS: Required<ColorConfig> = {
    primary: '#0d6efd',
    primaryFg: '#ffffff',
    todayBorder: '',        // falls back to primary when empty
};

// ─── Border radius config ────────────────────────────────────────────────────
export interface RadiusConfig {
    calendar?: string;   // the dropdown panel
    input?: string;      // the trigger input
    day?: string;        // each day cell
    select?: string;     // month/year selects
    navBtn?: string;     // prev/next buttons
    todayBtn?: string;   // footer today button
}

export const DEFAULT_RADIUS: Required<RadiusConfig> = {
    calendar: '14px',
    input: '10px',
    day: '8px',
    select: '8px',
    navBtn: '10px',
    todayBtn: '8px',
};

// ─── Grid style ──────────────────────────────────────────────────────────────
export type GridStyle = 'borderless' | 'bordered';

// ─── Nav icon config ─────────────────────────────────────────────────────────
export interface NavIconConfig {
    prev?: string;
    next?: string;
}

export const DEFAULT_NAV_ICONS: Required<NavIconConfig> = {
    prev: '‹',
    next: '›',
};

// ─── Master config ───────────────────────────────────────────────────────────
export interface PatroJsPickerConfig {
    size?: PatroJsCalendarSize;
    sizeTokens?: Partial<PatroJsSizeTokens>;
    colors?: ColorConfig;
    radius?: RadiusConfig;
    gridStyle?: GridStyle;
    navIcons?: NavIconConfig;
}

export const DEFAULT_CONFIG: Required<PatroJsPickerConfig> = {
    size: 'md',
    sizeTokens: {},
    colors: DEFAULT_COLORS,
    radius: DEFAULT_RADIUS,
    gridStyle: 'borderless',
    navIcons: DEFAULT_NAV_ICONS,
};

// ─── Resolver ────────────────────────────────────────────────────────────────
export function resolveConfig(config: PatroJsPickerConfig = {}): {
    tokens: PatroJsSizeTokens;
    colors: Required<ColorConfig>;
    radius: Required<RadiusConfig>;
    gridStyle: GridStyle;
    navIcons: Required<NavIconConfig>;
} {
    const tokens: PatroJsSizeTokens = {
        ...SIZE_PRESETS[config.size ?? 'md'],
        ...config.sizeTokens,
    };

    const colors: Required<ColorConfig> = {
        ...DEFAULT_COLORS,
        ...config.colors,
    };

    const radius: Required<RadiusConfig> = {
        ...DEFAULT_RADIUS,
        ...config.radius,
    };

    return {
        tokens,
        colors,
        radius,
        gridStyle: config.gridStyle ?? 'borderless',
        navIcons: { ...DEFAULT_NAV_ICONS, ...config.navIcons },
    };
}