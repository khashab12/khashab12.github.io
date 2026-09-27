import { useLang } from '../lib/lang'
import { hasContact, primaryTarget } from '../lib/contact'
import { scrollToHash } from '../lib/scroll'

export function Nav() {
  const { t, toggle } = useLang()
  const target = primaryTarget()
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/70">
      <nav className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#top"
          onClick={(e) => (e.preventDefault(), scrollToHash('#top'))}
          className="font-display text-xl font-bold tracking-tight"
        >
          {t.nav.wordmark}
          <span aria-hidden className="text-saffron">.</span>
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={t.nav.langSwitchLabel}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl px-3 font-display text-sm font-medium text-ink-2 transition-colors hover:bg-accent-soft"
          >
            {t.nav.langSwitch}
          </button>
          <a
            href={target}
            onClick={(e) => (e.preventDefault(), scrollToHash(target))}
            className="inline-flex min-h-11 items-center rounded-xl bg-ink px-4 font-display text-sm font-medium text-paper transition-colors hover:bg-ink-2"
          >
            {hasContact() ? t.cta.contact : t.cta.work}
          </a>
        </div>
      </nav>
    </header>
  )
}
