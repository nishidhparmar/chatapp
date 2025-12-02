import { useState } from 'react';
import { cn } from '../../../lib/utils';
import { GoArrowUp } from 'react-icons/go';

interface SendInputProps {
  onSend?: (message: string) => void;
  isLoading?: boolean;
}

const SendInput = ({ onSend, isLoading }: SendInputProps) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim() || isLoading) return;
    onSend?.(text);
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='relative bg-white rounded-md p-4 border-neutral-br-secondary border'>
      <textarea
        placeholder='Ask a follow-up question...'
        className='w-full outline-none border-none focus:outline-none focus:border-none text-[14px] placeholder:text-[14px] resize-none scrollbar-hide'
        style={{
          fontSize: '14px',
          overflow: 'hidden',
        }}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />

      <div className='flex items-center justify-end'>
        <button
          onClick={handleSend}
          disabled={!text.trim() || isLoading}
          className={cn(
            'h-8 w-8 flex items-center justify-center rounded-lg',
            text && !isLoading
              ? 'bg-brand-default text-white cursor-pointer hover:bg-brand-hover'
              : 'bg-neutral-disabled cursor-not-allowed'
          )}
        >
          {isLoading ? (
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
          ) : (
            <GoArrowUp
              className={cn(
                'w-4 h-4',
                text ? 'text-white' : 'text-neutral-ct-disabled'
              )}
            />
          )}
        </button>
      </div>
    </div>
  );
};
export default SendInput;
