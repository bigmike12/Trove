import clsx from 'clsx'
import {
  LayoutGrid,
  LogOut,
  Receipt,
  Settings,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/features/auth'
import { Button } from '@/shared/ui/Button'

interface NavItem {
  label: string
  icon: LucideIcon
  /** Only the dashboard exists in this assessment build. */
  to?: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: LayoutGrid, to: ROUTES.dashboard },
  { label: 'Portfolio', icon: Wallet },
  { label: 'Transactions', icon: Receipt },
  { label: 'Markets', icon: TrendingUp },
  { label: 'Settings', icon: Settings },
]

function initialsOf(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { session, logout } = useAuth()
  const userName = session?.user.name ?? 'Investor'

  return (
    <div className="flex h-full bg-canvas flex-col">
      <div className="flex items-center gap-2 px-6 pt-6 pb-8">
        <div className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-white">
          T
        </div>
        <span className="text-lg font-semibold text-ink">Trove</span>
      </div>

      <nav aria-label="Main" className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) =>
          to ? (
            <NavLink
              key={label}
              to={to}
              onClick={onNavigate}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-primary',
                  isActive
                    ? 'bg-primary-soft/60 text-primary'
                    : 'text-ink-soft hover:bg-fill hover:text-ink',
                )
              }
            >
              <Icon aria-hidden className="size-4.5" />
              {label}
            </NavLink>
          ) : (
            <span
              key={label}
              title="Not part of this demo"
              className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-faint"
            >
              <Icon aria-hidden className="size-4.5" />
              {label}
            </span>
          ),
        )}
      </nav>

      <div className="border-t border-line px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
            {initialsOf(userName)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{userName}</p>
            <p className="text-xs text-ink-faint">Premium Member</p>
          </div>
          <button
            type="button"
            onClick={logout}
            aria-label="Sign out"
            title="Sign out"
            className="cursor-pointer rounded-lg p-2 text-ink-faint transition-colors hover:bg-fill hover:text-loss focus-visible:outline-2 focus-visible:outline-primary"
          >
            <LogOut aria-hidden className="size-4" />
          </button>
        </div>
        <Button type="button" className="mt-4 w-full">
          Add funds
        </Button>
      </div>
    </div>
  )
}
