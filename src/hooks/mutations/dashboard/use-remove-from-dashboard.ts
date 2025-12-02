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
    onSuccess: (data, { dashboardId, chartId }) => {
      console.log('Chart removed from dashboard successfully:', data);
      console.log('Dashboard ID:', dashboardId);
      console.log('Chart ID:', chartId);

      // Invalidate dashboard list to reflect changes
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });

      // Invalidate specific dashboard to update chart list
      queryClient.invalidateQueries({ queryKey: ['dashboard', dashboardId] });

      // Remove the specific chart from cache
      queryClient.removeQueries({ queryKey: ['dashboard-chart', chartId] });
    },
    onError: (error: unknown) => {
      console.error('Remove from dashboard error:', error);
    },
  });
}
