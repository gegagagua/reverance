import { create } from 'zustand'

interface LiveCameraState {
  open: boolean
  setOpen: (open: boolean) => void
}

/** Global open/closed state for the Live Camera modal, so the header button can
 * open it while the modal itself is mounted once (idle-deferred). */
export const useLiveCameraStore = create<LiveCameraState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))
