import { useCallback } from 'react'
import { useRequestCallStore } from './request-call.state'

/** Trigger side: subscribe to nothing, just get a stable open handler for CTAs. */
export function useOpenRequestCall() {
  const setOpen = useRequestCallStore((s) => s.setOpen)
  return useCallback(() => setOpen(true), [setOpen])
}

/** Modal side: current visibility plus a stable close handler. */
export function useRequestCall() {
  const open = useRequestCallStore((s) => s.open)
  const setOpen = useRequestCallStore((s) => s.setOpen)
  const close = useCallback(() => setOpen(false), [setOpen])
  return { open, close }
}
