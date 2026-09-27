import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { useLang } from '../lib/lang'
import { formatNumber } from '../i18n'
import { getLenis, reducedMotion } from '../lib/scroll'
import { Check } from './Icons'

const SWATCHES = ['#1e2b52', '#e2622b', '#f4ecdc', '#8fae6b']
const ease = [0.22, 1, 0.36, 1] as const

function StepVisual({ step }: { step: number }) {
  const { t, lang } = useLang()
  const v = t.how.visual

  if (step === 0)
    return (
      <div className="flex h-full items-center justify-center gap-6">
        <m.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease }}
          className="grid size-28 place-items-center rounded-full border-2 border-dashed border-paper/40 text-center font-display text-sm text-paper/80"
        >
          {v.logo}
        </m.div>
        <div className="grid grid-cols-2 gap-2.5">
          {SWATCHES.map((c, i) => (
            <m.span
              key={c}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.4, ease }}
              className="block size-12 rounded-2xl ring-1 ring-paper/15"
              style={{ background: c }}
            />
          ))}
          <m.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="col-span-2 mt-1 text-center font-display text-2xl text-paper/85">
            Aa أب
          </m.span>
        </div>
      </div>
    )

  if (step === 1)
    return (
      <div className="flex h-full items-center justify-center">
        <m.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease }}
          className="w-52 overflow-hidden rounded-[1.75rem] border-[5px] border-paper/90 bg-[#f4ecdc] text-[#1e2b52] shadow-2xl"
        >
          <m.div initial={{ backgroundColor: '#54696a' }} animate={{ backgroundColor: '#1e2b52' }} transition={{ delay: 0.35, duration: 0.6 }} className="px-3 pb-3 pt-5 text-center text-[#f4ecdc]">
            <div className="mx-auto mb-1.5 size-7 rounded-full border-2 border-[#e2622b]" />
            <div className="font-display text-sm font-bold">{v.place}</div>
          </m.div>
          <div className="space-y-2 p-3">
            {[70, 55, 62].map((w, i) => (
              <m.div key={w} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="flex items-center justify-between">
                <span className="h-2 rounded-full bg-[#1e2b52]/70" style={{ width: `${w}%` }} />
                <span className="h-2 w-5 rounded-full bg-[#e2622b]" />
              </m.div>
            ))}
            <div className="mt-2 h-6 rounded-lg bg-[#1f8f4e]" />
          </div>
        </m.div>
      </div>
    )

  if (step === 2)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="grid grid-cols-7 gap-1.5" dir="ltr">
          {Array.from({ length: 14 }, (_, i) => (
            <m.span
              key={i}
              initial={{ backgroundColor: 'rgba(238,242,240,0.12)' }}
              animate={{ backgroundColor: '#e3a33b' }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.25 }}
              className="block size-8 rounded-lg sm:size-9"
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-display text-4xl font-bold text-saffron">{formatNumber(14, lang)}</span>
          <span className="text-paper/80">{v.days}</span>
          <span className="rounded-full bg-paper/10 px-3 py-1 text-sm text-paper">{v.free}</span>
        </div>
      </div>
    )

  return (
    <div className="flex h-full items-center justify-center">
      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        {t.how.plans.map((p, i) => (
          <m.div
            key={p.title}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.5, ease }}
            className="rounded-2xl border border-paper/15 bg-paper/5 p-4"
          >
            <span className="grid size-8 place-items-center rounded-full bg-saffron text-ink">
              <Check width={16} height={16} />
            </span>
            <h4 className="mt-3 font-display text-base font-bold leading-snug text-paper">{p.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-paper/75">{p.body}</p>
          </m.div>
        ))}
      </div>
    </div>
  )
}

