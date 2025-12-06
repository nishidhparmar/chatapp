import React from 'react';
import { Maximize2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { cn } from '../../../lib/utils';
import { MenuItemProps } from './types';

interface MaximizePopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
  hideExtentView: boolean;
}

const MaximizePopover: React.FC<MaximizePopoverProps> = ({
  open,
  onOpenChange,
  contentRef,
  hideExtentView,
}) => {
  const maximizeMenuItems: MenuItemProps[] = [
    {
      title: 'Full screen',
      icon: <Maximize2 className='h-4 w-4' />,
      onClick: () => {
        if (contentRef.current) {
          contentRef.current.requestFullscreen?.();
        }
        onOpenChange(false);
      },
    },
    {
      title: 'Expand view',
      icon: <Maximize2 className='h-4 w-4' />,
      onClick: () => {
        console.log('Expand view');
        onOpenChange(false);
      },
    },
  ];

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {!hideExtentView && (
        <PopoverTrigger asChild>
          <button
            className={cn(
              open && '!text-brand-ct-brand',
              'h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
            )}
          >
            <Maximize2 className='w-3 h-3' />
          </button>
        </PopoverTrigger>
      )}
      <PopoverContent className='w-[150px] p-0' align='start' sideOffset={6}>
        {maximizeMenuItems.map((item, index) => (
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

export default MaximizePopover;
