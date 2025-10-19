'use client';

import { useState } from 'react';
import { GoArrowUp } from 'react-icons/go';
import { IoSearchOutline } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { AuthInput } from '../../auth/common/auth-input';
import SearchSuggestions from './search-suggestions';
import { useRouter } from 'next/navigation';
import { Button } from '../../ui/button';

interface SearchTabProps {
  placeholder?: string;
  suggestions?: string[];
  className?: string;
}

const SearchTab = ({
  placeholder = 'Show me the sales data for California?',
  suggestions = [
    'Show me open invoices for Acme Corp due this month',
    'Show open invoices by customer',
    'Show sales by region this month',
    'Show top 10 overdue accounts',
    'Show cash flow by week for the next 60 days',
  ],
  className,
}: SearchTabProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    router.push('/invoice');
  };

  return (
    <div className={cn('bg-white rounded-b-lg relative', className)}>
      <div className='relative'>
        <AuthInput
          label=''
          type='text'
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(searchQuery.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className='h-16 !px-4'
          rightIcon={
            <Button
              size={'icon'}
              variant={searchQuery.length > 0 ? 'default' : 'secondary'}
            >
              {searchQuery.length > 0 ? (
                <IoSearchOutline className='h-4 w-4' />
              ) : (
                <GoArrowUp className='w-4 h-4 text-neutral-ct-disabled' />
              )}
            </Button>
          }
        />
        {showSuggestions && (
          <SearchSuggestions
            suggestions={filteredSuggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        )}
      </div>
    </div>
  );
};

export default SearchTab;
