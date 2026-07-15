'use client'

import { useEffect, useRef } from 'react'

export type MapMarker = {
  lat: number
  lng: number
  label: string
  address: string
  url: string
  /** true → bronze pin (sales office); false → navy pin (project). */
  accent: boolean
}

/** Minimal shape of the Leaflet globals we touch — the library ships no types. */
type LMap = { remove: () => void; fitBounds: (b: unknown, o: object) => void }
type LMarker = { addTo: (m: LMap) => LMarker; bindPopup: (html: string) => LMarker }
type Leaflet = {
  map: (el: HTMLElement, opts: object) => LMap
  tileLayer: (url: string, opts: object) => { addTo: (m: LMap) => void }
  marker: (latlng: [number, number], opts: object) => LMarker
  divIcon: (opts: object) => unknown
  featureGroup: (layers: LMarker[]) => { getBounds: () => unknown }
}

const V = '1.9.4'
const CSS = `https://unpkg.com/leaflet@${V}/dist/leaflet.css`
const JS = `https://unpkg.com/leaflet@${V}/dist/leaflet.js`

/** Inject Leaflet's CSS + JS from the CDN once, resolving with the global `L`. */
function loadLeaflet(): Promise<Leaflet> {
  const w = window as unknown as { L?: Leaflet }
  if (w.L) return Promise.resolve(w.L)
  if (!document.querySelector(`link[href="${CSS}"]`)) {
    const link = Object.assign(document.createElement('link'), { rel: 'stylesheet', href: CSS })
    document.head.appendChild(link)
  }
  return new Promise((resolve, reject) => {
    let s = document.querySelector<HTMLScriptElement>(`script[src="${JS}"]`)
    if (!s) {
      s = Object.assign(document.createElement('script'), { src: JS, async: true })
      document.head.appendChild(s)
    }
    s.addEventListener('load', () => resolve(w.L as Leaflet))
    s.addEventListener('error', reject)
    if (w.L) resolve(w.L)
  })
}

/** Teardrop SVG pin in the brand palette — navy #1a2f49 / bronze #b07e50. */
function pinIcon(L: Leaflet, accent: boolean) {
  const color = accent ? '#b07e50' : '#1a2f49'
  return L.divIcon({
    className: 'reve-pin',
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -40],
    html: `<svg width="32" height="44" viewBox="0 0 32 44" fill="none" style="filter:drop-shadow(0 4px 6px rgba(0,0,0,.35))"><path d="M16 0C7.2 0 0 7.2 0 16c0 11 16 28 16 28s16-17 16-28C32 7.2 24.8 0 16 0Z" fill="${color}"/><circle cx="16" cy="16" r="6" fill="#fff"/></svg>`,
  })
}

/** Mount a keyless Leaflet map with one pin per marker and fit both in view. */
export function useLocationMap(markers: MapMarker[]) {
  const ref = useRef<HTMLDivElement>(null)
  const key = JSON.stringify(markers)
  useEffect(() => {
    let map: LMap | undefined
    let alive = true
    loadLeaflet().then((L) => {
      if (!alive || !ref.current) return
      map = L.map(ref.current, { scrollWheelZoom: false })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map)
      const group = markers.map((m) =>
        L.marker([m.lat, m.lng], { icon: pinIcon(L, m.accent), title: m.label })
          .addTo(map as LMap)
          .bindPopup(
            `<strong>${m.label}</strong><br/>${m.address}<br/><a href="${m.url}" target="_blank" rel="noreferrer">Google Maps →</a>`
          )
      )
      map.fitBounds(L.featureGroup(group).getBounds(), { padding: [56, 56] })
    })
    return () => {
      alive = false
      if (map) map.remove()
    }
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps
  return ref
}
