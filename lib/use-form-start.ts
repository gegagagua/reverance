import { useCallback, useRef } from 'react'
import { trackLead } from '@/lib/track'

/**
 * Fires a `lead_form_start_*` GTM event the first time a visitor types into a
 * form (one character is enough), then never again for that mounted instance.
 * Wire the returned callback into each typed field's onChange — the ref guard
 * makes every later keystroke a no-op. `event` is optional so shared forms (the
 * modal) can stay silent until a trigger supplies its own start-event name.
 */
export function useFormStart(event?: string) {
  const fired = useRef(false)
  return useCallback(() => {
    if (fired.current || !event) return
    fired.current = true
    trackLead(event)
  }, [event])
}
