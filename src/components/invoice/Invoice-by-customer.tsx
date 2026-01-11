'use client';

import { Button } from '../ui/button';
import DashboardLayout from '../layout/dashboard-layout';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useGetChatById } from '../../hooks/queries/use-get-chat-by-id';
import MessageList from '../common/message/message-list';
import SaveChatModal from '../chat/save-chat-modal';
import Loading from '@/components/common/loading';
import { SearchTab } from '../common';
import { useFollowupStore } from '../../lib/stores';
import { useChatAsk } from '../../hooks/mutations';
import BubbleLoader from '../common/message/bubble-loader';
import { ChatDetailMessage } from '../../types/chat';

const InvoiceSearchedByCustomer = ({ chatId }: { chatId: number }) => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useGetChatById(Number(chatId));
  const {
    followupQuestions,
    currentChatId,
    setFollowupQuestions,
    clearFollowupQuestions,
  } = useFollowupStore();
  const { mutate: createChat, isPending } = useChatAsk();
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
  const displayMessages = [...messages, ...optimisticMessages];

  // Handle followup question clicks
  const handleFollowupQuestionClick = (question: string) => {
    // Clear followup questions immediately when clicked
    clearFollowupQuestions();

    // Create optimistic user message
    const optimisticUserMessage: ChatDetailMessage = {
      id: Date.now(), // Temporary ID
      text: question.trim(),
      sender: 'user',
      created_at: new Date().toISOString(),
      title: '',
    };

    // Add optimistic message and show loading state
    setOptimisticMessages([optimisticUserMessage]);
    setIsWaitingForResponse(true);

    createChat(
      { chat_id: chatId, mode: 'search', text: question },
      {
        onSuccess: response => {
          // Update followup questions in store with new ones from response
          if (response.data.followup_questions) {
            setFollowupQuestions(
              response.data.followup_questions,
              response.data.chat_id
            );
          }
          // Refetch to get updated messages
          refetch();
        },
        onError: error => {
          console.error('Failed to send followup question:', error);
          // Reset optimistic state on error
          setOptimisticMessages([]);
          setIsWaitingForResponse(false);
          // On error, we could optionally restore the previous questions
          // but for now we'll keep them cleared for better UX
        },
      }
    );
  };

  // Get followup questions for this specific chat
  const currentFollowupQuestions =
    currentChatId === chatId ? followupQuestions : [];

  // Handle success from SearchTab
  const handleSuccess = (response: any) => {
    // Store followup questions in Zustand store
    if (response.data.followup_questions) {
      setFollowupQuestions(
        response.data.followup_questions,
        response.data.chat_id
      );
    }

    // Navigate to the new chat with timestamp to force refresh
    router.push(`/chat/${response.data.chat_id}?t=${Date.now()}`);
  };

  return (
    <DashboardLayout>
      <div className='bg-transparent'>
        <div className='flex items-center md:flex-row flex-col bg-white p-3 gap-2'>
          <div className='md:flex-1'></div>
          <div className='flex justify-cente max-w-[758px]  w-full'>
            <SearchTab
              className='w-full max-w-[758px]'
              handleSuccess={handleSuccess}
            />
          </div>
          {!data.data.is_saved && (
            <div className='md:flex-1 flex items-center justify-end w-full md:w-max'>
              <Button
                className='text-xs py-2 px-4 w-full md:w-max'
                onClick={() => setOpenChatModal({ visible: true, id: chatId })}
              >
                Save
              </Button>
            </div>
          )}
        </div>
        <div className='max-w-[758px] mx-auto w-full pb-6 lg:px-6 px-4'>
          <div className='mt-8'>
            <MessageList
              messages={displayMessages}
              className='space-y-6'
              showFeedback={true}
              chatId={chatId}
              followUpQuestions={currentFollowupQuestions}
              onFollowUpQuestionClick={handleFollowupQuestionClick}
              isLoadingFollowUp={isPending}
            />
            {/* Show bubble loader when waiting for response */}
            {isWaitingForResponse && (
              <div className='space-y-6 py-6'>
                <BubbleLoader />
              </div>
            )}
            <div ref={messagesEndRef} />
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

export default InvoiceSearchedByCustomer;
