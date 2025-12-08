import React from 'react';
import { PieChart } from 'lucide-react';
import { PiPlusSquare } from 'react-icons/pi';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { cn } from '../../../lib/utils';
import { Clock } from '../../icons';
import { MenuItemProps } from './types';

interface AddPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToDashboard: () => void;
  onScheduleRecurring: () => void;
  hideAddToDashboard: boolean;
}

const AddPopover: React.FC<AddPopoverProps> = ({
  open,
  onOpenChange,
  onAddToDashboard,
  onScheduleRecurring,
  hideAddToDashboard,
}) => {
  const addMenuItems: MenuItemProps[] = [
    {
      title: 'Add to dashboard',
      icon: <PieChart className='h-4 w-4' />,
      onClick: () => {
        onAddToDashboard();
        onOpenChange(false);
      },
    },
    {
      title: 'Schedule recurring',
      icon: <Clock className='!text-neutral-ct-secondary' size={18} />,
      onClick: () => {
        onScheduleRecurring();
        onOpenChange(false);
      },
    },
  ];

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {!hideAddToDashboard && (
        <PopoverTrigger asChild>
          <button
            className={cn(
              open && '!text-brand-ct-brand',
              'h-8 w-8 flex cursor-pointer items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
            )}
          >
            <PiPlusSquare className='w-4 h-4' />
          </button>
        </PopoverTrigger>
      )}
      <PopoverContent className='w-[250px] p-0' align='start' sideOffset={6}>
        {addMenuItems.map((item, index) => (
          <button
            key={index}
            className='w-full flex items-center gap-2 px-3 py-2.5 hover:bg-neutral-secondary rounded-md transition-colors text-sm text-neutral-ct-primary'
            onClick={item.onClick}
            type='button'
          >
            <span className='text-neutral-ct-secondary flex items-center'>
              {item.icon}
            </span>
            <span>{item.title}</span>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default AddPopover;
