import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale, locales, type Locale } from '@/i18n/config'
import { ADMIN_COOKIE, ADMIN_PATH, ADMIN_TOKEN, LOGIN_PATH } from '@/lib/admin-session'
import { PROD_HOST } from '@/lib/site'

/** Force the single canonical origin: www.<host> and http:// (behind the proxy,
 * read from `x-forwarded-proto`) are 308-redirected to `https://<PROD_HOST>`.
 * Only fires for the production host, so localhost and previews are untouched. */
function canonicalRedirect(request: NextRequest): NextResponse | undefined {
  const host = request.headers.get('host')?.toLowerCase()
  if (!host) return
  const bareHost = host.replace(/^www\./, '')
  if (bareHost !== PROD_HOST) return
  const proto = request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '')
  if (host === PROD_HOST && proto === 'https') return
  const url = request.nextUrl.clone()
  url.protocol = 'https:'
  url.host = PROD_HOST
  return NextResponse.redirect(url, 308)
}

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

/** Runs before render: gates the admin area, then prefixes locale-less paths. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const canonical = canonicalRedirect(request)
  if (canonical) return canonical

  // Admin area is locale-independent. Gate it on the session cookie; never
  // run locale negotiation on it.
  if (pathname === LOGIN_PATH || pathname.startsWith(`${ADMIN_PATH}`)) {
    const authed = request.cookies.get(ADMIN_COOKIE)?.value === ADMIN_TOKEN
    const isLogin = pathname === LOGIN_PATH
    if (!authed && !isLogin) {
      request.nextUrl.pathname = LOGIN_PATH
      return NextResponse.redirect(request.nextUrl)
    }
    if (authed && isLogin) {
      request.nextUrl.pathname = ADMIN_PATH
      return NextResponse.redirect(request.nextUrl)
    }
    return
  }

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
