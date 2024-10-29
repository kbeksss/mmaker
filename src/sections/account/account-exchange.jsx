import { useState } from 'react';
import { Grid, Card, Stack, Typography, Box, Button } from '@mui/material';
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

export function AccountExchange() {
  const [connectedList, setConnectedList] = useState({});
  const [selectedExchange, setSelectedExchange] = useState(null);
  const methods = useForm({
    resolver: zodResolver(KeysSchema),
    defaultValues: { apiKey: '', secretKey: '' },
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
    setConnectedList((prev) => ({ ...prev, [selectedExchange.value]: connectedExchange }));
    setSelectedExchange(null);
    resetForm();
  });
  return (
    <>
      <Box sx={{ pb: 4 }}>
        {!!Object.keys(connectedList).length && (
          <AccountExchangeList
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
      <Grid container spacing={3}>
        <Grid xs={12} md={4} item>
          <Typography sx={{ mb: 2 }}>Choose exchange</Typography>
          <Stack spacing={1}>
            {Object.keys(exchanges)
              .filter((exchKey) => !Object.prototype.hasOwnProperty.call(connectedList, exchKey))
              .map((exchKey) => (
                <ExchangeCard
                  key={exchanges[exchKey].value}
                  onCardClick={() => setSelectedExchange(exchanges[exchKey])}
                  selected={selectedExchange?.value === exchanges[exchKey].value}
                  name={exchanges[exchKey].name}
                  img={exchanges[exchKey].icon}
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
                    <Box sx={{ pt: 2 }}>
                      <Stack direction="row" justifyContent="flex-end">
                        <Button type="submit" color="primary" variant="contained">
                          Save connection
                        </Button>
                      </Stack>
                    </Box>
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
