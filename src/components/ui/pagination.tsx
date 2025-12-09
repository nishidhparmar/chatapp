import React from 'react';
import { ChevronDown } from '../icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: {
      button: 'px-2 py-1 text-xs',
      icon: 12,
      text: 'text-xs',
    },
    md: {
      button: 'px-3 py-2 text-sm',
      icon: 16,
      text: 'text-sm',
    },
  };

  const classes = sizeClasses[size];

  if (totalPages <= 1) return null;

  return (
    <div
      className={`flex items-center justify-between pt-3 mt-3 border-t border-neutral-br-secondary ${className}`}
    >
      <button
        onClick={onPrevPage}
        disabled={!hasPrevPage}
        className={`flex items-center gap-1 ${classes.button} text-neutral-ct-secondary hover:text-neutral-ct-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
      >
        <ChevronDown size={classes.icon} className='rotate-90' />
        Previous
      </button>

      <div className='flex items-center gap-1'>
        <span className={`${classes.text} text-neutral-ct-secondary`}>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <button
        onClick={onNextPage}
        disabled={!hasNextPage}
        className={`flex items-center gap-1 ${classes.button} text-neutral-ct-secondary hover:text-neutral-ct-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
      >
        Next
        <ChevronDown size={classes.icon} className='-rotate-90' />
      </button>
    </div>
  );
};
