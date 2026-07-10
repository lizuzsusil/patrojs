'use client'

import { PatroDatePicker } from "@patrojs/react";

export function CustomHeaderFooter() {
  return (
    <PatroDatePicker
      renderHeader={(defaultHeader: React.ReactNode) => (
        <div style={{ textAlign: 'center', padding: 8, background: '#f0f4ff' }}>
          {defaultHeader}
        </div>
      )}
      renderFooter={(defaultFooter: React.ReactNode) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {defaultFooter}
          <button className="example-btn" onClick={() => alert('Custom action')} type="button">Custom</button>
        </div>
      )}
    />
  )
}