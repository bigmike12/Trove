import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { authService, type LoginCredentials } from '@/services/auth.service'

import { AuthContext } from './auth-context'
import {
  clearStoredSession,
  readStoredsession,
  storeSession,
} from './utils/session-storage'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Lazy initializer: restores a persisted session once, before first paint,
  // so a signed-in user never flashes the login screen on refresh.
  const [session, setSession] = useState(readStoredsession)

  const login = useCallback(async (credentials: LoginCredentials) => {
    const next = await authService.login(credentials)
    setSession(next)
    storeSession(next)
  }, [])

  const logout = useCallback(() => {
    setSession(null)
    clearStoredSession()
  }, [])

  const value = useMemo(
    () => ({
      session,
      login,
      logout,
    }),
    [session, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
