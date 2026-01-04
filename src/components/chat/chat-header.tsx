'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MdArrowBackIos } from 'react-icons/md';

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
import FolderOpen from '../icons/FolderOpen';
import Input from '../ui/input';
import AddToGroup from './add-to-group';
import { useIsMobile } from '../../hooks/use-mobile';
import { useDeleteChat } from '../../hooks/mutations/use-delete-chat';
import { useRenameChat } from '../../hooks/mutations/use-rename-chat';
import { useRemoveFromGroup } from '../../hooks/mutations';
import TurnArrow from './TurnArrow';

interface ChatHeaderProps {
  title?: string;
  activeTab?: 'chat' | 'data';
  onTabChange?: (tab: 'chat' | 'data') => void;
  handleBack: () => void;
  chatId?: number;
  onTitleChange?: (newTitle: string) => void;
  onDelete?: () => void;
  isInGroup?: boolean;
  groupId: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title = 'Sales trends by Product Category - June 2025 to August 2025',
  activeTab = 'chat',
  onTabChange,
  handleBack,
  chatId,
  onTitleChange,
  onDelete,
  isInGroup = false,
  groupId,
}) => {
  const [deleteChatModal, setOpenDeleteChatModal] = useState(false);
  const [shareChatModal, setOpenShareChatModal] = useState(false);
  const [addToGroupModal, setAddToGroupModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const deleteChat = useDeleteChat();
  const renameChat = useRenameChat();
  const removeFromGroup = useRemoveFromGroup();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedTitle(title);
  };

  const handleSave = () => {
    if (editedTitle.trim() && chatId) {
      renameChat.mutate(
        {
          chatId,
          payload: { title: editedTitle.trim() },
        },
        {
          onSuccess: () => {
            onTitleChange?.(editedTitle.trim());
            setIsEditing(false);
          },
        }
      );
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

  const handleDeleteChat = () => {
    if (chatId) {
      deleteChat.mutate(chatId, {
        onSuccess: () => {
          setOpenDeleteChatModal(false);
          onDelete?.();
        },
      });
    }
  };

  const handleRemoveFromGroup = () => {
    removeFromGroup.mutate(
      {
        groupId,
        chatId: Number(chatId),
      },
      {
        onSuccess: () => {
          // setOpenPopover(null);
        },
      }
    );
  };

  return (
    <div className='bg-white px-4 border-b border-neutral-br-secondary pt-4'>
      {/* Main Title */}
      <div className='flex flex-wrap items-center justify-between overflow-hidden'>
        {isMobile && (
          <button onClick={handleBack}>
            <MdArrowBackIos className='h-4 w-4 text-neutral-ct-disabled' />
          </button>
        )}
        {isEditing ? (
          <div className='flex items-center gap-2 flex-1 min-w-0 mr-4'>
            <Input
              ref={inputRef}
              type='text'
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className='flex-1 max-h-[32px] !px-2 !py-1'
            />
            <button
              onClick={handleSave}
              disabled={renameChat.isPending}
              className='p-1.5 rounded-md border border-neutral-br-secondary cursor-pointer text-success-ct-success disabled:opacity-50 disabled:cursor-not-allowed'
              title='Save'
            >
              <FiCheck className='h-5 w-5' />
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
          <div className='flex-1 min-w-0'>
            <div
              className='flex items-center gap-1 cursor-pointer group w-max max-w-full hover:bg-neutral-tertiary p-1 rounded-md'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleEditClick}
            >
              <h1 className='text-base font-semibold text-neutral-ct-primary truncate max-w-[calc(100vw-80px)]'>
                {title}
              </h1>
              {isHovered && (
                <button title='Edit title' className='cursor-pointer shrink-0'>
                  <Edit className='h-4 w-4' />
                </button>
              )}
            </div>
          </div>
        )}
        <div className='flex items-center justify-end space-x-2 shrink-0 ml-1'>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className='bg-neutral-tertiary h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0'
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
              {!isInGroup ? (
                <button
                  className='w-full flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-neutral-disabled rounded-md transition-colors text-sm'
                  onClick={() => setAddToGroupModal(true)}
                  type='button'
                >
                  <div className='flex items-center gap-2'>
                    <FolderOpen
                      size={16}
                      className='text-neutral-ct-secondary'
                    />
                    <span className='text-neutral-ct-primary'>
                      Add to group
                    </span>
                  </div>
                  <MdKeyboardArrowRight className='h-5 text-neutral-ct-primary w-5' />
                </button>
              ) : (
                <button
                  className='w-full flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-neutral-disabled rounded-md transition-colors text-sm'
                  onClick={handleRemoveFromGroup}
                  type='button'
                >
                  <div className='flex items-center gap-2'>
                    <TurnArrow
                      size={16}
                      className='text-neutral-ct-secondary'
                    />
                    <span className='text-neutral-ct-primary'>
                      Remove from group
                    </span>
                  </div>
                  <MdKeyboardArrowRight className='h-5 text-neutral-ct-primary w-5' />
                </button>
              )}
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
        onConfirm={handleDeleteChat}
        isDeleting={deleteChat.isPending}
      />
      <ShareChatModal
        open={shareChatModal}
        onOpenChange={() => setOpenShareChatModal(false)}
      />
      <AddToGroup
        open={addToGroupModal}
        onOpenChange={() => setAddToGroupModal(false)}
        chatId={chatId || null}
      />
    </div>
  );
};

export default ChatHeader;
