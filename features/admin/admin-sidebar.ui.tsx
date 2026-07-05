'use client'

import { cn } from '@/lib/cn'
import { useView } from './admin.logic'
import { sectionIcon, sectionLabel } from './admin.content'

/** WordPress-style left nav: Dashboard, every content section, then Media. */
export function AdminSidebar({ sections }: { sections: string[] }) {
  const [view, setView] = useView()

  const item = (id: string, icon: string, label: string) => (
    <button
      key={id}
      type="button"
      onClick={() => setView(id)}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
        view === id ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
      )}
    >
      <span className="w-5 text-center text-base">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  )

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col gap-1 overflow-y-auto bg-surface px-3 py-4 text-white">
      <div className="px-3 pb-4 text-sm font-semibold uppercase tracking-[0.2em]">Reverance</div>
      {item('dashboard', '🏠', 'Dashboard')}
      <p className="px-3 pb-1 pt-4 text-[11px] uppercase tracking-widest text-white/40">Content</p>
      {sections.map((key) => item(key, sectionIcon(key), sectionLabel(key)))}
      <p className="px-3 pb-1 pt-4 text-[11px] uppercase tracking-widest text-white/40">Media</p>
      {item('media', '🖼️', 'Media Library')}
    </aside>
  )
}
