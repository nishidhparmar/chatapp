import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import { showToast } from '@/components/common/toast';
import { useErrorHandler } from '../../use-error-handler';

export function useDeleteDashboard() {
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  return useMutation({
    mutationFn: async (dashboardId: number) => {
      const response = await axiosInstance.delete<ApiResponse>(
        `/api/v1/dashboards/${dashboardId}`
      );
      return response.data;
    },
    onSuccess: (_, dashboardId) => {
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      queryClient.removeQueries({ queryKey: ['dashboard', dashboardId] });
      showToast.success({
        title: 'Dashboard deleted',
        description: 'The dashboard has been successfully deleted.',
      });
    },
    onError: error => {
      handleError(error, 'Failed to delete dashboard. Please try again.');
    },
  });
}
