import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';

export function useDeleteChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (chatId: number) => {
      const response = await axiosInstance.delete<ApiResponse>(
        `/api/v1/chat/${chatId}`
      );
      return response.data;
    },
    onSuccess: (_, chatId) => {
      queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });
      queryClient.removeQueries({ queryKey: ['chat', chatId] });
    },
  });
}
