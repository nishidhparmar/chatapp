'use client';
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const donutData = [
  { name: 'Veola Ltd', value: 45297.34, percent: 34.3 },
  { name: 'Bilfa Waste Limited', value: 32343.29, percent: 22.7 },
  { name: 'Recycling & Recovery Inc.', value: 54679.84, percent: 43 },
];

const DONUT_COLORS = ['#FF0062', '#3B86FE', '#8338EC'];

const DonutChart = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div style={{ width: '40%', height: 400 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={donutData}
                cx='50%'
                cy='50%'
                labelLine={false}
                outerRadius={140}
                innerRadius={90}
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
          <div className='text-center -mt-56'>
            <div className='text-[10px] text-neutral-ct-secondary'>
              Total Sales
            </div>
            <div className='text-base font-bold'>$132,320.47</div>
          </div>
        </div>
        <div className='flex-1 pl-12'>
          {donutData.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-between py-4 border-b border-neutral-br-primary last:border-0'
            >
              <div className='flex items-center gap-1.5'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: DONUT_COLORS[index] }}
                ></div>
                <span className='text-xs text-neutral-ct-secondary'>
                  {item.name}
                </span>
              </div>
              <div className='text-right'>
                <div className='text-sm font-bold text-neutral-ct-primary'>
                  ${item.value.toLocaleString()}
                </div>
                <div className='text-xs text-neutral-ct-secondary font-semibold'>
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
