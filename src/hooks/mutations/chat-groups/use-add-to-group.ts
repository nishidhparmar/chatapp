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
      // Use the single endpoint for both adding to existing group and creating new group
      // When payload.group_id is 0, the API will create a new group
      // When payload.group_id is a valid ID, the API will add chat to existing group
      const response = await axiosInstance.post<ApiResponse>(
        `/api/v1/chat-groups/add-to-group/${chatId}`,
        payload
      );
      return response.data;
    },
    onSuccess: (data, { chatId, payload }) => {
      if (payload.group_id === 0) {
        console.log('Group created successfully:', data);
        console.log('Group name:', payload.group_name);
      } else {
        console.log('Chat added to group successfully:', data);
        console.log('Chat ID:', chatId);
        console.log('Group:', payload.group_name);
      }

      // Invalidate specific chat to update group information (if not creating a standalone group)
      if (chatId !== 0) {
        queryClient.invalidateQueries({ queryKey: ['chat', chatId] });
      }

      // Always invalidate chat list and groups after any group operation
      queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['chat-groups'] });
    },
    onError: (error: unknown) => {
      console.error('Add to group error:', error);
    },
  });
}
