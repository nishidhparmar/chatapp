import * as React from 'react';
import { IconProps } from '@/types';

const Message: React.FC<IconProps> = ({
  size = 16,
  color = '#2C2C29',
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
      d='M13.5 5h-2V3a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v8a.5.5 0 0 0 .813.389L4.5 9.625V11.5a1 1 0 0 0 1 1h5.85l2.338 1.889A.5.5 0 0 0 14.5 14V6a1 1 0 0 0-1-1M4.16 8.611 2.5 9.953V3h8v5.5H4.474a.5.5 0 0 0-.315.111m9.34 4.342-1.66-1.342a.5.5 0 0 0-.312-.111H5.5v-2h5a1 1 0 0 0 1-1V6h2z'
    />
  </svg>
);

export default Message;
