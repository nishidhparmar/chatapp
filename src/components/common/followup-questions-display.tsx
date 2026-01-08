'use client';

import { useFollowupStore } from '../../lib/stores';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface FollowupQuestionsDisplayProps {
  onQuestionClick?: (question: string) => void;
  className?: string;
  showChatId?: boolean;
}

/**
 * A component that displays followup questions from the Zustand store
 * This can be used anywhere in the app to show and interact with stored followup questions
 */
const FollowupQuestionsDisplay = ({
  onQuestionClick,
  className = '',
  showChatId = true,
}: FollowupQuestionsDisplayProps) => {
  const { followupQuestions, currentChatId, clearFollowupQuestions } =
    useFollowupStore();

  if (!followupQuestions.length) {
    return null;
  }

  const handleQuestionClick = (question: string) => {
    if (onQuestionClick) {
      onQuestionClick(question);
    }
  };

  return (
    <div className={cn('space-y-3 p-4 bg-gray-50 rounded-lg', className)}>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-sm font-medium text-gray-900'>
            Follow-up Questions
          </h3>
          {showChatId && currentChatId && (
            <p className='text-xs text-gray-500'>From chat #{currentChatId}</p>
          )}
        </div>
        <Button
          variant='ghost'
          size='sm'
          onClick={clearFollowupQuestions}
          className='text-xs text-gray-500 hover:text-gray-700'
        >
          Clear
        </Button>
      </div>

      <div className='space-y-2'>
        {followupQuestions.map((question, index) => (
          <Button
            key={index}
            variant='outline'
            size='sm'
            onClick={() => handleQuestionClick(question)}
            className='w-full text-left justify-start h-auto p-3 text-sm text-gray-700 hover:bg-white hover:border-gray-300 transition-colors'
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FollowupQuestionsDisplay;
