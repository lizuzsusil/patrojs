import { formatBsDatePattern, getDaysInMonth } from '@patrojs/core';
import type { PatroJsDateProps, PatroJsLanguage, PatroJsFormatPattern, PatroJsFormatter } from '@patrojs/core';

function defaultFormat(date: PatroJsDateProps, lang: PatroJsLanguage, pattern?: PatroJsFormatPattern): string {
  return formatBsDatePattern(date, lang, pattern);
}

function defaultParse(value: string, _lang: PatroJsLanguage): PatroJsDateProps | null {
  const nepalDigits = /[०१२३४५६७८९]/;

  if (nepalDigits.test(value)) {
    const latin = value.split('').map(ch => {
      const map: Record<string, string> = { '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9' };
      return map[ch] ?? ch;
    }).join('').replace(/[^0-9-]/g, '');
    const parts = latin.split('-').filter(Boolean);
    if (parts.length === 3) {
      const [y, m, d] = parts.map(Number);
      if (!isNaN(y) && !isNaN(m) && !isNaN(d)) return { year: y, month: m, day: d };
    }
    return null;
  }

  const cleaned = value.replace(/[^0-9\-/.]/g, '');
  const sep = cleaned.includes('/') ? '/' : cleaned.includes('-') ? '-' : null;
  if (!sep) return null;

  const parts = cleaned.split(sep).map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;

  if (parts[0] > 999) return { year: parts[0], month: parts[1], day: parts[2] };
  return { year: parts[2], month: parts[1], day: parts[0] };
}

function defaultIsValid(value: string, _lang: PatroJsLanguage): boolean {
  const parsed = defaultParse(value, _lang);
  if (!parsed) return false;
  if (parsed.year < 2000 || parsed.year > 2099) return false;
  if (parsed.month < 1 || parsed.month > 12) return false;
  const dim = getDaysInMonth(parsed.year, parsed.month);
  return parsed.day >= 1 && parsed.day <= dim;
}

function defaultPlaceholder(lang: PatroJsLanguage, pattern?: PatroJsFormatPattern): string {
  return formatBsDatePattern({ year: 2081, month: 1, day: 15 }, lang, pattern);
}

export function createDefaultFormatter(pattern?: PatroJsFormatPattern): PatroJsFormatter {
  return {
    format: (date, lang) => defaultFormat(date, lang, pattern),
    parse: defaultParse,
    isValid: defaultIsValid,
    placeholder: (lang) => defaultPlaceholder(lang, pattern),
  };
}
