import { useLang } from '../lib/lang'
import { contactPeople, type ContactLink } from '../lib/contact'
import { Reveal } from './Reveal'
import { Instagram, Mail, WhatsApp } from './Icons'

const STYLE: Record<ContactLink['kind'], string> = {
  whatsapp: 'bg-whatsapp text-white hover:brightness-110',
  instagram: 'bg-surface text-ink border border-line hover:border-accent',
  email: 'bg-surface text-ink border border-line hover:border-accent',
}
const ICON = { whatsapp: WhatsApp, instagram: Instagram, email: Mail }

/** Hidden entirely until at least one team member has a contact value in src/config.ts. */
export function Contact() {
  const { t } = useLang()
  const people = contactPeople()
  if (people.length === 0) return null
  const member = (id: string) => t.team.members.find((m) => m.id === id)

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 py-20 sm:px-6 md:py-28">
      <Reveal className="mx-auto max-w-[1120px] rounded-[2rem] bg-accent-soft px-6 py-12 text-center sm:px-10 md:py-16">
        <h2 id="contact-title" className="text-[clamp(1.8rem,6vw,2.75rem)] font-bold">
          {t.contact.title}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-lg text-ink-2">{t.contact.body}</p>
        <ul className={`mx-auto mt-8 grid gap-4 ${people.length > 1 ? 'max-w-3xl sm:grid-cols-2' : 'max-w-md'}`}>
          {people.map((p) => (
            <li key={p.id} className="rounded-3xl bg-surface/70 p-5">
              <p className="font-display text-lg font-bold">{member(p.id)?.name}</p>
              <p className="text-sm text-muted">{member(p.id)?.role}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {p.links.map((l) => {
                  const Icon = ICON[l.kind]
                  return (
                    <li key={l.kind}>
                      <a
                        href={l.href}
                        target={l.kind === 'email' ? undefined : '_blank'}
                        rel="noopener"
                        className={`inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl px-7 font-display text-lg font-medium transition ${STYLE[l.kind]}`}
                      >
                        <Icon width={22} height={22} />
                        {t.contact[l.kind]}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
