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

const stackedData = [
  { month: 'Jan', veola: 10, bilfa: 7, recycling: 5, other1: 0, other2: 2 },
  { month: 'Feb', veola: 13, bilfa: 2, recycling: 6, other1: 11, other2: 4 },
  { month: 'Mar', veola: 11, bilfa: 8, recycling: 5, other1: 8, other2: 1 },
  { month: 'Apr', veola: 0, bilfa: 0, recycling: 0, other1: 20, other2: 4 },
  { month: 'May', veola: 10, bilfa: 18, recycling: 7, other1: 0, other2: 2 },
  { month: 'Jun', veola: 13, bilfa: 6, recycling: 0, other1: 8, other2: 3 },
  { month: 'Jul', veola: 11, bilfa: 5, recycling: 7, other1: 4, other2: 4 },
  { month: 'Aug', veola: 11, bilfa: 5, recycling: 8, other1: 10, other2: 2 },
  { month: 'Sep', veola: 11, bilfa: 6, recycling: 5, other1: 6, other2: 2 },
  { month: 'Oct', veola: 14, bilfa: 5, recycling: 6, other1: 11, other2: 4 },
];

const StackedChart = () => {
  const isMobile = useIsMobile();

  // Responsive dimensions
  const chartHeight = isMobile ? 300 : 400;
  const margins = { top: 16, right: 16, left: 16, bottom: 16 };
  const fontSize = isMobile ? 12 : 14;
  const barSize = isMobile ? 8 : 14;
  const legendFontSize = isMobile ? 11 : 14;

  return (
    <div className='w-full'>
      <div className='w-full' style={{ height: chartHeight }}>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={stackedData} margin={margins}>
            {/* <CartesianGrid vertical={false} stroke='#E7EBE8' strokeWidth={1} /> */}
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
