import React from 'react';
import { Download } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { cn } from '../../../lib/utils';
import { Jpeg, Pdf, Png, Svg } from '../../icons';
import { MenuItemProps } from './types';

interface DownloadPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DownloadPopover: React.FC<DownloadPopoverProps> = ({
  open,
  onOpenChange,
}) => {
  const downloadMenuItems: MenuItemProps[] = [
    {
      title: 'SVG',
      icon: <Svg />,
      onClick: () => {},
    },
    {
      title: 'PNG',
      icon: <Png />,
      onClick: () => {},
    },
    {
      title: 'JPEG',
      icon: <Jpeg />,
      onClick: () => {},
    },
    {
      title: 'PDF',
      icon: <Pdf />,
      onClick: () => {},
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
          <Download className='w-3 h-3' />
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-[120px] p-0' align='start' sideOffset={6}>
        {downloadMenuItems.map((item, index) => (
          <button
            key={index}
            className='w-full flex cursor-pointer items-center gap-2 px-3 py-2.5 hover:bg-neutral-secondary rounded-md transition-colors text-sm text-neutral-ct-primary disabled:opacity-50 disabled:cursor-not-allowed'
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

export default DownloadPopover;
