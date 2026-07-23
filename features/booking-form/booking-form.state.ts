import { create } from 'zustand'

export type BookingStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface BookingFields {
  name: string
  countryCode: string
  phone: string
  email: string
  apartment: string
  channel: string
  time: string
  /** CTA / section that opened this form — recorded with the lead (item #4). */
  source: string
}

interface BookingState extends BookingFields {
  status: BookingStatus
  update: (patch: Partial<BookingFields>) => void
  setStatus: (status: BookingStatus) => void
}

export const useBookingStore = create<BookingState>((set) => ({
  name: '',
  countryCode: '+995',
  phone: '',
  email: '',
  apartment: '',
  channel: '',
  time: '',
  source: '',
  status: 'idle',
  update: (patch) => set({ ...patch, status: 'idle' }),
  setStatus: (status) => set({ status }),
}))
