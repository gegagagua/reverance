import { LoginForm } from './login-form.ui'

/** `/admin-login` — proxy.ts already redirects authenticated visitors to /admin. */
export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-foreground/5 px-4">
      <LoginForm />
    </main>
  )
}
