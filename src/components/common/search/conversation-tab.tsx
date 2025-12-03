'use client';

import { useState } from 'react';
import { GoArrowUp } from 'react-icons/go';
import { cn } from '@/lib/utils';
import { AuthInput } from '../../auth/common/auth-input';
import { useRouter } from 'next/navigation';
import { Button } from '../../ui/button';
import { useChatAsk } from '../../../hooks/mutations';

interface ConversationTabProps {
  placeholder?: string;
}

const ConversationTab = ({
  placeholder = 'Show me the sales data for California?',
}: ConversationTabProps) => {
  const [searchConversationQuery, setSearchConversationQuery] = useState('');
  const { mutate: createChat } = useChatAsk();
  const router = useRouter();

  const handleSearchConversationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSearchConversationQuery(value);
  };

  const handleAskQuestion = () => {
    if (!searchConversationQuery.trim()) return;

    createChat(
      { chat_id: 0, mode: 'conversational', text: searchConversationQuery },
      {
        onSuccess: response => {
          router.push(`/invoice/conversations/${response.data.chat_id}`);
        },
      }
    );
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
            <Button
              size={'icon'}
              onClick={handleAskQuestion}
              variant={
                searchConversationQuery.length > 0 ? 'default' : 'secondary'
              }
            >
              <GoArrowUp
                className={cn(
                  'w-4 h-4',
                  searchConversationQuery
                    ? 'text-white'
                    : 'text-neutral-ct-disabled'
                )}
              />
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default ConversationTab;
