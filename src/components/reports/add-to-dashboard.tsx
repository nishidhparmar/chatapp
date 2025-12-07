'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button } from '../ui/button';
import { AuthInput } from '../auth/common/auth-input';
import { Plus, ArrowLeft } from 'lucide-react';
import { IoSearchOutline } from 'react-icons/io5';
import { useGetDashboards } from '@/hooks/queries/dashboard/use-get-dashboards';
import { useAddToDashboard } from '@/hooks/mutations/dashboard/use-add-to-dashboard';
import type {
  AddToDashboardPayload,
  DashboardListItem,
} from '@/types/dashboard';
import { showToast } from '../common/toast';

interface AddToDashboardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chatId: number;
  messageId: number;
  chartTitle: string;
  chartType: AddToDashboardPayload['chart_type'];
  onSuccess?: (dashboardId: number) => void;
}

const AddToDashboard = ({
  open,
  onOpenChange,
  chatId,
  messageId,
  chartTitle,
  chartType,
  onSuccess,
}: AddToDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDashboards, setSelectedDashboards] = useState<number[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCreatingDashboard, setIsCreatingDashboard] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState('');

  // Hooks
  const { data: dashboardsResponse, isLoading: isDashboardsLoading } =
    useGetDashboards();
  const addToDashboardMutation = useAddToDashboard();

  const dashboards = dashboardsResponse?.data || [];

  const filteredDashboards = dashboards.filter((dashboard: DashboardListItem) =>
    dashboard.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.trim().length > 0);

    // Clear selections if user is typing and the value doesn't match selected items
    const selectedNames = selectedDashboards
      .map(
        id =>
          dashboards.find((d: DashboardListItem) => d.dashboard_id === id)?.name
      )
      .filter(Boolean)
      .join(', ');

    if (selectedDashboards.length > 0 && value !== selectedNames) {
      setSelectedDashboards([]);
    }
  };

  const handleDashboardToggle = (dashboardId: number) => {
    const updatedSelection = selectedDashboards.includes(dashboardId)
      ? selectedDashboards.filter(id => id !== dashboardId)
      : [...selectedDashboards, dashboardId];

    setSelectedDashboards(updatedSelection);

    // Update search term to show selected dashboard names
    const selectedNames = updatedSelection
      .map(
        id =>
          dashboards.find((d: DashboardListItem) => d.dashboard_id === id)?.name
      )
      .filter(Boolean)
      .join(', ');

    setSearchTerm(selectedNames);
    setShowSuggestions(false);
  };

  const handleCreateDashboard = async () => {
    if (newDashboardName.trim()) {
      const payload: AddToDashboardPayload = {
        chart_title: chartTitle,
        dashboard_id: 0, // 0 for new dashboard
        dashboard_name: newDashboardName,
        chart_type: chartType,
      };

      try {
        const response = await addToDashboardMutation.mutateAsync({
          chatId,
          messageId,
          payload,
        });

        // Call onSuccess with the dashboard ID from response
        if (onSuccess && response?.data?.dashboard_id) {
          onSuccess(response.data.dashboard_id);
        }

        // Reset form and close modal
        setNewDashboardName('');
        setIsCreatingDashboard(false);
        onOpenChange(false);
      } catch (error) {
        console.error('Error creating dashboard:', error);
      }
    }
  };

  const handleAddToExistingDashboards = async () => {
    if (selectedDashboards.length === 0) return;

    try {
      let lastDashboardId: number | null = null;

      // Add to each selected dashboard
      for (const dashboardId of selectedDashboards) {
        const selectedDashboard = dashboards.find(
          (d: DashboardListItem) => d.dashboard_id === dashboardId
        );
        const payload: AddToDashboardPayload = {
          chart_title: chartTitle,
          dashboard_id: dashboardId,
          dashboard_name: selectedDashboard?.name || '',
          chart_type: chartType,
        };

        await addToDashboardMutation.mutateAsync({
          chatId,
          messageId,
          payload,
        });

        // Keep track of the last dashboard ID for opening
        lastDashboardId = dashboardId;
      }

      // Call onSuccess with the last dashboard ID
      if (onSuccess && lastDashboardId) {
        onSuccess(lastDashboardId);
        showToast.success({
          title: 'Graph added to the dashboard',
        });
      }

      // Reset and close modal
      setSelectedDashboards([]);
      setSearchTerm('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding to dashboard:', error);
    }
  };

  const handleBackToDashboards = () => {
    setIsCreatingDashboard(false);
    setNewDashboardName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        {isCreatingDashboard ? (
          // Create Group View
          <>
            <DialogHeader>
              <DialogTitle>Create new dashboard</DialogTitle>
            </DialogHeader>
            <AuthInput
              label=''
              placeholder='Enter dashboard name'
              className=''
              value={newDashboardName}
              onChange={e => setNewDashboardName(e.target.value)}
            />
            <DialogFooter className='mt-4'>
              <Button
                variant='secondary'
                className='px-4 py-2'
                onClick={handleBackToDashboards}
              >
                <ArrowLeft className='text-neutral-ct-primary -ml-1 mr-1' />{' '}
                Back
              </Button>
              <Button
                type='submit'
                className='px-4 py-2'
                onClick={handleCreateDashboard}
                disabled={
                  !newDashboardName.trim() || addToDashboardMutation.isPending
                }
              >
                {addToDashboardMutation.isPending
                  ? 'Creating...'
                  : 'Create dashboard'}
              </Button>
            </DialogFooter>
          </>
        ) : (
          // Add to Group View
          <>
            <DialogHeader>
              <DialogTitle>Add to dashboard</DialogTitle>
            </DialogHeader>

            <div className='space-y-3'>
              <div className='relative'>
                <AuthInput
                  icon={IoSearchOutline}
                  iconClassName='text-neutral-ct-primary -mt-[1px]  text-neutral-ct-tertiary !h-4 !w-4'
                  className='pr-3 pl-8 py-2 max-h-8 w-full -mt-2.5 placeholder:!text-xs'
                  label=''
                  placeholder='Search dashboards...'
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() =>
                    setShowSuggestions(searchTerm.trim().length > 0)
                  }
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                />
                {showSuggestions && (
                  <div className='absolute top-full left-0 w-full bg-white border rounded-lg shadow-md mt-1 z-10'>
                    <div className='max-h-60 overflow-y-auto space-y-1'>
                      {isDashboardsLoading ? (
                        <div className='p-4 text-center text-sm text-neutral-tertiary'>
                          Loading dashboards...
                        </div>
                      ) : filteredDashboards.length > 0 ? (
                        filteredDashboards.map(
                          (dashboard: DashboardListItem) => (
                            <div
                              key={dashboard.dashboard_id}
                              onMouseDown={e => e.preventDefault()}
                              className='flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer'
                              onClick={() =>
                                handleDashboardToggle(dashboard.dashboard_id)
                              }
                            >
                              <p className='text-sm text-neutral-ct-primary font-medium'>
                                {dashboard.name}
                              </p>
                              {selectedDashboards.includes(
                                dashboard.dashboard_id
                              ) && (
                                <div className='w-2 h-2 bg-blue-500 rounded-full' />
                              )}
                            </div>
                          )
                        )
                      ) : (
                        <div className='p-4 text-center text-sm text-neutral-tertiary'>
                          {searchTerm
                            ? 'No dashboards found'
                            : 'No dashboards available'}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='flex justify-between mt-4'>
              <Button
                variant='secondary'
                className='px-4 py-2'
                onClick={() => setIsCreatingDashboard(true)}
              >
                <Plus className='text-neutral-ct-primary -mr-1' /> New Dashboard
              </Button>
              <Button
                type='submit'
                className='px-4 py-2 font-semibold'
                onClick={handleAddToExistingDashboards}
                disabled={
                  selectedDashboards.length === 0 ||
                  addToDashboardMutation.isPending
                }
              >
                {addToDashboardMutation.isPending ? 'Adding...' : 'Done'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddToDashboard;
