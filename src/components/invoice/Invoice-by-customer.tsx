'use client';

import { Button } from '../ui/button';
import DashboardLayout from '../layout/dashboard-layout';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useGetChatById } from '../../hooks/queries/use-get-chat-by-id';
import SaveChatModal from '../chat/save-chat-modal';
import Loading from '@/components/common/loading';
import { InvoiceView, SearchTab } from '../common';
import { ChatDetailMessage } from '../../types/chat';
import { VisualizationType } from '../common/invoice-view/types';
import { PiThumbsUp } from 'react-icons/pi';
import { Message } from '../icons';
import ProvideFeedbackModal from './provice-feedback-modal';

const InvoiceSearchedByCustomer = ({ chatId }: { chatId: number }) => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetChatById(Number(chatId));
  const [provideFeedbackModal, setOpenProvideFeedbackModal] = useState<{
    visible: boolean;
    type: 'POSITIVE' | 'NAGETIVE';
  }>({
    visible: false,
    type: 'POSITIVE',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [optimisticMessages, setOptimisticMessages] = useState<
    ChatDetailMessage[]
  >([]);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [openSaveChatModal, setOpenChatModal] = useState<{
    visible: boolean;
    id: number;
  }>({
    visible: false,
    id: 0,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data?.data?.messages, optimisticMessages, isWaitingForResponse]);

  // Reset optimistic messages when real messages update
  useEffect(() => {
    if (data?.data?.messages) {
      setOptimisticMessages([]);
      setIsWaitingForResponse(false);
    }
  }, [data?.data?.messages]);

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center min-h-screen'>
          <Loading size='lg' />
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

  const handleSuccess = (response: any) => {
    // Store followup questions in Zustand store

    // Navigate to the new chat with timestamp to force refresh
    router.push(`/chat/${response.data.chat_id}?t=${Date.now()}`);
  };

  return (
    <DashboardLayout>
      <div className='bg-transparent'>
        <div className='flex items-center flex-row  bg-white p-3 gap-2'>
          <div className='md:flex-1'></div>
          <div className='flex justify-cente max-w-[758px]  w-full'>
            <SearchTab
              className='w-full max-w-[758px]'
              handleSuccess={handleSuccess}
              defaultValue={messages[0].text}
            />
          </div>
          {!data.data.is_saved && (
            <div className='md:flex-1 flex items-center justify-end w-max '>
              <Button
                className='text-xs py-2 px-4 w-full md:w-max h-full'
                onClick={() => setOpenChatModal({ visible: true, id: chatId })}
              >
                Save
              </Button>
            </div>
          )}
        </div>
        <div className='max-w-[758px] mx-auto w-full pb-6 lg:px-6 px-4'>
          <div className='mt-8'>
            <InvoiceView
              title={messages[1]?.title}
              defaultView={
                messages &&
                (messages[1]?.chart_content?.type as VisualizationType)
              }
              data={messages[1]}
              chatId={chatId}
            />
          </div>
          <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between pt-4 mt-4'>
            <div className='flex items-center gap-3'>
              <span className='md:text-sm text-[10px] text-neutral-ct-tertiary'>
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
            {chatId && (
              <Button
                variant={'secondary'}
                onClick={() => router.push(`/conversations/${chatId}`)}
                className='w-max'
              >
                {/* <Message /> Switch to Conversation Mode */}
                <Message /> Ask follow up question
              </Button>
            )}
          </div>
        </div>
      </div>
      <SaveChatModal
        open={openSaveChatModal}
        onOpenChange={() => {
          setOpenChatModal({ visible: false, id: 0 });
          refetch();
        }}
      />
      <ProvideFeedbackModal
        open={provideFeedbackModal}
        onOpenChange={setOpenProvideFeedbackModal}
        messageId={String(messages[1]?.id)}
      />
    </DashboardLayout>
  );
};

export default InvoiceSearchedByCustomer;
