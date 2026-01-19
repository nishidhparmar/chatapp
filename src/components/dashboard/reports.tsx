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
import { useDeleteDashboard } from '@/hooks/mutations/dashboard/use-delete-dashboard';
import type { DashboardListItem } from '@/types/dashboard';
import { Trash } from '../icons';
import DeleteDashboard from './delete-dashboard';

const Reports = () => {
  const router = useRouter();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [dashboardToDelete, setDashboardToDelete] =
    useState<DashboardListItem | null>(null);

  const { data: dashboardsResponse, isLoading, error } = useGetDashboards();
  const deleteDashboardMutation = useDeleteDashboard();

  const dashboards = dashboardsResponse?.data || [];

  const handleRowClick = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  const handleDeleteClick = (
    e: React.MouseEvent,
    dashboard: DashboardListItem
  ) => {
    e.stopPropagation(); // Prevent row click navigation
    setDashboardToDelete(dashboard);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!dashboardToDelete) return;

    try {
      await deleteDashboardMutation.mutateAsync(dashboardToDelete.dashboard_id);
      setDeleteModalOpen(false);
      setDashboardToDelete(null);
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setDashboardToDelete(null);
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
                  <TableHead className='text-xs font-semibold text-neutral-ct-primary w-[40%]'>
                    Name
                  </TableHead>
                  <TableHead className='text-xs font-semibold text-neutral-ct-primary w-[20%]'>
                    Last Viewed
                  </TableHead>
                  <TableHead className='text-xs font-semibold text-neutral-ct-primary w-[20%]'>
                    Date Created
                  </TableHead>
                  <TableHead className='text-xs font-semibold text-neutral-ct-primary w-[20%] text-center'>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className='p-0'>
                      <ReportsListSkeleton count={6} />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className='text-center py-8 text-red-500'
                    >
                      Failed to load dashboards. Please try again.
                    </TableCell>
                  </TableRow>
                ) : dashboards.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
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
                        <TableCell className='text-sm font-normal text-neutral-ct-primary w-[40%]'>
                          {dashboard.name}
                        </TableCell>
                        <TableCell className='text-sm font-normal text-neutral-ct-primary w-[20%]'>
                          {dashboard.updated_at
                            ? formatDate(dashboard.updated_at)
                            : '-'}
                        </TableCell>
                        <TableCell className='text-sm font-normal text-neutral-ct-primary w-[20%]'>
                          {formatDate(dashboard.created_at)}
                        </TableCell>
                        <TableCell className='w-[20%] text-center'>
                          <button
                            onClick={e => handleDeleteClick(e, dashboard)}
                            className='p-2 hover:bg-red-50 cursor-pointer rounded-md transition-colors group'
                            title='Delete dashboard'
                            aria-label={`Delete dashboard ${dashboard.name}`}
                          >
                            <Trash
                              size={16}
                              className='text-neutral-ct-secondary group-hover:text-red-500 transition-colors'
                            />
                          </button>
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

      <DeleteDashboard
        open={deleteModalOpen}
        onOpenChange={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteDashboardMutation.isPending}
        dashboardName={dashboardToDelete?.name}
      />
    </DashboardLayout>
  );
};

export default Reports;
