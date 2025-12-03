'use client';

import React from 'react';
import { ChatLayout } from './index';
import DashboardLayout from '../layout/dashboard-layout';
import ChatBubble from '../common/message/chat-Bubble';
import { Aichat, Document, People } from '../icons';
import { InvoiceView } from '../common';
import { Button } from '../ui/Button';
import { GoMail } from 'react-icons/go';
import SendInput from '../common/message/send-input';

const Chat = () => {
  return (
    <DashboardLayout>
      <ChatLayout title='Sales trends by Product Category - June 2025 to August 2025'>
        <div className='flex flex-col h-full'>
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
              <SendInput />
            </div>
          </div>
        </div>
      </ChatLayout>
    </DashboardLayout>
  );
};

export default Chat;
