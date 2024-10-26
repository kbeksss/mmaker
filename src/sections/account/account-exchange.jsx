import { useState } from 'react';
import { Grid, Card, Stack, Typography, Box } from '@mui/material';
import Lottie from 'react-lottie-player';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';

import whaleLottie from 'src/assets/lotties/whale.json';
import { Field, Form } from 'src/components/hook-form';
import { _mock } from 'src/_mock';
import ExchangeCard from './exchange-card';
import { AccountExchangeList } from './account-exchange-list';

export const KeysSchema = zod.object({
  apiKey: zod.string().min(1, { message: 'Api key is required!' }),
  secretKey: zod.string().min(1, { message: 'Secret key is required!' }),
});

export const StatusType = { active: 'active', paused: 'paused' };

const exchangeList = [
  { name: 'Binance', value: 'binance', icon: '/assets/images/exchange/binance.png' },
  {
    name: 'Coinbase exchange',
    value: 'coinbase',
    icon: '/assets/images/exchange/coinbase.webp',
  },
  {
    name: 'Bybit',
    value: 'bybit',
    icon: '/assets/images/exchange/bybit.png',
  },
  {
    name: 'OKX',
    value: 'okx',
    icon: '/assets/images/exchange/okx.png',
  },
  {
    name: 'Upbit',
    value: 'upbit',
    icon: '/assets/images/exchange/upbit.png',
  },
];

export const tempData = [...Array(5)].map((_, index) => {
  const exchangeName = ['Binance', 'Coinbase exchange', 'Bybit', 'OKX', 'Upbit'][index];
  return {
    id: _mock.id(index),
    exchangeName,
    date: '19 oct. 2024',
    balance: _mock.number.price(index),
    status: StatusType.active,
    iconUrl: exchangeList[index].icon,
  };
});

export function AccountExchange() {
  const [selectedExchange, setSelectedExchange] = useState(null);
  const methods = useForm({
    resolver: zodResolver(KeysSchema),
    defaultValues: { apiKey: '', secretKey: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    console.log('data', data);
  });
  return (
    <>
      <Box sx={{ pb: 2 }}>
        <AccountExchangeList
          title="Connected Exchanges"
          tableData={tempData}
          headLabel={[
            { id: 'exchangeName', label: 'Exchange' },
            { id: 'date', label: 'Date of connection' },
            { id: 'balance', label: 'Balance', align: 'center' },
            { id: 'status', label: 'Status', align: 'right' },
          ]}
        />
      </Box>
      <Grid container spacing={3}>
        <Grid xs={12} md={4} item>
          <Typography sx={{ mb: 2 }}>Choose exchange</Typography>
          <Stack spacing={1}>
            {exchangeList.map((exch) => (
              <ExchangeCard
                key={exch.value}
                onCardClick={() => setSelectedExchange(exch)}
                selected={selectedExchange?.value === exch.value}
                name={exch.name}
                img={exch.icon}
              />
            ))}
          </Stack>
        </Grid>
        <Grid xs={12} md={8} item>
          <Card
            sx={{
              p: 3,
            }}
          >
            {!selectedExchange ? (
              <>
                <Typography>Choose exchange</Typography>
                <Lottie loop animationData={whaleLottie} play style={{ height: 300 }} />
              </>
            ) : (
              <Box>
                <Grid container justifyContent="center" spacing={3} alignItems="center">
                  <Grid item>
                    <img width={150} src={selectedExchange.icon} alt={selectedExchange.name} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h2">{selectedExchange.name}</Typography>
                  </Grid>
                </Grid>
                <Box sx={{ pt: 4 }}>
                  <Form methods={methods} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Field.Text label="Api key" name="apiKey" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field.Text label="Secret key" name="secretKey" />
                      </Grid>
                    </Grid>
                  </Form>
                </Box>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
