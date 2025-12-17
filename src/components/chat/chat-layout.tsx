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
import Loading from '../common/loading';
import BubbleLoader from '../common/message/bubble-loader';
import { useSearchParams } from 'next/navigation';

interface ChatLayoutProps {
  title?: string;
}

const ChatLayout: React.FC<ChatLayoutProps> = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'data'>('chat');
  const [activeChat, setActiveChat] = useState('');
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [optimisticMessages, setOptimisticMessages] = useState<
    ChatDetailMessage[]
  >([]);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [dashboardView, setDashboardView] = useState<{
    dashboardId: number | null;
    visible: boolean;
  }>({
    dashboardId: null,
    visible: false,
  });

  const { data: chatDetails, isLoading: isLoadingChat } = useGetChatById(
    Number(activeChat),
    !!activeChat
  );

  const chatAskMutation = useChatAsk();

  const handleTabChange = (tab: 'chat' | 'data') => {
    setActiveTab(tab);
  };

  const handleSendMessage = (message: string) => {
    if (!activeChat || !message.trim()) return;

    // Create optimistic user message
    const optimisticUserMessage: ChatDetailMessage = {
      message_id: Date.now(), // Temporary ID
      text: message.trim(),
      sender: 'user',
      created_at: new Date().toISOString(),
      title: '',
    };

    // Add optimistic message and show loading state
    setOptimisticMessages([optimisticUserMessage]);
    setIsWaitingForResponse(true);
    // Clear previous follow-up questions when sending new message
    setFollowUpQuestions([]);

    chatAskMutation.mutate(
      {
        chat_id: Number(activeChat),
        text: message.trim(),
        mode: 'conversational',
      },
      {
        onSuccess: response => {
          // Store follow-up questions from the response
          if (response.data?.followup_questions) {
            setFollowUpQuestions(response.data.followup_questions);
          }

          // Refetch chat details to get the updated messages
          queryClient.invalidateQueries({
            queryKey: ['chat', Number(activeChat)],
          });
        },
        onError: error => {
          console.error('Failed to send message:', error);
          // Reset optimistic state on error
          setOptimisticMessages([]);
          setIsWaitingForResponse(false);
          setFollowUpQuestions([]);
        },
      }
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatDetails?.data?.messages, optimisticMessages, isWaitingForResponse]);

  useEffect(() => {
    if (chatDetails?.data?.messages) {
      setOptimisticMessages([]);
      setIsWaitingForResponse(false);
    }
  }, [chatDetails?.data?.messages]);

  useEffect(() => {
    setOptimisticMessages([]);
    setIsWaitingForResponse(false);
    setFollowUpQuestions([]);
  }, [activeChat]);

  useEffect(() => {
    const chatId = searchParams.get('id');
    if (chatId && !activeChat) {
      setActiveChat(chatId);
    }
  }, [searchParams, activeChat]);

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

  const showSidebar = !dashboardView.visible && !(isMobile && activeChat);

  return (
    <div className='flex h-full'>
      {/* Chat Sidebar - Hidden when dashboard view is open */}
      {showSidebar && (
        <ChatSidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      )}

      {!activeChat ? (
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <p className='text-neutral-ct-secondary text-sm'>
              Select a chat to start messaging
            </p>
          </div>
        </div>
      ) : (
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
                        <div className='flex items-center justify-center h-full'>
                          <Loading />
                        </div>
                      ) : (
                        <>
                          <MessageList
                            messages={[
                              ...(chatDetails?.data
                                .messages as ChatDetailMessage[]),
                              ...optimisticMessages,
                            ]}
                            chatId={Number(activeChat)}
                            onOpenDashboardView={handleOpenDashboardView}
                            followUpQuestions={followUpQuestions}
                            onFollowUpQuestionClick={handleSendMessage}
                            isLoadingFollowUp={chatAskMutation.isPending}
                          />

                          {isWaitingForResponse && (
                            <div className='max-w-[758px] mx-auto w-full space-y-6 py-6 px-4'>
                              <BubbleLoader />
                            </div>
                          )}
                        </>
                      )}
                      <div ref={messagesEndRef} />
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
