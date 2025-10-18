import * as React from 'react';
import { IconProps } from '@/types';

const BarChartIcon: React.FC<IconProps> = ({
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
    viewBox='0 0 16 17'
    className={className}
    {...props}
  >
    <path
      fill={color}
      d='M14 13h-.5V3a.5.5 0 0 0-.5-.5H9.5A.5.5 0 0 0 9 3v2.5H6a.5.5 0 0 0-.5.5v2.5H3a.5.5 0 0 0-.5.5v4H2a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1m-4-9.5h2.5V13H10zm-3.5 3H9V13H6.5zm-3 3h2V13h-2z'
    />
  </svg>
);

export default BarChartIcon;
