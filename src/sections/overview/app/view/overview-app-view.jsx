import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/dashboard';

import { useMockedUser } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  return <DashboardContent maxWidth="xl">app</DashboardContent>;
}
