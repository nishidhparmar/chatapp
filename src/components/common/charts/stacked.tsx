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

const stackedData = [
  { month: 'Jan', veola: 10, bilfa: 7, recycling: 5, other1: 0, other2: 2 },
  { month: 'Feb', veola: 13, bilfa: 2, recycling: 6, other1: 11, other2: 4 },
  { month: 'Mar', veola: 11, bilfa: 8, recycling: 5, other1: 8, other2: 1 },
  { month: 'Apr', veola: 0, bilfa: 0, recycling: 0, other1: 20, other2: 4 },
  { month: 'May', veola: 10, bilfa: 18, recycling: 7, other1: 0, other2: 0 },
  { month: 'Jun', veola: 13, bilfa: 6, recycling: 0, other1: 8, other2: 0 },
  { month: 'Jul', veola: 11, bilfa: 5, recycling: 7, other1: 4, other2: 0 },
  { month: 'Aug', veola: 11, bilfa: 5, recycling: 8, other1: 10, other2: 0 },
  { month: 'Sep', veola: 11, bilfa: 6, recycling: 5, other1: 6, other2: 0 },
  { month: 'Oct', veola: 14, bilfa: 5, recycling: 6, other1: 11, other2: 4 },
];

const StackedChart = () => {
  return (
    <div>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={stackedData}
            margin={{ top: 8, right: 24, left: 24, bottom: 24 }}
          >
            <CartesianGrid vertical={false} stroke='#E7EBE8' />
            <XAxis
              dataKey='month'
              axisLine={{ stroke: '#E7EBE8' }}
              tickLine={false}
              tick={{ fill: '#75756F', fontSize: 14 }}
            />
            <YAxis
              axisLine={{ stroke: '#E7EBE8' }}
              tickLine={false}
              tick={{ fill: '#75756F', fontSize: 14 }}
              ticks={[0, 40]}
              domain={[0, 40]}
              tickFormatter={v => `${v === 0 ? '0' : v + 'M'}`}
            >
              <Label
                value='Sale'
                angle={-90}
                position='insideLeft'
                style={{ fill: '#75756F' }}
              />
            </YAxis>
            E7EBE8
            <Bar
              dataKey='veola'
              stackId='a'
              fill='#99D12E'
              radius={[0, 0, 0, 0]}
              barSize={14}
            />
            <Bar
              dataKey='bilfa'
              stackId='a'
              fill='#FF99BE'
              radius={[0, 0, 0, 0]}
              barSize={14}
            />
            <Bar
              dataKey='recycling'
              stackId='a'
              fill='#FFBE0D'
              radius={[0, 0, 0, 0]}
              barSize={14}
            />
            <Bar
              dataKey='other1'
              stackId='a'
              fill='#FF0062'
              radius={[0, 0, 0, 0]}
              barSize={14}
            />
            <Bar
              dataKey='other2'
              stackId='a'
              fill='#3B86FE'
              radius={[4, 4, 0, 0]}
              barSize={14}
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

export default StackedChart;
