import { useCallback } from 'react'
import { useLiveCameraStore } from './live-camera.state'

/** Trigger side: stable open handler for the header button. */
export function useOpenLiveCamera() {
  const setOpen = useLiveCameraStore((s) => s.setOpen)
  return useCallback(() => setOpen(true), [setOpen])
}

/** Modal side: current visibility and a close handler. */
export function useLiveCamera() {
  const open = useLiveCameraStore((s) => s.open)
  const setOpen = useLiveCameraStore((s) => s.setOpen)
  const close = useCallback(() => setOpen(false), [setOpen])
  return { open, close }
}
