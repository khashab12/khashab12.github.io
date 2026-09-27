import type Lenis from 'lenis'

let lenis: Lenis | null = null

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Smooth scrolling for wheel/trackpad. Touch devices keep native scrolling. */
export async function startSmoothScroll() {
  if (reducedMotion() || lenis) return lenis
  const { default: LenisCtor } = await import('lenis')
  lenis = new LenisCtor({ autoRaf: true, lerp: 0.12 })
  return lenis
}

export const getLenis = () => lenis

const HEADER_OFFSET = 72
let cancelAim: (() => void) | undefined

/**
 * Scrolls to a section and keeps re-aiming while the page settles: if content above the
 * target changes height mid-scroll (lazy images, late layout), the scroll is retargeted
 * and the final position is verified.
 */
export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return
  cancelAim?.()

  const smooth = !reducedMotion()
  const offBy = () => el.getBoundingClientRect().top - HEADER_OFFSET
  const aim = (immediate = false) => {
    // A numeric target: given an element, Lenis also applies the page's scroll-padding-top,
    // which would double the header offset.
    if (lenis) lenis.scrollTo(window.scrollY + offBy(), { immediate: immediate || !smooth, force: true, onComplete: verify })
    else window.scrollTo({ top: window.scrollY + offBy(), behavior: immediate || !smooth ? 'auto' : 'smooth' })
  }

  let tries = 0
  let settleTimer: ReturnType<typeof setTimeout> | undefined
  const verify = () => {
    clearTimeout(settleTimer)
    // Target not where it should be (and the page can still scroll there)? Aim again.
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    if (Math.abs(offBy()) > 4 && window.scrollY < maxScroll - 1 && tries++ < 3) aim(tries > 1)
  }

  // Page height changed while we're scrolling: retarget right away.
  let lastHeight = document.documentElement.scrollHeight
  const ro = new ResizeObserver(() => {
    const h = document.documentElement.scrollHeight
    if (h !== lastHeight) {
      lastHeight = h
      aim()
    }
  })
  ro.observe(document.body)

  // Native smooth scroll has no completion callback everywhere; check once it goes quiet.
  const onScrollEnd = () => {
    clearTimeout(settleTimer)
    settleTimer = setTimeout(verify, 150)
  }
  if (!lenis) window.addEventListener('scroll', onScrollEnd, { passive: true })

  // Stop re-aiming if the visitor takes over, or after the page has had time to settle.
  const userTookOver = () => cancelAim?.()
  window.addEventListener('wheel', userTookOver, { passive: true, once: true })
  window.addEventListener('touchstart', userTookOver, { passive: true, once: true })
  const stopTimer = setTimeout(() => cancelAim?.(), 3000)
  cancelAim = () => {
    ro.disconnect()
    clearTimeout(settleTimer)
    clearTimeout(stopTimer)
    window.removeEventListener('scroll', onScrollEnd)
    window.removeEventListener('wheel', userTookOver)
    window.removeEventListener('touchstart', userTookOver)
    cancelAim = undefined
  }

  aim()
  // Move focus for keyboard and screen-reader users without a second jump.
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

export function lockScroll(locked: boolean) {
  if (lenis) (locked ? lenis.stop() : lenis.start())
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
