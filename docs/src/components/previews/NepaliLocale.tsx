'use client'

import type { PatroJsDateProps } from "@patrojs/core"
import { PatroDatePicker } from "@patrojs/react"
import { useState } from "react"
import { pad2 } from "./utils"

export function NepaliLocale() {
  const [date, setDate] = useState<PatroJsDateProps | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <PatroDatePicker
        value={date}
        onChange={(bs) => setDate(bs)}
        language="ne"
        formatPattern="DD Month YYYY"
      />
      {date && (
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--pjs-text-secondary)' }}>
          चयन: {date.year}/{pad2(date.month)}/{pad2(date.day)}
        </p>
      )}
    </div>
  )
}