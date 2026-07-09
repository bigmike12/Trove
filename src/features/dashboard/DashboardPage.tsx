import { useMemo } from 'react'

import { chartColorAt } from '@/constants/chart-colors'
import { useAuth } from '@/features/auth'
import { ErrorState } from '@/shared/ErrorState'
import { computeTotals, groupBySector, toPosition } from '@/utils/portfolio'

import { AllocationCard } from './components/AllocationCard'
import { DashboardSkeleton } from './components/DashboardSkeleton'
import { NetWorthCard } from './components/NetWorthCard'
import { usePortfolio } from './hooks/usePortfolio'
import { AccountsGrid } from './components/AccountsGrid'
import { HoldingsSection } from './components/HoldingsSection'

export function DashboardPage() {
  const { session } = useAuth()
  const { data, isPending, isError, refetch } = usePortfolio()

  const positions = useMemo(
    () => (data ? data.holdings.map(toPosition) : []),
    [data],
  )
  const totals = useMemo(() => computeTotals(positions), [positions])
  const sectorGroups = useMemo(() => groupBySector(positions), [positions])

  // Hues are assigned once, largest sector first, and stay stable thereafter
  const sectorColor = useMemo(() => {
    const colors = new Map(
      sectorGroups.map((group, index) => [group.sector, chartColorAt(index)]),
    )
    return (sector: string) => colors.get(sector) ?? chartColorAt(0)
  }, [sectorGroups])

  if (isPending) return <DashboardSkeleton />

  if (isError || !data) {
    return (
      <ErrorState
        message="We couldn't load your portfolio. Check your connection and try again."
        onRetry={() => void refetch()}
      />
    )
  }

  const firstName = session?.user.name.split(' ')[0] ?? 'there'

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold">Welcome back, {firstName}</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Here&apos;s how your portfolio is doing.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-5">
        <NetWorthCard
          className="lg:col-span-3"
          totals={totals}
          lastUpdated={data.user.lastUpdated}
        />
        <AllocationCard
          className="lg:col-span-2"
          groups={sectorGroups}
          colorOf={sectorColor}
        />
      </div>

      <AccountsGrid groups={sectorGroups} colorOf={sectorColor} />

      <HoldingsSection positions={positions} />
    </div>
  )
}
