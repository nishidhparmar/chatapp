import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../../lib/axios';

interface OpenChartAsChatResponse {
  status: string;
  data: {
    chat_id: number;
    is_saved: boolean;
  };
  message: string;
}

const openChartAsChat = async (
  widgetId: number
): Promise<OpenChartAsChatResponse> => {
  const response = await axiosInstance.post(
    `/api/v1/dashboards/charts/${widgetId}/open-as-chat`
  );
  return response.data;
};

export const useOpenChartAsChat = () => {
  return useMutation({
    mutationFn: openChartAsChat,
  });
};
