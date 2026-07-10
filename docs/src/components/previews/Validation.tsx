'use client'

import { PatroDatePicker } from "@patrojs/react";

export function Validation() {
  return (
    <PatroDatePicker
      defaultValue={{ year: 2081, month: 6, day: 15 }}
      minDate={{ year: 2081, month: 1, day: 1 }}
      maxDate={{ year: 2081, month: 12, day: 30 }}
      disabledDates={(d) => d.day === 15}
      disabledWeekdays={[0, 6]}
    />
  )
}