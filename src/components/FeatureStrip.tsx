import { useLang } from '../lib/lang'
import { Marquee } from './Marquee'

/** Big kinetic word band + the small feature list underneath. */
export function FeatureStrip() {
  const { t } = useLang()
  return (
    <div className="overflow-hidden border-y border-line py-8">
      <ul className="sr-only">
        {t.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <Marquee duration={40} repeat={3}>
        {t.bigWords.map((w, i) => (
          <span key={w} aria-hidden className={`flex items-center gap-8 whitespace-nowrap font-display text-[clamp(2.6rem,8vw,6rem)] font-bold leading-none ${i % 2 ? 'text-outline' : 'text-ink'}`}>
            {w}
            <span className="inline-block size-3 rounded-full bg-accent-strong sm:size-4" />
          </span>
        ))}
      </Marquee>
      <Marquee duration={50} repeat={3} className="reverse mt-6">
        {t.features.map((f) => (
          <span key={f} aria-hidden className="flex items-center gap-6 whitespace-nowrap text-base text-muted">
            {f}
            <span className="size-1.5 rounded-full bg-saffron" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
