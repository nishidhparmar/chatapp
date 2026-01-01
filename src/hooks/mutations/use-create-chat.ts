import { ApiResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { useErrorHandler } from '../use-error-handler';

export interface CreateChatPayload {
  title: string;
}

export interface CreateChatResponse {
  chat_id: number;
}

export function useCreateChat() {
  const { handleError } = useErrorHandler();

  return useMutation({
    mutationFn: async (payload: CreateChatPayload) => {
      const response = await axiosInstance.post<
        ApiResponse<CreateChatResponse>
      >('/api/v1/chat/create', payload);
      return response.data;
    },
    onError: error => {
      handleError(error, 'Failed to create chat. Please try again.');
    },
  });
}
