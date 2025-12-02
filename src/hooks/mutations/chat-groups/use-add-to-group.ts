import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { AddToGroupPayload } from '@/types/chat';
import type { ApiResponse } from '@/types/api';

interface AddToGroupParams {
  chatId: number;
  payload: AddToGroupPayload;
}

export function useAddToGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ chatId, payload }: AddToGroupParams) => {
      const response = await axiosInstance.post<ApiResponse>(
        `/api/v1/chat-groups/add-to-group/${chatId}`,
        payload
      );
      return response.data;
    },
    onSuccess: (data, { chatId, payload }) => {
      console.log('Chat added to group successfully:', data);
      console.log('Chat ID:', chatId);
      console.log('Group:', payload.group_name);

      // Invalidate chat list to reflect group changes
      queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });

      // Invalidate specific chat to update group information
      queryClient.invalidateQueries({ queryKey: ['chat', chatId] });

      // If there are group-related queries, invalidate them too
      queryClient.invalidateQueries({ queryKey: ['chat-groups'] });
    },
    onError: (error: unknown) => {
      console.error('Add to group error:', error);
    },
  });
}
