'use client';

import { fadeUp } from "@/lib/utils"
import { motion, useReducedMotion } from "motion/react"

function StaggerItem({
  children,
  className,
  href,
  target,
  rel,
}: {
  children: React.ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
}) {
  const reduced = useReducedMotion()
  const variants = reduced ? undefined : fadeUp
  if (href) {
    return (
      <motion.a variants={variants} className={className} href={href} target={target} rel={rel}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

export default StaggerItem;