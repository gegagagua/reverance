import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Jost, DM_Sans } from 'next/font/google'
import { isLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Analytics, AnalyticsNoScript } from '@/features/analytics'
import './globals.css'

// Exact theme fonts: Jost (headings) + DM Sans (body).
const heading = Jost({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-jost' })
const body = DM_Sans({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm' })

type Params = { params: Promise<{ lang: string }> }

/** Prerender every locale at build time. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    openGraph: { title: dict.meta.title, description: dict.meta.description, type: 'website', locale: lang },
  }
}

export default async function RootLayout({ children, params }: Params & { children: React.ReactNode }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  return (
    <html lang={lang} className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <AnalyticsNoScript />
        {children}
      </body>
      <Analytics />
    </html>
  )
}
