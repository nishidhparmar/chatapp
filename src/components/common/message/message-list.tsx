'use client';

import { ChatDetailMessage } from '../../../types/chat';
import ChatBubble from './chat-Bubble';
import { Aichat, Message } from '../../icons';
import InvoiceView from '../invoice-view';
import { VisualizationType } from '../invoice-view/types';
import { useUserStore } from '../../../lib/stores/user-store';
import { getDisplayName } from '@/lib/utils/user-helpers';
import { PiThumbsUp } from 'react-icons/pi';
import { Button } from '../../ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProvideFeedbackModal from '../../invoice/provice-feedback-modal';
import FollowUpQuestions from './follow-up-questions';

interface MessageListProps {
  messages: ChatDetailMessage[];
  showInvoiceView?: boolean;
  className?: string;
  showFeedback?: boolean;
  chatId?: number;
  onOpenDashboardView?: (dashboardId: number) => void;
  followUpQuestions?: string[];
  onFollowUpQuestionClick?: (question: string) => void;
  isLoadingFollowUp?: boolean;
}

const MessageList = ({
  messages,
  showInvoiceView = true,
  className = 'max-w-[758px] mx-auto w-full space-y-6 py-6 px-4',
  showFeedback = false,
  chatId,
  onOpenDashboardView,
  followUpQuestions = [],
  onFollowUpQuestionClick,
  isLoadingFollowUp = false,
}: MessageListProps) => {
  const { user } = useUserStore();
  const displayName = getDisplayName(user);
  const router = useRouter();

  const [provideFeedbackModal, setOpenProvideFeedbackModal] = useState<{
    visible: boolean;
    type: 'POSITIVE' | 'NAGETIVE';
  }>({
    visible: false,
    type: 'POSITIVE',
  });

  // Get the last AI message for feedback
  const lastAiMessage = messages
    .filter(msg => msg.sender === 'assistant')
    .pop();
  return (
    <>
      <div className={className}>
        {messages.map((message, index) => {
          const isLastAiMessage =
            showFeedback &&
            message.sender === 'assistant' &&
            message.id === lastAiMessage?.id;

          const isLastMessage = index === messages.length - 1;
          const isLastAssistantMessage =
            message.sender === 'assistant' && isLastMessage;

          if (message.sender === 'user') {
            return (
              <ChatBubble
                key={message.id}
                message={message.text}
                avatar={user?.avatar}
                userName={displayName}
                side='right'
              />
            );
          }

          return (
            <div
              key={message.id}
              className='flex flex-col md:flex-row md:items-start md:gap-3'
            >
              {/* Icon */}
              <div className='w-6 h-6 md:block rounded-full bg-brand-default hidden items-center justify-center flex-shrink-0 mb-3 md:mb-0'>
                <Aichat />
              </div>

              {/* Content */}
              <div className='flex-1 w-full'>
                <div className='flex items-center gap-2 w-full'>
                  <Aichat className='shrink-0 md:hidden block' />
                  {showInvoiceView && message.chart_content && (
                    <div className='w-full'>
                      <InvoiceView
                        title={message.text}
                        defaultView={
                          message.chart_content.type as VisualizationType
                        }
                        data={message}
                        chatId={chatId}
                        onOpenDashboardView={onOpenDashboardView}
                      />
                    </div>
                  )}
                </div>
                {/* <p className='text-neutral-900 text-sm  mt-6'>{message.text}</p> */}
                {/* Render InvoiceView if chart_content exists and showInvoiceView is true */}

                {/* Follow-up questions - Show only on last assistant message */}
                {isLastAssistantMessage &&
                  followUpQuestions.length > 0 &&
                  onFollowUpQuestionClick && (
                    <FollowUpQuestions
                      questions={followUpQuestions}
                      onQuestionClick={onFollowUpQuestionClick}
                      isLoading={isLoadingFollowUp}
                    />
                  )}

                {/* Feedback and Actions - Show only on last AI message */}
                {isLastAiMessage && (
                  <div className='flex md:flex-row flex-col gap-4 md:items-center justify-between pt-4 mt-4'>
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
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback Modal */}
      {showFeedback && lastAiMessage && (
        <ProvideFeedbackModal
          open={provideFeedbackModal}
          onOpenChange={setOpenProvideFeedbackModal}
          messageId={String(lastAiMessage.id)}
        />
      )}
    </>
  );
};

export default MessageList;
