'use client';

import { PiClockClockwise } from 'react-icons/pi';

interface SearchSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const SearchSuggestions = ({
  suggestions,
  onSuggestionClick,
}: SearchSuggestionsProps) => {
  if (suggestions.length === 0) return null;

  return (
    <div className='absolute top-full left-0 w-full bg-white border rounded-lg shadow-md mt-1 z-10'>
      <div className='flex flex-col'>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onMouseDown={e => e.preventDefault()}
            onClick={() => onSuggestionClick(suggestion)}
            className='px-4 py-3 hover:bg-neutral-disabled cursor-pointer text-sm flex items-center gap-4'
          >
            <PiClockClockwise className='w-4 h-4 shrink-0 text-neutral-ct-secondary' />
            <p className='text-neutral-ct-secondary lg:text-sm text-xs'>
              {suggestion}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
