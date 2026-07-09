import type { HistoryRange, NetWorthPoint } from '@/types/portfolio'

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

const RANGE_CONFIG = {
  '1D': { points: 24, step: HOUR },
  '1W': { points: 7, step: DAY },
  '1M': { points: 30, step: DAY },
  ALL: { points: 24, step: 30 * DAY },
} satisfies Record<
  HistoryRange,
  {
    points: number
    step: number
  }
>

/**
 * Generates a simple net worth history since the dataset
 * doesn't include historical portfolio values.
 */
export function generateNetWorthHistory(
  currentValue: number,
  lastUpdated: string,
  range: HistoryRange,
): NetWorthPoint[] {
  const { points, step } = RANGE_CONFIG[range]
  const endDate = new Date(lastUpdated).getTime()

  const history: NetWorthPoint[] = []

  let value = currentValue * 0.9

  for (let i = 0; i < points; i++) {
    // Small random movement
    value += (Math.random() - 0.5) * currentValue * 0.01

    // Make sure the last point always matches today's value
    if (i === points - 1) {
      value = currentValue
    }

    history.push({
      date: new Date(endDate - (points - 1 - i) * step).toISOString(),
      value: Number(value.toFixed(2)),
    })
  }

  return history
}