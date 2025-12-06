import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import type { LoginPayload, AuthResponse } from '@/types/auth';
import { toast } from 'sonner';
import { setCookie } from '@/lib/cookie-utils';

export function useLogin() {
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await axiosInstance.post<AuthResponse>(
        '/api/v1/auth/login',
        payload
      );
      return response.data;
    },
    onSuccess: data => {
      localStorage.setItem('access_token', data.data.access_token);
      localStorage.setItem('refresh_token', data.data.refresh_token);
      localStorage.setItem('expires_in', data.data.expires_in.toString());
      setCookie('access_token', data.data.access_token, data.data.expires_in);
      const redirectUrl = searchParams.get('redirect') || '/';
      window.location.href = redirectUrl;
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    },
  });
}
