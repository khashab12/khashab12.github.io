import { useLang } from '../lib/lang'
import { Reveal, SectionHead } from './Reveal'

const TONE: Record<string, { badge: string; glow: string }> = {
  mohamed: { badge: 'bg-accent text-paper', glow: '#2fcf9f' },
  yousef: { badge: 'bg-saffron text-paper', glow: '#f5b544' },
}

export function Team() {
  const { t } = useLang()
  return (
    <section id="team" aria-labelledby="team-title" className="mx-auto max-w-[1180px] px-4 py-24 sm:px-6 md:py-36">
      <SectionHead id="team-title" title={t.team.title} sub={t.team.intro} />
      <ul className="mt-14 grid gap-4 md:grid-cols-2">
        {t.team.members.map((mb, i) => (
          <li key={mb.id}>
            <Reveal delay={i * 0.1} className="h-full">
              <article className="glass relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 sm:p-9">
                <div aria-hidden className="pointer-events-none absolute -end-20 -top-24 size-64 rounded-full opacity-30 blur-3xl" style={{ background: TONE[mb.id].glow }} />
                <div className="relative flex items-center gap-4">
                  <span aria-hidden className={`grid size-16 shrink-0 place-items-center rounded-[1.25rem] font-display text-3xl font-bold ${TONE[mb.id].badge}`}>
                    {mb.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold">{mb.name}</h3>
                    <p className="mt-0.5 text-sm text-muted">{mb.role}</p>
                  </div>
                </div>
                <p className="relative mt-6 text-[1.05rem] leading-relaxed text-ink-2">{mb.body}</p>
                <ul className="relative mt-auto flex flex-wrap gap-2 pt-7" dir="ltr">
                  {mb.skills.map((s) => (
                    <li key={s} className="glass-soft rounded-full px-3 py-1 text-xs text-ink-2">
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
