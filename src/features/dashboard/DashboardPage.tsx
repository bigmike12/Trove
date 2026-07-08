import { useAuth } from '@/features/auth'

export function DashboardPage() {
  const { session } = useAuth()
  const firstName = session?.user.name.split(' ')[0] ?? 'there'

  return (
    <div>
      <h1 className="text-xl font-semibold">Welcome back, {firstName}</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Here&apos;s how your portfolio is doing.
      </p>
    </div>
  )
}
