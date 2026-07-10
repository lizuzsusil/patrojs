'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface PropDef {
  name: string
  type: string
  typeDefinition?: string
  defaultValue: string
  description: string
}

export default function PropsTable({ props }: { props: PropDef[] }) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)
  const hideTimer = useRef<number>(0)

  const showTooltip = useCallback((text: string, e: React.MouseEvent) => {
    window.clearTimeout(hideTimer.current)
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setTooltip({
      text,
      x: rect.left + rect.width / 2,
      y: rect.top - 12,
    })
  }, [])

  const hideTooltip = useCallback(() => {
    hideTimer.current = window.setTimeout(() => setTooltip(null), 100)
  }, [])

  useEffect(() => {
    return () => window.clearTimeout(hideTimer.current)
  }, [])

  return (
    <div className="props-table-wrapper">
      <table className="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td><code>{prop.name}</code></td>
              <td>
                {prop.typeDefinition ? (
                  <span
                    className="type-cell"
                    onMouseEnter={(e) => showTooltip(prop.typeDefinition!, e)}
                    onMouseLeave={hideTooltip}
                    tabIndex={0}
                    role="button"
                    aria-label={`Type: ${prop.type}`}
                  >
                    <code>{prop.type}</code>
                  </span>
                ) : (
                  <code>{prop.type}</code>
                )}
              </td>
              <td>{prop.defaultValue === '\u2013' ? '\u2013' : <code>{prop.defaultValue}</code>}</td>
              <td dangerouslySetInnerHTML={{ __html: prop.description }} />
            </tr>
          ))}
        </tbody>
      </table>
      {tooltip && (
        <div
          className="type-tooltip"
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
          }}
          onMouseEnter={() => window.clearTimeout(hideTimer.current)}
          onMouseLeave={hideTooltip}
        >
          <pre>{tooltip.text}</pre>
        </div>
      )}
    </div>
  )
}
