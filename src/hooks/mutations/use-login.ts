import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import type { LoginPayload, AuthResponse } from '@/types/auth';
import { setCookie } from '@/lib/cookie-utils';
import { showToast } from '@/components/common/toast';

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
      showToast.success({
        title: 'Login successful',
        description: 'Welcome back! You have been logged in successfully.',
      });
      const redirectUrl = searchParams.get('redirect') || '/';
      window.location.href = redirectUrl;
    },
    // onError is removed because errors are now handled globally by axios interceptor
  });
}
