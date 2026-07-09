import { Receipt } from 'lucide-react'
import { useMemo, useState } from 'react'

import { EmptyState } from '@/shared/ui/EmptyState'
import { FilterPills } from '@/shared/ui/FilterPills'
import type { Transaction } from '@/types/portfolio'

import {
  ALL_TYPES,
  filterTransactionsByType,
  sortTransactionsByDateDesc,
} from '../../utils/transactions'
import { TransactionRow } from './TransactionRow'
import { Card } from '@/shared/ui/Card'

const TYPE_OPTIONS = [ALL_TYPES, 'Buy', 'Sell']

export function TransactionsPanel({
  transactions,
}: {
  transactions: Transaction[]
}) {
  const [typeFilter, setTypeFilter] = useState(ALL_TYPES)

  const visible = useMemo(
    () =>
      sortTransactionsByDateDesc(
        filterTransactionsByType(transactions, typeFilter),
      ),
    [transactions, typeFilter],
  )

  return (
    <Card className="flex min-w-0 max-h-150 flex-col gap-4 self-start">
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-sm font-semibold">Recent Transactions</h2>
          <p className="text-xs hover:cursor-pointer hover:text-gain font-semibold text-primary">
            View All
          </p>
        </div>

        <FilterPills
          label="Filter by order type"
          options={TYPE_OPTIONS}
          selected={typeFilter}
          onSelect={setTypeFilter}
        />
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No orders found"
          description="There are no orders of this type yet."
        />
      ) : (
        <ul className="space-y-3 overflow-y-auto">
          {visible.map((transaction) => (
            <li key={transaction.id}>
              <TransactionRow transaction={transaction} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
