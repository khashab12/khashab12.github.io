import { useLang } from '../lib/lang'
import { asset, heroConcept } from '../lib/projects'
import { primaryTarget, hasContact } from '../lib/contact'
import { scrollToHash } from '../lib/scroll'
import { PhoneFrame } from './PhoneFrame'
import { AutoScrollScreen } from './AutoScrollScreen'

export function Hero() {
  const { t } = useLang()
  const target = primaryTarget()
  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToHash(hash)
  }

  return (
    <section id="top" className="mx-auto grid max-w-[1120px] items-center gap-10 px-4 pb-16 pt-8 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:pb-24 md:pt-16">
      <div className="max-w-xl">
        <p className="hero-rise mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-strong">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          {t.hero.eyebrow}
        </p>
        <h1 className="text-[clamp(2.4rem,9vw,4rem)] font-bold leading-[1.1] tracking-tight">
          {t.hero.name}
        </h1>
        <p className="mt-4 text-[clamp(1.15rem,4.2vw,1.45rem)] leading-relaxed text-ink-2">
          {t.hero.line}
        </p>
        <div className="hero-rise mt-8 [animation-delay:120ms] flex flex-wrap items-center gap-3">
          <a
            href={target}
            onClick={go(target)}
            className="inline-flex min-h-12 items-center rounded-2xl bg-accent px-6 font-display text-base font-medium text-white transition-colors hover:bg-accent-strong"
          >
            {hasContact() ? t.cta.contact : t.cta.work}
          </a>
          {hasContact() && (
            <a href="#work" onClick={go('#work')} className="inline-flex min-h-12 items-center rounded-2xl px-4 font-medium text-accent-strong underline-offset-4 hover:underline">
              {t.cta.work}
            </a>
          )}
        </div>
      </div>

      {heroConcept && (
        <div
          className="hero-phone relative mx-auto w-full max-w-[290px] md:max-w-[min(300px,calc((100svh-9rem)*0.46))]"
        >
          <div aria-hidden className="absolute inset-x-[-18%] top-[12%] bottom-[8%] -z-10 rounded-[40%] bg-accent-soft blur-2xl" />
          <PhoneFrame label={t.hero.phoneLabel}>
            <AutoScrollScreen src={asset(`concepts/${heroConcept.concept}/scroll.webp`)} width={560} height={3733} />
          </PhoneFrame>
        </div>
      )}
    </section>
  )
}
