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
import { useGetSchedules } from '@/hooks/queries/schedule/use-get-schedules';
import { useCreateSchedule } from '@/hooks/mutations/schedule/use-create-schedule';
import type { ScheduleListItem, CreateSchedulePayload } from '@/types/schedule';
import ScheduleModal from './schedule-modal';

interface ScheduleRecurringProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messageId?: number;
  title?: string;
}

const ScheduleRecurring = ({
  open,
  onOpenChange,
  messageId,
  title,
}: ScheduleRecurringProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchedule, setSelectedSchedule] =
    useState<ScheduleListItem | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);

  // Fetch schedules from API
  const { data: schedulesResponse, isLoading: isLoadingSchedules } =
    useGetSchedules();
  const createScheduleMutation = useCreateSchedule();

  const schedules = schedulesResponse?.data || [];

  const filteredSchedules = schedules.filter(schedule =>
    schedule.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleScheduleSelect = (schedule: ScheduleListItem) => {
    setSelectedSchedule(schedule);
    setSearchTerm(schedule.title);
    setShowSuggestions(false);
  };

  const handleCreateRecurringReport = async () => {
    if (!selectedSchedule || !messageId) {
      return;
    }

    // Create payload using selected schedule data
    const payload: CreateSchedulePayload = {
      message_id: messageId,
      title: selectedSchedule.title,
      questions: selectedSchedule.questions,
      frequency_type: selectedSchedule.frequency_type as
        | 'daily'
        | 'weekly'
        | 'monthly',
      frequency_value: selectedSchedule.frequency_value,
      repeat_at: selectedSchedule.repeat_at,
      repeat_on: selectedSchedule.repeat_on || '',
      stopping_date: selectedSchedule.stopping_date ?? undefined,
      stopping_threshold: 0,
      notify_channels: selectedSchedule.notify_channels.filter(
        (channel): channel is 'in_app' | 'email' =>
          channel === 'in_app' || channel === 'email'
      ),
    };

    try {
      await createScheduleMutation.mutateAsync(payload);
      onOpenChange(false);
      // Reset state
      setSelectedSchedule(null);
      setSearchTerm('');
      setShowSuggestions(false);
    } catch (error) {
      console.error('Failed to create recurring report:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        {isCreatingSchedule ? (
          <ScheduleModal
            open={isCreatingSchedule}
            onOpenChange={() => setIsCreatingSchedule(false)}
            messageId={messageId}
            questions={[title || '']}
            onScheduleCreate={payload => {
              createScheduleMutation.mutate(payload);
              setIsCreatingSchedule(false);
            }}
            isLoading={createScheduleMutation.isPending}
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Schedule recurring report</DialogTitle>
            </DialogHeader>

            <div className='space-y-3'>
              <div className='relative'>
                <AuthInput
                  icon={IoSearchOutline}
                  iconClassName='text-neutral-ct-primary -mt-[1px]  text-neutral-ct-tertiary !h-4 !w-4'
                  className='pr-3 pl-8 py-2 max-h-8 w-full -mt-2.5 placeholder:!text-xs'
                  label=''
                  placeholder='Search existing schedules...'
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                />
                {showSuggestions && (
                  <div className='absolute top-full left-0 w-full bg-white border rounded-lg shadow-md mt-1 z-10'>
                    <div className='max-h-60 overflow-y-auto space-y-1'>
                      {isLoadingSchedules ? (
                        <div className='p-4 text-center text-sm text-neutral-tertiary'>
                          Loading schedules...
                        </div>
                      ) : schedules.length === 0 ? (
                        <div className='p-4 text-center text-sm text-neutral-tertiary'>
                          No existing schedules found. Create a new one below.
                        </div>
                      ) : filteredSchedules.length > 0 ? (
                        filteredSchedules.map(schedule => (
                          <div
                            key={schedule.schedule_id}
                            onMouseDown={e => e.preventDefault()}
                            className='flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer'
                            onClick={() => handleScheduleSelect(schedule)}
                          >
                            <div className='flex-1'>
                              <p className='text-sm text-neutral-ct-primary font-medium'>
                                {schedule.title}
                              </p>
                              <p className='text-xs text-neutral-ct-tertiary'>
                                {schedule.frequency_type} •{' '}
                                {schedule.frequency_value} time(s)
                              </p>
                            </div>
                            {selectedSchedule?.schedule_id ===
                              schedule.schedule_id && (
                              <div className='w-2 h-2 bg-blue-500 rounded-full' />
                            )}
                          </div>
                        ))
                      ) : (
                        <div className='p-4 text-center text-sm text-neutral-tertiary'>
                          No schedules match your search
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
                onClick={() => setIsCreatingSchedule(true)}
              >
                <Plus className='text-neutral-ct-primary -mr-1' /> New Recurring
                Report
              </Button>
              <Button
                type='submit'
                className='px-4 py-2 font-semibold'
                onClick={handleCreateRecurringReport}
                disabled={
                  !selectedSchedule ||
                  !messageId ||
                  createScheduleMutation.isPending
                }
              >
                {createScheduleMutation.isPending ? 'Creating...' : 'Continue'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleRecurring;
