'use client'

import { Input } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { COUNTRY_CODES, LABEL_CLASS, SELECT_CLASS } from './booking-form.content'
import { useBookingForm } from './booking-form.logic'
import { BookingDetails } from './booking-form.details'

/** Full lead-capture form. Presentation only; behaviour lives in the logic hook. */
export function BookingForm({ content, locale }: { content: Dictionary['contact']; locale: Locale }) {
  const f = useBookingForm(locale)
  return (
    <form onSubmit={f.submit} className="grid gap-5">
      <label className="grid gap-2">
        <span className={LABEL_CLASS}>{content.name}</span>
        <Input
          aria-label={content.name}
          value={f.name}
          onChange={(e) => f.update({ name: e.target.value })}
          required
        />
      </label>
      <label className="grid gap-2">
        <span className={LABEL_CLASS}>{content.phone}</span>
        <div className="flex gap-2">
          <select
            aria-label="Country code"
            value={f.countryCode}
            onChange={(e) => f.update({ countryCode: e.target.value })}
            className={cn(SELECT_CLASS, 'w-auto px-3')}
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
        <span className={LABEL_CLASS}>
          {content.email} <span className="text-foreground/40">· {content.emailHint}</span>
        </span>
        <Input
          type="email"
          aria-label={content.email}
          value={f.email}
          onChange={(e) => f.update({ email: e.target.value })}
        />
      </label>
      <BookingDetails f={f} content={content} locale={locale} />
    </form>
  )
}
