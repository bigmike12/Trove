import { useState } from 'react'

import type { HoldingPosition } from '@/utils/portfolio'

import { StocksTab } from './holdings/StocksTab'
import { Card } from '@/shared/ui/Card'
import { Tabs } from '@/shared/ui/Tabs'

const TABS = [
  { id: 'stocks', label: 'Stocks' },
  { id: 'orders', label: 'Orders' },
]

export function HoldingsSection({
  positions,
}: {
  positions: HoldingPosition[]
}) {
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
          <p className="py-8 text-center text-sm text-ink-faint">
            Order history is coming soon.
          </p>
        )}
      </div>
    </Card>
  )
}
