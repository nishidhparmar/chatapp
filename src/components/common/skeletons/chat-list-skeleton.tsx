import { Skeleton } from '@/components/ui/skeleton';

interface ChatListSkeletonProps {
  count?: number;
}

const ChatListSkeleton = ({ count = 5 }: ChatListSkeletonProps) => {
  return (
    <div className='space-y-3'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='flex items-start space-x-3 p-3 rounded-lg'>
          {/* Avatar/Icon */}
          <Skeleton className='h-8 w-8 rounded-full flex-shrink-0' />

          <div className='flex-1 space-y-2'>
            {/* Title */}
            <Skeleton className='h-4 w-3/4' />

            {/* Last message */}
            <Skeleton className='h-3 w-full' />
            <Skeleton className='h-3 w-2/3' />
          </div>

          {/* Time */}
          <Skeleton className='h-3 w-12 flex-shrink-0' />
        </div>
      ))}
    </div>
  );
};

export default ChatListSkeleton;
