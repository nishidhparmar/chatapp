'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import Loading from '@/components/common/loading';
import { useGetDashboardById } from '@/hooks/queries/dashboard/use-get-dashboard-by-id';
import { InvoiceView } from '../common';
import { ChatDetailMessage } from '../../types/chat';

interface DashboardViewProps {
  dashboardId: number | null;
  onClose: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  dashboardId,
  onClose,
}) => {
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useGetDashboardById(dashboardId!, !!dashboardId);

  return (
    <div className='h-full  border-l border-neutral-br-disabled'>
      {/* Header */}
      <div className='flex items-center bg-white justify-between p-4 border-b border-neutral-br-disabled'>
        <h2 className='md:text-lg text-base font-semibold text-neutral-ct-primary'>
          {dashboardData?.data.name}
        </h2>
        <Button
          variant='ghost'
          size='sm'
          onClick={onClose}
          className='h-8 w-8 p-0'
        >
          <X className='h-4 w-4' />
        </Button>
      </div>

      {/* Content */}
      <div className='bg-neutral-ct-tertiary md:h-[calc(100vh-121px)] h-[calc(100vh-56px)] overflow-y-auto'>
        {isLoading ? (
          <div className='flex items-center justify-center py-12'>
            <Loading size='lg' />
          </div>
        ) : error ? (
          <div className='text-center'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <X className='w-8 h-8 text-red-500' />
            </div>
            <h3 className='text-lg font-medium text-red-600 mb-2'>
              Error Loading Dashboard
            </h3>
            <p className='text-neutral-ct-secondary text-sm'>
              Failed to load dashboard {dashboardId}
            </p>
          </div>
        ) : dashboardData ? (
          <div className='w-full h-full gap-4 p-6 space-y-4'>
            {dashboardData.data.charts.map(chart => {
              const refinedata = {
                id: chart.widget_id,
                message_id: chart.message_id,
                text: chart.title,
                title: chart.title,
                chart_content: chart.chart_content,
                created_at: chart.created_at,
                sender: 'user',
              };
              return (
                <InvoiceView
                  key={chart.widget_id}
                  // hideViewAs
                  HideAddToDashboard
                  hideExtentView
                  showDelete
                  data={refinedata as ChatDetailMessage}
                  title={chart.title}
                  dashboardId={dashboardData.data.dashboard_id}
                  chartId={chart.widget_id}
                />
              );
            })}
          </div>
        ) : (
          <div className='text-center'>
            <div className='w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <div className='w-8 h-8 bg-neutral-300 rounded'></div>
            </div>
            <h3 className='text-lg font-medium text-neutral-ct-primary mb-2'>
              No Dashboard Selected
            </h3>
            <p className='text-neutral-ct-secondary text-sm'>
              Select a dashboard to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardView;
