import { useCallback } from 'react'
import { useRequestCallStore, type RequestCallContext } from './request-call.state'

/** Trigger side: get a stable open handler for CTAs. Pass optional context
 * (apartment type + source) so the opened lead form is pre-attributed. */
export function useOpenRequestCall() {
  const setOpen = useRequestCallStore((s) => s.setOpen)
  return useCallback((context?: RequestCallContext) => setOpen(true, context), [setOpen])
}

/** Modal side: current visibility, the opening context, and a close handler. */
export function useRequestCall() {
  const open = useRequestCallStore((s) => s.open)
  const context = useRequestCallStore((s) => s.context)
  const setOpen = useRequestCallStore((s) => s.setOpen)
  const close = useCallback(() => setOpen(false), [setOpen])
  return { open, context, close }
}
