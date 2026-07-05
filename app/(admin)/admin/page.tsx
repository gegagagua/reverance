import { redirect } from 'next/navigation'
import { locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { isAuthenticated } from '@/lib/admin-auth'
import { getImages } from '@/lib/content/read'
import { listAssets } from '@/lib/content/assets'
import type { ContentOverrides } from '@/lib/content/types'
import { AdminEditor } from '@/features/admin'

/** `/admin` dashboard. Loads the current (override-merged) content for all locales
 * plus the available media, and hands it to the client editor as the initial draft. */
export default async function AdminPage() {
  if (!(await isAuthenticated())) redirect('/admin-login')

  const dicts = await Promise.all(locales.map((l) => getDictionary(l)))
  const [images, assets] = await Promise.all([getImages(), listAssets()])

  const text = Object.fromEntries(locales.map((l, i) => [l, dicts[i]]))
  const initial: ContentOverrides = { text, images }

  return <AdminEditor initial={initial} assets={assets} />
}
