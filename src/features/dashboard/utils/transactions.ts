import type { Transaction } from '@/types/portfolio'

export const ALL_TYPES = 'All'

export function filterTransactionsByType(
  transactions: Transaction[],
  type: string,
): Transaction[] {
  if (type === ALL_TYPES) return transactions
  const wanted = type.toUpperCase()
  return transactions.filter((transaction) => transaction.type === wanted)
}

export function sortTransactionsByDateDesc(
  transactions: Transaction[],
): Transaction[] {
  return [...transactions].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  )
}

/** Buys are cash out (negative), sells are cash in (positive). */
export function signedAmount(transaction: Transaction): number {
  return transaction.type === 'BUY'
    ? -transaction.totalAmount
    : transaction.totalAmount
}
