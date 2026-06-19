import { useCallback, useState } from 'react'

/** Ephemeral open/closed state for the floating dock. Local to the leaf — no
 * store needed since nothing else reads it. */
export function useMobileDock() {
  const [open, setOpen] = useState(false)
  const toggle = useCallback(() => setOpen((value) => !value), [])
  return { open, toggle }
}
