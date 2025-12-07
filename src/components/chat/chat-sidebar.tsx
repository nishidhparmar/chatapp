'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { Filter, ChevronDown, ChevronUp, Folder, Trash } from '../icons';
import { AuthInput } from '../auth/common/auth-input';
import { BsThreeDots } from 'react-icons/bs';
import Edit from '../icons/Edit';
import FolderOpen from '../icons/FolderOpen';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import TurnArrow from './TurnArrow';
import { GoShareAndroid } from 'react-icons/go';
import DeleteChat from './delete-chat';
import DeleteGroup from './delete-group';
import AddToGroup from './add-to-group';
import { IoSearchOutline } from 'react-icons/io5';
import { useGetChatList, useGetChatGroups } from '../../hooks/queries';
import { useDeleteChat } from '../../hooks/mutations/use-delete-chat';
import { useRenameChat } from '../../hooks/mutations/use-rename-chat';
import { useRemoveFromGroup, useDeleteGroup } from '../../hooks/mutations';
import type { ChatGroup } from '@/types/chat';

interface ChatItem {
  id: string;
  title: string;
  isActive?: boolean;
}

interface Group {
  group_id?: number;
  title: string;
  chats: ChatItem[];
}

const ChatSidebar = ({
  activeChat,
  setActiveChat,
}: {
  activeChat: string;
  setActiveChat: Dispatch<SetStateAction<string>>;
}) => {
  const { data } = useGetChatList();
  const { data: chatGroupsData } = useGetChatGroups();
  const deleteChat = useDeleteChat();
  const deleteGroup = useDeleteGroup();
  const renameChat = useRenameChat();
  const removeFromGroup = useRemoveFromGroup();
  const [isGroupsExpanded, setIsGroupsExpanded] = useState(true);
  const [isChatsExpanded, setIsChatsExpanded] = useState(false);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [deleteChatModal, setDeleteChatModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [deleteGroupModal, setDeleteGroupModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [openAddToGroupModal, setOpenAddToGroupModal] = useState(false);
  const [chatToAddToGroup, setChatToAddToGroup] = useState<string | null>(null);
  const [renamingItem, setRenamingItem] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const chats: ChatItem[] =
    data?.data?.chats?.map(chat => ({
      id: String(chat.chat_id),
      title: chat.title || 'Untitled Chat',
    })) || [];

  const groups: Group[] =
    data?.data?.groups?.map(group => {
      // Try to find matching group ID from chat groups API
      const matchingGroup = chatGroupsData?.data?.find(
        (chatGroup: ChatGroup) => chatGroup.name === group.title
      );

      return {
        group_id: group.group_id || matchingGroup?.group_id,
        title: group.title,
        chats: group.chats.map(chat => ({
          id: String(chat.chat_id),
          title: chat.title || 'Untitled Chat',
        })),
      };
    }) || [];

  const handleRename = (itemId: string) => {
    const item = chats.find(chat => chat.id === itemId);
    if (item) {
      setRenameValue(item.title);
      setRenamingItem(itemId);
      setOpenPopover(null);
    }
  };

  const handleRenameSave = () => {
    if (renamingItem && renameValue.trim()) {
      renameChat.mutate(
        {
          chatId: Number(renamingItem),
          payload: { title: renameValue.trim() },
        },
        {
          onSuccess: () => {
            setRenamingItem(null);
            setRenameValue('');
          },
        }
      );
    }
  };

  const handleRenameCancel = () => {
    setRenamingItem(null);
    setRenameValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRenameSave();
    } else if (e.key === 'Escape') {
      handleRenameCancel();
    }
  };

  const handleDeleteChat = () => {
    if (chatToDelete) {
      deleteChat.mutate(Number(chatToDelete), {
        onSuccess: () => {
          setDeleteChatModal(false);
          setChatToDelete(null);
          // If the deleted chat was active, clear the active chat
          if (activeChat === chatToDelete) {
            setActiveChat('');
          }
        },
      });
    }
  };

  const handleRemoveFromGroup = (chatId: string, groupId: number) => {
    removeFromGroup.mutate(
      {
        groupId,
        chatId: Number(chatId),
      },
      {
        onSuccess: () => {
          console.log(`Chat ${chatId} removed from group ${groupId}`);
          setOpenPopover(null);
        },
        onError: (error: unknown) => {
          console.error('Failed to remove chat from group:', error);
        },
      }
    );
  };

  const handleDeleteGroup = () => {
    if (groupToDelete) {
      deleteGroup.mutate(groupToDelete.id, {
        onSuccess: () => {
          setDeleteGroupModal(false);
          setGroupToDelete(null);
        },
        onError: (error: unknown) => {
          console.error('Failed to delete group:', error);
        },
      });
    }
  };

  const getMenuForItem = (
    item: ChatItem,
    groupTitle?: string,
    groupId?: number
  ) => {
    if (groupTitle && groupId) {
      // Item is in a group - show "Remove from group" first
      return [
        {
          title: `Remove from ${groupTitle}`,
          icon: <TurnArrow />,
          onClick: () => {
            handleRemoveFromGroup(item.id, groupId);
          },
        },
        {
          title: 'Delete',
          icon: <Trash className='h-4 w-4' />,
          onClick: () => {
            setChatToDelete(item.id);
            setDeleteChatModal(true);
            setOpenPopover(null);
          },
          isDestructive: true,
        },
      ];
    } else {
      // Regular chat item
      return [
        {
          title: 'Share',
          icon: (
            <GoShareAndroid className='h-4 w-4 text-neutral-ct-secondary' />
          ),
          onClick: () => {
            console.log('Share', item.id);
            setOpenPopover(null);
          },
        },
        {
          title: 'Rename',
          icon: <Edit />,
          onClick: () => {
            handleRename(item.id);
          },
        },
        {
          title: 'Add to group',
          icon: <FolderOpen />,
          onClick: () => {
            setChatToAddToGroup(item.id);
            setOpenAddToGroupModal(true);
            setOpenPopover(null);
          },
          hasSubmenu: true,
        },
        {
          title: 'Delete',
          icon: <Trash className='!h-4 !w-4' />,
          onClick: () => {
            setChatToDelete(item.id);
            setDeleteChatModal(true);
            setOpenPopover(null);
          },
          isDestructive: true,
        },
      ];
    }
  };

  const renderChatItem = (
    item: ChatItem,
    isInGroup = false,
    groupTitle?: string,
    groupId?: number
  ) => {
    const menuItems = getMenuForItem(item, groupTitle, groupId);

    return (
      <div
        key={item.id}
        className={`relative h-10 group flex items-center text-neutral-ct-primary justify-between py-2 ${isInGroup ? 'px-3' : 'px-3'} rounded-lg text-sm cursor-pointer transition-colors ${
          activeChat === item.id
            ? 'bg-neutral-disabled'
            : renamingItem !== item.id &&
              'hover:bg-neutral-disabled bg-transparent'
        }`}
        onClick={() => setActiveChat(item.id)}
      >
        {isInGroup && (
          <div className='absolute h-[1px] -left-1.5 w-3 bg-neutral-br-primary' />
        )}
        {renamingItem === item.id && !isInGroup ? (
          <input
            type='text'
            value={renameValue}
            onChange={e => setRenameValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleRenameSave}
            className='w-full h-10 px-2 text-neutral-ct-primary rounded bg-transparent  outline-none text-sm '
            autoFocus
          />
        ) : (
          <span className='truncate max-w-[90%]'>{item.title}</span>
        )}

        {/* Context Menu Button with Popover */}
        <Popover
          open={openPopover === item.id}
          onOpenChange={open => setOpenPopover(open ? item.id : null)}
        >
          <PopoverTrigger asChild>
            <button
              className='opacity-0 hover:text-neutral-ct-secondary hover:bg-neutral-active cursor-pointer group-hover:opacity-100 transition-opacity p-1 rounded'
              onClick={e => e.stopPropagation()}
              type='button'
            >
              <BsThreeDots size={14} />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className='w-[200px] p-0'
            align='start'
            sideOffset={6}
          >
            {menuItems.map((menuItem, index) => (
              <button
                key={index}
                className={`w-full flex items-center ${menuItem.hasSubmenu ? 'justify-between' : 'gap-2'} px-3 py-2.5 hover:bg-neutral-disabled rounded-md transition-colors text-sm ${
                  menuItem.isDestructive
                    ? 'text-error-active'
                    : 'text-neutral-ct-primary'
                }`}
                onClick={e => {
                  e.stopPropagation();
                  menuItem.onClick?.();
                }}
                type='button'
              >
                <div className='flex items-center gap-2'>
                  <span
                    className={`${menuItem.isDestructive ? 'text-error-active' : 'text-neutral-ct-secondary'} flex items-center`}
                  >
                    {menuItem.icon}
                  </span>
                  <span className='max-w-[150px] truncate'>
                    {menuItem.title}
                  </span>
                </div>
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <div className='md:w-80 w-full flex  bg-white border-r border-neutral-br-secondary  flex-col h-full'>
      {/* Header */}
      <div className='md:p-4 px-6 py-4'>
        <h2 className='text font-semibold text-neutral-ct-primary mb-3'>
          Chat History
        </h2>

        <div className='flex gap-3 w-full items-center'>
          <div className='flex-1'>
            <AuthInput
              icon={IoSearchOutline}
              iconClassName='text-neutral-ct-tertiary -mt-[1.5px] !h-4 !w-4'
              className='pr-3 pl-8 py-2 max-h-8 w-full -mt-2.5 placeholder:!text-xs'
              label=''
              placeholder='Search'
            />
          </div>
          <div className='bg-neutral-tertiary h-8 w-8 rounded-md flex items-center justify-center mt-1'>
            <Filter className='h-4 w-4 text-neutral-ct-primary' />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto md:px-4 px-6 pb-4'>
        {/* Groups Section */}
        <div className='mb-6'>
          <button
            onClick={() => setIsGroupsExpanded(!isGroupsExpanded)}
            className='flex items-center justify-between w-full text-left text-sm font-medium text-neutral-ct-primary'
          >
            <span>Groups</span>
            {isGroupsExpanded ? (
              <ChevronUp size={16} className='text-neutral-ct-tertiary' />
            ) : (
              <ChevronDown size={16} className='text-neutral-ct-tertiary' />
            )}
          </button>

          {isGroupsExpanded && (
            <div className='space-y-1 mt-2'>
              {groups.map((group, index) => (
                <div key={index}>
                  {/* Group Header */}
                  <div className='group/group flex items-center justify-between py-1 text-sm text-neutral-ct-primary mb-1'>
                    <div className='flex items-center gap-2'>
                      <Folder size={14} className='text-neutral-ct-tertiary' />
                      <span>{group.title}</span>
                    </div>
                    {group.group_id && (
                      <button
                        className='opacity-0 group-hover/group:opacity-100 transition-opacity p-1 rounded hover:bg-neutral-disabled'
                        onClick={e => {
                          e.stopPropagation();
                          setGroupToDelete({
                            id: group.group_id!,
                            name: group.title,
                          });
                          setDeleteGroupModal(true);
                        }}
                        type='button'
                        title='Delete group'
                      >
                        <Trash className='h-3.5 w-3.5 text-error-active' />
                      </button>
                    )}
                  </div>

                  {/* Group Items */}
                  <div className='ml-1.5 px-1.5 space-y-1 border-l border-neutral-br-primary'>
                    {group.chats.map(item =>
                      renderChatItem(item, true, group.title, group.group_id)
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chats Section */}
        <div>
          <button
            onClick={() => setIsChatsExpanded(!isChatsExpanded)}
            className='flex items-center justify-between w-full text-left text-sm font-medium text-neutral-ct-primary'
          >
            <span>Chats</span>
            {isChatsExpanded ? (
              <ChevronUp size={16} className='text-neutral-ct-tertiary' />
            ) : (
              <ChevronDown size={16} className='text-neutral-ct-tertiary' />
            )}
          </button>

          {isChatsExpanded && (
            <div className='space-y-1 mt-2'>
              {chats.map(chat => renderChatItem(chat, false))}
            </div>
          )}
        </div>
      </div>
      <DeleteChat
        open={deleteChatModal}
        onOpenChange={() => {
          setDeleteChatModal(false);
          setChatToDelete(null);
        }}
        onConfirm={handleDeleteChat}
        isDeleting={deleteChat.isPending}
      />
      <DeleteGroup
        open={deleteGroupModal}
        onOpenChange={() => {
          setDeleteGroupModal(false);
          setGroupToDelete(null);
        }}
        onConfirm={handleDeleteGroup}
        isDeleting={deleteGroup.isPending}
        groupName={groupToDelete?.name}
      />
      <AddToGroup
        open={openAddToGroupModal}
        onOpenChange={() => {
          setOpenAddToGroupModal(false);
          setChatToAddToGroup(null);
        }}
        chatId={chatToAddToGroup ? Number(chatToAddToGroup) : null}
      />
    </div>
  );
};

export default ChatSidebar;
