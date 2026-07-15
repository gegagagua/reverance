import { create } from 'zustand'

export type LeadStatus = 'idle' | 'submitting' | 'error'

interface LeadFields {
  name: string
  phone: string
  apartment: string
}

interface LeadState extends LeadFields {
  status: LeadStatus
  update: (patch: Partial<LeadFields>) => void
  setStatus: (status: LeadStatus) => void
}

/** Store for the compact post-hero lead form (item #3). Kept separate from the
 * full booking store so typing here never bleeds into the modal / contact form. */
export const useLeadStore = create<LeadState>((set) => ({
  name: '',
  phone: '',
  apartment: '',
  status: 'idle',
  update: (patch) => set({ ...patch, status: 'idle' }),
  setStatus: (status) => set({ status }),
}))
