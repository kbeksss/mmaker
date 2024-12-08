import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SplashScreen } from 'src/components/loading-screen';
import { SimpleLayout } from 'src/layouts/simple';

// ----------------------------------------------------------------------

// Error
const OnboardingPage = lazy(() => import('src/pages/onboarding'));
const Page404 = lazy(() => import('src/pages/error/404'));


// ----------------------------------------------------------------------
const layoutContent = (
  <Suspense fallback={<SplashScreen />}>
    <Outlet />
  </Suspense>
);

export const publicRoutes = [
  {
    element: <>{layoutContent}</>,
    children: [

      {
        path: 'onboarding',
        element: (
          <SimpleLayout>
            <OnboardingPage />
          </SimpleLayout>
        ),
      },
      { path: '404', element: <Page404 /> },
    ],
  },
];
