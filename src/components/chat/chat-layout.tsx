'use client';

import React, { useState } from 'react';
import ChatSidebar from './chat-sidebar';
import ChatHeader from './chat-header';

interface ChatLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
  children,
  title = 'Sales trends by Product Category - June 2025 to August 2025',
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'data'>('chat');

  const handleTabChange = (tab: 'chat' | 'data') => {
    setActiveTab(tab);
  };

  return (
    <div className='flex h-full'>
      {/* Chat Sidebar */}
      <ChatSidebar />

      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Chat Header */}
        <ChatHeader
          title={title}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <div className='flex-1 bg-transparent overflow-auto'>{children}</div>
      </div>
    </div>
  );
};

export default ChatLayout;
