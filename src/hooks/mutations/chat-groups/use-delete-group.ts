import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import { showToast } from '@/components/common/toast';
import { useErrorHandler } from '../../use-error-handler';

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

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
      showToast.success({
        title: 'Group deleted',
        description: 'The chat group has been deleted successfully.',
      });
    },
    onError: error => {
      handleError(error, 'Failed to delete group. Please try again.');
    },
  });
}
