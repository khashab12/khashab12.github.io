/** Intro curtain. CSS-only (index.css) so it always clears, even before JS loads. */
export function Loader() {
  return (
    <div aria-hidden className="loader fixed inset-0 z-[80] flex flex-col items-center justify-center bg-paper">
      <div className="loader-mark font-display text-[clamp(2.4rem,9vw,4.5rem)] font-bold tracking-tight">
        <span className="text-ink">م</span>
        <span className="mx-3 text-accent-strong">×</span>
        <span className="text-ink">ي</span>
      </div>
      <div className="mt-6 h-px w-40 overflow-hidden bg-line">
        <div className="loader-bar h-full w-full bg-gradient-to-r from-accent-strong to-saffron" />
      </div>
    </div>
  )
}
