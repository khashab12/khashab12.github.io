import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Infinite marquee, adapted from magicui's Marquee (via 21st.dev):
 * CSS-only transform animation (styles in index.css), RTL-aware, pauses on hover, edge fade;
 * with reduced motion it shows one wrapped, fully readable copy.
 */
export function Marquee({ children, repeat = 4, duration = 40, className = '' }: { children: ReactNode; repeat?: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  // Off-screen marquees stop animating (saves battery and keeps scrolling smooth on phones).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-off', !e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`marquee flex overflow-hidden [gap:var(--gap)] ${className}`}
      style={{ ['--duration' as string]: `${duration}s`, ['--gap' as string]: '1.5rem' }}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          inert={i > 0 || undefined}
          className="marquee-track flex shrink-0 items-center justify-around [gap:var(--gap)]"
        >
          {children}
        </div>
      ))}
    </div>
  )
}
