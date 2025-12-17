interface InvoiceViewTableProps {
  data?: {
    raw_data: Array<Record<string, unknown>>;
    columns: string[];
  };
}

const InvoiceViewTable: React.FC<InvoiceViewTableProps> = ({ data }) => {
  // Use API data if available, otherwise show empty state
  const tableData = data?.raw_data || [];
  const columns = data?.columns || [];

  const formatCellValue = (value: unknown): string => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return String(value);
  };

  const formatColumnHeader = (column: string): string => {
    return column
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (tableData.length === 0) {
    return (
      <div className='flex items-center justify-center py-12 text-neutral-ct-secondary'>
        No data available
      </div>
    );
  }

  // Determine if scrolling is needed
  const needsVerticalScroll = tableData.length > 7;
  const needsHorizontalScroll = columns.length > 5;

  // Calculate max height for vertical scroll (approximately 7 rows + header)
  const maxHeight = needsVerticalScroll ? 'max-h-[400px]' : '';

  return (
    <>
      {/* Desktop Table View */}
      <div
        className={`hidden md:block border bg-white rounded border-neutral-br-disabled ${needsHorizontalScroll ? 'overflow-x-auto' : ''} ${needsVerticalScroll ? 'overflow-y-auto' : ''} ${maxHeight}`}
      >
        <table className='w-full'>
          <thead className='sticky top-0 bg-white z-10'>
            <tr className='bg-neutral-disabled text-neutral-ct-primary text-xs font-semibold'>
              {columns.map((column, index) => (
                <th key={index} className='px-3 py-2 text-left'>
                  {formatColumnHeader(column)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className='hover:bg-gray-50 transition-colors text-sm font-normal'
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className='px-3 py-2 whitespace-nowrap'>
                    {formatCellValue(row[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div
        className={`md:hidden space-y-3 ${tableData.length > 7 ? 'max-h-[500px] overflow-y-auto' : ''}`}
      >
        {tableData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className='bg-white border-b border-neutral-br-disabled rounded-lg p-4 hover:bg-gray-50 transition-colors'
          >
            <div className='grid grid-cols-2 gap-4'>
              {columns.map((column, colIndex) => (
                <div key={colIndex}>
                  <div className='text-xs text-neutral-ct-secondary mb-1'>
                    {formatColumnHeader(column)}
                  </div>
                  <div className='text-sm font-semibold text-neutral-ct-primary break-words'>
                    {formatCellValue(row[column])}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InvoiceViewTable;
