'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import Loading from '@/components/common/loading';

const publicRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/send-mail',
];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();

      const isPublicRoute = publicRoutes.some(route =>
        pathname.startsWith(route)
      );

      if (!authenticated && !isPublicRoute) {
        router.push(`/login?redirect=${pathname}`);
      } else if (authenticated && isPublicRoute) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loading size='lg' />
      </div>
    );
  }

  return <>{children}</>;
}
