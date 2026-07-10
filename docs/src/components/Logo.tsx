'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Logo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Image src="/logo.webp" alt="logo" width={62} height={42} />
    )
  }

  return (
    <Image
      src={resolvedTheme === 'dark' ? '/logo.webp' : '/logo.webp'}
      alt="logo"
      width={62}
      height={42}
      priority
    />
  )
}