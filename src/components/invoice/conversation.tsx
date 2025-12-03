'use client';

import InvoiceView, { VisualizationType } from '../common/invoice-view';
import DashboardLayout from '../layout/dashboard-layout';
import { Button } from '../ui/button';
import { Aichat } from '../icons';
import ChatBubble from '../common/message/chat-Bubble';
import SendInput from '../common/message/send-input';
import { useState, useRef, useEffect } from 'react';
import SaveChatModal from '../chat/save-chat-modal';
import { useChatAsk } from '../../hooks/mutations';
import { useGetChatById } from '../../hooks/queries/use-get-chat-by-id';
import { useRouter } from 'next/navigation';

const InvoiceConversation = ({ chatId }: { chatId: number }) => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetChatById(Number(chatId));
  const { mutate, isPending } = useChatAsk();
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
  }, [data?.data?.messages]);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    mutate(
      {
        chat_id: chatId,
        text: message,
        mode: 'conversational',
      },
      {
        onSuccess: () => {
          refetch();
        },
        onError: error => {
          console.error('Failed to send message:', error);
        },
      }
    );
  };

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
      <div className='flex flex-col h-full'>
        {/* Save button header - Fixed */}
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

        <div className='flex-1 overflow-y-auto'>
          <div className='max-w-[758px] mx-auto w-full space-y-6 py-6 px-4'>
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
                  {/* Icon */}
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
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Send input - Fixed at bottom */}
        <div className='flex-shrink-0'>
          <div className='max-w-[758px] mx-auto w-full px-4 py-4'>
            {!data.data.is_saved && (
              <div className='bg-brand-subtle px-3 py-2 flex items-center border border-blue-100 rounded-[4px] justify-between '>
                <p className='text-brand-ct-brand text-xs'>
                  Your chat history is not stored automatically. Save this chat
                  to access it later.
                </p>
                <Button
                  className='text-xs py-2 px-4'
                  onClick={() =>
                    setOpenChatModal({ visible: true, id: chatId })
                  }
                >
                  Save chat
                </Button>
              </div>
            )}
            <SendInput onSend={handleSendMessage} isLoading={isPending} />
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
    </DashboardLayout>
  );
};

export default InvoiceConversation;
