import { Card } from '@/shared/ui/Card'
import { formatMoney, formatShareOfTotal } from '@/utils/money'
import type { SectorGroup } from '@/utils/portfolio'

interface AccountsGridProps {
  groups: SectorGroup[]
  colorOf: (sector: string) => string
}

export function AccountsGrid({ groups, colorOf }: AccountsGridProps) {
  return (
    <section aria-label="Accounts by sector">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {groups.map((group) => (
          <Card key={group.sector} className="p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: colorOf(group.sector) }}
              />
              <h3 className="truncate text-xs font-medium text-ink-soft">
                {group.sector}
              </h3>
            </div>
            <p className="mt-2 text-sm font-semibold sm:text-base">
              {formatMoney(group.value)}
            </p>
            <p className="mt-1 text-xs text-ink-faint">
              {group.positions} position{group.positions === 1 ? '' : 's'} ·{' '}
              {formatShareOfTotal(group.share)} of portfolio
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
