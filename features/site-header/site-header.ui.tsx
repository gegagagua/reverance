'use client'

import Image from 'next/image'
import { Container, buttonClass } from '@/components/ui'
import { cn } from '@/lib/cn'
import { LocaleSwitcher } from '@/features/locale-switcher'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { useHeader } from './site-header.logic'

/** Transparent over the hero, solid white once scrolled — mirrors the legacy `.smaller` header. */
export function SiteHeader({ locale, nav }: { locale: Locale; nav: Dictionary['nav'] }) {
  const { scrolled, mobileOpen, toggleMobile, closeMobile } = useHeader()
  const solid = scrolled || mobileOpen
  const link = solid ? 'text-foreground/70 hover:text-foreground' : 'text-white/80 hover:text-white'

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        solid ? 'bg-white shadow-sm' : 'bg-transparent'
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between gap-4 transition-all duration-300',
          scrolled ? 'h-16' : 'h-24'
        )}
      >
        <a href="#top" aria-label={nav.brand} onClick={closeMobile} className="flex items-center">
          <Image
            src="/theme/images/reverancelogo.png"
            alt={nav.brand}
            width={200}
            height={56}
            priority
            className={cn('w-auto', scrolled ? 'h-8 sm:h-9' : 'h-9 sm:h-12', !solid && 'brightness-0 invert')}
          />
        </a>
        <nav className="hidden items-center gap-9 lg:flex">
          {nav.menu.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn('text-xs font-medium uppercase tracking-widest transition-colors', link)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className={cn(
              'hidden whitespace-nowrap sm:inline-flex',
              buttonClass({ variant: 'accent', size: 'sm' }),
              'h-8 px-3 text-xs lg:h-9 lg:px-4 lg:text-sm'
            )}
          >
            {nav.call}
          </a>
          <LocaleSwitcher current={locale} label={nav.language} dark={!solid} />
          <button
            type="button"
            onClick={toggleMobile}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            className={cn(
              'flex h-9 w-9 items-center justify-center text-xl lg:hidden',
              solid ? 'text-foreground' : 'text-white'
            )}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </Container>
      {mobileOpen && (
        <nav className="border-t border-foreground/10 bg-white lg:hidden">
          <Container className="flex flex-col py-2">
            {nav.menu.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className="py-3 text-sm font-medium uppercase tracking-widest text-foreground/80"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMobile}
              className={cn('my-3', buttonClass({ variant: 'accent', size: 'sm' }))}
            >
              {nav.call}
            </a>
          </Container>
        </nav>
      )}
    </header>
  )
}
