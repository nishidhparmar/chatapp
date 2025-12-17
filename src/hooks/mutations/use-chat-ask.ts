import { ApiResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ChatAskPayload, ChatAskResponse } from '@/types/chat';
import { useErrorHandler } from '../use-error-handler';

export function useChatAsk() {
  const { handleError } = useErrorHandler();

  return useMutation({
    mutationFn: async (payload: ChatAskPayload) => {
      const response = await axiosInstance.post<ApiResponse<ChatAskResponse>>(
        '/api/v1/chat/ask',
        payload
      );
      return response.data;
    },
    onError: error => {
      handleError(error, 'Failed to create chat. Please try again.');
    },
  });
}
