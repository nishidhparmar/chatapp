import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ChatListData, ChatListParams } from '@/types/chat';
import type { ApiResponse } from '@/types/api';

export function useGetChatList(params: ChatListParams = {}) {
  const { page = 1, per_page = 25 } = params;

  return useQuery({
    queryKey: ['chats', 'list', { page, per_page }],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<ChatListData>>(
        '/api/v1/chat/list',
        {
          params: {
            page,
            per_page,
          },
        }
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 3,
  });
}
