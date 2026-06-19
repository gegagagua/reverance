import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Container, Heading, Text } from '@/components/ui'

/** Standalone privacy policy — covers personal-data use for the contact form
 * and analytics, as required by the brief. */
export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const p = dict.privacy

  return (
    <main className="py-28">
      <Container className="flex max-w-3xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Heading as="h1" size="lg">
            {p.title}
          </Heading>
          <Text tone="muted">{p.updated}</Text>
        </div>
        <div className="flex flex-col gap-4">
          {p.intro.map((para) => (
            <Text key={para}>{para}</Text>
          ))}
        </div>
        {p.body.map((section) => (
          <div key={section.heading} className="flex flex-col gap-3">
            <Heading as="h2" size="md">
              {section.heading}
            </Heading>
            {section.blocks.map((block, i) =>
              block.items.length > 0 ? (
                <ul key={i} className="flex list-disc flex-col gap-1 pl-6">
                  {block.items.map((item) => (
                    <li key={item}>
                      <Text>{item}</Text>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text key={i}>{block.text}</Text>
              )
            )}
          </div>
        ))}
        <Link href={`/${lang}`} className="text-sm text-accent hover:underline">
          ← {dict.thankYou.home}
        </Link>
      </Container>
    </main>
  )
}
