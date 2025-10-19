import * as React from 'react';
import { IconProps } from '@/types';

const TableIcon: React.FC<IconProps> = ({
  size = 16,
  color = '#75756F',
  className,
  ...props
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    viewBox='0 0 16 17'
    className={className}
    {...props}
  >
    <path
      fill={color}
      d='M14 3.5H2C1.867 3.5 1.74 3.553 1.646 3.646A.5.5 0 0 0 1.5 4v8.5c0 .265.105.52.293.707.188.188.442.293.707.293h11a1 1 0 0 0 1-1V4a.5.5 0 0 0-.147-.354A.5.5 0 0 0 14 3.5M2.5 7.5H5v2H2.5zm3.5 0h8v2h-8zm7.5-3v2h-11v-2zm-11 6h2.5v2h-2.5zm11 2h-7.5v-2h7.5z'
    />
  </svg>
);

export default TableIcon;
