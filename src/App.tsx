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
import { Ambient } from './components/Ambient'
import { ScrollProgress } from './components/ScrollProgress'

// Animation features load after the first render, keeping them out of the initial bundle.
const loadFeatures = () => import('./lib/motion-features').then((m) => m.default)

function Footer() {
  const { t, toggle } = useLang()
  return (
    <footer className="px-4 pb-8 sm:px-6">
      <div className="glass-soft mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-3 rounded-full px-6 py-3 text-sm text-muted">
        <p>
          {t.footer.rights(new Date().getFullYear())} · {t.footer.city}
        </p>
        <button type="button" onClick={toggle} className="min-h-10 rounded-full px-4 font-display text-ink-2 hover:bg-white/10">
          {t.nav.langSwitchLabel}
        </button>
      </div>
    </footer>
  )
}

export default function App() {
  const { t } = useLang()

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
        <Ambient />
        <ScrollProgress />
        <Nav />
        <main id="main">
          <Hero />
          <FeatureStrip />
          <Team />
          <Services />
          <Work />
          <HowIWork />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </LazyMotion>
    </MotionConfig>
  )
}
