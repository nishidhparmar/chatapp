import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { showToast } from '@/components/common/toast';

interface UpdateReportQuestionsParams {
  reportId: number;
  questions: string[];
}

export function useUpdateReportQuestions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reportId,
      questions,
    }: UpdateReportQuestionsParams) => {
      const response = await axiosInstance.patch(
        `/api/v1/reports/${reportId}`,
        { questions }
      );
      return response.data;
    },
    onSuccess: (_, { reportId }) => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      queryClient.invalidateQueries({ queryKey: ['report', reportId] });
      showToast.success({
        title: 'Questions updated',
        description: 'The report questions have been updated successfully.',
      });
    },
    onError: (error: unknown) => {
      console.error('Update report questions error:', error);
      showToast.error({
        title: 'Failed to update questions',
        description: 'There was an error updating the report questions.',
      });
    },
  });
}
