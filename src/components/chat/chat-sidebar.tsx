'use client';

import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, Folder, Trash } from '../icons';
import { AuthInput } from '../auth/common/auth-input';
import { BsThreeDots } from 'react-icons/bs';
import Edit from '../icons/Edit';
import FolderOpen from '../icons/FolderOpen';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import TurnArrow from './TurnArrow';
import { GoShareAndroid } from 'react-icons/go';
import DeleteChat from './delete-chat';
import AddToGroup from './add-to-group';
import { IoSearchOutline } from 'react-icons/io5';

interface ChatItem {
  id: string;
  title: string;
  isActive?: boolean;
  groupId?: string;
}

interface Group {
  id: string;
  name: string;
  items: ChatItem[];
}

const ChatSidebar = () => {
  const [isGroupsExpanded, setIsGroupsExpanded] = useState(true);
  const [isChatsExpanded, setIsChatsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [deleteChatModal, setDeleteChatModal] = useState(false);
  const [openAddToGroupModal, setOpenAddToGroupModal] = useState(false);
  const [renamingItem, setRenamingItem] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const [chats, setChats] = useState<ChatItem[]>([
    { id: 'sales-trends-3mo', title: 'Sales trends over the past 3 mo' },
    { id: 'top-growing', title: 'Top-Growing Product Categor...' },
    { id: 'north-america', title: 'North America Revenue' },
    { id: 'churn-pricing', title: 'Churn Before vs After Pricing...' },
    { id: 'customer-segments', title: 'Customer Segments with High...' },
  ]);

  const groups: Group[] = [
    {
      id: 'forecasting',
      name: 'Forecasting & Budgeting',
      items: [
        {
          id: 'sales-trends',
          title: 'Sales trends by Budgeting',
          isActive: true,
          groupId: 'forecasting',
        },
        {
          id: 'sales-year',
          title: 'Sales trends by Year',
          groupId: 'forecasting',
        },
      ],
    },
    {
      id: 'market-analysis',
      name: 'Market Analysis',
      items: [
        {
          id: 'competitive',
          title: 'Competitive landscape ove...',
          groupId: 'market-analysis',
        },
        {
          id: 'key-players',
          title: 'Key players and market sh...',
          groupId: 'market-analysis',
        },
      ],
    },
    {
      id: 'customer-insights',
      name: 'Customer Insights',
      items: [
        {
          id: 'demographic',
          title: 'Demographic analysis - Jul...',
          groupId: 'customer-insights',
        },
        {
          id: 'market-trends',
          title: 'Market trends - August 20...',
          groupId: 'customer-insights',
        },
        {
          id: 'consumer-behavior',
          title: 'Consumer behavior insight...',
          groupId: 'customer-insights',
        },
        {
          id: 'target-audience',
          title: 'Target audience segmenta...',
          groupId: 'customer-insights',
        },
      ],
    },
  ];

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
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === renamingItem
            ? { ...chat, title: renameValue.trim() }
            : chat
        )
      );
      setRenamingItem(null);
      setRenameValue('');
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

  const getMenuForItem = (item: ChatItem) => {
    if (item.groupId) {
      // Item is in a group - show "Remove from group" first
      const groupName =
        groups.find(g => g.id === item.groupId)?.name || 'group';
      return [
        {
          title: `Remove from ${groupName}`,
          icon: <TurnArrow />,
          onClick: () => {
            console.log('Remove from group', item.id);
            setOpenPopover(null);
          },
        },
        {
          title: 'Delete',
          icon: <Trash className='h-4 w-4' />,
          onClick: () => {
            console.log('Delete', item.id);
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
            console.log('Add to group', item.id);
            setOpenAddToGroupModal(true);
          },
          hasSubmenu: true,
        },
        {
          title: 'Delete',
          icon: <Trash className='!h-4 !w-4' />,
          onClick: () => {
            console.log('Delete', item.id);
            setDeleteChatModal(true);
            setOpenPopover(null);
          },
          isDestructive: true,
        },
      ];
    }
  };

  const renderChatItem = (item: ChatItem, isInGroup = false) => {
    const menuItems = getMenuForItem(item);

    return (
      <div
        key={item.id}
        className={`relative h-10 group flex items-center text-neutral-ct-primary justify-between py-2 ${isInGroup ? 'px-3' : 'px-3'} rounded-lg text-sm cursor-pointer transition-colors ${
          item.isActive
            ? 'bg-neutral-disabled'
            : renamingItem !== item.id &&
              'hover:bg-neutral-disabled bg-transparent'
        }`}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
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
            className='w-full h-10 px-2 text-neutral-ct-primary border border-neutral-br-primary rounded bg-transparent  outline-none text-sm '
            autoFocus
          />
        ) : (
          <span className='truncate max-w-[90%]'>{item.title}</span>
        )}

        {/* Context Menu Button with Popover */}
        {hoveredItem === item.id && renamingItem !== item.id && (
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
        )}
      </div>
    );
  };

  return (
    <div className='w-80 md:flex  bg-white border-r border-neutral-br-secondary hidden flex-col h-full'>
      {/* Header */}
      <div className='p-4'>
        <h2 className='text font-semibold text-neutral-ct-primary mb-3'>
          Chat History
        </h2>

        {/* Search Bar */}
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
      <div className='flex-1 overflow-y-auto px-4 pb-4'>
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
              {groups.map(group => (
                <div key={group.id}>
                  {/* Group Header */}
                  <div className='flex items-center gap-2 py-1 text-sm text-neutral-ct-primary mb-1'>
                    <Folder size={14} className='text-neutral-ct-tertiary' />
                    <span>{group.name}</span>
                  </div>

                  {/* Group Items */}
                  <div className='ml-1.5 px-1.5 space-y-1 border-l border-neutral-br-primary'>
                    {group.items.map(item => renderChatItem(item, true))}
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
        onOpenChange={() => setDeleteChatModal(false)}
      />
      <AddToGroup
        open={openAddToGroupModal}
        onOpenChange={() => setOpenAddToGroupModal(false)}
      />
    </div>
  );
};

export default ChatSidebar;
