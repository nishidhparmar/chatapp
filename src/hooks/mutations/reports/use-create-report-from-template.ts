import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type { Report } from '@/types/reports';
import { showToast } from '@/components/common/toast';

interface CreateReportFromTemplatePayload {
  report_id: number;
  message_id: number;
}

export function useCreateReportFromTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateReportFromTemplatePayload) => {
      const response = await axiosInstance.post<ApiResponse<Report>>(
        '/api/v1/reports/from-template',
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      showToast.success({
        title: 'Report created',
        description: 'The recurring report has been created successfully.',
      });
    },
    onError: (error: unknown) => {
      console.error('Create report from template error:', error);
      showToast.error({
        title: 'Failed to create recurring report',
        description:
          'There was an error creating the recurring report. Please try again.',
      });
    },
  });
}
