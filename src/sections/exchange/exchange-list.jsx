import React from 'react';
import {
  Box,
  Card,
  Table,
  Avatar,
  TableRow,
  TableCell,
  TableBody,
  CardHeader,
  Button,
} from '@mui/material';

import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { fCurrency } from 'src/utils/format-number';
import { Label } from 'src/components/label';

export const ExchangeList = ({
  title,
  subheader,
  tableData,
  headLabel,
  onNewConnectionClick,
  ...other
}) => (
  <Card {...other}>
    <CardHeader
      title={title}
      subheader={subheader}
      sx={{ mb: 3 }}
      action={
        <Button onClick={onNewConnectionClick} color="primary" variant="contained">
          Add new connection
        </Button>
      }
    />

    <Scrollbar>
      <Table sx={{ minWidth: 640 }}>
        <TableHeadCustom headLabel={headLabel} />
        <TableBody>
          {tableData.map((row) => (
            <RowItem key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  </Card>
);

function RowItem({ row }) {
  return (
    <TableRow>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant="square"
            sx={{ height: 'auto' }}
            alt={row.exchangeName}
            src={row.iconUrl}
          />
          {row.exchangeName}
        </Box>
      </TableCell>

      <TableCell>{row.date}</TableCell>

      <TableCell align="center">{fCurrency(row.balance)}</TableCell>

      <TableCell align="right">
        <Label
          variant="soft"
          color={
            (row.status === 'active' && 'primary') ||
            (row.status === 'paused' && 'secondary') ||
            'error'
          }
        >
          {row.status}
        </Label>
      </TableCell>
    </TableRow>
  );
}
