import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export interface ChartConfig {
  type: string;
  data: {
    labels: string[];
    values: number[];
  };
}

export interface ChartWidget {
  widget_id: number;
  dashboard_id: number;
  chat_id: number;
  message_id: number;
  title: string;
  chart_type: string;
  chart_config: ChartConfig;
  position: number;
  created_at: string;
}

export interface DashboardDetail {
  dashboard_id: number;
  user_id: number;
  client_id: number;
  name: string;
  charts: ChartWidget[];
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
}

export function useGetDashboardById(
  dashboardId: number | undefined,
  enabled = true
) {
  return useQuery<ApiResponse<DashboardDetail>>({
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
