import { useEffect, useRef } from 'react'
import { reducedMotion } from '../lib/scroll'

/** A tall menu screenshot that scrolls slowly up and down inside the phone. */
export function AutoScrollScreen({ src, width, height }: { src: string; width: number; height: number }) {
  const viewport = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const box = viewport.current
    const el = img.current
    if (!box || !el || reducedMotion() || !('animate' in el)) return

    let anim: Animation | undefined
    let visible = true
    let held = false
    const sync = () => {
      if (!anim) return
      if (visible && !held) anim.play()
      else anim.pause()
    }

    const start = () => {
      anim?.cancel()
      const distance = el.getBoundingClientRect().height - box.getBoundingClientRect().height
      if (distance <= 0) return
      const duration = Math.max(14000, distance * 16) // ~60px per second
      anim = el.animate(
        [
          { transform: 'translateY(0)', offset: 0 },
          { transform: 'translateY(0)', offset: 0.06 },
          { transform: `translateY(${-distance}px)`, offset: 0.94 },
          { transform: `translateY(${-distance}px)`, offset: 1 },
        ],
        { duration, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out', delay: 1400 },
      )
      sync()
    }

    if (el.complete) start()
    else el.addEventListener('load', start, { once: true })

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    io.observe(box)
    const ro = new ResizeObserver(() => el.complete && start())
    ro.observe(box)

    const hold = () => ((held = true), sync())
    const release = () => ((held = false), sync())
    box.addEventListener('pointerenter', hold)
    box.addEventListener('pointerleave', release)
    box.addEventListener('pointerdown', hold)
    box.addEventListener('pointerup', release)
    box.addEventListener('pointercancel', release)

    return () => {
      anim?.cancel()
      io.disconnect()
      ro.disconnect()
      box.removeEventListener('pointerenter', hold)
      box.removeEventListener('pointerleave', release)
      box.removeEventListener('pointerdown', hold)
      box.removeEventListener('pointerup', release)
      box.removeEventListener('pointercancel', release)
    }
  }, [src])

  return (
    <div ref={viewport} className="absolute inset-0 overflow-hidden">
      <img
        ref={img}
        src={src}
        width={width}
        height={height}
        alt=""
        decoding="async"
        fetchPriority="low"
        className="block h-auto w-full will-change-transform"
      />
    </div>
  )
}
