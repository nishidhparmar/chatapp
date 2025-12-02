import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';

interface SaveChatPayload {
  chat_id: number;
  title: string;
}

export function useSaveChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SaveChatPayload) => {
      const response = await axiosInstance.post<ApiResponse>(
        '/api/v1/chat/save',
        payload
      );
      return response.data;
    },
    onSuccess: (data, { chat_id }) => {
      queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['chat', chat_id] });
    },
    onError: (error: unknown) => {
      console.error('Save chat error:', error);
    },
  });
}
