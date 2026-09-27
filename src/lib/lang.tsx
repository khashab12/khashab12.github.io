import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, type Dict, type Lang } from '../i18n'

type Ctx = { lang: Lang; t: Dict; toggle: () => void }
const LangContext = createContext<Ctx | null>(null)

function preferredLang(): Lang {
  try {
    const q = new URLSearchParams(location.search).get('lang')
    if (q === 'ar' || q === 'en') return q
    const saved = localStorage.getItem('lang')
    if (saved === 'ar' || saved === 'en') return saved
  } catch {
    // storage can be blocked; Arabic is the default
  }
  return 'ar'
}

export function LangProvider({ children }: { children: ReactNode }) {
  // The page is prerendered in Arabic; a saved English preference is applied after hydration.
  const [lang, setLang] = useState<Lang>('ar')
  const [ready, setReady] = useState(false)
  const t = dictionaries[lang]

  useEffect(() => {
    const pref = preferredLang()
    if (pref !== 'ar') setLang(pref)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    const root = document.documentElement
    root.lang = lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.title = t.meta.title
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // ignore
    }
  }, [lang, t, ready])

  const value = useMemo(() => ({ lang, t, toggle: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')) }), [lang, t])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang outside LangProvider')
  return ctx
}
