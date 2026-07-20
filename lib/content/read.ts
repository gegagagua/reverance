import 'server-only'
import { cache } from 'react'
import type { Locale } from '@/i18n/config'
import { readPayload, writePayload } from './db'
import { deepMerge } from './merge'
import { DEFAULT_IMAGES } from './defaults'
import { applyPinnedImages } from './pinned'
import type { ContentOverrides, SiteImages, TextOverride } from './types'

const EMPTY: ContentOverrides = { text: {}, images: {} }

/**
 * Loads saved overrides once per request (React `cache`). Resilient: if the DB is
 * unreachable, returns empty overrides so the site still renders its defaults.
 */
export const getOverrides = cache(async (): Promise<ContentOverrides> => {
  try {
    const payload = await readPayload()
    if (!payload) return EMPTY
    const parsed = JSON.parse(payload) as Partial<ContentOverrides>
    return { text: parsed.text ?? {}, images: parsed.images ?? {} }
  } catch {
    return EMPTY
  }
})

/** Text overrides for a locale, or undefined when none were saved. */
export async function getTextOverride(locale: Locale): Promise<TextOverride | undefined> {
  return (await getOverrides()).text[locale]
}

/** The effective image set: shipped defaults with saved overrides merged on top,
 * then pinned slots (e.g. hero-2) forced back to their hardcoded defaults. */
export async function getImages(): Promise<SiteImages> {
  const merged = deepMerge(DEFAULT_IMAGES, (await getOverrides()).images)
  return applyPinnedImages(merged)
}

/** Persists the full overrides payload (called from the admin save action). */
export async function saveOverrides(overrides: ContentOverrides): Promise<void> {
  await writePayload(JSON.stringify(overrides))
}
