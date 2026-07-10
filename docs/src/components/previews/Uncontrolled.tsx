'use client'

import { PatroDatePicker } from "@patrojs/react";

export function Uncontrolled() {
  return (
    <PatroDatePicker
      defaultValue={{ year: 2081, month: 4, day: 1 }}
      onChange={(bs) => console.log('Selected:', bs)}
    />
  )
}