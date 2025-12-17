import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import { useErrorHandler } from '../use-error-handler';

interface SaveChatPayload {
  chat_id: number;
  title: string;
}

export function useSaveChat() {
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  return useMutation({
    mutationFn: async (payload: SaveChatPayload) => {
      const response = await axiosInstance.post<ApiResponse>(
        '/api/v1/chat/save',
        payload
      );
      return response.data;
    },
    onSuccess: (_, { chat_id }) => {
      queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['chat', chat_id] });
      // showToast.success({
      //   title: 'Chat saved',
      //   description: 'The chat has been saved successfully.',
      // });
    },
    onError: error => {
      handleError(error, 'Failed to save chat. Please try again.');
    },
  });
}
