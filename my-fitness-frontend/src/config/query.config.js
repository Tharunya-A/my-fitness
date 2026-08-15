import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
      cacheTime: 1000 * 60 * 15, // Cache garbage collection after 15 minutes
      refetchOnWindowFocus: false, // Prevents aggressive refetching on tab switch
      retry: 1, // Retry failed network requests once before erroring
    },
  },
});