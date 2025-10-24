'use client';

import { Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { Chat, Clock, Help, Home, Reports } from '../icons';
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
    <div className='w-20 bg-white border-r border-neutral-br-secondary hidden flex-col items-center py-6 md:flex '>
      {/* Add Button */}
      <button
        onClick={() => setNewChatModal(true)}
        className='w-10 h-10 cursor-pointer bg-brand-alternate rounded-full flex items-center justify-center text-white hover:bg-brand-active transition-colors'
      >
        <Plus size={20} />
      </button>
      <div className='px-2 w-full'>
        <Separator className='my-6' />
      </div>
      {/* Navigation Items */}
      <div className='flex-1 flex flex-col gap-6 '>
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col rounded w-16 py-2 gap-1 justify-center items-center transition-colors ${
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

      {/* Bottom Items */}
      <div className='flex flex-col gap-6 mt-auto'>
        {bottomItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col rounded w-16 py-2 gap-1 justify-center items-center transition-colors ${
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
