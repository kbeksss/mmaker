import React from 'react';
import { Box, Button, MenuItem, MenuList } from '@mui/material';
import { _bot_types, _botlist_all_type } from 'src/_mock';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { BotTable } from './bot-table';

export const BotStatuses = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
];

const TABLE_HEAD = [
  { id: 'exchangeName', label: 'Exchange' },
  { id: 'market', label: 'Market' },
  { id: 'uptime', label: 'Uptime' },
  { id: 'volume', label: 'Volume (USD)' },
  { id: 'baseBudget', label: 'Base Budget (ETH)' },
  { id: 'baseBalance', label: 'Base Balance (ETH)' },
  { id: 'quoteBudget', label: 'Quote Budget (BTC)' },
  { id: 'quoteBalance', label: 'Quote Balance (BTC)' },
  { id: 'feesPaid', label: 'Fees Paid (USD)' },
  { id: 'activeOrders', label: 'Active Orders' },
  { id: 'pnl', label: 'PnL (USD)', width: 80 },
  { id: 'botType', label: 'Bot Type', width: 80 },
  { id: 'status', label: 'Status', width: 100 },
  { id: '', width: 88 },
];

export const AllBotsList = ({ cardHeader }) => {
  const router = useRouter();

  const popover = usePopover();
  return (
    <Box>
      <BotTable
        botList={_botlist_all_type}
        tableHeads={TABLE_HEAD}
        cardHeader={cardHeader}
        withBotTypes
        statuses={BotStatuses}
        action={
          <Button onClick={popover.onOpen} color="primary" variant="contained">
            Add a bot
          </Button>
        }
      />
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          {Object.keys(_bot_types).map((key) => (
            <MenuItem
              key={key}
              onClick={() => {
                router.push(paths.dashboard[key]);
              }}
            >
              {_bot_types[key]}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </Box>
  );
};
