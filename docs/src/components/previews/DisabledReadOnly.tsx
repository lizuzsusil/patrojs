'use client'

import { PatroDatePicker } from "@patrojs/react";

export function DisabledReadOnly() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--pjs-text-secondary)' }}>Disabled</span>
        <PatroDatePicker disabled />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--pjs-text-secondary)' }}>Read Only</span>
        <PatroDatePicker readOnly />
      </div>
    </div>
  )
}