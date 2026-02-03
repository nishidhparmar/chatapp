'use client';

import { Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { Chat, Clock, Home, Reports } from '../icons';
import { Dispatch } from 'react';
import { usePathname } from 'next/navigation';

const Sidebar = ({
  setNewChatModal,
}: {
  setNewChatModal: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    {
      icon: Plus,
      label: 'New Chat',
      href: null,
      onClick: () => setNewChatModal(true),
    },
    { icon: Chat, label: 'Chats', href: '/chats' },
    { icon: Reports, label: 'Dashboard', href: '/dashboard' },
    { icon: Clock, label: 'Reports', href: '/reports' },
  ];

  const bottomItems = [
    // { icon: Help, label: 'Help', href: '/help' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const isActive = (href: string | null) => {
    if (!href) return false;
    if (href === '/') {
      return (
        pathname === '/' ||
        pathname.startsWith('/chat/') ||
        pathname.startsWith('/conversations')
      );
    }
    return pathname.startsWith(href);
  };

  return (
    <div className='w-22 bg-white border-r border-neutral-br-secondary hidden flex-col items-center py-6 md:flex '>
      {/* Navigation Items */}
      <div className='flex-1 flex flex-col gap-6 '>
        {navItems.map(item => {
          if (item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col rounded w-18 py-2 gap-1 justify-center items-center cursor-pointer transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-700 font-semibold bg-blue-100 rounded-lg w-full'
                    : item.label === 'Home'
                      ? 'text-blue-700'
                      : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <item.icon
                  size={24}
                  color={
                    isActive(item.href) || item.label === 'Home'
                      ? '#1D4ED8'
                      : '#94A3B8'
                  }
                />
                <span className='text-xs'>{item.label}</span>
              </Link>
            );
          }

          return (
            <button
              key={item.label}
              onClick={item.onClick}
              className='flex flex-col rounded w-18 py-2 gap-1 cursor-pointer justify-center items-center transition-colors text-slate-400 hover:text-slate-700'
            >
              <item.icon size={24} color='#94A3B8' />
              <span className='text-xs'>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Items */}
      <div className='flex flex-col gap-6 mt-auto'>
        {bottomItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col rounded w-18 py-2 cursor-pointer gap-1 justify-center items-center transition-colors ${
              isActive(item.href)
                ? 'text-blue-700 font-semibold bg-blue-100 rounded-lg w-full'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <item.icon
              size={24}
              color={isActive(item.href) ? '#1D4ED8' : '#94A3B8'}
            />
            <span className='text-xs'>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
