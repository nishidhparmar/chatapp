'use client';

import React from 'react';

const BubbleLoader: React.FC = () => {
  return (
    <div className='flex items-center space-x-1 p-3'>
      <div className='flex space-x-1'>
        <div className='w-2 h-2 bg-brand-default rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='w-2 h-2 bg-brand-default rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='w-2 h-2 bg-brand-default rounded-full animate-bounce'></div>
      </div>
    </div>
  );
};

export default BubbleLoader;
