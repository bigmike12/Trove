import portfolioData from '@/data/portfolio_data.json'
import type { HistoryRange, NetWorthPoint, Portfolio } from '@/types/portfolio'
import { computeTotals, toPosition } from '@/utils/portfolio'

import { fetchFromApi } from './fake-api'
import { generateNetWorthHistory } from './net-worth-history'

// Single cast at the API boundary: the JSON is a trusted local fixture, so
// runtime validation (zod) would be ceremony here. With a real backend this
// is where the response would be parsed and validated instead.
const database = portfolioData as Portfolio

export const portfolioService = {
  getPortfolio(): Promise<Portfolio> {
    return fetchFromApi(database)
  },

  // Simulated: the dataset has no time-series, so the series is fabricated
  // (deterministically) but anchored to the real computed net worth
  getNetWorthHistory(range: HistoryRange): Promise<NetWorthPoint[]> {
    const { netWorth } = computeTotals(database.holdings.map(toPosition))
    return fetchFromApi(
      generateNetWorthHistory(netWorth, database.user.lastUpdated, range),
    )
  },
}
