'use client'

import { PatroDatePicker } from "@patrojs/react"
import { useCallback, useState } from "react"

export function Events() {
  const [logs, setLogs] = useState<string[]>([])

  const log = useCallback((msg: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5))
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <PatroDatePicker
        onChange={(bs, ad) => log(`Selected: ${bs.year}/${bs.month}/${bs.day} (AD: ${ad})`)}
        onMonthChange={(year, month) => log(`Month: ${year}/${month}`)}
        onYearChange={(year) => log(`Year: ${year}`)}
        onFocus={() => log('Focused')}
        onBlur={() => log('Blurred')}
        onOpenChange={(open) => log(open ? 'Opened' : 'Closed')}
      />
      <div
        style={{
          background: 'var(--pjs-bg-subtle)',
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--pjs-text-secondary)',
          minHeight: 60,
        }}
      >
        {logs.length === 0 ? (
          <span style={{ color: 'var(--pjs-text-muted)' }}>
            Interact with the picker to see events&hellip;
          </span>
        ) : (
          logs.map((msg, i) => <div key={i}>{msg}</div>)
        )}
      </div>
    </div>
  )
}