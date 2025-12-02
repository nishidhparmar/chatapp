import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ScheduleListItem, ScheduleListParams } from '@/types/schedule';
import type { ApiResponse } from '@/types/api';

export function useGetSchedules(params: ScheduleListParams = {}) {
  const { page = 1, per_page = 25 } = params;

  return useQuery({
    queryKey: ['schedules', 'list', { page, per_page }],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<ScheduleListItem[]>>(
        '/api/v1/schedules',
        {
          params: {
            page,
            per_page,
          },
        }
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
}
