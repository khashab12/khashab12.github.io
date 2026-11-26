import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useLang } from '../lib/lang'
import { formatNumber } from '../i18n'
import { asset, concepts, demoPreview, demoUrl, demos, type Demo } from '../lib/projects'
import { prefersCalm } from '../lib/fx'
import { PhoneFrame } from './PhoneFrame'
import { Reveal } from './Reveal'
import { External } from './Icons'
import { Marquee } from './Marquee'

const ConceptModal = lazy(() => import('./ConceptModal').then((mod) => ({ default: mod.ConceptModal })))

type FeaturedId = 'tiffany' | 'damas' | 'volt' | 'rukn' | 'lion' | 'bot' | 'library'
type Featured = { id: FeaturedId; by: 'mohamed' | 'yousef'; real: boolean; url?: string; tags: string[]; tone: string }

/** Best first. Each card stacks over the previous one while scrolling. */
const FEATURED: Featured[] = [
  { id: 'tiffany', by: 'mohamed', real: true, url: 'https://khashab12.github.io/menus/tiffany-t4c8/', tags: ['Clinic', 'Multi-branch', 'AR / EN', 'WhatsApp booking'], tone: 'from-[#2a221b] to-[#14100c]' },
  { id: 'volt', by: 'yousef', real: false, url: demoUrl('volt'), tags: ['E-commerce', 'Cart', 'Wishlist', 'Accounts'], tone: 'from-[#0d1b2a] to-[#08111a]' },
  { id: 'damas', by: 'mohamed', real: true, url: 'https://www.ksadamas.com/', tags: ['Next.js', 'TypeScript', 'react-pageflip', 'RTL'], tone: 'from-[#3a0b0d] to-[#1a0506]' },
  { id: 'rukn', by: 'yousef', real: false, url: demoUrl('rukn'), tags: ['Real estate', 'Installment calculator'], tone: 'from-[#1f1c16] to-[#0f0e0b]' },
  { id: 'lion', by: 'mohamed', real: true, tags: ['Shopify', 'Horizon theme', 'Liquid'], tone: 'from-[#0f2a2b] to-[#081617]' },
]
const MORE: { id: FeaturedId; url: string; img: string; tags: string[] }[] = [
  { id: 'bot', url: 'https://khashab12.github.io/menus/demo-bot/', img: 'work/bot.webp', tags: ['WhatsApp', 'Automation'] },
  { id: 'library', url: 'https://khashab12.github.io/menus/demo-library/', img: 'work/library.webp', tags: ['Prototype', 'Speech API'] },
]

function useDesk() {
  const [desk, setDesk] = useState(false)
  useEffect(() => {
    const mq = matchMedia('(min-width: 768px)')
    const on = () => setDesk(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return desk
}

const BY_TONE: Record<string, string> = { mohamed: 'bg-accent text-paper', yousef: 'bg-saffron text-paper' }

function ByChip({ by }: { by: string }) {
  const { t } = useLang()
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 py-0.5 pe-2.5 ps-0.5 text-xs text-ink-2">
      <span aria-hidden className={`grid size-5 place-items-center rounded-full text-[10px] font-bold ${BY_TONE[by]}`}>{t.work.by[by]?.[0]}</span>
      {t.work.by[by]}
    </span>
  )
}

/** A live, scaled-down copy of a site inside a frame. Loads only near the viewport. */
function LiveScreen({ src, width }: { src: string; width: number }) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(() => setScale(el.clientWidth / width))
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setLoad(true), io.disconnect()), { rootMargin: '600px' })
    io.observe(el)
    return () => (ro.disconnect(), io.disconnect())
  }, [width])
  return (
    <div ref={box} className="absolute inset-0 overflow-hidden bg-white">
      {load && scale > 0 && (
        <iframe
          src={src}
          title=""
          tabIndex={-1}
          loading="lazy"
          className="pointer-events-none origin-top-left border-0 rtl:origin-top-right"
          style={{ width, height: `${100 / scale}%`, transform: `scale(${scale})`, position: 'absolute', top: 0, insetInlineStart: 0 }}
        />
      )}
    </div>
  )
}

