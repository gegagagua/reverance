'use client'

import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { COUNTRY_CODES } from './booking-form.content'
import { useBookingForm } from './booking-form.logic'

const selectClass =
  'h-11 w-full rounded-full border border-foreground/15 bg-transparent px-5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30'
const labelClass = 'text-sm font-medium text-foreground/70'

/** Full lead-capture form. Presentation only; behaviour lives in the logic hook. */
export function BookingForm({ content, locale }: { content: Dictionary['contact']; locale: Locale }) {
  const f = useBookingForm(locale)
  return (
    <form onSubmit={f.submit} className="grid gap-5">
      <label className="grid gap-2">
        <span className={labelClass}>{content.name}</span>
        <Input
          aria-label={content.name}
          value={f.name}
          onChange={(e) => f.update({ name: e.target.value })}
          required
        />
      </label>
      <label className="grid gap-2">
        <span className={labelClass}>{content.phone}</span>
        <div className="flex gap-2">
          <select
            aria-label="Country code"
            value={f.countryCode}
            onChange={(e) => f.update({ countryCode: e.target.value })}
            className={cn(selectClass, 'w-auto px-3')}
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.label} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
          <Input
            type="tel"
            aria-label={content.phone}
            value={f.phone}
            onChange={(e) => f.update({ phone: e.target.value })}
            required
          />
        </div>
      </label>
      <label className="grid gap-2">
        <span className={labelClass}>
          {content.email} <span className="text-foreground/40">· {content.emailHint}</span>
        </span>
        <Input
          type="email"
          aria-label={content.email}
          value={f.email}
          onChange={(e) => f.update({ email: e.target.value })}
        />
      </label>
      <label className="grid gap-2">
        <span className={labelClass}>{content.apartment}</span>
        <select
          aria-label={content.apartment}
          value={f.apartment}
          onChange={(e) => f.update({ apartment: e.target.value })}
          className={selectClass}
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
        <legend className={labelClass}>{content.channel}</legend>
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
        <span className={labelClass}>{content.time}</span>
        <select
          aria-label={content.time}
          value={f.time}
          onChange={(e) => f.update({ time: e.target.value })}
          className={selectClass}
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
    </form>
  )
}
