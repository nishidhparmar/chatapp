import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { showToast } from '@/components/common/toast';

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
      showToast.success({
        title: 'Chart removed from dashboard',
        description:
          'The chart has been successfully removed from your dashboard.',
      });
    },
    onError: (error: unknown) => {
      console.error('Remove from dashboard error:', error);
      showToast.error({
        title: 'Failed to remove chart',
        description:
          'There was an error removing the chart from your dashboard. Please try again.',
      });
    },
  });
}
