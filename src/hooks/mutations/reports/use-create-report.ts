import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { CreateReportPayload, Report } from '@/types/reports';
import type { ApiResponse } from '@/types/api';
import { showToast } from '@/components/common/toast';

export function useCreateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateReportPayload) => {
      const response = await axiosInstance.post<ApiResponse<Report>>(
        '/api/v1/reports',
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      showToast.success({
        title: 'Report created',
        description: 'The report has been created successfully.',
      });
    },
    onError: (error: unknown) => {
      console.error('Create report error:', error);
      showToast.error({
        title: 'Failed to create report',
        description:
          'There was an error creating the report. Please try again.',
      });
    },
  });
}
