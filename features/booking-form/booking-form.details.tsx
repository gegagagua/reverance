import { Button } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { LABEL_CLASS, SELECT_CLASS } from './booking-form.content'
import type { useBookingForm } from './booking-form.logic'

interface Props {
  f: ReturnType<typeof useBookingForm>
  content: Dictionary['contact']
  locale: Locale
}

/** Lower half of the booking form: apartment, preferred channel, time, submit. */
export function BookingDetails({ f, content, locale }: Props) {
  return (
    <>
      <label className="grid gap-2">
        <span className={LABEL_CLASS}>{content.apartment}</span>
        <select
          aria-label={content.apartment}
          value={f.apartment}
          onChange={(e) => f.update({ apartment: e.target.value })}
          className={SELECT_CLASS}
        >
          <option value="">—</option>
          {content.apartmentOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <fieldset className="grid gap-2">
        <legend className={LABEL_CLASS}>{content.channel}</legend>
        <div className="flex flex-wrap gap-2">
          {content.channels.map((channel) => (
            <label
              key={channel}
              className={cn(
                'cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors',
                f.channel === channel ? 'border-accent bg-accent/10 text-accent' : 'border-foreground/15'
              )}
            >
              <input
                type="radio"
                name="channel"
                value={channel}
                checked={f.channel === channel}
                onChange={() => f.update({ channel })}
                className="sr-only"
              />
              {channel}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="grid gap-2">
        <span className={LABEL_CLASS}>{content.time}</span>
        <select
          aria-label={content.time}
          value={f.time}
          onChange={(e) => f.update({ time: e.target.value })}
          className={SELECT_CLASS}
        >
          <option value="">—</option>
          {content.times.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit" variant="accent" size="lg" disabled={f.status === 'submitting'}>
        {f.status === 'submitting' ? content.sending : content.send}
      </Button>
      {f.status === 'error' && (
        <p role="status" className="text-sm text-red-600">
          {content.error}
        </p>
      )}
      <p className="text-xs leading-relaxed text-foreground/50">
        {content.privacy}{' '}
        <a href={`/${locale}/privacy`} className="underline hover:text-foreground">
          {content.privacyLink}
        </a>
      </p>
    </>
  )
}
