import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { RenameChatPayload } from '@/types/chat';
import type { ApiResponse } from '@/types/api';
import { showToast } from '@/components/common/toast';
import { useErrorHandler } from '../use-error-handler';

interface RenameChatParams {
  chatId: number;
  payload: RenameChatPayload;
}

export function useRenameChat() {
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  return useMutation({
    mutationFn: async ({ chatId, payload }: RenameChatParams) => {
      const response = await axiosInstance.patch<ApiResponse>(
        `/api/v1/chat/${chatId}`,
        payload
      );
      return response.data;
    },
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['chat', chatId] });
      showToast.success({
        title: 'Chat renamed',
        description: 'The chat name has been updated successfully.',
      });
    },
    onError: error => {
      handleError(error, 'Failed to rename chat. Please try again.');
    },
  });
}
