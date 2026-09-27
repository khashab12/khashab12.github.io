/** Renders public/og.jpg (1200×630), the link preview for WhatsApp and other apps. */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// Inlined as data URIs: pages created with setContent can't load file:// fonts.
const font = (pkg: string, file: string) =>
  'data:font/woff2;base64,' + fs.readFileSync(path.join(ROOT, 'node_modules/@fontsource', pkg, 'files', file)).toString('base64')

const projects = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/projects.json'), 'utf8')) as { concept?: number; hero?: boolean }[]
const hero = projects.find((p) => p.concept && p.hero) ?? projects.find((p) => p.concept)
const cover = hero ? 'data:image/webp;base64,' + fs.readFileSync(path.join(ROOT, 'public/concepts', String(hero.concept), 'cover.webp')).toString('base64') : ''

const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
@font-face{font-family:Readex;font-weight:700;src:url(${font('readex-pro', 'readex-pro-arabic-700-normal.woff2')})}
@font-face{font-family:Readex;font-weight:700;src:url(${font('readex-pro', 'readex-pro-latin-700-normal.woff2')});unicode-range:U+0000-00FF}
@font-face{font-family:Plex;font-weight:500;src:url(${font('ibm-plex-sans-arabic', 'ibm-plex-sans-arabic-arabic-500-normal.woff2')})}
@font-face{font-family:Plex;font-weight:500;src:url(${font('ibm-plex-sans-arabic', 'ibm-plex-sans-arabic-latin-500-normal.woff2')});unicode-range:U+0000-00FF}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#EEF2F0;color:#0F2A2B;font-family:Plex;display:flex;align-items:center;justify-content:space-between;gap:64px;padding:0 96px 0 80px;position:relative;overflow:hidden}
.band{position:absolute;inset-inline-start:0;top:0;bottom:0;width:26px;background:#0B6E5F}
.tag{display:inline-flex;align-items:center;gap:12px;font-size:28px;color:#085449;background:#D3E9E3;padding:8px 22px;border-radius:999px}
.tag i{width:10px;height:10px;border-radius:50%;background:#0B6E5F}
h1{font-family:Readex;font-weight:700;font-size:96px;line-height:1.1;margin:28px 0 20px}
h1 span{color:#E3A33B}
p{font-size:36px;line-height:1.5;color:#1A3B3C;max-width:640px}
.phone{flex:none;width:250px;height:520px;border-radius:40px;background:#0F2A2B;padding:9px;box-shadow:0 30px 60px -20px rgba(15,42,43,.5)}
.phone div{width:100%;height:100%;border-radius:32px;background:#fff url(${cover}) top/cover no-repeat}
.en{margin-top:36px;font-size:26px;color:#54696A;direction:ltr;text-align:right}
</style></head><body><div class="band"></div><div>
<div class="tag"><i></i>مطوّر واجهات · القاهرة</div>
<h1>محمد الخشاب<span>.</span></h1>
<p>مواقع ومنيو إلكتروني للكافيهات والمطاعم، بهوية البراند الخاص بك</p>
<div class="en">Mohamed Elkhashab · khashab12.github.io</div>
</div><div class="phone"><div></div></div></body></html>`

const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
const out = path.join(ROOT, 'public/og.jpg')
fs.writeFileSync(out, await page.screenshot({ type: 'jpeg', quality: 88 }))
await browser.close()
console.log('wrote', path.relative(ROOT, out))
