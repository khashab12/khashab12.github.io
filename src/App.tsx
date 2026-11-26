import { useEffect } from 'react'
import { LazyMotion, MotionConfig } from 'motion/react'
import { useLang } from './lib/lang'
import { startSmoothScroll } from './lib/scroll'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { FeatureStrip } from './components/FeatureStrip'
import { Team } from './components/Team'
import { Services } from './components/Services'
import { HowIWork } from './components/HowIWork'
import { Work } from './components/Work'
import { Testimonials } from './components/Testimonials'
import { Contact } from './components/Contact'
import { Loader } from './components/Loader'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { useSpotlightTracking } from './lib/fx'

// Animation features load after the first render, keeping them out of the initial bundle.
const loadFeatures = () => import('./lib/motion-features').then((m) => m.default)

function Footer() {
  const { t, toggle } = useLang()
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[1240px] px-4 pt-14 sm:px-6">
        <p aria-hidden className="text-outline select-none whitespace-nowrap text-center font-display text-[clamp(2.4rem,12.5vw,11rem)] font-bold leading-none">
          {t.nav.wordmark}
        </p>
      </div>
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-4 py-8 text-sm text-muted sm:px-6">
        <p>
          {t.footer.rights(new Date().getFullYear())} · {t.footer.city}
        </p>
        <button type="button" onClick={toggle} className="min-h-11 rounded-full px-4 font-display font-medium text-ink-2 hover:bg-white/5">
          {t.nav.langSwitchLabel}
        </button>
      </div>
    </footer>
  )
}

export default function App() {
  const { t } = useLang()
  useSpotlightTracking()

  useEffect(() => {
    // Wait for first paint before loading smooth scroll; it isn't needed for LCP.
    // Safari has no requestIdleCallback.
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => void startSmoothScroll())
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(() => void startSmoothScroll(), 300)
    return () => clearTimeout(id)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <a href="#main" className="sr-only z-50 rounded-xl bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:start-3 focus:top-3">
          {t.skip}
        </a>
        <Loader />
        <ScrollProgress />
        <Cursor />
        <Nav />
        <main id="main">
          <Hero />
          <FeatureStrip />
          <Work />
          <Services />
          <HowIWork />
          <Team />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </LazyMotion>
    </MotionConfig>
  )
}
