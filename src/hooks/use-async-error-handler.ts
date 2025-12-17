import { useCallback } from 'react';
import { useErrorHandler } from './use-error-handler';

/**
 * Hook for handling errors in async operations (like event handlers)
 * Use this when you need to handle errors in async functions that aren't mutations or queries
 */
export const useAsyncErrorHandler = () => {
  const { handleError } = useErrorHandler();

  const handleAsyncError = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      customMessage?: string
    ): Promise<T | null> => {
      try {
        return await asyncFn();
      } catch (error) {
        handleError(error, customMessage);
        return null;
      }
    },
    [handleError]
  );

  const wrapAsyncHandler = useCallback(
    <T extends any[]>(
      handler: (...args: T) => Promise<void>,
      customMessage?: string
    ) => {
      return async (...args: T) => {
        try {
          await handler(...args);
        } catch (error) {
          handleError(error, customMessage);
        }
      };
    },
    [handleError]
  );

  return {
    handleAsyncError,
    wrapAsyncHandler,
  };
};
