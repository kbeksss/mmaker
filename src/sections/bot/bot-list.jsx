import React, { useState } from 'react';
import { Box } from '@mui/material';
import { _botList } from 'src/_mock';
import { BotTable } from './bot-table';

export const BotStatuses = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
];

export const BotList = () => (
  <Box>
    <BotTable botList={_botList} statuses={BotStatuses} />
  </Box>
);

export default BotList;
