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
import { BarChartData } from '../../../types/chat';

const simpleBarData = [
  { month: 'Jan', fullMonth: 'January', value: 24 },
  { month: 'Feb', fullMonth: 'February', value: 36 },
  { month: 'Mar', fullMonth: 'March', value: 33 },
  { month: 'Apr', fullMonth: 'April', value: 25 },
  { month: 'May', fullMonth: 'May', value: 35 },
  { month: 'Jun', fullMonth: 'June', value: 25 },
  { month: 'Jul', fullMonth: 'July', value: 22 },
  { month: 'Aug', fullMonth: 'August', value: 34 },
  { month: 'Sep', fullMonth: 'September', value: 27 },
  { month: 'Oct', fullMonth: 'October', value: 39 },
  { month: 'Nov', fullMonth: 'November', value: 26 },
  { month: 'Dec', fullMonth: 'December', value: 34 },
];

interface SimpleChartProps {
  data?: BarChartData['data'];
}

// Custom Tooltip Component
const CustomTooltip = ({
  active,
  payload,
}: TooltipContentProps<string | number, string>) => {
  if (!active || !payload?.length) return null;
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className='relative' style={{ transform: 'translateY(-20px)' }}>
        {/* Tooltip Box */}
        <div className='bg-gray-700 text-white rounded-[8px] p-4 shadow-lg'>
          <div className='flex items-center justify-between gap-8 text-xs'>
            <span className='font-medium'>{data.fullMonth}</span>
            <span className='font-semibold'>{data.value}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const SimpleChart: React.FC<SimpleChartProps> = ({ data }) => {
  const isMobile = useIsMobile();

  // Use API data if available, otherwise fallback to default data
  const chartData = data || simpleBarData;

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
          <BarChart data={chartData} margin={margins}>
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
                position='insideLeft'
                style={{
                  textAnchor: 'middle',
                  fill: '#6B7280',
                  fontSize: fontSize,
                  fontWeight: 600,
                }}
              />
            </YAxis>
            <Tooltip
              content={CustomTooltip}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Bar
              dataKey='value'
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
