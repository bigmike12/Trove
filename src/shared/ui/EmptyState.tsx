import { SearchX } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({
  icon: Icon = SearchX,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <Icon aria-hidden className="size-7 text-ink-faint" />
      <p className="mt-3 text-sm font-medium text-ink">{title}</p>
      {description && (
        <p className="mt-1 max-w-xs text-xs text-ink-soft">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
