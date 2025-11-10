'use client'
import { Component, type ReactNode } from 'react'

/**
 * Props for the ErrorBoundary component.
 * @typedef {object} Props
 * @property {ReactNode} children - The child components to render within the boundary.
 * @property {ReactNode} [fallback] - An optional fallback UI to render when an error is caught.
 */
type Props = {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * State for the ErrorBoundary component.
 * @typedef {object} State
 * @property {boolean} hasError - Indicates if an error has been caught.
 * @property {Error} [error] - The caught error instance.
 */
type State = {
  hasError: boolean
  error?: Error
}

/**
 * A React component that catches JavaScript errors in its child component tree.
 *
 * This component logs the errors and displays a fallback UI instead of the
 * component tree that crashed. It can be configured with a custom fallback
 * component, or it will render a default error screen.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
          <div className="glass rounded-2xl p-8 text-center max-w-md">
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-muted mb-4">
              An error occurred while rendering this component.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="button-primary"
            >
              Try Again
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-xs text-muted cursor-pointer">
                  Error details (dev only)
                </summary>
                <pre className="mt-2 text-xs text-err bg-surface/50 p-3 rounded overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
