'use client';

import InvoiceView from '../common/invoice-view';
import { PiThumbsUp } from 'react-icons/pi';
import { Button } from '../ui/Button';
import { Message } from '../icons';
import DashboardLayout from '../layout/dashboard-layout';
import { SearchTab } from '../common';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProvideFeedbackModal from './provice-feedback-modal';

const InvoiceSearchedByCustomer = () => {
  const router = useRouter();
  const [provideFeedbackModal, setOpenProvideFeedbackModal] = useState(false);
  return (
    <DashboardLayout>
      <div className='bg-transparent'>
        <div className='bg-white pb-4 pt-2.5'>
          <div className='max-w-[758px] mx-auto w-full'>
            <SearchTab className='!mt-0' />
          </div>
        </div>
        <div className='max-w-[758px] mx-auto w-full pb-6 '>
          {/* Results Section */}
          <div className='mt-8 space-y-6'>
            {/* Title */}
            <h2 className='text-2xl font-semibold text-balck'>
              Open Invoices by Customer
            </h2>
            {/* Summary Cards */}
            <div className='grid grid-cols-3 gap-3'>
              <div className='bg-neutral-disabled rounded p-4 space-y-1'>
                <p className='text-xs text-neutral-ct-primary'>
                  Total Invoices
                </p>
                <p className='text-base font-semibold text-neutral-ct-primary'>
                  27
                </p>
              </div>
              <div className='bg-neutral-disabled rounded p-4 space-y-1'>
                <p className='text-xs text-neutral-ct-primary'>Total Amount</p>
                <p className='text-base font-semibold text-neutral-ct-primary'>
                  $220,240
                </p>
              </div>
              <div className='bg-neutral-disabled rounded p-4 space-y-1'>
                <p className='text-xs text-neutral-ct-primary'>Overdue</p>
                <p className='text-base font-semibold text-neutral-ct-primary'>
                  $105,342
                </p>
              </div>
            </div>
            {/* Invoice View */}
            <InvoiceView />
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <span className='text-sm text-neutral-ct-tertiary'>
                  Was this answer helpful?
                </span>
                <PiThumbsUp
                  className='text-neutral-ct-secondary'
                  onClick={() => setOpenProvideFeedbackModal(true)}
                />
                <PiThumbsUp
                  className='rotate-180 text-neutral-ct-secondary'
                  onClick={() => setOpenProvideFeedbackModal(true)}
                />
              </div>
              <Button
                variant={'secondary'}
                onClick={() => router.push('/invoice/conversations')}
              >
                <Message /> Switch to Conversation Mode
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ProvideFeedbackModal
        open={provideFeedbackModal}
        onOpenChange={() => setOpenProvideFeedbackModal(false)}
      />
    </DashboardLayout>
  );
};
export default InvoiceSearchedByCustomer;
