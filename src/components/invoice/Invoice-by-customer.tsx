'use client';

import { PiThumbsUp } from 'react-icons/pi';
import { Button } from '../ui/Button';
import { Message, Aichat } from '../icons';
import DashboardLayout from '../layout/dashboard-layout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProvideFeedbackModal from './provice-feedback-modal';
import { useGetChatById } from '../../hooks/queries/use-get-chat-by-id';
import ChatBubble from '../common/message/chat-Bubble';
import InvoiceView, { VisualizationType } from '../common/invoice-view';
import SaveChatModal from '../chat/save-chat-modal';

const InvoiceSearchedByCustomer = ({ chatId }: { chatId: number }) => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetChatById(Number(chatId));
  const [openSaveChatModal, setOpenChatModal] = useState<{
    visible: boolean;
    id: number;
  }>({
    visible: false,
    id: 0,
  });
  const [provideFeedbackModal, setOpenProvideFeedbackModal] = useState<{
    visible: boolean;
    type: 'POSITIVE' | 'NAGETIVE';
  }>({
    visible: false,
    type: 'POSITIVE',
  });

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-center space-y-4'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
            <p className='text-neutral-ct-secondary'>Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (isError || !data?.data) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-center space-y-4'>
            <p className='text-red-500'>Failed to load chat data</p>
            <Button onClick={() => router.push('/invoice')}>Go Back</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const messages = data.data.messages;

  return (
    <DashboardLayout>
      <div className='bg-transparent'>
        {!data.data.is_saved && (
          <div className='bg-white flex items-center justify-end px-4 py-3 h-14 flex-shrink-0'>
            <Button
              className='text-xs py-2 px-4'
              onClick={() => setOpenChatModal({ visible: true, id: chatId })}
            >
              Save
            </Button>
          </div>
        )}

        <div className='max-w-[758px] mx-auto w-full pb-6 lg:px-6 px-4'>
          <div className='mt-8 space-y-6'>
            {/* Render all messages */}
            {messages.map(message => {
              if (message.sender === 'user') {
                return (
                  <ChatBubble
                    key={message.message_id}
                    message={message.text}
                    avatar='https://i.pravatar.cc/40?img=12'
                    side='right'
                  />
                );
              }

              // Assistant message
              return (
                <div
                  key={message.message_id}
                  className='flex flex-col md:flex-row md:items-start md:gap-3'
                >
                  {/* AI Icon */}
                  <div className='w-6 h-6 md:block rounded-full bg-brand-default hidden items-center justify-center flex-shrink-0 mb-3 md:mb-0'>
                    <Aichat />
                  </div>

                  {/* Content */}
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <Aichat className='shrink-0 md:hidden block' />
                      <p className='text-neutral-900 text-sm mt-0.5'>
                        {message.text}
                      </p>
                    </div>

                    {/* Render InvoiceView if chart_content exists */}
                    {message.chart_content && (
                      <div className='mt-6'>
                        <InvoiceView
                          title={message.text}
                          defaultView={
                            message.chart_content.type as VisualizationType
                          }
                          data={message}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Feedback and Actions */}
            <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between pt-4'>
              <div className='flex items-center gap-3'>
                <span className='text-sm text-neutral-ct-tertiary'>
                  Was this answer helpful?
                </span>
                <PiThumbsUp
                  className='text-neutral-ct-secondary cursor-pointer hover:text-neutral-ct-primary'
                  onClick={() =>
                    setOpenProvideFeedbackModal({
                      type: 'POSITIVE',
                      visible: true,
                    })
                  }
                />
                <PiThumbsUp
                  className='rotate-180 text-neutral-ct-secondary cursor-pointer hover:text-neutral-ct-primary'
                  onClick={() =>
                    setOpenProvideFeedbackModal({
                      type: 'NAGETIVE',
                      visible: true,
                    })
                  }
                />
              </div>
              <Button
                variant={'secondary'}
                onClick={() => router.push(`/invoice/conversations/${chatId}`)}
                className='w-max'
              >
                <Message /> Switch to Conversation Mode
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ProvideFeedbackModal
        open={provideFeedbackModal}
        onOpenChange={() =>
          setOpenProvideFeedbackModal({ type: 'POSITIVE', visible: false })
        }
      />
      <SaveChatModal
        open={openSaveChatModal}
        onOpenChange={() => {
          setOpenChatModal({ visible: false, id: 0 });
          refetch();
        }}
      />
    </DashboardLayout>
  );
};

export default InvoiceSearchedByCustomer;
