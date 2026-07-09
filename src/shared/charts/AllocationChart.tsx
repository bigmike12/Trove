import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export interface AllocationSegment {
  id: string
  label: string
  value: number
  color: string
}

interface AllocationChartProps {
  segments: AllocationSegment[]
  formatValue: (value: number) => string
  /** Formats a 0..1 fraction for the legend, e.g. 0.45 -> "45%". */
  formatShare: (fraction: number) => string
}

/**
 * Horizontal stacked bar with a legend beneath it. Deliberately knows nothing
 * about portfolios: callers map their domain onto generic segments.
 */
export function AllocationChart({
  segments,
  formatValue,
  formatShare,
}: AllocationChartProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)

  if (segments.length === 0 || total <= 0) {
    return <p className="text-sm text-ink-faint">Nothing to show yet.</p>
  }

  const row: Record<string, number | string> = { __label: '' }
  for (const segment of segments) {
    row[segment.id] = segment.value
  }

  // Round only the outer ends of the stack; radius order is [tl, tr, br, bl]
  const radiusFor = (index: number): [number, number, number, number] => {
    const first = index === 0
    const last = index === segments.length - 1
    return [first ? 6 : 0, last ? 6 : 0, last ? 6 : 0, first ? 6 : 0]
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={36}>
        <BarChart
          data={[row]}
          layout="vertical"
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="__label" hide />
          <Tooltip
            shared={false}
            cursor={{ fill: 'transparent' }}
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #dbdfdf',
              fontSize: 12,
              padding: '8px 12px',
            }}
            itemStyle={{ color: '#13342f' }}
            formatter={(value, name) => {
              const numeric = typeof value === 'number' ? value : 0
              const label = `${formatValue(numeric)} · ${formatShare(numeric / total)}`
              return [label, name]
            }}
          />
          {segments.map((segment, index) => (
            <Bar
              key={segment.id}
              dataKey={segment.id}
              name={segment.label}
              stackId="allocation"
              barSize={16}
              fill={segment.color}
              stroke="#ffffff"
              strokeWidth={2}
              radius={radiusFor(index)}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2.5">
        {segments.map((segment) => (
          <li key={segment.id} className="flex items-center gap-2 text-xs">
            <span
              aria-hidden
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="truncate text-ink-soft">{segment.label}</span>
            <span className="ml-auto font-semibold text-ink">
              {formatShare(segment.value / total)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
