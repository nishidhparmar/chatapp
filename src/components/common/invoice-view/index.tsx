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
import React, { useRef, useState, useEffect } from 'react';
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
import ScheduleRecurring from '../../schedule/schedule-recurring-modal';
import { ChatDetailMessage, ChartContentData } from '../../../types/chat';
import { useViewAs } from '@/hooks/mutations/use-view-as';
import { ApiResponse } from '@/types/api';

// Valid visualization types matching API payload
export type VisualizationType =
  | 'table'
  | 'bar_chart'
  | 'line_chart'
  | 'pie_chart'
  | 'stacked_chart'
  | 'grouped_chart'
  | 'multi_line';

interface InvoiceViewProps {
  defaultView?: VisualizationType;
  title?: string;
  hideViewAs?: boolean;
  HideAddToDashboard?: boolean;
  showDelete?: boolean;
  hideExtentView?: boolean;
  data?: ChatDetailMessage;
}

const InvoiceView: React.FC<InvoiceViewProps> = ({
  data,
  defaultView: propDefaultView = 'table',
  hideViewAs = false,
  HideAddToDashboard = false,
  showDelete = false,
  hideExtentView = false,
}) => {
  const [defaultView, setDefaultView] =
    useState<VisualizationType>(propDefaultView);
  const [chartContent, setChartContent] = useState<
    ChatDetailMessage['chart_content']
  >(data?.chart_content);
  const [openViewAsPopover, setOpenViewAsPopover] = useState(false);
  const [openDownloadPopover, setOpenDownloadPopover] = useState(false);
  const [openCopyPopover, setOpenCopyPopover] = useState(false);
  const [openAddPopover, setOpenAddPopover] = useState(false);
  const [openMaximizePopover, setOpenMaximizePopover] = useState(false);
  const [openAddTodashboardModal, setOpenAddTodashboard] = useState(false);
  const [openScheduleRecurringModal, setOpenScheduleRecurringModal] =
    useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { mutate: changeView, isPending: isChangingView } = useViewAs();

  // Sync chartContent when data prop changes
  useEffect(() => {
    if (data?.chart_content) {
      setChartContent(data.chart_content);
    }
  }, [data?.chart_content]);

  const handleViewChange = (viewType: VisualizationType) => {
    if (!data?.message_id) {
      // If no messageId, just change view locally
      setDefaultView(viewType);
      setOpenViewAsPopover(false);
      return;
    }

    // Call API to change view
    changeView(
      {
        messageId: data?.message_id,
        payload: { visualization_type: viewType },
      },
      {
        onSuccess: (response: ApiResponse) => {
          console.log('Full API Response:', response);
          console.log('Response data field:', response.data);

          // The API returns the chart data directly in response.data
          // response.data should be: { type: "bar_chart", data: {...}, config: {...} }
          const chartData = response.data as ChartContentData;
          console.log('Parsed Chart Data:', chartData);

          if (
            chartData &&
            chartData.type &&
            chartData.data &&
            chartData.config
          ) {
            console.log('Setting chart content with:', chartData);
            setChartContent(chartData);
          } else {
            console.error('Invalid chart data structure:', chartData);
          }

          setDefaultView(viewType);
          setOpenViewAsPopover(false);
        },
        onError: (error: unknown) => {
          console.error('Failed to change view:', error);
          alert('Failed to change visualization. Please try again.');
        },
      }
    );
  };

  // View As menu items
  const viewAsMenuItems: Array<{
    title: string;
    icon: React.ReactNode;
    value: VisualizationType;
    onClick: () => void;
  }> = [
    {
      title: 'Table',
      icon: <Table className='h-4 w-4' />,
      value: 'table',
      onClick: () => handleViewChange('table'),
    },
    {
      title: 'Bar Chart',
      icon: <BarChart3 className='h-4 w-4' />,
      value: 'bar_chart',
      onClick: () => handleViewChange('bar_chart'),
    },
    {
      title: 'Line Chart',
      icon: <LineChart className='h-4 w-4' />,
      value: 'line_chart',
      onClick: () => handleViewChange('line_chart'),
    },
    {
      title: 'Pie Chart',
      icon: <PieChart className='h-4 w-4' />,
      value: 'pie_chart',
      onClick: () => handleViewChange('pie_chart'),
    },
    {
      title: 'Stacked Chart',
      icon: <BarChart3 className='h-4 w-4' />,
      value: 'stacked_chart',
      onClick: () => handleViewChange('stacked_chart'),
    },
    {
      title: 'Grouped Chart',
      icon: <BarChart3 className='h-4 w-4' />,
      value: 'grouped_chart',
      onClick: () => handleViewChange('grouped_chart'),
    },
    {
      title: 'Multi Line Chart',
      icon: <LineChart className='h-4 w-4' />,
      value: 'multi_line',
      onClick: () => handleViewChange('multi_line'),
    },
  ];

  // Download menu items
  const downloadMenuItems = [
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

  // Copy menu items
  const copyMenuItems = [
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
        setOpenScheduleRecurringModal(true);
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
        if (contentRef.current) {
          contentRef.current.requestFullscreen?.();
        }
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

  // Helper function to check if chart_content has the new API format
  const isNewChartFormat = (
    content: ChatDetailMessage['chart_content']
  ): content is ChartContentData => {
    return (
      content !== null &&
      content !== undefined &&
      'type' in content &&
      'data' in content &&
      'config' in content
    );
  };

  // View switcher function
  const renderView = () => {
    console.log('=== RENDER VIEW DEBUG ===');
    console.log('Current chartContent:', chartContent);
    console.log('chartContent type:', typeof chartContent);
    console.log(
      'Is new format?',
      chartContent && isNewChartFormat(chartContent)
    );
    console.log('defaultView:', defaultView);

    // Handle new API format
    if (chartContent && isNewChartFormat(chartContent)) {
      console.log('✓ Rendering NEW API FORMAT');
      console.log('Chart type:', chartContent.type);
      console.log('Chart data:', JSON.stringify(chartContent.data));
      console.log('Chart config:', JSON.stringify(chartContent.config));
    }

    const tableData =
      chartContent && !isNewChartFormat(chartContent)
        ? {
            raw_data: chartContent.raw_data || [],
            columns: chartContent.data_format?.columns || [],
          }
        : undefined;

    // Fallback to default view based on defaultView state
    switch (defaultView) {
      case 'table':
        return <InvoiceViewTable data={tableData} />;
      case 'bar_chart':
        return <SimpleChart />;
      case 'line_chart':
        return <LineChartComp />;
      case 'pie_chart':
        return <DonutChart />;
      case 'stacked_chart':
        return <StackedChart />;
      case 'grouped_chart':
        return <GroupedChart />;
      case 'multi_line':
        return <MultiLineChart />;
      default:
        return <InvoiceViewTable data={tableData} />;
    }
  };

  return (
    <div className='bg-white rounded-lg border border-neutral-br-disabled'>
      <div className='flex md:flex-row flex-col md:items-center gap-2 justify-between p-4 '>
        <h3 className='text-lg font-semibold text-neutral-ct-primary'>
          Invoice by customer
        </h3>
        <div className='flex items-center '>
          {/* View As Popover */}
          <Popover open={openViewAsPopover} onOpenChange={setOpenViewAsPopover}>
            {!hideViewAs && (
              <PopoverTrigger asChild>
                <button
                  className='px-3 py-1.5 text-xs cursor-pointer font-semibold text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={isChangingView}
                >
                  {isChangingView ? 'Loading...' : 'View As'}
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
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <div className='animate-spin rounded-full h-3 w-3 border-b-2 border-neutral-ct-secondary'></div>
                ) : (
                  <Download className='w-3 h-3' />
                )}
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
                  className='w-full flex cursor-pointer items-center gap-2 px-3 py-2.5 hover:bg-neutral-secondary rounded-md transition-colors text-sm text-neutral-ct-primary disabled:opacity-50 disabled:cursor-not-allowed'
                  onClick={item.onClick}
                  type='button'
                  disabled={isGenerating}
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
            <button
              className={cn(
                openMaximizePopover && '!text-brand-ct-brand',
                'h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
              )}
            >
              <Trash size={12} className='text-sm text-error-ct-error' />
            </button>
          )}
        </div>
      </div>
      <div className='md:px-4 pt-2 pb-4' ref={contentRef}>
        {renderView()}
      </div>
      <AddToDashboard
        open={openAddTodashboardModal}
        onOpenChange={() => setOpenAddTodashboard(false)}
      />
      <ScheduleRecurring
        open={openScheduleRecurringModal}
        onOpenChange={() => setOpenScheduleRecurringModal(false)}
      />
    </div>
  );
};

export default InvoiceView;
