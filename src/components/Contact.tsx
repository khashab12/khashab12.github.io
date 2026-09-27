import { useLang } from '../lib/lang'
import { contactLinks, type ContactLink } from '../lib/contact'
import { Reveal } from './Reveal'
import { Instagram, Mail, WhatsApp } from './Icons'

const STYLE: Record<ContactLink['kind'], string> = {
  whatsapp: 'bg-whatsapp text-white hover:brightness-110',
  instagram: 'bg-surface text-ink border border-line hover:border-accent',
  email: 'bg-surface text-ink border border-line hover:border-accent',
}
const ICON = { whatsapp: WhatsApp, instagram: Instagram, email: Mail }

/** Hidden entirely until at least one contact value is set in src/config.ts. */
export function Contact() {
  const { t } = useLang()
  const links = contactLinks()
  if (links.length === 0) return null

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 py-20 sm:px-6 md:py-28">
      <Reveal className="mx-auto max-w-[1120px] rounded-[2rem] bg-accent-soft px-6 py-12 text-center sm:px-10 md:py-16">
        <h2 id="contact-title" className="text-[clamp(1.8rem,6vw,2.75rem)] font-bold">
          {t.contact.title}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-lg text-ink-2">{t.contact.body}</p>
        <ul className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          {links.map((l) => {
            const Icon = ICON[l.kind]
            return (
              <li key={l.kind}>
                <a
                  href={l.href}
                  target={l.kind === 'email' ? undefined : '_blank'}
                  rel="noopener"
                  className={`inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl px-7 font-display text-lg font-medium transition sm:w-auto ${STYLE[l.kind]}`}
                >
                  <Icon width={22} height={22} />
                  {t.contact[l.kind]}
                </a>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </section>
  )
}
