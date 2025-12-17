import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import { showToast } from '@/components/common/toast';
import { useErrorHandler } from '../../use-error-handler';

interface RemoveFromGroupParams {
  groupId: number;
  chatId: number;
}

export function useRemoveFromGroup() {
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  return useMutation({
    mutationFn: async ({ groupId, chatId }: RemoveFromGroupParams) => {
      const response = await axiosInstance.delete<ApiResponse>(
        `/api/v1/chat-groups/${groupId}/chats/${chatId}`
      );
      return response.data;
    },
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['chat-groups'] });
      queryClient.invalidateQueries({ queryKey: ['chat', chatId] });
      showToast.success({
        title: 'Chat removed from group',
        description: 'The chat has been removed from the group successfully.',
      });
    },
    onError: error => {
      handleError(error, 'Failed to remove chat from group. Please try again.');
    },
  });
}
