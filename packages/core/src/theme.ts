/**
 * Size presets
 *
 * Defines the available size variants for the component.
 * Each preset maps to a predefined set of dimensions, spacing,
 * and typography values to ensure consistent sizing.
 */
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

/**
 * Color configuration
 *
 * Each color slot accepts either:
 * - A CSS color value (e.g. "#3B82F6", "rgb(59, 130, 246)", "hsl(...)"), or
 * - A Tailwind CSS utility class (e.g. "bg-blue-500", "text-red-600").
 *
 * The React color resolver automatically detects the input format
 * and applies the appropriate handling.
 */
export interface ColorConfig {
    primary?: string;       // selected day bg, today border, footer btn bg
    primaryBg?: string;     // text on primary background (default: #fff)
    todayBorder?: string;   // overrides primary for today border if set
    background?: string;    // calendar background
    surface?: string;       // input hover, disabled bg
    border?: string;        // borders
    text?: string;          // day text, select text
    muted?: string;         // weekday labels
    accent?: string;        // hover highlight
    saturdayColor?: string; // text color for Saturday day cells and weekday label
}

export const DEFAULT_COLORS: Required<ColorConfig> = {
    primary: '#0d6efd',
    primaryBg: '#ffffff',
    todayBorder: '',        // falls back to primary when empty
    background: '#ffffff',
    surface: '#f9fafb',
    border: '#e5e7eb',
    text: '#111827',
    muted: '#9ca3af',
    accent: '#f3f4f6',
    saturdayColor: '#e30606',
};

/**
 * Border radius configuration
 *
 * Allows customization of the border radius for individual parts
 * of the date picker. Each property accepts any valid CSS border-radius
 * value (e.g. "8px", "0.5rem", "50%", "inherit").
 */
export interface RadiusConfig {
    calendar?: string;   // the dropdown panel
    input?: string;      // the trigger input
    day?: string;        // each day cell
    select?: string;     // month/year selects
    navBtn?: string;     // prev/next buttons
    todayBtn?: string;   // footer today button
}

export const DEFAULT_RADIUS: Required<RadiusConfig> = {
    calendar: '8px',
    input: '10px',
    day: '8px',
    select: '8px',
    navBtn: '10px',
    todayBtn: '8px',
};

/**
 * Calendar grid style
 *
 * Controls how the day grid is rendered.
 * - "borderless": Displays day cells without borders.
 * - "bordered": Displays borders between day cells.
 */
export type GridStyle = 'borderless' | 'bordered';

/**
 * Navigation icon configuration
 *
 * Allows customization of the previous and next navigation
 * button icons. Each property accepts a string, such as a
 * Unicode character, text, or icon glyph.
 */
export interface NavIconConfig {
    prev?: string;
    next?: string;
}

/**
 * Default navigation icons used when no custom
 * icons are provided.
 */
export const DEFAULT_NAV_ICONS: Required<NavIconConfig> = {
    prev: '‹',
    next: '›',
};

/**
 * Date picker configuration
 *
 * Provides a centralized configuration object for customizing
 * the appearance and behavior of the date picker, including
 * sizing, colors, border radius, grid style, and navigation icons.
 */
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

/**
 * Resolves the final date picker configuration by merging user-provided
 * options with the default configuration.
 *
 * This function ensures that all configuration sections are fully populated,
 * applying default values for any properties that are omitted. It also
 * resolves the selected size preset and merges any custom size tokens.
 *
 * @param config - Partial date picker configuration.
 * @returns The fully resolved configuration object containing:
 * - `tokens`: Resolved size tokens.
 * - `colors`: Complete color configuration.
 * - `radius`: Complete border radius configuration.
 * - `gridStyle`: Resolved calendar grid style.
 * - `navIcons`: Complete navigation icon configuration.
 */
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