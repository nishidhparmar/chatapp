import React, { useState, useRef, useEffect } from 'react';
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
  const modalContentContainerRef = useRef<HTMLDivElement | null>(null);
  const originalParentRef = useRef<Element | null>(null);
  const nextSiblingRef = useRef<Node | null>(null);

  // Move the real DOM node into the modal container when opening, and restore on close.
  useEffect(() => {
    const node = contentRef?.current;
    const modalContainer = modalContentContainerRef.current;

    if (isModalOpen && node && modalContainer) {
      // save original position
      originalParentRef.current = node.parentElement;
      nextSiblingRef.current = node.nextSibling;

      // append to modal container
      modalContainer.appendChild(node);

      // apply a helper class so we can enforce fullscreen styles if needed
      node.classList.add('maximized-content');
      // also ensure it stretches to container
      (node as HTMLElement).style.width = '100%';
      (node as HTMLElement).style.height = 'auto';
    }

    if (!isModalOpen && node && originalParentRef.current) {
      // restore to original place
      try {
        if (nextSiblingRef.current && originalParentRef.current) {
          originalParentRef.current.insertBefore(node, nextSiblingRef.current);
        } else if (originalParentRef.current) {
          originalParentRef.current.appendChild(node);
        }
      } catch (err) {
        // ignore restore errors
      }

      node.classList.remove('maximized-content');
      (node as HTMLElement).style.width = '';
      (node as HTMLElement).style.height = '';

      originalParentRef.current = null;
      nextSiblingRef.current = null;
    }

    // on unmount, attempt restore
    return () => {
      if (
        node &&
        originalParentRef.current &&
        !originalParentRef.current.contains(node)
      ) {
        try {
          if (nextSiblingRef.current && originalParentRef.current) {
            originalParentRef.current.insertBefore(
              node,
              nextSiblingRef.current
            );
          } else if (originalParentRef.current) {
            originalParentRef.current.appendChild(node);
          }
        } catch {}
      }
    };
  }, [isModalOpen, contentRef]);

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
        <div className='fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center'>
          <div className='relative bg-white  shadow-2xl w-full h-screen  overflow-hidden'>
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className='absolute top-4 right-4 border border-black/6 cursor-pointer z-10 h-8 w-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-colors'
            >
              <X className='h-4 w-4 text-gray-600' />
            </button>

            {/* Content Container - we will move the real DOM node here to preserve interactivity */}
            <div
              className='p-6 h-full overflow-auto flex justify-center items-center'
              ref={el => {
                modalContentContainerRef.current = el;
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MaximizePopover;
