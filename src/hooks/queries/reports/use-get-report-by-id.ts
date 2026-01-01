import { ApiResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { ReportDetail } from '@/types/reports';

export function useGetReportById(reportId: number, enabled = true) {
  return useQuery<ReportDetail>({
    queryKey: ['report', reportId],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<ReportDetail>>(
        `/api/v1/reports/${reportId}`
      );
      return response.data.data!;
    },
    enabled: enabled && !!reportId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
