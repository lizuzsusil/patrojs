'use client'

import { useState } from 'react'
import { PatroDatePicker } from '@patrojs/react'
import type { PatroJsDateProps } from '@patrojs/core'
import { pad2 } from './utils'

export function BasicControlled() {
  const [date, setDate] = useState<PatroJsDateProps | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <PatroDatePicker minimal value={date} onChange={setDate} />

      {date && (
        <p
          style={{
            margin: 0,
            fontSize: '0.9rem',
            color: 'var(--pjs-text-secondary)',
          }}
        >
          Selected: {date.year}/{pad2(date.month)}/{pad2(date.day)}
        </p>
      )}
    </div>
  )
}