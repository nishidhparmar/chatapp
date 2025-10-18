import * as React from 'react';
import { IconProps } from '@/types';

const ChartLineIcon: React.FC<IconProps> = ({
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
      d='M14.5 13.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-10a.5.5 0 1 1 1 0v5.898l3.17-2.773a.5.5 0 0 1 .63-.024l3.676 2.757 3.695-3.233a.5.5 0 1 1 .658.75l-4 3.5a.5.5 0 0 1-.629.024L6.024 7.643 2.5 10.727V13H14a.5.5 0 0 1 .5.5'
    />
  </svg>
);

export default ChartLineIcon;
