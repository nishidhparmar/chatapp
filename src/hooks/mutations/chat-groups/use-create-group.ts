import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import { showToast } from '@/components/common/toast';
import { useErrorHandler } from '../../use-error-handler';

interface CreateGroupPayload {
  name: string;
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

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
      showToast.success({
        title: 'Group created',
        description: 'The chat group has been created successfully.',
      });
    },
    onError: error => {
      handleError(error, 'Failed to create group. Please try again.');
    },
  });
}
