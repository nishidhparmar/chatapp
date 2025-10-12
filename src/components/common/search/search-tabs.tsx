'use client';

import { Search } from 'lucide-react';
import { PiChatsCircle } from 'react-icons/pi';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface SearchTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const SearchTabs = ({ activeTab, onTabChange }: SearchTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className='w-full'>
      <TabsList className='w-full bg-white h-auto'>
        <TabsTrigger
          value='search'
          className={cn(
            'flex-1 rounded-none border-b-neutral-br-primary py-4 px-6 text-sm',
            'data-[state=active]:border-b-2 data-[state=active]:border-b-brand-ct-brand data-[state=active]:bg-transparent data-[state=active]:shadow-none',
            'text-neutral-ct-tertiary data-[state=active]:text-brand-ct-brand font-semibold',
            'focus-visible:ring-0 focus-visible:outline-none focus:ring-0'
          )}
        >
          <Search className='w-6 h-6 mr-0.5 text-current' />
          Search mode
        </TabsTrigger>

        <TabsTrigger
          value='conversation'
          className={cn(
            'flex-1 rounded-none border-b-neutral-br-primary py-4 px-6 text-sm',
            'data-[state=active]:border-b-2 data-[state=active]:border-b-brand-ct-brand data-[state=active]:bg-transparent data-[state=active]:shadow-none',
            'text-neutral-ct-tertiary data-[state=active]:text-brand-ct-brand font-semibold',
            'focus-visible:ring-0 focus-visible:outline-none focus:ring-0'
          )}
        >
          <PiChatsCircle className='w-6 h-6 mr-0.5 text-current' />
          Conversation mode
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SearchTabs;
