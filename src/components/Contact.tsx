import { useLang } from '../lib/lang'
import { contactPeople, type ContactLink } from '../lib/contact'
import { Reveal } from './Reveal'
import { Instagram, Mail, WhatsApp } from './Icons'

const ICON = { whatsapp: WhatsApp, instagram: Instagram, email: Mail }

/** Hidden entirely until at least one team member has a contact value in src/config.ts. */
export function Contact() {
  const { t } = useLang()
  const people = contactPeople()
  if (people.length === 0) return null
  const member = (id: string) => t.team.members.find((m) => m.id === id)
  const style = (l: ContactLink) => (l.kind === 'whatsapp' ? 'bg-ink text-paper' : 'glass-soft text-ink')

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 py-24 sm:px-6 md:py-36">
      <Reveal className="glass mx-auto max-w-[1080px] overflow-hidden rounded-[2.5rem] px-6 py-14 text-center sm:px-12 md:py-20">
        <div aria-hidden className="pointer-events-none absolute start-1/2 top-0 h-64 w-[70%] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl rtl:translate-x-1/2" />
        <p className="relative font-display text-sm font-medium text-accent-strong">{t.contact.title}</p>
        <h2 id="contact-title" className="relative mt-3 text-[clamp(2.2rem,7vw,4.2rem)] font-bold leading-[1.08] tracking-tight">
          {t.contact.big}
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-lg text-muted">{t.contact.body}</p>
        <ul className={`relative mx-auto mt-10 grid gap-3 ${people.length > 1 ? 'max-w-2xl sm:grid-cols-2' : 'max-w-sm'}`}>
          {people.map((p) => (
            <li key={p.id} className="glass-soft rounded-[1.75rem] p-5">
              <p className="font-display text-lg font-bold">{member(p.id)?.name}</p>
              <p className="mt-0.5 text-sm text-muted">{member(p.id)?.role}</p>
              <div className="mt-4 flex flex-col gap-2">
                {p.links.map((l) => {
                  const Icon = ICON[l.kind]
                  return (
                    <a key={l.kind} href={l.href} target={l.kind === 'email' ? undefined : '_blank'} rel="noopener" className={`inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full px-6 font-display font-medium transition-transform hover:scale-[1.02] active:scale-95 ${style(l)}`}>
                      <Icon width={20} height={20} />
                      {t.contact[l.kind]}
                    </a>
                  )
                })}
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
