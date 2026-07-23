import { create } from 'zustand'

/** Context a CTA can attach when opening the modal, so the lead records which
 * apartment type and button drove it (see item #4 — per-card CTAs). */
export interface RequestCallContext {
  apartment?: string
  source?: string
  /** GTM event fired when the lead is sent, so each CTA that opens the modal
   * (header, footer, CTA bands) reports under its own trigger name. */
  leadEvent?: string
}

interface RequestCallState {
  open: boolean
  context: RequestCallContext
  setOpen: (open: boolean, context?: RequestCallContext) => void
}

/** Global open/closed state for the "Request a Call" modal. Kept in a store so
 * any CTA (header, dock, bands, apartment cards) can open it while the modal
 * itself is mounted once with the contact content. */
export const useRequestCallStore = create<RequestCallState>((set) => ({
  open: false,
  context: {},
  setOpen: (open, context = {}) => set({ open, context }),
}))
