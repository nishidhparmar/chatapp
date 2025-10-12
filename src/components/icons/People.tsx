import * as React from 'react';
import { IconProps } from '@/types';

const Users: React.FC<IconProps> = ({
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
    viewBox='0 0 16 16'
    className={className}
    {...props}
  >
    <path
      fill={color}
      d='M7.327 9.87a3.75 3.75 0 1 0-4.156 0A6 6 0 0 0 .22 12.227a.5.5 0 1 0 .837.546 5 5 0 0 1 8.384 0 .5.5 0 0 0 .838-.546A6 6 0 0 0 7.327 9.87M2.5 6.75a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0m13.134 6.169a.5.5 0 0 1-.692-.146A4.99 4.99 0 0 0 10.75 10.5a.5.5 0 0 1 0-1 2.75 2.75 0 1 0-1.021-5.304.5.5 0 1 1-.371-.928 3.75 3.75 0 0 1 3.47 6.602 6 6 0 0 1 2.952 2.357.5.5 0 0 1-.146.692'
    />
  </svg>
);

export default Users;
