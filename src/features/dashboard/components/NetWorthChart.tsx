import { format, parseISO } from 'date-fns'
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'

import type { NetWorthPoint } from '@/types/portfolio'
import { formatMoney } from '@/utils/money'

interface NetWorthChartProps {
  points: NetWorthPoint[]
  /** date-fns pattern for tooltip labels, range-dependent. */
  dateFormat: string
}

export function NetWorthChart({ points, dateFormat }: NetWorthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart
        data={points}
        margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="net-worth-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#059a83" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#059a83" stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis hide domain={['auto', 'auto']} />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: '1px solid #dbdfdf',
            fontSize: 12,
            padding: '8px 12px',
          }}
          itemStyle={{ color: '#13342f' }}
          labelStyle={{ color: '#687d7a', marginBottom: 4 }}
          formatter={(value) => [
            formatMoney(typeof value === 'number' ? value : 0),
            'Net worth',
          ]}
          labelFormatter={(_, payload) => {
            const iso = payload?.[0]?.payload?.date
            return typeof iso === 'string'
              ? format(parseISO(iso), dateFormat)
              : ''
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#059a83"
          strokeWidth={2}
          fill="url(#net-worth-fill)"
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
