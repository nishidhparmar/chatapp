import React from 'react';
import { Copy, Table } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { cn } from '../../../lib/utils';
import { MenuItemProps } from './types';

interface CopyPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CopyPopover: React.FC<CopyPopoverProps> = ({ open, onOpenChange }) => {
  const copyMenuItems: MenuItemProps[] = [
    {
      title: 'Copy as image',
      icon: <Copy className='h-4 w-4' />,
      onClick: () => {},
    },
    {
      title: 'Copy data',
      icon: <Table className='h-4 w-4' />,
      onClick: () => {
        console.log('Copy data');
        onOpenChange(false);
      },
    },
  ];

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            open && '!text-brand-ct-brand',
            'h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
          )}
        >
          <Copy className='w-3 h-3' />
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-[150px] p-0' align='start' sideOffset={6}>
        {copyMenuItems.map((item, index) => (
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

export default CopyPopover;
