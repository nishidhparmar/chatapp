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
      console.log('Chat removed from group successfully:', data);
      console.log('Chat ID:', chatId, 'Group ID:', groupId);

      // Invalidate chat list to refresh the groups structure
      queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });

      // Invalidate chat groups to refresh the groups list
      queryClient.invalidateQueries({ queryKey: ['chat-groups'] });

      // Invalidate specific chat to update its group information
      queryClient.invalidateQueries({ queryKey: ['chat', chatId] });
    },
    onError: (error: unknown) => {
      console.error('Remove from group error:', error);
    },
  });
}
