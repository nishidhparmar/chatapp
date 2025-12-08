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

  if (chartContent && isNewChartFormat(chartContent)) {
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
    }
  }

  // // Legacy format handling - for old data structure
  // const legacyContent = chartContent as any;
  // const tableData =
  //   chartContent && !isNewChartFormat(chartContent)
  //     ? {
  //         raw_data: legacyContent.raw_data || [],
  //         columns: legacyContent.data_format?.columns || [],
  //       }
  //     : undefined;

  // // Fallback to default view based on defaultView state (for unsupported chart types)
  // switch (defaultView) {
  //   case 'table':
  //     return <InvoiceViewTable data={tableData} />;
  //   case 'bar_chart':
  //     return <SimpleChart />;
  //   case 'line_chart':
  //     return <LineChartComp />;
  //   case 'pie_chart':
  //     return <DonutChart />;
  //   case 'stacked_chart':
  //     return <StackedChart />;
  //   case 'grouped_chart':
  //     return <GroupedChart />;
  //   case 'multi_line':
  //     return <MultiLineChart />;
  //   default:
  //     return <InvoiceViewTable data={tableData} />;
  // }
};

export default ViewRenderer;
