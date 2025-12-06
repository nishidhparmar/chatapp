import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { RenameChatPayload } from '@/types/chat';
import type { ApiResponse } from '@/types/api';

interface RenameChatParams {
  chatId: number;
  payload: RenameChatPayload;
}

export function useRenameChat() {
  const queryClient = useQueryClient();

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
    },
  });
}
