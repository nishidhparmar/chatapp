import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type { ResetPasswordPayload, ResetPasswordResponse } from '@/types/auth';
import { showToast } from '@/components/common/toast';

export function useResetPassword() {
  return useMutation({
    mutationFn: async (payload: ResetPasswordPayload) => {
      const response = await axiosInstance.post<ResetPasswordResponse>(
        '/api/v1/auth/reset-password',
        payload
      );
      return response.data;
    },
    onSuccess: data => {
      showToast.success({
        title: 'Password reset successful',
        description:
          data.message || 'Your password has been reset successfully.',
      });
    },
    onError: (error: unknown) => {
      console.error('Reset password error:', error);
      showToast.error({
        title: 'Failed to reset password',
        description:
          'There was an error resetting your password. Please try again.',
      });
    },
  });
}
