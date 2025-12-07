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

interface MessageListProps {
  messages: ChatDetailMessage[];
  showInvoiceView?: boolean;
  className?: string;
  showFeedback?: boolean;
  chatId?: number;
  onOpenDashboardView?: (dashboardId: number) => void;
}

const MessageList = ({
  messages,
  showInvoiceView = true,
  className = 'max-w-[758px] mx-auto w-full space-y-6 py-6 px-4',
  showFeedback = false,
  chatId,
  onOpenDashboardView,
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
        {messages.map(message => {
          const isLastAiMessage =
            showFeedback &&
            message.sender === 'assistant' &&
            message.message_id === lastAiMessage?.message_id;

          if (message.sender === 'user') {
            return (
              <ChatBubble
                key={message.message_id}
                message={message.text}
                avatar={user?.avatar}
                userName={displayName}
                side='right'
              />
            );
          }

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

                {/* Render InvoiceView if chart_content exists and showInvoiceView is true */}
                {showInvoiceView && message.chart_content && (
                  <div className='mt-6'>
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
                        onClick={() =>
                          router.push(`/invoice/conversations/${chatId}`)
                        }
                        className='w-max'
                      >
                        <Message /> Switch to Conversation Mode
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
          messageId={String(lastAiMessage.message_id)}
        />
      )}
    </>
  );
};

export default MessageList;
