import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
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
import { useState } from 'react';
import { AuthInput } from '../auth/common/auth-input';
import WhatsApp from '../icons/Whatsapp';
import { GoMail } from 'react-icons/go';
import { Play, Trash } from '../icons';

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ScheduleModal = ({ open, onOpenChange }: ScheduleModalProps) => {
  const [repeatEvery, setRepeatEvery] = useState('1');
  const [repeatUnit, setRepeatUnit] = useState('day');
  const [time, setTime] = useState('9:00 AM');
  const [ends, setEnds] = useState<'never' | 'on' | 'after'>('never');
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [afterTimes, setAfterTimes] = useState('30');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[434px]'>
        <DialogHeader>
          <DialogTitle>Set up recurring question</DialogTitle>
        </DialogHeader>
        <div className='space-y-6 mt-2'>
          {/* Repeat every */}
          <div className='grid grid-cols-3 gap-2 items-center justify-between'>
            <div className='text-sm text-neutral-ct-primary items-start col-span-1'>
              Repeat every
            </div>
            <div className='col-span-2 grid grid-cols-2 gap-2'>
              <AuthInput
                label=''
                value={repeatEvery}
                onChange={e => setRepeatEvery(e.target.value)}
                className='!h-11 -mt-1.5 col-span-1 w-full'
                type='number'
              />
              <Select value={repeatUnit} onValueChange={setRepeatUnit}>
                <SelectTrigger className='w-full !h-11 col-span-1'>
                  <SelectValue placeholder='day' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='day'>day</SelectItem>
                  <SelectItem value='week'>week</SelectItem>
                  <SelectItem value='month'>month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* At time (Combobox) */}
          <div className='grid grid-cols-3 gap-2 items-center justify-between'>
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
              onValueChange={(v: 'never' | 'on' | 'after') => setEnds(v)}
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
                  onClick={() => setEnds('on')}
                >
                  <RadioGroupItem value='on' />
                  <span className='text-neutral-ct-primary text-sm'>On</span>
                </div>
                <div className='col-span-2'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className='flex items-center justify-between w-full h-11 px-3 rounded-md border border-neutral-br-primary text-sm text-neutral-ct-primary'
                        disabled={ends !== 'on'}
                      >
                        {endDate
                          ? endDate.toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'October 17, 2025'}
                        <CalendarIcon className='h-4 w-4 opacity-50' />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align='start' className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={endDate}
                        onSelect={setEndDate}
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
                  <span className='text-neutral-ct-primary text-sm'>After</span>
                </div>
                <div className='col-span-2'>
                  <AuthInput
                    label=''
                    value={`${afterTimes} times`}
                    onChange={e => {
                      const value = e.target.value.replace(' times', '');
                      setAfterTimes(value);
                    }}
                    className='!h-11 -mt-1.5 w-full'
                    type='text'
                    placeholder='30 times'
                  />
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
              <div className='p-3 text-xs rounded-xl bg-neutral-secondary flex items-center gap-2'>
                <WhatsApp size={16} />
                <p className='font-semibold text-neutral-ct-primary'>
                  WhatsApp
                </p>
                <p className='text-neutral-ct-disabled'>+16472198232</p>
              </div>
              <div className='p-3 text-xs rounded-xl bg-neutral-secondary flex items-center gap-2'>
                <GoMail size={16} className='text-neutral-ct-tertiary' />
                <p className='font-semibold text-neutral-ct-primary'>Email</p>
                <p className='text-neutral-ct-disabled'>
                  johnwick@acmecorp.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 '>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='!p-2 border-none  max-h-8 text-xs text-error-ct-error hover:!text-error-ct-error hover:bg-transparent'
              >
                <Trash size={16} className='-mr-1' />
                Cancel
              </Button>
              <Button
                variant='outline'
                className='!p-2 border-none max-h-8 text-xs text-brand-ct-brand hover:!text-brand-ct-brand hover:bg-transparent'
              >
                <Play size={16} className='text-brand-ct-brand -mr-1' />
                Pause
              </Button>
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant='secondary'
                className='!px-4 !py-2 max-h-8 text-xs '
              >
                Back
              </Button>
              <Button className='!px-4 !py-2 max-h-8 text-xs'>Schedule</Button>
            </div>
          </div>
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;

// Local combobox for selecting time using existing Popover + Input
interface TimeComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

const TIMES = [
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
];

function TimeCombobox({ value, onChange }: TimeComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const filtered = TIMES.filter(t =>
    t.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className='flex col-span-2 w-full items-center justify-between h-11 px-3 rounded-md border border-neutral-br-primary text-sm text-neutral-ct-primary'>
          {value || 'Select time'}
          <svg
            className='size-4 opacity-50'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6 9l6 6 6-6'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent align='start' className='p-0 w-64'>
        <div className='p-2 border-b'>
          <Input
            placeholder='Search time...'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='h-9'
          />
        </div>
        <div className='max-h-56 overflow-y-auto p-1'>
          {filtered.map(t => (
            <button
              key={t}
              className={`w-full text-left text-sm px-2 py-2 rounded-md hover:bg-accent ${t === value ? 'bg-accent' : ''}`}
              onClick={() => {
                onChange(t);
                setOpen(false);
              }}
            >
              {t}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className='text-sm text-neutral-ct-secondary px-3 py-4'>
              No results
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
