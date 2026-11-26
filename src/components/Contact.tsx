import { useLang } from '../lib/lang'
import { contactPeople, type ContactLink } from '../lib/contact'
import { useMagnetic } from '../lib/fx'
import { Reveal } from './Reveal'
import { Instagram, Mail, WhatsApp } from './Icons'

const ICON = { whatsapp: WhatsApp, instagram: Instagram, email: Mail }

function Button({ l, label }: { l: ContactLink; label: string }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.25)
  const Icon = ICON[l.kind]
  const style = l.kind === 'whatsapp' ? 'bg-whatsapp text-white shadow-[0_18px_40px_-16px_rgb(31_168_85/0.8)]' : 'border border-white/15 text-ink hover:border-accent-strong'
  return (
    <a ref={ref} href={l.href} target={l.kind === 'email' ? undefined : '_blank'} rel="noopener" className={`inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full px-7 font-display text-lg font-medium ${style}`}>
      <Icon width={22} height={22} />
      {label}
    </a>
  )
}

/** Hidden entirely until at least one team member has a contact value in src/config.ts. */
export function Contact() {
  const { t } = useLang()
  const people = contactPeople()
  if (people.length === 0) return null
  const member = (id: string) => t.team.members.find((m) => m.id === id)

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden px-4 py-28 sm:px-6 md:py-40">
      <div aria-hidden className="aurora absolute start-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20" />
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
      <Reveal className="mx-auto max-w-[1000px] text-center">
        <p className="font-display text-sm font-medium text-accent-strong">{t.contact.title}</p>
        <h2 id="contact-title" className="mt-4 text-[clamp(2.4rem,8vw,5.2rem)] font-bold leading-[1.05] tracking-tight">
          <span className="text-gradient">{t.contact.big}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-ink-2">{t.contact.body}</p>
      </Reveal>
      <ul className={`mx-auto mt-12 grid gap-4 ${people.length > 1 ? 'max-w-3xl sm:grid-cols-2' : 'max-w-md'}`}>
        {people.map((p, i) => (
          <li key={p.id}>
            <Reveal delay={i * 0.08} className="edge h-full rounded-[1.75rem] p-6 text-center">
              <p className="font-display text-xl font-bold">{member(p.id)?.name}</p>
              <p className="mt-1 text-sm text-muted">{member(p.id)?.role}</p>
              <div className="mt-5 flex flex-col gap-2.5">
                {p.links.map((l) => (
                  <Button key={l.kind} l={l} label={t.contact[l.kind]} />
                ))}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
