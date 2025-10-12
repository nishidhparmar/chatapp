'use client';

import { Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Separator } from '../ui/separator';
import { Chat, Clock, Help, Home, Reports } from '../icons';
import { useState } from 'react';
import CreateNewChat from '../chat/create-new-chat';
import { cn } from '../../lib/utils';

const Sidebar = () => {
  const pathname = usePathname();
  const [createNewChatModal, setNewChatModal] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Chat, label: 'Chats', href: '/chats' },
    { icon: Reports, label: 'Reports', href: '/reports' },
    { icon: Clock, label: 'Schedule', href: '/schedule' },
  ];

  const bottomItems = [
    { icon: Help, label: 'Help', href: '/help' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className='w-20 bg-white border-r border-neutral-br-secondary flex flex-col items-center py-6'>
      {/* Add Button */}
      <button
        onClick={() => setNewChatModal(true)}
        className='w-10 h-10 bg-brand-alternate rounded-full flex items-center justify-center text-white hover:bg-brand-active transition-colors'
      >
        <Plus size={20} />
      </button>
      <div className='px-2 w-full'>
        <Separator className='my-6 ' />
      </div>
      {/* Navigation Items */}
      <div className='flex-1 flex flex-col gap-6'>
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col rounded w-[64px] py-2 gap-1 justify-center items-center transition-colors ${
              isActive(item.href)
                ? '!text-brand-ct-brand font-semibold bg-[#DBEAFE] rounded-lg w-full'
                : 'text-neutral-ct-tertiary hover:text-neutral-ct-primary'
            }`}
          >
            <item.icon
              size={24}
              // Ensure the color is passed directly for full compatibility
              color={
                isActive(item.href)
                  ? '#1D4ED8' // brand-ct-brand (blue-700)
                  : '#94A3B8' // neutral-ct-tertiary (slate-400)
              }
              className={cn(
                isActive(item.href)
                  ? '!text-brand-ct-brand'
                  : 'text-neutral-ct-tertiary'
              )}
            />
            <span className='text-xs'>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Bottom Items */}
      <div className='flex flex-col gap-6 mt-auto'>
        {bottomItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col rounded w-[64px] py-2 gap-1 justify-center items-center transition-colors ${
              isActive(item.href)
                ? '!text-brand-ct-brand font-semibold bg-[#DBEAFE] rounded-lg w-full'
                : 'text-neutral-ct-tertiary hover:text-neutral-ct-primary'
            }`}
          >
            <item.icon
              size={24}
              // Ensure the color is passed directly for full compatibility
              color={
                isActive(item.href)
                  ? '#1D4ED8' // brand-ct-brand (blue-700)
                  : '#94A3B8' // neutral-ct-tertiary (slate-400)
              }
              className={cn(
                isActive(item.href)
                  ? '!text-brand-ct-brand'
                  : 'text-neutral-ct-tertiary'
              )}
            />
            <span className='text-xs'>{item.label}</span>
          </Link>
        ))}
      </div>
      <CreateNewChat
        open={createNewChatModal}
        onOpenChange={() => setNewChatModal(false)}
      />
    </div>
  );
};

export default Sidebar;
