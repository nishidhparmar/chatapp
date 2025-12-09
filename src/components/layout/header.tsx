'use client';

// Header Component
import { IoIosArrowDown } from 'react-icons/io';
import { Button } from '../ui/Button';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { useUserStore } from '@/lib/stores/user-store';
import UserAvatar from '../common/user-avatar';
import { getDisplayName } from '@/lib/utils/user-helpers';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/hooks/mutations';

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { user } = useUserStore();
  const router = useRouter();
  const logoutMutation = useLogout();

  const displayName = getDisplayName(user);

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      logoutMutation.mutate({ refresh_token: refreshToken });
    } else {
      logoutMutation.mutate({ refresh_token: '' });
    }
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  return (
    <div className='bg-white border-b border-neutral-br-secondary h-14 px-4 flex items-center justify-between'>
      <Button
        variant={'secondary'}
        size={'icon'}
        onClick={onMenuClick}
        className='md:hidden block'
      >
        <HiOutlineBars3 />
      </Button>
      <div className='md:block hidden' />
      <Popover>
        <PopoverTrigger asChild>
          <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md transition-colors'>
            <UserAvatar name={displayName} avatar={user?.avatar} size='md' />
            <span className='text-sm font-semibold'>{displayName}</span>
            <IoIosArrowDown className='text-neutral-ct-tertiary' />
          </div>
        </PopoverTrigger>
        <PopoverContent className='w-56 p-0' align='end'>
          <div className='p-3 border-b'>
            <div className='flex items-center gap-3'>
              <UserAvatar name={displayName} avatar={user?.avatar} size='md' />
              <div className='flex flex-col'>
                <span className='text-sm font-semibold'>{displayName}</span>
                <span className='text-xs text-gray-500'>{user?.email}</span>
              </div>
            </div>
          </div>
          <div className='p-1'>
            <Button
              variant='ghost'
              className='w-full justify-start gap-2 h-9'
              onClick={handleSettings}
            >
              <Settings className='h-4 w-4' />
              Settings
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start gap-2 h-9 text-red-600 hover:text-red-700 hover:bg-red-50'
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <LogOut className='h-4 w-4' />
              {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default Header;
