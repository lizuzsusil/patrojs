import React, {useEffect, useMemo, useRef, useState} from 'react';
import {bsToAd, DEFAULT_CONFIG, formatBsDate, getMonthData, todayBs, toNepaliDigits,} from '../../core/src';

import {useStyleResolver} from './useStyleResolver';
import type {PatroJsProps} from './types';

import './styles/PatroDatePicker.css';

export const PatroDatePicker = ({
                                     value = null,
                                     onChange,
                                     language = 'en',
                                     placeholder = 'Select date',

                                     showTodayButton = true,
                                     todayLabel,

                                     closeOnSelect = false,
                                     closeOnOutsideClick = true,

                                     config = DEFAULT_CONFIG,
                                     styles = {},
                                     classNames = {},
                                 }: PatroJsProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const today = todayBs();
    const isNepali = language === 'ne';

    const [view, setView] = useState({
        year: today.year,
        month: today.month,
    });

    const [open, setOpen] = useState(false);

    const s = useStyleResolver(config, styles);

    const hasCustomConfig = Object.keys(config || {}).length > 0;

    const monthData = getMonthData(view.year, view.month, value, language);

    const displayValue = value
        ? formatBsDate(value.year, value.month, value.day, language)
        : '';

    const todayText = todayLabel ?? (isNepali ? 'आज' : 'Today');

    const years = useMemo(() => {
        const range: number[] = [];
        for (let y = today.year - 60; y <= today.year + 10; y++) {
            range.push(y);
        }
        return range;
    }, [today.year]);

    function prevMonth() {
        setView(v =>
            v.month === 1
                ? {year: v.year - 1, month: 12}
                : {year: v.year, month: v.month - 1}
        );
    }

    function nextMonth() {
        setView(v =>
            v.month === 12
                ? {year: v.year + 1, month: 1}
                : {year: v.year, month: v.month + 1}
        );
    }

    function handleSelect(day: number) {
        const selected = {year: view.year, month: view.month, day};
        onChange?.(selected, bsToAd(selected));

        if (closeOnSelect) setOpen(false);
    }

    function handleTodayClick() {
        onChange?.(today, bsToAd(today));
        setView({year: today.year, month: today.month});

        if (closeOnSelect) setOpen(false);
    }

    // Outside click
    useEffect(() => {
        if (!open || !closeOnOutsideClick) return;

        function handleClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [open, closeOnOutsideClick]);

    // ESC close
    useEffect(() => {
        if (!open) return;

        function handleEsc(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false);
        }

        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [open]);

    return (
        <div
            ref={containerRef}
            className={`ndp-container ${classNames.container || ''}`}
            style={
                hasCustomConfig
                    ? ({
                        '--ndp-calendar-width': s.tokens.calendarWidth + 'px',
                        '--ndp-input-width': s.tokens.calendarWidth - 40 + 'px',
                        '--ndp-input-padding': s.tokens.inputPadding,
                        '--ndp-calendar-padding': s.tokens.calendarPadding,

                        '--ndp-day-size': s.tokens.dayCell + 'px',
                        '--ndp-font-size': s.tokens.fontSize + 'px',
                        '--ndp-header-font-size': s.tokens.headerFontSize + 'px',

                        '--ndp-primary': s.colors.primary,
                        '--ndp-primary-fg': s.colors.primaryFg,

                        '--ndp-radius-calendar': s.radius.calendar,
                        '--ndp-radius-input': s.radius.input,
                        '--ndp-radius-day': s.radius.day,
                        '--ndp-radius-nav': s.radius.navBtn,
                        '--ndp-radius-select': s.radius.select,
                        '--ndp-radius-today': s.radius.todayBtn,
                    } as React.CSSProperties)
                    : undefined
            }
        >
            {/* Input */}
            <input
                className={`ndp-input ${classNames.input || ''}`}
                value={displayValue}
                placeholder={placeholder}
                onClick={() => setOpen(true)}
                readOnly
            />

            {/* Dropdown */}
            {open && (
                <div className={`ndp-dropdown ${classNames.dropdown || ''}`}>
                    {/* Header */}
                    <div className={`ndp-header ${classNames.header || ''}`}>
                        <button
                            className={`ndp-nav-btn ${classNames.navButton || ''}`}
                            onClick={prevMonth}
                        >
                            {s.navIcons.prev}
                        </button>

                        <div className="ndp-select-group">
                            <select
                                className="ndp-select"
                                value={view.month}
                                onChange={e =>
                                    setView(v => ({...v, month: Number(e.target.value)}))
                                }
                            >
                                {monthData.allMonths.map((m, idx) => (
                                    <option key={m} value={idx + 1}>
                                        {m}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="ndp-select"
                                value={view.year}
                                onChange={e =>
                                    setView(v => ({...v, year: Number(e.target.value)}))
                                }
                            >
                                {years.map(y => (
                                    <option key={y} value={y}>
                                        {isNepali ? toNepaliDigits(y) : y}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            className={`ndp-nav-btn ${classNames.navButton || ''}`}
                            onClick={nextMonth}
                        >
                            {s.navIcons.next}
                        </button>
                    </div>

                    {/* Weekdays */}
                    <div className="ndp-weekdays">
                        {monthData.weekDays.map(d => (
                            <div key={d} className="ndp-weekday">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Days */}
                    <div className="ndp-grid">
                        {monthData.days.map((cell, i) =>
                            cell ? (
                                <button
                                    key={i}
                                    className={[
                                        'ndp-day',
                                        cell.isToday ? 'today' : '',
                                        cell.isSelected ? 'selected' : '',
                                    ].join(' ')}
                                    onClick={() => handleSelect(cell.day)}
                                >
                                    {isNepali
                                        ? toNepaliDigits(cell.day)
                                        : cell.day}
                                </button>
                            ) : (
                                <div key={i}/>
                            )
                        )}
                    </div>

                    {/* Footer */}
                    {showTodayButton && (
                        <div className="ndp-footer">
                            <button
                                className="ndp-today-btn"
                                onClick={handleTodayClick}
                            >
                                {todayText}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}