'use client'

import { useActionState } from 'react'
import { Button, Heading, Input, Text } from '@/components/ui'
import { loginAction, type LoginState } from './actions'

const INITIAL: LoginState = {}

/** Client login form. Wires the credentials to the `loginAction` Server Action. */
export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, INITIAL)

  return (
    <form
      action={action}
      className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-foreground/10 bg-white p-8 shadow-sm"
    >
      <div className="flex flex-col gap-1 text-center">
        <Heading as="h1" size="md">
          Reverance Admin
        </Heading>
        <Text tone="muted">Sign in to manage site content.</Text>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-foreground/70">Username</span>
        <Input name="username" autoComplete="username" required autoFocus />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm text-foreground/70">Password</span>
        <Input name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.error ? <Text className="text-sm text-accent">{state.error}</Text> : null}
      <Button type="submit" variant="accent" size="lg" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
