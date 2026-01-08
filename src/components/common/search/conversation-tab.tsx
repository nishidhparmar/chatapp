'use client';

import { useState } from 'react';
import { GoArrowUp } from 'react-icons/go';
import { cn } from '@/lib/utils';
import { AuthInput } from '../../auth/common/auth-input';
import { useRouter } from 'next/navigation';
import { Button } from '../../ui/button';
import { useChatAsk } from '../../../hooks/mutations';
import SearchSuggestions from './search-suggestions';
import { useSuggestedQuestions } from '../../../hooks/queries';
import { useFollowupStore } from '../../../lib/stores';

interface ConversationTabProps {
  placeholder?: string;
}

const ConversationTab = ({
  placeholder = 'Show me the sales data for California?',
}: ConversationTabProps) => {
  const [searchConversationQuery, setSearchConversationQuery] = useState('');
  const [onFocus, setOnFocus] = useState(false);
  const { data: suggestedData } = useSuggestedQuestions({
    enabled: onFocus && !searchConversationQuery,
  });

  const { mutate: createChat, isPending: isCreatingChat } = useChatAsk();
  const router = useRouter();
  const { setFollowupQuestions } = useFollowupStore();

  const handleSearchConversationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSearchConversationQuery(value);
  };

  const handleSearchClick = (suggestion: string) => {
    if (isCreatingChat) return;

    // Clear any existing followup questions when starting new search
    setFollowupQuestions([], 0);

    createChat(
      { chat_id: 0, mode: 'conversational', text: suggestion },
      {
        onSuccess: response => {
          // Store followup questions in Zustand store
          if (response.data.followup_questions) {
            setFollowupQuestions(
              response.data.followup_questions,
              response.data.chat_id
            );
          }
          router.push(`/conversations/${response.data.chat_id}`);
        },
      }
    );
    setSearchConversationQuery(suggestion);
  };

  const handleAskQuestion = () => {
    if (!searchConversationQuery.trim() || isCreatingChat) return;

    // Clear any existing followup questions when starting new search
    setFollowupQuestions([], 0);

    createChat(
      { chat_id: 0, mode: 'conversational', text: searchConversationQuery },
      {
        onSuccess: response => {
          // Store followup questions in Zustand store
          if (response.data.followup_questions) {
            setFollowupQuestions(
              response.data.followup_questions,
              response.data.chat_id
            );
          }
          router.push(`/conversations/${response.data.chat_id}`);
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
          onFocus={() => setOnFocus(true)}
          onBlur={() => setTimeout(() => setOnFocus(false), 200)}
          onKeyDown={e => {
            if (
              e.key === 'Enter' &&
              searchConversationQuery.length > 0 &&
              !isCreatingChat
            ) {
              handleSearchClick(searchConversationQuery);
            }
          }}
          label=''
          type='text'
          placeholder={placeholder}
          className='h-16 !px-4 !pr-14 truncate'
          disabled={isCreatingChat}
          rightIcon={
            <Button
              size={'icon'}
              onClick={handleAskQuestion}
              disabled={isCreatingChat || searchConversationQuery.length === 0}
              variant={
                searchConversationQuery.length > 0 ? 'default' : 'secondary'
              }
            >
              {isCreatingChat ? (
                <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
              ) : (
                <GoArrowUp
                  className={cn(
                    'w-4 h-4',
                    searchConversationQuery
                      ? 'text-white'
                      : 'text-neutral-ct-disabled'
                  )}
                />
              )}
            </Button>
          }
        />
        {onFocus &&
          !searchConversationQuery &&
          suggestedData &&
          !isCreatingChat && (
            <SearchSuggestions
              recentQuestions={suggestedData.data.recent_questions}
              roleBasedQuestions={suggestedData.data.role_based_questions}
              onSuggestionClick={handleSearchClick}
            />
          )}
      </div>
    </div>
  );
};

export default ConversationTab;
