import 'server-only'
import en from './dictionaries/en.json'
import { type Locale } from './config'

/** The English dictionary is the source of truth; ka/ru must match its shape. */
export type Dictionary = typeof en

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => Promise.resolve(en),
  ka: () => import('./dictionaries/ka.json').then((m) => m.default),
  ru: () => import('./dictionaries/ru.json').then((m) => m.default),
}

/**
 * Loads a locale's strings on the server only — translation files never reach
 * the client bundle. ka/ru load as separate dynamic chunks.
 */
export const getDictionary = (locale: Locale): Promise<Dictionary> => loaders[locale]()
