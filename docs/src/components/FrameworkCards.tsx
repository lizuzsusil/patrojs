'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import {messages} from "@/lib/constants";

const frameworks = [
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 100 100" fill="none" className="fw-card-icon">
        <circle cx="50" cy="50" r="8.8" fill="#61DAFB" />
        <path stroke="#61DAFB" strokeWidth="5" d="M50 68C76 68 97.3 60 97.3 50S76 32 50 32 2.7 40 2.7 50 24 68 50 68Z" />
        <path stroke="#61DAFB" strokeWidth="5" d="M34.7 59C47.7 81.6 65.3 96 74 91s5-27.4-8-50S35.3 4 26.7 9s-5 27.4 8 50Z" />
        <path stroke="#61DAFB" strokeWidth="5" d="M34.7 41c-13 22.6-16.6 45-8 50s26.2-9.3 39.3-32 16.6-45 8-50S47.7 18 34.7 41Z" />
      </svg>
    ),
    status: 'active' as const,
    href: '/getting-started',
    badge: 'Available Now',
  },
  {
    name: 'Vue',
    icon: (
      <svg viewBox="0 0 100 100" className="fw-card-icon">
        <path fill="#41B883" d="M80 7h20L50 93.25 0 7h38.25L50 27 61.5 7z" />
        <path fill="#41B883" d="m0 7 50 86.25L100 7H80L50 58.75 19.75 7z" />
        <path fill="#35495E" d="M19.75 7 50 59 80 7H61.5L50 27 38.25 7z" />
      </svg>
    ),
    status: 'coming-soon' as const,
    badge: 'Coming Soon',
  },
  {
    name: 'Angular',
    icon: (
        <svg height={18} width={18} fill="none" viewBox="0 0 223 236"><g clipPath="url(#a)"><path fill="url(#b)" d="m222.077 39.192-8.019 125.923L137.387 0zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301zM111.039 62.675l30.357 73.803H80.681zM7.937 165.115 0 39.192 84.69 0z"/><path fill="url(#c)" d="m222.077 39.192-8.019 125.923L137.387 0zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301zM111.039 62.675l30.357 73.803H80.681zM7.937 165.115 0 39.192 84.69 0z"/></g><defs><linearGradient id="b" x1="49.009" x2="225.829" y1="213.75" y2="129.722" gradientUnits="userSpaceOnUse"><stop stopColor="#E40035"/><stop offset=".24" stopColor="#F60A48"/><stop offset=".352" stopColor="#F20755"/><stop offset=".494" stopColor="#DC087D"/><stop offset=".745" stopColor="#9717E7"/><stop offset="1" stopColor="#6C00F5"/></linearGradient><linearGradient id="c" x1="41.025" x2="156.741" y1="28.344" y2="160.344" gradientUnits="userSpaceOnUse"><stop stopColor="#FF31D9"/><stop offset="1" stopColor="#FF5BE1" stopOpacity="0"/></linearGradient><clipPath id="a"><path fill="#fff" d="M0 0h223v236H0z"/></clipPath></defs></svg>
    ),
    status: 'coming-soon' as const,
    badge: 'Coming Soon',
  },
]

export default function FrameworkCards() {
  const router = useRouter()
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500)
      return () => clearTimeout(timer)
    }
  }, [toast])

  return (
    <>
        <div className="hp-resources-grid">
          {frameworks.map((fw) => {
            const isActive = fw.status === 'active'
            return (
              <button
                key={fw.name}
                className={`hp-resource-card cursor-pointer`}
                onClick={() => {
                  if (isActive) {
                    router.push(fw.href!)
                  } else {
                    setToast(messages[Math.floor(Math.random() * messages.length)])
                  }
                }}
              >
                <div className="hp-resource-icon">{fw.icon}</div>
                <div className="hp-resource-content">
                  <div className="hp-resource-title">
                    {fw.name}
                    <span className={`fw-card-badge ${fw.status}`}>{fw.badge}</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

      {toast && (
        <div className="fw-toast" role="alert">
          <span>{toast}</span>
        </div>
      )}
    </>
  )
}
