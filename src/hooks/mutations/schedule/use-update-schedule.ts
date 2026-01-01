import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { UpdateSchedulePayload } from '@/types/schedule';
import { showToast } from '@/components/common/toast';

interface UpdateScheduleParams {
  scheduleId: number;
  payload: UpdateSchedulePayload;
}

export function useUpdateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ scheduleId, payload }: UpdateScheduleParams) => {
      const response = await axiosInstance.patch(
        `/api/v1/reports/${scheduleId}`,
        payload
      );
      return response.data;
    },
    onSuccess: (_, { scheduleId }) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['schedule', scheduleId] });
      showToast.success({
        title: 'Reports updated',
        description: 'The schedule has been updated successfully.',
      });
    },
    onError: (error: unknown) => {
      console.error('Update schedule error:', error);
      showToast.error({
        title: 'Failed to update schedule',
        description:
          'There was an error updating the schedule. Please try again.',
      });
    },
  });
}
