import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/allbots'));
const LiquidityPage = lazy(() => import('src/pages/dashboard/liquidity-bot'));
const DistributionPage = lazy(() => import('src/pages/dashboard/distribution-bot'));
const BalancerPage = lazy(() => import('src/pages/dashboard/balancer-bot'));
const ExchangePage = lazy(() => import('src/pages/dashboard/exchange'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'liquidity', element: <LiquidityPage /> },
      { path: 'distribution', element: <DistributionPage /> },
      { path: 'balancer', element: <BalancerPage /> },
      { path: 'exchanges', element: <ExchangePage /> },
    ],
  },
];
