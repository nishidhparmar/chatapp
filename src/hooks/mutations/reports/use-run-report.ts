import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { showToast } from '@/components/common/toast';

export function useRunReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reportId: number) => {
      const response = await axiosInstance.post(
        `/api/v1/reports/${reportId}/run`
      );
      return response.data;
    },
    onSuccess: (_, reportId) => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      queryClient.invalidateQueries({ queryKey: ['report', reportId] });
      showToast.success({
        title: 'Report executed',
        description: 'The report has been run successfully.',
      });
    },
    onError: (error: unknown) => {
      console.error('Run report error:', error);
      showToast.error({
        title: 'Failed to run report',
        description: 'There was an error running the report. Please try again.',
      });
    },
  });
}
