'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { getDisplayName } from '@/lib/utils/user-helpers';
import UserAvatar from './user-avatar';

export function UserProfile() {
  const { user, isLoading, error, isAuthenticated } = useCurrentUser();

  if (isLoading) {
    return <div>Loading user...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  const displayName = getDisplayName(user);

  return (
    <div className='flex items-center gap-3'>
      <UserAvatar name={displayName} avatar={user?.avatar} size='md' />
      <div>
        <p className='font-medium'>{displayName}</p>
        {user?.role && <p className='text-sm text-gray-500'>{user.role}</p>}
      </div>
    </div>
  );
}
