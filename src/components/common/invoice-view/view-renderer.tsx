import React from 'react';
import InvoiceViewTable from './table';
import { DonutChart, LineChartComp, SimpleChart } from '../charts';
import { ChatDetailMessage, ChartContentData } from '../../../types/chat';

interface ViewRendererProps {
  chartContent: ChatDetailMessage['chart_content'];
}

const ViewRenderer: React.FC<ViewRendererProps> = ({ chartContent }) => {
  // Helper function to check if chart_content has the new API format
  const isNewChartFormat = (
    content: ChatDetailMessage['chart_content']
  ): content is ChartContentData => {
    return (
      content !== null &&
      content !== undefined &&
      'type' in content &&
      'data' in content
    );
  };

  // Debug logging
  console.log('ViewRenderer - chartContent:', chartContent);
  console.log(
    'ViewRenderer - isNewChartFormat:',
    chartContent ? isNewChartFormat(chartContent) : false
  );

  if (chartContent && isNewChartFormat(chartContent)) {
    console.log('ViewRenderer - Rendering chart type:', chartContent.type);
    switch (chartContent.type) {
      case 'table':
        return (
          <InvoiceViewTable
            data={{
              raw_data: chartContent.data,
              columns: chartContent.columns,
            }}
          />
        );
      case 'bar_chart':
        return <SimpleChart data={chartContent.data} />;
      case 'line_chart':
        return <LineChartComp data={chartContent.data} />;
      case 'pie_chart':
        return <DonutChart data={chartContent.data} />;
      default:
    }
  }

  // Legacy format handling - for old data structure
  const legacyContent = chartContent as any;
  const tableData =
    chartContent && !isNewChartFormat(chartContent)
      ? {
          raw_data: legacyContent.raw_data || [],
          columns: legacyContent.data_format?.columns || [],
        }
      : undefined;

  console.log('ViewRenderer - Using legacy format, tableData:', tableData);

  // If we have legacy data, show it as a table
  if (
    tableData &&
    (tableData.raw_data.length > 0 || tableData.columns.length > 0)
  ) {
    return <InvoiceViewTable data={tableData} />;
  }

  // No valid chart content
  console.log('ViewRenderer - No valid chart content found');
  return (
    <div className='p-8 text-center text-gray-500'>
      <p>No chart data available</p>
    </div>
  );
};

export default ViewRenderer;
