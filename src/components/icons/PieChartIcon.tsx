import * as React from 'react';
import { IconProps } from '@/types';

const PieChartIcon: React.FC<IconProps> = ({
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
      d='M8 2a6.5 6.5 0 1 0 6.5 6.5A6.507 6.507 0 0 0 8 2m4.492 3.33L8.5 7.633v-4.61a5.5 5.5 0 0 1 3.992 2.305M7.5 3.022v5.188l-4.493 2.593A5.5 5.5 0 0 1 7.5 3.024M8 14a5.5 5.5 0 0 1-4.492-2.33l9.485-5.475A5.5 5.5 0 0 1 8 14'
    />
  </svg>
);

export default PieChartIcon;
