import type { Session } from '@/types/auth'

const SESSION_STORAGE_KEY = 'trove-session'

export const readStoredsession = (): Session | null => {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export const storeSession = (session: Session): void => {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
}

export const clearStoredSession = (): void => {
  localStorage.removeItem(SESSION_STORAGE_KEY)
}
