import { format, parseISO } from 'date-fns'
import { Eye, EyeOff, Info } from 'lucide-react'
import { useState } from 'react'

import { Card } from '@/shared/ui/Card'
import { FilterPills } from '@/shared/ui/FilterPills'
import { Skeleton } from '@/shared/ui/Skeleton'
import type { HistoryRange } from '@/types/portfolio'
import { formatMoney } from '@/utils/money'
import type { PortfolioTotals } from '@/utils/portfolio'

import { useNetWorthHistory } from '../hooks/useNetWorthHistory'
import { GainLoss } from './GainLoss'
import { NetWorthChart } from './NetWorthChart'

interface NetWorthCardProps {
  totals: PortfolioTotals
  lastUpdated: string
  className?: string
}

const MASK = '******'

const RANGE_OPTIONS: HistoryRange[] = ['1D', '1W', '1M', 'ALL']

const TOOLTIP_DATE_FORMAT: Record<HistoryRange, string> = {
  '1D': 'h:mm a',
  '1W': 'MMM d, h a',
  '1M': 'MMM d',
  ALL: 'MMM d, yyyy',
}

export function NetWorthCard({
  totals,
  lastUpdated,
  className,
}: NetWorthCardProps) {
  const [hidden, setHidden] = useState(false)
  const [range, setRange] = useState<HistoryRange>('1M')
  const history = useNetWorthHistory(range)
  const ToggleIcon = hidden ? EyeOff : Eye

  return (
    <Card className={className}>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          <h2 className="text-xs font-medium text-ink-soft">Total Net Worth</h2>
          <button
            type="button"
            onClick={() => setHidden((current) => !current)}
            aria-pressed={hidden}
            aria-label={hidden ? 'Show balance' : 'Hide balance'}
            className="cursor-pointer rounded-lg p-1.5 text-ink-faint transition-colors hover:bg-fill hover:text-ink-soft focus-visible:outline-2 focus-visible:outline-primary"
          >
            <ToggleIcon aria-hidden className="size-4" />
          </button>
        </div>
        <div className="ml-auto">
          <FilterPills
            label="Chart time range"
            options={RANGE_OPTIONS}
            selected={range}
            onSelect={(option) => setRange(option as HistoryRange)}
          />
        </div>
      </div>

      <p className="mt-1 text-[28px] leading-tight font-semibold tracking-tight">
        {hidden ? MASK : formatMoney(totals.netWorth)}
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
        {hidden ? (
          <span className="text-sm font-medium text-ink-faint">{MASK}</span>
        ) : (
          <GainLoss
            amount={totals.totalGain}
            percent={totals.totalGainPercent}
            withIcon
          />
        )}
        <span className="text-xs text-ink-faint">
          all time · updated {format(parseISO(lastUpdated), 'MMM d, yyyy')}
        </span>
      </div>

      <div className="mt-4">
        {hidden ? (
          <div className="grid h-40 place-items-center rounded-xl bg-fill">
            <p className="text-xs text-ink-faint">Balance hidden</p>
          </div>
        ) : history.isPending ? (
          <Skeleton className="h-40 w-full" />
        ) : history.isError || !history.data ? (
          <div className="grid h-40 place-items-center rounded-xl bg-fill">
            <p className="text-xs text-ink-faint">
              Trend unavailable right now
            </p>
          </div>
        ) : (
          <NetWorthChart
            points={history.data}
            dateFormat={TOOLTIP_DATE_FORMAT[range]}
          />
        )}
      </div>

      {totals.positionsValuedAtCost > 0 && (
        <p className="mt-4 flex items-start gap-1.5 border-t border-line pt-3 text-xs text-ink-faint">
          <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
          Includes {totals.positionsValuedAtCost} position
          {totals.positionsValuedAtCost > 1 ? 's' : ''} valued at cost because a
          live price is unavailable.
        </p>
      )}
    </Card>
  )
}
