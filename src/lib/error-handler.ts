import { AxiosError } from 'axios';
import { showToast } from '@/components/common/toast';

interface ApiErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export const handleApiError = (error: unknown, customMessage?: string) => {
  console.error('API Error:', error);

  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ApiErrorResponse;
    const status = error.response?.status;

    // Prioritize backend error message, then custom message, then fallback
    const backendMessage = errorData?.message || errorData?.error;
    const displayMessage = backendMessage || customMessage;

    // Handle different types of errors
    switch (status) {
      case 400:
        // Bad Request - show validation errors if available
        if (errorData?.errors) {
          const firstError = Object.values(errorData.errors)[0]?.[0];
          showToast.error({
            title: 'Validation Error',
            description: firstError || displayMessage || 'Invalid request data',
          });
        } else {
          showToast.error({
            title: 'Bad Request',
            description: displayMessage || 'Invalid request data',
          });
        }
        break;

      case 401:
        // Unauthorized - handled by axios interceptor, but show toast if needed
        showToast.error({
          title: 'Authentication Required',
          description: displayMessage || 'Please log in to continue',
        });
        break;

      case 403:
        // Forbidden
        showToast.error({
          title: 'Access Denied',
          description:
            displayMessage ||
            'You do not have permission to perform this action',
        });
        break;

      case 404:
        // Not Found
        showToast.error({
          title: 'Not Found',
          description: displayMessage || 'The requested resource was not found',
        });
        break;

      case 409:
        // Conflict
        showToast.error({
          title: 'Conflict',
          description:
            displayMessage || 'A conflict occurred with the current state',
        });
        break;

      case 422:
        // Unprocessable Entity - validation errors
        if (errorData?.errors) {
          const firstError = Object.values(errorData.errors)[0]?.[0];
          showToast.error({
            title: 'Validation Failed',
            description:
              firstError || displayMessage || 'Please check your input',
          });
        } else {
          showToast.error({
            title: 'Validation Failed',
            description: displayMessage || 'Please check your input',
          });
        }
        break;

      case 429:
        // Too Many Requests
        showToast.error({
          title: 'Rate Limited',
          description:
            displayMessage || 'Too many requests. Please try again later',
        });
        break;

      case 500:
        // Internal Server Error
        showToast.error({
          title: 'Server Error',
          description:
            displayMessage ||
            'An internal server error occurred. Please try again later',
        });
        break;

      case 502:
      case 503:
      case 504:
        // Bad Gateway, Service Unavailable, Gateway Timeout
        showToast.error({
          title: 'Service Unavailable',
          description:
            displayMessage ||
            'The service is temporarily unavailable. Please try again later',
        });
        break;

      default:
        // Generic error - prioritize backend message over custom message
        showToast.error({
          title: 'Request Failed',
          description: displayMessage || 'An unexpected error occurred',
        });
    }
  } else if (error instanceof Error) {
    // Network or other errors
    if (
      error.message.includes('Network Error') ||
      error.message.includes('timeout')
    ) {
      showToast.error({
        title: 'Connection Error',
        description: 'Please check your internet connection and try again',
      });
    } else {
      showToast.error({
        title: 'Error',
        description:
          customMessage || error.message || 'An unexpected error occurred',
      });
    }
  } else {
    // Unknown error
    showToast.error({
      title: 'Unknown Error',
      description: customMessage || 'An unexpected error occurred',
    });
  }
};

// Helper function to extract error message from API response
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ApiErrorResponse;

    // Prioritize backend message
    if (errorData?.message) {
      return errorData.message;
    }

    if (errorData?.error) {
      return errorData.error;
    }

    if (errorData?.errors) {
      const firstError = Object.values(errorData.errors)[0]?.[0];
      return firstError || 'Validation error occurred';
    }

    return error.message || 'An error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};
