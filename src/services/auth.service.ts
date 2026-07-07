import type { Session } from '@/types/auth'

import { fetchFromApi } from './fake-api'

export interface LoginCredentials {
  email: string
  password: string
}

const displayNameFromEmail = (email: string) => {
  const localPart = email.split('@')[0] ?? ''
  const words = localPart.replace(/[._-]+/g, ' ').trim()
  if (!words) return 'Trove Investor'
  return words.replace(/\b\w/g, (c) => c.toUpperCase())
}

export const authService = {
  // I am asked to simulate a login API call.
  login(credentials: LoginCredentials): Promise<Session> {
    return fetchFromApi({
      user: {
        name: displayNameFromEmail(credentials.email),
        email: credentials.email,
      },
      token: crypto.randomUUID(),
    })
  },
}
