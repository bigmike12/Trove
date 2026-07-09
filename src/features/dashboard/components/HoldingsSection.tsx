import { useState } from 'react'

import { Card } from '@/shared/ui/Card'
import { Tabs } from '@/shared/ui/Tabs'
import type { Transaction } from '@/types/portfolio'
import type { HoldingPosition } from '@/utils/portfolio'

import { StocksTab } from './holdings/StocksTab'
import { OrdersTab } from './orders/OrdersTab'

const TABS = [
  { id: 'stocks', label: 'Stocks' },
  { id: 'orders', label: 'Orders' },
]

interface HoldingsSectionProps {
  positions: HoldingPosition[]
  transactions: Transaction[]
}

export function HoldingsSection({
  positions,
  transactions,
}: HoldingsSectionProps) {
  const [activeTab, setActiveTab] = useState('stocks')

  return (
    <Card>
      <Tabs tabs={TABS} activeId={activeTab} onChange={setActiveTab} />
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="mt-5"
      >
        {activeTab === 'stocks' ? (
          <StocksTab positions={positions} />
        ) : (
          <OrdersTab transactions={transactions} />
        )}
      </div>
    </Card>
  )
}