function StepText({ step, total }: { step: number; total: number }) {
  const { t, lang } = useLang()
  const s = t.how.steps[step]
  return (
    <div>
      <p className="font-display text-sm tracking-wide text-paper/60">
        <span className="text-saffron">{formatNumber(step + 1, lang)}</span> {t.how.of} {formatNumber(total, lang)}
      </p>
      <h3 className="mt-3 text-[clamp(1.6rem,6vw,2.6rem)] font-bold leading-tight text-paper">{s.title}</h3>
      <p className="mt-3 max-w-md text-lg text-paper/75">{s.body}</p>
    </div>
  )
}

export function HowIWork() {
  const { t } = useLang()
  const total = t.how.steps.length
  const section = useRef<HTMLElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  // Decided after hydration so the prerendered HTML matches; the pinned layout is the default.
  const [staticMode, setStaticMode] = useState(false)
  useEffect(() => {
    if (reducedMotion() || window.innerHeight < 560) setStaticMode(true)
  }, [])

  useEffect(() => {
    if (staticMode || !section.current) return
    let cancelled = false
    let revert: (() => void) | undefined

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)
        ScrollTrigger.config({ ignoreMobileResize: true })
        const lenis = getLenis()
        const onScroll = () => ScrollTrigger.update()
        lenis?.on('scroll', onScroll)

        // No `pin`: the section already has its full scroll height and the panel is CSS-sticky,
        // so loading GSAP later never changes the page height (which used to break in-page links).
        const ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: section.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / (total - 1), duration: { min: 0.2, max: 0.5 }, delay: 0.08, ease: 'power1.inOut' },
            onUpdate: (self) => {
              setStep(Math.min(total - 1, Math.round(self.progress * (total - 1))))
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`
            },
          })
        }, section)
        revert = () => {
          lenis?.off('scroll', onScroll)
          ctx.revert()
        }
      },
      { rootMargin: '900px 0px' },
    )
    io.observe(section.current)
    return () => {
      cancelled = true
      io.disconnect()
      revert?.()
    }
  }, [staticMode, total])

  if (staticMode)
    return (
      <section id="how" aria-labelledby="how-title" className="bg-ink py-20 text-paper">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
          <h2 id="how-title" className="text-[clamp(1.7rem,6vw,2.5rem)] font-bold text-paper">
            {t.how.title}
          </h2>
          <ol className="mt-10 grid gap-12">
            {t.how.steps.map((_, i) => (
              <li key={i} className="grid items-center gap-6 md:grid-cols-2">
                <StepText step={i} total={total} />
                <div className="h-56">
                  <StepVisual step={i} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )

  return (
    <section
      ref={section}
      id="how"
      aria-labelledby="how-title"
      className="bg-ink text-paper"
      // One screen for the panel plus 85% of a screen of scrolling per remaining step, reserved from the first render.
      style={{ height: `calc(100svh + ${(total - 1) * 85}svh)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-16">
        <div className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col px-4 py-6 sm:px-6 md:py-10">
          <div className="flex items-center gap-4">
            <h2 id="how-title" className="shrink-0 font-display text-lg font-bold text-paper/90">
              {t.how.title}
            </h2>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-paper/10">
              <div ref={bar} className="h-full origin-left rounded-full bg-saffron rtl:origin-right" style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>

          <div className="grid flex-1 content-center gap-8 md:grid-cols-2 md:items-center">
            <div className="order-2 min-h-[11rem] md:order-1" aria-hidden>
              <AnimatePresence mode="wait" initial={false}>
                <m.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease }}>
                  <StepText step={step} total={total} />
                </m.div>
              </AnimatePresence>
            </div>
            <div className="order-1 h-[34svh] min-h-52 md:order-2 md:h-[22rem]" aria-hidden>
              <AnimatePresence mode="wait" initial={false}>
                <m.div key={step} className="h-full" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
                  <StepVisual step={step} />
                </m.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Full step list for screen readers and no-JS; the visual version above is the pinned sequence. */}
          <ol className="sr-only">
            {t.how.steps.map((s, i) => (
              <li key={i}>
                {s.title}. {s.body} {i === total - 1 && t.how.plans.map((p) => `${p.title}: ${p.body}`).join(' ')}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
