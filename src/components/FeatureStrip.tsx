import { useLang } from '../lib/lang'
import { Marquee } from './Marquee'

export function FeatureStrip() {
  const { t } = useLang()
  return (
    <div className="border-y border-line bg-surface py-4">
      <ul className="sr-only">
        {t.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <Marquee duration={45}>
        {t.features.map((f) => (
          <span key={f} aria-hidden className="flex items-center gap-6 whitespace-nowrap font-display text-base text-ink-2">
            {f}
            <span className="size-1.5 rounded-full bg-saffron" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
