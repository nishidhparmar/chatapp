import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export interface Dashboard {
  dashboard_id: number;
  user_id: number;
  client_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardsResponse {
  status: string;
  data: Dashboard[];
  message: string;
}

export function useGetDashboards() {
  return useQuery<DashboardsResponse>({
    queryKey: ['dashboards'],
    queryFn: async () => {
      const response =
        await axiosInstance.get<DashboardsResponse>('/api/v1/dashboards');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
}
