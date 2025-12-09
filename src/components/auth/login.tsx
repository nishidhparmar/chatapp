'use client';

import Image from 'next/image';
import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import { AuthInput } from './common/auth-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { LoginSchema } from '@/lib/validation';
import { Button } from '../ui/button';
import ILink from '../ui/link';
import { useLogin } from '@/hooks/mutations/use-login';
import { useAnalytics } from '@/hooks/use-analytics';

const LoginPage = () => {
  const { track } = useAnalytics();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useLogin();

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    track('Login Attempted', {
      email: data.email,
      timestamp: new Date().toISOString(),
    });

    loginMutation.mutate(data, {
      onSuccess: () => {
        track('Login Successful', {
          email: data.email,
          timestamp: new Date().toISOString(),
        });
      },
      onError: error => {
        track('Login Failed', {
          email: data.email,
          error: error.message,
          timestamp: new Date().toISOString(),
        });
      },
    });
  };

  return (
    <div className='grid lg:grid-cols-3 grid-cols-1'>
      <div className='lg:col-span-2 col-span-1 lg:block hidden bg-secondary relative h-screen'>
        <Image
          alt=''
          src={'/images/landing-page-image.svg'}
          fill
          className='object-contain'
        />
      </div>
      <div className='flex flex-col justify-center h-screen items-center lg:p-8 p-4'>
        <div className='p-6 border border-neutral-br-primary rounded-lg max-w-[422px] w-full'>
          <h1 className='text-neutral-ct-primary text-[28px] font-semibold'>
            Login
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
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='mt-3'>
                    <AuthInput
                      label='Password'
                      type='password'
                      placeholder='Enter your password'
                      error={form.formState.errors.password?.message}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='w-full flex justify-end mt-2'>
                <ILink href='/forgot-password' className='font-medium text-sm'>
                  Forgot password?
                </ILink>
              </div>
              <Button
                type='submit'
                className='w-full mt-8'
                loading={loginMutation.isPending}
              >
                Log In
              </Button>
              <Button type='submit' className='w-full mt-3' variant='outline'>
                <Image
                  src={'/images/key.svg'}
                  alt='key'
                  height={20}
                  width={20}
                />
                Sign in with SSO
              </Button>
              <div className='flex flex-wrap items-center mt-8 gap-2 text-xs justify-center'>
                <p>Looking to add IntellektAI to your project?</p>
                <ILink href='/' className='text-xs'>
                  Get in touch
                </ILink>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
