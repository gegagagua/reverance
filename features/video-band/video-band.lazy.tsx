'use client'

import dynamic from 'next/dynamic'
import { Defer } from '@/components/ui'

// Below-the-fold media: the click-to-play facade + player chunk load on scroll.
const VideoPlayer = dynamic(() => import('./video-band.player').then((m) => m.VideoPlayer), { ssr: false })

/** Scroll-deferred video player; fills the parent's reserved aspect box. */
export function VideoPlayerLazy(props: { label: string; video: { youtubeId: string; image: string } }) {
  return (
    <Defer className="h-full w-full">
      <VideoPlayer {...props} />
    </Defer>
  )
}
