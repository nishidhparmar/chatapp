'use client';

import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/dashboard-layout';
import InvoiceView from '@/components/common/invoice-view';
import Link from 'next/link';
import { useGetDashboardById } from '../../../hooks/queries';
import { ChatDetailMessage } from '../../../types/chat';

import Loading from '../../../components/common/loading';
import NoDataFound from '../../../components/icons/no-data-found';
import { VisualizationType } from '../../../components/common/invoice-view/types';

// Mock data for individual reports

export default function ReportDetailPage() {
  const params = useParams();
  const { id } = params;
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useGetDashboardById(Number(id)!, !!id);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className='flex justify-center items-center h-full'>
          <Loading />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !dashboardData?.data) {
    return (
      <DashboardLayout>
        <div className='md:p-6 p-4 h-[calc(100vh-52px)]'>
          <div className='mb-8'>
            <Link
              href={'/dashboard'}
              className='text-brand-ct-brand font-semibold tex-xs'
            >
              Back to All
            </Link>
          </div>
          <div className='flex h-full justify-center px-4 flex-col max-w-[410px] mx-auto text-center items-center'>
            <NoDataFound />
            <h1 className='mt-6 text-neutral-ct-primary font-semibold'>
              Nothing to see… yet
            </h1>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const hasCharts =
    dashboardData.data.charts && dashboardData.data.charts.length > 0;

  return (
    <DashboardLayout>
      <div className='md:p-6 p-4 '>
        <div className='mb-8'>
          <Link
            href={'/dashboard'}
            className='text-brand-ct-brand font-semibold tex-xs'
          >
            Back to All
          </Link>
          <h1 className='text-2xl font-bold text-neutral-ct-primary mt-1'>
            {dashboardData.data.name}
          </h1>
        </div>

        {!hasCharts ? (
          <div className='flex justify-center h-[calc(100vh-240px)] px-4 flex-col max-w-[410px] mx-auto text-center items-center'>
            <NoDataFound />
            <h1 className='mt-6 text-neutral-ct-primary font-semibold'>
              Nothing to see… yet
            </h1>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {dashboardData.data.charts.map(chart => {
              const refinedata: ChatDetailMessage = {
                id: chart.message_id,
                text: chart.title,
                chart_content: chart.chart_config,
                created_at: chart.created_at,
                chart_type: chart.chart_type as VisualizationType,
                sender: 'user',
                title: chart.title,
              };
              return (
                <InvoiceView
                  key={chart.widget_id}
                  HideAddToDashboard
                  hideExtentView
                  showDelete
                  data={refinedata}
                  defaultView={chart.chart_type as VisualizationType}
                  title={chart.title}
                  dashboardId={dashboardData.data.dashboard_id}
                  chartId={chart.widget_id}
                />
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
