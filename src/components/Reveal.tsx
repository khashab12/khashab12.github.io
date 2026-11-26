import { m } from 'motion/react'
import type { ReactNode } from 'react'

/** Fade-up on first view (works on touch too). Motion skips the movement under reduced motion. */
export function Reveal({ children, className = '', delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  )
}

/** One header pattern for every section: small label, big title, grey subtitle — centred. */
export function SectionHead({ id, label, title, sub }: { id?: string; label?: string; title: ReactNode; sub?: ReactNode }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      {label && <p className="font-display text-sm font-medium text-accent-strong">{label}</p>}
      <h2 id={id} className="mt-3 text-[clamp(2.1rem,6.5vw,3.8rem)] font-bold leading-[1.08] tracking-tight">
        {title}
      </h2>
      {sub && <p className="mx-auto mt-4 max-w-2xl text-[clamp(1.05rem,3.4vw,1.25rem)] leading-relaxed text-muted">{sub}</p>}
    </Reveal>
  )
}

/** Kept for older call sites. */
export function SectionTitle({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-[clamp(1.9rem,6vw,3rem)] font-bold tracking-tight">
      {children}
    </h2>
  )
}
