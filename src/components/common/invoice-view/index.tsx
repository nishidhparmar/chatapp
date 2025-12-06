import React, { useRef, useState, useEffect } from 'react';
import AddToDashboard from '../../reports/add-to-dashboard';
import ScheduleRecurring from '../../schedule/schedule-recurring-modal';
import { ChatDetailMessage, ChartContentData } from '../../../types/chat';
import { useViewAs } from '@/hooks/mutations/use-view-as';
import { ApiResponse } from '@/types/api';
import { VisualizationType, InvoiceViewProps } from './types';
import Toolbar from './toolbar';
import ViewRenderer from './view-renderer';
import { toast } from 'sonner';

const InvoiceView: React.FC<InvoiceViewProps> = ({
  data,
  defaultView: propDefaultView = 'table',
  hideViewAs = false,
  HideAddToDashboard = false,
  showDelete = false,
  hideExtentView = false,
  title,
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
  const contentRef = useRef<HTMLDivElement>(null);

  const { mutate: changeView, isPending: isChangingView } = useViewAs();

  useEffect(() => {
    if (data?.chart_content) {
      setChartContent(data.chart_content);
    }
  }, [data?.chart_content]);

  const handleViewChange = (viewType: VisualizationType) => {
    if (!data?.message_id) {
      setDefaultView(viewType);
      setOpenViewAsPopover(false);
      return;
    }

    changeView(
      {
        messageId: data?.message_id,
        payload: { visualization_type: viewType },
      },
      {
        onSuccess: (response: ApiResponse) => {
          const chartData = response.data as ChartContentData;
          if (chartData && chartData.type && chartData.data) {
            setChartContent(chartData);
          } else {
            console.error('Invalid chart data structure:', chartData);
          }

          setDefaultView(viewType);
          setOpenViewAsPopover(false);
        },
        onError: () => {
          toast.error('Failed to change visualization. Please try again.');
        },
      }
    );
  };

  return (
    <div className='bg-white rounded-lg border border-neutral-br-disabled'>
      <div className='flex md:flex-row flex-col md:items-center gap-2 justify-between p-4 '>
        <h3 className='text-lg font-semibold text-neutral-ct-primary'>
          {title
            ? title.split(':').slice(1).join(':').split('.')[0].trim()
            : ''}
        </h3>
        <Toolbar
          openViewAsPopover={openViewAsPopover}
          setOpenViewAsPopover={setOpenViewAsPopover}
          defaultView={defaultView}
          onViewChange={handleViewChange}
          isChangingView={isChangingView}
          hideViewAs={hideViewAs}
          openAddPopover={openAddPopover}
          setOpenAddPopover={setOpenAddPopover}
          onAddToDashboard={() => setOpenAddTodashboard(true)}
          onScheduleRecurring={() => setOpenScheduleRecurringModal(true)}
          hideAddToDashboard={HideAddToDashboard}
          openCopyPopover={openCopyPopover}
          setOpenCopyPopover={setOpenCopyPopover}
          openDownloadPopover={openDownloadPopover}
          setOpenDownloadPopover={setOpenDownloadPopover}
          openMaximizePopover={openMaximizePopover}
          setOpenMaximizePopover={setOpenMaximizePopover}
          contentRef={contentRef}
          hideExtentView={hideExtentView}
          showDelete={showDelete}
        />
      </div>
      <div className='md:px-4 pt-2 pb-4' ref={contentRef}>
        <ViewRenderer chartContent={chartContent} />
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
