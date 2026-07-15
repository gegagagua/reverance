import { Container, Heading, Section, Text } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'
import { MAP_MARKERS } from './location.content'
import { LocationMap } from './location.map'

/** Server Component. Batumi positioning: highlight cards, two addresses
 * (construction site + sales office), and a lazy-loaded two-pin map. */
export function Location({ content }: { content: Dictionary['location'] }) {
  const addresses = [
    { label: content.constructionLabel, value: content.construction },
    { label: content.salesLabel, value: content.sales },
  ]
  const markers = [
    {
      ...MAP_MARKERS.project,
      label: content.constructionLabel,
      address: content.construction,
      accent: false,
    },
    { ...MAP_MARKERS.sales, label: content.salesLabel, address: content.sales, accent: true },
  ]
  return (
    <Section id="location">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-sm uppercase tracking-widest text-accent">{content.eyebrow}</span>
          <Heading as="h2" size="lg">
            {content.heading}
          </Heading>
          <Text>{content.subtitle}</Text>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {content.highlights.map((highlight) => (
            <li
              key={highlight.label}
              className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5"
            >
              <span className="text-2xl" aria-hidden>
                {highlight.icon}
              </span>
              <span className="font-medium">{highlight.label}</span>
            </li>
          ))}
        </ul>
        <div className="grid gap-6 sm:grid-cols-2">
          {addresses.map((address) => (
            <div key={address.label} className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-accent">{address.label}</span>
              <span className="text-foreground/80">{address.value}</span>
            </div>
          ))}
        </div>
        <LocationMap markers={markers} title={content.mapTitle} />
      </Container>
    </Section>
  )
}
