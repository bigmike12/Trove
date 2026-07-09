import { CircleAlert } from 'lucide-react'

import { Button } from '@/shared/ui/Button'
import { Card } from './ui/Card'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <Card role="alert" className="flex flex-col items-center py-10 text-center">
      <CircleAlert aria-hidden className="size-8 text-loss" />
      <h2 className="mt-3 text-base font-semibold">{title}</h2>
      <p className="mt-1 max-w-sm text-sm text-ink-soft">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-5">
          Try again
        </Button>
      )}
    </Card>
  )
}
