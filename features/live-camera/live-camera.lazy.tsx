'use client'

import dynamic from 'next/dynamic'
import { Idle } from '@/components/ui'

// Mounted but never first-paint visible: load the modal chunk once the page is
// idle, keeping the camera iframes out of the critical hydration path.
const LiveCameraModal = dynamic(() => import('./live-camera.ui').then((m) => m.LiveCameraModal), {
  ssr: false,
})

/** Idle-deferred Live Camera modal. */
export function LiveCameraModalLazy({ label }: { label: string }) {
  return (
    <Idle>
      <LiveCameraModal label={label} />
    </Idle>
  )
}
