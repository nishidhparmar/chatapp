import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { showToast } from '@/components/common/toast';

export function useDeleteReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reportId: number) => {
      const response = await axiosInstance.delete(
        `/api/v1/reports/${reportId}`
      );
      return response.data;
    },
    onSuccess: (_, reportId) => {
      // Invalidate reports list to remove deleted report
      queryClient.invalidateQueries({ queryKey: ['reports'] });

      // Remove the specific report from cache
      queryClient.removeQueries({ queryKey: ['report', reportId] });

      showToast.success({
        title: 'Report canceled',
        description: 'Report canceled successfully',
      });
    },
    onError: (error: unknown) => {
      console.error('Delete report error:', error);
      showToast.error({
        title: 'Failed to cancel report',
        description:
          'There was an error canceling the report. Please try again.',
      });
    },
  });
}
