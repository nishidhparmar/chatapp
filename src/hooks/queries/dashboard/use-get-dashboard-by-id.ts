import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { DashboardDetail } from '@/types/dashboard';
import { ApiResponse } from '../../../types/api';

export function useGetDashboardById(dashboardId: number, enabled = true) {
  return useQuery({
    queryKey: ['dashboard', dashboardId],
    queryFn: async (): Promise<ApiResponse<DashboardDetail>> => {
      const response = await axiosInstance.get(
        `/api/v1/dashboards/${dashboardId}`
      );
      return response.data;
    },
    enabled: enabled && !!dashboardId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
