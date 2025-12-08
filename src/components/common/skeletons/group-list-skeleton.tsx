import { Skeleton } from '@/components/ui/skeleton';

interface GroupListSkeletonProps {
  count?: number;
}

const GroupListSkeleton = ({ count = 4 }: GroupListSkeletonProps) => {
  return (
    <div className='space-y-2'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='flex items-center space-x-3 p-2 rounded-md'>
          {/* Folder Icon */}
          <Skeleton className='h-5 w-5 flex-shrink-0' />

          <div className='flex-1 space-y-1'>
            {/* Group Name */}
            <Skeleton className='h-4 w-2/3' />

            {/* Chat count */}
            <Skeleton className='h-3 w-1/3' />
          </div>

          {/* Expand/Collapse Icon */}
          <Skeleton className='h-4 w-4 flex-shrink-0' />
        </div>
      ))}
    </div>
  );
};

export default GroupListSkeleton;
