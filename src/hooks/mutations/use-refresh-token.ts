import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { AuthResponse } from '@/types/auth';

interface RefreshTokenPayload {
  refresh_token: string;
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: async (payload: RefreshTokenPayload) => {
      const response = await axiosInstance.post<AuthResponse>(
        '/api/v1/auth/refresh',
        payload
      );
      return response.data;
    },
    onSuccess: data => {
      localStorage.setItem('access_token', data.data.access_token);
      localStorage.setItem('refresh_token', data.data.refresh_token);
      localStorage.setItem('expires_in', data.data.expires_in.toString());
    },
    onError: () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expires_in');
      window.location.href = '/login';
    },
  });
}
