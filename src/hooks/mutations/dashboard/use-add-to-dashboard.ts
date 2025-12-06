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
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      queryClient.invalidateQueries({
        queryKey: ['dashboard', payload.dashboard_id],
      });
    },
  });
}
