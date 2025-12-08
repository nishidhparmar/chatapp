import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { showToast } from '@/components/common/toast';

export function useRunSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (scheduleId: number) => {
      const response = await axiosInstance.post(
        `/api/v1/schedules/${scheduleId}/run`
      );
      return response.data;
    },
    onSuccess: (data, scheduleId) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['schedule', scheduleId] });
      showToast.success({
        title: 'Schedule executed',
        description: 'The schedule has been run successfully.',
      });
    },
    onError: (error: unknown) => {
      console.error('Run schedule error:', error);
    },
  });
}
