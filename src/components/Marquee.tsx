import type { ReactNode } from 'react'

/**
 * Infinite marquee, adapted from magicui's Marquee (via 21st.dev):
 * CSS-only transform animation, RTL-aware, pauses on hover, static when reduced motion is on.
 */
export function Marquee({ children, repeat = 3, duration = 40, className = '' }: { children: ReactNode; repeat?: number; duration?: number; className?: string }) {
  return (
    <div
      className={`marquee group flex overflow-hidden [gap:var(--gap)] ${className}`}
      style={{ ['--duration' as string]: `${duration}s`, ['--gap' as string]: '1.5rem' }}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className="marquee-track flex shrink-0 animate-marquee items-center justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]"
        >
          {children}
        </div>
      ))}
    </div>
  )
}
