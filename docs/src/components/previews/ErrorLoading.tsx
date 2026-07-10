'use client'

import { PatroDatePicker } from "@patrojs/react"
import { useState } from "react"

export function ErrorLoading() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PatroDatePicker defaultValue={{ year: 2081, month: 1, day: 15 }} error={error} />
      <PatroDatePicker defaultValue={{ year: 2081, month: 1, day: 15 }} loading={loading} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="example-btn" onClick={() => setError((v) => !v)} type="button">
          {error ? 'Clear Error' : 'Toggle Error'}
        </button>
        <button className="example-btn" onClick={() => setLoading((v) => !v)} type="button">
          {loading ? 'Clear Loading' : 'Toggle Loading'}
        </button>
      </div>
    </div>
  )
}