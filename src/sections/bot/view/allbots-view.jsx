import React from 'react';
import { useMockedUser } from 'src/auth/hooks';
import { useTheme } from '@mui/material/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import { _botlist_all_type } from 'src/_mock';
import { AllBotsList } from '../all-bots-list';

export function AllBotsView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <AllBotsList
        botList={_botlist_all_type}
        cardHeader="All bots"
      />
    </DashboardContent>
  );
}
