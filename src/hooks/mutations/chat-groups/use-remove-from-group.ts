import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';

interface RemoveFromGroupParams {
  groupId: number;
  chatId: number;
}

export function useRemoveFromGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ groupId, chatId }: RemoveFromGroupParams) => {
      const response = await axiosInstance.delete<ApiResponse>(
        `/api/v1/chat-groups/${groupId}/chats/${chatId}`
      );
      return response.data;
    },
    onSuccess: (data, { groupId, chatId }) => {
      queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['chat', chatId] });
      queryClient.invalidateQueries({ queryKey: ['chat-groups'] });
      queryClient.invalidateQueries({ queryKey: ['chat-groups', groupId] });
    },
    onError: (error: unknown) => {
      console.error('Remove from group error:', error);
    },
  });
}
