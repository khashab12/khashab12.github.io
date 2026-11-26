/**
 * Prepares the mirrored demos in public/y/<id>/ for hosting under any sub-path:
 * root-absolute URLs become relative, and the motion layer (public/y/_fx) is injected.
 * Idempotent: run again after scripts/sync-yousef.sh.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('public/y')
const MARK = 'data-mxy-fx'
for (const id of fs.readdirSync(ROOT)) {
  const file = path.join(ROOT, id, 'index.html')
  if (!fs.existsSync(file)) continue
  let html = fs.readFileSync(file, 'utf8')
  // "/assets/…", '/icon-192.png', `/manifest.webmanifest` → relative
  html = html.replace(/(["'`(])\/(?!\/)(assets\/|img\/|images?\/|media\/|fonts\/|icons?\/|icon-|apple-touch|favicon|manifest\.webmanifest|og)/g, '$1./$2')
  // no service workers on our copies (scope would be wrong)
  html = html.replace(/navigator\.serviceWorker\.register\([^)]*\)/g, 'Promise.resolve()')
  if (!html.includes(MARK)) {
    html = html.replace(/<head([^>]*)>/i, `<head$1>\n<meta name="robots" content="noindex" ${MARK}>`)
    html = html.replace(/<\/head>/i, `<link rel="stylesheet" href="../_fx/fx.css" ${MARK}>\n</head>`)
    html = html.replace(/<\/body>/i, `<script src="../_fx/lenis.min.js" ${MARK}></script>\n<script src="../_fx/fx.js" ${MARK}></script>\n</body>`)
  }
  fs.writeFileSync(file, html)
  const m = fs.readdirSync(path.join(ROOT, id)).find((f) => f === 'manifest.webmanifest')
  if (m) {
    const mf = path.join(ROOT, id, m)
    fs.writeFileSync(mf, fs.readFileSync(mf, 'utf8').replace(/"\/(?!\/)/g, '"./'))
  }
  console.log('polished', id)
}
