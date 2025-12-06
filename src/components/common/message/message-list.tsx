'use client';

import { ChatDetailMessage } from '../../../types/chat';
import ChatBubble from './chat-Bubble';
import { Aichat } from '../../icons';
import InvoiceView from '../invoice-view';
import { VisualizationType } from '../invoice-view/types';
import { useUserStore } from '../../../lib/stores/user-store';
import { getDisplayName } from '@/lib/utils/user-helpers';

interface MessageListProps {
  messages: ChatDetailMessage[];
  showInvoiceView?: boolean;
  className?: string;
}

const MessageList = ({
  messages,
  showInvoiceView = true,
  className = 'max-w-[758px] mx-auto w-full space-y-6 py-6 px-4',
}: MessageListProps) => {
  const { user } = useUserStore();
  const displayName = getDisplayName(user);
  return (
    <div className={className}>
      {messages.map(message => {
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
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
