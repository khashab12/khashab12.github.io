import { lazy, Suspense, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { useLang } from '../lib/lang'
import { asset, concepts, realProjects } from '../lib/projects'
import { Reveal, SectionTitle } from './Reveal'
import { External } from './Icons'

const ConceptModal = lazy(() => import('./ConceptModal').then((mod) => ({ default: mod.ConceptModal })))
const INITIAL = 8

export function Work() {
  const { t, lang } = useLang()
  const [open, setOpen] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? concepts : concepts.slice(0, INITIAL)

  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-[1120px] px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionTitle id="work-title">{t.work.title}</SectionTitle>
      </Reveal>

      {realProjects.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-bold">{t.work.realTitle}</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {realProjects.map((p) => (
              <li key={p.id}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent"
                >
                  {p.logo ? (
                    <img src={asset(p.logo)} alt="" width={56} height={56} loading="lazy" decoding="async" className="size-14 rounded-xl object-contain" />
                  ) : (
                    <span className="size-14 rounded-xl bg-accent-soft" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block font-display font-bold">{p.name[lang]}</span>
                    <span className="block text-sm text-muted">{p.city[lang]}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-strong">
                    {t.work.visit}
                    <External width={16} height={16} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {concepts.length > 0 && (
        <div className="mt-12">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold">
              {t.work.conceptsTitle}
              {lang === 'ar' && <span className="ms-2 font-body text-base font-normal text-muted">/ Concepts</span>}
            </h3>
            <p className="mt-2 text-ink-2">{t.work.conceptsNote}</p>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`${t.work.open}: ${t.work.concept(c.concept)}`}
                  className="group block w-full overflow-hidden rounded-2xl border border-line bg-surface text-start transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent"
                >
                  <span className="block aspect-[4/5] overflow-hidden bg-line">
                    <img
                      src={asset(`concepts/${c.concept}/cover.webp`)}
                      srcSet={`${asset(`concepts/${c.concept}/cover-320.webp`)} 320w, ${asset(`concepts/${c.concept}/cover.webp`)} 480w`}
                      sizes="(min-width: 1024px) 260px, (min-width: 768px) 33vw, 50vw"
                      alt=""
                      width={480}
                      height={862}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="flex items-center justify-between gap-2 px-3 py-2.5">
                    <span className="font-display text-sm font-bold" dir="ltr">
                      {t.work.concept(c.concept)}
                    </span>
                    <span className="flex" aria-hidden>
                      {c.colors?.map((col) => (
                        <span key={col} className="-ms-1.5 size-4 rounded-full ring-2 ring-surface first:ms-0" style={{ background: col }} />
                      ))}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {!showAll && concepts.length > INITIAL && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="inline-flex min-h-12 items-center rounded-2xl border border-ink/15 bg-surface px-6 font-display font-medium transition-colors hover:border-accent"
              >
                {t.work.showAll(concepts.length)}
              </button>
            </div>
          )}
        </div>
      )}

      <Suspense>
        <AnimatePresence>
          {open !== null && <ConceptModal key="modal" list={visible} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
        </AnimatePresence>
      </Suspense>
    </section>
  )
}
