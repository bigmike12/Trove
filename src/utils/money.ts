const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatMoney(value: number): string {
  return usd.format(value)
}

export const formatAmount = (value: number): string => value.toFixed(2)

/** "+$450.20" / "-$161.00" — explicit sign for gains and losses. */
export function formatSignedMoney(value: number): string {
  const sign = value < 0 ? '-' : '+'
  return `${sign}${usd.format(Math.abs(value))}`
}

/** "+6.1%" / "-6.1%" with one decimal place. */
export function formatSignedPercent(value: number): string {
  const sign = value < 0 ? '-' : '+'
  return `${sign}${Math.abs(value).toFixed(1)}%`
}

/** "45%" for allocation legends, from a 0..1 fraction. */
export function formatShareOfTotal(fraction: number): string {
  return `${Math.round(fraction * 100)}%`
}
