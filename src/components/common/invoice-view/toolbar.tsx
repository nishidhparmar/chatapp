import React from 'react';
import { useRouter } from 'next/navigation';
import { Eye } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Trash } from '../../icons';
import ViewAsPopover from './view-as-popover';
import AddPopover from './add-popover';
import CopyPopover from './copy-popover';
import DownloadPopover from './download-popover';
import MaximizePopover from './maximize-popover';
import DeleteChart from './delete-chart';
import { useOpenChartAsChat } from '../../../hooks/mutations/dashboard/use-open-chart-as-chat';
import { VisualizationType } from './types';
import { ChatDetailMessage } from '../../../types/chat';

interface OpenChartAsChatResponse {
  status: string;
  data: {
    chat_id: number;
    is_saved: boolean;
  };
  message: string;
}

interface ToolbarProps {
  // View As props
  openViewAsPopover: boolean;
  setOpenViewAsPopover: (open: boolean) => void;
  defaultView: VisualizationType;
  onViewChange: (viewType: VisualizationType) => void;
  isChangingView: boolean;
  hideViewAs: boolean;

  // Add props
  openAddPopover: boolean;
  setOpenAddPopover: (open: boolean) => void;
  onAddToDashboard: () => void;
  onScheduleRecurring: () => void;
  hideAddToDashboard: boolean;
  viewChat: boolean;

  // Copy props
  openCopyPopover: boolean;
  setOpenCopyPopover: (open: boolean) => void;
  chartContent?: ChatDetailMessage['chart_content']; // Chart data to copy

  // Download props
  openDownloadPopover: boolean;
  setOpenDownloadPopover: (open: boolean) => void;
  title?: string;
  viewType?: VisualizationType;

  // Maximize props
  openMaximizePopover: boolean;
  setOpenMaximizePopover: (open: boolean) => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
  hideExtentView: boolean;

  // Delete props
  showDelete: boolean;
  openDeleteModal: boolean;
  setOpenDeleteModal: (open: boolean) => void;
  onDeleteChart?: () => void;
  isDeleting?: boolean;

  // View Chat props
  showViewChat?: boolean;
  widgetId?: number;
}

const Toolbar: React.FC<ToolbarProps> = ({
  openViewAsPopover,
  setOpenViewAsPopover,
  defaultView,
  onViewChange,
  isChangingView,
  hideViewAs,
  openAddPopover,
  setOpenAddPopover,
  onAddToDashboard,
  onScheduleRecurring,
  hideAddToDashboard,
  openCopyPopover,
  setOpenCopyPopover,
  chartContent,
  openDownloadPopover,
  setOpenDownloadPopover,
  title,
  viewType,
  openMaximizePopover,
  setOpenMaximizePopover,
  contentRef,
  viewChat = false,
  hideExtentView,
  showDelete,
  openDeleteModal,
  setOpenDeleteModal,
  onDeleteChart,
  isDeleting,
  widgetId,
}) => {
  const router = useRouter();
  const openChartAsChatMutation = useOpenChartAsChat();

  // Handle opening chart as chat
  const handleViewChat = () => {
    if (!widgetId) {
      console.error('Widget ID is required to open chart as chat');
      return;
    }

    openChartAsChatMutation.mutate(widgetId, {
      onSuccess: (response: OpenChartAsChatResponse) => {
        const chatId = response.data.chat_id;
        router.push(`/conversations/${chatId}`);
      },
      onError: (error: Error) => {
        console.error('Failed to open chart as chat:', error);
        // You can add toast notification here if needed
      },
    });
  };
  return (
    <div className='flex items-center'>
      <ViewAsPopover
        open={openViewAsPopover}
        onOpenChange={setOpenViewAsPopover}
        defaultView={defaultView}
        onViewChange={onViewChange}
        isChangingView={isChangingView}
        hideViewAs={hideViewAs}
      />

      <AddPopover
        open={openAddPopover}
        onOpenChange={setOpenAddPopover}
        onAddToDashboard={onAddToDashboard}
        onScheduleRecurring={onScheduleRecurring}
        hideAddToDashboard={hideAddToDashboard}
      />

      <CopyPopover
        open={openCopyPopover}
        onOpenChange={setOpenCopyPopover}
        chartContent={chartContent}
      />

      <DownloadPopover
        open={openDownloadPopover}
        onOpenChange={setOpenDownloadPopover}
        contentRef={contentRef}
        title={title}
        viewType={viewType}
        chartContent={chartContent}
      />

      <MaximizePopover
        open={openMaximizePopover}
        onOpenChange={setOpenMaximizePopover}
        contentRef={contentRef}
        hideExtentView={hideExtentView}
      />

      {viewChat && (
        <button
          className={cn(
            'h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors',
            openChartAsChatMutation.isPending && 'opacity-50 cursor-not-allowed'
          )}
          onClick={handleViewChat}
          disabled={openChartAsChatMutation.isPending}
          title='View as Chat'
        >
          <Eye size={12} className='text-sm' />
        </button>
      )}

      {showDelete && (
        <>
          <button
            className={cn(
              'h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:bg-neutral-tertiary rounded-md transition-colors'
            )}
            onClick={() => setOpenDeleteModal(true)}
          >
            <Trash size={12} className='text-sm text-error-ct-error' />
          </button>

          <DeleteChart
            open={openDeleteModal}
            onOpenChange={setOpenDeleteModal}
            onConfirm={onDeleteChart}
            isDeleting={isDeleting}
          />
        </>
      )}
    </div>
  );
};

export default Toolbar;
