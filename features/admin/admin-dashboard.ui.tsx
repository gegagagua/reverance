'use client'

import { locales } from '@/i18n/config'
import { useView } from './admin.logic'
import { sectionIcon, sectionLabel } from './admin.content'

/** Landing view: at-a-glance counts plus quick links into each content section. */
export function AdminDashboard({ sections, assetCount }: { sections: string[]; assetCount: number }) {
  const [, setView] = useView()
  const stats = [
    { label: 'Content sections', value: sections.length },
    { label: 'Languages', value: locales.length },
    { label: 'Media assets', value: assetCount },
  ]

  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-2xl text-foreground/60">
        Welcome back. Pick a section to edit its text in any language, or open the Media Library to swap
        images. Edits go live on the site once you press <strong>Save changes</strong>.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-foreground/10 bg-white p-6">
            <div className="text-3xl font-semibold">{s.value}</div>
            <div className="text-sm text-foreground/60">{s.label}</div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-foreground/50">
          Edit a section
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setView(key)}
              className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-white p-4 text-left transition-colors hover:border-accent hover:bg-foreground/5"
            >
              <span className="text-xl">{sectionIcon(key)}</span>
              <span className="font-medium">{sectionLabel(key)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
