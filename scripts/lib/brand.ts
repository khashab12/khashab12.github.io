export type DemoEntry = {
  /** Public number, shown as "Concept <n>" */
  concept: number
  /**
   * Every spelling of the brand to remove (full names, short names, transliterations).
   * Latin names match case-insensitively; prefix with "=" to match case-sensitively
   * (e.g. "=ROAST" removes an all-caps wordmark but keeps "light roast").
   */
  names: string[]
  /** Element whose contents are the logo lockup */
  logoSelector: string
  /** true = leave this demo out of the concepts (e.g. it became real, consented work) */
  skip: boolean
  /** Whole words that contain a brand name but are ordinary words (e.g. a possessive form of it) */
  allow?: string[]
  /** Signature slogans or place details that identify the brand; removed wherever they appear */
  phrases?: string[]
}

/** Case-insensitive literal match that tolerates differing whitespace. */
export function phrasePattern(phrase: string): RegExp {
  const word = (w: string) =>
    w
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/&/g, '(?:&|&amp;)')
      .replace(/['’]/g, "(?:'|’|&#39;|&rsquo;)")
  return new RegExp(phrase.trim().split(/\s+/).map(word).join('\\s*'), 'gi')
}
export type DemoMap = Record<string, DemoEntry>

const ARABIC = /[؀-ۿ]/
const AR_LETTER = '[\\u0620-\\u064A]'
const AR_MARKS = '[\\u064B-\\u0652\\u0640]*' // harakat + tatweel
const AR_PREFIX = '(?:وال|بال|لل|ال|و|ب|ل)?'
// Words inside a Latin brand phrase may be split by line breaks, tags or separators.
// Bounded so the pattern stays linear on large minified bundles.
const LATIN_GAP = '(?:\\s|<br\\s*/?>|<[a-z]{1,8}(?:\\s[^<>]{0,80})?>|</[a-z]{1,8}>|[-_·|&]|&amp;){0,6}'

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const AR_EQUIV: Record<string, string> = {
  ا: '[اأإآ]', أ: '[اأإآ]', إ: '[اأإآ]', آ: '[اأإآ]',
  ة: '[ةه]', ه: '[ةه]', ى: '[ىي]', ي: '[ىي]',
}

/** Letters may carry diacritics or tatweel, and alef/ya/ta-marbuta spellings vary. */
function arabicBody(name: string): string {
  return [...name]
    .filter((ch) => !/[ً-ْـ]/.test(ch))
    .map((ch) => (ARABIC.test(ch) ? (AR_EQUIV[ch] ?? escape(ch)) + AR_MARKS : ch === ' ' ? '\\s+' : escape(ch)))
    .join('')
}

function latinBody(name: string): string {
  return name.split(/\s+/).map(escape).join(LATIN_GAP)
}

function pattern(name: string, strict: boolean): RegExp {
  if (ARABIC.test(name)) {
    const body = arabicBody(name)
    return strict ? new RegExp(`(?<!${AR_LETTER})${AR_PREFIX}${body}(?!${AR_LETTER})`, 'g') : new RegExp(body, 'g')
  }
  const caseSensitive = name.startsWith('=')
  const body = latinBody(caseSensitive ? name.slice(1) : name)
  return new RegExp(`(?<![A-Za-z${strict ? '0-9' : ''}])${body}(?![A-Za-z])`, caseSensitive ? 'g' : 'gi')
}

/** Replacement patterns, longest names first so full names win over short tokens. */
export function brandPatterns(names: string[]): RegExp[] {
  return [...names].sort((a, b) => b.length - a.length).map((n) => pattern(n, true))
}

/**
 * Loose search used for verification: ignores Arabic word boundaries and
 * diacritics, so it also catches names glued to prefixes or split by tatweel.
 */
export function findLeaks(text: string, names: string[], allow: string[] = []): string[] {
  const hits = new Set<string>()
  const wordAt = (at: number, len: number) => {
    let s = at
    let e = at + len
    while (s > 0 && /[\p{L}\p{M}]/u.test(text[s - 1])) s--
    while (e < text.length && /[\p{L}\p{M}]/u.test(text[e])) e++
    return text.slice(s, e)
  }
  for (const name of names) {
    if (name.replace(/^=/, '').length < 3 && !ARABIC.test(name)) continue
    // Very short Arabic names (3 letters or fewer) occur inside ordinary words, so they need word boundaries.
    const short = ARABIC.test(name) && name.replace(/\s/g, '').length <= 3
    for (const m of text.matchAll(pattern(name, short))) {
      const at = m.index ?? 0
      if (allow.includes(wordAt(at, m[0].length))) continue
      hits.add(`${m[0]}  …${text.slice(Math.max(0, at - 30), at + m[0].length + 30).replace(/\s+/g, ' ')}…`)
    }
  }
  return [...hits]
}
