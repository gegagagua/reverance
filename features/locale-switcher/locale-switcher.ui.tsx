'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'
import { locales, type Locale } from '@/i18n/config'

interface LocaleSwitcherProps {
  current: Locale
  label: string
  /** True on dark/transparent backgrounds (white text); false on light (dark text). */
  dark?: boolean
}

/** Client leaf: swaps the leading locale segment of the current path. */
export function LocaleSwitcher({ current, label, dark = true }: LocaleSwitcherProps) {
  const pathname = usePathname()
  const rest = pathname.replace(/^\/[^/]+/, '') || '/'
  const inactive = dark ? 'text-white/70 hover:bg-white/10' : 'text-foreground/60 hover:bg-foreground/5'

  return (
    <nav aria-label={label} className="flex items-center gap-1">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${rest}`}
          hrefLang={locale}
          aria-current={locale === current ? 'true' : undefined}
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-medium uppercase transition-colors',
            locale === current ? 'bg-accent text-white' : inactive
          )}
        >
          {locale}
        </Link>
      ))}
    </nav>
  )
}
