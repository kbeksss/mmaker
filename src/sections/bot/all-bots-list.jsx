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
          {_bot_types.map((type, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                if (type === 'Liquidity') {
                  router.push(paths.dashboard.liquidityBots);
                }
                console.log(type);
              }}
            >
              {type}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </Box>
  );
};
