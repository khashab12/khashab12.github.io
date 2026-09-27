import { useLang } from '../lib/lang'
import { testimonials } from '../lib/projects'
import { Reveal, SectionTitle } from './Reveal'

/** Renders only real testimonials from src/data/testimonials.json; nothing when the file is empty. */
export function Testimonials() {
  const { t, lang } = useLang()
  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="mx-auto max-w-[1120px] px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionTitle id="testimonials-title">{t.testimonials.title}</SectionTitle>
      </Reveal>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {testimonials.map((q, i) => (
          <li key={i}>
            <Reveal delay={i * 0.05}>
              <figure className="h-full rounded-3xl border border-line bg-surface p-6 sm:p-8">
                <blockquote className="text-lg leading-relaxed text-ink-2">“{q.quote[lang]}”</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-display font-bold text-ink">{q.name}</span>
                  {(q.place || q.city) && (
                    <span className="text-muted"> · {[q.place?.[lang], q.city?.[lang]].filter(Boolean).join('، ')}</span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
