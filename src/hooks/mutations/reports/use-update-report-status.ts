import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { showToast } from '@/components/common/toast';

interface UpdateReportStatusParams {
  reportId: number;
  isActive: boolean;
}

export function useUpdateReportStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reportId, isActive }: UpdateReportStatusParams) => {
      const response = await axiosInstance.patch(
        `/api/v1/reports/${reportId}`,
        { is_active: isActive }
      );
      return response.data;
    },
    onSuccess: (_, { reportId, isActive }) => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      queryClient.invalidateQueries({ queryKey: ['report', reportId] });
      showToast.success({
        title: isActive ? 'Report resumed' : 'Report paused',
        description: `The report has been ${isActive ? 'resumed' : 'paused'} successfully.`,
      });
    },
    onError: (error: unknown) => {
      console.error('Update report status error:', error);
      showToast.error({
        title: 'Failed to update report',
        description: 'There was an error updating the report status.',
      });
    },
  });
}
