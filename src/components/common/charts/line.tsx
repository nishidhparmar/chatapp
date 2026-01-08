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

const defaultLineData = [
  { label: 'Jan', value: 24 },
  { label: 'Feb', value: 36 },
  { label: 'Mar', value: 33 },
  { label: 'Apr', value: 25 },
  { label: 'May', value: 35 },
];

interface LineChartProps {
  data?: LineChartData['data'];
  minValue?: number;
  maxValue?: number;
  chartContent?: LineChartData;
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
          {data.originalLabel || data.label}
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
          <span className='text-xs font-semibold'>
            {data.value.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

const LineChartComp: React.FC<LineChartProps> = ({
  data,
  minValue,
  maxValue,
  chartContent,
}) => {
  const isMobile = useIsMobile();

  // Use fallback data if no data provided
  const chartData = data || defaultLineData;

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
  const dataValues = chartData?.map(item => item.value) || [];
  const calculatedMin =
    minValue ?? (dataValues.length > 0 ? Math.min(...dataValues) : 0);
  const calculatedMax =
    maxValue ?? (dataValues.length > 0 ? Math.max(...dataValues) : 100);

  // Add some padding to the domain for better visualization
  const domainMin = Math.max(
    0,
    calculatedMin - (calculatedMax - calculatedMin) * 0.1
  );
  const domainMax = calculatedMax + (calculatedMax - calculatedMin) * 0.1;

  const chartHeight = isMobile ? 300 : 400;
  const margins = { top: 80, right: 16, left: 0, bottom: 16 };
  const fontSize = isMobile ? 10 : 12;
  const yAxisFontSize = isMobile ? 12 : 14;
  const yAxisWidth = isMobile ? 40 : 60;
  const strokeWidth = isMobile ? 1.5 : 2;
  const activeDotRadius = isMobile ? 4 : 6;

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
          <AreaChart data={processedChartData} margin={margins}>
            <defs>
              <linearGradient id='colorLeads' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#EF4444' stopOpacity={0.3} />
                <stop offset='95%' stopColor='#EF4444' stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey='displayLabel'
              axisLine={{ stroke: '#E7EBE8', strokeWidth: 1 }}
              tickLine={false}
              tick={{
                fill: '#6B7280',
                fontSize: fontSize,
                fontWeight: 500,
              }}
              interval={
                isMobile
                  ? processedChartData.length > 6
                    ? 2
                    : 1
                  : processedChartData.length > 10
                    ? 1
                    : 0
              }
              height={isMobile ? 30 : 40}
              label={{
                value: chartContent?.columns?.x,
                position: 'bottom',
                style: {
                  textAnchor: 'middle',
                  fill: '#6b7280',
                  fontSize: yAxisFontSize,
                  fontWeight: 400,
                },
              }}
            />
            <YAxis
              axisLine={{ stroke: '#E7EBE8', strokeWidth: 1 }}
              tickLine={false}
              tick={{
                fill: '#6b7280',
                fontSize: yAxisFontSize,
                fontWeight: 500,
              }}
              domain={[domainMin, domainMax]}
              ticks={[calculatedMin, calculatedMax]}
              tickFormatter={v =>
                v >= 1000000
                  ? (v / 1000000).toFixed(1) + 'M'
                  : v >= 1000
                    ? (v / 1000).toFixed(1) + 'K'
                    : v.toString()
              }
              width={yAxisWidth}
              label={{
                value: chartContent?.columns?.y,
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
