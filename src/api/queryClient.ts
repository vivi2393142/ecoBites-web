import { QueryClient } from '@tanstack/react-query';

const initQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

export default initQueryClient;
