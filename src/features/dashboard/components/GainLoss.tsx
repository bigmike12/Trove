import clsx from 'clsx'
import { TrendingDown, TrendingUp } from 'lucide-react'

import { formatSignedMoney, formatSignedPercent } from '@/utils/money'

interface GainLossProps {
  /** null means the gain is unknowable (e.g. no live price). */
  amount: number | null
  percent?: number | null
  withIcon?: boolean
  className?: string
}

export function GainLoss({
  amount,
  percent,
  withIcon = false,
  className,
}: GainLossProps) {
  if (amount === null) {
    return (
      <span className={clsx('text-sm font-medium text-ink-faint', className)}>
        —
      </span>
    )
  }

  const isLoss = amount < 0
  const isFlat = amount === 0
  const Icon = isLoss ? TrendingDown : TrendingUp

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 text-sm font-medium',
        isFlat ? 'text-ink-soft' : isLoss ? 'text-loss' : 'text-gain',
        className,
      )}
    >
      {withIcon && !isFlat && <Icon aria-hidden className="size-4" />}
      {formatSignedMoney(amount)}
      {percent != null && <span>({formatSignedPercent(percent)})</span>}
    </span>
  )
}
