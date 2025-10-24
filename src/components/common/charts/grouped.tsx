'use client';
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  TooltipContentProps,
} from 'recharts';
import { useIsMobile } from '../../../hooks/use-mobile';

const groupedData = [
  { month: 'Jan', fullMonth: 'January', veola: 25, bilfa: 30, recycling: 22 },
  { month: 'Feb', fullMonth: 'February', veola: 18, bilfa: 20, recycling: 31 },
  { month: 'Mar', fullMonth: 'March', veola: 27, bilfa: 32, recycling: 19 },
  { month: 'Apr', fullMonth: 'April', veola: 19, bilfa: 28, recycling: 20 },
  { month: 'May', fullMonth: 'May', veola: 16, bilfa: 18, recycling: 28 },
];

// Custom Tooltip Component
const CustomTooltip = ({
  active,
  payload,
}: TooltipContentProps<string | number, string>) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className='relative' style={{ transform: 'translateY(-20px)' }}>
      {/* Tooltip Box */}
      <div className='bg-gray-700 text-white rounded-lg p-3 shadow-lg min-w-[200px]'>
        <div className='text-sm font-medium mb-2 text-gray-200'>
          {data.fullMonth}
        </div>

        {/* Veola Ltd */}
        <div className='flex items-center justify-between gap-6 mb-1.5'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-blue-500'></div>
            <span className='text-xs text-gray-300'>Veola Ltd</span>
          </div>
          <span className='text-xs font-semibold'>{data.veola}</span>
        </div>

        {/* Bilfa Waste Limited */}
        <div className='flex items-center justify-between gap-6 mb-1.5'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-purple-500'></div>
            <span className='text-xs text-gray-300'>Bilfa Waste Limited</span>
          </div>
          <span className='text-xs font-semibold'>{data.bilfa}</span>
        </div>

        {/* Recycling & Recovery Inc. */}
        <div className='flex items-center justify-between gap-6'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-pink-600'></div>
            <span className='text-xs text-gray-300'>
              Recycling & Recovery Inc.
            </span>
          </div>
          <span className='text-xs font-semibold'>{data.recycling}</span>
        </div>
      </div>
    </div>
  );
};

const GroupedChart = () => {
  const isMobile = useIsMobile();

  // Responsive dimensions
  const chartHeight = isMobile ? 300 : 400;
  const margins = isMobile
    ? { top: 80, right: 16, left: 16, bottom: 16 }
    : { top: 80, right: 24, left: 24, bottom: 24 };
  const fontSize = isMobile ? 12 : 14;
  const barSize = isMobile ? 12 : 24;
  const legendFontSize = isMobile ? 11 : 14;

  return (
    <div className='w-full'>
      <div className='w-full' style={{ height: chartHeight }}>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={groupedData} margin={margins}>
            <XAxis
              dataKey='month'
              axisLine={{ stroke: '#E7EBE8', strokeWidth: 1 }}
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
              axisLine={{ stroke: '#E7EBE8', strokeWidth: 1 }}
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
                position='end'
                style={{
                  fill: '#6B7280',
                  fontSize: fontSize,
                  fontWeight: 500,
                }}
              />
            </YAxis>
            <Tooltip
              content={CustomTooltip}
              cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
            />
            <Bar
              dataKey='veola'
              fill='#3B86FE'
              radius={[4, 4, 0, 0]}
              barSize={barSize}
            />
            <Bar
              dataKey='bilfa'
              fill='#8338EC'
              radius={[4, 4, 0, 0]}
              barSize={barSize}
            />
            <Bar
              dataKey='recycling'
              fill='#FF0062'
              radius={[4, 4, 0, 0]}
              barSize={barSize}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div
        className={`flex items-center justify-start gap-6 mt-4 ${isMobile ? 'flex-wrap' : ''}`}
      >
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 rounded-full bg-blue-500'></div>
          <span className='text-gray-600' style={{ fontSize: legendFontSize }}>
            Veola Ltd
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 rounded-full bg-purple-500'></div>
          <span className='text-gray-600' style={{ fontSize: legendFontSize }}>
            Bilfa Waste Limited
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 rounded-full bg-pink-600'></div>
          <span className='text-gray-600' style={{ fontSize: legendFontSize }}>
            Recycling & Recovery Inc.
          </span>
        </div>
      </div>
    </div>
  );
};

export default GroupedChart;
