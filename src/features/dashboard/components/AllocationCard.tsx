import { AllocationChart } from '@/shared/charts/AllocationChart'
import { Card } from '@/shared/ui/Card'
import { formatMoney, formatShareOfTotal } from '@/utils/money'
import type { SectorGroup } from '@/utils/portfolio'

interface AllocationCardProps {
  groups: SectorGroup[]
  colorOf: (sector: string) => string
  className?: string
}

export function AllocationCard({
  groups,
  colorOf,
  className,
}: AllocationCardProps) {
  const segments = groups.map((group) => ({
    id: group.sector,
    label: group.sector,
    value: group.value,
    color: colorOf(group.sector),
  }))

  return (
    <Card className={className}>
      <h2 className="text-sm font-semibold">Asset Allocation</h2>
      <p className="mt-0.5 mb-5 text-xs text-ink-faint">
        By sector, share of net worth
      </p>
      <AllocationChart
        segments={segments}
        formatValue={formatMoney}
        formatShare={formatShareOfTotal}
      />
    </Card>
  )
}
