'use client';

import DashboardLayout from '../layout/dashboard-layout';
import { Button } from '../ui/button';
import MessageList from '../common/message/message-list';
import SendInput from '../common/message/send-input';
import { useState, useRef, useEffect } from 'react';
import SaveChatModal from '../chat/save-chat-modal';
import { useChatAsk } from '../../hooks/mutations';
import { useGetChatById } from '../../hooks/queries/use-get-chat-by-id';
import { useRouter } from 'next/navigation';
import Loading from '@/components/common/loading';
import BubbleLoader from '../common/message/bubble-loader';
import { ChatDetailMessage } from '../../types/chat';
import { useFollowupStore } from '../../lib/stores';

const InvoiceConversation = ({ chatId }: { chatId: number }) => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetChatById(Number(chatId));
  const { mutate, isPending } = useChatAsk();
  const {
    followupQuestions,
    currentChatId,
    setFollowupQuestions,
    clearFollowupQuestions,
  } = useFollowupStore();
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

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Clear followup questions immediately when sending new message
    clearFollowupQuestions();

    // Create optimistic user message
    const optimisticUserMessage: ChatDetailMessage = {
      id: Date.now(), // Temporary ID
      text: message.trim(),
      sender: 'user',
      created_at: new Date().toISOString(),
      title: '',
    };

    // Add optimistic message and show loading state
    setOptimisticMessages([optimisticUserMessage]);
    setIsWaitingForResponse(true);

    mutate(
      {
        chat_id: chatId,
        text: message,
        mode: 'conversational',
      },
      {
        onSuccess: response => {
          // Store follow-up questions in Zustand store
          if (response.data?.followup_questions) {
            setFollowupQuestions(response.data.followup_questions, chatId);
          }
          // refetch();
        },
        onError: error => {
          console.error('Failed to send message:', error);
          // Reset optimistic state on error
          setOptimisticMessages([]);
          setIsWaitingForResponse(false);
          // Questions are already cleared, no need to clear again
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
  const displayMessages = [...messages, ...optimisticMessages];

  // Get followup questions for this specific chat
  const currentFollowupQuestions =
    currentChatId === chatId ? followupQuestions : [];

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
          <MessageList
            messages={displayMessages}
            chatId={chatId}
            followUpQuestions={currentFollowupQuestions}
            onFollowUpQuestionClick={handleSendMessage}
            isLoadingFollowUp={isPending}
          />
          {isWaitingForResponse && (
            <div className='max-w-[758px] mx-auto w-full space-y-6 py-6 px-4'>
              <BubbleLoader />
            </div>
          )}
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
