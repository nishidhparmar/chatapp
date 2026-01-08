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
  { label: 'Jan', value: 24 },
  { label: 'Feb', value: 36 },
  { label: 'Mar', value: 33 },
  { label: 'Apr', value: 25 },
  { label: 'May', value: 35 },
  { label: 'Jun', value: 25 },
  { label: 'Jul', value: 22 },
  { label: 'Aug', value: 34 },
  { label: 'Sep', value: 27 },
  { label: 'Oct', value: 39 },
  { label: 'Nov', value: 26 },
  { label: 'Dec', value: 34 },
];

interface SimpleChartProps {
  data?: BarChartData['data'];
  minValue?: number;
  maxValue?: number;
  chartContent?: BarChartData;
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
            <span className='font-medium'>
              {data.originalLabel || data.label}
            </span>
            <span className='font-semibold'>{data.value}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const SimpleChart: React.FC<SimpleChartProps> = ({
  data,
  minValue,
  maxValue,
  chartContent,
}) => {
  const isMobile = useIsMobile();

  // Use API data if available, otherwise fallback to default data
  const chartData = data || simpleBarData;

  // Function to truncate text if too long
  const truncateText = (
    text: string,
    maxLength: number = isMobile ? 6 : 10
  ) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '..';
  };

  // Process chart data with truncated labels for display
  const processedChartData = chartData.map(item => ({
    ...item,
    displayLabel: truncateText(item.label),
    originalLabel: item.label, // Keep original for tooltip
  }));

  // Calculate min/max values from data if not provided
  const dataValues = chartData.map(item => item.value || 0);

  const calculatedMin = minValue ?? Math.min(...dataValues);
  const calculatedMax = maxValue ?? Math.max(...dataValues);

  // Add some padding to the domain for better visualization
  const domainMin = Math.max(
    0,
    calculatedMin - (calculatedMax - calculatedMin) * 0.1
  );
  const domainMax = calculatedMax + (calculatedMax - calculatedMin) * 0.1;

  // Responsive dimensions
  const chartHeight = isMobile ? 300 : 400;
  const margins = { top: 80, right: 16, left: 16, bottom: 16 }; // Increased top margin for tooltip
  const fontSize = isMobile ? 12 : 14;
  const barSize = isMobile ? 6 : 14;
  const barRadius = isMobile ? 2 : 4;

  return (
    <div className='w-full'>
      {/* Min/Max Value Display */}
      {(minValue !== undefined || maxValue !== undefined) && (
        <div className='flex justify-between items-center mb-4 px-4 py-2 bg-gray-50 rounded-lg'>
          <div className='text-sm'>
            <span className='text-gray-600'>Min: </span>
            <span className='font-semibold text-green-600'>
              {calculatedMin.toLocaleString()}
            </span>
          </div>
          <div className='text-sm'>
            <span className='text-gray-600'>Max: </span>
            <span className='font-semibold text-red-600'>
              {calculatedMax.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <div className='w-full' style={{ height: chartHeight }}>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={processedChartData} margin={margins}>
            <XAxis
              dataKey='displayLabel'
              axisLine={{ stroke: '#E7EBE8', strokeWidth: 1 }}
              tickLine={false}
              tick={{
                fill: '#6B7280',
                fontSize: fontSize,
                fontWeight: 500,
              }}
              interval={isMobile ? 2 : processedChartData.length > 8 ? 1 : 0}
              height={isMobile ? 40 : 50}
            >
              <Label
                value={chartContent?.columns?.x}
                position='bottom'
                style={{
                  textAnchor: 'middle',
                  fill: '#6B7280',
                  fontSize: fontSize,
                  fontWeight: 600,
                }}
              />
            </XAxis>
            <YAxis
              axisLine={{ stroke: '#E7EBE8', strokeWidth: 1 }}
              tickLine={false}
              tick={{
                fill: '#6B7280',
                fontSize: fontSize,
                fontWeight: 500,
              }}
              domain={
                dataValues.length > 0 && calculatedMax > 0
                  ? [domainMin, domainMax]
                  : [0, 100]
              }
              ticks={
                dataValues.length > 0 && calculatedMax > 0
                  ? [calculatedMin, calculatedMax]
                  : [0, 100]
              }
              tickFormatter={v =>
                `${v === 0 ? '0' : v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : v >= 1000 ? (v / 1000).toFixed(1) + 'K' : v}`
              }
              width={isMobile ? 40 : 50}
            >
              <Label
                value={chartContent?.columns?.y}
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
