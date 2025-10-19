'use client';
import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { useIsMobile } from '../../../hooks/use-mobile';

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
  { date: '01', leads: 100 },
];

const LineChartComp = () => {
  const isMobile = useIsMobile();

  // Responsive dimensions
  const chartHeight = isMobile ? 300 : 400;
  const margins = { top: 16, right: 16, left: 0, bottom: 16 };
  const fontSize = isMobile ? 10 : 12;
  const yAxisFontSize = isMobile ? 12 : 14;
  const yAxisWidth = isMobile ? 40 : 60;
  const strokeWidth = isMobile ? 1.5 : 2;
  const activeDotRadius = isMobile ? 4 : 6;

  return (
    <div className='w-full'>
      <div className='w-full' style={{ height: chartHeight }}>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={lineData} margin={margins}>
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
              strokeWidth={1}
            />
            <XAxis
              dataKey='date'
              axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              tickLine={false}
              tick={{
                fill: '#6B7280',
                fontSize: fontSize,
                fontWeight: 500,
              }}
              interval={isMobile ? 2 : 1}
              height={isMobile ? 30 : 40}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#6b7280',
                fontSize: yAxisFontSize,
                fontWeight: 500,
              }}
              ticks={[0, 125]}
              domain={[0, 125]}
              width={yAxisWidth}
              label={{
                value: 'Number of Leads',
                angle: -90,
                position: 'end',
                style: {
                  textAnchor: 'middle',
                  fill: '#6b7280',
                  fontSize: yAxisFontSize,
                  fontWeight: 400,
                },
                offset: 10,
              }}
            />
            <Area
              type='linear'
              dataKey='leads'
              stroke='#EF4444'
              strokeWidth={strokeWidth}
              fill='url(#colorLeads)'
              dot={false}
              activeDot={{ r: activeDotRadius, fill: '#EF4444' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComp;
