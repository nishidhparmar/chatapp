import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { useUserStore } from '@/lib/stores/user-store';
import type { User } from '@/types/auth';
import type { ApiResponse } from '@/types/api';

export function useCurrentUser() {
  const {
    user,
    isLoading: storeLoading,
    error: storeError,
    isInitialized,
    setUser,
    setLoading,
    setError,
    setInitialized,
    clearUser,
  } = useUserStore();

  const {
    data,
    isLoading: queryLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<User>>(
        '/api/v1/auth/current-user'
      );
      return response.data;
    },
    enabled: !isInitialized && !!localStorage.getItem('access_token'),
  });

  // Update store when query data changes
  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
      setError(null);
      setInitialized(true);
    }
  }, [data, setUser, setError, setInitialized]);

  useEffect(() => {
    if (isError) {
      clearUser();
    }
  }, [isError, setError, clearUser]);

  // Update loading state
  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading, setLoading]);

  return {
    user,
    isLoading: storeLoading || queryLoading,
    error: storeError,
    isInitialized,
    refetch,
    // Helper methods
    isAuthenticated: !!user,
    hasRole: (role: string) => user?.role === role,
  };
}
