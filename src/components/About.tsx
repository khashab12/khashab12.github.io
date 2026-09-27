import { useLang } from '../lib/lang'
import { Reveal, SectionTitle } from './Reveal'

export function About() {
  const { t } = useLang()
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-[1120px] px-4 py-20 sm:px-6 md:py-28">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal>
          <SectionTitle id="about-title">{t.about.title}</SectionTitle>
        </Reveal>
        <div>
          <Reveal>
            {t.about.body.map((p) => (
              <p key={p} className="mb-4 max-w-[62ch] text-lg text-ink-2">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {t.about.facts.map((f) => (
                <div key={f.label} className="bg-surface p-4">
                  <dt className="text-sm text-muted">{f.label}</dt>
                  <dd className="mt-1 font-medium leading-snug">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
