import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Iconify } from 'src/components/iconify';

export const BotFieldTooltip = ({ text }) => (
  <Tooltip title={text}>
    <IconButton>
      <Iconify icon="mingcute:question-fill" />
    </IconButton>
  </Tooltip>
);
