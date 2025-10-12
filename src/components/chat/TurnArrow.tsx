import * as React from 'react';
import { IconProps } from '@/types';

const TurnArrow: React.FC<IconProps> = ({
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
      d='M14.5 7a4.005 4.005 0 0 1-4 4H3.207l2.147 2.146a.5.5 0 0 1-.707.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .707.708L3.207 10H10.5a3 3 0 0 0 0-6H5a.5.5 0 0 1 0-1h5.5a4.004 4.004 0 0 1 4 4'
    />
  </svg>
);

export default TurnArrow;
