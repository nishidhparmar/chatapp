import { useCallback } from 'react';
import { handleApiError } from '@/lib/error-handler';

/**
 * Hook for handling query errors when you want to show toast notifications
 * Use this in components where you want to display error messages for failed queries
 */
export const useQueryErrorHandler = () => {
  const handleQueryError = useCallback(
    (error: unknown, customMessage?: string) => {
      // Only handle errors that are not cancellation errors
      if (
        error &&
        typeof error === 'object' &&
        'name' in error &&
        error.name === 'CanceledError'
      ) {
        return; // Don't show toast for cancelled requests
      }

      handleApiError(error, customMessage);
    },
    []
  );

  return {
    handleQueryError,
  };
};
