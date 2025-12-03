import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

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
      console.log('Schedule run triggered successfully:', data);
      console.log('Schedule ID:', scheduleId);
      console.log('Updated run count:', data.data.run_count);
      console.log('Last run at:', data.data.last_run_at);
      console.log('Next run at:', data.data.next_run_at);

      // Invalidate schedules list to show updated run statistics
      queryClient.invalidateQueries({ queryKey: ['schedules'] });

      // Invalidate specific schedule to refetch updated data with new run info
      queryClient.invalidateQueries({ queryKey: ['schedule', scheduleId] });
    },
    onError: (error: unknown) => {
      console.error('Run schedule error:', error);
    },
  });
}
