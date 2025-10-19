import * as React from 'react';
import { IconProps } from '@/types';

const Pdf: React.FC<IconProps> = ({
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
      d='M14 9.5a.5.5 0 0 1-.5.5H12v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0V9.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5m-8.25 1.25A1.75 1.75 0 0 1 4 12.5h-.5v.5a.5.5 0 0 1-1 0V9.5A.5.5 0 0 1 3 9h1a1.75 1.75 0 0 1 1.75 1.75m-1 0A.75.75 0 0 0 4 10h-.5v1.5H4a.75.75 0 0 0 .75-.75m5.5.5A2.25 2.25 0 0 1 8 13.5H7a.5.5 0 0 1-.5-.5V9.5A.5.5 0 0 1 7 9h1a2.25 2.25 0 0 1 2.25 2.25m-1 0A1.25 1.25 0 0 0 8 10h-.5v2.5H8a1.25 1.25 0 0 0 1.25-1.25M2.5 7V2.5a1 1 0 0 1 1-1h6a.5.5 0 0 1 .354.146l3.5 3.5a.5.5 0 0 1 .146.354V7a.5.5 0 0 1-1 0V6h-3a.5.5 0 0 1-.5-.5v-3H3.5V7a.5.5 0 1 1-1 0M10 5h1.793L10 3.207z'
    />
  </svg>
);

export default Pdf;
