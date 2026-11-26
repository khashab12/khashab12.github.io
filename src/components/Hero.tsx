import { useLang } from '../lib/lang'
import { asset, demoPreview, heroConcept } from '../lib/projects'
import { primaryTarget, hasContact } from '../lib/contact'
import { scrollToHash } from '../lib/scroll'
import { PhoneFrame } from './PhoneFrame'
import { AutoScrollScreen } from './AutoScrollScreen'

function BrowserFrame({ src, label }: { src: string; label: string }) {
  return (
    <div role="img" aria-label={label} className="overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-[0_30px_70px_-25px_rgb(15_42_43/0.45)]">
      <div className="flex items-center gap-1.5 border-b border-line bg-paper px-3 py-2" dir="ltr">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ms-3 h-4 flex-1 rounded-md bg-line/70" />
      </div>
      <img src={src} onError={(e) => (e.currentTarget.style.visibility = 'hidden')} alt="" width={1365} height={918} decoding="async" fetchPriority="low" referrerPolicy="no-referrer" className="block aspect-[1365/918] w-full bg-line object-cover object-top" />
    </div>
  )
}

export function Hero() {
  const { t } = useLang()
  const target = primaryTarget()
  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToHash(hash)
  }

  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft brand glow */}
      <div aria-hidden className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[34rem] w-[34rem] rounded-full bg-accent-soft blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -start-40 -z-10 h-[26rem] w-[26rem] rounded-full bg-saffron/15 blur-3xl" />

      <div className="mx-auto grid max-w-[1120px] items-center gap-12 px-4 pb-16 pt-8 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:pb-24 md:pt-16">
        <div className="max-w-xl">
          <p className="hero-rise mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-strong">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {t.hero.eyebrow}
          </p>
          <h1 className="text-[clamp(2.4rem,8.5vw,4.1rem)] font-bold leading-[1.1] tracking-tight">
            {t.hero.title}
          </h1>
          <p className="mt-4 inline-flex flex-wrap items-center gap-2 font-display text-lg font-medium text-ink-2">
            <span aria-hidden className="flex">
              <span className="grid size-8 place-items-center rounded-full bg-accent text-sm font-bold text-white ring-2 ring-paper">{t.team.members[0].initials}</span>
              <span className="-ms-2 grid size-8 place-items-center rounded-full bg-saffron text-sm font-bold text-ink ring-2 ring-paper">{t.team.members[1].initials}</span>
            </span>
            {t.hero.names}
          </p>
          <p className="mt-4 text-[clamp(1.1rem,4vw,1.35rem)] leading-relaxed text-ink-2">{t.hero.line}</p>
          <div className="hero-rise mt-8 flex flex-wrap items-center gap-3 [animation-delay:120ms]">
            <a
              href={target}
              onClick={go(target)}
              className="inline-flex min-h-12 items-center rounded-2xl bg-accent px-6 font-display text-base font-medium text-white shadow-[0_10px_24px_-10px_rgb(11_110_95/0.7)] transition-colors hover:bg-accent-strong"
            >
              {hasContact() ? t.cta.contact : t.cta.work}
            </a>
            {hasContact() && (
              <a href="#work" onClick={go('#work')} className="inline-flex min-h-12 items-center rounded-2xl border border-ink/15 bg-surface px-5 font-display font-medium text-ink transition-colors hover:border-accent">
                {t.cta.work}
              </a>
            )}
          </div>
          <dl className="hero-rise mt-10 grid max-w-md grid-cols-3 gap-3 [animation-delay:200ms]">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="border-s-2 border-accent/40 ps-3">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold leading-none" dir="auto">{s.value}</dd>
                <dd className="mt-1.5 text-xs leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {heroConcept && (
          <div className="hero-phone relative mx-auto w-full max-w-[520px]">
            <div className="ms-auto w-[88%] [transform:perspective(1400px)_rotateY(-8deg)] rtl:[transform:perspective(1400px)_rotateY(8deg)]">
              <BrowserFrame src={demoPreview(1)} label={t.hero.browserLabel} />
            </div>
            <div className="absolute -bottom-10 start-0 w-[42%] max-w-[230px]">
              <PhoneFrame label={t.hero.phoneLabel}>
                <AutoScrollScreen src={asset(`concepts/${heroConcept.concept}/scroll.webp`)} width={560} height={3733} />
              </PhoneFrame>
            </div>
            <div aria-hidden className="h-10" />
          </div>
        )}
      </div>
    </section>
  )
}
