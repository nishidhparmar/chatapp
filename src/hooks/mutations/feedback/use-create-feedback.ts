import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { CreateFeedbackPayload } from '@/types/feedback';
import { showToast } from '@/components/common/toast';

export function useCreateFeedback() {
  return useMutation({
    mutationFn: async (payload: CreateFeedbackPayload) => {
      const response = await axiosInstance.post('/api/v1/feedback', payload);
      return response.data;
    },
    onSuccess: () => {
      showToast.success({
        title: 'Feedback submitted',
        description: 'Thank you for your feedback! We appreciate your input.',
      });
    },
    onError: (error: unknown) => {
      console.error('Create feedback error:', error);
      showToast.error({
        title: 'Failed to submit feedback',
        description:
          'There was an error submitting your feedback. Please try again.',
      });
    },
  });
}
