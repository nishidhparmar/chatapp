'use client';
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useIsMobile } from '../../../hooks/use-mobile';

const donutData = [
  { name: 'Veola Ltd', value: 45297.34, percent: 34.3 },
  { name: 'Bilfa Waste Limited', value: 32343.29, percent: 22.7 },
  { name: 'Recycling & Recovery Inc.', value: 54679.84, percent: 43 },
];

const DONUT_COLORS = ['#FF0062', '#3B86FE', '#8338EC'];

const DonutChart = () => {
  const isMobile = useIsMobile();

  // Responsive dimensions
  const chartHeight = isMobile ? 220 : 400;
  const outerRadius = isMobile ? 80 : 140;
  const innerRadius = isMobile ? 50 : 90;
  const legendFontSize = isMobile ? 10 : 12;
  const valueFontSize = isMobile ? 11 : 14;
  const percentFontSize = isMobile ? 10 : 12;
  const centerFontSize = isMobile ? 8 : 10;
  const totalFontSize = isMobile ? 12 : 16;

  return (
    <div className='w-full'>
      <div
        className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-between gap-4`}
      >
        <div style={{ width: isMobile ? '100%' : '50%', height: chartHeight }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={donutData}
                cx='50%'
                cy='50%'
                labelLine={false}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                fill='#8884d8'
                dataKey='value'
              >
                {donutData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className='text-center -mt-4 md:-mt-56'>
            <div className='text-[10px] text-neutral-ct-secondary'>
              Total Sales
            </div>
            <div className='text-base font-bold'>$132,320.47</div>
          </div>
        </div>
        <div className={`flex-1 ${isMobile ? 'mt-4' : 'mr-10'}`}>
          {donutData.map((item, index) => (
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
                  ${item.value.toLocaleString()}
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
