import { format, parseISO } from 'date-fns'
import { Eye, EyeOff, Info } from 'lucide-react'
import { useState } from 'react'

import { Card } from '@/shared/ui/Card'
import { formatMoney } from '@/utils/money'
import type { PortfolioTotals } from '@/utils/portfolio'

import { GainLoss } from './GainLoss'

interface NetWorthCardProps {
  totals: PortfolioTotals
  lastUpdated: string
  className?: string
}

const MASK = '••••••'

export function NetWorthCard({
  totals,
  lastUpdated,
  className,
}: NetWorthCardProps) {
  const [hidden, setHidden] = useState(false)
  const ToggleIcon = hidden ? EyeOff : Eye

  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-medium text-ink-soft">Total Net Worth</h2>
        <button
          type="button"
          onClick={() => setHidden((current) => !current)}
          aria-pressed={hidden}
          aria-label={hidden ? 'Show balance' : 'Hide balance'}
          className="cursor-pointer rounded-lg p-2 text-ink-faint transition-colors hover:bg-fill hover:text-ink-soft focus-visible:outline-2 focus-visible:outline-primary"
        >
          <ToggleIcon aria-hidden className="size-4" />
        </button>
      </div>

      <p className="mt-1 text-[28px] leading-tight font-semibold tracking-tight">
        {hidden ? MASK : formatMoney(totals.netWorth)}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
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
