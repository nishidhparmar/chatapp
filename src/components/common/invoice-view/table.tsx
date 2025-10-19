// Mock data for demonstration
const invoiceData = [
  {
    customer: 'Acme Corp',
    invoices: 5,
    totalAmount: '$48,200',
    oldestDueDate: 'Aug 15, 2025',
  },
  {
    customer: 'Global Tech Ltd',
    invoices: 3,
    totalAmount: '$22,750',
    oldestDueDate: 'Aug 28, 2025',
  },
  {
    customer: 'BrightFoods Inc',
    invoices: 7,
    totalAmount: '$35,940',
    oldestDueDate: 'Sep 2, 2025',
  },
  {
    customer: 'Northland Traders',
    invoices: 2,
    totalAmount: '$9,600',
    oldestDueDate: 'Sep 5, 2025',
  },
  {
    customer: 'BlueWave Consulting',
    invoices: 4,
    totalAmount: '$15,300',
    oldestDueDate: 'Sep 2, 2025',
  },
  {
    customer: 'Evergreen Supplies',
    invoices: 6,
    totalAmount: '$27,400',
    oldestDueDate: 'Aug 25, 2025',
  },
];

const InvoiceViewTable = () => {
  return (
    <>
      {/* Desktop Table View */}
      <div className='hidden md:block overflow-x-auto border bg-white rounded border-neutral-br-disabled'>
        <table className='w-full'>
          <thead>
            <tr className='bg-neutral-disabled text-neutral-ct-primary text-xs font-semibold '>
              <th className='px-3 py-2 text-left'>Customer</th>
              <th className='px-3 py-2 text-left'>Invoices</th>
              <th className='px-3 py-2 text-left'>Total Amount</th>
              <th className='px-3 py-2 text-left'>Oldest Due Date</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {invoiceData.map((row, index) => (
              <tr
                key={index}
                className='hover:bg-gray-50 transition-colors text-sm font-normal'
              >
                <td className='px-3 py-4.5'>{row.customer}</td>
                <td className='px-3 py-4.5'>{row.invoices}</td>
                <td className='px-3 py-4.5'>{row.totalAmount}</td>
                <td className='px-3 py-4.5'>{row.oldestDueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className='md:hidden space-y-3'>
        {invoiceData.map((row, index) => (
          <div
            key={index}
            className='bg-white border-b border-neutral-br-disabled rounded-lg p-4 hover:bg-gray-50 transition-colors'
          >
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <div className='text-xs text-neutral-ct-secondary mb-1'>
                  Customer
                </div>
                <div className='text-sm font-semibold text-neutral-ct-primary'>
                  {row.customer}
                </div>
              </div>
              <div>
                <div className='text-xs text-neutral-ct-secondary mb-1'>
                  Total Amount
                </div>
                <div className='text-sm font-semibold text-neutral-ct-primary'>
                  {row.totalAmount}
                </div>
              </div>
              <div>
                <div className='text-xs text-neutral-ct-secondary mb-1'>
                  Invoices
                </div>
                <div className='text-sm font-semibold text-neutral-ct-primary'>
                  {row.invoices}
                </div>
              </div>
              <div>
                <div className='text-xs text-neutral-ct-secondary mb-1'>
                  Oldest Due Date
                </div>
                <div className='text-sm font-semibold text-neutral-ct-primary'>
                  {row.oldestDueDate}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InvoiceViewTable;
