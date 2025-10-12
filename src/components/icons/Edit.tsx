import * as React from 'react';
import { IconProps } from '@/types';

const Edit: React.FC<IconProps> = ({
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
      d='m14.207 4.586-2.793-2.793a1 1 0 0 0-1.414 0L2.293 9.5a1 1 0 0 0-.293.707v2.794a1 1 0 0 0 1 1h2.793a1 1 0 0 0 .707-.294L14.207 6a1 1 0 0 0 0-1.414m-8.414 8.415H3v-2.794l5.5-5.5L11.293 7.5zM12 6.793 9.207 4l1.5-1.5L13.5 5.293z'
    />
  </svg>
);

export default Edit;
