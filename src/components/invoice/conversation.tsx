'use client';

import InvoiceView from '../common/invoice-view';
import DashboardLayout from '../layout/dashboard-layout';
import { Button } from '../ui/button';
import { GoMail } from 'react-icons/go';
import { Aichat, Document, People } from '../icons';
import ChatBubble from '../common/message/chat-Bubble';
import SendInput from '../common/message/send-input';
import { useState } from 'react';
import SaveChatModal from '../chat/save-chat-modal';

const InvoiceConversation = () => {
  const [openSaveChatModal, setOpenChatModal] = useState(false);
  return (
    <DashboardLayout>
      <div className='flex flex-col h-full'>
        {/* Save button header - Fixed */}
        <div className='bg-white flex items-center justify-end px-4 py-3 h-14 flex-shrink-0'>
          <Button
            className='text-xs py-2 px-4'
            onClick={() => setOpenChatModal(true)}
          >
            Save
          </Button>
        </div>

        {/* Scrollable message content area - Takes remaining space */}
        <div className='flex-1 overflow-y-auto'>
          <div className='max-w-[758px] mx-auto w-full space-y-6 py-6 px-4'>
            {/* Message content */}
            <ChatBubble
              message='Show open invoices by customer'
              avatar='https://i.pravatar.cc/40?img=12'
              side='right'
            />

            <div className='flex flex-col md:flex-row md:items-start md:gap-3'>
              {/* Icon */}
              <div className='w-6 h-6 md:block rounded-full bg-brand-default hidden items-center justify-center flex-shrink-0 mb-3 md:mb-0'>
                <Aichat />
              </div>

              {/* Content */}
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <Aichat className='shrink-0 md:hidden block' />
                  <p className='text-neutral-900 -mb-2 text-sm mt-0.5'>
                    Here are the open invoices grouped by customer as of{' '}
                    <span className='font-semibold'>September 8, 2025:</span>
                  </p>
                </div>
                <div className='mt-8 space-y-6'>
                  <InvoiceView />
                </div>

                <div className='flex flex-row flex-wrap gap-3 mt-6'>
                  <Button
                    variant={'secondary'}
                    size={'xs'}
                    className='text-sm font-normal'
                  >
                    <GoMail className='!h-4 !w-4 text-neutral-ct-secondary' />{' '}
                    Send reminders to customers
                  </Button>
                  <Button
                    variant={'secondary'}
                    size={'xs'}
                    className='text-sm font-normal'
                  >
                    <Document /> See individual invoices for Acme Corp
                  </Button>
                  <Button
                    variant={'secondary'}
                    className='text-sm font-normal md:flex hidden'
                    size={'xs'}
                  >
                    <People /> Highlight customers with highest late-payment
                    risk
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Send input - Fixed at bottom */}
        <div className='flex-shrink-0'>
          <div className='max-w-[758px] mx-auto w-full px-4 py-4'>
            <div className='bg-brand-subtle px-3 py-2 flex items-center border border-blue-100 rounded-[4px] justify-between'>
              <p className='text-brand-ct-brand text-xs'>
                Your chat history is not stored automatically. Save this chat to
                access it later.
              </p>
              <Button
                className='text-xs py-2 px-4'
                onClick={() => setOpenChatModal(true)}
              >
                Save chat
              </Button>
            </div>
            <SendInput />
          </div>
        </div>
      </div>
      <SaveChatModal
        open={openSaveChatModal}
        onOpenChange={() => setOpenChatModal(false)}
      />
    </DashboardLayout>
  );
};

export default InvoiceConversation;
