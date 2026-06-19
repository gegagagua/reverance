import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale, locales, type Locale } from '@/i18n/config'

/** Minimal, dependency-free `Accept-Language` negotiation against our 3 locales. */
function negotiateLocale(request: NextRequest): Locale {
  const header = request.headers.get('accept-language')
  if (!header) return defaultLocale
  for (const part of header.split(',')) {
    const tag = (part.split(';')[0] ?? '').trim().split('-')[0]?.toLowerCase() ?? ''
    if (isLocale(tag)) return tag
  }
  return defaultLocale
}

/** Runs before render: prefixes locale-less paths with the negotiated locale. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return

  const locale = negotiateLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Skip Next internals, API routes, and any file with an extension (favicon, images).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
