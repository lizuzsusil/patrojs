'use client';

import { fadeUp } from '@/lib/utils'
import { motion, useReducedMotion } from 'motion/react'
import type {ReactNode} from "react";

function Reveal({
  children,
  className,
  id,
  as: Tag = motion.section,
}: {
  children: ReactNode
  className?: string
  id?: string
  as?: typeof motion.section | typeof motion.div
}) {
  const reduced = useReducedMotion()
  if (reduced) {
    const Static = Tag === motion.section ? 'section' : 'div'
    return (
      <Static id={id} className={className}>
        {children}
      </Static>
    )
  }
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
    >
      {children}
    </Tag>
  )
}

export default Reveal;