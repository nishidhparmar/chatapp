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
import { useGetDashboards } from '../../hooks/queries/dashboard/use-get-dashboards';

const Reports = () => {
  const router = useRouter();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const getDashBoardListQuery = useGetDashboards();

  const handleRowClick = (id: number) => {
    router.push(`/reports/${id}`);
  };

  return (
    <DashboardLayout>
      <div className='md:p-8 p-4'>
        <h1 className='text-2xl font-bold text-neutral-ct-primary mb-6'>
          Dashboards
        </h1>

        <div className='bg-white rounded-lg border border-neutral-br-disabled overflow-hidden'>
          <Table className='min-w-[600px] overflow-auto'>
            <TableHeader>
              <TableRow className='bg-neutral-disabled hover:bg-neutral-disabled'>
                <TableHead className='text-xs font-semibold text-neutral-ct-primary'>
                  Name
                </TableHead>
                <TableHead className='text-xs font-semibold text-neutral-ct-primary'>
                  Last Viewed
                </TableHead>
                <TableHead className='text-xs font-semibold text-neutral-ct-primary'>
                  Date Created
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getDashBoardListQuery.isLoading
                ? 'Loading...'
                : getDashBoardListQuery.data?.data.map((report, index) => (
                    <TableRow
                      key={report.dashboard_id}
                      className={`cursor-pointer transition-colors ${
                        hoveredRow === index
                          ? 'bg-neutral-tertiary'
                          : 'hover:bg-neutral-tertiary'
                      }`}
                      onClick={() => handleRowClick(report.dashboard_id)}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <TableCell className='text-sm font-normal text-neutral-ct-primary'>
                        {report.name}
                      </TableCell>
                      <TableCell className='text-sm font-normal text-neutral-ct-primary'>
                        {report.updated_at}
                      </TableCell>
                      <TableCell className='text-sm font-normal text-neutral-ct-primary'>
                        {report.created_at}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
