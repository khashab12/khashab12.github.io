import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Arabic + Latin subsets only; each file carries its own unicode-range.
// Body text uses Plex 400 only (medium labels fall back to it) to keep font bytes low on first load.
import '@fontsource/readex-pro/arabic-500.css'
import '@fontsource/readex-pro/latin-500.css'
import '@fontsource/readex-pro/arabic-700.css'
import '@fontsource/readex-pro/latin-700.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css'
import '@fontsource/ibm-plex-sans-arabic/latin-400.css'
import './index.css'
import { LangProvider } from './lib/lang'
import App from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
)

// Production HTML is prerendered (scripts/prerender.ts); dev starts empty.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
