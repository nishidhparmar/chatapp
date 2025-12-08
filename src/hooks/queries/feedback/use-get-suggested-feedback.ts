import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { SuggestedFeedback } from '@/types/feedback';
import { ApiResponse } from '../../../types/api';

export function useGetSuggestedFeedback() {
  return useQuery({
    queryKey: ['suggested-feedback'],
    queryFn: async (): Promise<ApiResponse<SuggestedFeedback>> => {
      const response = await axiosInstance.get('/api/v1/feedback/suggested');
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: 3,
  });
}
