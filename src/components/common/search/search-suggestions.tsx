'use client';

import { PiClockClockwise } from 'react-icons/pi';

interface SuggestionGroup {
  title: string;
  questions: string[];
}

interface SearchSuggestionsProps {
  recentQuestions: SuggestionGroup;
  roleBasedQuestions: SuggestionGroup;
  onSuggestionClick: (suggestion: string) => void;
}

const SearchSuggestions = ({
  recentQuestions,
  roleBasedQuestions,
  onSuggestionClick,
}: SearchSuggestionsProps) => {
  const hasRecentQuestions = recentQuestions?.questions.length > 0;
  const hasRoleBasedQuestions = roleBasedQuestions?.questions.length > 0;

  if (!hasRecentQuestions && !hasRoleBasedQuestions) return null;

  return (
    <div className='absolute top-full left-0 w-full bg-white border rounded-lg shadow-md mt-1 z-10 max-h-96 overflow-y-auto'>
      <div className='flex'>
        {hasRecentQuestions && (
          <div>
            <div className='px-4 py-2 text-xs font-medium text-neutral-ct-primary '>
              {recentQuestions.title}
            </div>
            {recentQuestions.questions.map((suggestion, index) => (
              <div
                key={`recent-${index}`}
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
        )}

        {hasRoleBasedQuestions && (
          <div>
            <div className='px-4 py-2 text-xs font-medium text-neutral-ct-primary'>
              {roleBasedQuestions.title}
            </div>
            {roleBasedQuestions.questions.map((suggestion, index) => (
              <div
                key={`role-${index}`}
                onMouseDown={e => e.preventDefault()}
                onClick={() => onSuggestionClick(suggestion)}
                className='px-4 py-3 hover:bg-neutral-disabled cursor-pointer text-sm flex items-center gap-4'
              >
                {/* <PiClockClockwise className='w-4 h-4 shrink-0 text-neutral-ct-secondary' /> */}
                <p className='text-neutral-ct-secondary lg:text-sm text-xs'>
                  {suggestion}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSuggestions;
