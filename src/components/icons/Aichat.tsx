import * as React from 'react';
import { IconProps } from '@/types';

const Aichat: React.FC<IconProps> = ({
  size = 24,
  color = '#2563EB',
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
    {/* Background Circle */}
    <circle cx='12' cy='12' r='12' fill={color} />

    {/* Inner White Shapes */}
    <g fill='#fff' clipPath='url(#clip0)'>
      <circle cx='8.133' cy='15.2' r='2.667' />
      <rect
        width='12.8'
        height='5.333'
        x='13.17'
        y='5.2'
        rx='2.6'
        transform='rotate(60 13.17 5.2)'
      />
    </g>

    <defs>
      <clipPath id='clip0'>
        <path fill='#fff' d='M5.467 6h13.2v12.133h-13.2z' />
      </clipPath>
    </defs>
  </svg>
);

export default Aichat;
