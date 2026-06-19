import type { TrackEvent } from '@/lib/track'

/** Chat channels for the floating dock. `key` maps to dictionary labels; numbers
 * are the Otium sales contacts. Each click fires its own conversion event. */
export const DOCK_CHANNELS = [
  { key: 'whatsapp', href: 'https://wa.me/995500102020', event: 'click_whatsapp' },
  { key: 'viber', href: 'viber://chat?number=%2B995500102020', event: 'click_viber' },
  { key: 'call', href: 'tel:+995032211104', event: 'click_call' },
] as const satisfies ReadonlyArray<{
  key: 'whatsapp' | 'viber' | 'call'
  href: string
  event: TrackEvent
}>

export const DOCK_PALETTE = {
  whatsapp: 'bg-[#25D366]',
  viber: 'bg-[#7360f2]',
  call: 'bg-accent',
} as const
