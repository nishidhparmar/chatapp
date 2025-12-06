import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { useUserStore } from '@/lib/stores/user-store';
import { deleteCookie } from '@/lib/cookie-utils';
import { toast } from 'sonner';

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
    localStorage.removeItem('token'); // Legacy token if exists

    // Clear cookies
    deleteCookie('access_token');

    // Clear user store
    clearUser();
    reset();

    // Clear all React Query cache
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
    onSuccess: data => {
      clearAuthData();
      toast.success(data.message || 'Logged out successfully');
      router.push('/login');
    },
    onError: (error: unknown) => {
      // Even if the API call fails, we should still clear local auth data
      clearAuthData();

      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || 'Logout completed';

      toast.error(errorMessage);
      router.push('/login');
    },
  });
}
