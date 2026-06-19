import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Container, Heading, Text, buttonClass } from '@/components/ui'
import { cn } from '@/lib/cn'
import { ConversionPing } from '@/features/analytics'

export const metadata: Metadata = { robots: { index: false, follow: false } }

/** Post-submit destination. Fires the `thank_you_view` conversion and shows the
 * next steps — the second half of the lead-generation funnel. */
export default async function ThankYouPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = (await getDictionary(lang)).thankYou

  return (
    <main className="flex min-h-screen items-center bg-foreground/[0.02]">
      <ConversionPing event="thank_you_view" />
      <Container className="mx-auto flex max-w-2xl flex-col gap-6 py-28 text-center">
        <span className="text-sm uppercase tracking-widest text-accent">{t.eyebrow}</span>
        <Heading as="h1" size="lg">
          {t.title}
        </Heading>
        <Text>{t.subtitle}</Text>
        <ol className="mx-auto flex flex-col gap-3 text-left">
          {t.steps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="font-heading text-accent">{index + 1}</span>
              <span className="text-foreground/70">{step}</span>
            </li>
          ))}
        </ol>
        <Link
          href={`/${lang}`}
          className={cn('mx-auto w-fit', buttonClass({ variant: 'primary', size: 'lg' }))}
        >
          {t.home}
        </Link>
      </Container>
    </main>
  )
}
