import { Container } from '@/components/ui'

/** Route-level Suspense fallback. Streamed before the page resolves. */
export default function Loading() {
  return (
    <Container className="flex flex-col items-center gap-4 py-32">
      <div className="h-10 w-2/3 max-w-md animate-pulse rounded-lg bg-foreground/10" />
      <div className="h-4 w-1/2 max-w-sm animate-pulse rounded bg-foreground/10" />
    </Container>
  )
}
