import { Component, type ReactNode } from 'react';
import { logger } from '../utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 *
 * Catches React errors and displays a user-friendly fallback UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    logger.error('🚨 [ErrorBoundary] Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
          <div className="max-w-md p-8 bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-red-500/50 shadow-lg shadow-red-500/20">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-3xl font-bold text-red-400">Something Went Wrong</h2>
              <p className="text-gray-400">
                NEONSYNC encountered an unexpected error. Please refresh the page to try again.
              </p>
              {this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-300">
                    Technical Details
                  </summary>
                  <pre className="mt-2 p-4 bg-black/40 rounded text-xs text-red-300 overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-3 bg-cyan-400 text-black font-bold rounded hover:bg-cyan-300 transition-colors"
              >
                Reload App
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
