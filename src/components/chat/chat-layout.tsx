'use client';

import React, { useEffect, useRef, useState } from 'react';
import ChatSidebar from './chat-sidebar';
import ChatHeader from './chat-header';
import { useIsMobile } from '../../hooks/use-mobile';
import { useGetChatById } from '../../hooks/queries/use-get-chat-by-id';
import { useChatAsk } from '../../hooks/mutations/use-chat-ask';
import SendInput from '../common/message/send-input';
import { useQueryClient } from '@tanstack/react-query';
import MessageList from '../common/message/message-list';
import { ChatDetailMessage } from '../../types/chat';
import DashboardView from '../reports/dashboard-view';
import ChatDataView from './chat-data-view';

interface ChatLayoutProps {
  title?: string;
}

const ChatLayout: React.FC<ChatLayoutProps> = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'data'>('chat');
  const [activeChat, setActiveChat] = useState('');
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [dashboardView, setDashboardView] = useState<{
    dashboardId: number | null;
    visible: boolean;
  }>({
    dashboardId: null,
    visible: false,
  });

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatDetails?.data?.messages]);

  const handleOpenDashboardView = (dashboardId: number) => {
    setDashboardView({
      dashboardId,
      visible: true,
    });
  };

  const handleCloseDashboardView = () => {
    setDashboardView({
      dashboardId: null,
      visible: false,
    });
  };

  // Show sidebar only when dashboard view is not visible and not on mobile with active chat
  const showSidebar = !dashboardView.visible && !(isMobile && activeChat);

  return (
    <div className='flex h-full'>
      {/* Chat Sidebar - Hidden when dashboard view is open */}
      {showSidebar && (
        <ChatSidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      )}

      {!activeChat ? null : (
        <div
          className={`flex h-full ${dashboardView.visible ? 'w-full' : 'flex-1'}`}
        >
          {/* Chat Section */}
          <div
            className={`flex flex-col overflow-hidden h-full ${
              dashboardView.visible ? (isMobile ? 'w-full' : 'w-1/2') : 'flex-1'
            }`}
          >
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
                      {isLoadingChat ? (
                        <div className='flex justify-center items-center h-full'>
                          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-brand-default'></div>
                        </div>
                      ) : (
                        <MessageList
                          messages={
                            chatDetails?.data.messages as ChatDetailMessage[]
                          }
                          chatId={Number(activeChat)}
                          onOpenDashboardView={handleOpenDashboardView}
                        />
                      )}
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

            {activeTab === 'data' && activeChat && (
              <ChatDataView
                chatId={Number(activeChat)}
                handleOpenDashboardView={handleOpenDashboardView}
              />
            )}
          </div>

          {/* Dashboard View - Only show on desktop when visible */}
          {dashboardView.visible && !isMobile && (
            <div className='w-1/2'>
              <DashboardView
                dashboardId={dashboardView.dashboardId}
                onClose={handleCloseDashboardView}
              />
            </div>
          )}
        </div>
      )}

      {/* Mobile Dashboard View - Full screen overlay */}
      {dashboardView.visible && isMobile && (
        <div className='fixed inset-0 z-50 bg-white'>
          <DashboardView
            dashboardId={dashboardView.dashboardId}
            onClose={handleCloseDashboardView}
          />
        </div>
      )}
    </div>
  );
};

export default ChatLayout;
