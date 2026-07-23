import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { QuickCall, type QuickCallContent } from '@/features/quick-call'

type Flat = Dictionary['flats']['items'][number]

/**
 * Per-type CTA under the apartment carousel (item #12b). The detailed spec table
 * (price range / floors / availability / payment plan / ROI) is intentionally
 * omitted — that data isn't ready to publish (client request 2026-07-17), so the
 * landing shows the typical apartment types only. The inline phone-capture posts
 * a lead pre-attributed to this apartment type, so the choice travels with it.
 */
export function FlatDetails({
  flat,
  locale,
  quick,
}: {
  flat: Flat
  locale: Locale
  quick: QuickCallContent
}) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5">
      <QuickCall
        content={quick}
        locale={locale}
        source={`flats_${flat.leadType}`}
        apartment={flat.leadType}
        leadEvent="Lead-form-submit-render"
        startEvent="Lead-form-start-render"
      />
    </div>
  )
}
