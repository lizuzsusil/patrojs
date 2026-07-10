'use client'

import { PatroDatePicker } from "@patrojs/react"
import { useState } from "react"

export function ControlledOpen() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <PatroDatePicker open={open} onOpenChange={setOpen} closeOnSelect={false} />
      <div>
        <button className="example-btn" onClick={() => setOpen((v) => !v)} type="button">
          {open ? 'Close' : 'Open'} Picker
        </button>
      </div>
    </div>
  )
}