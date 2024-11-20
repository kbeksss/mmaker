import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardHeader,
  MenuItem,
  Grid,
  Stack,
  Typography,
  InputAdornment,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { memo, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { z as zod } from 'zod';

import { DashboardContent } from 'src/layouts/dashboard';
import TradingViewWidget from 'src/components/trading-view';
import { Field, Form } from 'src/components/hook-form';
import { _botList, _exchanges } from 'src/_mock';
import { Iconify } from 'src/components/iconify';

import { BotList } from '../bot-list';
import { BotMarketInfo } from '../bot-market-info';
import { BotFieldTooltip } from '../bot-field-tooltip';

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
  { id: 'status', label: 'Status', width: 100 },
  { id: '', width: 88 },
];

export const BotSchema = zod
  .object({
    exchange: zod.string({ required_error: 'Symbol is required!' }),
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

const tempEditValues = {
  exchange: 'binance',
  symbol: 'BTCUSDT',
  buyDepth: 10,
  sellDepth: 10,
  buyNumber: 3,
  sellNumber: 3,
  budgetQuote: 100,
  budgetToken: 100,
  maxSpread: 100,
  minSpread: 100,
};

const emptyDefaultValues = {
  exchange: '',
  symbol: '',
  buyDepth: 0,
  sellDepth: 0,
  buyNumber: 0,
  sellNumber: 0,
  budgetQuote: 0,
  budgetToken: 0,
  maxSpread: 0,
  minSpread: 0,
};

export function LiquidityBotsView() {
  const [searchParams] = useSearchParams();
  const defaultValues = useMemo(
    () => (searchParams.get('id') ? tempEditValues : emptyDefaultValues),
    [searchParams]
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

  useEffect(() => {
    if (searchParams.get('id')) {
      reset(tempEditValues);
    }
  }, [searchParams, reset]);

  const symbol = watch('symbol') || 'BTCUSDT';
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
      <Typography variant="h4" sx={{ mb: 2 }}>
        Liquidity bot
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TradingViewWidget symbol={symbol} />
          <BotMarketInfo symbol={symbol} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Form methods={methods} onSubmit={onSubmit}>
            <Stack spacing={{ xs: 1 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
              <Card>
                <CardHeader
                  title="Exchange"
                  action={
                    <BotFieldTooltip text="Choose the exchange where you want the bot to trade." />
                  }
                />
                <Stack spacing={3} sx={{ p: 3 }}>
                  <Field.Select name="exchange" label="Exchange">
                    {Object.keys(_exchanges).map((key) => (
                      <MenuItem key={key} value={key}>
                        {_exchanges[key].name}
                      </MenuItem>
                    ))}
                  </Field.Select>
                </Stack>
              </Card>
              <Card>
                <CardHeader
                  title="Pairs"
                  action={
                    <BotFieldTooltip text="Choose the market pair to configure the bot's trading activities." />
                  }
                />
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
                      <Field.Text
                        name="buyDepth"
                        type="number"
                        label="Depth Percentage (Buy):"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <BotFieldTooltip text="Set how far from the market price buy orders should be placed, expressed as a percentage." />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Field.Text
                        name="buyNumber"
                        type="number"
                        label="Number of Orders (Buy):"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <BotFieldTooltip text="Specify the number of buy orders the bot should maintain in the market" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Field.Text
                        name="budgetQuote"
                        type="number"
                        label="Budget Quote:"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <BotFieldTooltip text="Define the total amount in the quote currency to allocate for buying." />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardHeader title="Sell Orders Configuration" />
                    <Stack spacing={3} sx={{ p: 3 }}>
                      <Field.Text
                        name="sellDepth"
                        type="number"
                        label="Depth Percentage (Sell):"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <BotFieldTooltip text="Set how far from the market price sell orders should be placed, expressed as a percentage." />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Field.Text
                        name="sellNumber"
                        type="number"
                        label="Number of Orders (Sell):"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <BotFieldTooltip text="Specify the number of sell orders the bot should maintain in the market." />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Field.Text
                        name="budgetToken"
                        type="number"
                        label="Budget Token:"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <BotFieldTooltip text="Define the total amount in the base currency to allocate for selling." />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
              <Card>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field.Text
                        name="maxSpread"
                        type="number"
                        label="Max Spread BPS:"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <BotFieldTooltip text="Set the upper limit for the spread to control how far apart buy and sell orders can be placed." />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field.Text
                        name="minSpread"
                        type="number"
                        label="Min Spread BPS:"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <BotFieldTooltip text="Set the lower limit for the spread to ensure a minimum gap between buy and sell orders." />
                            </InputAdornment>
                          ),
                        }}
                      />
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
          <BotList botList={_botList} cardHeader="Liquidity bots" tableHeads={TABLE_HEAD} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
