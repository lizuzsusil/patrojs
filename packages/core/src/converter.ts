import { BIKRAM_SAMBAT, AD_EPOCH } from './data';
import type { PatroJsDateProps } from './types';

/**
 * Converts a Bikram Sambat (BS) date to its equivalent
 * Gregorian (AD) date as an ISO string (`YYYY-MM-DD`).
 *
 * The conversion calculates the number of days elapsed since
 * the BS reference date (2000/01/01) and adds that offset to
 * the corresponding Gregorian epoch (1943-04-14).
 *
 * @param bsDate - The Bikram Sambat date to convert.
 * @returns The equivalent Gregorian date in `YYYY-MM-DD` format.
 */
export function bsToAd(bsDate: PatroJsDateProps): string {
    const { year, month, day } = bsDate;
    let daysDiff = 0;

    for (let i = 2000; i <= year; i++) {
        if (i === year) {
            for (let j = 1; j < month; j++) {
                daysDiff += BIKRAM_SAMBAT[i][j];
            }
            daysDiff += day - 1;
        } else {
            for (let j = 1; j <= 12; j++) {
                daysDiff += BIKRAM_SAMBAT[i][j];
            }
        }
    }

    const result = new Date(AD_EPOCH);
    result.setDate(result.getDate() + daysDiff);

    const y = result.getFullYear();
    const m = result.getMonth() + 1;
    const d = result.getDate();
    return `${y}-${m > 9 ? m : '0' + m}-${d > 9 ? d : '0' + d}`;
}

/**
 * Converts a Bikram Sambat (BS) date to a JavaScript `Date` object.
 *
 * This is a convenience wrapper around `bsToAd`, returning the
 * converted Gregorian date as a native `Date` instance.
 *
 * @param bsDate - The Bikram Sambat date to convert.
 * @returns A JavaScript `Date` object representing the equivalent
 * Gregorian date.
 */
export function bsToAdDate(bsDate: PatroJsDateProps): Date {
    return new Date(bsToAd(bsDate));
}

/**
 * Converts a Gregorian (AD) date to its equivalent
 * Bikram Sambat (BS) date.
 *
 * The conversion calculates the number of days elapsed since
 * the Gregorian reference epoch (1943-04-14) and traverses
 * the Bikram Sambat calendar data to determine the matching
 * BS year, month, and day.
 *
 * @param adDate - The Gregorian date to convert.
 * @returns The equivalent Bikram Sambat date.
 */
export function adToBs(adDate: Date): PatroJsDateProps {
    const startDate = new Date(AD_EPOCH);
    const daysElapsed = Math.floor(
        (adDate.getTime() - startDate.getTime()) / 86400000
    );

    let totalD = 0;
    let year = 0;
    let month = 0;
    let day = 0;
    let found = false;

    for (let i = 2000; i < 2100 && !found; i++) {
        for (let j = 1; j <= 12; j++) {
            totalD += BIKRAM_SAMBAT[i][j];
            if (daysElapsed - totalD < 0) {
                day = daysElapsed - totalD + BIKRAM_SAMBAT[i][j] + 1;
                year = i;
                month = j;
                found = true;
                break;
            }
        }
    }

    return { year, month, day };
}

/**
 * Returns today's date in the Bikram Sambat (BS) calendar.
 *
 * This function converts the current system date from the
 * Gregorian calendar into its BS equivalent.
 *
 * @returns Today's Bikram Sambat date.
 */
export function todayBs(): PatroJsDateProps {
    return adToBs(new Date());
}