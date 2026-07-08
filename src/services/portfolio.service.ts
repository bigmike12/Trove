import portfolioData from '@/data/portfolio_data.json'
import type { Portfolio } from '@/types/portfolio'

import { fetchFromApi } from './fake-api'

const database = portfolioData as Portfolio

export const portfolioService = {
  getPortfolio(): Promise<Portfolio> {
    return fetchFromApi(database)
  },
}
