import Link from 'next/link'
import { Container, Heading, Text, buttonClass } from '@/components/ui'
import { defaultLocale } from '@/i18n/config'

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-6 py-32 text-center">
      <Heading as="h1" size="lg">
        Page not found
      </Heading>
      <Text tone="muted" className="max-w-md">
        The page you are looking for does not exist or has moved.
      </Text>
      <Link href={`/${defaultLocale}`} className={buttonClass()}>
        Back home
      </Link>
    </Container>
  )
}
