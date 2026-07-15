/**
 * Emits a JSON-LD `<script>` for structured data. Server-rendered into static
 * HTML, so crawlers read it without executing any client JavaScript. Content is
 * trusted (built from our own dictionary), so serialising it inline is safe.
 */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
