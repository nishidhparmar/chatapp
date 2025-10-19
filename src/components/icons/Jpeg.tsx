import * as React from 'react';
import { IconProps } from '@/types';

const Jpeg: React.FC<IconProps> = ({
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
      d='M7.5 9h-1a.5.5 0 0 0-.5.5V13a.5.5 0 0 0 1 0v-.5h.5a1.75 1.75 0 0 0 0-3.5m0 2.5H7V10h.5a.75.75 0 1 1 0 1.5m6 0v1.054a.5.5 0 0 1-.139.346 1.88 1.88 0 0 1-1.361.6c-1.103 0-2-1.01-2-2.25S10.897 9 12 9c.368.001.726.113 1.03.32a.5.5 0 1 1-.562.829A.83.83 0 0 0 12 10c-.551 0-1 .563-1 1.25s.449 1.25 1 1.25a.85.85 0 0 0 .5-.17V12a.5.5 0 0 1 0-1h.5a.5.5 0 0 1 .5.5M5 9.5v2.375a1.625 1.625 0 1 1-3.25 0 .5.5 0 0 1 1 0 .625.625 0 1 0 1.25 0V9.5a.5.5 0 1 1 1 0m8.354-4.354-3.5-3.5A.5.5 0 0 0 9.5 1.5h-6a1 1 0 0 0-1 1V7a.5.5 0 1 0 1 0V2.5H9v3a.5.5 0 0 0 .5.5h3v1a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.146-.354M10 5V3.207L11.793 5z'
    />
  </svg>
);

export default Jpeg;
