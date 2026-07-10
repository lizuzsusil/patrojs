'use client'

import { todayBs, bsToAd } from '@patrojs/core'
import { pad2 } from './utils'

export function Conversion() {
  const today = todayBs()
  const todayAD = bsToAd(today)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ margin: 0 }}>
        Today BS: <code>{today.year}/{pad2(today.month)}/{pad2(today.day)}</code>
      </p>

      <p style={{ margin: 0 }}>
        Today AD: <code>{todayAD}</code>
      </p>
    </div>
  )
}