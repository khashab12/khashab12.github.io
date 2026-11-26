import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { useLang } from '../lib/lang'
import { formatNumber } from '../i18n'
import { asset, demoPreview, heroConcept } from '../lib/projects'
import { primaryTarget, hasContact } from '../lib/contact'
import { scrollToHash } from '../lib/scroll'
import { useCountUp } from '../lib/fx'
import { PhoneFrame } from './PhoneFrame'
import { AutoScrollScreen } from './AutoScrollScreen'
import { Reveal } from './Reveal'
import { WhatsApp } from './Icons'

function Words({ text, offset = 0, className = '' }: { text: string; offset?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i}>
          <span className="word-mask">
            <span className="word" style={{ ['--i' as string]: i + offset }}>
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
    <div className="flex flex-col-reverse items-center px-2 py-5 text-center">
      <dt className="mt-1.5 text-xs leading-snug text-muted sm:text-sm">{label}</dt>
      <dd ref={ref as React.RefObject<HTMLElement>} className="font-display text-[1.7rem] font-bold leading-none tabular-nums sm:text-4xl">
        {pre}
        {formatNumber(v, lang)}
        {post}
      </dd>
    </div>
  )
}

export function Hero() {
  const { t } = useLang()
  const target = primaryTarget()
  const stageRef = useRef<HTMLDivElement>(null)
  // Apple-style: the device stage straightens and grows as it scrolls into place (touch too).
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'center center'] })
  const tilt = useTransform(scrollYProgress, [0, 1], [18, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  const phoneY = useTransform(scrollYProgress, [0, 1], [120, 0])

  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToHash(hash)
  }

  return (
    <section id="top" className="relative px-4 pt-28 sm:px-6 md:pt-32">
      <div className="mx-auto max-w-[920px] text-center">
        <p className="rise glass-soft inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm text-ink-2">
          <span className="relative flex size-2">
            <span className="ping absolute inline-flex size-full rounded-full bg-accent-strong" />
            <span className="relative inline-flex size-2 rounded-full bg-accent-strong" />
          </span>
          {t.hero.available}
        </p>

        <h1 className="mt-7 text-[clamp(2.7rem,9vw,5.6rem)] font-bold leading-[1.04] tracking-tight">
          <Words text={t.hero.titleA} className="block" />
          <Words text={t.hero.titleB} offset={t.hero.titleA.split(' ').length} className="block text-muted" />
        </h1>

        <p className="rise mx-auto mt-6 max-w-2xl text-[clamp(1.05rem,3.6vw,1.3rem)] leading-relaxed text-ink-2" style={{ ['--d' as string]: '120ms' }}>
          {t.hero.line}
        </p>

        <div className="rise mt-9 flex flex-wrap items-center justify-center gap-3" style={{ ['--d' as string]: '220ms' }}>
          <a href={target} onClick={go(target)} className="inline-flex min-h-[3.25rem] items-center gap-2 rounded-full bg-ink px-7 font-display font-medium text-paper transition-transform hover:scale-[1.03] active:scale-95">
            {hasContact() && <WhatsApp width={19} height={19} />}
            {hasContact() ? t.cta.contact : t.cta.work}
          </a>
          <a href="#work" onClick={go('#work')} className="glass inline-flex min-h-[3.25rem] items-center rounded-full px-7 font-display font-medium text-ink transition-transform hover:scale-[1.03] active:scale-95">
            {t.cta.work}
          </a>
        </div>

        <p className="rise mt-8 inline-flex items-center gap-2.5 text-sm text-muted" style={{ ['--d' as string]: '320ms' }}>
          <span aria-hidden className="flex">
            <span className="grid size-7 place-items-center rounded-full bg-accent text-xs font-bold text-paper ring-2 ring-paper">{t.team.members[0].initials}</span>
            <span className="-ms-2 grid size-7 place-items-center rounded-full bg-saffron text-xs font-bold text-paper ring-2 ring-paper">{t.team.members[1].initials}</span>
          </span>
          {t.hero.names}
        </p>
      </div>

      {heroConcept && (
        <div ref={stageRef} className="mx-auto mt-14 max-w-[1080px] [perspective:1400px]">
          <m.div style={{ rotateX: tilt, scale }} className="relative origin-bottom">
            <div className="glass rounded-[1.6rem] p-2 sm:p-3">
              <div className="mb-2 flex items-center gap-1.5 px-2 pt-1 sm:mb-3" dir="ltr">
                <span className="size-2.5 rounded-full bg-white/25" />
                <span className="size-2.5 rounded-full bg-white/25" />
                <span className="size-2.5 rounded-full bg-white/25" />
              </div>
              <div className="overflow-hidden rounded-[1.1rem] bg-surface">
                <img src={demoPreview(1)} alt={t.hero.browserLabel} width={1365} height={918} decoding="async" className="block aspect-[1365/918] w-full object-cover object-top" />
              </div>
            </div>
            <m.div style={{ y: phoneY }} className="absolute -bottom-8 end-[4%] w-[26%] max-w-[230px] sm:-bottom-12">
              <PhoneFrame label={t.hero.phoneLabel}>
                <AutoScrollScreen src={asset(`concepts/${heroConcept.concept}/scroll.webp`)} width={560} height={3733} />
              </PhoneFrame>
            </m.div>
          </m.div>
        </div>
      )}

      <Reveal className="mx-auto mt-24 max-w-[920px]">
        <dl className="glass grid grid-cols-2 rounded-[1.75rem] md:grid-cols-4">
          {t.hero.stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
