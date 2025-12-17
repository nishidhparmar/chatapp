import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { AddToDashboardPayload } from '@/types/dashboard';
import { showToast } from '@/components/common/toast';

interface AddToDashboardParams {
  chatId: number;
  messageId: number;
  payload: AddToDashboardPayload;
}

export function useAddToDashboard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      chatId,
      messageId,
      payload,
    }: AddToDashboardParams) => {
      const response = await axiosInstance.post(
        `/api/v1/dashboards/add-chart/${chatId}/${messageId}`,
        payload
      );
      return response.data;
    },
    onSuccess: (data, { payload }) => {
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      queryClient.invalidateQueries({
        queryKey: ['dashboard', payload.dashboard_id],
      });
      showToast.success({
        title: 'Chart added to dashboard',
        description: 'The chart has been successfully added to your dashboard.',
      });
    },
    onError: (error: unknown) => {
      console.error('Add to dashboard error:', error);
      showToast.error({
        title: 'Failed to add chart',
        description:
          'There was an error adding the chart to your dashboard. Please try again.',
      });
    },
  });
}
