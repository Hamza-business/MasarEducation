'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { SWRConfig } from 'swr';

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <SWRConfig
        value={{
          // Global configuration for all SWR hooks
          errorRetryCount: 3,
          errorRetryInterval: 2000,
          refreshInterval: 0,
          revalidateOnFocus: false,
          revalidateOnReconnect: true,
          dedupingInterval: 60000,
          // Prevent page refresh on errors
          shouldRetryOnError: true,
          // Global error handler - only log, don't show toasts here
          onError: (error, key) => {
            console.error('SWR Error for key:', key, error);
            // Don't show toasts here - let individual components handle it after retries
          },
          // Global loading state handler
          onLoadingSlow: (key) => {
            console.warn('SWR loading slow for key:', key);
            // You can add global loading slow handling here
          },
        }}
      >
        {children}
      </SWRConfig>
    </QueryClientProvider>
  );
}
