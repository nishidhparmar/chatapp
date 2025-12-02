'use client';

import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import { AuthInput } from './common/auth-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { ResetPasswordSchema } from '@/lib/validation';
import { Button } from '../ui/Button';
import { BackToLoginButton } from './common/back-to-login-button';

const ResetPasswordPage = () => {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
    console.log(data);
  };

  return (
    <div className='flex flex-col justify-center bg-secondary items-center min-h-screen lg:p-8 p-4'>
      <div className='p-6 border border-neutral-br-primary bg-white rounded-lg max-w-[422px] w-full'>
        <h1 className='text-neutral-ct-primary text-[28px] font-semibold'>
          Create a new password
        </h1>
        <p className='text-neutral-ct-secondary text-sm mt-2'>
          Password must be minimum 8 characters and use at least 1 number and 1
          special character.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <AuthInput
                    label='New Password'
                    type='password'
                    placeholder='Enter new password'
                    error={form.formState.errors.password?.message}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='mt-3'>
                  <AuthInput
                    label='Confirm Password'
                    type='password'
                    placeholder='Re-enter new password'
                    error={form.formState.errors.confirmPassword?.message}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full mt-8'>
              Reset Password
            </Button>
            <BackToLoginButton />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
