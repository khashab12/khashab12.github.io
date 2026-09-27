# khashab12.github.io

Personal portfolio — Vite + React + TypeScript + Tailwind v4, Motion, GSAP ScrollTrigger, Lenis.
Arabic first (RTL) with an English toggle. Deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Everyday edits

| What | Where |
| --- | --- |
| All text (Arabic + English) | `src/i18n.ts` |
| WhatsApp / Instagram / email | `src/config.ts` — empty values are hidden; if all are empty the Contact section is hidden and "تواصل معي" becomes "شاهد أعمالي" |
| Work items, hero concept | `src/data/projects.json` |
| Testimonials (real ones only) | `src/data/testimonials.json` — the section only renders when this has items |
| Colors, fonts | `src/index.css` (`@theme`) |

### projects.json

Concept entries are written by `npm run concepts`; they contain no names:

```json
{ "id": "concept-4", "consent": false, "concept": 4, "hero": true, "colors": ["#1e2b52", "#e2622b", "#f4ecdc"] }
```

- `hero: true` picks the concept that scrolls inside the hero phone (one at a time).
- To show a **real** client (only with their permission), add an entry by hand:

```json
{
  "id": "my-client",
  "consent": true,
  "name": { "ar": "…", "en": "…" },
  "city": { "ar": "الرياض", "en": "Riyadh" },
  "url": "https://…",
  "logo": "work/my-client.webp"
}
```

Put the logo (WebP) in `public/work/`. If that client also exists as a concept demo, set
`"skip": true` for its slug in `scripts/demos.map.json` and re-run `npm run concepts`.

## Concepts (anonymized demos)

```bash
npm run concepts             # copy + anonymize every ../menus/<slug>/index.html, smoke-test, screenshot
npm run concepts -- --no-shots
```

For each demo the script:

1. copies it to `public/concepts/<n>/index.html`;
2. replaces the logo lockup with a plain "Concept <n>" wordmark in the demo's display font;
3. replaces every spelling of the brand name (Arabic, English, transliterations) with "Concept <n>";
4. reduces the address to the city, and removes signature slogans;
5. strips og/meta tags, the title, comments, and Instagram / WhatsApp / Maps / review links; adds `noindex`;
6. opens the result in headless Edge, fails if the menu doesn't render, and saves `cover.webp`,
   `cover-320.webp` and `scroll.webp`;
7. scans the output for any remaining name, slogan or address and fails if one is found.

**New demo?** Run `npm run concepts`, then open `scripts/demos.map.json` and check the new entry:
`names` (add any other spelling), `phrases` (slogans, mall/district names that would identify it),
and `logoSelector` (the element that wraps the logo, default `#logo`). Re-run until it passes.

`scripts/demos.map.json` holds the real brand names, so it is **gitignored** — keep a private backup.
`npm run build` also scans `dist/` against it (skipped in CI, where the map doesn't exist).

## Build & deploy

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, build, prerender index.html, leak check
npm run og         # regenerate public/og.jpg (WhatsApp preview) from the hero concept
```

Push to `main` → GitHub Actions builds and deploys. In the repo settings, set
**Pages → Source: GitHub Actions**.
