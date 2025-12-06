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
    onSuccess: (data, groupId) => {
      console.log('Group deleted successfully:', data);

      // Invalidate chat groups to remove the deleted group
      queryClient.invalidateQueries({ queryKey: ['chat-groups'] });

      // Invalidate chat list in case any chats were in the deleted group
      queryClient.invalidateQueries({ queryKey: ['chats', 'list'] });
    },
    onError: (error: unknown) => {
      console.error('Delete group error:', error);
    },
  });
}
