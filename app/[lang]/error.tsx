'use client'

import { Button, Container, Heading, Text } from '@/components/ui'

/** Route error boundary. Must be a Client Component (it owns the retry handler). */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="flex flex-col items-center gap-6 py-32 text-center">
      <Heading as="h1" size="lg">
        Something went wrong
      </Heading>
      <Text tone="muted" className="max-w-md">
        An unexpected error occurred. Try again, and if it persists, let us know.
      </Text>
      <Button onClick={reset}>Try again</Button>
    </Container>
  )
}
