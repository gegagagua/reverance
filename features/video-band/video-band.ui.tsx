import type { Dictionary } from '@/i18n/dictionaries'
import { VideoPlayer } from './video-band.player'

/** Server Component, full-bleed dark band that plays the YouTube tour inline. */
export function VideoBand({ content }: { content: Dictionary['video'] }) {
  return (
    <section aria-label={content.label} className="bg-surface">
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <VideoPlayer label={content.label} />
      </div>
    </section>
  )
}
