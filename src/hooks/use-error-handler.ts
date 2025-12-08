import { useCallback } from 'react';
import { handleApiError, getErrorMessage } from '@/lib/error-handler';

export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown, customMessage?: string) => {
    handleApiError(error, customMessage);
  }, []);

  const getError = useCallback((error: unknown): string => {
    return getErrorMessage(error);
  }, []);

  return {
    handleError,
    getError,
  };
};
