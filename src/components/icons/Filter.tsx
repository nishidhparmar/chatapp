import * as React from 'react';
import { IconProps } from '@/types';

const Filter: React.FC<IconProps> = ({
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
      d='M3 7H21M6 12H18M9 17H15'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default Filter;
