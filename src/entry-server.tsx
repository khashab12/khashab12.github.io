import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { LangProvider } from './lib/lang'
import App from './App'

/** Used by scripts/prerender.ts to write the Arabic page into dist/index.html at build time. */
export function render() {
  return renderToString(
    <StrictMode>
      <LangProvider>
        <App />
      </LangProvider>
    </StrictMode>,
  )
}
