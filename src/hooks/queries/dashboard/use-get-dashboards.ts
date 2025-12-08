import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { DashboardListItem } from '@/types/dashboard';
import { ApiResponse } from '../../../types/api';

export function useGetDashboards() {
  return useQuery({
    queryKey: ['dashboards'],
    queryFn: async (): Promise<ApiResponse<DashboardListItem[]>> => {
      const response = await axiosInstance.get('/api/v1/dashboards');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
}
