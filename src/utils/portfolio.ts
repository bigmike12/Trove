import type { Holding } from '@/types/portfolio'

/**
 * A holding enriched with everything the UI needs to render it. This is the
 * single place the dataset's known quirks are decided:
 *
 * - currentPrice <= 0 (NVDA): the price feed is down, not a worthless stock.
 *   The position is valued at cost so net worth stays meaningful, and its
 *   gain is `null` (unknowable) rather than a misleading 0 or -100%.
 * - shares === 0 (DIS): a closed position. It contributes nothing to totals
 *   or allocation but is still listed, greyed out, for history.
 */
export interface HoldingPosition extends Holding {
  hasKnownPrice: boolean
  isClosed: boolean
  costBasis: number
  /** Market value when the price is known, cost basis otherwise. */
  marketValue: number
  gain: number | null
  gainPercent: number | null
}

export function toPosition(holding: Holding): HoldingPosition {
  const hasKnownPrice = holding.currentPrice > 0
  const isClosed = holding.shares <= 0
  const costBasis = holding.shares * holding.avgCost
// In the case of NVDA where there is no current price
  const marketValue = hasKnownPrice
    ? holding.shares * holding.currentPrice
    : costBasis
  const gain = hasKnownPrice ? marketValue - costBasis : null
  const gainPercent =
    gain !== null && costBasis > 0 ? (gain / costBasis) * 100 : null

  return {
    ...holding,
    hasKnownPrice,
    isClosed,
    costBasis,
    marketValue,
    gain,
    gainPercent,
  }
}

export interface PortfolioTotals {
  netWorth: number
  totalCost: number
  totalGain: number
  /** Gain relative to the cost of positions whose price is known. */
  totalGainPercent: number | null
  /** Open positions valued at cost because their price is unavailable. */
  positionsValuedAtCost: number
}

const sum = (values: number[]) => values.reduce((total, v) => total + v, 0)

export function computeTotals(positions: HoldingPosition[]): PortfolioTotals {
  const open = positions.filter((p) => !p.isClosed)
  const priced = open.filter((p) => p.hasKnownPrice)
  const pricedCost = sum(priced.map((p) => p.costBasis))
  const totalGain = sum(priced.map((p) => p.gain ?? 0))

  return {
    netWorth: sum(open.map((p) => p.marketValue)),
    totalCost: sum(open.map((p) => p.costBasis)),
    totalGain,
    totalGainPercent: pricedCost > 0 ? (totalGain / pricedCost) * 100 : null,
    positionsValuedAtCost: open.length - priced.length,
  }
}

export interface SectorGroup {
  sector: string
  positions: number
  value: number
  /** Fraction of net worth, 0..1. */
  share: number
}

export function groupBySector(positions: HoldingPosition[]): SectorGroup[] {
  const open = positions.filter((p) => !p.isClosed)
  const total = sum(open.map((p) => p.marketValue))

  const bySector = new Map<string, { positions: number; value: number }>()
  for (const position of open) {
    const group = bySector.get(position.sector) ?? { positions: 0, value: 0 }
    group.positions += 1
    group.value += position.marketValue
    bySector.set(position.sector, group)
  }

  return [...bySector.entries()]
    .map(([sector, group]) => ({
      sector,
      positions: group.positions,
      value: group.value,
      share: total > 0 ? group.value / total : 0,
    }))
    .sort((a, b) => b.value - a.value)
}
