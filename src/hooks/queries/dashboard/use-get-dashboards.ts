import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export function useGetDashboards() {
  return useQuery({
    queryKey: ['dashboards'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/v1/dashboards');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
}
