import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { useUserStore } from '@/lib/stores/user-store';
import { deleteCookie } from '@/lib/cookie-utils';
import { showToast } from '@/components/common/toast';

interface LogoutPayload {
  refresh_token: string;
}

interface LogoutResponse {
  status: string;
  message: string;
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { clearUser, reset } = useUserStore();

  const clearAuthData = () => {
    // Clear localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    deleteCookie('access_token');
    clearUser();
    reset();
    queryClient.clear();
  };

  return useMutation({
    mutationFn: async (payload: LogoutPayload) => {
      const response = await axiosInstance.post<LogoutResponse>(
        '/api/v1/auth/logout',
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      clearAuthData();
      router.push('/login');
    },
    onError: (error: unknown) => {
      clearAuthData();
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || 'Logout completed';

      showToast.error({
        title: 'Logout error',
        description: errorMessage,
      });
      router.push('/login');
    },
  });
}
