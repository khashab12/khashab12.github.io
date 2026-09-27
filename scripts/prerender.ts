/** Renders the app to static HTML inside dist/index.html so the page paints before any JS runs. */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ssrEntry = path.join(ROOT, 'dist-ssr/entry-server.js')
const indexFile = path.join(ROOT, 'dist/index.html')

const { render } = (await import(pathToFileURL(ssrEntry).href)) as { render: () => string }
const html = fs.readFileSync(indexFile, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('root marker not found in dist/index.html')

// Inline the stylesheet: one less render-blocking request on slow mobile connections.
const withCss = html.replace(/<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/g, (_, file: string) => {
  const css = fs.readFileSync(path.join(ROOT, 'dist', file), 'utf8')
  return `<style>${css}</style>`
})
fs.writeFileSync(indexFile, withCss.replace(marker, `<div id="root">${render()}</div>`))
fs.rmSync(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true })
console.log('prerender: wrote dist/index.html')
