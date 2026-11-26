import { useEffect, useRef, useState } from 'react'
import { isFinePointer, prefersCalm } from '../lib/fx'

/**
 * Dot + trailing ring. Grows over links; over [data-cursor="…"] it fills and shows that label.
 * Mouse/trackpad only; never rendered for touch or reduced motion.
 */
export function Cursor() {
  const [on, setOn] = useState(false)
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isFinePointer() || prefersCalm()) return
    setOn(true)
  }, [])

  useEffect(() => {
    if (!on) return
    document.documentElement.classList.add('has-cursor')
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0
    let seen = false
    const move = (e: PointerEvent) => {
      if (!seen) {
        seen = true
        rx = e.clientX
        ry = e.clientY
        show()
      }
      x = e.clientX
      y = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`
      const target = e.target as Element | null
      const labelled = target?.closest?.('[data-cursor]') as HTMLElement | null
      const link = target?.closest?.('a, button, [role="radio"]')
      const r = ring.current
      if (!r) return
      r.classList.toggle('is-label', !!labelled)
      r.classList.toggle('is-link', !labelled && !!link)
      if (labelled && label.current) label.current.textContent = labelled.dataset.cursor ?? ''
    }
    const loop = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }
    function show() {
      if (ring.current && dot.current) ring.current.style.opacity = dot.current.style.opacity = '1'
    }
    const hide = () => ring.current && (ring.current.style.opacity = dot.current!.style.opacity = '0')
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', hide)
    document.addEventListener('pointerenter', show)
    raf = requestAnimationFrame(loop)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', hide)
      document.removeEventListener('pointerenter', show)
      cancelAnimationFrame(raf)
    }
  }, [on])

  if (!on) return null
  return (
    <>
      <div ref={ring} className="cursor-ring" style={{ opacity: 0 }} aria-hidden>
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" style={{ opacity: 0 }} aria-hidden />
    </>
  )
}
