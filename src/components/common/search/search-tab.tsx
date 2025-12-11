'use client';

import { useState } from 'react';
import { GoArrowUp } from 'react-icons/go';
import { IoSearchOutline } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { AuthInput } from '../../auth/common/auth-input';
import SearchSuggestions from './search-suggestions';
import { useRouter } from 'next/navigation';
import { Button } from '../../ui/button';
import { useSuggestedQuestions } from '../../../hooks/queries';
import { useChatAsk } from '../../../hooks/mutations';

interface SearchTabProps {
  placeholder?: string;
  suggestions?: string[];
  className?: string;
}

const SearchTab = ({
  placeholder = 'Show me the sales data for California?',
  className,
}: SearchTabProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [onFocus, setOnFocus] = useState(false);
  const { data: suggestedData } = useSuggestedQuestions({
    enabled: onFocus && !searchQuery,
  });

  const { mutate: createChat, isPending } = useChatAsk();
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSearchClick = (suggestion: string) => {
    createChat(
      { chat_id: 0, mode: 'search', text: suggestion },
      {
        onSuccess: response => {
          router.push(`/chat/${response.data.chat_id}`);
        },
      }
    );
    setSearchQuery(suggestion);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  console.log(isPending);

  return (
    <div className={cn('bg-white rounded-b-lg relative', className)}>
      <div className='relative'>
        <AuthInput
          label=''
          type='text'
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setTimeout(() => setOnFocus(false), 200)}
          onKeyDown={e => {
            if (e.key === 'Enter' && searchQuery.length > 0) {
              handleSearchClick(searchQuery);
            }
          }}
          placeholder={placeholder}
          className='h-16 !px-4'
          rightIcon={
            <Button
              size={'icon'}
              variant={searchQuery.length > 0 ? 'default' : 'secondary'}
              onClick={() => handleSearchClick(searchQuery)}
              disabled={isPending}
            >
              {isPending ? (
                <div className='animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent' />
              ) : searchQuery.length > 0 ? (
                <IoSearchOutline className='h-4 w-4' />
              ) : (
                <GoArrowUp className='w-4 h-4 text-neutral-ct-disabled' />
              )}
            </Button>
          }
        />
        {onFocus && !searchQuery && suggestedData && (
          <SearchSuggestions
            recentQuestions={suggestedData.data.recent_questions}
            roleBasedQuestions={suggestedData.data.role_based_questions}
            onSuggestionClick={handleSuggestionClick}
          />
        )}
      </div>
    </div>
  );
};

export default SearchTab;
