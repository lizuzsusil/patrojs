'use client'

import type { PatroJsDateProps } from "@patrojs/core"
import { PatroDatePicker } from "@patrojs/react"
import {type SyntheticEvent, useState} from "react"
import { pad2 } from "./utils"

export function FormIntegration() {
  const [date, setDate] = useState<PatroJsDateProps | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (date) setSubmitted(true)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--pjs-text)' }}>
            Birth Date (BS)
          </label>
          <PatroDatePicker
            value={date}
            onChange={(bs) => setDate(bs)}
            placeholder="Select birth date"
          />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="example-btn" type="submit" disabled={!date}>
            Submit
          </button>
          <button className="example-btn" type="button" onClick={() => { setDate(null); setSubmitted(false) }}>
            Reset
          </button>
        </div>
      </form>
      {submitted && date && (
        <div
          style={{
            marginTop: 12,
            padding: '8px 12px',
            background: '#dcfce7',
            borderRadius: 8,
            fontSize: '0.85rem',
            color: '#166534',
          }}
        >
          Submitted: {date.year}/{pad2(date.month)}/{pad2(date.day)}
        </div>
      )}
    </div>
  )
}
