'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { GoShareAndroid } from 'react-icons/go';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '../../lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Trash } from '../icons';
import DeleteChat from './delete-chat';
import ShareChatModal from './share-chat';
import { FiCheck, FiX } from 'react-icons/fi';
import Edit from '../icons/Edit';
import { Input } from '../ui/input';
import FolderOpen from '../icons/FolderOpen';

interface ChatHeaderProps {
  title?: string;
  activeTab?: 'chat' | 'data';
  onTabChange?: (tab: 'chat' | 'data') => void;
  // Optionally, add onDelete?: () => void here if needed for delete action
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title = 'Sales trends by Product Category - June 2025 to August 2025',
  activeTab = 'chat',
  onTabChange,
  // onDelete,
}) => {
  const [deleteChatModal, setOpenDeleteChatModal] = useState(false);
  const [shareChatModal, setOpenShareChatModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedTitle(title);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      // onTitleChange?.(editedTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className='bg-white px-4 border-b border-neutral-br-secondary pt-4'>
      {/* Main Title */}
      <div className='flex items-center justify-between'>
        {isEditing ? (
          <div className='flex items-center gap-2 flex-1 mr-4'>
            <Input
              ref={inputRef}
              type='text'
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className='flex-1 max-h-[32px] !px-2 !py-1 '
            />
            <button
              onClick={handleSave}
              className='p-1.5 rounded-md border border-neutral-br-secondary cursor-pointer text-success-ct-success'
              title='Save'
            >
              <FiCheck className='h-5 w-5 ' />
            </button>
            <button
              onClick={handleCancel}
              className='p-1.5 rounded-md border border-neutral-br-secondary cursor-pointer text-error-ct-error'
              title='Cancel'
            >
              <FiX className='h-5 w-5' />
            </button>
          </div>
        ) : (
          <div className='w-full'>
            <div
              className='flex items-center gap-1 cursor-pointer group flex-1 hover:bg-neutral-tertiary w-max p-1 rounded-md'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleEditClick}
            >
              <h1 className='text-base font-semibold text-neutral-ct-primary truncate'>
                {title}
              </h1>
              {isHovered && (
                <button title='Edit title' className='cursor-pointer'>
                  <Edit className='h-4 w-4' />
                </button>
              )}
            </div>
          </div>
        )}

        <div className='flex items-center space-x-2'>
          <Button
            className='py-2 px-4 text-neutral-ct-inverse text-xs font-semibold'
            onClick={() => setOpenShareChatModal(true)}
          >
            <GoShareAndroid className='h-4 w-4 -mr-1' /> Share
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className='bg-neutral-tertiary h-8 w-8 rounded-md flex items-center justify-center'
                aria-label='More'
                type='button'
              >
                <BiDotsHorizontalRounded className='h-4 w-4 text-neutral-ct-primary' />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className='w-[200px] p-0'
              align='end'
              sideOffset={6}
            >
              <button
                className='w-full flex items-center justify-between gap-2 px-3 py-2.5  hover:bg-neutral-disabled rounded-md transition-colors text-sm'
                // onClick={onDelete}
                type='button'
              >
                <div className='flex items-center gap-2'>
                  <FolderOpen size={16} className='text-neutral-ct-secondary' />
                  <span className='text-neutral-ct-primary'>Add to group</span>
                </div>
                <MdKeyboardArrowRight className='h-5 text-neutral-ct-primary w-5' />
              </button>
              <button
                className='w-full flex items-center gap-2 px-3 py-2.5 text-error-active hover:bg-neutral-disabled rounded-md transition-colors text-sm'
                onClick={() => setOpenDeleteChatModal(true)}
                type='button'
              >
                <Trash size={14} className='text-error-active' />
                <span>Delete</span>
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Tabs and Actions */}
      <Tabs
        value={activeTab}
        onValueChange={e => onTabChange?.(e as 'chat' | 'data')}
        className='w-max mt-3'
      >
        <TabsList className='w-full bg-white h-auto p-0'>
          <TabsTrigger
            value='chat'
            className={cn(
              'flex-1 rounded-none cursor-pointer py-2 px-4 text-sm !max-h-9',
              'data-[state=active]:border-b-2 data-[state=active]:border-b-brand-ct-brand data-[state=active]:bg-transparent data-[state=active]:shadow-none',
              'text-neutral-ct-tertiary data-[state=active]:text-brand-ct-brand font-semibold',
              'focus-visible:ring-0 focus-visible:outline-none focus:ring-0'
            )}
          >
            Chat
          </TabsTrigger>

          <TabsTrigger
            value='data'
            className={cn(
              'flex-1 rounded-none cursor-pointer py-2 px-4 text-sm !max-h-9',
              'data-[state=active]:border-b-2 data-[state=active]:border-b-brand-ct-brand data-[state=active]:bg-transparent data-[state=active]:shadow-none',
              'text-neutral-ct-tertiary data-[state=active]:text-brand-ct-brand font-semibold',
              'focus-visible:ring-0 focus-visible:outline-none focus:ring-0'
            )}
          >
            Data
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <DeleteChat
        open={deleteChatModal}
        onOpenChange={() => setOpenDeleteChatModal(false)}
      />
      <ShareChatModal
        open={shareChatModal}
        onOpenChange={() => setOpenShareChatModal(false)}
      />
    </div>
  );
};

export default ChatHeader;
