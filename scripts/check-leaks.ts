/**
 * Fails the build if any real brand name of a non-consented demo appears in dist/.
 * Needs the private scripts/demos.map.json, so it only runs locally; in CI it skips
 * (the committed public/concepts were already verified when `npm run concepts` ran).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { findLeaks, type DemoMap } from './lib/brand'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const MAP_FILE = path.join(ROOT, 'scripts/demos.map.json')
const DIST = path.join(ROOT, 'dist')

if (!fs.existsSync(MAP_FILE)) {
  console.log('check-leaks: no private brand map here (CI) — skipped')
  process.exit(0)
}

const map = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8')) as DemoMap
const TEXT = /\.(html|js|css|json|txt|xml|svg|webmanifest)$/

function* walk(dir: string): Generator<string> {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(p)
    else if (TEXT.test(e.name)) yield p
  }
}

// Minified library code is full of ordinary English words that can double as short brand names,
// so code is checked for Arabic names and exact-case multi-letter names only.
const codeNames = (names: string[]) =>
  names.filter((n) => /[؀-ۿ]/.test(n) || (n.length >= 5 && n !== n.toLowerCase())).map((n) => (n.startsWith('=') ? n : '=' + n))

const leaks: string[] = []
for (const file of walk(DIST)) {
  const text = fs.readFileSync(file, 'utf8')
  const rel = path.relative(DIST, file)
  // The site's own index.html carries inlined CSS/JS; concept pages are fully checked.
  const ownPage = rel === 'index.html'
  const isCode = rel.startsWith('assets')
  const code = ownPage ? (text.match(/<(style|script)[^>]*>[\s\S]*?<\/\1>/g) ?? []).join('\n') : ''
  const markup = ownPage ? text.replace(/<(style|script)[^>]*>[\s\S]*?<\/\1>/g, '') : text
  for (const [slug, entry] of Object.entries(map)) {
    if (entry.skip) continue
    const found = isCode
      ? findLeaks(text, codeNames(entry.names), entry.allow)
      : [...findLeaks(markup, entry.names, entry.allow), ...findLeaks(code, codeNames(entry.names), entry.allow)]
    for (const hit of found) leaks.push(`${rel} [${slug}]: ${hit}`)
  }
}

if (leaks.length) {
  console.error(`check-leaks: ${leaks.length} possible brand leak(s):\n  ` + leaks.join('\n  '))
  process.exit(1)
}
console.log('check-leaks: no brand names found in dist/')
