'use client';

import React from 'react';
import { showToast } from './toast';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Show toast notification for unhandled errors
    showToast.error({
      title: 'Something went wrong',
      description:
        'An unexpected error occurred. Please refresh the page and try again.',
      duration: 6000,
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error!}
            resetError={this.resetError}
          />
        );
      }

      // Default fallback UI
      return (
        <div className='flex items-center justify-center min-h-[200px] p-6'>
          <div className='text-center'>
            <h2 className='text-lg font-semibold text-neutral-ct-primary mb-2'>
              Something went wrong
            </h2>
            <p className='text-sm text-neutral-ct-secondary mb-4'>
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={this.resetError}
              className='px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors'
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
