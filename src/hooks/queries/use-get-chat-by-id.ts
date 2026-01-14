import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ChatDetail } from '@/types/chat';
import type { ApiResponse } from '@/types/api';

export function useGetChatById(chatId: number, enabled = true) {
  return useQuery({
    queryKey: ['chat', chatId],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<ChatDetail>>(
        `/api/v1/chat/${chatId}`
      );
      return response.data;
    },
    enabled: enabled && !!chatId,
  });
}
