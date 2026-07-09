/**
 * Chart-segment palette from the Trove v3 spec, mirrored from the tokens in
 * index.css because Recharts needs raw values. Order is fixed: hues are
 * assigned to sectors once (largest first) and never reshuffled by filters.
 */
export const CHART_SEGMENT_COLORS = [
  '#059a83', // primary
  '#7b79c9', // purple
  '#e0f5e1', // primary light
  '#00b6df', // accent blue
  '#f2c891', // cream
  '#00323d', // dark blue
] as const

export function chartColorAt(index: number): string {
  return CHART_SEGMENT_COLORS[index % CHART_SEGMENT_COLORS.length] ?? '#059a83'
}
