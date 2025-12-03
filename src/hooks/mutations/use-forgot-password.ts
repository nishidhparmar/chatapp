import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from '@/types/auth';
import { toast } from 'sonner';

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
      toast.success(data.message || 'Password reset email sent successfully');
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || 'Failed to send reset email. Please try again.';
      toast.error(errorMessage);
    },
  });
}
