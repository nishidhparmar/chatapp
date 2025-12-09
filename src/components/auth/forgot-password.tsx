'use client';

import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import { AuthInput } from './common/auth-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { ForgotPasswordSchema } from '@/lib/validation';
import { Button } from '../ui/button';
import { BackToLoginButton } from './common/back-to-login-button';
import { useRouter } from 'next/navigation';
import { useForgotPassword } from '@/hooks/mutations/use-forgot-password';
import { useAnalytics } from '@/hooks/use-analytics';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { track } = useAnalytics();
  const forgotPasswordMutation = useForgotPassword();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: z.infer<typeof ForgotPasswordSchema>) => {
    track('Forgot Password Attempted', {
      email: data.email,
      timestamp: new Date().toISOString(),
    });

    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        track('Forgot Password Successful', {
          email: data.email,
          timestamp: new Date().toISOString(),
        });
        router.push('/send-mail');
      },
      onError: error => {
        track('Forgot Password Failed', {
          email: data.email,
          error: error.message,
          timestamp: new Date().toISOString(),
        });
      },
    });
  };

  return (
    <div className='flex flex-col bg-secondary justify-center items-center min-h-screen lg:p-8 p-4'>
      <div className='p-6 border border-neutral-br-primary bg-white rounded-lg max-w-[422px] w-full'>
        <h1 className='text-neutral-ct-primary text-[28px] font-semibold'>
          Forgot Password?
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <AuthInput
                    label='Email'
                    placeholder='Enter your email address'
                    error={form.formState.errors.email?.message}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full mt-8'
              loading={forgotPasswordMutation.isPending}
            >
              Send reset link
            </Button>
            <BackToLoginButton />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
