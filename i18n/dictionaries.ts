import 'server-only'
import en from './dictionaries/en.json'
import { type Locale } from './config'
import { deepMerge } from '@/lib/content/merge'
import { getTextOverride } from '@/lib/content/read'

/** The English dictionary is the source of truth; ka/ru must match its shape. */
export type Dictionary = typeof en

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => Promise.resolve(en),
  ka: () => import('./dictionaries/ka.json').then((m) => m.default),
  ru: () => import('./dictionaries/ru.json').then((m) => m.default),
}

/**
 * Loads a locale's strings on the server only — translation files never reach
 * the client bundle. ka/ru load as separate dynamic chunks. Admin edits saved in
 * the database are deep-merged on top of the shipped translations.
 */
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const base = await loaders[locale]()
  const override = await getTextOverride(locale)
  return override ? deepMerge(base, override) : base
}
