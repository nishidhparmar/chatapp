import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { AddToGroupPayload } from '@/types/chat';
import type { ApiResponse } from '@/types/api';
import { showToast } from '@/components/common/toast';

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
    onSuccess: (_, { chatId, payload }) => {
      if (chatId !== 0) {
        queryClient.invalidateQueries({ queryKey: ['chat', chatId] });
      }
      queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['chat-groups'] });
      showToast.success({
        title: 'Chat added to group',
        description:
          payload.group_id === 0
            ? 'New group created and chat added successfully.'
            : 'Chat has been added to the group successfully.',
      });
    },
    onError: (error: unknown) => {
      console.error('Add to group error:', error);
    },
  });
}
