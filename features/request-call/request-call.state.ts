import { create } from 'zustand'

interface RequestCallState {
  open: boolean
  setOpen: (open: boolean) => void
}

/** Global open/closed state for the "Request a Call" modal. Kept in a store so
 * any CTA (header, dock, bands) can open it while the modal itself is mounted
 * once with the contact content. */
export const useRequestCallStore = create<RequestCallState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))
