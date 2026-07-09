import { Receipt } from 'lucide-react'
import { useMemo, useState } from 'react'

import type { Transaction } from '@/types/portfolio'

import {
  ALL_TYPES,
  filterTransactionsByType,
  sortTransactionsByDateDesc,
} from '../../utils/transactions'
import { TransactionRow } from './TransactionRow'
import { FilterPills } from '@/shared/ui/FilterPills'
import { EmptyState } from '@/shared/ui/EmptyState'

const TYPE_OPTIONS = [ALL_TYPES, 'Buy', 'Sell']

export function OrdersTab({ transactions }: { transactions: Transaction[] }) {
  const [typeFilter, setTypeFilter] = useState(ALL_TYPES)

  const visible = useMemo(
    () =>
      sortTransactionsByDateDesc(
        filterTransactionsByType(transactions, typeFilter),
      ),
    [transactions, typeFilter],
  )

  return (
    <div className="space-y-4">
      <FilterPills
        label="Filter by order type"
        options={TYPE_OPTIONS}
        selected={typeFilter}
        onSelect={setTypeFilter}
      />

      {visible.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No orders found"
          description="There are no orders of this type yet."
        />
      ) : (
        <ul className="space-y-3">
          {visible.map((transaction) => (
            <li key={transaction.id}>
              <TransactionRow transaction={transaction} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
