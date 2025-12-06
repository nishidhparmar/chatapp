import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';

export function useDeleteGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (groupId: number) => {
      const response = await axiosInstance.delete<ApiResponse>(
        `/api/v1/chat-groups/${groupId}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-groups'] });
      queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });
    },
  });
}
