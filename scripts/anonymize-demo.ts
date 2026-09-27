/**
 * Copies every demo from ../menus/<slug>/index.html into public/concepts/<n>/,
 * strips anything that identifies the real brand, smoke-tests the result in a
 * headless browser, and captures WebP previews.
 *
 *   npm run concepts            # process new demos + rebuild all copies
 *   npm run concepts -- --no-shots   # skip screenshots (faster)
 *
 * Private data (slug -> concept number, brand names, aliases) lives in
 * scripts/demos.map.json, which is gitignored and never bundled.
 * Public data (concept number, colors, hero flag) lives in src/data/projects.json.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse, type DefaultTreeAdapterMap } from 'parse5'
import { brandPatterns, findLeaks, phrasePattern, type DemoEntry, type DemoMap } from './lib/brand'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.resolve(ROOT, '../menus')
const OUT = path.join(ROOT, 'public/concepts')
const MAP_FILE = path.join(ROOT, 'scripts/demos.map.json')
const PROJECTS_FILE = path.join(ROOT, 'src/data/projects.json')
const SHOTS = !process.argv.includes('--no-shots')

type Element = DefaultTreeAdapterMap['element']
type Node = DefaultTreeAdapterMap['node']

type Project = {
  id: string
  consent: boolean
  concept?: number
  hero?: boolean
  colors?: string[]
  [k: string]: unknown
}

// Words that describe the business type, not the brand. Stripped when
// deriving the short brand token ("Example Specialty Coffee" -> "Example").
const GENERIC_EN = /\b(the|specialty|speciality|coffee|cafe|café|roastery|shop|bar|brew|kahve|co)\b/gi
const GENERIC_AR = /(^|\s)(قهوة|القهوة|للقهوة|المختصة|مختصة|كافيه|كوفي|مقهى|شوب)(?=\s|$)/g

const LINK_HOSTS =
  /(instagram\.com|instagr\.am|wa\.me|whatsapp\.com|api\.whatsapp|maps\.google|google\.[a-z.]+\/maps|goo\.gl\/maps|maps\.app\.goo\.gl|g\.page|search\.google\.com\/local|tiktok\.com|snapchat\.com|facebook\.com|x\.com|twitter\.com)/i
const LINK_KEYS = /^(instagram|whatsapp|wa|phone|tel|maps?|location|review|reviews|google|tiktok|snapchat|facebook|twitter|social|links?)$/i

function readJson<T>(file: string, fallback: T): T {
  return fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, 'utf8')) as T) : fallback
}

function readConfig(html: string): { start: number; end: number; config: Record<string, unknown> } {
  const marker = 'const CONFIG = '
  const i = html.indexOf(marker)
  if (i < 0) throw new Error('no CONFIG block')
  const start = i + marker.length
  const lineEnd = html.indexOf('\n', start)
  const raw = html.slice(start, lineEnd).trim().replace(/;$/, '')
  return { start, end: start + raw.length, config: JSON.parse(raw) }
}

function coreToken(name: string, generic: RegExp): string {
  return name.replace(generic, ' ').replace(/\s+/g, ' ').trim()
}

function newEntry(slug: string, concept: number, config: Record<string, unknown>): DemoEntry {
  const nameEn = String(config.name ?? '')
  const nameAr = String(config.nameAr ?? '')
  const names = new Set([nameEn, nameAr, coreToken(nameEn, GENERIC_EN), coreToken(nameAr, GENERIC_AR), slug.replace(/-[a-z0-9]{4}$/, '')])
  return {
    concept,
    names: [...names].filter((n) => n.length >= 2),
    // Demos whose lockup isn't wrapped in #logo get their selector set by hand in the private map.
    logoSelector: '#logo',
    skip: false,
  }
}

function matches(el: Element, selector: string): boolean {
  const attr = (n: string) => el.attrs.find((a) => a.name === n)?.value ?? ''
  if (selector.startsWith('#')) return attr('id') === selector.slice(1)
  if (selector.startsWith('.')) return attr('class').split(/\s+/).includes(selector.slice(1))
  return el.tagName === selector
}

function findElement(node: Node, selector: string): Element | undefined {
  if ('tagName' in node && matches(node as Element, selector)) return node as Element
  const children = 'childNodes' in node ? (node.childNodes as Node[]) : []
  for (const child of children) {
    const hit = findElement(child, selector)
    if (hit) return hit
  }
  // <template> content and similar are not used by the demos
  return undefined
}

/** Replaces the inner markup of the logo lockup with a plain text wordmark. */
function replaceLogo(html: string, selector: string, label: string, displayFont: string): string {
  const doc = parse(html, { sourceCodeLocationInfo: true })
  const el = findElement(doc as unknown as Node, selector)
  const loc = el?.sourceCodeLocation
  if (!el || !loc?.startTag || !loc.endTag) throw new Error(`logo element "${selector}" not found`)
  const wordmark =
    `<span class="concept-wm" style="display:block;font-family:'${displayFont}',serif;font-weight:700;` +
    `font-size:clamp(2.2rem,11vw,3.4rem);line-height:1.05;letter-spacing:-.01em;direction:ltr;white-space:nowrap">${label}</span>`
  // The template's script may write into elements inside the lockup; keep them as hidden stubs.
  const stubs = collectIds(el)
    .map((id) => `<span id="${id}" hidden></span>`)
    .join('')
  return html.slice(0, loc.startTag.endOffset) + wordmark + stubs + html.slice(loc.endTag.startOffset)
}

