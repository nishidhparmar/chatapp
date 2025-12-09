'use client';

import { useState } from 'react';
import { Plus, Clock, Trash2 } from 'lucide-react';
import { AuthInput } from '../auth/common/auth-input';
import { PiWarningFill } from 'react-icons/pi';
import DashboardLayout from '../layout/dashboard-layout';
import { Edit, Play, Stop } from '../icons';
import ScheduleModal from './schedule-modal';
import { Button } from '../ui/Button';
import DeleteRecurrence from './delete-recurrence';
import { useCreateSchedule } from '../../hooks/mutations/schedule/use-create-schedule';
import { useUpdateSchedule } from '../../hooks/mutations/schedule/use-update-schedule';
import { useDeleteSchedule } from '../../hooks/mutations/schedule/use-delete-schedule';
import { useGetScheduleById } from '../../hooks/queries/schedule/use-get-schedule-by-id';
import type {
  CreateSchedulePayload,
  ScheduleListItem,
  UpdateSchedulePayload,
} from '../../types/schedule';
import { useGetSchedules } from '../../hooks/queries/schedule/use-get-schedules';
import { ScheduleListSkeleton } from '@/components/common/skeletons';

const Schedule = () => {
  const createScheduleMutation = useCreateSchedule();
  const updateScheduleMutation = useUpdateSchedule();
  const deleteScheduleMutation = useDeleteSchedule();
  const { data: schedules, isLoading: isLoadingSchedules } = useGetSchedules();

  const [newQuestions, setNewQuestions] = useState(['']);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [openDeleteRecurrence, setOpenDeleteRecurrence] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState<number | null>(
    null
  );
  const [scheduleToDelete, setScheduleToDelete] = useState<number | null>(null);

  // Get schedule details when editing
  const { data: scheduleDetails } = useGetScheduleById(
    editingScheduleId || 0,
    !!editingScheduleId
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

    setScheduleModalOpen(true);
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
  const formatFrequencyDisplay = (item: ScheduleListItem) => {
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

  // Handle schedule creation
  const handleScheduleCreate = async (payload: CreateSchedulePayload) => {
    try {
      await createScheduleMutation.mutateAsync(payload);

      // Reset state
      setNewQuestions(['']);
      setScheduleModalOpen(false);
      setError('');
    } catch (error) {
      console.error('Failed to create schedule:', error);
      setError('Failed to create schedule. Please try again.');
    }
  };

  // Handle schedule update
  const handleScheduleUpdate = async (payload: CreateSchedulePayload) => {
    try {
      if (!editingScheduleId) return;

      const updatePayload: UpdateSchedulePayload = {
        title: payload.title,
        questions: payload.questions,
        frequency_type: payload.frequency_type,
        frequency_value: payload.frequency_value,
        repeat_at: payload.repeat_at,
        repeat_on: payload.repeat_on,
        stopping_date: payload.stopping_date,
        stopping_threshold: payload.stopping_threshold,
        notify_channels: payload.notify_channels,
        is_active: true,
      };

      await updateScheduleMutation.mutateAsync({
        scheduleId: editingScheduleId,
        payload: updatePayload,
      });

      // Reset state
      setScheduleModalOpen(false);
      setEditingScheduleId(null);
    } catch (error) {
      console.error('Failed to update schedule:', error);
      setError('Failed to update schedule. Please try again.');
    }
  };

  // const handleTogglePause = (id: number) => {
  //   setQuestions(
  //     questions.map(q => (q.id === id ? { ...q, isPaused: !q.isPaused } : q))
  //   );
  // };

  const handleEdit = (id: number) => {
    setEditingScheduleId(id);
    setScheduleModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteClick = (id: number) => {
    setScheduleToDelete(id);
    setOpenDeleteRecurrence(true);
  };

  // Handle actual deletion
  const handleDeleteConfirm = async () => {
    if (scheduleToDelete) {
      try {
        await deleteScheduleMutation.mutateAsync(scheduleToDelete);
        setOpenDeleteRecurrence(false);
        setScheduleToDelete(null);
      } catch (error) {
        console.error('Failed to delete schedule:', error);
        // You might want to show an error message to the user
      }
    }
  };

  // Handle delete modal close
  const handleDeleteCancel = () => {
    setOpenDeleteRecurrence(false);
    setScheduleToDelete(null);
  };

  return (
    <DashboardLayout>
      <div className='min-h-screen bg-gray-50 py-12 px-4'>
        <div className='max-w-5xl mx-auto'>
          {/* Title */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-semibold text-gray-900 mb-3'>
              Schedule questions
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

              {(error || createScheduleMutation.isError) && (
                <div className='text-error-ct-error text-sm font-medium flex items-center gap-2'>
                  <PiWarningFill className='h-4 w-4' />
                  {error || 'Failed to create schedule. Please try again.'}
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
                Schedule
              </Button>
            </div>
          </div>
          {/* Scheduled Chats Section */}
          {isLoadingSchedules ? (
            <div>
              <h2 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>
                Schedule Chats
              </h2>
              <ScheduleListSkeleton count={3} />
            </div>
          ) : schedules?.data && schedules?.data?.length > 0 ? (
            <div>
              <h2 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>
                Schedule Chats
              </h2>
              <div className='space-y-2 sm:space-y-3'>
                {schedules?.data.map(item => (
                  <div
                    key={item.schedule_id}
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
                        onClick={() => handleDeleteClick(item.schedule_id)}
                        className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                        title='Delete'
                        aria-label='Delete'
                      >
                        <Trash2 size={16} className='sm:w-4 sm:h-4' />
                      </button>
                      <button
                        // onClick={() => handleTogglePause(item.id)}
                        className='p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-200 rounded-lg transition-colors'
                        title={item.is_active ? 'Resume' : 'Pause'}
                        aria-label={item.is_active ? 'Resume' : 'Pause'}
                      >
                        {item.is_active ? (
                          <Play size={18} className='sm:w-[18px] sm:h-[18px]' />
                        ) : (
                          <Stop size={18} className='sm:w-[18px] sm:h-[18px]' />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(item.schedule_id)}
                        className='p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-200 rounded-lg transition-colors'
                        title='Edit'
                        aria-label='Edit'
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
      {editingScheduleId && scheduleDetails ? (
        <ScheduleModal
          open={scheduleModalOpen}
          onOpenChange={open => {
            setScheduleModalOpen(open);
            if (!open) {
              setEditingScheduleId(null);
            }
          }}
          scheduleData={scheduleDetails as ScheduleListItem}
          onScheduleUpdate={handleScheduleUpdate}
          isLoading={updateScheduleMutation.isPending}
        />
      ) : (
        <ScheduleModal
          open={scheduleModalOpen}
          onOpenChange={open => {
            setScheduleModalOpen(open);
            if (!open) {
              setEditingScheduleId(null);
            }
          }}
          questions={getValidQuestions()}
          onScheduleCreate={handleScheduleCreate}
          isLoading={createScheduleMutation.isPending}
          messageId={0}
          title=''
        />
      )}
      <DeleteRecurrence
        open={openDeleteRecurrence}
        onOpenChange={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteScheduleMutation.isPending}
      />
    </DashboardLayout>
  );
};

export default Schedule;
