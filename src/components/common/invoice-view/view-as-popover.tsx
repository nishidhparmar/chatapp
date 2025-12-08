import React from 'react';
import {
  ChevronDown,
  Check,
  Table,
  BarChart3,
  LineChart,
  PieChart,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { cn } from '../../../lib/utils';
import { VisualizationType, ViewAsMenuItem } from './types';

interface ViewAsPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultView: VisualizationType;
  onViewChange: (viewType: VisualizationType) => void;
  isChangingView: boolean;
  hideViewAs: boolean;
}

const ViewAsPopover: React.FC<ViewAsPopoverProps> = ({
  open,
  onOpenChange,
  defaultView,
  onViewChange,
  isChangingView,
  hideViewAs,
}) => {
  const viewAsMenuItems: ViewAsMenuItem[] = [
    {
      title: 'Table',
      icon: <Table className='h-4 w-4' />,
      value: 'table',
      onClick: () => onViewChange('table'),
    },
    {
      title: 'Bar Chart',
      icon: <BarChart3 className='h-4 w-4' />,
      value: 'bar_chart',
      onClick: () => onViewChange('bar_chart'),
    },
    {
      title: 'Line Chart',
      icon: <LineChart className='h-4 w-4' />,
      value: 'line_chart',
      onClick: () => onViewChange('line_chart'),
    },
    {
      title: 'Pie Chart',
      icon: <PieChart className='h-4 w-4' />,
      value: 'pie_chart',
      onClick: () => onViewChange('pie_chart'),
    },
    {
      title: 'Stacked Chart',
      icon: <BarChart3 className='h-4 w-4' />,
      value: 'stacked_chart',
      onClick: () => onViewChange('stacked_chart'),
    },
    {
      title: 'Grouped Chart',
      icon: <BarChart3 className='h-4 w-4' />,
      value: 'grouped_chart',
      onClick: () => onViewChange('grouped_chart'),
    },
    {
      title: 'Multi Line Chart',
      icon: <LineChart className='h-4 w-4' />,
      value: 'multi_line',
      onClick: () => onViewChange('multi_line'),
    },
  ];

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {!hideViewAs && (
        <PopoverTrigger asChild>
          <button
            className='px-3 py-1.5 text-xs cursor-pointer text-nowrap font-semibold text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={isChangingView}
          >
            {isChangingView ? 'Loading...' : 'View As'}
            <ChevronDown className='w-3 h-3 ml-1' />
          </button>
        </PopoverTrigger>
      )}
      <PopoverContent className='w-[180px] p-0' align='start' sideOffset={6}>
        {viewAsMenuItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              defaultView === item.value && 'bg-neutral-secondary',
              'w-full flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-neutral-secondary rounded-md transition-colors text-sm text-neutral-ct-primary disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            onClick={item.onClick}
            type='button'
            disabled={isChangingView}
          >
            <div className='flex items-center gap-2 text-xs'>
              <span className='text-neutral-ct-secondary flex items-center'>
                {item.icon}
              </span>
              <span>{item.title}</span>
            </div>
            {defaultView === item.value && (
              <Check className='h-4 w-4 text-neutral-ct-primary' />
            )}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default ViewAsPopover;
