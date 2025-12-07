import { Skeleton } from '@/components/ui/skeleton';

interface ScheduleListSkeletonProps {
  count?: number;
}

const ScheduleListSkeleton = ({ count = 5 }: ScheduleListSkeletonProps) => {
  return (
    <div className='space-y-3'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='border rounded-lg p-4 space-y-3'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              {/* Schedule Icon */}
              <Skeleton className='h-5 w-5' />

              {/* Schedule Title */}
              <Skeleton className='h-5 w-40' />
            </div>

            {/* Status Badge */}
            <Skeleton className='h-6 w-16 rounded-full' />
          </div>

          {/* Schedule Details */}
          <div className='space-y-2'>
            <div className='flex items-center space-x-2'>
              <Skeleton className='h-4 w-4' />
              <Skeleton className='h-4 w-24' />
            </div>

            <div className='flex items-center space-x-2'>
              <Skeleton className='h-4 w-4' />
              <Skeleton className='h-4 w-32' />
            </div>
          </div>

          {/* Footer */}
          <div className='flex items-center justify-between pt-2 border-t'>
            <Skeleton className='h-3 w-20' />
            <div className='flex space-x-2'>
              <Skeleton className='h-7 w-16 rounded' />
              <Skeleton className='h-7 w-16 rounded' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleListSkeleton;
