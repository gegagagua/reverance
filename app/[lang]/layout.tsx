import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Jost, DM_Sans } from 'next/font/google'
import { defaultLocale, isLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { SITE_URL } from '@/lib/site'
import { Analytics, AnalyticsNoScript, AttributionCapture } from '@/features/analytics'
import '../globals.css'

// Exact theme fonts: Jost (headings, only 400 is used) + DM Sans (body, 400/500).
// `display: swap` keeps text visible during font load so it never blocks FCP/LCP.
const heading = Jost({ subsets: ['latin'], weight: ['400'], display: 'swap', variable: '--font-jost' })
const body = DM_Sans({ subsets: ['latin'], weight: ['400', '500'], display: 'swap', variable: '--font-dm' })

type Params = { params: Promise<{ lang: string }> }

/** Prerender every locale at build time. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = await getDictionary(lang)
  // Each locale is its own indexable page: self-referencing canonical plus a
  // full hreflang set (all locales + x-default) so Google clusters them.
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}`]))
  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: `/${lang}`,
      languages: { ...languages, 'x-default': `/${defaultLocale}` },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: 'website',
      locale: lang,
      url: `${SITE_URL}/${lang}`,
    },
  }
}

export default async function RootLayout({ children, params }: Params & { children: React.ReactNode }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  return (
    <html lang={lang} className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <AnalyticsNoScript />
        <AttributionCapture />
        {children}
      </body>
      <Analytics />
    </html>
  )
}
