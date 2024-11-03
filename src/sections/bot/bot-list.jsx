import React from 'react';
import { Box } from '@mui/material';
import { BotTable } from './bot-table';

export const BotStatuses = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
];

export const BotList = ({ tableHeads, botList, withBotTypes }) => (
  <Box>
    <BotTable
      botList={botList}
      tableHeads={tableHeads}
      withBotTypes={withBotTypes}
      statuses={BotStatuses}
    />
  </Box>
);

export default BotList;
