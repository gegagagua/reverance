import Script from 'next/script'
import { ANALYTICS, gtmScript, gaScript, pixelScript } from './analytics.content'

/**
 * Server Component. Injects GTM, GA4, and Meta Pixel — each only when its ID is
 * configured. Scripts load `afterInteractive` so they never block hydration.
 * Place once in the root layout; `lib/track` fires conversion events into them.
 */
export function Analytics() {
  const { gtmId, gaId, pixelId } = ANALYTICS
  return (
    <>
      {gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {gtmScript(gtmId)}
        </Script>
      )}
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {gaScript(gaId)}
          </Script>
        </>
      )}
      {pixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {pixelScript(pixelId)}
        </Script>
      )}
    </>
  )
}

/** GTM `<noscript>` fallback — belongs at the top of `<body>`. */
export function AnalyticsNoScript() {
  const { gtmId } = ANALYTICS
  if (!gtmId) return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        title="gtm"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
