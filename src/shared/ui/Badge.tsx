import clsx from 'clsx'
import type { ReactNode } from 'react'

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger'

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-fill text-ink-soft',
  success: 'bg-primary-soft text-ink font-semibold',
  warning: 'bg-chart-cream/50 text-ink-soft font-semibold',
  danger: 'bg-loss/10 text-loss font-semibold',
}

export function Badge({
  tone = 'neutral',
  children,
}: {
  tone?: BadgeTone
  children: ReactNode
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap',
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  )
}
