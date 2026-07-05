import type { Metadata } from 'next'
import { Jost, DM_Sans } from 'next/font/google'
import '../globals.css'

const heading = Jost({ subsets: ['latin'], weight: ['400'], display: 'swap', variable: '--font-jost' })
const body = DM_Sans({ subsets: ['latin'], weight: ['400', '500'], display: 'swap', variable: '--font-dm' })

export const metadata: Metadata = { title: 'Reverance Admin', robots: { index: false, follow: false } }

/** Separate root layout for the admin area (its own chrome, no site header/footer). */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">{children}</body>
    </html>
  )
}
