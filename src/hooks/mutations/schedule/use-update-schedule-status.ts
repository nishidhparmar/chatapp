import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { showToast } from '@/components/common/toast';

interface UpdateScheduleStatusParams {
  scheduleId: number;
  isActive: boolean;
}

export function useUpdateScheduleStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      scheduleId,
      isActive,
    }: UpdateScheduleStatusParams) => {
      const response = await axiosInstance.patch(
        `/api/v1/reports/${scheduleId}`,
        { is_active: isActive }
      );
      return response.data;
    },
    onSuccess: (_, { scheduleId, isActive }) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['schedule', scheduleId] });
      showToast.success({
        title: isActive ? 'Schedule resumed' : 'Schedule paused',
        description: `The schedule has been ${isActive ? 'resumed' : 'paused'} successfully.`,
      });
    },
    onError: (error: unknown) => {
      console.error('Update schedule status error:', error);
      showToast.error({
        title: 'Failed to update schedule',
        description: 'There was an error updating the schedule status.',
      });
    },
  });
}
