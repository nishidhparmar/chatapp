'use client';

interface FollowUpQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
  isLoading?: boolean;
}

const FollowUpQuestions = ({
  questions,
  onQuestionClick,
  isLoading = false,
}: FollowUpQuestionsProps) => {
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-col gap-2 mt-6'>
      <div className='flex flex-wrap gap-2'>
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            disabled={isLoading}
            className='text-left h-auto py-2 px-3 text-wrap text-sm bg-gray-200 rounded-md cursor-pointer text-neutral-ct-primary'
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FollowUpQuestions;
