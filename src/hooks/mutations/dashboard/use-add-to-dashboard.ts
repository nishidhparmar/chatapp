import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { AddToDashboardPayload } from '@/types/dashboard';

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
      console.log('Chart added to dashboard successfully:', data);
      console.log('Chart title:', payload.chart_title);
      console.log('Dashboard:', payload.dashboard_name);
      console.log('Chart type:', payload.chart_type);

      // Invalidate dashboards list to show updated dashboard
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });

      // Invalidate specific dashboard to show new chart
      queryClient.invalidateQueries({
        queryKey: ['dashboard', payload.dashboard_id],
      });
    },
    onError: (error: unknown) => {
      console.error('Add to dashboard error:', error);
    },
  });
}
