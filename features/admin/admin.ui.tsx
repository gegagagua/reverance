'use client'

import { defaultLocale } from '@/i18n/config'
import type { ContentOverrides } from '@/lib/content/types'
import { useInit, useView } from './admin.logic'
import { ASSET_LIST_ID } from './admin.content'
import { AdminSidebar } from './admin-sidebar.ui'
import { AdminTopbar } from './admin-topbar.ui'
import { AdminDashboard } from './admin-dashboard.ui'
import { AdminSection } from './admin-section.ui'

/** CMS shell: a fixed sidebar of pages, a top bar, and the active page's panel. */
export function AdminEditor({ initial, assets }: { initial: ContentOverrides; assets: string[] }) {
  useInit(initial)
  const [view] = useView()
  const sections = Object.keys(initial.text[defaultLocale] ?? {})

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar sections={sections} />
      <div className="flex min-h-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto bg-foreground/[0.03] px-6 py-6">
          {view === 'dashboard' ? (
            <AdminDashboard sections={sections} assetCount={assets.length} />
          ) : (
            <AdminSection initial={initial} />
          )}
        </main>
      </div>
      <datalist id={ASSET_LIST_ID}>
        {assets.map((a) => (
          <option key={a} value={a} />
        ))}
      </datalist>
    </div>
  )
}
