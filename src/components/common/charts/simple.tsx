'use client';
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
} from 'recharts';
import { useIsMobile } from '../../../hooks/use-mobile';

const simpleBarData = [
  { month: 'Jan', fullMonth: 'January', sale: 24 },
  { month: 'Feb', fullMonth: 'February', sale: 36 },
  { month: 'Mar', fullMonth: 'March', sale: 33 },
  { month: 'Apr', fullMonth: 'April', sale: 25 },
  { month: 'May', fullMonth: 'May', sale: 35 },
  { month: 'Jun', fullMonth: 'June', sale: 25 },
  { month: 'Jul', fullMonth: 'July', sale: 22 },
  { month: 'Aug', fullMonth: 'August', sale: 34 },
  { month: 'Sep', fullMonth: 'September', sale: 27 },
  { month: 'Oct', fullMonth: 'October', sale: 39 },
  { month: 'Nov', fullMonth: 'November', sale: 26 },
  { month: 'Dec', fullMonth: 'December', sale: 34 },
];

// Custom Tooltip Component
// const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
//   if (active && payload && payload.length) {
//     const data = payload[0].payload;
//     return (
//       <div className='relative' style={{ transform: 'translateY(-20px)' }}>
//         {/* Tooltip Box */}
//         <div className='bg-gray-700 text-white rounded-[8px] p-4 shadow-lg'>
//           <div className='flex items-center justify-between gap-8 text-xs'>
//             <span className='font-medium'>{data.fullMonth}</span>
//             <span className='font-semibold'>{data.sale}.4M</span>
//           </div>
//         </div>
//         {/* Arrow pointing down */}
//         <div className='absolute left-1/2 -translate-x-1/2 -bottom-3'>
//           <div className='w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-gray-700' />
//         </div>
//       </div>
//     );
//   }
//   return null;
// };

const SimpleChart = () => {
  const isMobile = useIsMobile();

  // Responsive dimensions
  const chartHeight = isMobile ? 300 : 400;
  const margins = { top: 80, right: 16, left: 16, bottom: 16 }; // Increased top margin for tooltip
  const fontSize = isMobile ? 12 : 14;
  const barSize = isMobile ? 6 : 14;
  const barRadius = isMobile ? 2 : 4;

  return (
    <div className='w-full'>
      <div className='w-full' style={{ height: chartHeight }}>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={simpleBarData} margin={margins}>
            <XAxis
              dataKey='month'
              axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              tickLine={false}
              tick={{
                fill: '#6B7280',
                fontSize: fontSize,
                fontWeight: 500,
              }}
              interval={isMobile ? 1 : 0}
              height={isMobile ? 40 : 50}
            />
            <YAxis
              axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              tickLine={false}
              tick={{
                fill: '#6B7280',
                fontSize: fontSize,
                fontWeight: 500,
              }}
              ticks={[0, 40]}
              domain={[0, 40]}
              tickFormatter={v => `${v === 0 ? '0' : v + 'M'}`}
              width={isMobile ? 40 : 50}
            >
              <Label
                value='Sale'
                angle={-90}
                position='insideLeft'
                style={{
                  textAnchor: 'middle',
                  fill: '#6B7280',
                  fontSize: fontSize,
                  fontWeight: 600,
                }}
              />
            </YAxis>
            {/* <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            /> */}
            <Bar
              dataKey='sale'
              fill='#3B82F6'
              radius={[barRadius, barRadius, 0, 0]}
              barSize={barSize}
              maxBarSize={isMobile ? 20 : 30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimpleChart;
