import { ChevronDown, Copy, Download, Maximize2 } from 'lucide-react';
import InvoiceViewTable from './table';
import { PiPlusSquare } from 'react-icons/pi';

const InvoiceView = () => {
  return (
    <div className='bg-white rounded-lg border border-neutral-br-disabled'>
      <div className='flex items-center justify-between p-4 '>
        <h3 className='text-lg font-semibold text-neutral-ct-primary'>
          Open Invoices by Customer
        </h3>
        <div className='flex items-center gap-2'>
          <button className='px-3 py-1.5 text-xs cursor-pointer text-neutral-ct-secondary hover:text-neutral-ct-primary hover:bg-neutral-disabled rounded-md flex items-center transition-colors'>
            View As
            <ChevronDown className='w-3 h-3 ml-1' />
          </button>
          <button className='h-8 w-8 flex cursor-pointer items-center justify-center text-neutral-ct-secondary hover:text-neutral-ct-primary hover:bg-neutral-disabled rounded-md transition-colors'>
            <PiPlusSquare className='w-4 h-4' />
          </button>
          <button className='h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:text-neutral-ct-primary hover:bg-neutral-disabled rounded-md transition-colors'>
            <Copy className='w-3 h-3' />
          </button>
          <button className='h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:text-neutral-ct-primary hover:bg-neutral-disabled rounded-md transition-colors'>
            <Download className='w-3 h-3' />
          </button>
          <button className='h-8 w-8 cursor-pointer flex items-center justify-center text-neutral-ct-secondary hover:text-neutral-ct-primary hover:bg-neutral-disabled rounded-md transition-colors'>
            <Maximize2 className='w-3 h-3' />
          </button>
        </div>
      </div>
      <div className='px-4 pt-2 pb-4'>
        <InvoiceViewTable />
      </div>
    </div>
  );
};

export default InvoiceView;
