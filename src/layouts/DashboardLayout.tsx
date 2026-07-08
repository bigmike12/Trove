import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[16rem_1fr]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:outline-2 focus:outline-primary"
      >
        Skip to content
      </a>
      <aside className="hidden border-r border-line bg-surface lg:block">
        <div className="sticky top-0 h-dvh">
          <Sidebar />
        </div>
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="absolute inset-0 cursor-pointer bg-navy/40"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-surface shadow-xl">
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="absolute top-5 right-4 cursor-pointer rounded-lg p-2 text-ink-soft hover:bg-fill focus-visible:outline-2 focus-visible:outline-primary"
            >
              <X aria-hidden className="size-5" />
            </button>
            <Sidebar onNavigate={closeMenu} />
          </div>
        </div>
      )}

      <div className="flex h-dvh min-w-0 flex-col overflow-hidden">
        <Topbar onMenuClick={() => setMenuOpen(true)} />

        <main
          id="main"
          className="mx-auto w-full max-w-6xl flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
