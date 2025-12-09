import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import { showToast } from '@/components/common/toast';

interface CreateScheduleFromTemplatePayload {
  schedule_id: number;
  message_id: number;
}

export function useCreateScheduleFromTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateScheduleFromTemplatePayload) => {
      const response = await axiosInstance.post<ApiResponse<any>>(
        '/api/v1/schedules/from-template',
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      showToast.success({
        title: 'Schedule created',
        description: 'The recurring report has been created successfully.',
      });
    },
    onError: (error: unknown) => {
      console.error('Create schedule from template error:', error);
    },
  });
}
