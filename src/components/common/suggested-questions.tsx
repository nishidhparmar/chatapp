'use client';

import { useSuggestedQuestions } from '../../hooks/queries';
// import { useSuggestedQuestions } from '@/hooks/queries';
import { Skeleton } from '../ui/skeleton';

interface SuggestedQuestionsProps {
  onQuestionClick?: (question: string) => void;
}

export function SuggestedQuestions({
  onQuestionClick,
}: SuggestedQuestionsProps) {
  const { data, isLoading, error } = useSuggestedQuestions({ enabled: true });

  if (isLoading) {
    return (
      <div className='space-y-2'>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className='h-12 w-full' />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-sm text-red-500'>
        Failed to load suggested questions
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const hasRecentQuestions = data.data.recent_questions.questions.length > 0;
  const hasRoleBasedQuestions =
    data.data.role_based_questions.questions.length > 0;

  if (!hasRecentQuestions && !hasRoleBasedQuestions) {
    return null;
  }

  return (
    <div className='space-y-4'>
      {hasRecentQuestions && (
        <div className='space-y-2'>
          <h3 className='text-sm font-medium text-neutral-ct-secondary'>
            {data.data.recent_questions.title}
          </h3>
          <div className='grid gap-2'>
            {data.data.recent_questions.questions.map((question, index) => (
              <button
                key={`recent-${index}`}
                onClick={() => onQuestionClick?.(question)}
                className='text-left p-3 rounded-lg border border-neutral-br-primary hover:bg-gray-50 transition-colors text-sm text-neutral-ct-primary'
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasRoleBasedQuestions && (
        <div className='space-y-2'>
          <h3 className='text-sm font-medium text-neutral-ct-secondary'>
            {data.data.role_based_questions.title}
          </h3>
          <div className='grid gap-2'>
            {data.data.role_based_questions.questions.map((question, index) => (
              <button
                key={`role-${index}`}
                onClick={() => onQuestionClick?.(question)}
                className='text-left p-3 rounded-lg border border-neutral-br-primary hover:bg-gray-50 transition-colors text-sm text-neutral-ct-primary'
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
