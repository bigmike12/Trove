import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

import { Button } from './ui/Button'

interface ErrorBoundaryState {
  hasError: boolean
}

/** Last line of defence: catches render errors anywhere in the tree so users
 *  get a recovery path instead of a white screen. */
export class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production this would go to an error tracker (Sentry & co.)
    console.error('Unhandled render error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-dvh place-items-center bg-canvas px-4">
          <div className="max-w-sm text-center">
            <h1 className="text-lg font-semibold">Something went wrong</h1>
            <p className="mt-2 text-sm text-ink-soft">
              An unexpected error occurred. Reloading usually fixes it — your
              data is safe.
            </p>
            <Button onClick={() => window.location.reload()} className="mt-5">
              Reload page
            </Button>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
