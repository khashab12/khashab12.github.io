import { contact } from '../config'

export type ContactLink = { kind: 'whatsapp' | 'instagram' | 'email'; href: string }

export function contactLinks(): ContactLink[] {
  const links: ContactLink[] = []
  const wa = contact.whatsapp.replace(/\D/g, '')
  const ig = contact.instagram.trim().replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '')
  const email = contact.email.trim()
  if (wa) links.push({ kind: 'whatsapp', href: `https://wa.me/${wa}` })
  if (ig) links.push({ kind: 'instagram', href: `https://instagram.com/${ig}` })
  if (email) links.push({ kind: 'email', href: `mailto:${email}` })
  return links
}

export const hasContact = () => contactLinks().length > 0

/** Where "Contact me" should go: the Contact section, or Work when there's no way to contact yet. */
export const primaryTarget = () => (hasContact() ? '#contact' : '#work')
