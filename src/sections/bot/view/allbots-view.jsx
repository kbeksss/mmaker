import React from 'react';
import { useMockedUser } from 'src/auth/hooks';
import { useTheme } from '@mui/material/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import { _botlist_all_type } from 'src/_mock';
import { BotList } from '../bot-list';

const TABLE_HEAD = [
  { id: 'exchangeName', label: 'Exchange' },
  { id: 'pair', label: 'Pair' },
  { id: 'activeOrders', label: 'Active Orders' },
  { id: 'originalBudget', label: 'Or. Budget', width: 80 },
  { id: 'firstPairBalance', label: 'Balance (1)', width: 80 },
  { id: 'secondPairBalance', label: 'Balance (2)', width: 80 },
  { id: 'tradingVolume', label: 'Trading Volume', width: 80 },
  { id: 'feesPaid', label: 'Fees Paid', width: 80 },
  { id: 'pnl', label: 'PnL', width: 80 },
  { id: 'botType', label: 'Bot Type', width: 80 },

  { id: 'status', label: 'Status', width: 100 },
  { id: '', width: 88 },
];

export function AllBotsView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <BotList botList={_botlist_all_type} withBotTypes tableHeads={TABLE_HEAD} />
    </DashboardContent>
  );
}
