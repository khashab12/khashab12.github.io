import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { m } from 'motion/react'
import { useLang } from '../lib/lang'
import { conceptUrl, type Concept } from '../lib/projects'
import { lockScroll } from '../lib/scroll'
import { PhoneFrame } from './PhoneFrame'
import { ChevronEnd, ChevronStart, Close, External } from './Icons'

const DEVICE_WIDTH = 390 // demos are laid out at a real phone width, then scaled into the frame

type Props = { list: Concept[]; index: number; onIndex: (i: number) => void; onClose: () => void }

export function ConceptModal({ list, index, onIndex, onClose }: Props) {
  const { t } = useLang()
  const concept = list[index]
  const closeBtn = useRef<HTMLButtonElement>(null)
  const screen = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

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

  useLayoutEffect(() => {
    const el = screen.current
    if (!el) return
    const ro = new ResizeObserver(() => setScale(el.clientWidth / DEVICE_WIDTH))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

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
        >
          <PhoneFrame className="h-full">
            <div ref={screen} className="absolute inset-0 overflow-hidden bg-white pt-[9%]" dir="ltr">
              <iframe
                title={title}
                src={conceptUrl(concept.concept)}
                sandbox="allow-scripts"
                className="origin-top-left border-0"
                style={{ width: DEVICE_WIDTH, height: `${100 / scale}%`, transform: `scale(${scale})` }}
              />
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
