import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export function useGetScheduleById(scheduleId: number, enabled = true) {
  return useQuery({
    queryKey: ['schedule', scheduleId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/api/v1/schedules/${scheduleId}`
      );
      return response.data;
    },
    enabled: enabled && !!scheduleId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
