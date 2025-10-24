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

const stackedData = [
  {
    month: 'Jan',
    fullMonth: 'January',
    veola: 10,
    bilfa: 7,
    recycling: 5,
    other1: 0,
    other2: 2,
  },
  {
    month: 'Feb',
    fullMonth: 'February',
    veola: 13,
    bilfa: 2,
    recycling: 6,
    other1: 11,
    other2: 4,
  },
  {
    month: 'Mar',
    fullMonth: 'March',
    veola: 11,
    bilfa: 8,
    recycling: 5,
    other1: 8,
    other2: 1,
  },
  {
    month: 'Apr',
    fullMonth: 'April',
    veola: 0,
    bilfa: 0,
    recycling: 0,
    other1: 20,
    other2: 4,
  },
  {
    month: 'May',
    fullMonth: 'May',
    veola: 10,
    bilfa: 18,
    recycling: 7,
    other1: 0,
    other2: 2,
  },
  {
    month: 'Jun',
    fullMonth: 'June',
    veola: 13,
    bilfa: 6,
    recycling: 0,
    other1: 8,
    other2: 3,
  },
  {
    month: 'Jul',
    fullMonth: 'July',
    veola: 11,
    bilfa: 5,
    recycling: 7,
    other1: 4,
    other2: 4,
  },
  {
    month: 'Aug',
    fullMonth: 'August',
    veola: 11,
    bilfa: 5,
    recycling: 8,
    other1: 10,
    other2: 2,
  },
  {
    month: 'Sep',
    fullMonth: 'September',
    veola: 11,
    bilfa: 6,
    recycling: 5,
    other1: 6,
    other2: 2,
  },
  {
    month: 'Oct',
    fullMonth: 'October',
    veola: 14,
    bilfa: 5,
    recycling: 6,
    other1: 11,
    other2: 4,
  },
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

        {/* Veola */}
        {data.veola > 0 && (
          <div className='flex items-center justify-between gap-6 mb-1.5'>
            <div className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: '#99D12E' }}
              ></div>
              <span className='text-xs text-gray-300'>Veola</span>
            </div>
            <span className='text-xs font-semibold'>{data.veola}M</span>
          </div>
        )}

        {/* Bilfa */}
        {data.bilfa > 0 && (
          <div className='flex items-center justify-between gap-6 mb-1.5'>
            <div className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: '#FF99BE' }}
              ></div>
              <span className='text-xs text-gray-300'>Bilfa</span>
            </div>
            <span className='text-xs font-semibold'>{data.bilfa}M</span>
          </div>
        )}

        {/* Recycling */}
        {data.recycling > 0 && (
          <div className='flex items-center justify-between gap-6 mb-1.5'>
            <div className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: '#FFBE0D' }}
              ></div>
              <span className='text-xs text-gray-300'>Recycling</span>
            </div>
            <span className='text-xs font-semibold'>{data.recycling}M</span>
          </div>
        )}

        {/* Other 1 */}
        {data.other1 > 0 && (
          <div className='flex items-center justify-between gap-6 mb-1.5'>
            <div className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: '#FF0062' }}
              ></div>
              <span className='text-xs text-gray-300'>Other 1</span>
            </div>
            <span className='text-xs font-semibold'>{data.other1}M</span>
          </div>
        )}

        {/* Other 2 */}
        {data.other2 > 0 && (
          <div className='flex items-center justify-between gap-6'>
            <div className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: '#3B86FE' }}
              ></div>
              <span className='text-xs text-gray-300'>Other 2</span>
            </div>
            <span className='text-xs font-semibold'>{data.other2}M</span>
          </div>
        )}
      </div>
    </div>
  );
};

const StackedChart = () => {
  const isMobile = useIsMobile();

  // Responsive dimensions
  const chartHeight = isMobile ? 300 : 400;
  const margins = { top: 80, right: 16, left: 16, bottom: 16 };
  const fontSize = isMobile ? 12 : 14;
  const barSize = isMobile ? 8 : 14;
  const legendFontSize = isMobile ? 11 : 14;

  return (
    <div className='w-full'>
      <div className='w-full' style={{ height: chartHeight }}>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={stackedData} margin={margins}>
            <XAxis
              dataKey='month'
              axisLine={{ stroke: '#E7EBE8', strokeWidth: 1 }}
              tickLine={false}
              tick={{
                fill: '#75756F',
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
                fill: '#75756F',
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
                  fill: '#75756F',
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
              stackId='a'
              fill='#99D12E'
              radius={[0, 0, 0, 0]}
              barSize={barSize}
            />
            <Bar
              dataKey='bilfa'
              stackId='a'
              fill='#FF99BE'
              radius={[0, 0, 0, 0]}
              barSize={barSize}
            />
            <Bar
              dataKey='recycling'
              stackId='a'
              fill='#FFBE0D'
              radius={[0, 0, 0, 0]}
              barSize={barSize}
            />
            <Bar
              dataKey='other1'
              stackId='a'
              fill='#FF0062'
              radius={[0, 0, 0, 0]}
              barSize={barSize}
            />
            <Bar
              dataKey='other2'
              stackId='a'
              fill='#3B86FE'
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

export default StackedChart;
