"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  persistQueryClient,
} from '@tanstack/react-query-persist-client';
import {
  createSyncStoragePersister,
} from '@tanstack/query-sync-storage-persister';

import { useState } from 'react';

// In your QueryProvider or _app.tsx:
export default function QueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 1, // data is fresh for 1 minute
        cacheTime: 1000 * 60 * 60, // cache data for 1 hour
      },
    }
  }));

  // On the client only:
  if (typeof window !== "undefined") {
    const localStoragePersister = createSyncStoragePersister({
      storage: window.localStorage,
    });

    persistQueryClient({
      queryClient,
      persister: localStoragePersister,
    });
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}