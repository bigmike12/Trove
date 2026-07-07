import {createContext} from 'react'

import type { LoginCredentials } from '@/services/auth.service'
import type { Session } from '@/types/auth'

export interface AuthContextValue {
  session: Session | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)