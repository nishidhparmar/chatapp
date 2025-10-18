'use client';
import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
} from 'recharts';

const lineData = [
  { date: '05', leads: 95 },
  { date: '06', leads: 100 },
  { date: '07', leads: 120 },
  { date: '08', leads: 108 },
  { date: '09', leads: 100 },
  { date: '10', leads: 105 },
  { date: '11', leads: 90 },
  { date: '12', leads: 92 },
  { date: '13', leads: 85 },
  { date: '14', leads: 95 },
  { date: '15', leads: 78 },
  { date: '16', leads: 100 },
  { date: '17', leads: 105 },
  { date: '18', leads: 65 },
  { date: '19', leads: 80 },
  { date: '20', leads: 85 },
  { date: '21', leads: 75 },
  { date: '22', leads: 60 },
  { date: '23', leads: 72 },
  { date: '24', leads: 55 },
  { date: '25', leads: 80 },
  { date: '26', leads: 82 },
  { date: '27', leads: 85 },
  { date: '28', leads: 80 },
  { date: '29', leads: 78 },
  { date: '30', leads: 75 },
  { date: '31', leads: 95 },
  { date: '01\nApr', leads: 100 },
];

const LineChartComp = () => {
  return (
    <div>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <AreaChart
            data={lineData}
            margin={{ top: 8, right: 24, left: 40, bottom: 24 }}
          >
            <defs>
              <linearGradient id='colorLeads' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#EF4444' stopOpacity={0.3} />
                <stop offset='95%' stopColor='#EF4444' stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray='0'
              stroke='#F3F4F6'
              vertical={false}
            />
            <XAxis
              dataKey='date'
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              interval={1}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 14 }}
              ticks={[0, 125]}
              domain={[0, 125]}
              width={60}
              label={{
                value: 'Number of Leads',
                angle: -90,
                position: 'insideLeft',
                style: {
                  textAnchor: 'middle',
                  fill: '#6b7280',
                  fontSize: 14,
                  fontWeight: 400,
                },
                offset: 10,
              }}
            />
            <Area
              type='monotone'
              dataKey='leads'
              stroke='#EF4444'
              strokeWidth={2}
              fill='url(#colorLeads)'
              dot={false}
              activeDot={{ r: 6, fill: '#EF4444' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComp;
