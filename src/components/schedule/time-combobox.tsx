import { useState } from 'react';
import { TIMES } from '../../lib/utils/helper';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Input from '../ui/input';

interface TimeComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

function TimeCombobox({ value, onChange }: TimeComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const filtered = TIMES.filter(t =>
    t.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className='flex col-span-3 w-full items-center justify-between h-11 px-3 rounded-md border border-neutral-br-primary text-sm text-neutral-ct-primary'>
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
export default TimeCombobox;
