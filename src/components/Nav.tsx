import { useLang } from '../lib/lang'
import { hasContact, primaryTarget } from '../lib/contact'
import { scrollToHash } from '../lib/scroll'

export function Nav() {
  const { t, toggle } = useLang()
  const target = primaryTarget()
  const go = (h: string) => (e: React.MouseEvent) => (e.preventDefault(), scrollToHash(h))
  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3">
      <nav className="glass-nav mx-auto flex h-14 max-w-[1080px] items-center justify-between gap-2 rounded-full ps-5 pe-2">
        <a href="#top" onClick={go('#top')} className="font-display text-[1.05rem] font-bold tracking-tight">
          {t.nav.wordmark}
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {t.nav.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={go(l.href)} className="inline-flex min-h-10 items-center rounded-full px-4 text-sm text-ink-2 transition-colors hover:bg-white/10 hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <button type="button" onClick={toggle} aria-label={t.nav.langSwitchLabel} className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full px-3 font-display text-sm text-ink-2 transition-colors hover:bg-white/10 hover:text-ink">
            {t.nav.langSwitch}
          </button>
          <a href={target} onClick={go(target)} className="inline-flex min-h-10 items-center rounded-full bg-ink px-4 font-display text-sm font-medium text-paper transition-transform active:scale-95">
            {hasContact() ? t.cta.contact : t.cta.work}
          </a>
        </div>
      </nav>
    </header>
  )
}
