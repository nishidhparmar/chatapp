import * as React from 'react';
import { IconProps } from '@/types';

const ChevronUp: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  className,
  ...props
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    viewBox='0 0 24 24'
    className={className}
    {...props}
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

export default ChevronUp;
