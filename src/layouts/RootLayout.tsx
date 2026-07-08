import { Outlet } from 'react-router-dom'

/** Top-level layout every route renders inside. */
export function RootLayout() {
  return (
    <div className="min-h-dvh">
      <Outlet />
    </div>
  )
}
