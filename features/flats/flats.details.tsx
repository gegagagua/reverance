import { RequestCallButton } from '@/features/request-call'
import type { Dictionary } from '@/i18n/dictionaries'

type Flat = Dictionary['flats']['items'][number]

/**
 * Per-type CTA under the apartment carousel (item #12b). The detailed spec table
 * (price range / floors / availability / payment plan / ROI) is intentionally
 * omitted — that data isn't ready to publish (client request 2026-07-17), so the
 * landing shows the typical apartment types only. The CTA opens the Request-a-Call
 * modal pre-attributed to this apartment type, so the choice travels with the lead.
 */
export function FlatDetails({ flat }: { flat: Flat }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
      <RequestCallButton
        variant="accent"
        className="w-full"
        leadContext={{ apartment: flat.leadType, source: `flats_${flat.leadType}` }}
      >
        {flat.cta}
      </RequestCallButton>
    </div>
  )
}
