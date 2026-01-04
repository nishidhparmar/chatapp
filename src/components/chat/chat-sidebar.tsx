'use client';

import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Filter, ChevronDown, ChevronUp, Folder, Trash } from '../icons';
import { AuthInput } from '../auth/common/auth-input';
import { BsThreeDots } from 'react-icons/bs';
import Edit from '../icons/Edit';
import FolderOpen from '../icons/FolderOpen';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import TurnArrow from './TurnArrow';
import DeleteChat from './delete-chat';
import DeleteGroup from './delete-group';
import AddToGroup from './add-to-group';
import { IoSearchOutline } from 'react-icons/io5';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetChatList, useGetChatGroups } from '../../hooks/queries';
import { useDeleteChat } from '../../hooks/mutations/use-delete-chat';
import { useRenameChat } from '../../hooks/mutations/use-rename-chat';
import { useRemoveFromGroup, useDeleteGroup } from '../../hooks/mutations';
import type { ChatGroup } from '@/types/chat';
import {
  ChatListSkeleton,
  GroupListSkeleton,
} from '@/components/common/skeletons';
import { useIsMobile } from '../../hooks/use-mobile';
import { Pagination } from '../ui/pagination';

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
  // Collapse state
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Search and pagination state
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to first page when searching
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading: isLoadingChats } = useGetChatList({
    page: currentPage,
    per_page: 25,
    search: debouncedSearch || undefined,
  });
  const { data: chatGroupsData, isLoading: isLoadingGroups } =
    useGetChatGroups();
  const deleteChat = useDeleteChat();
  const isMobile = useIsMobile();
  const deleteGroup = useDeleteGroup();
  const renameChat = useRenameChat();
  const removeFromGroup = useRemoveFromGroup();
  const [isGroupsExpanded, setIsGroupsExpanded] = useState(true);
  const [isChatsExpanded, setIsChatsExpanded] = useState(true);
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

  // Pagination metadata
  const pagination = data?.pagination;
  const hasNextPage = pagination?.has_next || false;
  const hasPrevPage = pagination?.has_prev || false;
  const totalPages = pagination?.total_pages || 1;
  const totalChats = pagination?.total || 0;

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

  // Pagination handlers
  const handleNextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasNextPage]);

  const handlePrevPage = useCallback(() => {
    if (hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [hasPrevPage]);

  // Auto-select first available chat when data loads (desktop only) - only if no URL param was provided
  useEffect(() => {
    if (!activeChat && !isLoadingChats && !isLoadingGroups && !isMobile) {
      // Check if there was a URL parameter (if ChatLayout already set activeChat, don't override)
      const urlParams = new URLSearchParams(window.location.search);
      const hasUrlId = urlParams.has('id');

      if (!hasUrlId) {
        // First try to select from regular chats
        if (chats.length > 0) {
          setActiveChat(chats[0].id);
        }
        // If no regular chats, try first chat from first group
        else if (groups.length > 0 && groups[0].chats.length > 0) {
          setActiveChat(groups[0].chats[0].id);
        }
      }
    }
  }, [
    chats,
    groups,
    activeChat,
    isLoadingChats,
    isLoadingGroups,
    isMobile,
    setActiveChat,
  ]);

  // Keyboard shortcut for toggling sidebar (Ctrl/Cmd + B)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setIsCollapsed(!isCollapsed);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCollapsed]);

  // Auto-collapse on mobile when a chat is selected
  useEffect(() => {
    if (isMobile && activeChat) {
      setIsCollapsed(true);
    }
  }, [isMobile, activeChat]);

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
          setOpenPopover(null);
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
          <Tooltip>
            <TooltipTrigger asChild>
              <span className='truncate max-w-[90%]'>{item.title}</span>
            </TooltipTrigger>
            <TooltipContent side='top' sideOffset={8}>
              <p className='max-w-xs break-words'>{item.title}</p>
            </TooltipContent>
          </Tooltip>
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
    <div
      className={`${isCollapsed ? 'w-0' : 'md:w-80 w-full'} flex bg-white border-r border-neutral-br-secondary flex-col h-full transition-all duration-300 ease-in-out relative overflow-visible`}
    >
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`fixed top-21.5 z-50  bg-white cursor-pointer border border-neutral-br-secondary rounded-full p-1.5 shadow-sm hover:shadow-md transition-all duration-300 ${
          isCollapsed ? 'left-18' : 'left-18'
        }`}
        title={`${isCollapsed ? 'Expand' : 'Collapse'} sidebar (Ctrl+B)`}
        type='button'
      >
        {isCollapsed ? (
          <ChevronRight className='h-4 w-4 text-neutral-ct-primary' />
        ) : (
          <ChevronLeft className='h-4 w-4 text-neutral-ct-primary' />
        )}
      </button>

      {/* Collapsed State */}
      {isCollapsed ? (
        <div className='p-4 flex flex-col items-center'></div>
      ) : (
        <>
          {/* Header */}
          <div className='md:p-4 px-6 py-4'>
            <h2 className='text font-semibold text-neutral-ct-primary mb-3'>
              Chat History
            </h2>

            <div className='flex gap-3 w-full items-center'>
              <div className='flex-1 relative'>
                <AuthInput
                  icon={IoSearchOutline}
                  iconClassName={`text-neutral-ct-tertiary -mt-[1px] !h-4 !w-4 ${isLoadingChats && debouncedSearch ? 'animate-pulse' : ''}`}
                  className='pr-8 pl-8 py-2 max-h-8 w-full -mt-2.5 placeholder:!text-xs'
                  label=''
                  placeholder='Search chats...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className='absolute right-2 top-1/2 -translate-y-1/2 text-neutral-ct-tertiary hover:text-neutral-ct-primary transition-colors'
                    type='button'
                    title='Clear search'
                  >
                    <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
                      <path
                        d='M9 3L3 9M3 3L9 9'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className='bg-neutral-tertiary h-8 w-8 rounded-md flex items-center justify-center mt-1'>
                <Filter className='h-4 w-4 text-neutral-ct-primary' />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className='flex-1 overflow-y-auto md:px-4 px-6 pb-4'>
            {/* Empty State */}
            {!isLoadingChats &&
              !isLoadingGroups &&
              chats.length === 0 &&
              groups.length === 0 && (
                <div className='flex items-center justify-center h-full text-center'>
                  <p className='text-neutral-ct-secondary text-sm'>
                    {debouncedSearch
                      ? `No chats found for "${debouncedSearch}"`
                      : "You don't have any chats right now. Please create one."}
                  </p>
                </div>
              )}

            {/* Groups Section */}
            {(groups.length > 0 || isLoadingGroups) && (
              <div className='mb-6'>
                <button
                  onClick={() => setIsGroupsExpanded(!isGroupsExpanded)}
                  className='flex items-center justify-between w-full text-left text-sm font-medium text-neutral-ct-primary'
                >
                  <span>Groups</span>
                  {isGroupsExpanded ? (
                    <ChevronUp size={16} className='text-neutral-ct-tertiary' />
                  ) : (
                    <ChevronDown
                      size={16}
                      className='text-neutral-ct-tertiary'
                    />
                  )}
                </button>

                {isGroupsExpanded && (
                  <div className='space-y-1 mt-2'>
                    {isLoadingGroups ? (
                      <GroupListSkeleton count={3} />
                    ) : (
                      groups.map((group, index) => (
                        <div key={index}>
                          {/* Group Header */}
                          <div className='group/group flex items-center justify-between py-1 text-sm text-neutral-ct-primary mb-1'>
                            <div className='flex items-center gap-2'>
                              <Folder
                                size={14}
                                className='text-neutral-ct-tertiary'
                              />
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
                              renderChatItem(
                                item,
                                true,
                                group.title,
                                group.group_id
                              )
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Chats Section */}
            {(chats.length > 0 || isLoadingChats) && (
              <div>
                <button
                  onClick={() => setIsChatsExpanded(!isChatsExpanded)}
                  className='flex items-center justify-between w-full text-left text-sm font-medium text-neutral-ct-primary'
                >
                  <span>
                    {debouncedSearch ? 'Search Results' : 'Chats'}
                    {totalChats > 0 && ` (${totalChats})`}
                  </span>
                  {isChatsExpanded ? (
                    <ChevronUp size={16} className='text-neutral-ct-tertiary' />
                  ) : (
                    <ChevronDown
                      size={16}
                      className='text-neutral-ct-tertiary'
                    />
                  )}
                </button>

                {isChatsExpanded && (
                  <div className='space-y-1 mt-2'>
                    {isLoadingChats ? (
                      <ChatListSkeleton count={4} />
                    ) : (
                      <>
                        {chats.map(chat => renderChatItem(chat, false))}

                        {/* Pagination Controls */}
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          hasNextPage={hasNextPage}
                          hasPrevPage={hasPrevPage}
                          onNextPage={handleNextPage}
                          onPrevPage={handlePrevPage}
                          size='sm'
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

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
