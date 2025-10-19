import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
} from 'recharts';
import { useIsMobile } from '../../../hooks/use-mobile';

const multiLineData = [
  {
    date: '05',
    month: '',
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

const CustomLegend = ({ isMobile }: { isMobile: boolean }) => {
  const legendFontSize = isMobile ? 12 : 14;
  const gap = isMobile ? '16px' : '32px';

  return (
    <div
      style={{
        display: 'flex',
        gap: gap,
        flexWrap: isMobile ? 'wrap' : 'nowrap',
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
        <span style={{ color: '#6b7280', fontSize: legendFontSize }}>
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
        <span style={{ color: '#6b7280', fontSize: legendFontSize }}>
          Paid Ads
        </span>
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
        <span style={{ color: '#6b7280', fontSize: legendFontSize }}>
          Email Marketing
        </span>
      </div>
    </div>
  );
};

const MultiLineChartComp = () => {
  const isMobile = useIsMobile();

  // Responsive dimensions
  const chartHeight = isMobile ? 350 : 400;
  const margins = { top: 16, right: 16, left: 16, bottom: 16 };
  const fontSize = isMobile ? 11 : 14;
  const strokeWidth = isMobile ? 2 : 2.5;
  const activeDotRadius = isMobile ? 4 : 5;
  const xAxisHeight = isMobile ? 40 : 60;
  const yAxisWidth = isMobile ? 40 : 60;

  return (
    <div className='w-full h-full bg-white '>
      <ResponsiveContainer width='100%' height={chartHeight}>
        <ComposedChart data={multiLineData} margin={margins}>
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
          {/* <CartesianGrid
            strokeDasharray='0'
            stroke='#e5e7eb'
            vertical={false}
            strokeWidth={1}
          /> */}
          <XAxis
            dataKey='date'
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
            tick={{
              fill: '#9ca3af',
              fontSize: fontSize,
              fontWeight: 500,
            }}
            interval={isMobile ? 'preserveStartEnd' : 1}
            height={xAxisHeight}
            tickFormatter={(value, index) => {
              const item = multiLineData[index];
              if (item.month) {
                return `${value}\n${item.month}`;
              }
              return value;
            }}
          />
          <YAxis
            axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
            tickLine={false}
            tick={{
              fill: '#9ca3af',
              fontSize: fontSize,
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
                fontSize: fontSize,
                fontWeight: 400,
              },
              offset: 10,
            }}
          />
          <Area
            type='linear'
            dataKey='searchEngine'
            fill='url(#colorSearchEngine)'
            stroke='none'
          />
          <Area
            type='linear'
            dataKey='paidAds'
            fill='url(#colorPaidAds)'
            stroke='none'
          />
          <Area
            type='linear'
            dataKey='emailMarketing'
            fill='url(#colorEmailMarketing)'
            stroke='none'
          />
          <Line
            type='linear'
            dataKey='searchEngine'
            stroke='#3b82f6'
            strokeWidth={strokeWidth}
            dot={false}
            activeDot={{ r: activeDotRadius }}
          />
          <Line
            type='linear'
            dataKey='paidAds'
            stroke='#a855f7'
            strokeWidth={strokeWidth}
            dot={false}
            activeDot={{ r: activeDotRadius }}
          />
          <Line
            type='linear'
            dataKey='emailMarketing'
            stroke='#ec4899'
            strokeWidth={strokeWidth}
            dot={false}
            activeDot={{ r: activeDotRadius }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <CustomLegend isMobile={isMobile} />
    </div>
  );
};

export default MultiLineChartComp;
