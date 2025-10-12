import Image from 'next/image';
import React from 'react';

const ChatBubble = ({
  message,
  side,
  avatar,
}: {
  message: string;
  side: 'left' | 'right';
  avatar: string;
}) => {
  const isRight = side === 'right';

  return (
    <div
      className={`flex items-start  ${isRight ? 'justify-end' : 'justify-start'}`}
    >
      {/* Left Avatar */}
      {!isRight && (
        <Image
          src={avatar}
          alt='avatar'
          className='rounded-full mr-2'
          height={8}
          width={8}
        />
      )}

      {/* Message Bubble */}
      <div
        className={`p-3 rounded-md max-w-[75%] text-white text-sm leading-snug ${
          isRight
            ? 'bg-brand-default rounded-tr-[2px]'
            : 'bg-gray-200 text-gray-800 roun2pxded-bl-none'
        }`}
      >
        {message}
      </div>

      {/* Right Avatar */}
      {isRight && (
        <Image
          src={avatar}
          alt='avatar'
          className='rounded-full ml-2'
          height={24}
          width={24}
        />
      )}
    </div>
  );
};
export default ChatBubble;
