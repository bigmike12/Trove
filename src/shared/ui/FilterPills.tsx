import clsx from 'clsx'

interface FilterPillsProps {
  /** Accessible name for the pill group, e.g. "Filter by sector". */
  label: string
  options: string[]
  selected: string
  onSelect: (option: string) => void
}

export function FilterPills({
  label,
  options,
  selected,
  onSelect,
}: FilterPillsProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex gap-2 overflow-x-auto pb-1"
    >
      {options.map((option) => {
        const isSelected = option === selected
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(option)}
            className={clsx(
              'shrink-0 cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
              'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
              isSelected
                ? 'border-primary bg-primary text-white'
                : 'border-line bg-surface text-ink-soft hover:border-ink-faint hover:text-ink',
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
