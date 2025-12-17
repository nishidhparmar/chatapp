/**
 * COMPREHENSIVE ERROR HANDLING GUIDE
 *
 * This file demonstrates the proper way to handle errors throughout the application.
 * Follow these patterns for consistent error handling with toast notifications.
 */

import { useMutation, useQuery } from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { useAsyncErrorHandler } from '@/hooks/use-async-error-handler';
import axiosInstance from '@/lib/axios';

// ============================================================================
// 1. MUTATIONS - Automatic Error Handling (RECOMMENDED)
// ============================================================================

/**
 * ✅ BEST PRACTICE: Let mutations handle errors automatically
 * The mutation hooks already include error handling via useErrorHandler
 * No need to add onError unless you need custom behavior
 */
export const useSimpleMutation = () => {
  return useMutation({
    mutationFn: async data => {
      const response = await axiosInstance.post('/api/endpoint', data);
      return response.data;
    },
    // ✅ No onError needed - handled automatically by the mutation hook
    onSuccess: data => {
      // Handle success case
      console.log('Success:', data);
    },
  });
};

// ============================================================================
// 2. MUTATIONS - Custom Error Handling (When needed)
// ============================================================================

/**
 * ⚠️ ONLY when you need custom error behavior
 * Use this pattern when you need to do something specific on error
 * beyond showing a toast (like redirecting, resetting state, etc.)
 */
export const useCustomErrorMutation = () => {
  const { handleError } = useErrorHandler();

  return useMutation({
    mutationFn: async data => {
      const response = await axiosInstance.post('/api/endpoint', data);
      return response.data;
    },

    onError: error => {
      // Custom error handling FIRST
      // Reset form state, redirect, etc.

      // THEN call the error handler for toast
      handleError(error, 'Failed to complete this specific operation');
    },
  });
};

// ============================================================================
// 3. QUERIES - Silent Error Handling (RECOMMENDED)
// ============================================================================

/**
 * ✅ BEST PRACTICE: Let queries fail silently
 * Queries typically shouldn't show error toasts as they run automatically
 * and frequently. Handle errors in the UI instead.
 */
export const useSimpleQuery = () => {
  return useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/data');
      return response.data;
    },
    // ✅ No onError - let the UI handle loading/error states
  });
};

// ============================================================================
// 4. QUERIES - With Error Toast (When needed)
// ============================================================================

/**
 * ⚠️ ONLY when you need to show error toasts for queries
 * Use this when a query failure should notify the user
 */
export const useQueryWithErrorToast = () => {
  const { handleQueryError } = useQueryErrorHandler();

  return useQuery({
    queryKey: ['critical-data'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/critical-data');
      return response.data;
    },
  });
};

// ============================================================================
// 5. ASYNC EVENT HANDLERS - Error Handling
// ============================================================================

/**
 * ✅ BEST PRACTICE: Use useAsyncErrorHandler for async event handlers
 * This handles errors in onClick, onSubmit, and other async handlers
 */
export const ComponentWithAsyncHandlers = () => {
  const { wrapAsyncHandler } = useAsyncErrorHandler();

  const handleAsyncClick = wrapAsyncHandler(async () => {
    // This async operation will automatically show error toast if it fails
    const response = await axiosInstance.post('/api/action');
    console.log('Success:', response.data);
  }, 'Failed to perform action');

  const handleFormSubmit = wrapAsyncHandler(async (formData: FormData) => {
    // Form submission with automatic error handling
    await axiosInstance.post('/api/submit', formData);
  }, 'Failed to submit form');

  return (
    <div>
      <button onClick={handleAsyncClick}>Async Action</button>
      <form
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleFormSubmit(formData);
        }}
      >
        {/* form fields */}
      </form>
    </div>
  );
};

// ============================================================================
// 6. COMPONENT ERROR BOUNDARIES
// ============================================================================

/**
 * ✅ BEST PRACTICE: Wrap components with ErrorBoundary
 * This catches any unhandled errors and shows a fallback UI
 */
// import ErrorBoundary from './error-boundary';

// export const SafeComponent = () => {
//   return (
//     <ErrorBoundary>
//       <YourComponent />
//     </ErrorBoundary>
//   );
// };

// ============================================================================
// 7. MANUAL ERROR HANDLING (Rare cases)
// ============================================================================

/**
 * ⚠️ ONLY when you need full manual control
 * Use this pattern sparingly, prefer the automatic approaches above
 */
export const ManualErrorHandling = () => {
  const { handleError, getError } = useErrorHandler();

  const handleManualOperation = async () => {
    try {
      const response = await axiosInstance.post('/api/manual');
      // Handle success
    } catch (error) {
      // Get error message without showing toast
      const errorMessage = getError(error);
      console.log('Error message:', errorMessage);

      // Or show toast with custom message
      handleError(error, 'Custom error message for this operation');
    }
  };

  return <button onClick={handleManualOperation}>Manual Operation</button>;
};

// ============================================================================
// ERROR HANDLING PRIORITY
// ============================================================================

/**
 * Error message priority (highest to lowest):
 * 1. Backend error message (from API response)
 * 2. Custom message (passed to handleError)
 * 3. Default fallback message
 *
 * This ensures users always see the most relevant error message.
 */

// ============================================================================
// SUMMARY - WHAT TO USE WHEN
// ============================================================================

/**
 * ✅ Mutations: Use the mutation hooks as-is (they handle errors automatically)
 * ✅ Queries: Let them fail silently, handle in UI
 * ✅ Async handlers: Use useAsyncErrorHandler.wrapAsyncHandler
 * ✅ Components: Wrap with ErrorBoundary
 * ⚠️ Custom behavior: Add onError to mutations/queries only when needed
 * ⚠️ Manual control: Use useErrorHandler directly only in rare cases
 */
