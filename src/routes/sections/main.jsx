import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SplashScreen } from 'src/components/loading-screen';
import { SimpleLayout } from 'src/layouts/simple';
import { CONFIG } from '../../config-global';
import { AuthGuard } from '../../auth/guard/index';

// ----------------------------------------------------------------------

// Error
const Page404 = lazy(() => import('src/pages/error/404'));
const PricingPage = lazy(() => import('src/pages/pricing'));
const UserAccountPage = lazy(() => import('src/pages/account'));

// ----------------------------------------------------------------------
const layoutContent = (
  <Suspense fallback={<SplashScreen />}>
    <Outlet />
  </Suspense>
);

export const mainRoutes = [
  {
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
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
