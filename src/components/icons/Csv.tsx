import * as React from 'react';
import { IconProps } from '@/types';

const Csv: React.FC<IconProps> = ({
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
      d='M2.5 7V2.5a1 1 0 0 1 1-1h6a.5.5 0 0 1 .354.146l3.5 3.5a.5.5 0 0 1 .146.354V7a.5.5 0 0 1-1 0V6h-3a.5.5 0 0 1-.5-.5v-3H3.5V7a.5.5 0 1 1-1 0M10 5h1.793L10 3.207z'
    />
    <path
      fill={color}
      d='M4.5 9.5A1.5 1.5 0 0 0 3 11v1a1.5 1.5 0 0 0 3 0v-.5a.5.5 0 0 1 1 0V12a2.5 2.5 0 0 1-5 0v-1a2.5 2.5 0 0 1 5 0 .5.5 0 0 1-1 0 1.5 1.5 0 0 0-1.5-1.5M8.5 9a.5.5 0 0 1 .5.5v.5h1v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1H11v.5h.5a.5.5 0 0 1 0 1H11v.5a.5.5 0 0 1-1 0V13H9v.5a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 .5-.5M9 11h1v1H9zm4.5-1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5'
    />
  </svg>
);

export default Csv;
