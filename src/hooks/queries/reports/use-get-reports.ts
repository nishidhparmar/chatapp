import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ReportListItem, ReportListParams } from '@/types/reports';
import type { ApiResponse } from '@/types/api';

export function useGetReports(params: ReportListParams = {}) {
  const { page = 1, per_page = 25 } = params;

  return useQuery({
    queryKey: ['reports', 'list', { page, per_page }],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<ReportListItem[]>>(
        '/api/v1/reports',
        {
          params: {
            page,
            per_page,
          },
        }
      );
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
}
