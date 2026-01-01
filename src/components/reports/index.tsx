'use client';

import { useState } from 'react';
import { Plus, Clock, Trash2 } from 'lucide-react';
import { AuthInput } from '../auth/common/auth-input';
import { PiWarningFill } from 'react-icons/pi';
import DashboardLayout from '../layout/dashboard-layout';
import { Edit } from '../icons';
import { Button } from '../ui/button';
import { useCreateReport } from '../../hooks/mutations/reports/use-create-report';
import { useUpdateReport } from '../../hooks/mutations/reports/use-update-report';
import { useDeleteReport } from '../../hooks/mutations/reports/use-delete-report';
import { useUpdateReportStatus } from '../../hooks/mutations/reports/use-update-report-status';
import { useUpdateReportQuestions } from '../../hooks/mutations/reports/use-update-report-questions';
import { useGetReportById } from '../../hooks/queries/reports/use-get-report-by-id';
import type {
  CreateReportPayload,
  ReportListItem,
  UpdateReportPayload,
} from '../../types/reports';
import { useGetReports } from '../../hooks/queries/reports/use-get-reports';
import { ScheduleListSkeleton } from '@/components/common/skeletons';
import ReportModal from './report-modal';
import DeleteRecurrence from './delete-recurrence';
import EditQuestionsModal from './edit-questions-modal';

