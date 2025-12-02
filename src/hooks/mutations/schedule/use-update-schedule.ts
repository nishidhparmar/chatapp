import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { UpdateSchedulePayload } from '@/types/schedule';

interface UpdateScheduleParams {
  scheduleId: number;
  payload: UpdateSchedulePayload;
}

export function useUpdateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ scheduleId, payload }: UpdateScheduleParams) => {
      const response = await axiosInstance.patch(
        `/api/v1/schedules/${scheduleId}`,
        payload
      );
      return response.data;
    },
    onSuccess: (data, { scheduleId, payload }) => {
      console.log('Schedule updated successfully:', data);
      console.log('Schedule ID:', scheduleId);
      console.log('Updated title:', payload.title);
      console.log('Active status:', payload.is_active);
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['schedule', scheduleId] });
    },
    onError: (error: unknown) => {
      console.error('Update schedule error:', error);
    },
  });
}
