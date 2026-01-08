'use client';

import { useFollowupStore } from '../../lib/stores';
import { Button } from '../ui/button';

interface FollowupQuestionsProps {
  onQuestionClick?: (question: string) => void;
  className?: string;
}

const FollowupQuestions = ({
  onQuestionClick,
  className = '',
}: FollowupQuestionsProps) => {
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
    <div className={`space-y-2 ${className}`}>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-medium text-gray-700'>
          Follow-up Questions
        </h3>
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
            className='w-full text-left justify-start h-auto p-3 text-sm text-gray-700 hover:bg-gray-50'
          >
            {question}
          </Button>
        ))}
      </div>

      {currentChatId && (
        <p className='text-xs text-gray-500'>From chat #{currentChatId}</p>
      )}
    </div>
  );
};

export default FollowupQuestions;
