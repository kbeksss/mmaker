import { DashboardContent } from 'src/layouts/dashboard';
import { Box, Button, Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
import TradingViewWidget from 'src/components/trading-view';
import { Field, Form } from 'src/components/hook-form';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';
import axios from 'axios';
import { _botList } from 'src/_mock';
import { BotList } from '../bot-list';

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

  { id: 'status', label: 'Status', width: 100 },
  { id: '', width: 88 },
];

export const BotSchema = zod
  .object({
    symbol: zod.string({ required_error: 'Symbol is required!' }),
    buyDepth: zod.number(),
    sellDepth: zod.number(),
    buyNumber: zod.number({ required_error: 'Number of orders is required' }),
    sellNumber: zod.number({ required_error: 'Number of orders is required' }),
    budgetQuote: zod.number(),
    budgetToken: zod.number(),
    maxSpread: zod.number(),
    minSpread: zod.number(),
  })
  .partial()
  .required({
    buyNumber: true,
    sellNumber: true,
    symbol: true,
  });

const AutoCompleteItem = memo(({ children, ...props }) => (
  <li {...props}>
    <Stack direction="row" justifyContent="space-between">
      <Typography>{children}</Typography>
      <Typography>%</Typography>
    </Stack>
  </li>
));

const getFromBinance = async () => {
  const { data } = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
  return data.map((pair) => {
    const symbol = pair.symbol;
    const priceChangePercent = parseFloat(pair.priceChangePercent);
    const obj = {
      label: symbol,
      id: symbol,
      percent: priceChangePercent.toFixed(2),
    };
    return obj;
  });
};

export function LiquidityBotsView({ tour }) {
  const defaultValues = useMemo(
    () => ({
      symbol: '',
      buyDepth: undefined,
      sellDepth: undefined,
      buyNumber: undefined,
      sellNumber: undefined,
      budgetQuote: undefined,
      budgetToken: undefined,
      maxSpread: undefined,
      minSpread: undefined,
    }),
    []
  );
  const [isBotStarted, setIsBotStarted] = useState(false);
  const [symbols, setSymbols] = useState([]);
  useEffect(() => {
    getFromBinance().then((res) => setSymbols(res));
  }, []);
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(BotSchema),
    defaultValues,
  });
  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const symbol = watch('symbol');
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <DashboardContent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TradingViewWidget symbol={symbol} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Form methods={methods} onSubmit={onSubmit}>
            <Stack spacing={{ xs: 1 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
              <Card>
                <CardHeader title="Keys" />
                <Stack spacing={3} sx={{ p: 3 }}>
                  <Field.Autocomplete
                    name="symbol"
                    label="Symbol (e.g., BTCUSDT):"
                    options={symbols}
                    onChange={(event, value) => {
                      setValue('symbol', value ? value.label : '');
                    }}
                    renderOption={(props, option) => (
                      <li {...props} key={option.id}>
                        <Stack direction="row" spacing={1} justifyContent="space-between">
                          <Typography>{option.label}</Typography>
                          <Typography color={option.percent >= 0 ? 'primary.main' : 'error'}>
                            {option.percent} %
                          </Typography>
                        </Stack>
                      </li>
                    )}
                  />
                </Stack>
              </Card>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardHeader title="Buy Orders Configuration" />
                    <Stack spacing={3} sx={{ p: 3 }}>
                      <Field.Text name="buyDepth" type="number" label="Depth Percentage (Buy):" />
                      <Field.Text name="buyNumber" type="number" label="Number of Orders (Buy):" />
                      <Field.Text name="budgetQuote" type="number" label="Budget Quote:" />
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardHeader title="Sell Orders Configuration" />
                    <Stack spacing={3} sx={{ p: 3 }}>
                      <Field.Text name="sellDepth" type="number" label="Depth Percentage (Sell):" />
                      <Field.Text
                        name="sellNumber"
                        type="number"
                        label="Number of Orders (Sell):"
                      />
                      <Field.Text name="budgetToken" type="number" label="Budget Token:" />
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
              <Card>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field.Text name="maxSpread" type="number" label="Max Spread BPS:" />
                    </Grid>
                    <Grid item xs={6}>
                      <Field.Text name="minSpread" type="number" label="Min Spread BPS:" />
                    </Grid>
                  </Grid>
                </Box>
              </Card>
              <Card>
                <Box sx={{ p: 3 }}>
                  <Button
                    onClick={() => setIsBotStarted((prev) => !prev)}
                    fullWidth
                    variant="contained"
                    color={isBotStarted ? 'error' : 'primary'}
                  >
                    {isBotStarted ? 'Stop bot' : 'Start bot'}
                  </Button>
                </Box>
              </Card>
            </Stack>
          </Form>
        </Grid>
        <Grid item xs={12}>
          <BotList botList={_botList} tableHeads={TABLE_HEAD} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
