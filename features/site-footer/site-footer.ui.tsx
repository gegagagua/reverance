import Image from 'next/image'
import { Container, Heading, buttonClass } from '@/components/ui'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { SOCIAL_LINKS } from './site-footer.content'

/** Server Component, dark footer: final CTA, brand, contact columns, socials,
 * and the privacy-policy link. The CTA scrolls to the single contact form. */
export function SiteFooter({ content, locale }: { content: Dictionary['footer']; locale: Locale }) {
  const columns = [
    { label: content.callUs, value: content.phone },
    { label: content.hours, value: content.hoursTime },
    { label: content.emailUs, value: content.email },
  ]

  return (
    <footer id="footer" className="bg-surface py-20 text-white">
      <Container className="flex flex-col items-center gap-10 text-center">
        <Heading as="h2" size="lg" className="max-w-xl text-white">
          {content.ctaTitle}
        </Heading>
        <a href="#contact" data-cta="footer" className={buttonClass({ variant: 'accent', size: 'lg' })}>
          {content.ctaButton}
        </a>
        <Image
          src="/theme/images/logo-vertical.png"
          alt={content.address}
          width={200}
          height={120}
          className="mt-4 h-20 w-auto"
        />
        <p className="text-white/70">{content.address}</p>
        <dl className="grid w-full gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.label} className="flex flex-col gap-1">
              <dt className="text-sm uppercase tracking-widest text-accent">{col.label}</dt>
              <dd className="text-white/80">{col.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="flex flex-wrap justify-center gap-3">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/70 transition-colors hover:border-accent hover:text-white"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-2 text-sm text-white/40">
          <a href={`/${locale}/privacy`} className="hover:text-white/80">
            {content.privacyLabel}
          </a>
          <p>{content.copyright}</p>
        </div>
      </Container>
    </footer>
  )
}
