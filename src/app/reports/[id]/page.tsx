'use client';

import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/dashboard-layout';
import InvoiceView from '@/components/common/invoice-view';
import Link from 'next/link';
import { useGetDashboardById } from '../../../hooks/queries';
import { ChatDetailMessage } from '../../../types/chat';

// Mock data for individual reports
const reportsData = {
  1: {
    id: 1,
    name: 'Sales Dashboard',
    defaultView: 'bar_chart',
    title: 'Sales Performance Overview',
  },
  2: {
    id: 2,
    name: 'Weekly Marketing',
    defaultView: 'line-chart',
    title: 'Weekly Marketing Metrics',
  },
  3: {
    id: 3,
    name: 'Monthly Report Dashboard',
    defaultView: 'table',
    title: 'Monthly Report Summary',
  },
  4: {
    id: 4,
    name: 'Daily Marketing Dashboard',
    defaultView: 'pie-chart',
    title: 'Daily Marketing Analytics',
  },
  5: {
    id: 5,
    name: 'Monthly Marketing Dashboard',
    defaultView: 'stacked-chart',
    title: 'Monthly Marketing Dashboard',
  },
  6: {
    id: 6,
    name: 'Yearly Marketing Dashboard',
    defaultView: 'grouped-chart',
    title: 'Yearly Marketing Overview',
  },
};

export default function ReportDetailPage() {
  const params = useParams();
  const { id } = params;
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useGetDashboardById(Number(id)!, !!id);

  return (
    <DashboardLayout>
      <div className='md:p-6 p-4'>
        <div className='mb-8'>
          <Link
            href={'/reports'}
            className='text-brand-ct-brand font-semibold tex-xs'
          >
            Back to All
          </Link>
          <h1 className='text-2xl font-bold text-neutral-ct-primary mt-1'>
            {dashboardData?.data.name}
          </h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {dashboardData?.data.charts.map(chart => {
            const refinedata = {
              message_id: chart.message_id,
              text: chart.title,
              chart_content: chart.chart_config,
              created_at: chart.created_at,
              sender: 'user',
            };
            return (
              <InvoiceView
                key={chart.widget_id}
                hideViewAs
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
      </div>
    </DashboardLayout>
  );
}