function Visual({ f }: { f: Featured }) {
  const { t } = useLang()
  if (f.id === 'tiffany')
    return (
      <div className="relative flex h-full items-center justify-center gap-6 bg-gradient-to-br from-[#efe6dd] via-[#f6f0ea] to-[#e6d8c8] p-6">
        <div className="hidden flex-col items-center gap-3 sm:flex">
          <span className="grid size-28 place-items-center rounded-full border border-[#b89b67]/60 bg-white shadow-[0_18px_40px_rgba(113,98,83,.18)]">
            <span className="flex flex-col items-center leading-tight">
              <span className="font-display text-base text-[#716253]">تيفاني كلينك</span>
              <span className="mt-1 text-[8px] tracking-[0.25em] text-[#9a8e82]" dir="ltr">TIFFANY CLINIC</span>
            </span>
          </span>
          {['الياسمين', 'الواحة', 'قرطبة'].map((b) => (
            <span key={b} className="rounded-full border border-[#b89b67]/50 bg-white/60 px-3 py-0.5 text-xs text-[#716253]">{b}</span>
          ))}
        </div>
        <div className="h-[92%] max-h-[520px]">
          <PhoneFrame className="h-full">
            <LiveScreen src={f.url!} width={390} />
          </PhoneFrame>
        </div>
      </div>
    )
  if (f.id === 'damas')
    return (
      <div className="flex h-full items-center justify-center bg-[#7a1416] [perspective:1200px]">
        <div className="group/book relative flex h-[72%] w-[46%] max-w-[300px]">
          <span className="absolute inset-0 rounded-e-xl rounded-s-sm bg-[#5e0f11] shadow-[14px_18px_0_rgba(0,0,0,.25)]" />
          <span className="relative flex w-full origin-[right_center] flex-col items-center justify-center rounded-e-xl rounded-s-sm border-4 border-[#c9a24a] bg-[#8e1b1e] font-display text-5xl font-bold text-[#e7c873] transition-transform duration-700 [transform:rotateY(0deg)] group-hover:[transform:rotateY(-28deg)]">
            دمس
            <small className="mt-3 font-body text-sm font-normal text-[#e7c873]/80">{t.work.featured.damas.book}</small>
          </span>
        </div>
      </div>
    )
  if (f.id === 'lion')
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#0f2a2b] to-[#1d4a46]">
        <span className="font-display text-5xl font-bold tracking-wide text-white" dir="ltr">EGYPT LION</span>
        <span className="flex flex-wrap justify-center gap-2 px-4 text-sm text-white/85" dir="ltr">
          {['Peugeot 301', '308', '3008', '5008', 'Shopify'].map((x) => (
            <span key={x} className="rounded-lg border border-white/25 px-2.5 py-1">{x}</span>
          ))}
        </span>
      </div>
    )
  // Yousef's demos: live browser view of our hosted copy
  return (
    <div className="flex h-full items-center justify-center p-5 sm:p-8">
      <div className="w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-1.5 bg-surface-2 px-3 py-2" dir="ltr">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="relative aspect-[16/10]">
          <img src={demoPreview(demos.find((d) => d.id === f.id)!.img)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
          <LiveScreen src={f.url!} width={1280} />
        </div>
      </div>
    </div>
  )
}

