import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { ApiResponse } from '../../../types/api';
import { DashboardDetail } from '../../../types/dashboard';

export function useGetDashboardById(dashboardId: number, enabled = true) {
  return useQuery({
    queryKey: ['dashboard', dashboardId],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<DashboardDetail>>(
        `/api/v1/dashboards/${dashboardId}`
      );
      return response.data;
    },
    enabled: enabled && !!dashboardId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
