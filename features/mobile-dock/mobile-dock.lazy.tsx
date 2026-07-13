'use client'

import dynamic from 'next/dynamic'
import { Idle } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'

// Floating contact widget — helpful but not first-paint critical, so its chunk
// loads once the page is idle.
const MobileDock = dynamic(() => import('./mobile-dock.ui').then((m) => m.MobileDock), { ssr: false })

/** Idle-deferred floating dock. */
export function MobileDockLazy(props: { content: Dictionary['mobileDock'] }) {
  return (
    <Idle>
      <MobileDock {...props} />
    </Idle>
  )
}
