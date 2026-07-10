import type {CSSProperties} from 'react';
import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import type {PatroJsDateProps, PatroJsDay} from '@patrojs/core';
import {bsToAd, getDaysInMonth, getMonthData, todayBs, toNepaliDigits,} from '@patrojs/core';
import type {PatroJsFormatter, PatroJsProps} from './types';
import {useStyleResolver} from './useStyleResolver';
import {bsDateEqual, findNext, isDisabledDate} from './utils';
import {createDefaultFormatter} from './defaultFormatter';
import {useSwipe} from './useSwipe';
import './styles/PatroDatePicker.css';

/* ──────────────────────────────────────────────
   PatroDatePicker
   ────────────────────────────────────────────── */

export const PatroDatePicker: React.FC<PatroJsProps> = ({
                                                            value: controlledValue,
                                                            defaultValue,
                                                            onChange,

                                                            inline = false,
                                                            open: controlledOpen,
                                                            onOpenChange,

                                                            language = 'en',
                                                            placeholder: placeholderProp,

                                                            showTodayButton = true,
                                                            todayLabel: todayLabelProp,
                                                            closeOnSelect = true,
                                                            closeOnOutsideClick = true,

                                                            minDate,
                                                            maxDate,
                                                            disabledDates,
                                                            disabledWeekdays,

                                                            config,
                                                            styles = {},
                                                            classNames = {},
                                                            formatter,
                                                            minimal = false,
                                                            formatPattern,

                                                            readOnly = false,
                                                            disabled: disabledProp = false,
                                                            error = false,
                                                            loading = false,
                                                            portal = true,
                                                            onFocus,
                                                            onBlur,
                                                            onMonthChange,
                                                            onYearChange,
                                                            weekStart = 0,
                                                            showOutsideDays = false,
                                                            outsideDayLabel,
                                                            icon,
                                                            iconPosition = 'end',
                                                            renderDay,
                                                            renderHeader: renderHeaderProp,
                                                            renderFooter: renderFooterProp,
                                                        }) => {
    const today = todayBs();
    const isNepali = language === 'ne';

    /* ── refs ─────────────────────────────────── */
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const calendarRef = useRef<HTMLDivElement | null>(null);
    const portalRef = useRef<HTMLDivElement | null>(null);

    /* ── portal position ──────────────────────── */
    const [portalStyle, setPortalStyle] = useState<{ top: string; left: string; width: string } | null>(null);

    /* ── controlled / uncontrolled value ──────── */
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<PatroJsDateProps | null>(
        defaultValue ?? null,
    );
    const selectedDate = isControlled ? controlledValue : internalValue;

    /* ── controlled / uncontrolled open ───────── */
    const isOpenControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(false);
    const open = isOpenControlled ? controlledOpen : internalOpen;

    const setOpen = useCallback(
        (next: boolean) => {
            if (!isOpenControlled) setInternalOpen(next);
            onOpenChange?.(next);
        },
        [isOpenControlled, onOpenChange],
    );

    /* ── input value for editable mode ────────── */
    const [inputValue, setInputValue] = useState('');
    const inputTouched = useRef(false);

    // Sync input when selectedDate changes externally or on selection
    useEffect(() => {
        if (!inputTouched.current && selectedDate) {
            setInputValue(
                (formatter ?? createDefaultFormatter(formatPattern)).format(selectedDate, language),
            );
        }
    }, [selectedDate, language, formatter, formatPattern]);

    /* ── view state (visible month/year) ──────── */
    const [view, setView] = useState(() => {
        const init = selectedDate ?? today;
        return {year: init.year, month: init.month};
    });

    /* ── focus tracking for keyboard nav ──────── */
    const [focusedIndex, setFocusedIndex] = useState(-1);

    /* ── style resolver ───────────────────────── */
    const s = useStyleResolver(config);

    const cssVars = minimal ? undefined : {
        '--pjs-primary': s.colors.primary!,
        '--pjs-primary-fg': s.colors.primaryBg!,
        '--pjs-today-border': s.colors.todayBorder || s.colors.primary!,
        ...(s.colors.saturdayColor ? {'--pjs-saturday-color': s.colors.saturdayColor} : {}),
    } as CSSProperties;

    /* ── derived data ─────────────────────────── */
    const monthData = useMemo(
        () => getMonthData(view.year, view.month, selectedDate, language),
        [view.year, view.month, selectedDate, language],
    );

    const {days: baseDays, weekDays: origWeekDays} = monthData;

    // Reorder weekdays based on weekStart
    const weekDays = useMemo(() => {
        if (weekStart === 0) return origWeekDays;
        const reordered = [...origWeekDays];
        for (let i = 0; i < weekStart; i++) {
            reordered.push(reordered.shift()!);
        }
        return reordered;
    }, [origWeekDays, weekStart]);

    // Build grid with outside-month padding
    const daysWithDisabled = useMemo(() => {
        const firstDayAD = (() => {
            const d = new Date(bsToAd({year: view.year, month: view.month, day: 1}));
            return d.getDay();
        })();

        // Adjust starting offset for weekStart
        const startOffset = ((firstDayAD - weekStart) + 7) % 7;

        const daysInMonth = getDaysInMonth(view.year, view.month);
        const days: (PatroJsDay | null)[] = [];

        // Leading outside-month days
        if (showOutsideDays && startOffset > 0) {
            const prevMonth = view.month === 1 ? 12 : view.month - 1;
            const prevYear = view.month === 1 ? view.year - 1 : view.year;
            const prevDaysInMonth = getDaysInMonth(prevYear, prevMonth);
            for (let i = startOffset - 1; i >= 0; i--) {
                const dayNum = prevDaysInMonth - i;
                days.push({
                    day: dayNum,
                    isToday: false,
                    isSelected: false,
                    isDisabled: true,
                    adDate: new Date(bsToAd({year: prevYear, month: prevMonth, day: dayNum})),
                });
            }
        } else {
            for (let i = 0; i < startOffset; i++) {
                days.push(null);
            }
        }

        // Current month days
        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj: PatroJsDateProps = {year: view.year, month: view.month, day: d};
            const adDate = new Date(bsToAd(dateObj));
            const overridden = isDisabledDate(
                dateObj,
                minDate,
                maxDate,
                disabledDates ?? null,
                disabledWeekdays ?? null,
                adDate,
            );
            days.push({
                day: d,
                isToday: bsDateEqual(today, dateObj),
                isSelected: bsDateEqual(selectedDate, dateObj),
                isDisabled: overridden,
                adDate,
            });
        }

        // Trailing cells to fill the last row
        const trailingFill = days.length % 7;
        if (trailingFill !== 0) {
            const remaining = 7 - trailingFill;
            if (showOutsideDays) {
                const nextMonth = view.month === 12 ? 1 : view.month + 1;
                const nextYear = view.month === 12 ? view.year + 1 : view.year;
                for (let i = 1; i <= remaining; i++) {
                    days.push({
                        day: i,
                        isToday: false,
                        isSelected: false,
                        isDisabled: true,
                        adDate: new Date(bsToAd({year: nextYear, month: nextMonth, day: i})),
                    });
                }
            } else {
                for (let i = 0; i < remaining; i++) {
                    days.push(null);
                }
            }
        }

        return days;
    }, [view.year, view.month, selectedDate, minDate, maxDate, disabledDates, disabledWeekdays, today, weekStart, showOutsideDays]);

    const fmt: PatroJsFormatter = formatter ?? createDefaultFormatter(formatPattern);
    const placeholder = placeholderProp ?? fmt.placeholder(language);
    const todayText = todayLabelProp ?? (isNepali ? 'आज' : 'Today');
    const displayValue = selectedDate ? fmt.format(selectedDate, language) : '';
    const outsideLabel = outsideDayLabel ?? (isNepali ? 'अन्य महिना' : 'Outside month');

    const years = useMemo(() => {
        const range: number[] = [];
        for (let y = today.year - 60; y <= today.year + 10; y++) {
            range.push(y);
        }
        return range;
    }, [today.year]);

    /* ── navigation ───────────────────────────── */
    function navTo(year: number, month: number) {
        const prevView = view;
        setView({year, month});
        if (month !== prevView.month) onMonthChange?.(year, month);
        if (year !== prevView.year) onYearChange?.(year);
    }

    function prevMonth() {
        navTo(
            view.month === 1 ? view.year - 1 : view.year,
            view.month === 1 ? 12 : view.month - 1,
        );
    }

    function nextMonth() {
        navTo(
            view.month === 12 ? view.year + 1 : view.year,
            view.month === 12 ? 1 : view.month + 1,
        );
    }

    function prevYear() {
        navTo(view.year - 1, view.month);
    }

    function nextYear() {
        navTo(view.year + 1, view.month);
    }

    /* ── selection ────────────────────────────── */
    function select(date: PatroJsDateProps) {
        if (!isControlled) setInternalValue(date);
        onChange?.(date, bsToAd(date));
        inputTouched.current = false; // reset so input syncs
    }

    function handleSelect(day: number) {
        if (disabledProp || readOnly) return;
        const date: PatroJsDateProps = {year: view.year, month: view.month, day};
        select(date);
        if (closeOnSelect) setOpen(false);
    }

    function handleTodayClick() {
        if (disabledProp || readOnly) return;
        select(today);
        setView({year: today.year, month: today.month});
        if (closeOnSelect) setOpen(false);
    }

    const focusOpened = useRef(false);

    function handleInputFocus(e: React.FocusEvent<HTMLInputElement>) {
        if (disabledProp || readOnly) return;
        focusOpened.current = true;
        setOpen(true);
        onFocus?.(e);
    }

    /* ── keyboard navigation ──────────────────── */
    function handleGridKeyDown(e: React.KeyboardEvent) {
        const len = daysWithDisabled.length;
        let newIdx = focusedIndex;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                newIdx = findNext(daysWithDisabled, focusedIndex, -1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                newIdx = findNext(daysWithDisabled, focusedIndex, 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                newIdx = findNext(daysWithDisabled, focusedIndex, -7);
                break;
            case 'ArrowDown':
                e.preventDefault();
                newIdx = findNext(daysWithDisabled, focusedIndex, 7);
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                const cell = daysWithDisabled[focusedIndex];
                if (cell && !cell.isDisabled && !showOutsideDays) handleSelect(cell.day);
                return;
            case 'Escape':
                e.preventDefault();
                setOpen(false);
                inputRef.current?.focus();
                return;
            case 'Home':
                e.preventDefault();
                newIdx = findNext(daysWithDisabled, -1, 1);
                break;
            case 'End':
                e.preventDefault();
                newIdx = findNext(daysWithDisabled, len, -1);
                break;
            case 'PageUp':
                e.preventDefault();
                e.shiftKey ? prevYear() : prevMonth();
                return;
            case 'PageDown':
                e.preventDefault();
                e.shiftKey ? nextYear() : nextMonth();
                return;
            default:
                return;
        }

        if (newIdx >= 0 && newIdx < len && newIdx !== focusedIndex) {
            setFocusedIndex(newIdx);
            const btn = gridRef.current?.querySelector(`[data-didx="${newIdx}"]`) as HTMLElement | null;
            btn?.focus();
        }
    }

    /* ── swipe gesture ────────────────────────── */
    useSwipe(calendarRef, nextMonth, prevMonth, 50);

    const defaultCalendarIcon = (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
    );

    /* ── effects ──────────────────────────────── */

    // Reset focus index when month changes
    useEffect(() => {
        const idx = daysWithDisabled.findIndex((d) => d && !d.isDisabled);
        setFocusedIndex(idx >= 0 ? idx : -1);
    }, [view.year, view.month]);

    // Focus first day when popup opens
    useEffect(() => {
        if (open && gridRef.current) {
            const idx = daysWithDisabled.findIndex((d) => d && !d.isDisabled);
            if (idx >= 0) {
                setFocusedIndex(idx);
                const btn = gridRef.current.querySelector(`[data-didx="${idx}"]`) as HTMLElement | null;
                btn?.focus();
            }
        }
    }, [open]);

    /* ── portal positioning ────────────────────── */
    const calendarWidth = s.tokens.calendarWidth;

    useLayoutEffect(() => {
        if (!open || inline || !portal || typeof window === 'undefined') {
            if (!open) setPortalStyle(null);
            return;
        }

        const input = inputRef.current ?? containerRef.current;
        if (!input) return;

        function position() {
            const rect = input!.getBoundingClientRect();
            const gap = 6;
            const estimatedHeight = 400;
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            const openUpward = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;
            const left = Math.max(8, Math.min(rect.left, window.innerWidth - calendarWidth - 8));
            const top = openUpward ? rect.top - gap : rect.bottom + gap;
            setPortalStyle({top: `${top}px`, left: `${left}px`, width: `${calendarWidth}px`});
        }

        position();

        window.addEventListener('scroll', position, true);
        window.addEventListener('resize', position);

        return () => {
            window.removeEventListener('scroll', position, true);
            window.removeEventListener('resize', position);
        };
    }, [open, inline, portal, calendarWidth]);

    // Close on outside click
    useEffect(() => {
        if (!open || inline || !closeOnOutsideClick || typeof document === 'undefined') return;

        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node;
            const inContainer = containerRef.current?.contains(target);
            const inPortal = portal && portalRef.current?.contains(target);
            if (!inContainer && !inPortal) {
                if (!isOpenControlled) setInternalOpen(false);
                onOpenChange?.(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, inline, closeOnOutsideClick, isOpenControlled, onOpenChange, portal]);

    /* ── render helpers ───────────────────────── */

    function renderHeader() {
        const defaultHeader = (
            <div
                className={`pjs-header ${classNames.header || ''}`.trim()}
                style={styles.header}
            >
                <button
                    type="button"
                    className={`pjs-nav-btn ${classNames.navButton || ''}`.trim()}
                    style={styles.navButton}
                    onClick={prevYear}
                    aria-label={isNepali ? 'अघिल्लो वर्ष' : 'Previous year'}
                >
                    {'«'}
                </button>
                <button
                    type="button"
                    className={`pjs-nav-btn ${classNames.navButton || ''}`.trim()}
                    style={styles.navButton}
                    onClick={prevMonth}
                    aria-label={isNepali ? 'अघिल्लो महिना' : 'Previous month'}
                >
                    {s.navIcons.prev}
                </button>

                <div className={'pjs-select-group'}>
                    <select
                        className={`pjs-select ${classNames.select || ''}`.trim()}
                        style={styles.select}
                        value={view.month}
                        onChange={(e) => navTo(view.year, Number(e.target.value))}
                        aria-label={isNepali ? 'महिना' : 'Month'}
                    >
                        {monthData.allMonths.map((m, idx) => (
                            <option key={m} value={idx + 1}>
                                {m}
                            </option>
                        ))}
                    </select>

                    <select
                        className={`pjs-select ${classNames.select || ''}`.trim()}
                        style={styles.select}
                        value={view.year}
                        onChange={(e) => navTo(Number(e.target.value), view.month)}
                        aria-label={isNepali ? 'वर्ष' : 'Year'}
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>
                                {isNepali ? toNepaliDigits(y) : y}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="button"
                    className={`pjs-nav-btn ${classNames.navButton || ''}`.trim()}
                    style={styles.navButton}
                    onClick={nextMonth}
                    aria-label={isNepali ? 'अर्को महिना' : 'Next month'}
                >
                    {s.navIcons.next}
                </button>
                <button
                    type="button"
                    className={`pjs-nav-btn ${classNames.navButton || ''}`.trim()}
                    style={styles.navButton}
                    onClick={nextYear}
                    aria-label={isNepali ? 'अर्को वर्ष' : 'Next year'}
                >
                    {'»'}
                </button>
            </div>
        );

        return renderHeaderProp ? renderHeaderProp(defaultHeader) : defaultHeader;
    }

    function renderWeekdays() {
        const saturdayIndex = ((6 - weekStart) + 7) % 7;

        return (
            <div
                className={`pjs-weekdays ${classNames.weekRow || ''}`.trim()}
                style={styles.weekRow}
                role="row"
            >
                {weekDays.map((d, idx) => (
                    <div
                        key={d}
                        className={`pjs-weekday${idx === saturdayIndex && s.colors.saturdayColor ? ' pjs-weekday--saturday' : ''} ${classNames.dayLabel || ''}`.trim()}
                        style={styles.dayLabel}
                        role="columnheader"
                        aria-label={d}
                    >
                        {d}
                    </div>
                ))}
            </div>
        );
    }

    function renderGrid() {
        const isBordered = s.gridStyle === 'bordered';

        const gridClasses = [
            'pjs-grid',
            isBordered ? 'pjs-grid--bordered' : '',
            classNames.dayCell || '',
        ].filter(Boolean).join(' ');

        const gridBorderStyle: CSSProperties | undefined = isBordered
            ? {borderRadius: s.radius.day, ...styles.dayCell}
            : styles.dayCell;

        return (
            <div
                ref={gridRef}
                className={gridClasses}
                style={gridBorderStyle}
                role="grid"
                aria-label={isNepali ? `${monthData.monthName} ${toNepaliDigits(view.year)}` : `${monthData.monthName} ${view.year}`}
                onKeyDown={open || inline ? handleGridKeyDown : undefined}
            >
                {daysWithDisabled.map((cell, i) => {
                    if (!cell) {
                        return <div key={i} role="gridcell"/>;
                    }

                    const dim = getDaysInMonth(view.year, view.month);
                    const cellIsOutside = showOutsideDays && (cell.day < 1 || cell.day > dim);

                    if (renderDay) {
                        return (
                            <div key={i} data-didx={i}>
                                {renderDay(cell, {
                                    isDisabled: cell.isDisabled || disabledProp,
                                    isFocused: i === focusedIndex,
                                    onSelect: () => handleSelect(cell.day),
                                })}
                            </div>
                        );
                    }

                    const isSaturday = cell.adDate.getDay() === 6;

                    const cellClasses = [
                        'pjs-day',
                        cell.isToday ? 'pjs-day--today' : '',
                        cell.isSelected ? 'pjs-day--selected' : '',
                        cell.isDisabled ? 'pjs-day--disabled' : '',
                        cellIsOutside ? 'pjs-day--outside' : '',
                        isSaturday && s.colors.saturdayColor ? 'pjs-day--saturday' : '',
                        classNames.dayCell || '',
                        cell.isSelected ? classNames.selectedDay || '' : '',
                        cell.isToday ? classNames.today || '' : '',
                    ]
                        .filter(Boolean)
                        .join(' ');

                    const cellInlineStyle = cell.isDisabled
                        ? styles.dayCell
                        : cellIsOutside
                            ? styles.dayCell
                            : cell.isSelected
                                ? styles.selectedDay
                                : cell.isToday
                                    ? styles.today
                                    : styles.dayCell;

                    return (
                        <button
                            key={i}
                            type="button"
                            data-didx={i}
                            className={cellClasses}
                            style={cellInlineStyle}
                            onClick={() => !cellIsOutside && handleSelect(cell.day)}
                            disabled={cell.isDisabled || disabledProp || cellIsOutside}
                            role="gridcell"
                            aria-selected={cell.isSelected}
                            aria-label={
                                cellIsOutside
                                    ? `${outsideLabel}: ${isNepali ? toNepaliDigits(cell.day) : cell.day}`
                                    : isNepali
                                        ? `${toNepaliDigits(cell.day)} ${monthData.monthName} ${toNepaliDigits(view.year)}`
                                        : `${monthData.monthName} ${cell.day}, ${view.year}`
                            }
                            tabIndex={i === focusedIndex ? 0 : -1}
                        >
                            {isNepali ? toNepaliDigits(cell.day) : cell.day}
                        </button>
                    );
                })}
            </div>
        );
    }

    function renderFooter() {
        if (!showTodayButton) return null;

        const defaultFooter = (
            <div
                className={`pjs-footer ${classNames.footer || ''}`.trim()}
                style={styles.footer}
            >
                <button
                    type="button"
                    className={`pjs-today-btn ${classNames.todayButton || ''}`.trim()}
                    style={styles.todayButton}
                    onClick={handleTodayClick}
                    disabled={disabledProp}
                >
                    {todayText}
                </button>
            </div>
        );

        return renderFooterProp ? renderFooterProp(defaultFooter) : defaultFooter;
    }

    /* ── input change handler ─────────────────── */
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        inputTouched.current = true;
        const val = e.target.value;
        setInputValue(val);

        if (readOnly || disabledProp) return;

        // Try to parse and select
        const parsed = fmt.parse(val, language);
        if (parsed && fmt.isValid(val, language)) {
            select(parsed);
            setView({year: parsed.year, month: parsed.month});
        }
    }

    /* ── main render ──────────────────────────── */

    const containerClasses = [
        'pjs-container',
        minimal ? 'pjs-minimal' : '',
        inline ? 'pjs-container--inline' : '',
        error ? 'pjs-container--error' : '',
        loading ? 'pjs-container--loading' : '',
        classNames.container || '',
    ]
        .filter(Boolean)
        .join(' ');

    const inputClasses = [
        'pjs-input',
        error ? 'pjs-input--error' : '',
        icon !== false ? `pjs-input--has-icon-${iconPosition}` : '',
        classNames.input || '',
    ]
        .filter(Boolean)
        .join(' ');

    const inlineContainer = (
        <div ref={calendarRef}>
            {renderHeader()}
            {renderWeekdays()}
            {renderGrid()}
            {renderFooter()}
        </div>
    );

    if (inline) {
        return (
            <div
                ref={containerRef}
                className={containerClasses}
                style={{...cssVars, ...styles.container}}
                role="dialog"
                aria-label={isNepali ? 'मिति चयन गर्नुहोस्' : 'Date picker'}
                aria-invalid={error}
                aria-busy={loading}
            >
                {inlineContainer}
            </div>
        );
    }

    const portaledDropdown = open && portal && portalStyle && createPortal(
        <div
            ref={portalRef}
            className={`pjs-dropdown${minimal ? ' pjs-minimal' : ''} ${classNames.dropdown || ''}`.trim()}
            style={{
                position: 'fixed',
                top: portalStyle.top,
                left: portalStyle.left,
                width: portalStyle.width,
                ...(!minimal ? {
                    '--pjs-primary': s.colors.primary!,
                    '--pjs-primary-fg': s.colors.primaryBg!,
                    '--pjs-today-border': s.colors.todayBorder ?? s.colors.primary!, ...(s.colors.saturdayColor ? {'--pjs-saturday-color': s.colors.saturdayColor} : {})
                } as CSSProperties : undefined),
                ...styles.dropdown,
            }}
            role="dialog"
            aria-label={isNepali ? 'मिति चयन गर्नुहोस्' : 'Date picker'}
        >
            {inlineContainer}
        </div>,
        document.body,
    );

    const inlineDropdown = open && !portal && (
        <div
            className={`pjs-dropdown${minimal ? ' pjs-minimal' : ''} ${classNames.dropdown || ''}`.trim()}
            style={styles.dropdown}
            role="dialog"
            aria-label={isNepali ? 'मिति चयन गर्नुहोस्' : 'Date picker'}
        >
            {inlineContainer}
        </div>
    );

    return (
        <div
            ref={containerRef}
            className={containerClasses}
            style={{...cssVars, ...styles.container}}
        >
            <div className="pjs-input-wrapper">
                {icon !== false && iconPosition === 'start' && (
                    <span className="pjs-input-icon pjs-input-icon--start" aria-hidden="true">
            {icon ?? defaultCalendarIcon}
          </span>
                )}
                <input
                    ref={inputRef}
                    type="text"
                    className={inputClasses}
                    style={styles.input}
                    value={inputTouched.current ? inputValue : displayValue}
                    placeholder={placeholder}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={(e) => {
                        if (inputTouched.current) {
                            const val = inputValue;
                            if (val && !fmt.isValid(val, language)) {
                                inputTouched.current = false;
                                setInputValue(displayValue);
                            }
                        }
                        onBlur?.(e);
                    }}
                    readOnly={readOnly}
                    disabled={disabledProp}
                    aria-haspopup="dialog"
                    aria-expanded={open}
                    aria-label={isNepali ? 'मिति' : 'Date'}
                    aria-invalid={error}
                    aria-busy={loading}
                    autoComplete="off"
                />
                {icon !== false && iconPosition === 'end' && (
                    <span className="pjs-input-icon pjs-input-icon--end" aria-hidden="true">
            {icon ?? defaultCalendarIcon}
          </span>
                )}
            </div>

            {portaledDropdown}
            {inlineDropdown}
        </div>
    );
};
