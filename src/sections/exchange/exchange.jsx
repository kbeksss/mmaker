import { useEffect, useState } from 'react';
import { Grid, Card, Stack, Typography, Box, Button } from '@mui/material';
import Lottie from 'react-lottie-player';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';

import whaleLottie from 'src/assets/lotties/whale.json';
import { Field, Form } from 'src/components/hook-form';
import { _mock } from 'src/_mock';
import ExchangeCard from './exchange-card';
import { ExchangeForm } from './exchange-form';
import { ExchangeList } from './exchange-list';
import { connectExchange, getExchangeStatus } from './action';
import { useQueryParams } from '../../hooks/use-query-params';

export const KeysSchema = zod.object({
  apiKey: zod.string().min(1, { message: 'Api key is required!' }),
  apiSecret: zod.string().min(1, { message: 'Secret key is required!' }),
});

export const StatusType = { active: 'active', paused: 'paused' };

const exchanges = {
  binance: { name: 'Binance', value: 'binance', icon: '/assets/images/exchange/binance.png' },
  coinbase: {
    name: 'Coinbase exchange',
    value: 'coinbase',
    icon: '/assets/images/exchange/coinbase.webp',
  },
  bybit: {
    name: 'Bybit',
    value: 'bybit',
    icon: '/assets/images/exchange/bybit.png',
  },
  okx: {
    name: 'OKX',
    value: 'okx',
    icon: '/assets/images/exchange/okx.png',
  },
  upbit: {
    name: 'Upbit',
    value: 'upbit',
    icon: '/assets/images/exchange/upbit.png',
  },
};

export function Exchange() {
  const { getParam } = useQueryParams();
  const [formOpen, setFormOpen] = useState(!!getParam('open'));

  const [connectedList, setConnectedList] = useState({});
  const [selectedExchange, setSelectedExchange] = useState(null);
  const methods = useForm({
    resolver: zodResolver(KeysSchema),
    defaultValues: { apiKey: '', apiSecret: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset: resetForm,
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    const index = Math.floor(Math.random() * 10);
    const connectedExchange = {
      id: selectedExchange.value,
      exchangeName: selectedExchange.name,
      date: '19 oct. 2024',
      balance: _mock.number.price(index),
      status: StatusType.active,
      iconUrl: selectedExchange.icon,
    };
    await connectExchange({ ...data, exchangeName: selectedExchange.value });
    setConnectedList((prev) => ({ ...prev, [selectedExchange.value]: connectedExchange }));
    setFormOpen(false);
    setSelectedExchange(null);
    resetForm();
  });
  useEffect(() => {
    getExchangeStatus().then();
  }, []);
  return (
    <>
      <Box sx={{ pb: 4 }}>
        {!Object.keys(connectedList).length ? (
          <Card sx={{ p: 3, my: 2 }}>
            <Typography>No connected exchanges</Typography>
            <Button
              sx={{ mt: 2 }}
              onClick={() => setFormOpen(true)}
              color="primary"
              variant="contained"
            >
              Add new connection
            </Button>
          </Card>
        ) : (
          <ExchangeList
            onNewConnectionClick={() => setFormOpen(true)}
            title="Connected Exchanges"
            tableData={Object?.values(connectedList)}
            headLabel={[
              { id: 'exchangeName', label: 'Exchange' },
              { id: 'date', label: 'Date of connection' },
              { id: 'balance', label: 'Balance', align: 'center' },
              { id: 'status', label: 'Status', align: 'right' },
            ]}
          />
        )}
      </Box>
      <ExchangeForm
        handleClose={() => setFormOpen(false)}
        exchanges={exchanges}
        connectedList={connectedList}
        setSelectedExchange={setSelectedExchange}
        formOpen={formOpen}
        selectedExchange={selectedExchange}
        methods={methods}
        onSubmit={onSubmit}
      />
    </>
  );
}