function collectIds(el: Element): string[] {
  const ids: string[] = []
  for (const child of el.childNodes as Node[]) {
    if (!('tagName' in child)) continue
    const id = (child as Element).attrs.find((a) => a.name === 'id')?.value
    if (id) ids.push(id)
    ids.push(...collectIds(child as Element))
  }
  return ids
}

type Localized = { ar?: string; en?: string }

// Taglines that describe a category, not a specific place; everything else is treated as a slogan.
const GENERIC_TAGLINE = /^(specialty coffee|speciality coffee|coffee space|coffee bar|coffee|قهوة مختصة|لقهوة المختصة|كوفي سبيس|كوفي بار)$/i

/** A street address or district narrows a place down to one café, so only the city is kept. */
function cityOf(config: Record<string, unknown>): Localized {
  const currency = JSON.stringify(config.currency ?? '')
  const saudi = /SAR|ر\.?\s?س|ريال/.test(currency) || /Riyadh|الرياض|Diriyah/i.test(JSON.stringify(config.info ?? ''))
  return saudi ? { ar: 'الرياض', en: 'Riyadh' } : { ar: 'القاهرة', en: 'Cairo' }
}

/** Literal texts to replace everywhere in the page (they often also appear hardcoded in the header). */
function identifyingTexts(config: Record<string, unknown>): [string, string][] {
  const pairs: [string, string][] = []
  const city = cityOf(config)
  const info = (config.info ?? {}) as Localized
  if (info.ar) pairs.push([info.ar, city.ar!])
  if (info.en) pairs.push([info.en, city.en!])
  const tagline = (config.tagline ?? {}) as Localized
  for (const lang of ['ar', 'en'] as const) {
    const v = tagline[lang]
    if (v && !GENERIC_TAGLINE.test(v.trim())) pairs.push([v, lang === 'ar' && /[؀-ۿ]/.test(v) ? 'قهوة مختصة' : 'Specialty Coffee'])
  }
  return pairs.filter(([from, to]) => from.trim().length > 2 && from.trim() !== to).sort((a, b) => b[0].length - a[0].length)
}

function scrubConfig(config: Record<string, unknown>, label: string): Record<string, unknown> {
  const walk = (v: unknown): unknown => {
    if (Array.isArray(v)) return v.map(walk)
    if (v && typeof v === 'object') {
      const out: Record<string, unknown> = {}
      for (const [k, val] of Object.entries(v)) {
        if (LINK_KEYS.test(k)) continue
        out[k] = walk(val)
      }
      return out
    }
    if (typeof v === 'string' && LINK_HOSTS.test(v)) return ''
    return v
  }
  const clean = walk(config) as Record<string, unknown>
  clean.name = label
  clean.nameAr = label
  clean.logo = ''
  return clean
}

