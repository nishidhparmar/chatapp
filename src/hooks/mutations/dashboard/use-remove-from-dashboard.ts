import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

interface RemoveFromDashboardParams {
  dashboardId: number;
  chartId: number;
}

export function useRemoveFromDashboard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ dashboardId, chartId }: RemoveFromDashboardParams) => {
      const response = await axiosInstance.delete(
        `/api/v1/dashboards/${dashboardId}/charts/${chartId}`
      );
      return response.data;
    },
    onSuccess: (_, { dashboardId, chartId }) => {
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', dashboardId] });
      queryClient.removeQueries({ queryKey: ['dashboard-chart', chartId] });
    },
  });
}
