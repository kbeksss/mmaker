import React from 'react';
import { Box, Button } from '@mui/material';
import { BotTable } from './bot-table';

export const BotStatuses = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
];

export const BotList = ({ tableHeads, botList, withBotTypes, cardHeader }) => (
  <Box>
    <BotTable
      botList={botList}
      tableHeads={tableHeads}
      cardHeader={cardHeader}
      withBotTypes={withBotTypes}
      statuses={BotStatuses}
      action={
        <Button onClick={() => console.log('action')} color="primary" variant="contained">
          Add a bot
        </Button>
      }
    />
  </Box>
);

