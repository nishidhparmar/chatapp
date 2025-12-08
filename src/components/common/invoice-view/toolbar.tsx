import React from 'react';
import { cn } from '../../../lib/utils';
import { Trash } from '../../icons';
import ViewAsPopover from './view-as-popover';
import AddPopover from './add-popover';
import CopyPopover from './copy-popover';
import DownloadPopover from './download-popover';
import MaximizePopover from './maximize-popover';
import DeleteChart from './delete-chart';
import { VisualizationType } from './types';

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

  // Copy props
  openCopyPopover: boolean;
  setOpenCopyPopover: (open: boolean) => void;

  // Download props
  openDownloadPopover: boolean;
  setOpenDownloadPopover: (open: boolean) => void;

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
  openDownloadPopover,
  setOpenDownloadPopover,
  openMaximizePopover,
  setOpenMaximizePopover,
  contentRef,
  hideExtentView,
  showDelete,
  openDeleteModal,
  setOpenDeleteModal,
  onDeleteChart,
  isDeleting,
}) => {
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

      <CopyPopover open={openCopyPopover} onOpenChange={setOpenCopyPopover} />

      <DownloadPopover
        open={openDownloadPopover}
        onOpenChange={setOpenDownloadPopover}
      />

      <MaximizePopover
        open={openMaximizePopover}
        onOpenChange={setOpenMaximizePopover}
        contentRef={contentRef}
        hideExtentView={hideExtentView}
      />

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
