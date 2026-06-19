/** Locale config. Pure constants — safe to import from `proxy.ts` and client code. */
export const locales = ['en', 'ka', 'ru'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/** Endonyms, shown in the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ka: 'ქართული',
  ru: 'Русский',
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
