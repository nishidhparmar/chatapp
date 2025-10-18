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

const simpleBarData = [
  { month: 'Jan', sale: 24 },
  { month: 'Feb', sale: 36 },
  { month: 'Mar', sale: 33 },
  { month: 'Apr', sale: 25 },
  { month: 'May', sale: 35 },
  { month: 'Jun', sale: 25 },
  { month: 'Jul', sale: 22 },
  { month: 'Aug', sale: 34 },
  { month: 'Sep', sale: 27 },
  { month: 'Oct', sale: 39 },
  { month: 'Nov', sale: 26 },
  { month: 'Dec', sale: 34 },
];

const SimpleChart = () => {
  return (
    <div>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={simpleBarData}
            margin={{ top: 8, right: 24, left: 24, bottom: 24 }}
          >
            <CartesianGrid vertical={false} stroke='#E5E7EB' />
            <XAxis
              dataKey='month'
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 14 }}
            />
            <YAxis
              axisLine={{ stroke: '#E5E7EB' }}
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
                className='text-neutral-600 text-xs font-semibold'
              />
            </YAxis>
            <Bar
              dataKey='sale'
              fill='#3B82F6'
              radius={[4, 4, 0, 0]}
              barSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SimpleChart;
