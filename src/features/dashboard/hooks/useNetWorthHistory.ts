import { useQuery } from '@tanstack/react-query'

import { portfolioService } from '@/services/portfolio.service'
import type { HistoryRange } from '@/types/portfolio'

export function useNetWorthHistory(range: HistoryRange) {
  return useQuery({
    queryKey: ['net-worth-history', range],
    queryFn: () => portfolioService.getNetWorthHistory(range),
  })
}
