import type {CSSProperties} from 'react';
import {type PatroJsPickerConfig, resolveConfig} from '@patrojs/core';
import type {PatroJsPickerStyles, StyleResolver} from './types';

// Returns a function that builds the style for each named slot,
// merging: resolved-config-defaults → user styles prop overrides
export function useStyleResolver(
    config: PatroJsPickerConfig = {},
    userStyles: PatroJsPickerStyles = {}
): StyleResolver {
    const {tokens, colors, radius, gridStyle, navIcons} = resolveConfig(config);

    const primary = colors.primary;
    const primaryFg = colors.primaryFg;
    const todayBorderColor = colors.todayBorder || primary;

    return {
        // expose resolved tokens for the component to use directly
        tokens,
        colors,
        radius,
        gridStyle,
        navIcons,

        // ── slot styles ──────────────────────────────────────────────────────────
        container: {
            position: 'relative' as const,
            display: 'inline-block',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            ...userStyles.container,
        } satisfies CSSProperties,

        input: {
            width: tokens.calendarWidth - 40 + 'px',
            padding: tokens.inputPadding,
            borderRadius: radius.input,
            border: '1px solid #e5e7eb',
            cursor: 'pointer',
            background: 'white',
            fontSize: tokens.fontSize,
            transition: '0.2s ease',
            ...userStyles.input,
        } satisfies CSSProperties,

        dropdown: {
            position: 'absolute' as const,
            top: '110%',
            left: 0,
            width: tokens.calendarWidth + 'px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid #e5e7eb',
            borderRadius: radius.calendar,
            boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
            padding: tokens.calendarPadding,
            zIndex: 100,
            ...userStyles.dropdown,
        } satisfies CSSProperties,

        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '10px',
            ...userStyles.header,
        } satisfies CSSProperties,

        navButton: {
            width: '34px',
            height: '34px',
            borderRadius: radius.navBtn,
            border: '1px solid #e5e7eb',
            background: 'white',
            cursor: 'pointer',
            fontSize: '18px',
            transition: '0.15s ease',
            ...userStyles.navButton,
        } satisfies CSSProperties,

        weekRow: {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            fontSize: tokens.weekdayFontSize + 'px',
            color: '#9ca3af',
            textAlign: 'center' as const,
            marginBottom: '6px',
            ...userStyles.weekRow,
        } satisfies CSSProperties,

        dayLabel: {
            padding: '4px 0',
            ...userStyles.dayLabel,
        } satisfies CSSProperties,

        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: gridStyle === 'bordered' ? '0px' : '4px',
            border: gridStyle === 'bordered' ? '1px solid #e5e7eb' : 'none',
            borderRadius: gridStyle === 'bordered' ? radius.day : '0',
            overflow: gridStyle === 'bordered' ? 'hidden' : 'visible',
        } satisfies CSSProperties,

        footer: {
            borderTop: '1px solid #e5e7eb',
            marginTop: '8px',
            paddingTop: '8px',
            display: 'flex',
            justifyContent: 'flex-end',
            ...userStyles.footer,
        } satisfies CSSProperties,

        todayButton: {
            padding: '6px 12px',
            borderRadius: radius.todayBtn,
            border: 'none',
            background: primary,
            color: primaryFg,
            fontSize: tokens.fontSize + 'px',
            cursor: 'pointer',
            transition: '0.2s ease',
            ...userStyles.todayButton,
        } satisfies CSSProperties,

        // ── day cell styles (computed per-cell, called as a function) ────────────
        dayCell(isSelected: boolean, isToday: boolean): CSSProperties {
            const base: CSSProperties = {
                border: 'none',
                width: tokens.dayCell + 'px',
                height: tokens.dayCell + 'px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: radius.day,
                cursor: 'pointer',
                fontSize: tokens.fontSize + 'px',
                transition: '0.15s ease',
                background: 'transparent',
                color: '#111827',
                fontWeight: 400,
                // bordered grid needs cell borders
                ...(gridStyle === 'bordered' && {
                    borderRight: '1px solid #e5e7eb',
                    borderBottom: '1px solid #e5e7eb',
                    borderRadius: '0',
                }),
            };

            if (isSelected) {
                return {
                    ...base,
                    background: primary,
                    color: primaryFg,
                    fontWeight: 600,
                    border: 'none',
                    ...userStyles.selectedDay,
                };
            }

            if (isToday) {
                return {
                    ...base,
                    border: `1.5px solid ${todayBorderColor}`,
                    color: todayBorderColor,
                    fontWeight: 600,
                    ...userStyles.today,
                };
            }

            return {...base, ...userStyles.dayCell};
        },
    };
}