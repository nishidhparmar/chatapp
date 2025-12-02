'use client';

import { notFound, useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/dashboard-layout';
import InvoiceView from '@/components/common/invoice-view';
import Link from 'next/link';

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
  // Handle if params.id may be string or string[]
  const reportId = Array.isArray(params.id) ? params.id[0] : params.id;
  const numericReportId = parseInt(reportId || '0');
  const report = reportsData[numericReportId as keyof typeof reportsData];

  if (!report) {
    notFound();
  }

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
            {report.name}
          </h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <InvoiceView
            defaultView='table'
            title='Data Table'
            hideViewAs
            HideAddToDashboard
            hideExtentView
            showDelete
          />
          <InvoiceView
            defaultView='bar_chart'
            title='Bar Chart'
            hideViewAs
            hideExtentView
            HideAddToDashboard
            showDelete
          />
          <InvoiceView
            defaultView='line_chart'
            title='Line Chart'
            hideViewAs
            HideAddToDashboard
            hideExtentView
            showDelete
          />
          <InvoiceView
            defaultView='pie_chart'
            title='Pie Chart'
            hideViewAs
            hideExtentView
            HideAddToDashboard
            showDelete
          />
          <InvoiceView
            defaultView='stacked_chart'
            title='Stacked Chart'
            hideViewAs
            hideExtentView
            HideAddToDashboard
            showDelete
          />
          <InvoiceView
            defaultView='grouped_chart'
            title='Grouped Chart'
            hideViewAs
            hideExtentView
            HideAddToDashboard
            showDelete
          />
          <InvoiceView
            defaultView='multi_line'
            title='Multi Line Chart'
            hideViewAs
            hideExtentView
            HideAddToDashboard
            showDelete
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