const Reports = () => {
  const createReportMutation = useCreateReport();
  const updateReportMutation = useUpdateReport();
  const deleteReportMutation = useDeleteReport();
  const updateReportStatusMutation = useUpdateReportStatus();
  const updateReportQuestionsMutation = useUpdateReportQuestions();
  const { data: reports, isLoading: isLoadingReports } = useGetReports();

  const [newQuestions, setNewQuestions] = useState(['']);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [openDeleteRecurrence, setOpenDeleteRecurrence] = useState(false);
  const [editingReportId, setEditingReportId] = useState<number | null>(null);
  const [reportToDelete, setReportToDelete] = useState<number | null>(null);
  const [editQuestionsModalOpen, setEditQuestionsModalOpen] = useState(false);
  const [editingQuestionsReport, setEditingQuestionsReport] =
    useState<ReportListItem | null>(null);

  // Get report details when editing
  const { data: reportDetails } = useGetReportById(
    editingReportId || 0,
    !!editingReportId
  );

  const handleAddQuestionField = () => {
    setNewQuestions([...newQuestions, '']);
    setError('');
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...newQuestions];
    updated[index] = value;
    setNewQuestions(updated);
    if (error) setError('');
  };

  const handleRemoveQuestionField = (index: number) => {
    const updated = newQuestions.filter((_, i) => i !== index);
    setNewQuestions(updated);
    if (updated.length === 0 || updated.every(q => q === '')) {
    }
  };

  const handleSchedule = () => {
    const validQuestions = newQuestions.filter(q => q.trim() !== '');

    if (validQuestions.length === 0) {
      setError('Please enter at least one question before scheduling');
      return;
    }

    setReportModalOpen(true);
  };

  // Get valid questions for passing to modal
  const getValidQuestions = () => {
    return newQuestions.filter(q => q.trim() !== '');
  };

  // Check if schedule button should be enabled
  const isScheduleEnabled = () => {
    return newQuestions.some(q => q.trim() !== '');
  };

  // Helper function to format time to AM/PM format
  const formatTimeToAMPM = (timeString: string) => {
    try {
      // Parse the time string (assuming format like "14:30:00" or "14:30")
      const [hours, minutes] = timeString.split(':').map(Number);

      // Create a date object with the time
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);

      // Format to 12-hour format with AM/PM
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      // Fallback to original time string if parsing fails
      return timeString;
    }
  };

  // Format frequency display based on frequency_type
  const formatFrequencyDisplay = (item: ReportListItem) => {
    const { frequency_type, repeat_at, repeat_on } = item;

    switch (frequency_type?.toLowerCase()) {
      case 'daily':
        return `Daily ${formatTimeToAMPM(repeat_at)}`;
      case 'weekly':
        return `Weekly ${repeat_on || 'N/A'}`;
      case 'monthly':
        return `Monthly ${repeat_on || 'N/A'}`;
      default:
        return `${frequency_type} ${repeat_at}`;
    }
  };

  // Handle report creation
  const handleReportCreate = (payload: CreateReportPayload) => {
    createReportMutation.mutate(payload, {
      onSuccess: () => {
        // Reset state
        setNewQuestions(['']);
        setReportModalOpen(false);
        setError('');
      },
      onError: error => {
        console.error('Failed to create report:', error);
        setError('Failed to create report. Please try again.');
      },
    });
  };

  // Handle report update
  const handleReportUpdate = (payload: CreateReportPayload) => {
    if (!editingReportId) return;

    const updatePayload: UpdateReportPayload = {
      title: payload.title,
      questions: payload.questions,
      frequency_type: payload.frequency_type,
      frequency_value: payload.frequency_value,
      repeat_at: payload.repeat_at,
      repeat_on: payload.repeat_on,
      stopping_date: payload.stopping_date as string,
      stopping_threshold: payload.stopping_threshold,
      notify_channels: payload.notify_channels,
      is_active: true,
    };

    updateReportMutation.mutate(
      {
        reportId: editingReportId,
        payload: updatePayload,
      },
      {
        onSuccess: () => {
          // Reset state
          setReportModalOpen(false);
          setEditingReportId(null);
        },
        onError: error => {
          console.error('Failed to update report:', error);
          setError('Failed to update report. Please try again.');
        },
      }
    );
  };

  // Handle toggle pause/resume
  const _handleToggleStatus = (reportId: number, currentStatus: boolean) => {
    updateReportStatusMutation.mutate({
      reportId,
      isActive: !currentStatus,
    });
    // Error handling is done by the mutation's onError
  };

  const handleEdit = (id: number) => {
    setEditingReportId(id);
    setReportModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteClick = (id: number) => {
    setReportToDelete(id);
    setOpenDeleteRecurrence(true);
  };

  // Handle actual deletion
  const handleDeleteConfirm = () => {
    if (reportToDelete) {
      deleteReportMutation.mutate(reportToDelete, {
        onSuccess: () => {
          setOpenDeleteRecurrence(false);
          setReportToDelete(null);
        },
        // Error handling is done by the mutation's onError
      });
    }
  };

  // Handle delete modal close
  const handleDeleteCancel = () => {
    setOpenDeleteRecurrence(false);
    setReportToDelete(null);
  };

  // Handle edit questions
  const handleEditQuestions = (report: ReportListItem) => {
    setEditingQuestionsReport(report);
    setEditQuestionsModalOpen(true);
  };

  // Handle save questions
  const handleSaveQuestions = (questions: string[]) => {
    if (!editingQuestionsReport) return;

    updateReportQuestionsMutation.mutate(
      {
        reportId: editingQuestionsReport.report_id,
        questions,
      },
      {
        onSuccess: () => {
          setEditQuestionsModalOpen(false);
          setEditingQuestionsReport(null);
        },
        // Error handling is done by the mutation's onError
      }
    );
  };

  // Handle edit questions modal close
  const handleEditQuestionsCancel = () => {
    setEditQuestionsModalOpen(false);
    setEditingQuestionsReport(null);
  };

  return (
    <DashboardLayout>
      <div className='min-h-screen bg-gray-50 py-12 px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Title */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-semibold text-gray-900 mb-3'>
              Reports questions
            </h1>
            <p className='text-gray-600 text-base max-w-2xl mx-auto'>
              Schedule your chat questions once, and let them run on autopilot.
              Pick a time, choose your question, and we&apos;ll take care of the
              rest.
            </p>
          </div>

          {/* Input Card */}
          <div className='bg-white border border-gray-200 shadow-sm rounded-xl md:p-6 p-4 mb-8'>
            <div className='space-y-2 w-full'>
              {newQuestions.map((question, index) => (
                <div key={index} className='w-full flex items-center gap-5'>
                  <div className='w-full'>
                    <AuthInput
                      label=''
                      type='text'
                      value={question}
                      onChange={e =>
                        handleQuestionChange(index, e.target.value)
                      }
                      placeholder={
                        index === 0
                          ? 'Enter recurring question to begin'
                          : 'Add your question'
                      }
                      className='h-16 !px-4 !w-full'
                    />
                  </div>
                  {index > 0 && (
                    <button
                      onClick={() => handleRemoveQuestionField(index)}
                      className='text-error-ct-error transition-colors'
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}

              {(error || createReportMutation.isError) && (
                <div className='text-error-ct-error text-sm font-medium flex items-center gap-2'>
                  <PiWarningFill className='h-4 w-4' />
                  {error || 'Failed to create report. Please try again.'}
                </div>
              )}
            </div>

            <div className='flex justify-between md:flex-row flex-col gap-2 items-center mt-6'>
              <Button
                onClick={handleAddQuestionField}
                variant={'secondary'}
                className='md:w-max w-full'
              >
                <Plus size={20} />
                Add another question
              </Button>
              <Button
                onClick={handleSchedule}
                className='md:w-max w-full'
                disabled={!isScheduleEnabled()}
              >
                <Clock size={20} />
                Reports
              </Button>
            </div>
          </div>
          {/* Scheduled Reports Section */}
          {isLoadingReports ? (
            <div>
              <h2 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>
                Scheduled Reports
              </h2>
              <ScheduleListSkeleton count={3} />
            </div>
          ) : reports?.data && reports?.data?.length > 0 ? (
            <div>
              <h2 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>
                Scheduled Reports
              </h2>
              <div
                className={`space-y-2 sm:space-y-3 ${reports.data.length > 7 ? 'max-h-[500px] overflow-y-auto pr-2' : ''}`}
              >
                {reports?.data.map(item => (
                  <div
                    key={item.report_id}
                    className='bg-[#F5F5F5] rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#EBEBE7] transition-colors'
                  >
                    <div className='flex-1 space-y-1 min-w-0'>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <h3 className='text-sm  font-semibold text-gray-900 break-words'>
                          {item.title}
                        </h3>
                        {item.notification_count > 0 && (
                          <span className='inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-error-default text-white text-[10px] font-semibold flex-shrink-0'>
                            {item.notification_count}
                          </span>
                        )}
                        {!item.is_active && (
                          <span className='inline-flex items-center gap-1 rounded bg-gray-300 text-gray-900 text-xs font-semibold px-2 py-0.5 flex-shrink-0'>
                            Paused
                          </span>
                        )}
                      </div>
                      <p className='text-xs text-gray-600'>
                        {formatFrequencyDisplay(item)}
                      </p>
                    </div>
                    <div className='flex items-center gap-2 sm:gap-3 self-end sm:self-center flex-shrink-0'>
                      <button
                        onClick={() => handleEditQuestions(item)}
                        className='p-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors'
                        title='Edit Questions'
                        aria-label='Edit Questions'
                      >
                        <Plus size={16} className='sm:w-4 sm:h-4' />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item.report_id)}
                        className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                        title='Delete Report'
                        aria-label='Delete Report'
                      >
                        <Trash2
                          size={16}
                          className='sm:w-4 sm:h-4'
                          color='#75756F'
                        />
                      </button>
                      <button
                        onClick={() => handleEdit(item.report_id)}
                        className='p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-200 rounded-lg transition-colors'
                        title='Edit Report'
                        aria-label='Edit Report'
                      >
                        <Edit size={16} className='sm:w-4 sm:h-4' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {editingReportId && reportDetails ? (
        <ReportModal
          open={reportModalOpen}
          onOpenChange={open => {
            setReportModalOpen(open);
            if (!open) {
              setEditingReportId(null);
            }
          }}
          reportData={reportDetails as ReportListItem}
          onReportUpdate={handleReportUpdate}
          isLoading={updateReportMutation.isPending}
        />
      ) : (
        <ReportModal
          open={reportModalOpen}
          onOpenChange={open => {
            setReportModalOpen(open);
            if (!open) {
              setEditingReportId(null);
            }
          }}
          questions={getValidQuestions()}
          onReportCreate={handleReportCreate}
          isLoading={createReportMutation.isPending}
          messageId={0}
          title=''
        />
      )}
      <DeleteRecurrence
        open={openDeleteRecurrence}
        onOpenChange={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteReportMutation.isPending}
      />
      <EditQuestionsModal
        open={editQuestionsModalOpen}
        onOpenChange={handleEditQuestionsCancel}
        questions={editingQuestionsReport?.questions || []}
        onSave={handleSaveQuestions}
        isLoading={updateReportQuestionsMutation.isPending}
        title={editingQuestionsReport?.title || ''}
      />
    </DashboardLayout>
  );
};

export default Reports;
