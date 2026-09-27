import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { useLang } from '../lib/lang'
import { conceptUrl, type Concept } from '../lib/projects'
import { lockScroll } from '../lib/scroll'
import { PhoneFrame } from './PhoneFrame'
import { ArrowDown, ChevronEnd, ChevronStart, Close, External } from './Icons'

const DEVICE_WIDTH = 390 // demos are laid out at a real phone width, then scaled into the frame
const HINT_MS = 4000

type Props = { list: Concept[]; index: number; onIndex: (i: number) => void; onClose: () => void }

export function ConceptModal({ list, index, onIndex, onClose }: Props) {
  const { t } = useLang()
  const concept = list[index]
  const closeBtn = useRef<HTMLButtonElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  // The phone subtree remounts on every concept switch, so the screen element is tracked
  // through a callback ref instead of a one-time lookup.
  const [screen, setScreen] = useState<HTMLDivElement | null>(null)
  const [scale, setScale] = useState<number | null>(null)
  const [hint, setHint] = useState(true)

  const go = (d: number) => onIndex((index + d + list.length) % list.length)

  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null
    lockScroll(true)
    closeBtn.current?.focus()
    return () => {
      lockScroll(false)
      returnTo?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // Arrow keys follow the visual direction of the page.
      const rtl = document.documentElement.dir === 'rtl'
      if (e.key === 'ArrowRight') go(rtl ? -1 : 1)
      if (e.key === 'ArrowLeft') go(rtl ? 1 : -1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Scale the 390px-wide page to the frame. A detached or not-yet-laid-out container
  // measures 0 wide; those readings are ignored so the page never collapses to scale(0).
  const measure = useCallback(() => {
    const w = screen?.clientWidth ?? 0
    if (w > 0) setScale(w / DEVICE_WIDTH)
  }, [screen])

  useEffect(() => {
    if (!screen) return
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(screen)
    return () => ro.disconnect()
  }, [screen, measure, concept.concept])

  // Scroll hint: shown for each newly opened concept, hidden on first scroll/touch inside
  // the page (reported by the concept via postMessage), on a tap on the phone, or after 4s.
  useEffect(() => {
    setHint(true)
    const timer = setTimeout(() => setHint(false), HINT_MS)
    const onMessage = (e: MessageEvent) => {
      if (e.source === frame.current?.contentWindow && (e.data === 'concept-scrolled' || e.data === 'concept-touched')) setHint(false)
    }
    // A tap inside the iframe moves focus into it, which blurs this window.
    const onBlur = () => setTimeout(() => document.activeElement === frame.current && setHint(false))
    window.addEventListener('message', onMessage)
    window.addEventListener('blur', onBlur)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('message', onMessage)
      window.removeEventListener('blur', onBlur)
    }
  }, [concept.concept])

  const title = t.work.concept(concept.concept)
  const navBtn = 'grid size-12 shrink-0 place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20'

  return (
    <m.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/85 p-3 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mb-3 flex w-full max-w-[26rem] items-center justify-between gap-2 text-paper">
        <span className="font-display text-lg font-bold" dir="ltr">
          {title}
        </span>
        <div className="flex items-center gap-1">
          <a
            href={conceptUrl(concept.concept)}
            target="_blank"
            rel="noopener"
            className="grid size-11 place-items-center rounded-xl hover:bg-paper/10"
            aria-label={t.work.newTab}
            title={t.work.newTab}
          >
            <External />
          </a>
          <button ref={closeBtn} type="button" onClick={onClose} className="grid size-11 place-items-center rounded-xl hover:bg-paper/10" aria-label={t.work.close}>
            <Close />
          </button>
        </div>
      </div>

      <div className="flex w-full items-center justify-center gap-6">
        <button type="button" onClick={() => go(-1)} aria-label={t.work.prev} className={`${navBtn} max-sm:hidden`}>
          <ChevronStart />
        </button>

        <m.div
          key={concept.concept}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="h-[min(76svh,760px)]"
          onPointerDown={() => setHint(false)}
        >
          <PhoneFrame className="h-full">
            <div ref={setScreen} className="absolute inset-0 overflow-hidden bg-white pt-[9%]" dir="ltr">
              <iframe
                ref={frame}
                title={title}
                src={conceptUrl(concept.concept)}
                sandbox="allow-scripts"
                onLoad={measure}
                className="origin-top-left border-0"
                style={{
                  width: DEVICE_WIDTH,
                  height: scale ? `${100 / scale}%` : '100%',
                  transform: scale ? `scale(${scale})` : undefined,
                  visibility: scale ? 'visible' : 'hidden',
                }}
              />
              <AnimatePresence>
                {hint && (
                  <m.div
                    key="hint"
                    aria-hidden
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="pointer-events-none absolute inset-x-0 bottom-[7%] z-20 flex justify-center"
                  >
                    <span dir="auto" className="flex items-center gap-1.5 rounded-full bg-ink/85 px-4 py-2 font-display text-sm text-paper shadow-lg">
                      <ArrowDown width={16} height={16} className="scroll-hint-arrow" />
                      {t.work.scrollHint}
                    </span>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </PhoneFrame>
        </m.div>

        <button type="button" onClick={() => go(1)} aria-label={t.work.next} className={`${navBtn} max-sm:hidden`}>
          <ChevronEnd />
        </button>
      </div>

      <div className="mt-3 flex gap-3 sm:hidden">
        <button type="button" onClick={() => go(-1)} aria-label={t.work.prev} className={navBtn}>
          <ChevronStart />
        </button>
        <button type="button" onClick={() => go(1)} aria-label={t.work.next} className={navBtn}>
          <ChevronEnd />
        </button>
      </div>
    </m.div>
  )
}
