import { useLang } from '../lib/lang'
import { Reveal, SectionTitle } from './Reveal'

const TONE: Record<string, string> = {
  mohamed: 'bg-accent text-white',
  yousef: 'bg-saffron text-ink',
}

export function Team() {
  const { t } = useLang()
  return (
    <section id="team" aria-labelledby="team-title" className="mx-auto max-w-[1120px] px-4 py-20 sm:px-6 md:py-28">
      <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal>
          <SectionTitle id="team-title">{t.team.title}</SectionTitle>
        </Reveal>
        <Reveal>
          <p className="max-w-[62ch] text-lg text-ink-2">{t.team.intro}</p>
        </Reveal>
      </div>

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {t.team.members.map((m, i) => (
          <li key={m.id}>
            <Reveal delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-line bg-surface p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <span aria-hidden className={`grid size-14 shrink-0 place-items-center rounded-2xl font-display text-2xl font-bold ${TONE[m.id]}`}>
                    {m.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold">{m.name}</h3>
                    <p className="text-sm text-muted">{m.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-ink-2">{m.body}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" dir="ltr">
                  {m.skills.map((s) => (
                    <li key={s} className="rounded-lg bg-paper px-2.5 py-1 text-xs text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
