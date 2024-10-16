import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SplashScreen } from 'src/components/loading-screen';
import { SimpleLayout } from 'src/layouts/simple';

// ----------------------------------------------------------------------

// Error
const Page404 = lazy(() => import('src/pages/error/404'));
const PricingPage = lazy(() => import('src/pages/pricing'));
const UserAccountPage = lazy(() => import('src/pages/account'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: 'pricing',
        element: (
          <SimpleLayout>
            <PricingPage />
          </SimpleLayout>
        ),
      },
      {
        path: 'account',
        element: (
          <SimpleLayout>
            <UserAccountPage />
          </SimpleLayout>
        ),
      },
      { path: '404', element: <Page404 /> },
    ],
  },
];
