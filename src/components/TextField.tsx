import clsx from 'clsx'
import { useId } from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'

export interface TextFieldProps extends ComponentPropsWithRef<'input'> {
  label: string
  error?: string
  /** Rendered inside the input on the right. */
  trailing?: ReactNode
}

export function TextField({
  label,
  error,
  trailing,
  id,
  className,
  ...rest
}: TextFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const errorId = `${inputId}-error`

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-xs font-medium text-ink"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={clsx(
            'h-11 w-full rounded-xl border bg-fill px-3.5 text-sm text-ink transition-colors outline-none placeholder:text-ink-faint',
            trailing ? 'pr-11' : '',
            error
              ? 'border-loss focus:ring-2 focus:ring-loss/25'
              : 'border-transparent focus:border-primary focus:ring-2 focus:ring-primary/25',
          )}
          {...rest}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-1.5 flex items-center">
            {trailing}
          </div>
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-loss">
          {error}
        </p>
      )}
    </div>
  )
}
