import { useLang } from '../lib/lang'
import { hasContact, primaryTarget } from '../lib/contact'
import { scrollToHash } from '../lib/scroll'

export function Nav() {
  const { t, toggle } = useLang()
  const target = primaryTarget()
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-paper/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#top"
          onClick={(e) => (e.preventDefault(), scrollToHash('#top'))}
          className="font-display text-xl font-bold tracking-tight"
        >
          {t.nav.wordmark}
          <span aria-hidden className="text-accent-strong">.</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {t.nav.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => (e.preventDefault(), scrollToHash(l.href))}
                className="inline-flex min-h-11 items-center rounded-xl px-3 font-display text-sm font-medium text-ink-2 transition-colors hover:bg-white/5"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={t.nav.langSwitchLabel}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl px-3 font-display text-sm font-medium text-ink-2 transition-colors hover:bg-white/5"
          >
            {t.nav.langSwitch}
          </button>
          <a
            href={target}
            onClick={(e) => (e.preventDefault(), scrollToHash(target))}
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 font-display text-sm font-bold text-paper transition-colors hover:bg-accent-strong"
          >
            {hasContact() ? t.cta.contact : t.cta.work}
          </a>
        </div>
      </nav>
    </header>
  )
}
