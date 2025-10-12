'use client';

import Image from 'next/image';
import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import { AuthInput } from './common/auth-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { LoginSchema } from '@/lib/validation';
import ILink from '../ui/Link';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data);
    router.push('/');
  };

  return (
    <div className='grid grid-cols-3'>
      <div className='col-span-2 bg-secondary relative h-screen'>
        <Image
          alt=''
          src={'/images/landing-page-image.svg'}
          fill
          className='object-contain'
        />
      </div>
      <div className='flex flex-col justify-center items-center p-8'>
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
              <Button type='submit' className='w-full mt-8'>
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
