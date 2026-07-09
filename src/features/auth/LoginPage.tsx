import { Button } from '@/shared/ui/Button'

import { LoginForm } from './components/LoginForm'

export function LoginPage() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-page px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -bottom-32 size-112 rounded-full bg-info/10 blur-3xl"
      />

      <div className="relative w-full max-w-md rounded-card bg-surface p-8 shadow-sm sm:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="grid size-12 place-items-center rounded-xl bg-primary text-lg font-bold text-white">
            T
          </div>
          <h1 className="mt-4 text-xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Sign in to your Trove account
          </p>
        </div>

        <div className="mt-8">
          <LoginForm />
        </div>

        <div className="mt-5 text-center">
          <button
            type="button"
            className="cursor-pointer text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <div className="mt-6 border-t border-line pt-6 text-center">
          <p className="text-xs text-ink-faint">Don&apos;t have an account?</p>
          <Button type="button" variant="outline" className="mt-3 w-full">
            Create a Trove account
          </Button>
        </div>
      </div>
    </main>
  )
}
