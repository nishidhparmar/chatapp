import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { CreateSchedulePayload, Schedule } from '@/types/schedule';
import type { ApiResponse } from '@/types/api';

export function useCreateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateSchedulePayload) => {
      const response = await axiosInstance.post<ApiResponse<Schedule>>(
        '/api/v1/schedules',
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
    onError: (error: unknown) => {
      console.error('Create schedule error:', error);
    },
  });
}
