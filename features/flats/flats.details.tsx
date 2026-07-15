import { RequestCallButton } from '@/features/request-call'
import type { Dictionary } from '@/i18n/dictionaries'

type Flat = Dictionary['flats']['items'][number]
type SpecLabels = Dictionary['flats']['specLabels']

/**
 * Structured spec table for the active apartment plus a per-type CTA (items #4,
 * #12b). The CTA opens the Request-a-Call modal pre-attributed to this apartment
 * type, so the choice travels with the submitted lead.
 */
export function FlatDetails({ flat, labels }: { flat: Flat; labels: SpecLabels }) {
  const rows = [
    { label: labels.priceRange, value: flat.priceRange },
    { label: labels.area, value: flat.area },
    { label: labels.floors, value: flat.floors },
    { label: labels.availability, value: flat.availability },
    { label: labels.payment, value: flat.payment },
    { label: labels.roi, value: flat.roi },
    { label: labels.bestUse, value: flat.bestUse },
  ]
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
      <dl className="grid gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1 bg-background p-4">
            <dt className="text-xs uppercase tracking-widest text-accent">{row.label}</dt>
            <dd className="text-sm font-medium text-foreground/90">{row.value}</dd>
          </div>
        ))}
      </dl>
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
