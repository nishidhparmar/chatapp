import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { getInitialsFromName } from '@/lib/utils/user-helpers';

interface UserAvatarProps {
  name?: string;
  avatar?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallbackClassName?: string;
  onClick?: () => void;
  alt?: string;
}

const sizeClasses = {
  xs: 'h-5 w-5 text-xs',
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
  xl: 'h-12 w-12 text-lg',
};

const UserAvatar = ({
  name,
  avatar,
  className,
  size = 'md',
  fallbackClassName,
  onClick,
  alt,
}: UserAvatarProps) => {
  // Generate initials from name using helper function
  const initials = getInitialsFromName(name, 'U');

  return (
    <Avatar
      className={cn(
        sizeClasses[size],
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
      onClick={onClick}
    >
      {avatar && (
        <AvatarImage src={avatar} alt={alt || name || 'User avatar'} />
      )}
      <AvatarFallback
        className={cn(
          'bg-gray-300 text-gray-700 font-semibold select-none',
          fallbackClassName
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
