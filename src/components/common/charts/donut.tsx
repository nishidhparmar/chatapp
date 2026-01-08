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
  { label: 'Veola Ltd', value: 45297.34, percent: 34.3 },
  { label: 'Bilfa Waste Limited', value: 32343.29, percent: 22.7 },
  { label: 'Recycling & Recovery Inc.', value: 54679.84, percent: 43 },
];

const DONUT_COLORS = ['#FF0062', '#3B86FE', '#8338EC', '#FA8907'];

interface DonutChartProps {
  data?: PieChartData['data'];
  minValue?: number;
  maxValue?: number;
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
      <div className='text-sm font-medium mb-2 text-gray-200'>
        {data.payload.label}
      </div>

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

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  minValue,
  maxValue,
}) => {
  const isMobile = useIsMobile();

  // Use API data if available, otherwise fallback to default data
  const originalChartData = data || donutData;

  // Use all items instead of limiting to 3
  const chartData = originalChartData;

  // Function to assign colors avoiding adjacent duplicates
  const getOptimalColors = (dataLength: number) => {
    const colors = [...DONUT_COLORS];
    const result: string[] = [];

    if (dataLength <= colors.length) {
      // If we have enough colors, use them directly
      return colors.slice(0, dataLength);
    }

    // For more items than colors, distribute to avoid adjacency
    for (let i = 0; i < dataLength; i++) {
      let colorIndex = i % colors.length;

      // If this would create an adjacent duplicate, try next color
      if (i > 0 && result[i - 1] === colors[colorIndex]) {
        colorIndex = (colorIndex + 1) % colors.length;

        // If still adjacent to previous, try one more
        if (result[i - 1] === colors[colorIndex]) {
          colorIndex = (colorIndex + 1) % colors.length;
        }
      }

      // Special case: avoid first and last being the same (they're visually adjacent in donut)
      if (i === dataLength - 1 && dataLength > colors.length) {
        while (colors[colorIndex] === result[0] && colors.length > 1) {
          colorIndex = (colorIndex + 1) % colors.length;
        }
      }

      result.push(colors[colorIndex]);
    }

    return result;
  };

  const chartColors = getOptimalColors(chartData.length);

  // Calculate total for center display
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  // Calculate min/max values from data if not provided
  const dataValues = chartData.map(item => item.value);
  const calculatedMin = minValue ?? Math.min(...dataValues);
  const calculatedMax = maxValue ?? Math.max(...dataValues);

  // Function to truncate text if too long
  const truncateText = (text: string, maxLength: number = 15) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '..';
  };

  // Responsive dimensions
  const chartHeight = isMobile ? 220 : 400;
  const outerRadius = isMobile ? 80 : 140;
  const innerRadius = isMobile ? 50 : 90;
  const legendFontSize = isMobile ? 10 : 12;
  const valueFontSize = isMobile ? 11 : 14;
  const percentFontSize = isMobile ? 10 : 12;

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
                  <Cell key={`cell-${index}`} fill={chartColors[index]} />
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
        <div className={`flex-1 ${isMobile ? 'mt-4 w-full px-6' : 'mr-0'}`}>
          <div
            className={`${isMobile ? 'max-h-48' : 'max-h-80 pr-10'} overflow-y-auto`}
          >
            {chartData.map((item, index) => (
              <div
                key={index}
                className='flex items-center w-full justify-between py-4 border-b border-neutral-br-primary last:border-0'
              >
                <div className='flex items-center gap-1.5'>
                  <div
                    className='w-3 h-3 rounded-full'
                    style={{
                      backgroundColor: chartColors[index],
                    }}
                  ></div>
                  <span
                    className='text-neutral-ct-secondary'
                    style={{ fontSize: legendFontSize }}
                    title={item.label} // Show full text on hover
                  >
                    {truncateText(item.label)}
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
    </div>
  );
};

export default DonutChart;