function stripHead(html: string, label: string): string {
  return html
    .replace(/<meta\s+(?:property|name)="(?:og:[^"]*|twitter:[^"]*|description|author|keywords)"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="(?:icon|shortcut icon|apple-touch-icon|manifest|canonical)"[^>]*>\s*/gi, '')
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${label}</title>\n<meta name="robots" content="noindex, nofollow">`)
}

function stripLinksAndComments(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/gi, (_, a, css: string, b) => a + css.replace(/\/\*[\s\S]*?\*\//g, '') + b)
    .replace(/<a\b[^>]*href="([^"]*)"[^>]*>[\s\S]*?<\/a>/gi, (tag, href: string) => (LINK_HOSTS.test(href) ? '' : tag))
    .replace(/<iframe\b[^>]*src="[^"]*(google\.[a-z.]+\/maps|maps\.google)[^"]*"[^>]*>[\s\S]*?<\/iframe>/gi, '')
}

/** Replaces brand names in markup, attribute values and scripts; inside <style> only in quoted strings. */
function replaceNames(html: string, names: string[], label: string): string {
  const patterns = brandPatterns(names)
  const sub = (s: string) => patterns.reduce((acc, re) => acc.replace(re, label), s)
  return html
    .split(/(<style[^>]*>[\s\S]*?<\/style>)/i)
    .map((part) => (part.startsWith('<style') ? part.replace(/(["'])(?:(?!\1).)*\1/g, (q) => sub(q)) : sub(part)))
    .join('')
}

function anonymize(slug: string, entry: DemoEntry): { html: string; config: Record<string, unknown> } {
  const label = `Concept ${entry.concept}`
  let html = fs.readFileSync(path.join(SRC, slug, 'index.html'), 'utf8')
  const { config } = readConfig(html)
  const fonts = (config.fonts ?? {}) as { display?: string }

  html = replaceLogo(html, entry.logoSelector, label, fonts.display ?? 'serif')
  const block = readConfig(html)
  html = html.slice(0, block.start) + JSON.stringify(scrubConfig(block.config, label)) + html.slice(block.end)
  html = stripHead(html, label)
  html = stripLinksAndComments(html)
  // Addresses and slogans first: they can contain the brand name ("Keep it Example").
  for (const [from, to] of identifyingTexts(config)) html = html.split(from).join(to)
  for (const phrase of entry.phrases ?? []) html = html.replace(phrasePattern(phrase), '')
  html = replaceNames(html, entry.names, label)
  // In <head> so it listens from the start, even while the rest of the page is still loading.
  html = html.replace(/<head>/i, `<head>\n${VIEWER_BRIDGE}`)
  // Google Fonts must not block rendering: the menu is drawn by an inline script that would
  // otherwise wait for this cross-origin stylesheet (a white screen on slow connections).
  html = html.replace(
    /<link\s+rel="stylesheet"\s+href="(https:\/\/fonts\.googleapis\.com\/[^"]+)"\s*\/?>/g,
    `<link rel="stylesheet" href="$1" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="$1"></noscript>`,
  )
  return { html, config }
}

// The portfolio shows each concept in a sandboxed iframe (no same-origin access), so the page
// tells the viewer itself when the visitor first scrolls or touches it; the viewer then hides
// its "scroll" hint. Harmless when the page is opened on its own.
const VIEWER_BRIDGE = `<script>(function(){if(window.parent===window)return;var s=0,t=0;function send(m){try{parent.postMessage(m,"*")}catch(e){}}
addEventListener("scroll",function(){if(!s){s=1;send("concept-scrolled")}},{passive:true});
addEventListener("pointerdown",function(){if(!t){t=1;send("concept-touched")}},{passive:true})})()</script>`

async function capture(dirs: { n: number; dir: string }[]) {
  const { chromium } = await import('playwright-core')
  const sharp = (await import('sharp')).default
  const browser = await chromium.launch({ channel: 'msedge' })
  const failures: string[] = []
  try {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: 'light' })
    for (const { n, dir } of dirs) {
      const page = await ctx.newPage()
      const errors: string[] = []
      page.on('pageerror', (e) => errors.push(e.message))
      await page.goto('file:///' + path.join(dir, 'index.html').replace(/\\/g, '/'), { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      const items = await page.evaluate(() => document.querySelectorAll('#menu *').length)
      if (errors.length || items < 5) failures.push(`Concept ${n}: ${errors.join('; ') || 'menu did not render'}`)

      const cover = await page.screenshot({ clip: { x: 0, y: 0, width: 390, height: 700 } })
      await sharp(cover).resize({ width: 480 }).webp({ quality: 72 }).toFile(path.join(dir, 'cover.webp'))
      await sharp(cover).resize({ width: 320 }).webp({ quality: 70 }).toFile(path.join(dir, 'cover-320.webp'))

      const height = Math.min(await page.evaluate(() => document.documentElement.scrollHeight), 2600)
      const tall = await page.screenshot({ fullPage: true, clip: { x: 0, y: 0, width: 390, height } })
      await sharp(tall).resize({ width: 560 }).webp({ quality: 62 }).toFile(path.join(dir, 'scroll.webp'))
      await page.close()
      process.stdout.write('.')
    }
  } finally {
    await browser.close()
  }
  process.stdout.write('\n')
  return failures
}

async function main() {
  if (!fs.existsSync(SRC)) throw new Error(`demo source not found: ${SRC}`)
  const map = readJson<DemoMap>(MAP_FILE, {})
  const projects = readJson<Project[]>(PROJECTS_FILE, [])

  const slugs = fs
    .readdirSync(SRC)
    .filter((d) => fs.existsSync(path.join(SRC, d, 'index.html')))
    .sort()

  let next = Math.max(0, ...Object.values(map).map((e) => e.concept)) + 1
  const added: string[] = []
  for (const slug of slugs) {
    if (map[slug]) continue
    const { config } = readConfig(fs.readFileSync(path.join(SRC, slug, 'index.html'), 'utf8'))
    map[slug] = newEntry(slug, next++, config)
    added.push(slug)
  }
  fs.writeFileSync(MAP_FILE, JSON.stringify(map, null, 2) + '\n')

  const active = slugs.filter((s) => !map[s].skip)
  const built: { n: number; dir: string }[] = []
  const leaks: string[] = []

  // Remove concepts whose demo is gone or skipped; existing screenshots are kept for --no-shots runs.
  fs.mkdirSync(OUT, { recursive: true })
  const keep = new Set(active.map((s) => String(map[s].concept)))
  for (const d of fs.readdirSync(OUT)) if (!keep.has(d)) fs.rmSync(path.join(OUT, d), { recursive: true, force: true })
  for (const slug of active) {
    const entry = map[slug]
    const { html, config } = anonymize(slug, entry)
    const dir = path.join(OUT, String(entry.concept))
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), html)
    built.push({ n: entry.concept, dir })

    for (const hit of findLeaks(html, entry.names, entry.allow)) leaks.push(`Concept ${entry.concept}: "${hit}"`)
    for (const text of [...(entry.phrases ?? []), ...identifyingTexts(config).map(([from]) => from)])
      if (phrasePattern(text).test(html)) leaks.push(`Concept ${entry.concept}: identifying text "${text}"`)

    const colors = config.colors as Record<string, string> | undefined
    const id = `concept-${entry.concept}`
    const existing = projects.find((p) => p.id === id)
    const palette = colors ? [colors.primary, colors.secondary, colors.background].filter(Boolean) : []
    if (existing) existing.colors = palette
    else projects.push({ id, consent: false, concept: entry.concept, hero: false, colors: palette })
  }

  // Drop concept entries whose demo was removed or marked skip.
  const live = new Set(active.map((s) => map[s].concept))
  const kept = projects.filter((p) => p.concept === undefined || live.has(p.concept))
  kept.sort((a, b) => Number(b.consent) - Number(a.consent) || (a.concept ?? 0) - (b.concept ?? 0))
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(kept, null, 2) + '\n')

  console.log(`${built.length} concepts written to public/concepts (${added.length} new)`)
  if (added.length) console.log('New demos — review their names/aliases in scripts/demos.map.json:\n  ' + added.join('\n  '))

  if (SHOTS) {
    const failures = await capture(built)
    if (failures.length) {
      console.error('Smoke test failed:\n  ' + failures.join('\n  '))
      process.exitCode = 1
    }
  }
  if (leaks.length) {
    console.error('Possible brand leaks (fix aliases or the template, then re-run):\n  ' + leaks.join('\n  '))
    process.exitCode = 1
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
