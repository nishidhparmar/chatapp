// Examples of how to use the new error handling system

import { useMutation } from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { showToast } from './toast';
import axiosInstance from '@/lib/axios';

// Example 1: Automatic error handling (recommended for most cases)
// Errors are automatically handled by axios interceptor - no onError needed
export const useSimpleMutation = () => {
  return useMutation({
    mutationFn: async data => {
      const response = await axiosInstance.post('/api/endpoint', data);
      return response.data;
    },
    onSuccess: () => {
      showToast.success({
        title: 'Success',
        description: 'Operation completed successfully',
      });
    },
  });
};

// Example 2: Custom error handling for specific cases
export const useCustomErrorMutation = () => {
  const { handleError } = useErrorHandler();

  return useMutation({
    mutationFn: async data => {
      const response = await axiosInstance.post('/api/endpoint', data);
      return response.data;
    },
    onSuccess: () => {
      showToast.success({
        title: 'Success',
        description: 'Operation completed successfully',
      });
    },
    onError: error => {
      handleError(error, 'Failed to complete this specific operation');
    },
  });
};

// Example 3: Silent error handling (no toast, just logging)
export const useSilentMutation = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post('/api/endpoint', data);
      return response.data;
    },
    onError: error => {
      // Just log the error, don't show toast
      console.error('Silent error:', error);
      // The global handler won't run because we have a local onError
    },
  });
};

// Example 4: Component-level error handling

// Example 5: Validation error handling
export const useFormMutation = () => {
  return useMutation({
    mutationFn: async formData => {
      const response = await axiosInstance.post('/api/form', formData);
      return response.data;
    },
    onSuccess: () => {
      showToast.success({
        title: 'Form submitted',
        description: 'Your form has been submitted successfully',
      });
    },
    // Validation errors (400, 422) are automatically handled and will show
    // the specific validation messages from the API
  });
};
