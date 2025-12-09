'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '../ui/Button';
import { AuthInput } from '../auth/common/auth-input';
import { Plus } from 'lucide-react';
import { IoSearchOutline } from 'react-icons/io5';

interface ScheduleRecurringProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data for demonstration - replace with actual data
const mockDashboard = [
  { id: 1, name: 'Development Team', members: 5 },
  { id: 2, name: 'Design Team', members: 3 },
  { id: 3, name: 'Marketing Team', members: 8 },
  { id: 4, name: 'Sales Team', members: 12 },
  { id: 5, name: 'Support Team', members: 6 },
];

const ScheduleRecurring = ({ open, onOpenChange }: ScheduleRecurringProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDashboards, setSelectedDashboards] = useState<number[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCreatingDashboard, setIsCreatingDashboard] = useState(false);

  const filteredDashboards = mockDashboard.filter(dashboard =>
    dashboard.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleDashboardToggle = (dashboardId: number) => {
    setSelectedDashboards(prev =>
      prev.includes(dashboardId)
        ? prev.filter(id => id !== dashboardId)
        : [...prev, dashboardId]
    );
    setShowSuggestions(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        {isCreatingDashboard ? (
          <></>
        ) : (
          // Create Group View
          // <ScheduleModal
          //   open={isCreatingDashboard}
          //   onOpenChange={() => setIsCreatingDashboard(false)}

          // />
          // Add to Group View
          <>
            <DialogHeader>
              <DialogTitle>Schedule recurring report</DialogTitle>
            </DialogHeader>

            <div className='space-y-3'>
              <div className='relative'>
                <AuthInput
                  icon={IoSearchOutline}
                  iconClassName='text-neutral-ct-primary -mt-[1px]  text-neutral-ct-tertiary !h-4 !w-4'
                  className='pr-3 pl-8 py-2 max-h-8 w-full -mt-2.5 placeholder:!text-xs'
                  label=''
                  placeholder='Search recurring...'
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                />
                {showSuggestions && (
                  <div className='absolute top-full left-0 w-full bg-white border rounded-lg shadow-md mt-1 z-10'>
                    <div className='max-h-60 overflow-y-auto space-y-1'>
                      {filteredDashboards.length > 0 ? (
                        filteredDashboards.map(dashboard => (
                          <div
                            key={dashboard.id}
                            onMouseDown={e => e.preventDefault()}
                            className='flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer'
                            onClick={() => handleDashboardToggle(dashboard.id)}
                          >
                            <p className='text-sm text-neutral-ct-primary font-medium'>
                              {dashboard.name}
                            </p>
                            {selectedDashboards.includes(dashboard.id) && (
                              <div className='w-2 h-2 bg-blue-500 rounded-full' />
                            )}
                          </div>
                        ))
                      ) : (
                        <div className='p-4 text-center text-sm text-neutral-tertiary'>
                          No dashboards found
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
                <Plus className='text-neutral-ct-primary -mr-1' /> New Recurring
                Report
              </Button>
              <Button type='submit' className='px-4 py-2 font-semibold'>
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleRecurring;
