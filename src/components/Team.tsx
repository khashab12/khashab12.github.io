import { useLang } from '../lib/lang'
import { Reveal } from './Reveal'

const TONE: Record<string, { badge: string; glow: string }> = {
  mohamed: { badge: 'bg-accent text-paper', glow: 'bg-accent/25' },
  yousef: { badge: 'bg-saffron text-paper', glow: 'bg-saffron/20' },
}

export function Team() {
  const { t } = useLang()
  return (
    <section id="team" aria-labelledby="team-title" className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 md:py-32">
      <Reveal className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end md:gap-16">
        <h2 id="team-title" className="text-[clamp(2.2rem,7vw,4.4rem)] font-bold leading-[1.05] tracking-tight">
          {t.team.title}
        </h2>
        <p className="max-w-[60ch] text-lg text-ink-2">{t.team.intro}</p>
      </Reveal>

      <ul className="mt-14 grid gap-5 md:grid-cols-2">
        {t.team.members.map((mb, i) => (
          <li key={mb.id}>
            <Reveal delay={i * 0.1} className="h-full">
              <article className="edge spotlight relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 sm:p-10">
                <div aria-hidden className={`absolute -end-20 -top-20 size-64 rounded-full blur-3xl ${TONE[mb.id].glow}`} />
                <span aria-hidden className="pointer-events-none absolute -bottom-10 end-4 font-display text-[11rem] font-bold leading-none text-white/[0.03]">
                  {mb.initials}
                </span>
                <div className="relative flex items-center gap-5">
                  <span aria-hidden className={`grid size-20 shrink-0 place-items-center rounded-3xl font-display text-4xl font-bold shadow-xl ${TONE[mb.id].badge}`}>
                    {mb.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold sm:text-3xl">{mb.name}</h3>
                    <p className="mt-1 text-sm text-muted">{mb.role}</p>
                  </div>
                </div>
                <p className="relative mt-7 text-lg text-ink-2">{mb.body}</p>
                <ul className="relative mt-auto flex flex-wrap gap-2 pt-8" dir="ltr">
                  {mb.skills.map((s) => (
                    <li key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-ink-2">
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
