import {
  Box,
  Link,
  Stack,
  Button,
  Avatar,
  Tooltip,
  MenuList,
  MenuItem,
  TableRow,
  Checkbox,
  TableCell,
  IconButton,
} from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { getKeyByValue } from 'src/utils/helper';
import { _bot_types } from 'src/_mock';
import { useRouter } from 'src/routes/hooks';
import { BotQuickEditForm } from './bot-quick-edit-form';

// ----------------------------------------------------------------------

export function BotTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const router = useRouter();

  const popover = usePopover();

  const quickEdit = useBoolean();
  const onEdit = () => {
    const typeKey = getKeyByValue(_bot_types, row.botType);
    if (typeKey) {
      router.replace(`/dashboard/${typeKey}?id=${row.id}`);
    } else {
      router.push(`?id=${row.id}`);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row.name} src={row.avatarUrl} />

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link color="inherit" onClick={onEditRow} sx={{ cursor: 'pointer' }}>
                {row.exchangeName}
              </Link>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.pair}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.activeOrders}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.originalBudget}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.firstPairBalance}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.secondPairBalance}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.tradingVolume}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.feesPaid}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.pnl}</TableCell>
        {row?.botType && <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.botType}</TableCell>}

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'active' && 'success') ||
              (row.status === 'pending' && 'warning') ||
              (row.status === 'banned' && 'error') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Quick Edit" placement="top" arrow>
              <IconButton color="default" onClick={onEdit}>
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>

            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <BotQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>

          <MenuItem
            onClick={() => {
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
