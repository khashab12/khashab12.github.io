import { m } from 'motion/react'
import type { ReactNode } from 'react'

/** Subtle fade-up on first view. Motion skips the movement under reduced motion (MotionConfig reducedMotion="user"). */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}

export function SectionTitle({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-[clamp(1.7rem,6vw,2.5rem)] font-bold tracking-tight">
      {children}
    </h2>
  )
}
