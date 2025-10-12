import { useState } from 'react';
import { cn } from '../../../lib/utils';
import { GoArrowUp } from 'react-icons/go';

const SendInput = () => {
  const [text, setText] = useState('');
  return (
    <div className='relative bg-white rounded-md p-4 border-neutral-br-secondary border'>
      <textarea
        placeholder='Ask a follow-up question...'
        className='w-full outline-none border-none focus:outline-none focus:border-none text-[14px] placeholder:text-[14px] resize-none scrollbar-hide'
        style={{
          fontSize: '14px',
          overflow: 'hidden',
        }}
        onChange={e => setText(e.target.value)}
      />

      <div className='flex items-center justify-end'>
        <button
          className={cn(
            'h-8 w-8 flex items-center justify-center rounded-lg bg-neutral-disabled',
            text
              ? 'bg-brand-default text-white cursor-pointer'
              : 'bg-neutral-disabled'
          )}
        >
          <GoArrowUp
            className={cn(
              'w-4 h-4',
              text ? 'text-white' : 'text-neutral-ct-disabled'
            )}
          />
        </button>
      </div>
    </div>
  );
};
export default SendInput;
