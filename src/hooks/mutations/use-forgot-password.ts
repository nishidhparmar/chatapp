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
  });
}
