import data from '../data/projects.json'
import testimonialsData from '../data/testimonials.json'

type Localized = { ar: string; en: string }

export type RealProject = {
  id: string
  consent: true
  name: Localized
  city: Localized
  url: string
  /** Path under public/, e.g. "work/damas.webp" */
  logo?: string
}

export type Concept = {
  id: string
  consent: false
  concept: number
  hero?: boolean
  colors?: string[]
}

export type Testimonial = {
  quote: Localized
  name: string
  place?: Localized
  city?: Localized
}

type Raw = Record<string, unknown>
const items = data as Raw[]

/** Only items the owner explicitly consented to show by name. */
export const realProjects = items.filter(
  (p): p is RealProject & Raw => p.consent === true && !!p.name && !!p.url,
)

/** Everything else is shown only as an anonymized concept (never with a name or logo). */
export const concepts: Concept[] = items
  .filter((p) => p.consent !== true && typeof p.concept === 'number')
  .map((p) => ({ id: String(p.id), consent: false, concept: p.concept as number, hero: p.hero === true, colors: (p.colors as string[]) ?? [] }))

export const heroConcept = concepts.find((c) => c.hero) ?? concepts[0]

export const testimonials = testimonialsData as Testimonial[]

export const asset = (p: string) => import.meta.env.BASE_URL + p.replace(/^\//, '')
export const conceptUrl = (n: number) => asset(`concepts/${n}/index.html`)
