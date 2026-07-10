'use client'

import { PatroDatePicker } from "@patrojs/react";

export function CustomFormat() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <PatroDatePicker formatPattern="DD/MM/YYYY" />
      <PatroDatePicker formatPattern="DD Month YYYY" />
      <PatroDatePicker formatPattern="MMMM DD, YYYY" />
    </div>
  )
}