'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/store';
import { queryClient } from '@/lib/react-query';
import { AuthToggleProvider } from "@/context/AuthToggleContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
         <AuthToggleProvider>
        {children}
        </AuthToggleProvider>
      </QueryClientProvider>
    </Provider>
  );
}
