import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'

import { useAuth } from '../hooks/useAuth'

function redirectPathFrom(state: unknown): string {
  if (
    state !== null &&
    typeof state === 'object' &&
    'from' in state &&
    typeof state.from === 'string'
  ) {
    return state.from
  }
  return ROUTES.dashboard
}

/** Route guard for pages that only make sense signed out (login).
 *  Once a session exists it redirects — which is also what completes the
 *  login flow, so the form itself never needs to navigate. */
export function GuestRoute() {
  const { session } = useAuth()
  const location = useLocation()

  if (session) {
    return <Navigate to={redirectPathFrom(location.state)} replace />
  }

  return <Outlet />
}
 