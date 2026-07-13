'use client'

import dynamic from 'next/dynamic'
import { Idle } from '@/components/ui'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

// Always mounted but never first-paint visible: load its chunk (modal + form)
// once the page is idle, keeping it out of the critical hydration path.
const RequestCallModal = dynamic(() => import('./request-call.ui').then((m) => m.RequestCallModal), {
  ssr: false,
})

/** Idle-deferred request-call modal. */
export function RequestCallModalLazy(props: { content: Dictionary['contact']; locale: Locale }) {
  return (
    <Idle>
      <RequestCallModal {...props} />
    </Idle>
  )
}
