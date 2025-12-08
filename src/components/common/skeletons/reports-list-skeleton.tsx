import { Skeleton } from '@/components/ui/skeleton';

interface ReportsListSkeletonProps {
  count?: number;
}

const ReportsListSkeleton = ({ count = 6 }: ReportsListSkeletonProps) => {
  return (
    <div className='space-y-4'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='border rounded-lg p-4 space-y-3'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              {/* Report Icon */}
              <Skeleton className='h-6 w-6' />

              {/* Report Title */}
              <Skeleton className='h-5 w-32' />
            </div>

            {/* Actions */}
            <div className='flex space-x-2'>
              <Skeleton className='h-8 w-8 rounded' />
              <Skeleton className='h-8 w-8 rounded' />
            </div>
          </div>

          {/* Description */}
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-3/4' />

          {/* Footer */}
          <div className='flex items-center justify-between pt-2'>
            <div className='flex space-x-4'>
              <Skeleton className='h-3 w-16' />
              <Skeleton className='h-3 w-20' />
            </div>
            <Skeleton className='h-3 w-12' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportsListSkeleton;
