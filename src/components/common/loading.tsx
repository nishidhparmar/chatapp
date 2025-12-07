import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const Loading = ({ size = 'md', className, text }: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Loader
        className={cn(
          'animate-spin text-neutral-ct-secondary',
          sizeClasses[size]
        )}
      />
      {text && (
        <span
          className={cn('text-neutral-ct-secondary', textSizeClasses[size])}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default Loading;
