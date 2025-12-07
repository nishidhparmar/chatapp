import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ChatChartsResponse } from '@/types/chat';

export function useGetChatCharts(chatId: number, enabled = true) {
  return useQuery({
    queryKey: ['chat-charts', chatId],
    queryFn: async () => {
      const response = await axiosInstance.get<ChatChartsResponse>(
        `/api/v1/chat/${chatId}/charts`
      );
      return response.data;
    },
    enabled: enabled && !!chatId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
