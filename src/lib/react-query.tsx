'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { handleApiError } from './error-handler';

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1,
            onError: (error: unknown) => {
              // Only handle errors that weren't already handled by axios interceptor
              // This is mainly for network errors or other non-HTTP errors
              if (!(error as any)?.response) {
                handleApiError(error);
              }
            },
          },
          mutations: {
            onError: (error: unknown) => {
              // Only handle errors that weren't already handled by axios interceptor
              // This is mainly for network errors or other non-HTTP errors
              if (!(error as any)?.response) {
                handleApiError(error);
              }
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
