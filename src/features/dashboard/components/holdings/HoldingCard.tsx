import clsx from 'clsx'

import { formatAmount, formatMoney } from '@/utils/money'
import type { HoldingPosition } from '@/utils/portfolio'

import { GainLoss } from '../GainLoss'
import { Badge } from '@/shared/ui/Badge'

export function HoldingCard({ position }: { position: HoldingPosition }) {
  const showAtCost = !position.hasKnownPrice && !position.isClosed

  return (
    <div
      className={clsx(
        'flex items-center gap-3 rounded-xl border border-line p-4 transition-colors hover:border-primary/40 md:justify-between',
        position.isClosed && 'opacity-60',
      )}
    >
      {/* Left */}
      <div className="flex min-w-0 flex-1 gap-3 md:flex-none md:gap-2">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-fill text-[10px] font-bold text-ink-soft">
          {position.ticker}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold">{position.ticker}</p>

            {position.isClosed && <Badge>Closed</Badge>}

            {showAtCost && <Badge tone="warning">Price unavailable</Badge>}
          </div>

          <p className="truncate text-xs text-ink-soft">{position.name}</p>

          {/* Mobile only */}
          <p className="mt-0.5 text-xs text-ink-faint md:hidden">
            {position.isClosed
              ? 'No shares held'
              : `${formatAmount(position.shares)} shares · avg ${formatMoney(position.avgCost)}`}
          </p>
        </div>
      </div>

      {/* Desktop shares column */}
      <div className="hidden text-left md:block">
        <p className="text-xs text-ink-soft">Shares</p>
        <p className="mt-0.5 text-sm font-semibold">
          {position.isClosed
            ? 'No shares held'
            : formatAmount(position.shares)}
        </p>
      </div>

      {/* Right */}
      <div className="shrink-0 text-right">
        {position.isClosed ? (
          <p className="text-sm font-medium text-ink-faint">—</p>
        ) : (
          <>
            <p className="text-sm font-semibold">
              {formatMoney(position.marketValue)}
            </p>

            {showAtCost ? (
              <p className="mt-0.5 text-xs text-ink-faint">
                valued at cost
              </p>
            ) : (
              <GainLoss
                amount={position.gain}
                percent={position.gainPercent}
                size="xs"
                className="mt-0.5"
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}