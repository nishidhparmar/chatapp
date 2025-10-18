'use client';
import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
} from 'recharts';

const groupedData = [
  { month: 'Jan', veola: 25, bilfa: 30, recycling: 22 },
  { month: 'Feb', veola: 18, bilfa: 20, recycling: 31 },
  { month: 'Mar', veola: 27, bilfa: 32, recycling: 19 },
  { month: 'Apr', veola: 19, bilfa: 28, recycling: 20 },
  { month: 'May', veola: 16, bilfa: 18, recycling: 28 },
];

const GroupedChart = () => {
  return (
    <div>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={groupedData}
            margin={{ top: 8, right: 24, left: 24, bottom: 24 }}
          >
            <CartesianGrid vertical={false} stroke='#E7EBE8' />
            <XAxis
              dataKey='month'
              axisLine={{ stroke: '#E7EBE8' }}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 14 }}
            />
            <YAxis
              axisLine={{ stroke: '#E7EBE8' }}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 14 }}
              ticks={[0, 40]}
              domain={[0, 40]}
              tickFormatter={v => `${v === 0 ? '0' : v + 'M'}`}
            >
              <Label
                value='Sale'
                angle={-90}
                position='insideLeft'
                style={{ fill: '#6B7280' }}
              />
            </YAxis>
            <Bar
              dataKey='veola'
              fill='#3B86FE'
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
            <Bar
              dataKey='bilfa'
              fill='#8338EC'
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
            <Bar
              dataKey='recycling'
              fill='#FF0062'
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='flex items-center justify-start gap-6 mt-4'>
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 rounded-full bg-blue-500'></div>
          <span className='text-sm text-gray-600'>Veola Ltd</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 rounded-full bg-purple-500'></div>
          <span className='text-sm text-gray-600'>Bilfa Waste Limited</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 rounded-full bg-pink-600'></div>
          <span className='text-sm text-gray-600'>
            Recycling & Recovery Inc.
          </span>
        </div>
      </div>
    </div>
  );
};

export default GroupedChart;
