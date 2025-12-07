import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from '@/types/auth';
import { showToast } from '@/components/common/toast';

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      const response = await axiosInstance.post<ForgotPasswordResponse>(
        '/api/v1/auth/forgot-password',
        payload
      );
      return response.data;
    },
    onSuccess: data => {
      showToast.success({
        title: 'Password reset email sent',
        description:
          data.message || 'Please check your email for reset instructions.',
      });
    },
  });
}
