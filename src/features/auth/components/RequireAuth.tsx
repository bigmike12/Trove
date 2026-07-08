import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'

import { useAuth } from '../hooks/useAuth'

/** Route guard: kicks signed-out visitors to the login page and remembers
 *  where they were headed so GuestRoute can send them back after sign-in. */
export function RequireAuth() {
  const { session } = useAuth()
  const location = useLocation()

  if (!session) {
    return (
      <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />
    )
  }

  return <Outlet />
}
