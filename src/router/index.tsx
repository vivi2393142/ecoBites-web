import { Navigate, createBrowserRouter } from 'react-router-dom';

import CookingPage from 'pages/Cooking';
import Error from 'pages/Error';
import HomePage from 'pages/Home';
import RewardsPage from 'pages/Rewards';
import ScanPage from 'pages/Scan';

import { Page } from 'libs/schema';
import { pageSettings } from 'libs/settings';

const router = createBrowserRouter(
  [
    {
      path: pageSettings[Page.HOME].route,
      element: <HomePage />,
      errorElement: <Error />,
    },
    {
      path: pageSettings[Page.SCAN].route,
      element: <ScanPage />,
      errorElement: <Error />,
    },
    {
      path: pageSettings[Page.COOKING].route,
      element: <CookingPage />,
      errorElement: <Error />,
    },
    {
      path: pageSettings[Page.REWARDS].route,
      element: <RewardsPage />,
      errorElement: <Error />,
    },
    {
      path: '*',
      element: <Navigate to={pageSettings[Page.HOME].route} replace />,
    },
  ],
  {
    basename: '/ecoBites-web',
  },
);

export default router;
