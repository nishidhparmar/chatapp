import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ChatGroup } from '@/types/chat';
import type { ApiResponse } from '@/types/api';

export function useGetChatGroups() {
  return useQuery({
    queryKey: ['chat-groups'],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<ChatGroup[]>>(
        '/api/v1/chat-groups'
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
}
