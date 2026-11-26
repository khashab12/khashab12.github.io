import { useEffect, useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { useLang } from '../lib/lang'
import { formatNumber } from '../i18n'
import { asset, demoPreview, heroConcept } from '../lib/projects'
import { primaryTarget, hasContact } from '../lib/contact'
import { scrollToHash } from '../lib/scroll'
import { useCountUp, useMagnetic, isFinePointer, prefersCalm } from '../lib/fx'
import { PhoneFrame } from './PhoneFrame'
import { AutoScrollScreen } from './AutoScrollScreen'
import { ArrowDown, Check, WhatsApp } from './Icons'

function Words({ text, offset = 0, className = '', wordClass = '' }: { text: string; offset?: number; className?: string; wordClass?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i}>
          <span className="word-mask">
            <span className={`word ${wordClass}`} style={{ ['--i' as string]: i + offset }}>
              {w}
            </span>
          </span>{' '}
        </span>
      ))}
    </span>
  )
}

function Stat({ n, pre, post, label }: { n: number; pre: string; post: string; label: string }) {
  const { lang } = useLang()
  const [ref, v] = useCountUp(n)
  return (
    <div className="flex flex-col-reverse border-s border-line ps-4">
      <dt className="mt-2 text-sm leading-snug text-muted">{label}</dt>
      <dd ref={ref as React.RefObject<HTMLElement>} className="font-display text-3xl font-bold leading-none tabular-nums text-ink sm:text-4xl">
        {pre}
        {formatNumber(v, lang)}
        {post}
      </dd>
    </div>
  )
}

function BrowserFrame({ src, label }: { src: string; label: string }) {
  return (
    <div role="img" aria-label={label} className="overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_40px_90px_-30px_rgb(0_0_0/0.8)]">
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-surface-2 px-3 py-2.5" dir="ltr">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ms-3 h-4 flex-1 rounded-md bg-white/5" />
      </div>
      <img src={src} alt="" width={1365} height={918} decoding="async" className="block aspect-[1365/918] w-full object-cover object-top" />
    </div>
  )
}

