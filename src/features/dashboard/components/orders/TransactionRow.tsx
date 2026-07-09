import clsx from 'clsx'
import { format, parseISO } from 'date-fns'
import { Minus, Plus } from 'lucide-react'

import type { Transaction } from '@/types/portfolio'
import { formatSignedMoney, formatAmount } from '@/utils/money'

import { signedAmount } from '../../utils/transactions'
import { StatusBadge } from './StatusBadge'


export function TransactionRow({ transaction }: { transaction: Transaction }) {
  const isBuy = transaction.type === 'BUY'
  const Icon = isBuy ? Plus : Minus
  // A failed order never moved money, so its amount is de-emphasised
  const failed = transaction.status === 'FAILED'

  return (
    <div className="flex items-center gap-3 rounded-xl border border-line p-4 transition-colors hover:border-primary/40">
      <div
        className={clsx(
          'grid size-9 shrink-0 place-items-center rounded-full',
          isBuy ? 'bg-primary-soft text-primary' : 'bg-fill text-ink-soft',
        )}
      >
        <Icon aria-hidden className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {isBuy ? 'Buy' : 'Sell'} {transaction.name}
        </p>
        <p className="mt-0.5 text-xs text-ink-faint">
          {format(parseISO(transaction.date), 'MMM d, yyyy')} ·{' '}
          {formatAmount(transaction.shares)} Share{transaction.shares === 1 ? '' : 's'}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p
          className={clsx(
            'text-sm font-semibold',
            failed
              ? 'text-ink-faint line-through'
              : isBuy
                ? 'text-ink'
                : 'text-ink',
          )}
        >
          {formatSignedMoney(signedAmount(transaction))}
        </p>
        <div className="mt-1">
          <StatusBadge status={transaction.status} />
        </div>
      </div>
    </div>
  )
}
