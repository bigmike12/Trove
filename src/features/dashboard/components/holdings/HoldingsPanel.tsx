import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'
import { FilterPills } from '@/shared/ui/FilterPills'
import { Card } from '@/shared/ui/Card'

import type { HoldingPosition } from '@/utils/portfolio'

import {
  ALL_SECTORS,
  filterHoldings,
  sortHoldingsForDisplay,
} from '../../utils/filter-holdings'
import { HoldingCard } from './HoldingCard'

const SEARCH_DEBOUNCE_MS = 250

export function HoldingsPanel({ positions }: { positions: HoldingPosition[] }) {
  const [query, setQuery] = useState('')
  const [sector, setSector] = useState(ALL_SECTORS)
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS)

  const sectors = useMemo(
    () => [ALL_SECTORS, ...new Set(positions.map((p) => p.sector))],
    [positions],
  )

  const visible = useMemo(
    () =>
      sortHoldingsForDisplay(filterHoldings(positions, debouncedQuery, sector)),
    [positions, debouncedQuery, sector],
  )

  const hasActiveFilters = query !== '' || sector !== ALL_SECTORS

  const clearFilters = () => {
    setQuery('')
    setSector(ALL_SECTORS)
  }

  return (
    <Card className="flex min-w-0 max-h-150 flex-col gap-4">
      <div>
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold">Holdings</h2>
          <p className="text-xs hover:cursor-pointer hover:text-gain font-semibold text-primary">
            View All
          </p>
        </div>

        <div className="relative my-3">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-faint"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by ticker or company name"
            aria-label="Search holdings"
            className="h-10 w-full rounded-xl border border-transparent bg-fill pr-4 pl-10 text-sm text-ink transition-colors outline-none placeholder:text-ink-faint focus:border-primary focus:ring-2 focus:ring-primary/25"
          />
        </div>

        <FilterPills
          label="Filter by sector"
          options={sectors}
          selected={sector}
          onSelect={setSector}
        />
      </div>

      {visible.length === 0 ? (
        <EmptyState
          title="No holdings found"
          description="Nothing matches your current search and filters."
          action={
            hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            )
          }
        />
      ) : (
        <ul className="space-y-3 overflow-y-auto">
          {visible.map((position) => (
            <li key={position.id}>
              <HoldingCard position={position} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
