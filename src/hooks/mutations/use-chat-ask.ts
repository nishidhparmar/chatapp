import { ApiResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ChatAskPayload, ChatAskResponse } from '@/types/chat';

export function useChatAsk() {
  return useMutation({
    mutationFn: async (payload: ChatAskPayload) => {
      const response = await axiosInstance.post<ApiResponse<ChatAskResponse>>(
        '/api/v1/chat/ask',
        payload
      );
      return response.data;
    },
  });
}
