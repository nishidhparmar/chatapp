import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { SuggestedQuestionsResponse } from '@/types/questions';
import { ApiResponse } from '../../types/api';

export function useSuggestedQuestions({ enabled }: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['suggested-questions'],
    queryFn: async () => {
      const response = await axiosInstance.get<
        ApiResponse<SuggestedQuestionsResponse>
      >('/api/v1/suggested-questions');
      return response.data;
    },
    enabled: !!enabled,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
