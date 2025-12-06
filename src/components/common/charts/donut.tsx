'use client';
import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  TooltipContentProps,
} from 'recharts';
import { useIsMobile } from '../../../hooks/use-mobile';
import { PieChartData } from '../../../types/chat';

const donutData = [
  { name: 'Veola Ltd', value: 45297.34, percent: 34.3 },
  { name: 'Bilfa Waste Limited', value: 32343.29, percent: 22.7 },
  { name: 'Recycling & Recovery Inc.', value: 54679.84, percent: 43 },
];

const DONUT_COLORS = ['#FF0062', '#3B86FE', '#8338EC'];

interface DonutChartProps {
  data?: PieChartData['data'];
}

// Custom Tooltip Component
const CustomTooltip = ({
  active,
  payload,
}: TooltipContentProps<string | number, string>) => {
  if (!active || !payload?.length) return null;

  const data = payload[0];

  return (
    <div className='bg-gray-700 text-white rounded-lg p-3 shadow-lg min-w-[180px]'>
      <div className='text-sm font-medium mb-2 text-gray-200'>{data.name}</div>

      <div className='flex items-center justify-between gap-6 mb-1.5'>
        <span className='text-xs text-gray-300'>Value</span>
        <span className='text-xs font-semibold'>
          {typeof data.value === 'number'
            ? data.value.toLocaleString()
            : data.value}
        </span>
      </div>

      <div className='flex items-center justify-between gap-6'>
        <span className='text-xs text-gray-300'>Percentage</span>
        <span className='text-xs font-semibold'>{data.payload.percent}%</span>
      </div>
    </div>
  );
};

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const isMobile = useIsMobile();

  // Use API data if available, otherwise fallback to default data
  const chartData = data || donutData;

  // Calculate total for center display
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  // Responsive dimensions
  const chartHeight = isMobile ? 220 : 400;
  const outerRadius = isMobile ? 80 : 140;
  const innerRadius = isMobile ? 50 : 90;
  const legendFontSize = isMobile ? 10 : 12;
  const valueFontSize = isMobile ? 11 : 14;
  const percentFontSize = isMobile ? 10 : 12;

  return (
    <div className='w-full'>
      <div
        className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-between gap-4`}
      >
        <div style={{ width: isMobile ? '100%' : '50%', height: chartHeight }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx='50%'
                cy='50%'
                labelLine={false}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                fill='#8884d8'
                dataKey='value'
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={CustomTooltip} />
            </PieChart>
          </ResponsiveContainer>
          <div className='text-center -mt-4 md:-mt-56'>
            <div className='text-[10px] text-neutral-ct-secondary'>Total</div>
            <div className='text-base font-bold'>
              {typeof total === 'number' ? total.toLocaleString() : total}
            </div>
          </div>
        </div>
        <div className={`flex-1  ${isMobile ? 'mt-4 w-full px-6' : 'mr-10'}`}>
          {chartData.map((item, index) => (
            <div
              key={index}
              className='flex items-center w-full justify-between py-4 border-b border-neutral-br-primary last:border-0'
            >
              <div className='flex items-center gap-1.5'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: DONUT_COLORS[index] }}
                ></div>
                <span
                  className='text-neutral-ct-secondary'
                  style={{ fontSize: legendFontSize }}
                >
                  {item.name}
                </span>
              </div>
              <div className='text-right'>
                <div
                  className='font-bold text-neutral-ct-primary'
                  style={{ fontSize: valueFontSize }}
                >
                  {typeof item.value === 'number'
                    ? item.value.toLocaleString()
                    : item.value}
                </div>
                <div
                  className='text-neutral-ct-secondary font-semibold'
                  style={{ fontSize: percentFontSize }}
                >
                  {item.percent}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
