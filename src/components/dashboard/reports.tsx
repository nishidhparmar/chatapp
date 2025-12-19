'use client';
import DashboardLayout from '../layout/dashboard-layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { ReportsListSkeleton } from '@/components/common/skeletons';
import { useGetDashboards } from '@/hooks/queries/dashboard/use-get-dashboards';
import type { DashboardListItem } from '@/types/dashboard';

const Reports = () => {
  const router = useRouter();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const { data: dashboardsResponse, isLoading, error } = useGetDashboards();

  const dashboards = dashboardsResponse?.data || [];

  const handleRowClick = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <DashboardLayout>
      <div className='md:p-8 p-4'>
        <h1 className='text-2xl font-bold text-neutral-ct-primary mb-6'>
          Dashboards
        </h1>

        <div className='bg-white rounded-lg border border-neutral-br-disabled overflow-hidden'>
          <div
            className={`${dashboards.length > 7 ? 'max-h-[500px] overflow-y-auto' : ''}`}
          >
            <Table className='min-w-[600px]'>
              <TableHeader className='sticky top-0 bg-white z-10'>
                <TableRow className='bg-neutral-disabled hover:bg-neutral-disabled'>
                  <TableHead className='text-xs font-semibold text-neutral-ct-primary w-[50%]'>
                    Name
                  </TableHead>
                  <TableHead className='text-xs font-semibold text-neutral-ct-primary w-[25%]'>
                    Last Viewed
                  </TableHead>
                  <TableHead className='text-xs font-semibold text-neutral-ct-primary w-[25%]'>
                    Date Created
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className='p-0'>
                      <ReportsListSkeleton count={6} />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className='text-center py-8 text-red-500'
                    >
                      Failed to load dashboards. Please try again.
                    </TableCell>
                  </TableRow>
                ) : dashboards.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className='text-center py-8 text-neutral-ct-secondary'
                    >
                      No dashboards found.
                    </TableCell>
                  </TableRow>
                ) : (
                  dashboards.map(
                    (dashboard: DashboardListItem, index: number) => (
                      <TableRow
                        key={dashboard.dashboard_id}
                        className={`cursor-pointer transition-colors ${
                          hoveredRow === index
                            ? 'bg-neutral-tertiary'
                            : 'hover:bg-neutral-tertiary'
                        }`}
                        onClick={() => handleRowClick(dashboard.dashboard_id)}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <TableCell className='text-sm font-normal text-neutral-ct-primary w-[50%]'>
                          {dashboard.name}
                        </TableCell>
                        <TableCell className='text-sm font-normal text-neutral-ct-primary w-[25%]'>
                          {dashboard.updated_at
                            ? formatDate(dashboard.updated_at)
                            : '-'}
                        </TableCell>
                        <TableCell className='text-sm font-normal text-neutral-ct-primary w-[25%]'>
                          {formatDate(dashboard.created_at)}
                        </TableCell>
                      </TableRow>
                    )
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
