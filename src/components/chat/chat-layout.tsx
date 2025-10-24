'use client';

import React, { useState } from 'react';
import ChatSidebar from './chat-sidebar';
import ChatHeader from './chat-header';
import NoDataFound from '../icons/no-data-found';
import { useIsMobile } from '../../hooks/use-mobile';

interface ChatLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
  children,
  title = 'Sales trends by Product Category - June 2025 to August 2025',
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'data'>('chat');
  const [activeChat, setActiveChat] = useState('');
  const isMobile = useIsMobile();

  const handleTabChange = (tab: 'chat' | 'data') => {
    setActiveTab(tab);
  };

  return (
    <div className='flex h-full'>
      {/* Chat Sidebar */}
      {isMobile && activeChat ? null : (
        <ChatSidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      )}
      {isMobile && !activeChat ? null : (
        <div className='flex-1 flex flex-col overflow-hidden'>
          {/* Chat Header */}
          <ChatHeader
            title={title}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            handleBack={() => setActiveChat('')}
          />
          {activeTab === 'chat' && (
            <div className='flex-1 bg-transparent overflow-auto'>
              {children}
            </div>
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
