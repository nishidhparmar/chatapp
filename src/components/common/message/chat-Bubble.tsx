import React from 'react';
import UserAvatar from '../user-avatar';

const ChatBubble = ({
  message,
  side,
  avatar,
  userName,
}: {
  message: string;
  side: 'left' | 'right';
  avatar?: string;
  userName?: string;
}) => {
  const isRight = side === 'right';

  return (
    <div
      className={`flex items-start  ${isRight ? 'justify-end' : 'justify-start'}`}
    >
      {/* Left Avatar */}
      {!isRight && (
        <div className='mr-2'>
          <UserAvatar name={userName} avatar={avatar} size='sm' />
        </div>
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
        <div className='ml-2'>
          <UserAvatar name={userName} avatar={avatar} size='sm' />
        </div>
      )}
    </div>
  );
};
export default ChatBubble;
