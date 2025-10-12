import * as React from 'react';
import { IconProps } from '@/types';

const FolderOpen: React.FC<IconProps> = ({
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
      d='M15.313 6.915A1 1 0 0 0 14.5 6.5h-1v-1a1 1 0 0 0-1-1H8.167L6.434 3.2c-.174-.13-.384-.2-.6-.2H2.5a1 1 0 0 0-1 1v9a.5.5 0 0 0 .5.5h11.194a.5.5 0 0 0 .474-.342l1.78-5.342a1 1 0 0 0-.136-.901M5.833 4l1.734 1.3c.173.13.384.2.6.2H12.5v1H4.36a1 1 0 0 0-.948.684L2.5 9.919V4zm7 8.5H2.694l1.668-5H14.5z'
    />
  </svg>
);

export default FolderOpen;
