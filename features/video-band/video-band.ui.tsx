import type { Dictionary } from '@/i18n/dictionaries'
import { VideoPlayer } from './video-band.player'

/** Server Component, full-bleed dark band that plays the YouTube tour inline. */
export function VideoBand({
  content,
  video,
}: {
  content: Dictionary['video']
  video: { youtubeId: string; image: string }
}) {
  return (
    <section aria-label={content.label} className="bg-surface">
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <VideoPlayer label={content.label} video={video} />
      </div>
    </section>
  )
}
