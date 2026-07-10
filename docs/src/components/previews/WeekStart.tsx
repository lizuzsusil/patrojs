'use client'

import { PatroDatePicker } from "@patrojs/react";

export function WeekStart() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--pjs-text-secondary)' }}>
        Week starts on Monday, showing adjacent month days:
      </p>
      <PatroDatePicker weekStart={1} showOutsideDays />
    </div>
  )
}