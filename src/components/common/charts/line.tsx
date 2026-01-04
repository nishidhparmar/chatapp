'use client';
import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  TooltipContentProps,
} from 'recharts';
import { useIsMobile } from '../../../hooks/use-mobile';
import { LineChartData } from '../../../types/chat';

interface LineChartProps {
  data?: LineChartData['data'];
}

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
      <div className='bg-gray-700 text-white rounded-lg p-3 shadow-lg min-w-[180px]'>
        <div className='text-sm font-medium mb-2 text-gray-200'>
          {data.fullDate}
        </div>

        {/* Value */}
        <div className='flex items-center justify-between gap-6'>
          <div className='flex items-center gap-2'>
            <div
              className='w-3 h-3 rounded-full'
              style={{ backgroundColor: '#EF4444' }}
            ></div>
            <span className='text-xs text-gray-300'>Value</span>
          </div>
          <span className='text-xs font-semibold'>{data.value}</span>
        </div>
      </div>
    </div>
  );
};

const LineChartComp: React.FC<LineChartProps> = ({ data }) => {
  const isMobile = useIsMobile();

  const chartData = data;

  const chartHeight = isMobile ? 300 : 400;
  const margins = { top: 80, right: 16, left: 0, bottom: 16 };
  const fontSize = isMobile ? 10 : 12;
  const yAxisFontSize = isMobile ? 12 : 14;
  const yAxisWidth = isMobile ? 40 : 60;
  const strokeWidth = isMobile ? 1.5 : 2;
  const activeDotRadius = isMobile ? 4 : 6;

  return (
    <div className='w-full'>
      <div className='w-full' style={{ height: chartHeight }}>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={chartData} margin={margins}>
            <defs>
              <linearGradient id='colorLeads' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#EF4444' stopOpacity={0.3} />
                <stop offset='95%' stopColor='#EF4444' stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey='date'
              axisLine={{ stroke: '#E7EBE8', strokeWidth: 1 }}
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
              axisLine={{ stroke: '#E7EBE8', strokeWidth: 1 }}
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
            <Tooltip
              content={CustomTooltip}
              cursor={{
                stroke: '#EF4444',
                strokeWidth: 1,
                strokeDasharray: '5 5',
              }}
            />
            <Area
              type='linear'
              dataKey='value'
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
