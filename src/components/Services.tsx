import { useLang } from '../lib/lang'
import { Reveal, SectionHead } from './Reveal'
import { Cart, Globe, Mobile, Pin, Spark, Target } from './Icons'

const ICON = { web: Globe, shop: Cart, apps: Mobile, bots: Spark, ads: Target, reach: Pin } as const

export function Services() {
  const { t } = useLang()
  const s = t.services
  return (
    <section id="services" aria-labelledby="services-title" className="mx-auto max-w-[1180px] px-4 py-24 sm:px-6 md:py-36">
      <SectionHead id="services-title" title={s.title} sub={s.subtitle} />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {s.cards.map((c, i) => {
          const Icon = ICON[c.k as keyof typeof ICON] ?? Globe
          return (
            <li key={c.k}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <article className="glass group flex h-full flex-col rounded-[2rem] p-7 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5">
                  <span className="glass-soft grid size-12 place-items-center rounded-2xl text-accent-strong transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon width={22} height={22} />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{c.body}</p>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