function StackCard({ f, i, total, progress }: { f: Featured; i: number; total: number; progress: MotionValue<number> }) {
  const { t } = useLang()
  const copy = t.work.featured[f.id]
  const desk = useDesk()
  const start = i / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.035])
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, 0.45])
  const body = (
    <m.article
      style={desk ? { scale } : undefined}
      className={`edge relative grid h-full origin-top overflow-hidden rounded-[2rem] bg-gradient-to-br ${f.tone} md:grid-cols-[0.9fr_1.1fr]`}
    >
      <div className="relative z-10 flex flex-col justify-between gap-6 p-6 sm:p-9">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-sm text-muted tabular-nums" dir="ltr">
              {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            {i === 0 && <span className="rounded-full bg-saffron px-2.5 py-0.5 text-xs font-bold text-paper">★ {t.work.tagBest}</span>}
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${f.real ? 'bg-accent/20 text-accent-strong' : 'bg-white/10 text-ink-2'}`}>
              {f.real ? t.work.tagReal : t.work.tagDemo}
            </span>
            <ByChip by={f.by} />
          </div>
          <h3 className="mt-5 text-[clamp(1.6rem,4vw,2.6rem)] font-bold leading-[1.15]">{copy.title}</h3>
          <p className="mt-4 max-w-md text-ink-2">{copy.body}</p>
        </div>
        <div>
          <ul className="flex flex-wrap gap-1.5" dir="ltr">
            {f.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink-2">{tag}</li>
            ))}
          </ul>
          {f.url && (
            <span className="mt-6 inline-flex items-center gap-2 font-display font-medium text-accent-strong">
              {f.real ? t.work.visit : t.work.tryIt}
              <External width={18} height={18} />
            </span>
          )}
        </div>
      </div>
      <div className="relative order-first h-[300px] overflow-hidden md:order-none md:h-auto">
        <Visual f={f} />
      </div>
      <m.div aria-hidden style={desk ? { opacity: dim } : { opacity: 0 }} className="pointer-events-none absolute inset-0 bg-paper" />
    </m.article>
  )
  return (
    <li className="md:sticky md:h-[min(82svh,640px)]" style={desk ? { top: `calc(5.5rem + ${i * 14}px)` } : undefined}>
      {f.url ? (
        <a href={f.url} target="_blank" rel="noopener" data-cursor={f.real ? t.work.cursorOpen : t.work.cursorTry} className="block h-full rounded-[2rem]">
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  )
}

function DemoCard({ d }: { d: Demo }) {
  const { t, lang } = useLang()
  return (
    <a
      href={demoUrl(d.id)}
      target="_blank"
      rel="noopener"
      data-cursor={t.work.cursorTry}
      className="spotlight group flex h-full w-[min(82vw,440px)] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface transition-colors duration-300 hover:border-accent/50"
    >
      <span className="relative block aspect-[1365/918] overflow-hidden">
        <img src={demoPreview(d.img)} alt="" width={1365} height={918} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
        <span className="absolute start-3 top-3 rounded-full bg-paper/80 px-2.5 py-0.5 text-xs text-ink backdrop-blur">{t.work.filters[d.cat]}</span>
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="text-sm font-medium text-accent-strong">{d.hook[lang]}</span>
        <span className="mt-1.5 font-display text-xl font-bold">{d.name[lang]}</span>
        <span className="mt-1.5 text-sm text-ink-2">{d.body[lang]}</span>
        <span className="mt-auto flex items-center justify-between gap-2 pt-5">
          <ByChip by={d.by} />
          <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-strong">
            {t.work.tryIt}
            <External width={16} height={16} />
          </span>
        </span>
      </span>
    </a>
  )
}

const FILTERS = ['all', 'store', 'food', 'service'] as const

/** Pinned horizontal gallery on desktop; a native swipe rail on touch and reduced motion. */
function DemoRail() {
  const { t, lang } = useLang()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all')
  const list = demos.filter((d) => !d.featured && (filter === 'all' || d.cat === filter))
  const pin = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    setPinned(!prefersCalm() && matchMedia('(min-width: 900px) and (pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!pinned || !pin.current || !track.current) return
    let ctx: { revert: () => void } | undefined
    let cancelled = false
    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        const dist = () => Math.max(0, track.current!.scrollWidth - pin.current!.clientWidth)
        const dir = document.documentElement.dir === 'rtl' ? 1 : -1
        gsap.to(track.current, {
          x: () => dir * dist(),
          ease: 'none',
          scrollTrigger: { trigger: pin.current, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
        })
      })
    })()
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [pinned, filter, lang])

  return (
    <div ref={pin} className={pinned ? 'flex min-h-svh flex-col justify-center overflow-hidden py-10' : 'py-10'}>
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-[clamp(1.6rem,4.5vw,2.6rem)] font-bold">
              {t.work.demosTitle} <span className="font-display text-muted tabular-nums">({formatNumber(demos.length, lang)})</span>
            </h3>
            <p className="mt-2 text-ink-2">{t.work.demosNote}</p>
          </div>
          <div role="group" aria-label={t.work.demosTitle} className="flex flex-wrap gap-2">
            {FILTERS.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={filter === k}
                onClick={() => setFilter(k)}
                className={`min-h-11 rounded-full px-4 font-display text-sm font-medium transition-colors ${filter === k ? 'bg-ink text-paper' : 'border border-white/10 text-ink-2 hover:border-accent hover:text-ink'}`}
              >
                {t.work.filters[k]}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={pinned ? 'mt-10' : 'rail mt-8 overflow-x-auto'}>
        <div ref={track} className="flex w-max gap-5 px-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-1240px)/2+1.5rem))]">
          <AnimatePresence mode="popLayout">
            {list.map((d) => (
              <m.div key={d.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                <DemoCard d={d} />
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <p className="mx-auto mt-6 w-full max-w-[1240px] px-4 text-sm text-muted sm:px-6">{t.work.demoNote}</p>
    </div>
  )
}

export function Work() {
  const { t, lang } = useLang()
  const [open, setOpen] = useState<number | null>(null)
  const stack = useRef<HTMLUListElement>(null)
  const { scrollYProgress } = useScroll({ target: stack, offset: ['start start', 'end end'] })
  const half = Math.ceil(concepts.length / 2)
  const rows = [concepts.slice(0, half), concepts.slice(half)]

  return (
    <section id="work" aria-labelledby="work-title" className="relative">
      <div className="mx-auto max-w-[1240px] px-4 pt-24 sm:px-6 md:pt-32">
        <Reveal>
          <p className="font-display text-sm font-medium text-accent-strong">{t.work.kicker}</p>
          <h2 id="work-title" className="mt-3 text-[clamp(2.2rem,7vw,4.4rem)] font-bold leading-[1.05] tracking-tight">
            {t.work.headline}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-ink-2">{t.work.featuredNote}</p>
        </Reveal>

        <ul ref={stack} className="mt-12 flex flex-col gap-6 pb-[6vh] md:gap-[12vh]">
          {FEATURED.map((f, i) => (
            <StackCard key={f.id} f={f} i={i} total={FEATURED.length} progress={scrollYProgress} />
          ))}
        </ul>

        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {MORE.map((x) => {
            const copy = t.work.featured[x.id]
            return (
              <li key={x.id}>
                <Reveal className="h-full">
                  <a href={x.url} target="_blank" rel="noopener" data-cursor={t.work.cursorTry} className="spotlight group grid h-full grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-3xl border border-white/10 bg-surface transition-colors hover:border-accent/50">
                    <span className="relative overflow-hidden">
                      <img src={asset(x.img)} alt="" width={600} height={450} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                    </span>
                    <span className="flex flex-col p-5">
                      <span className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-ink-2">{t.work.tagDemo}</span>
                        <ByChip by="mohamed" />
                      </span>
                      <span className="mt-3 font-display text-lg font-bold leading-snug">{copy.title}</span>
                      <span className="mt-1.5 text-sm text-ink-2">{copy.body}</span>
                      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent-strong">
                        {t.work.tryIt}
                        <External width={16} height={16} />
                      </span>
                    </span>
                  </a>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-16">
        <DemoRail />
      </div>

      {concepts.length > 0 && (
        <div className="py-20">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <Reveal className="max-w-2xl">
              <h3 className="text-[clamp(1.6rem,4.5vw,2.6rem)] font-bold">
                {t.work.conceptsTitle} <span className="font-display text-muted tabular-nums">({formatNumber(concepts.length, lang)})</span>
              </h3>
              <p className="mt-2 text-ink-2">{t.work.conceptsNote}</p>
            </Reveal>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            {rows.map((row, r) => (
              <Marquee key={r} repeat={2} duration={110} className={`marquee-slow ${r === 1 ? 'reverse' : ''}`}>
                {row.map((c) => {
                  const idx = concepts.indexOf(c)
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setOpen(idx)}
                      aria-label={`${t.work.open}: ${t.work.concept(c.concept)}`}
                      data-cursor={t.work.cursorTry}
                      className="group w-[170px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-surface text-start transition-[transform,border-color] duration-500 hover:-translate-y-2 hover:border-accent/60 sm:w-[210px]"
                    >
                      <span className="block aspect-[4/5] overflow-hidden">
                        <img src={asset(`concepts/${c.concept}/cover-320.webp`)} alt="" width={320} height={575} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                      </span>
                      <span className="flex items-center justify-between gap-2 px-3 py-2.5">
                        <span className="font-display text-sm font-bold" dir="ltr">{t.work.concept(c.concept)}</span>
                        <span className="flex" aria-hidden>
                          {c.colors?.map((col, k) => (
                            <span key={k} className="-ms-1.5 size-3.5 rounded-full ring-2 ring-surface first:ms-0" style={{ background: col }} />
                          ))}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </Marquee>
            ))}
          </div>
        </div>
      )}

      <Suspense>
        <AnimatePresence>
          {open !== null && <ConceptModal key="modal" list={concepts} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
        </AnimatePresence>
      </Suspense>
    </section>
  )
}
