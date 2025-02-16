import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import 'styles/globals.css';
import queryClient from 'api/queryClient';
import router from 'router/index';

import ThemeProvider from 'components/common/ThemeProvider';
import ThemeSnackbar from 'components/common/ThemeSnackbar';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ThemeSnackbar />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
