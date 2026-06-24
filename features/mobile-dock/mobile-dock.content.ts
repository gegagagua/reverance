import type { TrackEvent } from '@/lib/track'

/** Chat channels for the floating dock. `key` maps to dictionary labels; numbers
 * are the Otium sales contacts. Each click fires its own conversion event. */
export const DOCK_CHANNELS = [
  { key: 'whatsapp', href: 'https://wa.me/995500102020', event: 'click_whatsapp' },
] as const satisfies ReadonlyArray<{
  key: 'whatsapp'
  href: string
  event: TrackEvent
}>

export const DOCK_PALETTE = {
  whatsapp: 'bg-[#25D366]',
} as const
