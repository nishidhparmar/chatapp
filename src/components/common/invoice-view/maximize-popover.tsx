import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const maximizeMenuItems: MenuItemProps[] = [
    {
      title: 'Expand view',
      icon: <Maximize2 className='h-4 w-4' />,
      onClick: () => {
        setIsModalOpen(true);
        onOpenChange(false);
      },
    },
  ];

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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

      {/* Fullscreen Modal Overlay */}
      {isModalOpen && (
        <div className='fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4'>
          <div className='relative bg-white rounded-lg shadow-2xl max-w-6xl max-h-[90vh] w-full overflow-hidden'>
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className='absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-colors'
            >
              <X className='h-4 w-4 text-gray-600' />
            </button>

            {/* Content Container */}
            <div className='p-6 h-full overflow-auto'>
              {contentRef.current && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: contentRef.current.innerHTML,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MaximizePopover;
