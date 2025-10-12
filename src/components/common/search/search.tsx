'use client';

import { useState } from 'react';
import SearchTabs from './search-tabs';
import SearchTab from './search-tab';
import ConversationTab from './conversation-tab';

const SearchSection = () => {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className='w-full bg-white border-gray-200 shadow-lg rounded-[12px] h-auto px-6 pb-2'>
      <SearchTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'search' && <SearchTab className='mb-6 mt-4' />}
      {activeTab === 'conversation' && <ConversationTab />}
    </div>
  );
};

export default SearchSection;
