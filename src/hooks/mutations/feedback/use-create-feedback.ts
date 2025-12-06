import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { CreateFeedbackPayload } from '@/types/feedback';

export function useCreateFeedback() {
  return useMutation({
    mutationFn: async (payload: CreateFeedbackPayload) => {
      const response = await axiosInstance.post('/api/v1/feedback', payload);
      return response.data;
    },
  });
}
