'use client'

import { Heading, Modal } from '@/components/ui'
import { liveCameras } from './live-camera.content'
import { useLiveCamera } from './live-camera.logic'

/**
 * The Live Camera modal — mounted once per page. Shows all three rtsp.me feeds
 * side by side in a wide dialog. Iframes are only in the DOM while the modal is
 * open (Modal renders nothing when closed), so the streams never load early.
 */
export function LiveCameraModal({ label }: { label: string }) {
  const { open, close } = useLiveCamera()
  return (
    <Modal open={open} onClose={close} label={label} size="full" className="flex flex-col">
      <Heading as="h2" size="md" className="mb-4 shrink-0">
        {label}
      </Heading>
      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-3">
        {liveCameras.map((cam) => (
          <div key={cam.src} className="min-h-[40vh] overflow-hidden rounded-xl bg-black lg:min-h-0">
            <iframe
              src={cam.src}
              title={cam.title}
              loading="lazy"
              allow="fullscreen; autoplay"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        ))}
      </div>
    </Modal>
  )
}
