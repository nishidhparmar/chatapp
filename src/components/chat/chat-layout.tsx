'use client';

import React, { useEffect, useRef, useState } from 'react';
import ChatSidebar from './chat-sidebar';
import ChatHeader from './chat-header';
import NoDataFound from '../icons/no-data-found';
import { useIsMobile } from '../../hooks/use-mobile';
import { useGetChatById } from '../../hooks/queries/use-get-chat-by-id';
import { useChatAsk } from '../../hooks/mutations/use-chat-ask';
import SendInput from '../common/message/send-input';
import { useQueryClient } from '@tanstack/react-query';
import MessageList from '../common/message/message-list';
import { ChatDetailMessage } from '../../types/chat';

interface ChatLayoutProps {
  title?: string;
}

const ChatLayout: React.FC<ChatLayoutProps> = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'data'>('chat');
  const [activeChat, setActiveChat] = useState('');
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch chat details when a chat is selected
  const { data: chatDetails, isLoading: isLoadingChat } = useGetChatById(
    Number(activeChat),
    !!activeChat
  );

  // Hook for sending new messages
  const chatAskMutation = useChatAsk();

  // Auto-scroll to bottom when messages change

  const handleTabChange = (tab: 'chat' | 'data') => {
    setActiveTab(tab);
  };

  const handleSendMessage = async (message: string) => {
    if (!activeChat || !message.trim()) return;

    try {
      await chatAskMutation.mutateAsync({
        chat_id: Number(activeChat),
        text: message.trim(),
        mode: 'conversational',
      });

      // Refetch chat details to get the updated messages
      queryClient.invalidateQueries({ queryKey: ['chat', Number(activeChat)] });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Render chat messages
  const renderChatMessages = () => {
    if (isLoadingChat) {
      return (
        <div className='flex justify-center items-center h-full'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-brand-default'></div>
        </div>
      );
    }

    return (
      <MessageList
        messages={chatDetails?.data.messages as ChatDetailMessage[]}
      />
    );
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatDetails?.data?.messages]);

  return (
    <div className='flex h-full'>
      {/* Chat Sidebar */}
      {isMobile && activeChat ? null : (
        <ChatSidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      )}
      {!activeChat ? null : (
        <div className='flex-1 flex flex-col overflow-hidden h-full'>
          <ChatHeader
            title={activeChat ? chatDetails?.data?.title || 'Loading...' : ''}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            handleBack={() => setActiveChat('')}
            chatId={activeChat ? Number(activeChat) : undefined}
            onDelete={() => setActiveChat('')}
          />

          {activeTab === 'chat' && (
            <>
              {activeChat && (
                <div className='flex flex-col h-[calc(100vh-155px)] justify-between'>
                  <div className='flex-1 overflow-y-auto h-full'>
                    {renderChatMessages()}
                    {/* <div ref={messagesEndRef} /> */}
                  </div>

                  {/* Send input - Fixed at bottom */}
                  <div className='flex-shrink-0'>
                    <div className='max-w-[758px] mx-auto w-full px-4 py-4'>
                      <SendInput
                        onSend={handleSendMessage}
                        isLoading={chatAskMutation.isPending}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'data' && (
            <div className='flex justify-center px-4 flex-col max-w-[410px] mx-auto text-center items-center h-full'>
              <NoDataFound />
              <h1 className='mt-6 text-neutral-ct-primary font-semibold'>
                Nothing to see… yet
              </h1>
              <p className='mt-2 text-neutral-ct-secondary'>
                Charts and tables from your chat requests will show up here. Ask
                for specific data to get started.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatLayout;
