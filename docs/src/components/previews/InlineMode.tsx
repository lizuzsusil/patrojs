'use client'

import { PatroDatePicker } from "@patrojs/react";

export function InlineMode() {
  return (
    <div style={{ width: 320, maxWidth: '100%' }}>
      <PatroDatePicker inline />
    </div>
  )
}