'use client';

import React from 'react';
import { useGetChatCharts } from '../../hooks/queries/use-get-chat-charts';
import { InvoiceView } from '../common';
import { VisualizationType } from '../common/invoice-view/types';
import NoDataFound from '../icons/no-data-found';
import Loading from '@/components/common/loading';

interface ChatDataViewProps {
  chatId: number;
  handleOpenDashboardView: (dashboardId: number) => void;
}

const ChatDataView: React.FC<ChatDataViewProps> = ({
  chatId,
  handleOpenDashboardView,
}) => {
  const { data: chartsData, isLoading } = useGetChatCharts(chatId, !!chatId);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Loading />
      </div>
    );
  }

  if (!chartsData?.data || chartsData.data.length === 0) {
    return (
      <div className='flex justify-center px-4 flex-col max-w-[410px] mx-auto text-center items-center h-full'>
        <NoDataFound />
        <h1 className='mt-6 text-neutral-ct-primary font-semibold'>
          Nothing to see… yet
        </h1>
        <p className='mt-2 text-neutral-ct-secondary'>
          Charts and tables from your chat requests will show up here. Ask for
          specific data to get started.
        </p>
      </div>
    );
  }

  return (
    <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 p-6'>
      {chartsData?.data.map(chart => {
        return (
          <InvoiceView
            title={chart.title}
            defaultView={chart.visualization_type as VisualizationType}
            data={chart}
            chatId={chatId}
            onOpenDashboardView={handleOpenDashboardView}
          />
        );
      })}
    </div>
  );
};
export default ChatDataView;
