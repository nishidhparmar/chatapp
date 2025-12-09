'use client';

import DashboardLayout from '../layout/dashboard-layout';
import { Button } from '../ui/Button';
import MessageList from '../common/message/message-list';
import SendInput from '../common/message/send-input';
import { useState, useRef, useEffect } from 'react';
import SaveChatModal from '../chat/save-chat-modal';
import { useChatAsk } from '../../hooks/mutations';
import { useGetChatById } from '../../hooks/queries/use-get-chat-by-id';
import { useRouter } from 'next/navigation';
import Loading from '@/components/common/loading';

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

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center min-h-screen'>
          <Loading size='lg' />
        </div>
      </DashboardLayout>
    );
  }

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
          <MessageList messages={messages} />
          <div ref={messagesEndRef} />
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
