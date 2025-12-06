import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';

interface CreateGroupPayload {
  name: string;
}

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateGroupPayload) => {
      const response = await axiosInstance.post<ApiResponse>(
        '/api/v1/chat-groups',
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-groups'] });
    },
  });
}
