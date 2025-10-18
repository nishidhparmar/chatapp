import {
  ChevronDown,
  Copy,
  Download,
  Maximize2,
  Table,
  BarChart3,
  LineChart,
  PieChart,
  Check,
} from 'lucide-react';
import InvoiceViewTable from './table';
import { PiPlusSquare } from 'react-icons/pi';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { cn } from '../../../lib/utils';
import { Clock, Jpeg, Pdf, Png, Svg, Trash } from '../../icons';
import {
  DonutChart,
  LineChartComp,
  SimpleChart,
  StackedChart,
  GroupedChart,
} from '../charts';
import MultiLineChart from '../charts/multi-line';
import AddToDashboard from '../../reports/add-to-dashboard';

// Placeholder components for different chart views

interface InvoiceViewProps {
  defaultView?: string;
  title?: string;
  hideViewAs?: boolean;
  HideAddToDashboard?: boolean;
  showDelete?: boolean;
  hideExtentView?: boolean;
}

const InvoiceView: React.FC<InvoiceViewProps> = ({
  defaultView: propDefaultView = 'table',
  title = 'Open Invoices by Customer',
  hideViewAs = false,
  HideAddToDashboard = false,
  showDelete = false,
  hideExtentView = false,
}) => {
  const [defaultView, setDefaultView] = useState(propDefaultView);
  const [openViewAsPopover, setOpenViewAsPopover] = useState(false);
  const [openDownloadPopover, setOpenDownloadPopover] = useState(false);
  const [openCopyPopover, setOpenCopyPopover] = useState(false);
  const [openAddPopover, setOpenAddPopover] = useState(false);
  const [openMaximizePopover, setOpenMaximizePopover] = useState(false);
  const [openAddTodashboardModal, setOpenAddTodashboard] = useState(false);

  // View As menu items
  const viewAsMenuItems = [
    {
      title: 'Table',
      icon: <Table className='h-4 w-4' />,
      value: 'table',
      onClick: () => {
        setDefaultView('table');
        setOpenViewAsPopover(false);
      },
    },
    {
      title: 'Bar Chart',
      icon: <BarChart3 className='h-4 w-4' />,
      value: 'bar-chart',
      onClick: () => {
        setDefaultView('bar-chart');
        setOpenViewAsPopover(false);
      },
    },
    {
      title: 'Line Chart',
      icon: <LineChart className='h-4 w-4' />,
      value: 'line-chart',
      onClick: () => {
        setDefaultView('line-chart');
        setOpenViewAsPopover(false);
      },
    },
    {
      title: 'Pie Chart',
      icon: <PieChart className='h-4 w-4' />,
      value: 'pie-chart',
      onClick: () => {
        setDefaultView('pie-chart');
        setOpenViewAsPopover(false);
      },
    },
    {
      title: 'Stacked Chart',
      icon: <BarChart3 className='h-4 w-4' />,
      value: 'stacked-chart',
      onClick: () => {
        setDefaultView('stacked-chart');
        setOpenViewAsPopover(false);
      },
    },
    {
      title: 'Grouped Chart',
      icon: <BarChart3 className='h-4 w-4' />,
      value: 'grouped-chart',
      onClick: () => {
        setDefaultView('grouped-chart');
        setOpenViewAsPopover(false);
      },
    },
    {
      title: 'Multi Line Chart',
      icon: <LineChart className='h-4 w-4' />,
      value: 'multi-line',
      onClick: () => {
        setDefaultView('multi-line');
        setOpenViewAsPopover(false);
      },
    },
  ];

  // Download menu items
  const downloadMenuItems = [
    {
      title: 'SVG',
      icon: <Svg />,
      onClick: () => {
        console.log('Download as SVG');
        setOpenDownloadPopover(false);
      },
    },
    {
      title: 'PNG',
      icon: <Png />,
      onClick: () => {
        console.log('Download as PNG');
        setOpenDownloadPopover(false);
      },
    },
    {
      title: 'JPEG',
      icon: <Jpeg />,
      onClick: () => {
        console.log('Download as JPEG');
        setOpenDownloadPopover(false);
      },
    },
    {
      title: 'PDF',
      icon: <Pdf />,
      onClick: () => {
        console.log('Download as PDF');
        setOpenDownloadPopover(false);
      },
    },
  ];

  // Copy menu items
  const copyMenuItems = [
    {
      title: 'Copy as image',
      icon: <Copy className='h-4 w-4' />,
      onClick: () => {
        console.log('Copy as image');
        setOpenCopyPopover(false);
      },
    },
    {
      title: 'Copy data',
      icon: <Table className='h-4 w-4' />,
      onClick: () => {
        console.log('Copy data');
        setOpenCopyPopover(false);
      },
    },
  ];

  // Add menu items
  const addMenuItems = [
    {
      title: 'Add to dashboard',
      icon: <PieChart className='h-4 w-4' />,
      onClick: () => {
        setOpenAddTodashboard(true);
        setOpenAddPopover(false);
      },
    },
    {
      title: 'Schedule recurring',
      icon: <Clock className='!text-neutral-ct-secondary' size={18} />,
      onClick: () => {
        console.log('Schedule recurring report');
        setOpenAddPopover(false);
      },
    },
  ];

  // Maximize menu items
  const maximizeMenuItems = [
    {
      title: 'Full screen',
      icon: <Maximize2 className='h-4 w-4' />,
      onClick: () => {
        console.log('Full screen');
        setOpenMaximizePopover(false);
      },
    },
    {
      title: 'Expand view',
      icon: <Maximize2 className='h-4 w-4' />,
      onClick: () => {
        console.log('Expand view');
        setOpenMaximizePopover(false);
      },
    },
  ];

  // View switcher function
  const renderView = () => {
    switch (defaultView) {
      case 'table':
        return <InvoiceViewTable />;
      case 'bar-chart':
        return <SimpleChart />;
      case 'line-chart':
        return <LineChartComp />;
      case 'pie-chart':
        return <DonutChart />;
      case 'stacked-chart':
        return <StackedChart />;
      case 'grouped-chart':
        return <GroupedChart />;
      case 'multi-line':
        return <MultiLineChart />;
      default:
        return <InvoiceViewTable />;
    }
  };

  return (
    <div className='bg-white rounded-lg border border-neutral-br-disabled'>
      <div className='flex items-center justify-between p-4 '>
        <h3 className='text-lg font-semibold text-neutral-ct-primary'>
          {title}
        </h3>
        <div className='flex items-center gap-2'>
          {/* View As Popover */}
          <Popover open={openViewAsPopover} onOpenChange={setOpenViewAsPopover}>
            {!hideViewAs && (
              <PopoverTrigger asChild>
                <button className='px-3 py-1.5 text-xs cursor-pointer font-semibold text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md flex items-center transition-colors'>
                  View As
                  <ChevronDown className='w-3 h-3 ml-1' />
                </button>
              </PopoverTrigger>
            )}
            <PopoverContent
              className='w-[180px] p-0'
              align='start'
              sideOffset={6}
            >
              {viewAsMenuItems.map((item, index) => (
                <button
                  key={index}
                  className={cn(
                    defaultView === item.value && 'bg-neutral-secondary',
                    'w-full flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-neutral-secondary rounded-md transition-colors text-sm text-neutral-ct-primary'
                  )}
                  onClick={item.onClick}
                  type='button'
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

          {/* Add Popover */}
          <Popover open={openAddPopover} onOpenChange={setOpenAddPopover}>
            {!HideAddToDashboard && (
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    openAddPopover && '!text-brand-ct-brand',
                    'h-8 w-8 flex cursor-pointer items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
                  )}
                >
                  <PiPlusSquare className='w-4 h-4' />
                </button>
              </PopoverTrigger>
            )}
            <PopoverContent
              className='w-[250px] p-0'
              align='start'
              sideOffset={6}
            >
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

          {/* Copy Popover */}
          <Popover open={openCopyPopover} onOpenChange={setOpenCopyPopover}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  openCopyPopover && '!text-brand-ct-brand',
                  'h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
                )}
              >
                <Copy className='w-3 h-3' />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className='w-[150px] p-0'
              align='start'
              sideOffset={6}
            >
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

          {/* Download Popover */}
          <Popover
            open={openDownloadPopover}
            onOpenChange={setOpenDownloadPopover}
          >
            <PopoverTrigger asChild>
              <button
                className={cn(
                  openDownloadPopover && '!text-brand-ct-brand',
                  'h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
                )}
              >
                <Download className='w-3 h-3' />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className='w-[120px] p-0'
              align='start'
              sideOffset={6}
            >
              {downloadMenuItems.map((item, index) => (
                <button
                  key={index}
                  className='w-full flex cursor-pointer items-center gap-2 px-3 py-2.5 hover:bg-neutral-secondary rounded-md transition-colors text-sm text-neutral-ct-primary'
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

          {/* Maximize Popover */}
          <Popover
            open={openMaximizePopover}
            onOpenChange={setOpenMaximizePopover}
          >
            {!hideExtentView && (
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    openMaximizePopover && '!text-brand-ct-brand',
                    'h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
                  )}
                >
                  <Maximize2 className='w-3 h-3' />
                </button>
              </PopoverTrigger>
            )}
            <PopoverContent
              className='w-[150px] p-0'
              align='start'
              sideOffset={6}
            >
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

          {showDelete && (
            <button className='cursor-pointer'>
              <Trash size={12} className='text-sm text-error-ct-error' />
            </button>
          )}
        </div>
      </div>
      <div className='px-4 pt-2 pb-4'>{renderView()}</div>
      <AddToDashboard
        open={openAddTodashboardModal}
        onOpenChange={() => setOpenAddTodashboard(false)}
      />
    </div>
  );
};

export default InvoiceView;
