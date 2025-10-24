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

// Mock data for reports
const reportsData = [
  {
    id: 1,
    name: 'Sales Dashboard',
    lastViewed: 'Aug 10, 2025',
    dateCreated: 'Aug 15, 2025',
  },
  {
    id: 2,
    name: 'Weekly Marketing',
    lastViewed: 'Jul 5, 2025',
    dateCreated: 'Aug 28, 2025',
  },
  {
    id: 3,
    name: 'Monthly Report Dashboard',
    lastViewed: 'Jun 18, 2025',
    dateCreated: 'Sep 2, 2025',
  },
  {
    id: 4,
    name: 'Daily Marketing Dashboard',
    lastViewed: 'May 30, 2025',
    dateCreated: 'Sep 5, 2025',
  },
  {
    id: 5,
    name: 'Monthly Marketing Dashboard',
    lastViewed: 'May 12, 2025',
    dateCreated: 'Sep 2, 2025',
  },
  {
    id: 6,
    name: 'Yearly Marketing Dashboard',
    lastViewed: 'May 9, 2025',
    dateCreated: 'Aug 25, 2025',
  },
];

const Reports = () => {
  const router = useRouter();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

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
              {reportsData.map((report, index) => (
                <TableRow
                  key={report.id}
                  className={`cursor-pointer transition-colors ${
                    hoveredRow === index
                      ? 'bg-neutral-tertiary'
                      : 'hover:bg-neutral-tertiary'
                  }`}
                  onClick={() => handleRowClick(report.id)}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <TableCell className='text-sm font-normal text-neutral-ct-primary'>
                    {report.name}
                  </TableCell>
                  <TableCell className='text-sm font-normal text-neutral-ct-primary'>
                    {report.lastViewed}
                  </TableCell>
                  <TableCell className='text-sm font-normal text-neutral-ct-primary'>
                    {report.dateCreated}
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
