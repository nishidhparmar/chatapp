import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const multiLineData = [
  {
    date: '05',
    month: 'Mar',
    searchEngine: 35,
    paidAds: 45,
    emailMarketing: 15,
  },
  { date: '06', month: '', searchEngine: 38, paidAds: 42, emailMarketing: 28 },
  { date: '07', month: '', searchEngine: 32, paidAds: 52, emailMarketing: 55 },
  { date: '08', month: '', searchEngine: 40, paidAds: 48, emailMarketing: 25 },
  { date: '09', month: '', searchEngine: 50, paidAds: 58, emailMarketing: 18 },
  { date: '10', month: '', searchEngine: 52, paidAds: 62, emailMarketing: 30 },
  { date: '11', month: '', searchEngine: 55, paidAds: 52, emailMarketing: 38 },
  { date: '12', month: '', searchEngine: 58, paidAds: 48, emailMarketing: 45 },
  { date: '13', month: '', searchEngine: 62, paidAds: 45, emailMarketing: 42 },
  { date: '14', month: '', searchEngine: 68, paidAds: 48, emailMarketing: 35 },
  { date: '15', month: '', searchEngine: 72, paidAds: 50, emailMarketing: 32 },
  { date: '16', month: '', searchEngine: 75, paidAds: 65, emailMarketing: 58 },
  { date: '17', month: '', searchEngine: 78, paidAds: 78, emailMarketing: 85 },
  { date: '18', month: '', searchEngine: 82, paidAds: 75, emailMarketing: 72 },
  { date: '19', month: '', searchEngine: 78, paidAds: 68, emailMarketing: 58 },
  { date: '20', month: '', searchEngine: 72, paidAds: 62, emailMarketing: 48 },
  { date: '21', month: '', searchEngine: 75, paidAds: 58, emailMarketing: 52 },
  { date: '22', month: '', searchEngine: 80, paidAds: 62, emailMarketing: 45 },
  { date: '23', month: '', searchEngine: 85, paidAds: 65, emailMarketing: 42 },
  { date: '24', month: '', searchEngine: 95, paidAds: 62, emailMarketing: 38 },
  { date: '25', month: '', searchEngine: 105, paidAds: 58, emailMarketing: 42 },
  { date: '26', month: '', searchEngine: 102, paidAds: 55, emailMarketing: 45 },
  { date: '27', month: '', searchEngine: 95, paidAds: 52, emailMarketing: 48 },
  { date: '28', month: '', searchEngine: 88, paidAds: 42, emailMarketing: 52 },
  { date: '29', month: '', searchEngine: 98, paidAds: 58, emailMarketing: 58 },
  { date: '30', month: '', searchEngine: 115, paidAds: 78, emailMarketing: 65 },
  { date: '31', month: '', searchEngine: 118, paidAds: 82, emailMarketing: 72 },
  {
    date: '01',
    month: 'Apr',
    searchEngine: 120,
    paidAds: 88,
    emailMarketing: 75,
  },
];

const CustomLegend = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '32px',
        paddingTop: '20px',
        paddingBottom: '10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
          }}
        ></div>
        <span style={{ color: '#6b7280', fontSize: '14px' }}>
          Search Engine
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#a855f7',
          }}
        ></div>
        <span style={{ color: '#6b7280', fontSize: '14px' }}>Paid Ads</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ec4899',
          }}
        ></div>
        <span style={{ color: '#6b7280', fontSize: '14px' }}>
          Email Marketing
        </span>
      </div>
    </div>
  );
};

const MultiLineChartComp = () => {
  return (
    <div className='w-full h-full bg-white p-4'>
      <ResponsiveContainer width='100%' height={500}>
        <ComposedChart
          data={multiLineData}
          margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
        >
          <defs>
            <linearGradient id='colorSearchEngine' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.15} />
              <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorPaidAds' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#a855f7' stopOpacity={0.15} />
              <stop offset='95%' stopColor='#a855f7' stopOpacity={0} />
            </linearGradient>
            <linearGradient
              id='colorEmailMarketing'
              x1='0'
              y1='0'
              x2='0'
              y2='1'
            >
              <stop offset='5%' stopColor='#ec4899' stopOpacity={0.15} />
              <stop offset='95%' stopColor='#ec4899' stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray='0'
            stroke='#e5e7eb'
            vertical={false}
          />
          <XAxis
            dataKey='date'
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 14 }}
            interval={1}
            height={60}
            tickFormatter={(value, index) => {
              const item = multiLineData[index];
              if (item.month) {
                return `${value}\n${item.month}`;
              }
              return value;
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 14 }}
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
            dataKey='searchEngine'
            fill='url(#colorSearchEngine)'
            stroke='none'
          />
          <Area
            type='monotone'
            dataKey='paidAds'
            fill='url(#colorPaidAds)'
            stroke='none'
          />
          <Area
            type='monotone'
            dataKey='emailMarketing'
            fill='url(#colorEmailMarketing)'
            stroke='none'
          />
          <Line
            type='monotone'
            dataKey='searchEngine'
            stroke='#3b82f6'
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            type='monotone'
            dataKey='paidAds'
            stroke='#a855f7'
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            type='monotone'
            dataKey='emailMarketing'
            stroke='#ec4899'
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <CustomLegend />
    </div>
  );
};

export default MultiLineChartComp;
