import clsx from 'clsx'
import type { KeyboardEvent } from 'react'

export interface TabDef {
  id: string
  label: string
}

interface TabsProps {
  tabs: TabDef[]
  activeId: string
  onChange: (id: string) => void
  className?: string
}

/**
 * Tab bar only — callers render the matching panel with role="tabpanel",
 * id={`panel-${id}`} and aria-labelledby={`tab-${id}`}.
 */
export function Tabs({ tabs, activeId, onChange, className }: TabsProps) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const index = tabs.findIndex((tab) => tab.id === activeId)
    const delta = event.key === 'ArrowRight' ? 1 : -1
    const next = tabs[(index + delta + tabs.length) % tabs.length]
    if (next) {
      onChange(next.id)
      document.getElementById(`tab-${next.id}`)?.focus()
    }
  }

  return (
    <div
      role="tablist"
      onKeyDown={onKeyDown}
      className={clsx('inline-flex gap-1 rounded-xl bg-fill p-1', className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'cursor-pointer rounded-lg px-4 py-1.5 text-sm font-medium transition-colors',
              'focus-visible:outline-2 focus-visible:outline-primary',
              isActive
                ? 'bg-surface text-ink shadow-sm'
                : 'text-ink-soft hover:text-ink',
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
