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
import Folder from '../icons/Folder';
import { Plus, ArrowLeft } from 'lucide-react';
import { IoSearchOutline } from 'react-icons/io5';

interface AddToGroupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data for demonstration - replace with actual data
const mockGroups = [
  { id: 1, name: 'Development Team', members: 5 },
  { id: 2, name: 'Design Team', members: 3 },
  { id: 3, name: 'Marketing Team', members: 8 },
  { id: 4, name: 'Sales Team', members: 12 },
  { id: 5, name: 'Support Team', members: 6 },
];

const AddToGroup = ({ open, onOpenChange }: AddToGroupProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const filteredGroups = mockGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleGroupToggle = (groupId: number) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
    setShowSuggestions(false);
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      // Here you would typically make an API call to create the group
      console.log('Creating group:', newGroupName);
      // Reset form and go back to main view
      setNewGroupName('');
      setIsCreatingGroup(false);
      // Close the modal or keep it open based on your requirements
      // onOpenChange(false);
    }
  };

  const handleBackToGroups = () => {
    setIsCreatingGroup(false);
    setNewGroupName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        {isCreatingGroup ? (
          // Create Group View
          <>
            <DialogHeader>
              <DialogTitle>Create new group</DialogTitle>
            </DialogHeader>
            <AuthInput
              label=''
              placeholder='Enter group name'
              className=''
              value={newGroupName}
              onChange={e => setNewGroupName(e.target.value)}
            />
            <DialogFooter className='mt-4'>
              <Button
                variant='secondary'
                className='px-4 py-2'
                onClick={handleBackToGroups}
              >
                <ArrowLeft className='text-neutral-ct-primary -ml-1 mr-1' />{' '}
                Back
              </Button>
              <Button
                type='submit'
                className='px-4 py-2'
                onClick={handleCreateGroup}
                disabled={!newGroupName.trim()}
              >
                Create group
              </Button>
            </DialogFooter>
          </>
        ) : (
          // Add to Group View
          <>
            <DialogHeader>
              <DialogTitle>Add to group</DialogTitle>
            </DialogHeader>

            <div className='space-y-3'>
              <div className='relative'>
                <AuthInput
                  icon={IoSearchOutline}
                  iconClassName='text-neutral-ct-primary -mt-[1.5px]  text-neutral-ct-tertiary !h-4 !w-4'
                  className='pr-3 pl-8 py-2 max-h-8 w-full -mt-2.5 placeholder:!text-xs'
                  label=''
                  placeholder='Search groups...'
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
                      {filteredGroups.length > 0 ? (
                        filteredGroups.map(group => (
                          <div
                            key={group.id}
                            onMouseDown={e => e.preventDefault()}
                            className='flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer'
                            onClick={() => handleGroupToggle(group.id)}
                          >
                            <div className='flex items-center space-x-3'>
                              <Folder size={16} color='#6B7280' />
                              <div>
                                <p className='text-sm text-neutral-ct-primary font-medium'>
                                  {group.name}
                                </p>
                              </div>
                            </div>
                            {selectedGroups.includes(group.id) && (
                              <div className='w-2 h-2 bg-blue-500 rounded-full' />
                            )}
                          </div>
                        ))
                      ) : (
                        <div className='p-4 text-center text-sm text-neutral-tertiary'>
                          No groups found
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
                onClick={() => setIsCreatingGroup(true)}
              >
                <Plus className='text-neutral-ct-primary -mr-1' /> New Group
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

export default AddToGroup;
