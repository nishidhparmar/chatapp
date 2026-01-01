import { ApiResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { ScheduleDetail } from '@/types/schedule';

export function useGetScheduleById(scheduleId: number, enabled = true) {
  return useQuery<ScheduleDetail>({
    queryKey: ['schedule', scheduleId],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<ScheduleDetail>>(
        `/api/v1/reports/${scheduleId}`
      );
      return response.data.data!;
    },
    enabled: enabled && !!scheduleId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
