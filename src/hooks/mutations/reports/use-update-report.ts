import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { UpdateReportPayload } from '@/types/reports';
import { showToast } from '@/components/common/toast';

interface UpdateReportParams {
  reportId: number;
  payload: UpdateReportPayload;
}

export function useUpdateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reportId, payload }: UpdateReportParams) => {
      const response = await axiosInstance.patch(
        `/api/v1/reports/${reportId}`,
        payload
      );
      return response.data;
    },
    onSuccess: (_, { reportId }) => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      queryClient.invalidateQueries({ queryKey: ['report', reportId] });
      showToast.success({
        title: 'Report updated',
        description: 'The report has been updated successfully.',
      });
    },
    onError: (error: unknown) => {
      console.error('Update report error:', error);
      showToast.error({
        title: 'Failed to update report',
        description:
          'There was an error updating the report. Please try again.',
      });
    },
  });
}
