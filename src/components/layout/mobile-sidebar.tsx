'use client';

import { Settings } from 'lucide-react';
import Link from 'next/link';
import { Chat, Clock, Help, Home, Reports } from '../icons';
import { usePathname } from 'next/navigation';

const MobileSidebar = () => {
  const pathname = usePathname();
  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Chat, label: 'Chats', href: '/chats' },
    { icon: Reports, label: 'Reports', href: '/dashboard' },
    { icon: Clock, label: 'Schedule', href: '/schedule' },
    { icon: Help, label: 'Help', href: '/help' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className='px-4'>
      {/* Navigation Items */}
      <div className=' flex flex-col gap-4 '>
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className='flex items-center gap-3'
          >
            <item.icon
              size={20}
              color={isActive(item.href) ? '#1D4ED8' : '#94A3B8'}
              className={
                isActive(item.href) ? 'text-brand-ct-brand' : 'text-slate-400'
              }
            />
            <span className='text-xs text-neutral-ct-primary'>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileSidebar;
