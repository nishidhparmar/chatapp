import * as React from 'react';
import { IconProps } from '@/types';

const File: React.FC<IconProps> = ({
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
      d='m13.354 5.146-3.5-3.5A.5.5 0 0 0 9.5 1.5h-6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-8a.5.5 0 0 0-.146-.354M10 3.206 11.793 5H10zM12.5 13.5h-9v-11H9v3a.5.5 0 0 0 .5.5h3zm-2-5a.5.5 0 0 1-.5.5H6a.5.5 0 1 1 0-1h4a.5.5 0 0 1 .5.5m0 2a.5.5 0 0 1-.5.5H6a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5'
    />
  </svg>
);

export default File;
