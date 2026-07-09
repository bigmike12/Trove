
import { Badge, type BadgeTone } from '@/shared/ui/Badge';
import type { TransactionStatus } from '@/types/portfolio'

const statusConfig: Record<
  TransactionStatus,
  { label: string; tone: BadgeTone }
> = {
  COMPLETED: { label: 'Completed', tone: 'success' },
  PENDING: { label: 'Pending', tone: 'warning' },
  FAILED: { label: 'Failed', tone: 'danger' },
}

export function StatusBadge({ status }: { status: TransactionStatus }) {
  const { label, tone } = statusConfig[status]
  return <Badge tone={tone}>{label}</Badge>
}
