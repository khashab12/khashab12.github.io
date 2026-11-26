import { team } from '../config'

export type ContactLink = { kind: 'whatsapp' | 'instagram' | 'email'; href: string }
export type PersonContact = { id: string; links: ContactLink[] }

function linksFor(c: (typeof team)[number]): ContactLink[] {
  const links: ContactLink[] = []
  const wa = c.whatsapp.replace(/\D/g, '')
  const ig = c.instagram.trim().replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '')
  const email = c.email.trim()
  if (wa) links.push({ kind: 'whatsapp', href: `https://wa.me/${wa}` })
  if (ig) links.push({ kind: 'instagram', href: `https://instagram.com/${ig}` })
  if (email) links.push({ kind: 'email', href: `mailto:${email}` })
  return links
}

/** Team members that have at least one way to reach them. */
export const contactPeople = (): PersonContact[] =>
  team.map((c) => ({ id: c.id, links: linksFor(c) })).filter((p) => p.links.length > 0)

export const hasContact = () => contactPeople().length > 0

/** Where "Contact us" should go: the Contact section, or Work when there's no way to contact yet. */
export const primaryTarget = () => (hasContact() ? '#contact' : '#work')
