import { useLang } from '../lib/lang'
import { Marquee } from './Marquee'

export function FeatureStrip() {
  const { t } = useLang()
  return (
    <div className="py-16 md:py-20">
      <ul className="sr-only">
        {t.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <Marquee duration={55} repeat={3}>
        {t.features.map((f) => (
          <span key={f} aria-hidden className="glass-soft whitespace-nowrap rounded-full px-5 py-2.5 text-[0.95rem] text-ink-2">
            {f}
          </span>
        ))}
      </Marquee>
    </div>
  )
}
