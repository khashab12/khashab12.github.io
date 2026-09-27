import { useState } from 'react'
import { useLang } from '../lib/lang'
import { Reveal, SectionTitle } from './Reveal'
import { Cart, Check, Pin, Plus, Target, WhatsApp } from './Icons'

// Sample palettes for the live preview (taken from the concept designs).
const PALETTES = [
  { primary: '#1e2b52', accent: '#e2622b', bg: '#f4ecdc', ink: '#1e2b52' },
  { primary: '#4a2e1c', accent: '#c49a5f', bg: '#efe4d1', ink: '#2e1d12' },
  { primary: '#2f3b30', accent: '#8fae6b', bg: '#f1f7ef', ink: '#2f3b30' },
  { primary: '#6e1f2a', accent: '#e0b35a', bg: '#f3e6d6', ink: '#3a1216' },
]

function MenuPreview({ p }: { p: (typeof PALETTES)[number] }) {
  const { t } = useLang()
  const v = t.services.menu.preview
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-2xl border border-line text-[13px] shadow-sm transition-colors duration-500"
      style={{ background: p.bg, color: p.ink }}
    >
      <div className="px-4 pb-4 pt-5 text-center transition-colors duration-500" style={{ background: p.primary, color: p.bg }}>
        <div className="mx-auto mb-2 grid size-9 place-items-center rounded-full border-2" style={{ borderColor: p.accent }}>
          <span className="size-3 rounded-full" style={{ background: p.accent }} />
        </div>
        <div className="font-display text-lg font-bold leading-none">{v.place}</div>
      </div>
      <div className="px-4 py-3">
        <div className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white transition-colors duration-500" style={{ background: p.accent }}>
          {v.category}
        </div>
        {v.items.map((i) => (
          <div key={i.name} className="flex items-baseline justify-between border-b border-current/10 py-1.5 last:border-0">
            <span>
              <span className="font-medium">{i.name}</span>
              <span className="ms-2 opacity-60">{i.cal}</span>
            </span>
            <span className="font-display font-bold">{i.price}</span>
          </div>
        ))}
        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-xl py-2 font-medium text-white" style={{ background: '#1f8f4e' }}>
          <WhatsApp width={16} height={16} />
          {v.order}
        </div>
      </div>
    </div>
  )
}

export function Services() {
  const { t } = useLang()
  const [palette, setPalette] = useState(0)
  const s = t.services

  return (
    <section id="services" aria-labelledby="services-title" className="mx-auto max-w-[1120px] px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionTitle id="services-title">{s.title}</SectionTitle>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto]">
        {/* Website + menu: the main offer, largest tile */}
        <Reveal className="md:col-span-2 md:row-span-2">
          <article className="grid h-full gap-6 rounded-3xl border border-line bg-surface p-6 sm:grid-cols-[1fr_minmax(0,15rem)] sm:p-8">
            <div>
              <h3 className="text-2xl font-bold">{s.menu.title}</h3>
              <p className="mt-2 text-ink-2">{s.menu.body}</p>
              <ul className="mt-6 grid gap-2.5">
                {s.menu.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong">
                      <Check width={14} height={14} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                <Plus width={16} height={16} className="mt-[0.2rem] shrink-0 text-accent-strong" />
                <span className="min-w-0">{s.menu.extras}</span>
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <MenuPreview p={PALETTES[palette]} />
              <div role="radiogroup" aria-label={s.menu.paletteLabel} className="flex items-center justify-center gap-2">
                {PALETTES.map((p, i) => (
                  <button
                    key={p.primary}
                    type="button"
                    role="radio"
                    aria-checked={palette === i}
                    aria-label={`${s.menu.paletteLabel} ${i + 1}`}
                    onClick={() => setPalette(i)}
                    className="grid size-11 place-items-center rounded-full"
                  >
                    <span
                      className={`block size-7 rounded-full ring-offset-2 ring-offset-surface transition-shadow ${palette === i ? 'ring-2 ring-ink' : 'ring-1 ring-line'}`}
                      style={{ background: `linear-gradient(135deg, ${p.primary} 50%, ${p.accent} 50%)` }}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-muted">{s.menu.paletteLabel}</p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.06}>
          <article className="h-full rounded-3xl bg-ink p-6 text-paper sm:p-8">
            <h3 className="text-xl font-bold">{s.ads.title}</h3>
            <p className="mt-1 text-paper/75">{s.ads.body}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.ads.platforms.map((p) => (
                <li key={p} className="rounded-full border border-paper/20 px-3 py-1 text-sm">
                  {p}
                </li>
              ))}
            </ul>
            <ul className="mt-5 grid gap-2.5">
              {s.ads.points.map((pt, i) => {
                const Icon = [Pin, Target, Check][i] ?? Check
                return (
                  <li key={pt} className="flex items-start gap-2.5">
                    <Icon width={18} height={18} className="mt-1 shrink-0 text-saffron" />
                    {pt}
                  </li>
                )
              })}
            </ul>
          </article>
        </Reveal>

        <Reveal delay={0.12}>
          <article className="flex h-full flex-col rounded-3xl border border-line bg-accent-soft p-6 sm:p-8">
            <span className="grid size-11 place-items-center rounded-2xl bg-surface text-accent-strong">
              <Cart />
            </span>
            <h3 className="mt-4 text-xl font-bold">{s.shopify.title}</h3>
            <p className="mt-1 text-ink-2">{s.shopify.body}</p>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
