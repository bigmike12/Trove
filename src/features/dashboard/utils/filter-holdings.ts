import type { HoldingPosition } from '@/utils/portfolio'

export const ALL_SECTORS = 'All'

export function filterHoldings(
  positions: HoldingPosition[],
  query: string,
  sector: string,
): HoldingPosition[] {
  const needle = query.trim().toLowerCase()

  return positions.filter((position) => {
    const matchesSector = sector === ALL_SECTORS || position.sector === sector
    const matchesQuery =
      needle === '' ||
      position.ticker.toLowerCase().includes(needle) ||
      position.name.toLowerCase().includes(needle)
    return matchesSector && matchesQuery
  })
}

/** Open positions by size, closed ones at the end. */
export function sortHoldingsForDisplay(
  positions: HoldingPosition[],
): HoldingPosition[] {
  return [...positions].sort((a, b) => {
    if (a.isClosed !== b.isClosed) return a.isClosed ? 1 : -1
    return b.marketValue - a.marketValue
  })
}
