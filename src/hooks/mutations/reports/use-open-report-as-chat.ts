import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../../lib/axios';

interface OpenReportAsChatResponse {
  status: string;
  data: {
    chat_id: number;
    is_saved: boolean;
  };
  message: string;
}

const openReportAsChat = async (
  reportId: number
): Promise<OpenReportAsChatResponse> => {
  const response = await axiosInstance.post(
    `/api/v1/reports/${reportId}/open-as-chat`
  );
  return response.data;
};

export const useOpenReportAsChat = () => {
  return useMutation({
    mutationFn: openReportAsChat,
  });
};
