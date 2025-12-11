import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CalendarIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AuthInput } from '../auth/common/auth-input';
import { Email } from '../icons';
import {
  convertTo12Hour,
  convertTo24Hour,
  formatDateToISO,
  parseWeeklyDays,
  WEEK_DAYS,
} from '../../lib/utils/helper';
import type { CreateSchedulePayload, ScheduleListItem } from '@/types/schedule';
import { useCurrentUser } from '../../hooks/use-current-user';
import TimeCombobox from './time-combobox';
import { Button } from '../ui/button';

interface CreateScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messageId?: number;
  title?: string;
  questions: string[];
  chatId?: number;
  isLoading?: boolean;
  onScheduleCreate: (payload: CreateSchedulePayload) => void;
}

interface EditScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleData: ScheduleListItem;
  isLoading?: boolean;
  onScheduleUpdate: (payload: CreateSchedulePayload) => void;
}

type ScheduleModalProps = CreateScheduleModalProps | EditScheduleModalProps;

// Helper function to check if props are for editing
const isEditMode = (
  props: ScheduleModalProps
): props is EditScheduleModalProps => {
  return 'scheduleData' in props && 'onScheduleUpdate' in props;
};

const ScheduleModal = (props: ScheduleModalProps) => {
  const { open, onOpenChange, isLoading = false } = props;
  const isEditing = isEditMode(props);
  const { user } = useCurrentUser();
  const [repeatEvery, setRepeatEvery] = useState('1');
  const [repeatUnit, setRepeatUnit] = useState('daily');
  const [time, setTime] = useState('9:00 AM');
  const [ends, setEnds] = useState<'never' | 'on' | 'after'>('never');
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Helper function to format date consistently
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Default date for placeholder
  const defaultDate = new Date('2025-10-17');

  const [afterTimes, setAfterTimes] = useState(30);
  const [selectedDays, setSelectedDays] = useState<string[]>(['monday']);
  const [monthlyDate, setMonthlyDate] = useState(1); // Store the day of month (1-31)
  const [notifyChannels, setNotifyChannels] = useState<('in_app' | 'email')[]>(
    []
  );

  useEffect(() => {
    if (isEditing) {
      const scheduleData = props.scheduleData;
      setRepeatEvery(String(scheduleData.frequency_value) || '1');
      setRepeatUnit(scheduleData.frequency_type || 'daily');
      setTime(convertTo12Hour(scheduleData.repeat_at || '09:00:00'));

      if (scheduleData.frequency_type === 'weekly' && scheduleData.repeat_on) {
        setSelectedDays(parseWeeklyDays(scheduleData.repeat_on));
      }

      if (scheduleData.frequency_type === 'monthly' && scheduleData.repeat_on) {
        // Parse the monthly date from repeat_on (expecting a number string like "15")
        const dateNum = parseInt(scheduleData.repeat_on);
        if (!isNaN(dateNum) && dateNum >= 1 && dateNum <= 31) {
          setMonthlyDate(dateNum);
        }
      }

      if (
        scheduleData.notify_channels &&
        Array.isArray(scheduleData.notify_channels)
      ) {
        setNotifyChannels(
          scheduleData.notify_channels.filter(
            (channel: string) => channel === 'in_app' || channel === 'email'
          )
        );
      }

      // Handle ends radio button prefilling based on API data
      if (
        scheduleData.stopping_threshold &&
        scheduleData.stopping_threshold > 0
      ) {
        setEnds('after');
        setAfterTimes(scheduleData.stopping_threshold);
      } else if (scheduleData.stopping_date) {
        setEnds('on');
        setEndDate(new Date(scheduleData.stopping_date));
      } else {
        setEnds('never');
      }
    } else {
      // Reset form for create mode
      setRepeatEvery('1');
      setRepeatUnit('daily');
      setTime('9:00 AM');
      setSelectedDays(['monday']);
      setMonthlyDate(1);
      setNotifyChannels([]);
      setEnds('never');
      setEndDate(undefined);
      setAfterTimes(30);
    }
  }, [isEditing, props]);

  const getQuestions = (): string[] => {
    if (isEditing) {
      const scheduleData = props.scheduleData;
      return scheduleData.questions || [];
    } else {
      return props.questions;
    }
  };

  // Get title based on mode
  const getTitle = (): string => {
    if (isEditing) {
      return props.scheduleData.title;
    } else {
      const questions = getQuestions();
      return (
        props.title ||
        (questions.length > 0 ? questions[0] : 'Scheduled Questions')
      );
    }
  };

  // Handle schedule creation/update
  const handleScheduleSubmit = () => {
    // Validation: Ensure at least one day is selected for weekly schedules
    if (repeatUnit === 'weekly' && selectedDays.length === 0) {
      alert('Please select at least one day for weekly schedules');
      return;
    }

    const questionsArray = getQuestions();
    const scheduleTitle = getTitle();

    const basePayload: CreateSchedulePayload = {
      message_id: isEditing ? undefined : props.messageId,
      title: scheduleTitle,
      questions: questionsArray,
      frequency_type: repeatUnit as 'daily' | 'weekly' | 'monthly',
      frequency_value: parseInt(repeatEvery),
      repeat_at: convertTo24Hour(time),
      repeat_on: '',
      stopping_threshold: 0,
      notify_channels: notifyChannels,
    };

    if (repeatUnit === 'weekly') {
      basePayload.repeat_on = selectedDays.join(',');
    } else if (repeatUnit === 'monthly') {
      basePayload.repeat_on = monthlyDate.toString();
    }

    if (ends === 'on' && endDate) {
      basePayload.stopping_date = formatDateToISO(endDate);
    } else if (ends === 'after') {
      basePayload.stopping_threshold = afterTimes;
    }

    if (isEditing) {
      props.onScheduleUpdate(basePayload);
    } else {
      props.onScheduleCreate(basePayload);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[434px]'>
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? 'Edit recurring question'
              : 'Set up recurring question'}
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-6 mt-2'>
          {/* Repeat every */}
          <div className='grid grid-cols-4 gap-2 items-center justify-between'>
            <div className='text-sm text-neutral-ct-primary items-start col-span-1'>
              Repeat every
            </div>
            <div className='col-span-3 grid grid-cols-2 gap-2'>
              <AuthInput
                label=''
                value={repeatEvery}
                onChange={e => setRepeatEvery(e.target.value)}
                className='!h-11 -mt-1.5 col-span-1 w-full'
                type='number'
              />
              <Select value={repeatUnit} onValueChange={setRepeatUnit}>
                <SelectTrigger className='w-full !h-11 col-span-1'>
                  <SelectValue placeholder='daily' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='daily'>daily</SelectItem>
                  <SelectItem value='weekly'>weekly</SelectItem>
                  <SelectItem value='monthly'>monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conditional rendering based on repeat unit */}
          {repeatUnit === 'weekly' && (
            <div className='grid grid-cols-4 items-center'>
              <div className='text-sm text-neutral-ct-primary'>Repeat on</div>
              <div className='flex gap-2 col-span-3'>
                {WEEK_DAYS.map(day => (
                  <button
                    key={day.key}
                    onClick={() => {
                      setSelectedDays(prev => {
                        const newDays = prev.includes(day.key)
                          ? prev.filter(d => d !== day.key)
                          : [...prev, day.key];
                        // Ensure at least one day is selected for weekly
                        return newDays.length === 0 ? [day.key] : newDays;
                      });
                    }}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                      selectedDays.includes(day.key)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {repeatUnit === 'monthly' && (
            <div className='grid grid-cols-4 gap-2 items-center justify-between'>
              <div className='text-sm text-neutral-ct-primary col-span-1'>
                On day
              </div>
              <div className='col-span-3'>
                <Select
                  value={monthlyDate.toString()}
                  onValueChange={value => setMonthlyDate(parseInt(value))}
                >
                  <SelectTrigger className='w-full !h-11'>
                    <SelectValue placeholder='Select day of month' />
                  </SelectTrigger>
                  <SelectContent className='max-h-60'>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                        {day === 1
                          ? 'st'
                          : day === 2
                            ? 'nd'
                            : day === 3
                              ? 'rd'
                              : 'th'}{' '}
                        of each month
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* At time (Combobox) */}
          <div className='grid grid-cols-4 gap-2 items-center justify-between'>
            <div className='text-sm text-neutral-ct-primary grid-cols-1'>
              at
            </div>
            <TimeCombobox value={time} onChange={setTime} />
          </div>

          {/* Ends */}
          <div className='space-y-5'>
            <div className='text-base font-semibold text-neutral-ct-primary'>
              Ends
            </div>
            <RadioGroup
              value={ends}
              onValueChange={(v: 'never' | 'on' | 'after') => {
                setEnds(v);
                // Set today's date when "on" is selected and no date is currently set
                if (v === 'on' && !endDate) {
                  setEndDate(new Date());
                }
              }}
            >
              <div
                className='flex items-center gap-2 cursor-pointer mb-2'
                onClick={() => setEnds('never')}
              >
                <RadioGroupItem value='never' />
                <span className='text-neutral-ct-primary text-sm'>Never</span>
              </div>

              <div className='grid grid-cols-3 items-center gap-2'>
                <div
                  className='col-span-1 flex gap-2 items-center cursor-pointer'
                  onClick={() => {
                    setEnds('on');
                    // Set today's date when "on" is selected and no date is currently set
                    if (!endDate) {
                      setEndDate(new Date());
                    }
                  }}
                >
                  <RadioGroupItem value='on' />
                  <span className='text-neutral-ct-primary text-sm'>On</span>
                </div>
                <div className='col-span-2'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className='flex items-center disabled:text-neutral-ct-placeholder justify-between w-full h-11 px-3 rounded-md border border-neutral-br-primary text-sm text-neutral-ct-primary'
                        disabled={ends !== 'on'}
                      >
                        {endDate
                          ? formatDate(endDate)
                          : ends === 'on'
                            ? formatDate(new Date())
                            : formatDate(defaultDate)}
                        <CalendarIcon className='h-4 w-4 opacity-50 ' />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align='start' className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={date =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className='grid grid-cols-3 items-center gap-2'>
                <div
                  className='col-span-1 flex gap-2 items-center cursor-pointer'
                  onClick={() => setEnds('after')}
                >
                  <RadioGroupItem value='after' />
                  <span className='text-neutral-ct-primary text-sm'>
                    After(Times)
                  </span>
                </div>
                <div className='col-span-2'>
                  <div className='relative'>
                    <AuthInput
                      label=''
                      value={afterTimes.toString()}
                      onChange={e => {
                        const value = parseInt(e.target.value) || 0;
                        setAfterTimes(value);
                      }}
                      className='!h-11 -mt-1.5 w-full disabled:bg-transparent :disabled:text-neutral-ct-placeholder'
                      type='number'
                      placeholder='30'
                      disabled={ends !== 'after'}
                    />
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Get updates */}
          <div>
            <div className='text-base font-semibold text-neutral-ct-primary'>
              Get updates (optional)
            </div>
            <div className='mt-3 space-y-2'>
              {/* Email Channel */}
              <div
                className={`p-3 text-xs rounded-xl flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                  notifyChannels.includes('email')
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-neutral-secondary hover:bg-neutral-tertiary'
                }`}
                onClick={() => {
                  setNotifyChannels(prev =>
                    prev.includes('email')
                      ? prev.filter(channel => channel !== 'email')
                      : [...prev, 'email']
                  );
                }}
              >
                <div className='flex items-center gap-2'>
                  <Email size={18} className='text-neutral-ct-tertiary' />
                  <p className='font-semibold text-neutral-ct-primary'>Email</p>
                  <p className='text-neutral-ct-disabled'>{user?.email}</p>
                </div>
                {notifyChannels.includes('email') && (
                  <div className='w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center'>
                    <svg
                      className='w-3 h-3 text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 '>
          <div className='flex justify-between items-center'>
            <div />
            {isEditing && (
              <div className='flex items-center gap-2'>
                {/* <Button
                  variant='outline'
                  className='!p-2 border-none  max-h-8 text-xs text-error-ct-error hover:!text-error-ct-error hover:bg-transparent'
                >
                  <Trash size={16} className='-mr-1' />
                  Cancel
                </Button> */}
                {/* <Button
                variant='outline'
                className='!p-2 border-none max-h-8 text-xs text-brand-ct-brand hover:!text-brand-ct-brand hover:bg-transparent'
              >
                <Play size={16} className='text-brand-ct-brand -mr-1' />
                Pause
              </Button> */}
              </div>
            )}
            <div className='flex items-center gap-2'>
              {/* <Button
                variant='secondary'
                className='!px-4 !py-2 max-h-8 text-xs '
              >
                Back
              </Button> */}
              <Button
                className='!px-4 !py-2 max-h-8 text-xs'
                onClick={handleScheduleSubmit}
                disabled={isLoading}
              >
                {isLoading
                  ? isEditing
                    ? 'Updating...'
                    : 'Creating...'
                  : isEditing
                    ? 'Update Schedule'
                    : 'Schedule'}
              </Button>
            </div>
          </div>
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;
