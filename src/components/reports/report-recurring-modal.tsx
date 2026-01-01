'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '../ui/button';
import { AuthInput } from '../auth/common/auth-input';
import { Plus } from 'lucide-react';
import { IoSearchOutline } from 'react-icons/io5';
import { useGetReports } from '@/hooks/queries/reports/use-get-reports';
import { useCreateReport } from '@/hooks/mutations/reports/use-create-report';
import type { ReportListItem, CreateReportPayload } from '@/types/reports';
import ReportModal from './report-modal';

interface ReportRecurringProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messageId?: number;
  title?: string;
}

const ReportRecurring = ({
  open,
  onOpenChange,
  messageId,
  title,
}: ReportRecurringProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<ReportListItem | null>(
    null
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCreatingReport, setIsCreatingReport] = useState(false);

  // Fetch reports from API
  const { data: reportsResponse, isLoading: isLoadingReports } =
    useGetReports();
  const createReportMutation = useCreateReport();

  const reports = reportsResponse?.data || [];

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Only show suggestions when input has content or is actively being used
    setShowSuggestions(value.length > 0 || document.activeElement === e.target);
  };

  const handleReportSelect = (report: ReportListItem) => {
    setSelectedReport(report);
    setSearchTerm(report.title);
    setShowSuggestions(false);
  };

  const handleCreateRecurringReport = () => {
    if (!selectedReport || !messageId) {
      return;
    }

    // Create payload using selected report data
    const payload: CreateReportPayload = {
      message_id: messageId,
      title: selectedReport.title,
      questions: selectedReport.questions,
      frequency_type: selectedReport.frequency_type as
        | 'daily'
        | 'weekly'
        | 'monthly',
      frequency_value: selectedReport.frequency_value,
      repeat_at: selectedReport.repeat_at,
      repeat_on: selectedReport.repeat_on || '',
      stopping_date: selectedReport.stopping_date ?? undefined,
      stopping_threshold: 0,
      notify_channels: selectedReport.notify_channels.filter(
        (channel): channel is 'in_app' | 'email' =>
          channel === 'in_app' || channel === 'email'
      ),
    };

    createReportMutation.mutate(payload, {
      onSuccess: () => {
        onOpenChange(false);
        // Reset state
        setSelectedReport(null);
        setSearchTerm('');
        setShowSuggestions(false);
      },
      // Error handling is done by the mutation's onError
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        {isCreatingReport ? (
          <ReportModal
            open={isCreatingReport}
            onOpenChange={() => setIsCreatingReport(false)}
            messageId={messageId}
            questions={[title || '']}
            onReportCreate={payload => {
              createReportMutation.mutate(payload);
              setIsCreatingReport(false);
            }}
            isLoading={createReportMutation.isPending}
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Reports recurring report</DialogTitle>
            </DialogHeader>

            <div className='space-y-3'>
              <div className='relative'>
                <AuthInput
                  icon={IoSearchOutline}
                  iconClassName='text-neutral-ct-primary -mt-[1px]  text-neutral-ct-tertiary !h-4 !w-4'
                  className='pr-3 pl-8 py-2 max-h-8 w-full -mt-2.5 placeholder:!text-xs'
                  label=''
                  placeholder='Search existing reports...'
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    // Only show suggestions if there's content or reports available
                    if (searchTerm.length > 0 || reports.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  tabIndex={-1}
                />
                {showSuggestions && (
                  <div className='absolute top-full left-0 w-full bg-white border rounded-lg shadow-md mt-1 z-10'>
                    <div className='max-h-60 overflow-y-auto space-y-1'>
                      {isLoadingReports ? (
                        <div className='p-4 text-center text-sm text-neutral-tertiary'>
                          Loading reports...
                        </div>
                      ) : reports.length === 0 ? (
                        <div className='p-4 text-center text-sm text-neutral-tertiary'>
                          No existing reports found. Create a new one below.
                        </div>
                      ) : filteredReports.length > 0 ? (
                        filteredReports.map(report => (
                          <div
                            key={report.report_id}
                            onMouseDown={e => e.preventDefault()}
                            className='flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer'
                            onClick={() => handleReportSelect(report)}
                          >
                            <div className='flex-1'>
                              <p className='text-sm text-neutral-ct-primary font-medium'>
                                {report.title}
                              </p>
                              <p className='text-xs text-neutral-ct-tertiary'>
                                {report.frequency_type} •{' '}
                                {report.frequency_value} time(s)
                              </p>
                            </div>
                            {selectedReport?.report_id === report.report_id && (
                              <div className='w-2 h-2 bg-blue-500 rounded-full' />
                            )}
                          </div>
                        ))
                      ) : (
                        <div className='p-4 text-center text-sm text-neutral-tertiary'>
                          No reports match your search
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='flex justify-between mt-4'>
              <Button
                variant='secondary'
                className='px-4 py-2'
                onClick={() => setIsCreatingReport(true)}
              >
                <Plus className='text-neutral-ct-primary -mr-1' /> New Recurring
                Report
              </Button>
              <Button
                type='submit'
                className='px-4 py-2 font-semibold'
                onClick={handleCreateRecurringReport}
                disabled={
                  !selectedReport ||
                  !messageId ||
                  createReportMutation.isPending
                }
              >
                {createReportMutation.isPending ? 'Creating...' : 'Continue'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportRecurring;
