import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'rounded-card border border-line shadow-md bg-surface p-5 sm:p-6',
        className,
      )}
      {...rest}
    />
  )
}
