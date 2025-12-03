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
    onSuccess: (data, payload) => {
      console.log('Schedule created successfully:', data);
      console.log('Schedule ID:', data.data.id);
      console.log('Title:', payload.title);
      console.log('Frequency:', payload.frequency_type);
      console.log('Repeat at:', payload.repeat_at);
      console.log('Repeat on:', payload.repeat_on);

      // Invalidate schedules list to show the new schedule
      queryClient.invalidateQueries({ queryKey: ['schedules'] });

      // Invalidate chat-related queries if needed
      queryClient.invalidateQueries({ queryKey: ['chat', payload.chat_id] });
    },
    onError: (error: unknown) => {
      console.error('Create schedule error:', error);
    },
  });
}
