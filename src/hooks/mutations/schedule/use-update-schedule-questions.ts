import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { showToast } from '@/components/common/toast';

interface UpdateScheduleQuestionsParams {
  scheduleId: number;
  questions: string[];
}

export function useUpdateScheduleQuestions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      scheduleId,
      questions,
    }: UpdateScheduleQuestionsParams) => {
      const response = await axiosInstance.patch(
        `/api/v1/schedules/${scheduleId}`,
        { questions }
      );
      return response.data;
    },
    onSuccess: (data, { scheduleId }) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['schedule', scheduleId] });
      showToast.success({
        title: 'Questions updated',
        description: 'The schedule questions have been updated successfully.',
      });
    },
    onError: (error: unknown) => {
      console.error('Update schedule questions error:', error);
      showToast.error({
        title: 'Failed to update questions',
        description: 'There was an error updating the schedule questions.',
      });
    },
  });
}
