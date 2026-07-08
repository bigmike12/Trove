import { Bell, HelpCircle, Menu, Search } from 'lucide-react'

const iconButtonClasses =
  'cursor-pointer rounded-lg p-2 text-ink-soft transition-colors hover:bg-fill hover:text-ink focus-visible:outline-2 focus-visible:outline-primary'

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className={`${iconButtonClasses} lg:hidden`}
      >
        <Menu aria-hidden className="size-5" />
      </button>

      <div className="relative max-w-xs flex-1">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint"
        />
        <input
          type="search"
          placeholder="Search stocks, crypto…"
          aria-label="Search"
          className="h-9 w-full rounded-full border border-transparent bg-fill pl-9 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-primary focus:ring-2 focus:ring-primary/25"
        />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          aria-label="Notifications"
          className={iconButtonClasses}
        >
          <Bell aria-hidden className="size-4.5" />
        </button>
        <button type="button" aria-label="Help" className={iconButtonClasses}>
          <HelpCircle aria-hidden className="size-4.5" />
        </button>
      </div>
    </header>
  )
}
