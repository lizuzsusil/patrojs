'use client'

import { PatroDatePicker } from "@patrojs/react";

export function CustomTheme() {
  return (
    <PatroDatePicker
      config={{
        size: 'lg',
        colors: { primary: '#16a34a', primaryBg: '#ffffff' },
        radius: { calendar: '16px', day: '12px' },
        gridStyle: 'bordered',
        navIcons: { prev: '\u25C0', next: '\u25B6' },
      }}
    />
  )
}