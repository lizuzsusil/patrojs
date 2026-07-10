'use client'

import type { PatroJsDay } from "@patrojs/core";
import { PatroDatePicker } from "@patrojs/react";

export function CustomDay() {
  return (
    <PatroDatePicker
      renderDay={(day: PatroJsDay, { isDisabled, onSelect }) => (
        <div
          onClick={isDisabled ? undefined : onSelect}
          style={{
            background: day.isSelected ? '#0d6efd' : 'transparent',
            color: day.isSelected ? 'white' : 'inherit',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            opacity: isDisabled ? 0.4 : 1,
            fontWeight: day.isToday ? 700 : 400,
            padding: 8,
            borderRadius: 8,
            textAlign: 'center',
          }}
        >
          {day.day}
        </div>
      )}
    />
  )
}
