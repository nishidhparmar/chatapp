import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { showToast } from '@/components/common/toast';

export function useDeleteSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (scheduleId: number) => {
      const response = await axiosInstance.delete(
        `/api/v1/schedules/${scheduleId}`
      );
      return response.data;
    },
    onSuccess: (data, scheduleId) => {
      // Invalidate schedules list to remove deleted schedule
      queryClient.invalidateQueries({ queryKey: ['schedules'] });

      // Remove the specific schedule from cache
      queryClient.removeQueries({ queryKey: ['schedule', scheduleId] });

      showToast.success({
        title: 'Schedule canceled',
        description: 'Schedule canceled successfully',
      });
    },
    onError: (error: unknown) => {
      console.error('Delete schedule error:', error);
    },
  });
}
