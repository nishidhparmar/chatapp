import * as React from 'react';
import { IconProps } from '@/types';

const Share: React.FC<IconProps> = ({
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
      d='M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12549 15.0077 5.24896 15.0227 5.37004L8.08331 9.17004C7.54303 8.44415 6.80839 8 6 8C4.34315 8 3 9.34315 3 11C3 12.6569 4.34315 14 6 14C6.80839 14 7.54303 13.5558 8.08331 12.83L15.0227 16.63C15.0077 16.751 15 16.8745 15 17C15 18.6569 16.3431 20 18 20C19.6569 20 21 18.6569 21 17C21 15.3431 19.6569 14 18 14C17.1916 14 16.457 14.4442 15.9167 15.17L8.97727 11.37C8.99234 11.249 9 11.1255 9 11C9 10.8745 8.99234 10.751 8.97727 10.63L15.9167 6.83C16.457 7.55585 17.1916 8 18 8Z'
      fill={color}
    />
  </svg>
);

export default Share;
