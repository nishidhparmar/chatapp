'use client';

import { BackToLoginButton } from './common/back-to-login-button';

const CheckMail = () => {
  return (
    <div className='flex flex-col justify-center bg-secondary items-center min-h-screen lg:p-8 p-4'>
      <div className='p-6 border border-neutral-br-primary space-y-8 bg-white rounded-lg max-w-[422px] w-full'>
        <h1 className='text-neutral-ct-primary text-[28px] font-semibold'>
          Check your email
        </h1>
        <p className='text-neutral-ct-primary text-sm'>
          If an account exists for{' '}
          <span className='font-semibold'>john.doe@acme.com</span>, we’ve sent
          instructions to reset your password.
        </p>
        <BackToLoginButton />
      </div>
    </div>
  );
};

export default CheckMail;
