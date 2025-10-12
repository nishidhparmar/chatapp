import React from 'react';

interface ChevronUpProps {
  size?: number;
  color?: string;
  className?: string;
}

const ChevronUp: React.FC<ChevronUpProps> = ({
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M18 15L12 9L6 15'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ChevronUp;
