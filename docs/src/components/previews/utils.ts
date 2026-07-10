import type { PatroJsFormatter } from '@patrojs/react'

export function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function parseDDMMYYYY(value: string) {
  const parts = value.split('/')

  if (parts.length !== 3) return null

  const [d, m, y] = parts.map(Number)

  return isNaN(y) || isNaN(m) || isNaN(d)
    ? null
    : {
        year: y,
        month: m,
        day: d,
      }
}

export const customFormatter: PatroJsFormatter = {
  format: (date) => `${date.day}/${date.month}/${date.year}`,
  parse: parseDDMMYYYY,
  isValid: (value) => {
    const parsed = parseDDMMYYYY(value)

    return parsed !== null && parsed.year >= 2000 && parsed.year <= 2099
  },
  placeholder: () => 'DD/MM/YYYY',
}