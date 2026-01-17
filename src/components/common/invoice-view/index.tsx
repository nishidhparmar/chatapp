import React, { useRef, useState, useEffect } from 'react';
import AddToDashboard from '../../reports/add-to-dashboard';
import ReportRecurring from '../../reports/report-recurring-modal';
import { ChatDetailMessage, ChartContentData } from '../../../types/chat';
import { useViewAs } from '@/hooks/mutations/use-view-as';
import { useRemoveFromDashboard } from '@/hooks/mutations/dashboard/use-remove-from-dashboard';
import { ApiResponse } from '@/types/api';
import { VisualizationType, InvoiceViewProps } from './types';
import Toolbar from './toolbar';
import ViewRenderer from './view-renderer';
import { showToast } from '../toast';
import { AddToDashboardPayload } from '../../../types/dashboard';
import { Dialog, DialogContent } from '../../ui/dialog';
import { X } from 'lucide-react';

const InvoiceView: React.FC<InvoiceViewProps> = ({
  data,
  defaultView: propDefaultView = 'table',
  hideViewAs = false,
  HideAddToDashboard = false,
  showDelete = false,
  hideExtentView = false,
  title,
  chatId,
  onOpenDashboardView,
  dashboardId,
  chartId,
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
  const [openReportRecurringModal, setOpenReportRecurringModal] =
    useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openFullscreenModal, setOpenFullscreenModal] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { mutate: changeView, isPending: isChangingView } = useViewAs();
  const { mutate: removeFromDashboard, isPending: isDeleting } =
    useRemoveFromDashboard();

  const handleDeleteChart = () => {
    if (!dashboardId || !chartId) {
      showToast.error({
        title: 'Cannot delete chart',
        description: 'Dashboard ID or Chart ID not found.',
      });
      return;
    }

    removeFromDashboard(
      { dashboardId, chartId },
      {
        onSuccess: () => {
          setOpenDeleteModal(false);
        },
        onError: () => {
          showToast.error({
            title: 'Failed to remove chart',
            description:
              'Unable to remove chart from dashboard. Please try again.',
          });
        },
      }
    );
  };

  useEffect(() => {
    if (data?.chart_content) {
      setChartContent(data.chart_content);
    }
  }, [data?.chart_content]);

  const handleViewChange = (viewType: VisualizationType) => {
    if (!data?.id) {
      setDefaultView(viewType);
      setOpenViewAsPopover(false);
      return;
    }
    changeView(
      {
        messageId: data?.id,
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
          showToast.error({
            title: 'Failed to change visualization',
            description: 'Unable to change the chart view. Please try again.',
          });
        },
      }
    );
  };
  return (
    <div className='bg-white rounded-lg border border-neutral-br-disabled'>
      <div className='flex md:flex-row flex-col md:items-center gap-2 justify-between p-4 '>
        <h3 className='text-md:text-lg text-base font-semibold text-neutral-ct-primary'>
          {data?.title}
        </h3>
        {chartContent && (
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
            onScheduleRecurring={() => setOpenReportRecurringModal(true)}
            hideAddToDashboard={HideAddToDashboard}
            openCopyPopover={openCopyPopover}
            setOpenCopyPopover={setOpenCopyPopover}
            chartContent={chartContent}
            openDownloadPopover={openDownloadPopover}
            setOpenDownloadPopover={setOpenDownloadPopover}
            title={title}
            viewType={defaultView}
            openMaximizePopover={openMaximizePopover}
            setOpenMaximizePopover={setOpenMaximizePopover}
            contentRef={contentRef}
            hideExtentView={hideExtentView}
            // onFullscreenOpen={() => setOpenFullscreenModal(true)}
            showDelete={showDelete}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            onDeleteChart={handleDeleteChart}
            isDeleting={isDeleting}
          />
        )}
      </div>
      <div className='md:px-4 pt-2 pb-4' ref={contentRef}>
        <ViewRenderer chartContent={chartContent} />
      </div>
      <AddToDashboard
        open={openAddTodashboardModal}
        onOpenChange={() => setOpenAddTodashboard(false)}
        chatId={chatId || 0}
        messageId={data?.id || 0}
        chartTitle={title || ''}
        chartType={defaultView as AddToDashboardPayload['chart_type']}
        onSuccess={dashboardId => {
          if (onOpenDashboardView && dashboardId) {
            onOpenDashboardView(dashboardId);
          }
        }}
      />
      <ReportRecurring
        open={openReportRecurringModal}
        onOpenChange={() => setOpenReportRecurringModal(false)}
        messageId={data?.id}
        title={title}
        askedQuestion={data?.asked_question}
      />

      {/* Fullscreen Modal */}
      <Dialog open={openFullscreenModal} onOpenChange={setOpenFullscreenModal}>
        <DialogContent
          className='max-w-none w-screen h-screen p-0 m-0 rounded-none border-none bg-white flex flex-col'
          showCloseButton={false}
        >
          {/* Header with title and close button */}
          <div className='flex items-center justify-between p-6 border-b border-neutral-br-disabled bg-white'>
            <h3 className='text-xl font-semibold text-neutral-ct-primary'>
              {title
                ? title.split(':').slice(1).join(':').split('.')[0].trim()
                : 'Chart View'}
            </h3>
            <button
              onClick={() => setOpenFullscreenModal(false)}
              className='h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
            >
              <X className='w-4 h-4' />
            </button>
          </div>

          {/* Content area with full height and centered content */}
          <div className='flex-1 flex items-center justify-center p-6 bg-white overflow-auto'>
            <div className='w-full h-full max-w-7xl'>
              <ViewRenderer chartContent={chartContent} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceView;