export function Hero() {
  const { t } = useLang()
  const target = primaryTarget()
  const cta = useMagnetic<HTMLAnchorElement>(0.3)
  const stage = useRef<HTMLDivElement>(null)
  const section = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Mouse parallax on the device stage
  useEffect(() => {
    const el = stage.current
    if (!el || !isFinePointer() || prefersCalm()) return
    const move = (e: PointerEvent) => {
      const x = e.clientX / innerWidth - 0.5
      const y = e.clientY / innerHeight - 0.5
      el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`)
      el.style.setProperty('--tx', `${(x * 18).toFixed(1)}px`)
      el.style.setProperty('--ty', `${(y * 14).toFixed(1)}px`)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToHash(hash)
  }
  const ease = 'transform .6s cubic-bezier(.16,1,.3,1)'

  return (
    <section ref={section} id="top" className="relative isolate overflow-hidden">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
      <div aria-hidden className="aurora absolute -top-40 start-[10%] -z-10 h-[30rem] w-[30rem] rounded-full bg-accent/25" />
      <div aria-hidden className="aurora absolute end-[-8rem] top-40 -z-10 h-[26rem] w-[26rem] rounded-full bg-saffron/15 [animation-delay:-6s]" />

      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1240px] items-center gap-16 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-6">
        <m.div style={{ y: textY, opacity: fade }}>
          <p className="rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-ink-2 backdrop-blur">
            <span className="relative flex size-2">
              <span className="ping absolute inline-flex size-full rounded-full bg-accent-strong" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-strong" />
            </span>
            {t.hero.available}
          </p>

          <h1 className="text-[clamp(2.6rem,8.4vw,4.9rem)] font-bold leading-[1.04] tracking-tight">
            <Words text={t.hero.titleA} className="block" />
            <Words text={t.hero.titleB} offset={t.hero.titleA.split(' ').length} className="block pb-2" wordClass="text-gradient" />
          </h1>

          <p className="rise mt-6 flex flex-wrap items-center gap-3 font-display text-lg font-medium text-ink" style={{ ['--d' as string]: '250ms' }}>
            <span aria-hidden className="flex">
              <span className="grid size-9 place-items-center rounded-full bg-accent text-sm font-bold text-paper ring-2 ring-paper">{t.team.members[0].initials}</span>
              <span className="-ms-2.5 grid size-9 place-items-center rounded-full bg-saffron text-sm font-bold text-paper ring-2 ring-paper">{t.team.members[1].initials}</span>
            </span>
            {t.hero.names}
          </p>
          <p className="rise mt-4 max-w-xl text-[clamp(1.05rem,3.6vw,1.25rem)] leading-relaxed text-ink-2" style={{ ['--d' as string]: '320ms' }}>
            {t.hero.line}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ ['--d' as string]: '420ms' }}>
            <a
              ref={cta}
              href={target}
              onClick={go(target)}
              className="group relative inline-flex min-h-14 items-center gap-2.5 overflow-hidden rounded-full bg-accent-strong px-7 font-display text-base font-bold text-paper shadow-[0_18px_40px_-14px_rgb(94_227_189/0.7)]"
            >
              <span aria-hidden className="absolute inset-y-0 -start-1/2 w-1/2 skew-x-[-20deg] bg-white/40 opacity-0 transition-all duration-700 group-hover:start-[120%] group-hover:opacity-100" />
              {hasContact() && <WhatsApp width={20} height={20} />}
              {hasContact() ? t.cta.contact : t.cta.work}
            </a>
            <a
              href="#work"
              onClick={go('#work')}
              className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/15 px-6 font-display font-medium text-ink transition-colors hover:border-accent-strong hover:text-accent-strong"
            >
              {t.cta.work}
              <ArrowDown width={18} height={18} />
            </a>
          </div>
        </m.div>

        {heroConcept && (
          <m.div style={{ y: stageY, scale: stageScale }} className="rise relative mx-auto w-full max-w-[560px]">
            <div ref={stage} className="relative [perspective:1600px]" style={{ transform: 'translate3d(var(--tx,0),var(--ty,0),0)', transition: ease }}>
              <div className="ms-auto w-[86%]" style={{ transform: 'rotateX(var(--rx,0deg)) rotateY(calc(var(--ry,0deg) - 10deg))', transition: ease }}>
                <BrowserFrame src={demoPreview(1)} label={t.hero.browserLabel} />
              </div>
              <div
                className="absolute -bottom-14 start-0 w-[38%] max-w-[220px]"
                style={{ transform: 'translate3d(calc(var(--tx,0px) * -1.4), calc(var(--ty,0px) * -1.4), 0)', transition: ease }}
              >
                <PhoneFrame label={t.hero.phoneLabel}>
                  <AutoScrollScreen src={asset(`concepts/${heroConcept.concept}/scroll.webp`)} width={560} height={3733} />
                </PhoneFrame>
              </div>
              {t.hero.chips.map((c, i) => (
                <span
                  key={c}
                  aria-hidden
                  className={`float absolute hidden items-center gap-1.5 rounded-full border border-white/10 bg-surface/90 px-3 py-1.5 text-sm text-ink shadow-xl backdrop-blur sm:inline-flex ${
                    ['-top-5 start-[18%]', 'top-[46%] -end-3', '-bottom-8 end-[12%]'][i]
                  }`}
                  style={{ ['--d' as string]: `${i * -1.7}s` }}
                >
                  <Check width={15} height={15} className="text-accent-strong" />
                  {c}
                </span>
              ))}
            </div>
          </m.div>
        )}
      </div>

      <div className="mx-auto max-w-[1240px] px-4 pb-16 sm:px-6">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-10 md:grid-cols-4">
          {t.hero.stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </dl>
      </div>
    </section>
  )
}
