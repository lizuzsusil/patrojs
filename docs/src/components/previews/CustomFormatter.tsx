'use client'

import { PatroDatePicker } from '@patrojs/react'
import { customFormatter } from './utils'

export function CustomFormatter() {
  return <PatroDatePicker formatter={customFormatter} classNames={{}} />
}