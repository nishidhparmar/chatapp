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
  chatId: number | null;
}

import { useAddToGroup } from '@/hooks/mutations';
import { useGetChatGroups } from '@/hooks/queries';
import type { ChatGroup } from '@/types/chat';

const AddToGroup = ({ open, onOpenChange, chatId }: AddToGroupProps) => {
  const addToGroup = useAddToGroup();

  const { data: chatGroupsData, isLoading: isLoadingGroups } =
    useGetChatGroups();

  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(null);

  const groups = chatGroupsData?.data || [];
  const filteredGroups = groups.filter((group: ChatGroup) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Only show suggestions when input has content or is actively being used
    // Clear selected group if user is typing
    if (selectedGroup && value !== selectedGroup.name) {
      setSelectedGroup(null);
    }
  };

  const handleGroupSelect = (group: ChatGroup) => {
    setSelectedGroup(group);
    setSearchTerm(group.name);
  };

  const handleAddToGroup = () => {
    if (!chatId || !selectedGroup) return;

    addToGroup.mutate(
      {
        chatId,
        payload: {
          group_id: selectedGroup.group_id,
          group_name: selectedGroup.name,
        },
      },
      {
        onSuccess: () => {
          setSearchTerm('');
          setSelectedGroup(null);
          onOpenChange(false);
        },
        // onError removed - handled automatically by global error handler
      }
    );
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      // Use addToGroup with group_id: 0 to create a new group
      // If chatId is provided, it will create group and add chat to it
      // If chatId is 0 or null, it will just create the group
      const targetChatId = chatId || 0;

      addToGroup.mutate(
        {
          chatId: targetChatId,
          payload: {
            group_id: 0, // 0 indicates creating a new group
            group_name: newGroupName.trim(),
          },
        },
        {
          onSuccess: () => {
            setNewGroupName('');
            setIsCreatingGroup(false);

            if (!chatId) {
              onOpenChange(false);
            }
          },
        }
      );
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
                onClick={handleBackToGroups}
                size={'xs'}
                disabled={addToGroup.isPending}
              >
                <ArrowLeft className='text-neutral-ct-primary' /> Back
              </Button>
              <Button
                type='submit'
                size={'xs'}
                onClick={handleCreateGroup}
                disabled={!newGroupName.trim() || addToGroup.isPending}
              >
                {addToGroup.isPending ? 'Creating...' : 'Create group'}
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
                  iconClassName='text-neutral-ct-primary -mt-[1px]  text-neutral-ct-tertiary !h-4 !w-4'
                  className='pr-3 pl-8 py-2 max-h-8 w-full -mt-2.5 placeholder:!text-xs'
                  label=''
                  placeholder='Search groups...'
                  value={searchTerm}
                  onChange={handleSearchChange}
                  tabIndex={-1}
                />
                <div className='w-full bg-white  mt-3 z-10'>
                  <div className='max-h-60 overflow-y-auto space-y-1'>
                    {isLoadingGroups ? (
                      <div className='p-4 text-center text-sm text-neutral-tertiary'>
                        Loading groups...
                      </div>
                    ) : filteredGroups.length > 0 ? (
                      filteredGroups.map((group: ChatGroup) => (
                        <div
                          key={group.group_id}
                          onMouseDown={e => e.preventDefault()}
                          className={`group flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer transition ${
                            selectedGroup?.group_id === group.group_id
                              ? 'bg-blue-50 border border-blue-200'
                              : ''
                          }`}
                          onClick={() => handleGroupSelect(group)}
                        >
                          <div className='flex items-center space-x-3'>
                            <Folder size={16} color='#6B7280' />
                            <div>
                              <p className='text-sm text-neutral-ct-primary font-medium'>
                                {group.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='p-4 text-center text-sm text-neutral-tertiary'>
                        No groups found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-between mt-4'>
              <Button
                variant='secondary'
                size={'xs'}
                onClick={() => setIsCreatingGroup(true)}
              >
                <Plus className='text-neutral-ct-primary -mr-1' /> New Group
              </Button>
              <Button
                type='submit'
                size={'xs'}
                onClick={handleAddToGroup}
                disabled={!selectedGroup || addToGroup.isPending}
              >
                {addToGroup.isPending ? 'Adding...' : 'Done'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddToGroup;
