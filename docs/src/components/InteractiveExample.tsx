'use client'

import {type ReactNode, useState} from 'react'

interface InteractiveExampleProps {
  code: string
  tsxCode?: string
  children: ReactNode
}

export default function InteractiveExample({ code, tsxCode, children }: InteractiveExampleProps) {
  const [showCode, setShowCode] = useState(false)
  const [lang, setLang] = useState<'jsx' | 'tsx'>('jsx')

  const hasTabs = tsxCode !== undefined

  return (
    <div className="interactive-example">
      <div className="interactive-example-preview">
        {children}
      </div>
      <div className="interactive-example-toolbar">
        <button
          className="interactive-example-toggle"
          onClick={() => setShowCode((v) => !v)}
          aria-expanded={showCode}
        >
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
      </div>
      {showCode && (
        <div className="interactive-example-code">
          {hasTabs && (
            <div className="interactive-example-tabs">
              <button
                className={`interactive-example-tab${lang === 'jsx' ? ' active' : ''}`}
                onClick={() => setLang('jsx')}
              >
                JSX
              </button>
              <button
                className={`interactive-example-tab${lang === 'tsx' ? ' active' : ''}`}
                onClick={() => setLang('tsx')}
              >
                TSX
              </button>
            </div>
          )}
          <pre>
            <code>{lang === 'jsx' ? code : (tsxCode ?? code)}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
