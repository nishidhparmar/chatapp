import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ChartContentData, ViewAsPayload } from '@/types/chat';
import type { ApiResponse } from '@/types/api';
import { showToast } from '@/components/common/toast';

interface ViewAsParams {
  messageId: number;
  payload: ViewAsPayload;
}

export function useViewAs() {
  return useMutation({
    mutationFn: async ({ messageId, payload }: ViewAsParams) => {
      const response = await axiosInstance.post<ApiResponse<ChartContentData>>(
        `/api/v1/chat/messages/${messageId}/view-as`,
        payload
      );
      return response.data;
    },
    onSuccess: (_, { payload }) => {
      showToast.success({
        title: 'View changed',
        description: `Chart view has been changed to ${payload.view_as}.`,
      });
    },
  });
}
