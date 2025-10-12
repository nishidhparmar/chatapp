'use client';

import { useState } from 'react';
import { GoArrowUp } from 'react-icons/go';
import { cn } from '@/lib/utils';
import { AuthInput } from '../../auth/common/auth-input';
import { useRouter } from 'next/navigation';

interface ConversationTabProps {
  placeholder?: string;
}

const ConversationTab = ({
  placeholder = 'Show me the sales data for California?',
}: ConversationTabProps) => {
  const [searchConversationQuery, setSearchConversationQuery] = useState('');
  const router = useRouter();
  const handleSearchConversationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSearchConversationQuery(value);
  };

  return (
    <div className='bg-white rounded-b-lg mb-6 mt-4'>
      <div className='relative'>
        <AuthInput
          value={searchConversationQuery}
          onChange={handleSearchConversationChange}
          label=''
          type='text'
          placeholder={placeholder}
          className='h-16 !px-4'
          rightIcon={
            <button
              onClick={() => router.push('/invoice/conversations')}
              className={cn(
                'h-8 w-8 flex items-center justify-center rounded-lg bg-neutral-disabled',
                searchConversationQuery
                  ? 'bg-brand-default text-white cursor-pointer'
                  : 'bg-neutral-disabled'
              )}
            >
              <GoArrowUp
                className={cn(
                  'w-4 h-4',
                  searchConversationQuery
                    ? 'text-white'
                    : 'text-neutral-ct-disabled'
                )}
              />
            </button>
          }
        />
      </div>
    </div>
  );
};

export default ConversationTab;
